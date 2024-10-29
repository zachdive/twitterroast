const fetch = require('node-fetch');

async function testApiRoute() {
  try {
    console.log('Sending request to API...');
    const response = await fetch('http://localhost:3000/api/roast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ twitterUrl: 'https://twitter.com/example' }),
    });

    console.log('Response status:', response.status);
    const data = await response.text();
    console.log('Response data:', data);

    try {
      const jsonData = JSON.parse(data);
      console.log('Parsed JSON data:', jsonData);
    } catch (jsonError) {
      console.error('Error parsing JSON:', jsonError);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testApiRoute();
