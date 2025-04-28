import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import '@/index.css';

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
});

export const metadata: Metadata = {
  title: "Tobey's Tutor",
  description: 'Unlock potential. Celebrate neurodiversity. Transform learning.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body>
        <div id="root">
          {children}
        </div>
        <script src="https://cdn.gpteng.co/gptengineer.js" type="module" />
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `
              window.gptengineerConfig = {
                webhookUrl: 'https://n8n.tobeystutor.com/webhook/chat',
                disableLatestMessage: true 
              };
            `,
          }}
        />
      </body>
    </html>
  );
} 