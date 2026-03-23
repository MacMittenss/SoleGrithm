# Foot Tracking Implementation - Step 1

## Overview
This document describes the implementation of Step 1 of the AR Virtual Try-On feature: Camera Access and Video Rendering with MediaPipe Foot Tracking.

## What's Been Implemented

### 1. Dependencies Installed
- `@mediapipe/pose` - For pose detection including foot landmarks
- `@mediapipe/drawing_utils` - For visualizing tracking points on canvas
- `@mediapipe/camera_utils` - Already installed for camera handling

### 2. New Component: FootTrackingCamera

**Location**: `/client/src/components/FootTrackingCamera.tsx`

**Features**:
- ✅ Camera access using `navigator.mediaDevices.getUserMedia()`
- ✅ Video rendering as background
- ✅ MediaPipe Pose detection for foot tracking
- ✅ Real-time foot landmark detection (ankles, heels, toes)
- ✅ Visual feedback with canvas overlay showing tracking points
- ✅ Status indicators (foot detected/not detected)
- ✅ Error handling for camera permissions and access issues
- ✅ Loading states and user instructions

**Key Functionality**:

#### Camera Setup
```typescript
const stream = await navigator.mediaDevices.getUserMedia({ 
  video: { 
    facingMode: 'environment',
    width: { ideal: 1280 },
    height: { ideal: 720 }
  } 
});
```

#### Foot Landmarks Detected
The component tracks these specific pose landmarks:
- **Left Foot**: 
  - Landmark 27: Left ankle/heel
  - Landmark 31: Left toe/foot index
- **Right Foot**:
  - Landmark 28: Right ankle/heel
  - Landmark 32: Right toe/foot index

#### Callback Data Structure
When feet are detected, the component calls `onFootDetected` with:
```typescript
{
  leftFoot: {
    ankle: Landmark,
    heel: Landmark,
    toe: Landmark,
    index: Landmark
  },
  rightFoot: {
    ankle: Landmark,
    heel: Landmark,
    toe: Landmark,
    index: Landmark
  },
  allLandmarks: Array<Landmark>
}
```

Each landmark contains:
- `x`: normalized X coordinate (0-1)
- `y`: normalized Y coordinate (0-1)
- `z`: depth value
- `visibility`: confidence score

### 3. Integration with ARTryOn Page

**Updated**: `/client/src/pages/ARTryOn.tsx`

**Changes**:
- Imported `FootTrackingCamera` component
- Added `footLandmarks` state to store detected foot positions
- Added `handleFootDetected` callback to receive landmark data
- Replaced basic camera view with `FootTrackingCamera` component
- Simplified camera initialization (now handled by FootTrackingCamera)
- Added visual display of foot tracking status

## How to Use

### 1. Navigate to AR Try-On Page
Visit `/ar-tryeon` in your browser

### 2. Switch to Live AR Mode
Click the "Live AR" button to switch from 3D view to camera mode

### 3. Grant Camera Permission
When prompted, allow camera access

### 4. Position Camera
Point your camera at your feet. The system will:
- Show a green "Foot Detected" indicator when feet are in view
- Display tracking points on your feet in real-time
- Show foot landmark data in the debug overlay

## Visual Feedback

The component provides several visual cues:

1. **Loading State**: Spinner while initializing camera
2. **Status Indicator**: 
   - Green dot + "Foot Detected" when feet are tracked
   - Yellow dot + "Looking for feet..." when searching
3. **Tracking Overlay**: 
   - Light white lines for full body pose
   - Bright green dots highlighting foot positions
4. **Instructions**: Helpful text guiding users to position their feet
5. **Debug Info**: Small overlay showing left/right foot detection status

## Error Handling

The component handles various camera access issues:
- **NotAllowedError**: Permission denied - shows instructions to allow camera
- **NotFoundError**: No camera detected
- **NotReadableError**: Camera in use by another app
- Generic errors with descriptive messages

## Technical Details

### MediaPipe Pose Configuration
```typescript
{
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: false,
  smoothSegmentation: false,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
}
```

### Canvas Rendering
- Canvas overlays video at exact same dimensions
- Transparent background allows video to show through
- Drawing updates at video frame rate
- Highlights only foot-related landmarks

## Next Steps

Now that Step 1 is complete (camera access and foot tracking), the next steps would be:

### Step 2: 3D Model Positioning
- Use foot landmark positions to calculate placement
- Position 3D sneaker model at foot location
- Scale model based on foot size estimation

### Step 3: Real-time Rendering
- Overlay 3D model on live video feed
- Update model position/rotation as foot moves
- Handle occlusion and perspective

### Step 4: Enhanced Tracking
- Improve accuracy with Kalman filtering
- Add foot size estimation
- Support for both feet simultaneously
- Better handling of partial occlusion

## Testing

To test the implementation:

1. Run the development server: `npm run dev`
2. Navigate to the AR Try-On page
3. Click "Live AR" button
4. Grant camera permission
5. Point camera at your feet
6. Verify:
   - Video feed displays correctly
   - Green tracking dots appear on feet
   - Status indicator shows "Foot Detected"
   - Debug overlay shows both feet detected

## Browser Compatibility

**Requirements**:
- HTTPS connection (required for camera access)
- Modern browser with MediaPipe support
- Camera access permissions

**Tested On**:
- Chrome/Edge (recommended)
- Firefox
- Safari (iOS/macOS)

## Performance Notes

- MediaPipe Pose runs efficiently on most devices
- GPU acceleration used when available
- Frame rate depends on device capabilities
- Model complexity set to 1 for balance of speed/accuracy
