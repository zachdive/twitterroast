import { NextResponse } from 'next/server';

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

export async function POST(req: Request) {
  try {
    const { twitterUrl } = await req.json();

    if (!twitterUrl) {
      return NextResponse.json({ error: 'Twitter URL is required' }, { status: 400 });
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const roast = generateMockRoast(twitterUrl);

    return NextResponse.json({ roast });
  } catch (error) {
    console.error('Error generating roast:', error);
    return NextResponse.json({ error: 'Failed to generate roast' }, { status: 500 });
  }
}
