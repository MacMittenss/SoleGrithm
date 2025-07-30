// Test script for Visual Search OpenAI integration
const fs = require('fs');
const path = require('path');

// Test if OpenAI API key is available
console.log('Testing Visual Search OpenAI Integration...');
console.log('OpenAI API Key available:', !!process.env.OPENAI_API_KEY);

// Create a simple test image (1x1 base64 PNG)
const testBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

async function testVisualSearch() {
  try {
    const response = await fetch('http://localhost:5000/api/ai/analyze-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: testBase64
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Visual Search API working!');
      console.log('Response:', JSON.stringify(result, null, 2));
    } else {
      console.log('❌ API Error:', response.status, await response.text());
    }
  } catch (error) {
    console.log('❌ Network Error:', error.message);
  }
}

if (typeof fetch !== 'undefined') {
  testVisualSearch();
} else {
  console.log('Run this in a browser or with fetch polyfill');
}