import axios from 'axios';
import { upload3DModelToFirebase, type UploadResult } from './firebase-storage';

const MESHY_API_KEY = process.env.MESHY_API_KEY;
const MESHY_API_URL = 'https://api.meshy.ai';

if (!MESHY_API_KEY) {
  console.warn('⚠️  MESHY_API_KEY is not set in environment variables');
}

export interface MeshyTextTo3DRequest {
  mode: 'preview' | 'refine';
  prompt: string;
  art_style?: string;
  negative_prompt?: string;
  ai_model?: string;
  topology?: 'quad' | 'triangle';
  target_polycount?: number;
  enable_pbr?: boolean;
}

export interface MeshyImageTo3DRequest {
  mode: 'preview' | 'refine';
  image_url: string;
  enable_pbr?: boolean;
  ai_model?: string;
  topology?: 'quad' | 'triangle';
  target_polycount?: number;
}

export interface MeshyTaskResponse {
  id: string;
  model_urls?: {
    glb?: string;
    fbx?: string;
    usdz?: string;
    obj?: string;
  };
  thumbnail_url?: string;
  video_url?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED' | 'EXPIRED';
  progress?: number;
  task_error?: {
    message: string;
  };
  created_at: number;
  finished_at?: number;
  // Firebase storage URLs after upload
  firebase_model_urls?: Record<string, UploadResult>;
  firebase_thumbnail?: UploadResult;
}

/**
 * Create a 3D model from a text prompt using Meshy AI
 */
export async function createTextTo3D(request: MeshyTextTo3DRequest): Promise<MeshyTaskResponse> {
  if (!MESHY_API_KEY) {
    throw new Error('Meshy API key is not configured');
  }

  console.log('🎨 Creating 3D model from text prompt:', request.prompt);

  try {
    const response = await axios.post(
      `${MESHY_API_URL}/v2/text-to-3d`,
      request,
      {
        headers: {
          'Authorization': `Bearer ${MESHY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ Text-to-3D task created:', response.data.id);
    return response.data;
  } catch (error: any) {
    console.error('❌ Meshy text-to-3D error:', error.response?.data || error.message);
    throw new Error(`Failed to create 3D model from text: ${error.response?.data?.message || error.message}`);
  }
}

/**
 * Create a 3D model from an image using Meshy AI
 */
export async function createImageTo3D(request: MeshyImageTo3DRequest): Promise<MeshyTaskResponse> {
  if (!MESHY_API_KEY) {
    throw new Error('Meshy API key is not configured');
  }

  console.log('🖼️  Creating 3D model from image:', request.image_url);

  try {
    const response = await axios.post(
      `${MESHY_API_URL}/v2/image-to-3d`,
      request,
      {
        headers: {
          'Authorization': `Bearer ${MESHY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ Image-to-3D task created:', response.data.id);
    return response.data;
  } catch (error: any) {
    console.error('❌ Meshy image-to-3D error:', error.response?.data || error.message);
    throw new Error(`Failed to create 3D model from image: ${error.response?.data?.message || error.message}`);
  }
}

/**
 * Get the status and result of a Meshy task
 */
export async function getTaskStatus(taskId: string): Promise<MeshyTaskResponse> {
  if (!MESHY_API_KEY) {
    throw new Error('Meshy API key is not configured');
  }

  try {
    const response = await axios.get(
      `${MESHY_API_URL}/v2/text-to-3d/${taskId}`,
      {
        headers: {
          'Authorization': `Bearer ${MESHY_API_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('❌ Meshy get task error:', error.response?.data || error.message);
    throw new Error(`Failed to get task status: ${error.response?.data?.message || error.message}`);
  }
}

/**
 * Poll a task until it completes or fails, then upload to Firebase Storage
 * @param taskId - The Meshy task ID to poll
 * @param sneakerId - Optional sneaker ID for organizing files
 * @param maxAttempts - Maximum number of polling attempts (default: 60)
 * @param intervalMs - Polling interval in milliseconds (default: 5000 = 5 seconds)
 * @param uploadToFirebase - Whether to upload completed models to Firebase (default: true)
 * @returns The completed task response with Firebase URLs
 */
export async function pollTaskUntilComplete(
  taskId: string, 
  sneakerId?: string,
  maxAttempts: number = 60,
  intervalMs: number = 5000,
  uploadToFirebase: boolean = true
): Promise<MeshyTaskResponse> {
  console.log(`🔄 Starting to poll task ${taskId}...`);
  
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    attempts++;
    
    try {
      const status = await getTaskStatus(taskId);
      
      console.log(`📊 Poll attempt ${attempts}/${maxAttempts} - Status: ${status.status}, Progress: ${status.progress || 0}%`);
      
      // Check terminal states
      if (status.status === 'SUCCEEDED') {
        console.log('✅ Task completed successfully!');
        console.log('📦 Model URLs:', status.model_urls);
        
        // Upload to Firebase Storage if enabled
        if (uploadToFirebase && status.model_urls) {
          try {
            console.log('☁️  Uploading models to Firebase Storage...');
            const firebaseUpload = await upload3DModelToFirebase(
              status.model_urls,
              status.thumbnail_url,
              sneakerId
            );
            
            status.firebase_model_urls = firebaseUpload.models;
            status.firebase_thumbnail = firebaseUpload.thumbnail;
            
            console.log('✅ Successfully uploaded to Firebase Storage');
            console.log('🔗 Firebase URLs:', {
              glb: firebaseUpload.models.glb?.publicUrl,
              thumbnail: firebaseUpload.thumbnail?.publicUrl,
            });
          } catch (uploadError: any) {
            console.error('⚠️  Failed to upload to Firebase, but task succeeded:', uploadError.message);
            // Don't fail the whole operation if upload fails
          }
        }
        
        return status;
      }
      
      if (status.status === 'FAILED') {
        console.error('❌ Task failed:', status.task_error);
        throw new Error(`Task failed: ${status.task_error?.message || 'Unknown error'}`);
      }
      
      if (status.status === 'EXPIRED') {
        throw new Error('Task expired before completion');
      }
      
      // Still pending or in progress, wait before next poll
      if (status.status === 'PENDING' || status.status === 'IN_PROGRESS') {
        await new Promise(resolve => setTimeout(resolve, intervalMs));
        continue;
      }
      
      // Unknown status
      throw new Error(`Unknown task status: ${status.status}`);
      
    } catch (error: any) {
      // If it's our own thrown error, re-throw it
      if (error.message.includes('Task failed') || error.message.includes('expired')) {
        throw error;
      }
      
      // For network errors, retry
      console.warn(`⚠️  Poll attempt ${attempts} failed:`, error.message);
      
      if (attempts >= maxAttempts) {
        throw new Error(`Polling failed after ${maxAttempts} attempts`);
      }
      
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }
  }
  
  throw new Error(`Task did not complete within ${maxAttempts} polling attempts`);
}

/**
 * Generate a 3D sneaker model from product information
 */
export async function generateSneaker3DModel(sneakerData: {
  name: string;
  brand: string;
  imageUrl?: string;
  colorway?: string;
  description?: string;
}): Promise<MeshyTaskResponse> {
  console.log('👟 Generating 3D model for sneaker:', sneakerData.name);

  // If we have an image, use image-to-3D (more accurate)
  if (sneakerData.imageUrl) {
    return createImageTo3D({
      mode: 'preview',
      image_url: sneakerData.imageUrl,
      enable_pbr: true,
      topology: 'quad',
      target_polycount: 30000,
    });
  }

  // Otherwise, use text-to-3D with detailed prompt
  const prompt = `
    High-quality 3D model of ${sneakerData.brand} ${sneakerData.name} sneaker.
    ${sneakerData.colorway ? `Colorway: ${sneakerData.colorway}.` : ''}
    ${sneakerData.description || ''}
    Photorealistic athletic shoe with detailed texture, laces, sole, and branding.
  `.trim();

  return createTextTo3D({
    mode: 'preview',
    prompt,
    art_style: 'realistic',
    negative_prompt: 'low quality, blurry, cartoon, deformed',
    enable_pbr: true,
    topology: 'quad',
    target_polycount: 30000,
  });
}
