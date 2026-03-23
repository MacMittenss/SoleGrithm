-- Add modelUrl column to sneakers table for AR Try-On 3D models
ALTER TABLE sneakers ADD COLUMN IF NOT EXISTS model_url TEXT;

-- Add comment to describe the column
COMMENT ON COLUMN sneakers.model_url IS 'URL to 3D model (GLB format) for AR Try-On feature';
