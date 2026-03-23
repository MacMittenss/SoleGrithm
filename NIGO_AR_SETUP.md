# Nike Air Force 3 Low SP Nigo - AR Try-On Setup

## Quick Summary

I've set up the AR Try-On feature to work with the Nike Air Force 3 Low SP Nigo 3D model from Meshy AI. Here's what's been done:

## ✅ Completed

1. **Database Schema Updated**
   - Added `model_url` TEXT column to `sneakers` table
   - This stores the URL to the GLB 3D model file

2. **Migration Applied**
   - Column successfully added to the database
   - Verified with database query

3. **Database Record Updated**
   - Nike Air Force 3 Low SP Nigo record updated with tentative model URL
   - Sneaker slug: `nike-air-force-3-low-sp-nigo-x-levis-olive-grey-hq0262-001`

4. **AR Try-On Component Enhanced**
   - Now checks for existing `modelUrl` in database first
   - Falls back to generating new models if none exists
   - Shows appropriate loading messages

## 🚧 Next Steps Required

The Meshy AI model URL is **protected** and cannot be accessed directly. You need to:

### Option 1: Manual Download & Upload (Recommended)
```bash
# 1. Download the GLB file from Meshy AI:
#    https://www.meshy.ai/3d-models/Retro-Sneaker-Classic-v2-019b666b-5c85-78d5-a8fa-06c42c9fd1ae
#
# 2. Save it in your project root as 'nike-air-force-nigo.glb'
#
# 3. Run the upload script:
npx tsx scripts/upload-nigo-model-to-firebase.ts

# Or with custom path:
npx tsx scripts/upload-nigo-model-to-firebase.ts /path/to/downloaded/model.glb
```

### Option 2: Generate from Sneaker Image
```bash
# Find the sneaker ID
# Then call the API to generate a new model:
curl -X POST http://localhost:5000/api/meshy/sneaker/SNEAKER_ID

# This will:
# - Generate 3D model from the sneaker's image
# - Upload to Firebase automatically
# - Update database with the Firebase URL
```

## 📁 Files Created/Modified

### Created:
- `/server/migrations/add-model-url-to-sneakers.sql` - Migration file
- `/scripts/add-model-url-column.ts` - Column addition script
- `/scripts/update-nigo-3d-model.ts` - Nigo model URL update script
- `/scripts/upload-nigo-model-to-firebase.ts` - Firebase upload helper
- `/workspaces/SoleGrithm/AR_TRYON_INTEGRATION.md` - Full documentation

### Modified:
- `/shared/schema.ts` - Added `modelUrl` field
- `/client/src/pages/ARTryOn.tsx` - Enhanced to use modelUrl from database

## 🧪 Testing

Once the model is uploaded to Firebase:

1. Navigate to: `http://localhost:5173/ar-tryon`
2. Select "Nike Air Force 3 Low SP Nigo x Levi's Olive Grey"
3. The 3D model should load in the viewer
4. Use mouse/touch to rotate and inspect
5. Switch to "Live AR" to test with camera

## 📝 Important Notes

- **Meshy AI URL**: https://www.meshy.ai/3d-models/Retro-Sneaker-Classic-v2-019b666b-5c85-78d5-a8fa-06c42c9fd1ae
- **Model ID**: `019b666b-5c85-78d5-a8fa-06c42c9fd1ae`
- **Database Slug**: `nike-air-force-3-low-sp-nigo-x-levis-olive-grey-hq0262-001`
- **Current Status**: Model URL set but needs actual GLB file uploaded to Firebase

## 🎯 Current Database State

```javascript
{
  name: 'Nike Air Force 3 Low SP Nigo x Levi's Olive Grey',
  slug: 'nike-air-force-3-low-sp-nigo-x-levis-olive-grey-hq0262-001',
  modelUrl: 'https://assets.meshy.ai/019b666b-5c85-78d5-a8fa-06c42c9fd1ae/model.glb'
  // Note: This URL returns 403 Forbidden - needs to be replaced with Firebase URL
}
```

## 🔗 References

- Meshy AI Documentation: https://docs.meshy.ai/
- Three.js GLB Loader: https://threejs.org/docs/#examples/en/loaders/GLTFLoader
- AR Try-On Component: `/client/src/pages/ARTryOn.tsx`
