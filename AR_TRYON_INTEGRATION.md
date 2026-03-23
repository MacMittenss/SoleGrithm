# AR Try-On Integration with Meshy AI

## Overview
This document explains how to integrate the Nike Air Force 3 Low SP Nigo 3D model from Meshy AI into the AR Try-On feature.

## Meshy AI Model URL
**Model Page**: https://www.meshy.ai/3d-models/Retro-Sneaker-Classic-v2-019b666b-5c85-78d5-a8fa-06c42c9fd1ae
**Model ID**: `019b666b-5c85-78d5-a8fa-06c42c9fd1ae`

## Current Status
✅ Added `model_url` field to database schema
✅ Created migration script
✅ Updated ARTryOn component to use model URLs from database
✅ Added Nike Air Force 3 Low SP Nigo slug to database (tentative URL)

## Issue: Direct URL Access
The constructed URL `https://assets.meshy.ai/019b666b-5c85-78d5-a8fa-06c42c9fd1ae/model.glb` returns a 403 Forbidden error. This means the model files are protected and cannot be accessed directly.

## Solutions

### Option 1: Download from Meshy AI (Recommended)
1. Go to the model page: https://www.meshy.ai/3d-models/Retro-Sneaker-Classic-v2-019b666b-5c85-78d5-a8fa-06c42c9fd1ae
2. Click the download button to download the GLB file
3. Upload the GLB file to Firebase Storage manually or using a script
4. Update the database with the Firebase Storage URL

### Option 2: Use Meshy AI API
If you have a Meshy AI API key and the model is in your account:
1. Use the Meshy AI API to download the model
2. Save it to Firebase Storage
3. Update the database with the Firebase URL

### Option 3: Regenerate from Sneaker Image
Use the existing API endpoint to generate a new 3D model from the sneaker's image:
```bash
POST /api/meshy/sneaker/:sneakerId
```

This will:
- Use the sneaker's main image
- Generate a 3D model via Meshy AI
- Automatically upload to Firebase Storage
- Return the permanent Firebase URL

## Database Schema

### Sneakers Table
```sql
ALTER TABLE sneakers ADD COLUMN model_url TEXT;
```

The `model_url` column stores the URL to the GLB 3D model file for AR Try-On.

## Scripts Created

### 1. Add Model URL Column
```bash
npx tsx scripts/add-model-url-column.ts
```

### 2. Update Nigo 3D Model
```bash
npx tsx scripts/update-nigo-3d-model.ts
```

## AR Try-On Implementation

The ARTryOn component now:
1. Checks if a sneaker has a `modelUrl` in the database
2. If yes, uses that URL directly (fast loading)
3. If no, generates a new 3D model via the API (first time only)
4. Stores the generated model URL in the database for future use

## Next Steps

### To Complete Integration:
1. **Download the model from Meshy AI**
   - Visit the model page
   - Download the GLB file

2. **Upload to Firebase Storage**
   - You can use the existing Firebase storage service
   - Place it in the `3d-models/` directory
   - Get the public URL

3. **Update the database**
   ```typescript
   await db
     .update(sneakers)
     .set({ modelUrl: 'YOUR_FIREBASE_URL_HERE' })
     .where(eq(sneakers.slug, 'nike-air-force-3-low-sp-nigo-x-levis-olive-grey-hq0262-001'));
   ```

### OR Use the API:
1. Find the sneaker ID for Nike Air Force 3 Low SP Nigo
2. Call the generation endpoint:
   ```bash
   curl -X POST http://localhost:5000/api/meshy/sneaker/SNEAKER_ID
   ```
3. Wait for the model to generate (may take 5-10 minutes)
4. The model will be automatically stored in the database

## Files Modified

1. `/shared/schema.ts` - Added `modelUrl` field to sneakers table
2. `/client/src/pages/ARTryOn.tsx` - Updated to use modelUrl from database
3. `/server/migrations/add-model-url-to-sneakers.sql` - Migration file
4. `/scripts/add-model-url-column.ts` - Script to add the column
5. `/scripts/update-nigo-3d-model.ts` - Script to update Nike Air Force 3 Low SP Nigo

## Testing

Once you have uploaded the GLB file to Firebase Storage and updated the database:

1. Navigate to `/ar-tryon` page
2. Select "Nike Air Force 3 Low SP Nigo x Levi's Olive Grey"
3. The 3D model should load in the viewer
4. You can rotate and inspect the model
5. Switch to "Live AR" mode to try it with your camera

## Additional Notes

- The Meshy AI community models may have usage restrictions
- Consider generating your own models from sneaker images for full control
- Firebase Storage provides reliable, permanent URLs for 3D models
- The AR Try-On feature works best with GLB format (compact and web-optimized)
