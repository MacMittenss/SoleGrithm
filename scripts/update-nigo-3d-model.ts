import { db } from '../server/db';
import { sneakers } from '../shared/schema';
import { eq } from 'drizzle-orm';

/**
 * Script to update Nike Air Force 3 Low SP Nigo with Meshy AI 3D model URL
 * 
 * The Meshy AI URL for the Nike Air Force 3 Low SP Nigo is:
 * https://www.meshy.ai/3d-models/Retro-Sneaker-Classic-v2-019b666b-5c85-78d5-a8fa-06c42c9fd1ae
 * 
 * This script will extract the model ID and construct the direct GLB download URL
 */

async function updateNigo3DModel() {
  try {
    console.log('🎨 Starting update for Nike Air Force 3 Low SP Nigo 3D model...\n');

    const sneakerSlug = 'nike-air-force-3-low-sp-nigo-x-levis-olive-grey-hq0262-001';
    
    // Meshy AI model page URL
    const meshyPageUrl = 'https://www.meshy.ai/3d-models/Retro-Sneaker-Classic-v2-019b666b-5c85-78d5-a8fa-06c42c9fd1ae';
    
    // Extract the model ID from the URL
    const modelId = '019b666b-5c85-78d5-a8fa-06c42c9fd1ae';
    
    // Meshy AI provides download URLs in this format (based on their CDN structure):
    // The actual download URL may need to be obtained via their API or download button
    // Common patterns for Meshy AI:
    // - Direct CDN: https://assets.meshy.ai/{modelId}/model.glb
    // - Task-based: https://api.meshy.ai/v2/text-to-3d/{taskId} (requires API)
    
    // Since we're using a community/shared model, we'll try the common CDN pattern
    // If this doesn't work, the model may need to be downloaded manually and uploaded to Firebase
    const modelUrl = `https://assets.meshy.ai/${modelId}/model.glb`;
    
    // Alternative: You can also store the page URL and download manually
    // const modelUrl = meshyPageUrl;
    
    console.log(`📍 Sneaker Slug: ${sneakerSlug}`);
    console.log(`🔗 Model Page: ${meshyPageUrl}`);
    console.log(`🔗 Model URL: ${modelUrl}\n`);

    // Check if sneaker exists
    const existingSneaker = await db
      .select()
      .from(sneakers)
      .where(eq(sneakers.slug, sneakerSlug))
      .limit(1);

    if (existingSneaker.length === 0) {
      console.error('❌ Sneaker not found with slug:', sneakerSlug);
      console.log('ℹ️  Please ensure the sneaker exists in the database first.');
      process.exit(1);
    }

    console.log(`✅ Found sneaker: ${existingSneaker[0].name}`);
    console.log(`   Current model URL: ${existingSneaker[0].modelUrl || 'None'}\n`);

    // Update the sneaker with the model URL
    const result = await db
      .update(sneakers)
      .set({ 
        modelUrl: modelUrl,
        updatedAt: new Date()
      })
      .where(eq(sneakers.slug, sneakerSlug))
      .returning();

    if (result.length > 0) {
      console.log('✅ Successfully updated sneaker 3D model URL!');
      console.log('📦 Updated sneaker:', {
        name: result[0].name,
        slug: result[0].slug,
        modelUrl: result[0].modelUrl
      });
      console.log('\n📝 Next Steps:');
      console.log('   1. Test the URL to ensure the GLB file is accessible');
      console.log('   2. If the URL doesn\'t work, download the model from Meshy AI');
      console.log('   3. Upload to Firebase Storage using the upload script');
      console.log('   4. Update the modelUrl with the Firebase Storage URL');
      console.log('\n💡 Alternatively, you can use the API to regenerate from the sneaker image:');
      console.log('   POST /api/meshy/sneaker/:sneakerId');
    } else {
      console.error('❌ Failed to update sneaker');
    }

  } catch (error) {
    console.error('❌ Error updating sneaker:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Run the script
updateNigo3DModel();
