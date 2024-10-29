import { Handler } from '@netlify/functions';

// Mock function to generate a roast
function generateMockRoast(twitterUrl: string): string {
  const roasts = [
    `Wow, ${twitterUrl}? More like 'Twitter.com/ProfessionalOversharer', am I right?`,
    `I checked out ${twitterUrl}, and let's just say, I've seen more exciting content on the back of a cereal box.`,
    `${twitterUrl}? More like 'Twitter.com/MasterOfMundane'. Your tweets are so vanilla, they make beige look exciting.`,
    `I tried to roast ${twitterUrl}, but your tweets already burned my eyes. Ouch!`,
    `${twitterUrl} - where memes go to retire and dad jokes find their second wind.`,
  ];
  return roasts[Math.floor(Math.random() * roasts.length)];
}

const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { twitterUrl } = JSON.parse(event.body || '{}');

    if (!twitterUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Twitter URL is required' }),
      };
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const roast = generateMockRoast(twitterUrl);

    return {
      statusCode: 200,
      body: JSON.stringify({ roast }),
    };
  } catch (error) {
    console.error('Error generating roast:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate roast' }),
    };
  }
};

export { handler };
