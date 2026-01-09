#!/usr/bin/env node

/**
 * Test attempt creation directly via Supabase
 */

import https from 'https';
import fs from 'fs';

// Read .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const serviceKey = envContent.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim();
const supabaseUrl = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();

console.log('🔍 Testing Attempt Creation Directly...\n');

// First, get a real student ID
function getStudent() {
  return new Promise((resolve) => {
    const url = new URL(supabaseUrl);
    const options = {
      hostname: url.hostname,
      path: '/rest/v1/students?select=id,name&limit=1',
      method: 'GET',
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json'
      }
    };

    console.log('📡 Getting a real student ID...');

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const students = JSON.parse(data);
          if (students.length > 0) {
            console.log('   ✅ Found student:', students[0].name);
            console.log('   ID:', students[0].id);
            console.log('');
            resolve(students[0].id);
          } else {
            console.log('   ⚠️  No students in database');
            console.log('');
            resolve(null);
          }
        } else {
          console.log('   ❌ Failed to get students');
          console.log('');
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.end();
  });
}

// Create attempt
function createAttempt(studentId) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      student_id: studentId,
      lesson_id: 'e61e6fa3-066e-470c-9e45-b6699403c0e7',
      started_at: new Date().toISOString()
    });

    const url = new URL(supabaseUrl);
    const options = {
      hostname: url.hostname,
      path: '/rest/v1/attempts',
      method: 'POST',
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    console.log('📡 Creating attempt...');
    console.log('   Student ID:', studentId);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('   Status:', res.statusCode);
        console.log('   Response:', data);
        console.log('');

        if (res.statusCode === 201) {
          console.log('✅ SUCCESS - Attempt created!');
          console.log('   The RLS policies are working correctly.');
          console.log('   Issue must be with the studentId in the session.');
        } else {
          console.log('❌ FAIL - Attempt creation blocked');
          console.log('   This is the root cause of the lesson loading failure.');
        }
        resolve();
      });
    });

    req.on('error', (error) => {
      console.log('❌ Request failed:', error.message);
      resolve();
    });

    req.write(postData);
    req.end();
  });
}

async function test() {
  const studentId = await getStudent();
  if (studentId) {
    await createAttempt(studentId);
  } else {
    console.log('⚠️  Cannot test - no students in database');
    console.log('   Please login as a student first to create a student record.');
  }
}

test();
