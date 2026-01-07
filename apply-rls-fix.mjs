#!/usr/bin/env node

/**
 * Apply RLS Fix to Supabase Database
 * This uses Supabase's postgrest API to execute raw SQL
 */

import fs from 'fs';
import https from 'https';

// Read .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const serviceKey = envContent.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim();
const supabaseUrl = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();

// Read SQL
const sqlContent = fs.readFileSync('COMPLETE_RLS_FIX.sql', 'utf8');

console.log('🔧 Applying RLS Fix to Supabase...\n');

// Split SQL into individual statements
const statements = sqlContent
  .split(';')
  .map(s => s.trim())
  .filter(s => s && !s.startsWith('--') && s !== 'BEGIN' && s !== 'COMMIT');

console.log(`📝 Found ${statements.length} SQL statements to execute\n`);

// Function to execute a single query via Supabase
async function executeQuery(sql) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ query: sql });

    const options = {
      hostname: supabaseUrl.replace('https://', '').replace('http://', ''),
      path: '/rest/v1/rpc/query',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Prefer': 'return=representation'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, data });
        } else {
          resolve({ success: false, status: res.statusCode, data });
        }
      });
    });

    req.on('error', (error) => reject(error));
    req.write(postData);
    req.end();
  });
}

console.log('⚠️  Supabase does not allow direct SQL execution via REST API for security.');
console.log('📋 You need to run the SQL manually in the Supabase Dashboard.\n');
console.log('📍 Steps:');
console.log('   1. Go to: https://supabase.com/dashboard/project/sguffpxuaahivvponwfb/sql');
console.log('   2. Click "New Query"');
console.log('   3. Copy the entire contents of: COMPLETE_RLS_FIX.sql');
console.log('   4. Paste into the editor');
console.log('   5. Click "Run" button\n');
console.log('✨ The fix will take less than 1 second to apply!');
