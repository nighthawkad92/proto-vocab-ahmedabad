#!/usr/bin/env node

/**
 * Execute RLS Fix SQL on Supabase
 * This script runs the complete RLS fix using the service role key
 */

const fs = require('fs');
const https = require('https');

// Read credentials from .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const serviceKey = envContent.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim();
const supabaseUrl = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();

// Read SQL file
const sql = fs.readFileSync('COMPLETE_RLS_FIX.sql', 'utf8');

// Supabase REST API endpoint for SQL execution
const url = new URL('/rest/v1/rpc/exec_sql', supabaseUrl);

console.log('🔧 Executing RLS Fix SQL...');
console.log('📍 Supabase URL:', supabaseUrl);
console.log('📄 SQL Length:', sql.length, 'characters');
console.log('');

// Make request using Node's built-in https module
const postData = JSON.stringify({ query: sql });

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': serviceKey,
    'Authorization': `Bearer ${serviceKey}`,
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(url, options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 201) {
      console.log('✅ RLS Fix executed successfully!');
      console.log('');
      try {
        const result = JSON.parse(data);
        console.log('Response:', result);
      } catch (e) {
        console.log('Raw response:', data);
      }
    } else {
      console.error('❌ Error executing SQL');
      console.error('Status:', res.statusCode);
      console.error('Response:', data);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
  console.log('');
  console.log('⚠️  Unable to execute via REST API.');
  console.log('📋 Please run the SQL manually:');
  console.log('   1. Go to: https://supabase.com/dashboard');
  console.log('   2. Open SQL Editor');
  console.log('   3. Copy contents of COMPLETE_RLS_FIX.sql');
  console.log('   4. Paste and click Run');
  process.exit(1);
});

req.write(postData);
req.end();
