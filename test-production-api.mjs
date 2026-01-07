#!/usr/bin/env node

/**
 * Test Production API on Vercel
 */

import https from 'https';

const lessonId = 'e61e6fa3-066e-470c-9e45-b6699403c0e7';
const productionUrl = 'proto-vocab-ahmedabad.vercel.app';

console.log('🔍 Testing Production API on Vercel...\n');

function testAPI() {
  return new Promise((resolve) => {
    const options = {
      hostname: productionUrl,
      path: `/api/student/lesson/${lessonId}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log('📡 GET', `https://${productionUrl}${options.path}`);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('');

        if (res.statusCode === 200) {
          try {
            const result = JSON.parse(data);
            console.log('✅ SUCCESS!');
            console.log('Lesson Title:', result.lesson?.title);
            console.log('Lesson Grade:', result.lesson?.grade);
            console.log('Blocks:', result.lesson?.content?.blocks?.length);
            console.log('');
            console.log('🎉 API is working! The issue must be in the frontend code.');
          } catch (e) {
            console.log('❌ FAIL - Invalid JSON response');
            console.log('Response:', data);
          }
        } else {
          console.log('❌ FAIL - Error response');
          console.log('Response:', data);
        }
        resolve();
      });
    });

    req.on('error', (error) => {
      console.log('❌ Request failed:', error.message);
      resolve();
    });

    req.end();
  });
}

testAPI();
