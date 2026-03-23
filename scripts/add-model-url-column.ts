import { pool } from '../server/db';

async function addModelUrlColumn() {
  try {
    console.log('🔧 Adding model_url column to sneakers table...');
    
    const result = await pool.query(`
      ALTER TABLE sneakers 
      ADD COLUMN IF NOT EXISTS model_url TEXT;
    `);
    
    console.log('✅ Successfully added model_url column!');
    console.log('Result:', result);
    
    // Verify the column was added
    const verifyResult = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'sneakers' AND column_name = 'model_url';
    `);
    
    if (verifyResult.rows.length > 0) {
      console.log('✅ Column verified:', verifyResult.rows[0]);
    } else {
      console.log('⚠️  Column not found in schema');
    }
    
  } catch (error) {
    console.error('❌ Error adding column:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

addModelUrlColumn();
