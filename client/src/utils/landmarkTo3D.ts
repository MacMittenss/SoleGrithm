/**
 * Utility functions for converting MediaPipe 2D landmarks to 3D world space positions
 */

export interface Landmark {
  x: number; // Normalized 0-1
  y: number; // Normalized 0-1
  z: number; // Depth
  visibility?: number;
}

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface FootPosition3D {
  anchor: Position3D;
  rotation: number;
  scale: number;
}

/**
 * Convert a normalized 2D landmark to 3D world space coordinates
 * @param landmark - MediaPipe landmark with normalized x, y coordinates
 * @param viewportWidth - Width of the video/canvas viewport
 * @param viewportHeight - Height of the video/canvas viewport
 * @returns 3D position in world space
 */
export function landmarkTo3DPosition(
  landmark: Landmark,
  viewportWidth: number,
  viewportHeight: number
): Position3D {
  // Convert normalized coordinates (0-1) to centered coordinates
  // (0.5, 0.5) becomes (0, 0)
  const x = (landmark.x - 0.5) * viewportWidth;
  
  // Flip Y axis (screen Y increases downward, 3D Y increases upward)
  const y = -(landmark.y - 0.5) * viewportHeight;
  
  // Use the z value from MediaPipe as depth
  // Scale it appropriately for your scene
  const z = landmark.z * 100; // Adjust scaling factor as needed
  
  return { x, y, z };
}

/**
 * Calculate foot position and orientation from ankle and toe landmarks
 * @param ankle - Ankle/heel landmark
 * @param toe - Toe landmark
 * @param viewportWidth - Width of viewport
 * @param viewportHeight - Height of viewport
 * @returns Foot position with anchor point, rotation, and scale
 */
export function calculateFootPosition(
  ankle: Landmark,
  toe: Landmark,
  viewportWidth: number,
  viewportHeight: number
): FootPosition3D {
  // Get 3D positions
  const anklePos = landmarkTo3DPosition(ankle, viewportWidth, viewportHeight);
  const toePos = landmarkTo3DPosition(toe, viewportWidth, viewportHeight);
  
  // Anchor point is at the ankle/heel
  const anchor = anklePos;
  
  // Calculate rotation angle from ankle to toe direction
  const dx = toePos.x - anklePos.x;
  const dy = toePos.y - anklePos.y;
  const rotation = Math.atan2(dy, dx);
  
  // Estimate scale based on foot length (distance from ankle to toe)
  const footLength = Math.sqrt(dx * dx + dy * dy);
  
  // Average adult foot is ~25cm, scale accordingly
  // This is a rough estimate - you may need to calibrate
  const scale = footLength / 100; // Adjust divisor for your 3D model scale
  
  return {
    anchor,
    rotation,
    scale
  };
}

/**
 * Calculate both feet positions
 * @param leftFoot - Left foot landmarks (ankle, toe)
 * @param rightFoot - Right foot landmarks (ankle, toe)
 * @param viewportWidth - Width of viewport
 * @param viewportHeight - Height of viewport
 * @returns Object with left and right foot positions
 */
export function calculateBothFeetPositions(
  leftFoot: { ankle: Landmark; toe: Landmark },
  rightFoot: { ankle: Landmark; toe: Landmark },
  viewportWidth: number,
  viewportHeight: number
): { left: FootPosition3D; right: FootPosition3D } {
  return {
    left: calculateFootPosition(
      leftFoot.ankle,
      leftFoot.toe,
      viewportWidth,
      viewportHeight
    ),
    right: calculateFootPosition(
      rightFoot.ankle,
      rightFoot.toe,
      viewportWidth,
      viewportHeight
    )
  };
}

/**
 * Smooth position updates using exponential moving average
 * Helps reduce jitter in tracking
 */
export class PositionSmoother {
  private previousPosition: Position3D | null = null;
  private smoothingFactor: number;

  constructor(smoothingFactor: number = 0.3) {
    this.smoothingFactor = smoothingFactor;
  }

  smooth(newPosition: Position3D): Position3D {
    if (!this.previousPosition) {
      this.previousPosition = newPosition;
      return newPosition;
    }

    const smoothed = {
      x: this.previousPosition.x + (newPosition.x - this.previousPosition.x) * this.smoothingFactor,
      y: this.previousPosition.y + (newPosition.y - this.previousPosition.y) * this.smoothingFactor,
      z: this.previousPosition.z + (newPosition.z - this.previousPosition.z) * this.smoothingFactor
    };

    this.previousPosition = smoothed;
    return smoothed;
  }

  reset() {
    this.previousPosition = null;
  }
}
