#!/usr/bin/env node

/**
 * Test attempt creation API
 */

import https from 'https';

const productionUrl = 'proto-vocab-ahmedabad.vercel.app';

console.log('🔍 Testing Attempt Creation API...\n');

function testAttemptAPI() {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      studentId: '00000000-0000-0000-0000-000000000000', // Dummy ID for testing
      lessonId: 'e61e6fa3-066e-470c-9e45-b6699403c0e7'
    });

    const options = {
      hostname: productionUrl,
      path: '/api/student/attempt',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    console.log('📡 POST', `https://${productionUrl}${options.path}`);
    console.log('Body:', postData);
    console.log('');

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Response:', data);
        console.log('');

        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log('✅ Attempt creation works!');
        } else {
          console.log('❌ Attempt creation failed!');
          console.log('   This is likely the issue blocking lesson loading.');
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

testAttemptAPI();
