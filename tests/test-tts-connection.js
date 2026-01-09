#!/usr/bin/env node

/**
 * Test Google Cloud Text-to-Speech API Connection
 * Run this after setting up GOOGLE_CLOUD_TTS_API_KEY in .env.local
 */

require('dotenv').config({ path: '.env.local' })

const API_KEY = process.env.GOOGLE_CLOUD_TTS_API_KEY
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID

console.log('🔍 Testing Google Cloud TTS API Connection\n')
console.log('=' .repeat(60))

// Check credentials
console.log('\n📋 Checking Credentials...')

if (!PROJECT_ID) {
  console.log('❌ GOOGLE_CLOUD_PROJECT_ID not found in .env.local')
  console.log('   Please add your Google Cloud Project ID')
  process.exit(1)
} else {
  console.log('✅ Project ID found:', PROJECT_ID)
}

if (!API_KEY) {
  console.log('❌ GOOGLE_CLOUD_TTS_API_KEY not found in .env.local')
  console.log('   Please add your Google Cloud API Key')
  process.exit(1)
} else {
  console.log('✅ API Key found:', API_KEY.substring(0, 10) + '...')
}

// Test API connection
console.log('\n🌐 Testing API Connection...')

const testText = 'Hello. This is a test of the Indian English voice.'

async function testTTS() {
  try {
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text: testText },
          voice: {
            languageCode: 'en-IN',
            name: 'en-IN-Wavenet-D',
            ssmlGender: 'FEMALE',
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 0.9,
            pitch: 0.5,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }

      console.log('\n❌ API Request Failed')
      console.log('   Status:', response.status, response.statusText)
      console.log('   Error:', errorData.error?.message || errorData.message || 'Unknown error')

      if (response.status === 403) {
        console.log('\n💡 Troubleshooting:')
        console.log('   1. Verify API key is correct in .env.local')
        console.log('   2. Check "Cloud Text-to-Speech API" is enabled in Google Cloud Console')
        console.log('   3. Verify API key restrictions allow this API')
      } else if (response.status === 400) {
        console.log('\n💡 Troubleshooting:')
        console.log('   1. Check request format is correct')
        console.log('   2. Verify voice name "en-IN-Wavenet-D" is available')
      }

      process.exit(1)
    }

    const data = await response.json()

    if (!data.audioContent) {
      console.log('❌ No audio content returned')
      process.exit(1)
    }

    console.log('✅ API Connection Successful')
    console.log('✅ Audio generated successfully')
    console.log('   Voice: en-IN-Wavenet-D (Indian English Female)')
    console.log('   Text: "' + testText + '"')
    console.log('   Audio size:', data.audioContent.length, 'characters (base64)')

    // Calculate approximate duration (rough estimate)
    const approximateBytes = data.audioContent.length * 0.75 // base64 to bytes
    const approximateDuration = approximateBytes / 16000 // rough MP3 bitrate
    console.log('   Estimated duration:', approximateDuration.toFixed(1), 'seconds')

    console.log('\n' + '='.repeat(60))
    console.log('✅ Google Cloud TTS Setup Complete!')
    console.log('=' .repeat(60))
    console.log('\nYour TTS API is working correctly.')
    console.log('The app will use this voice for all audio:')
    console.log('  • Language: Indian English (en-IN)')
    console.log('  • Voice: Wavenet-D (Female)')
    console.log('  • Speed: 0.9x (slightly slower for children)')
    console.log('  • Pitch: 0.5 (slightly higher)')
    console.log('\n✨ You can now proceed with the UX implementation!')

  } catch (error) {
    console.log('\n❌ Connection Error')
    console.log('   Error:', error.message)
    console.log('\n💡 Troubleshooting:')
    console.log('   1. Check your internet connection')
    console.log('   2. Verify firewall is not blocking Google Cloud APIs')
    console.log('   3. Try running: curl https://texttospeech.googleapis.com')
    process.exit(1)
  }
}

testTTS()
