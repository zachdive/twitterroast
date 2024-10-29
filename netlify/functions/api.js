const generateMockRoast = (twitterUrl) => {
  const roasts = [
    `Wow, ${twitterUrl}? More like 'Twitter.com/ProfessionalOversharer', am I right?`,
    `I checked out ${twitterUrl}, and let's just say, I've seen more exciting content on the back of a cereal box.`,
    `${twitterUrl}? More like 'Twitter.com/MasterOfMundane'. Your tweets are so vanilla, they make beige look exciting.`,
    `I tried to roast ${twitterUrl}, but your tweets already burned my eyes. Ouch!`,
    `${twitterUrl} - where memes go to retire and dad jokes find their second wind.`,
  ];
  return roasts[Math.floor(Math.random() * roasts.length)];
};

const logError = (message, error, context = {}) => {
  console.error(`[${new Date().toISOString()}] ERROR: ${message}:`, error, 'Context:', JSON.stringify(context));
};

const logInfo = (message, context = {}) => {
  console.log(`[${new Date().toISOString()}] INFO: ${message}`, 'Context:', JSON.stringify(context));
};

const logWarning = (message, context = {}) => {
  console.warn(`[${new Date().toISOString()}] WARNING: ${message}`, 'Context:', JSON.stringify(context));
};

const isValidTwitterUrl = (url) => {
  // Basic URL validation, can be enhanced for more specific Twitter URL validation
  return url.startsWith('https://twitter.com/') || url.startsWith('https://x.com/');
};

exports.handler = async (event, context) => {
  const requestId = context.awsRequestId || 'unknown';
  logInfo(`Received ${event.httpMethod} request`, { requestId, path: event.path });

  if (event.httpMethod !== 'POST') {
    logWarning(`Method Not Allowed: ${event.httpMethod}`, { requestId, method: event.httpMethod });
    return {
      statusCode: 405,
      body: JSON.stringify({ error: `Method Not Allowed: ${event.httpMethod}`, requestId })
    };
  }

  try {
    if (!event.body) {
      logWarning('Empty request body', { requestId });
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Request body is empty', requestId })
      };
    }

    const { twitterUrl } = JSON.parse(event.body);
    logInfo(`Parsed request body`, { requestId, twitterUrl });

    if (!twitterUrl) {
      logWarning('Twitter URL is missing', { requestId });
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Twitter URL is required', requestId })
      };
    }

    if (!isValidTwitterUrl(twitterUrl)) {
      logWarning(`Invalid Twitter URL`, { requestId, twitterUrl });
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid Twitter URL format', requestId })
      };
    }

    const roast = generateMockRoast(twitterUrl);
    logInfo(`Generated roast`, { requestId, twitterUrl, roast });

    return {
      statusCode: 200,
      body: JSON.stringify({ roast, requestId }),
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
      logError('Invalid JSON in request body', error, { requestId, body: event.body });
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid JSON in request body', requestId }),
      };
    }

    logError('Error generating roast', error, { requestId, event });
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate roast', requestId }),
    };
  }
};
