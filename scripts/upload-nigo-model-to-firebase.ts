import { db } from '../server/db';
import { sneakers } from '../shared/schema';
import { eq } from 'drizzle-orm';
import { uploadFileToFirebase } from '../server/services/firebase-storage';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

/**
 * Script to upload a locally downloaded GLB file to Firebase Storage
 * and update the sneaker record with the Firebase URL
 * 
 * Usage:
 * 1. Download the GLB file from Meshy AI manually
 * 2. Place it in the project root as 'nike-air-force-nigo.glb'
 * 3. Run this script: npx tsx scripts/upload-nigo-model-to-firebase.ts
 * 
 * OR pass the file path as an argument:
 * npx tsx scripts/upload-nigo-model-to-firebase.ts /path/to/model.glb
 */

async function uploadNigoModelToFirebase() {
  try {
    const sneakerSlug = 'nike-air-force-3-low-sp-nigo-x-levis-olive-grey-hq0262-001';
    
    // Get file path from command line argument or use default
    const filePath = process.argv[2] || path.join(process.cwd(), 'nike-air-force-nigo.glb');
    
    console.log('🎨 Starting upload for Nike Air Force 3 Low SP Nigo...\n');
    console.log(`📁 File path: ${filePath}`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('❌ File not found:', filePath);
      console.log('\nℹ️  Please download the GLB file from Meshy AI first:');
      console.log('   https://www.meshy.ai/3d-models/Retro-Sneaker-Classic-v2-019b666b-5c85-78d5-a8fa-06c42c9fd1ae');
      console.log('\nThen either:');
      console.log('   1. Save it as "nike-air-force-nigo.glb" in the project root');
      console.log('   2. Or pass the file path: npx tsx scripts/upload-nigo-model-to-firebase.ts /path/to/model.glb');
      process.exit(1);
    }
    
    // Get sneaker from database
    const existingSneaker = await db
      .select()
      .from(sneakers)
      .where(eq(sneakers.slug, sneakerSlug))
      .limit(1);
    
    if (existingSneaker.length === 0) {
      console.error('❌ Sneaker not found with slug:', sneakerSlug);
      process.exit(1);
    }
    
    const sneaker = existingSneaker[0];
    console.log(`✅ Found sneaker: ${sneaker.name}`);
    console.log(`   ID: ${sneaker.id}\n`);
    
    // Read the file
    console.log('📖 Reading GLB file...');
    const fileBuffer = fs.readFileSync(filePath);
    const fileSize = (fileBuffer.length / 1024 / 1024).toFixed(2);
    console.log(`   Size: ${fileSize} MB\n`);
    
    // Upload to Firebase Storage
    console.log('☁️  Uploading to Firebase Storage...');
    const firebasePath = `3d-models/${sneaker.id}/model.glb`;
    
    try {
      const uploadResult = await uploadFileToFirebase(
        fileBuffer,
        firebasePath,
        'model/gltf-binary'
      );
      
      console.log('✅ Successfully uploaded to Firebase!');
      console.log(`   Firebase URL: ${uploadResult.publicUrl}\n`);
      
      // Update sneaker in database
      console.log('💾 Updating database...');
      const result = await db
        .update(sneakers)
        .set({ 
          modelUrl: uploadResult.publicUrl,
          updatedAt: new Date()
        })
        .where(eq(sneakers.slug, sneakerSlug))
        .returning();
      
      if (result.length > 0) {
        console.log('✅ Successfully updated sneaker in database!');
        console.log('\n📦 Updated sneaker:', {
          name: result[0].name,
          slug: result[0].slug,
          modelUrl: result[0].modelUrl
        });
        console.log('\n🎉 AR Try-On is now ready for this sneaker!');
        console.log('   Visit /ar-tryon and select this sneaker to test.');
      } else {
        console.error('❌ Failed to update sneaker in database');
      }
      
    } catch (uploadError: any) {
      console.error('❌ Error uploading to Firebase:', uploadError.message);
      throw uploadError;
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Run the script
uploadNigoModelToFirebase();
