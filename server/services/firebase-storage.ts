import { getStorage } from 'firebase-admin/storage';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import axios from 'axios';
import { nanoid } from 'nanoid';

// Ensure Firebase is initialized
if (!getApps().length) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    initializeApp({
      credential: cert(serviceAccount),
      storageBucket: `${serviceAccount.project_id}.firebasestorage.app`,
    });
  } else {
    initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'solegrid-2c491',
      storageBucket: `${process.env.FIREBASE_PROJECT_ID || 'solegrid-2c491'}.firebasestorage.app`,
    });
  }
}

const storage = getStorage();

export interface UploadResult {
  firebaseUrl: string;
  publicUrl: string;
  filePath: string;
  bucket: string;
}

/**
 * Download a file from a URL and upload it to Firebase Storage
 */
export async function downloadAndUploadToFirebase(
  sourceUrl: string,
  destinationPath: string,
  contentType?: string
): Promise<UploadResult> {
  console.log('📥 Downloading file from:', sourceUrl);
  
  try {
    // Download the file
    const response = await axios.get(sourceUrl, {
      responseType: 'arraybuffer',
      timeout: 120000, // 2 minutes timeout for large models
    });

    const fileBuffer = Buffer.from(response.data);
    const fileContentType = contentType || response.headers['content-type'] || 'application/octet-stream';

    console.log(`📦 Downloaded ${fileBuffer.length} bytes, type: ${fileContentType}`);

    // Upload to Firebase Storage
    const bucket = storage.bucket();
    const file = bucket.file(destinationPath);

    await file.save(fileBuffer, {
      contentType: fileContentType,
      metadata: {
        cacheControl: 'public, max-age=31536000', // Cache for 1 year
      },
    });

    console.log('✅ Uploaded to Firebase Storage:', destinationPath);

    // Make the file publicly accessible
    await file.makePublic();

    // Get the public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destinationPath}`;

    return {
      firebaseUrl: `gs://${bucket.name}/${destinationPath}`,
      publicUrl,
      filePath: destinationPath,
      bucket: bucket.name,
    };
  } catch (error: any) {
    console.error('❌ Firebase upload error:', error.message);
    throw new Error(`Failed to upload to Firebase Storage: ${error.message}`);
  }
}

/**
 * Upload a 3D model and its associated files to Firebase Storage
 */
export async function upload3DModelToFirebase(
  modelUrls: {
    glb?: string;
    fbx?: string;
    usdz?: string;
    obj?: string;
  },
  thumbnailUrl?: string,
  sneakerId?: string
): Promise<{
  models: Record<string, UploadResult>;
  thumbnail?: UploadResult;
}> {
  const modelId = sneakerId || nanoid(10);
  const basePath = `3d-models/${modelId}`;
  
  console.log(`🚀 Uploading 3D model files to Firebase for: ${modelId}`);

  const results: Record<string, UploadResult> = {};
  
  // Upload each model format
  const modelFormats = [
    { key: 'glb', url: modelUrls.glb, contentType: 'model/gltf-binary' },
    { key: 'fbx', url: modelUrls.fbx, contentType: 'application/octet-stream' },
    { key: 'usdz', url: modelUrls.usdz, contentType: 'model/vnd.usdz+zip' },
    { key: 'obj', url: modelUrls.obj, contentType: 'text/plain' },
  ];

  for (const format of modelFormats) {
    if (format.url) {
      try {
        const result = await downloadAndUploadToFirebase(
          format.url,
          `${basePath}/${modelId}.${format.key}`,
          format.contentType
        );
        results[format.key] = result;
        console.log(`✅ Uploaded ${format.key.toUpperCase()} model`);
      } catch (error: any) {
        console.warn(`⚠️  Failed to upload ${format.key}:`, error.message);
      }
    }
  }

  // Upload thumbnail if provided
  let thumbnailResult: UploadResult | undefined;
  if (thumbnailUrl) {
    try {
      thumbnailResult = await downloadAndUploadToFirebase(
        thumbnailUrl,
        `${basePath}/thumbnail.jpg`,
        'image/jpeg'
      );
      console.log('✅ Uploaded thumbnail');
    } catch (error: any) {
      console.warn('⚠️  Failed to upload thumbnail:', error.message);
    }
  }

  return {
    models: results,
    thumbnail: thumbnailResult,
  };
}

/**
 * Delete 3D model files from Firebase Storage
 */
export async function delete3DModelFromFirebase(sneakerId: string): Promise<void> {
  const bucket = storage.bucket();
  const basePath = `3d-models/${sneakerId}`;

  console.log(`🗑️  Deleting 3D model files for: ${sneakerId}`);

  try {
    await bucket.deleteFiles({
      prefix: basePath,
    });
    console.log('✅ Deleted 3D model files');
  } catch (error: any) {
    console.error('❌ Failed to delete files:', error.message);
    throw error;
  }
}

export { storage };
