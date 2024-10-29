# Twitter Roaster

A Next.js application that roasts Twitter profiles using AI, bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Structure

- `src/`: Contains the source code for the Next.js application
  - `app/`: Next.js app directory
    - `page.tsx`: Main page component
- `netlify/`: Contains Netlify-specific configurations
  - `functions/`: Serverless functions for API routes
- `public/`: Static assets
- `next.config.js`: Next.js configuration file
- `package.json`: Project dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `netlify.toml`: Netlify deployment configuration

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/zachdive/twitterroast.git
   cd twitterroast
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deployment

This project is configured for deployment on Netlify. Push changes to the main branch to trigger automatic deployments.

## Known Issues

- The application currently uses a mock API for roast generation. Integration with the OpenAI API is pending.
- Error handling for invalid Twitter URLs needs improvement.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
