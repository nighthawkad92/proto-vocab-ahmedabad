#!/usr/bin/env node

/**
 * Test Lesson API directly to see what's failing
 */

import https from 'https';
import fs from 'fs';

// Read .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const anonKey = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();
const supabaseUrl = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();

const lessonId = 'e61e6fa3-066e-470c-9e45-b6699403c0e7'; // Breaking Big Words

console.log('🔍 Testing Lesson API...\n');
console.log('Lesson ID:', lessonId);
console.log('Supabase URL:', supabaseUrl);
console.log('');

// Test 1: Direct Supabase query
function testSupabaseQuery() {
  return new Promise((resolve, reject) => {
    const url = new URL(supabaseUrl);
    const options = {
      hostname: url.hostname,
      path: `/rest/v1/lessons?id=eq.${lessonId}&select=*`,
      method: 'GET',
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
        'Content-Type': 'application/json'
      }
    };

    console.log('📡 Test 1: Direct Supabase query');
    console.log('   URL:', `${url.origin}${options.path}`);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('   Status:', res.statusCode);
        if (res.statusCode === 200) {
          const lessons = JSON.parse(data);
          if (lessons.length > 0) {
            console.log('   ✅ SUCCESS - Lesson found!');
            console.log('   Title:', lessons[0].title);
            console.log('   Grade:', lessons[0].grade);
            console.log('   Content blocks:', lessons[0].content?.blocks?.length || 'N/A');
          } else {
            console.log('   ❌ FAIL - No lessons returned (empty array)');
          }
        } else {
          console.log('   ❌ FAIL - Error response:', data);
        }
        console.log('');
        resolve();
      });
    });

    req.on('error', (error) => {
      console.log('   ❌ FAIL - Request error:', error.message);
      console.log('');
      resolve();
    });

    req.end();
  });
}

// Test 2: Via Next.js API route (if server is running)
function testNextAPI() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api/student/lesson/${lessonId}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log('📡 Test 2: Next.js API route');
    console.log('   URL:', `http://localhost:3000${options.path}`);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('   Status:', res.statusCode);
        if (res.statusCode === 200) {
          const result = JSON.parse(data);
          console.log('   ✅ SUCCESS - API returned lesson');
          console.log('   Title:', result.lesson?.title);
        } else {
          console.log('   ❌ FAIL - Error:', data);
        }
        console.log('');
        resolve();
      });
    });

    req.on('error', () => {
      console.log('   ⚠️  SKIP - Dev server not running');
      console.log('');
      resolve();
    });

    req.end();
  });
}

// Run tests
async function runTests() {
  await testSupabaseQuery();
  await testNextAPI();

  console.log('🔍 Diagnosis:');
  console.log('   If Test 1 fails: RLS policy issue or lesson not in DB');
  console.log('   If Test 1 passes but Test 2 fails: API route issue');
  console.log('   If both pass: Frontend/client-side issue');
}

runTests();
