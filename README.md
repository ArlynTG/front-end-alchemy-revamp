# Tobey's Tutor Chat

This project is a Next.js + TypeScript web application that provides an AI-powered chat tutor called **Tobey**. Students (and parents) can chat with the AI, upload PDF/image report cards, and receive personalized learning plans. The backend uses `createStreamHandler` from the `ai` package to securely proxy OpenAI Assistant API calls.

---

## 1. Installation

### Prerequisites
- Node.js v16 or newer (LTS recommended)
- npm or Yarn

### Install dependencies
```bash
# Using npm
npm install

# Or using yarn
yarn install
```

---

## 2. Environment Variables

### Local Setup
1. Copy the template:
   ```bash
   cp .env.template .env.local
   ```
2. Open `.env.local` and fill in your credentials:
   ```dotenv
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_ASSISTANT_ID=your_openai_assistant_id_here
   ```
3. Save the file. These variables will be available at `process.env.*`.

### Vercel Deployment
1. In your Vercel dashboard, select your project and go to **Settings > Environment Variables**.
2. Add two new variables:
   - **Key**: `OPENAI_API_KEY`
     **Value**: _your production API key_
     **Environment**: `Production` (and `Preview` if desired)
   - **Key**: `OPENAI_ASSISTANT_ID`
     **Value**: _your live assistant ID_
     **Environment**: `Production` (and `Preview` if desired)
3. Deploy or trigger a new build. Vercel will inject these variables at build/runtime.

---

## 3. Running & Testing

### Start the development server
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000/chat](http://localhost:3000/chat) in your browser.

### Chat & File Upload Testing
1. Type a question in the input box and press **Enter** or click **Send**.  
2. Verify that the **Tobey is typing…** indicator appears and you see a streamed response.  
3. Click the 📎 icon and upload a PDF or image file (report card).  
4. Confirm that a preview thumbnail appears, then click **Send**.  
5. Ensure the assistant incorporates the attachment into its response and sends a learning plan.
6. Send multiple messages and verify the conversation context persists (threading) across turns.

---

## 4. Common Troubleshooting

- **No response or 500 error**  
  - Check that your `.env.local` has the correct `OPENAI_API_KEY` and `OPENAI_ASSISTANT_ID`.  
  - Inspect server logs (e.g. `npm run dev` console) for error messages from the `/api/chat` route.  
  - Make sure your OpenAI account has available quota and the assistant ID is correct.

- **`bodyParser` size limit exceeded**  
  - If uploading large PDFs, you may need to increase `sizeLimit` in `src/app/api/chat/route.ts` under `config.api.bodyParser`.

- **CORS or network errors**  
  - Ensure your browser requests to `/api/chat` are same-origin.  
  - Verify that any custom proxy or rewrites in `next.config.js` (if present) allow `/api/chat`.

- **TypeScript / Linter errors**  
  - Run `npm run lint` to view errors.  
  - Install missing types: `npm install --save-dev @types/node @types/react`.

- **Styling mismatch**  
  - Tailwind CSS classes can be tweaked in the components (e.g., `ChatInterface.tsx`, `Navbar.tsx`) to match brand exactness.  

- **Deployment fails**  
  - Double-check Vercel Environment Variables.  
  - Clear build cache or trigger a fresh deploy.

---

## 5. Next Steps
- Refine the AI system prompt to tailor responses for students with dyslexia, ADHD, and learning differences.  
- Add user authentication if you need to store conversation history.  
- Integrate a database to log chat transcripts for analytics.  

Happy coding! 🚀
