import ClientLayoutLogic from '../../../components/ClientLayoutLogic';
import '../../../components/globals.css';

import { Geist_Sans, Geist_Mono } from "next/font/google";

const geistSans = Geist_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Moaka',
  description: 'Moaka is a portfolio website for an artist to showcase their work.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //   need to become dynamic at some point
  const isAuthenticated = true;
  const unreadNotificationsCount = 5;

  return (
    <html lang="en">
      <head>
        <script
            dangerouslySetInnerHTML={{
                __html: `
                if (localStorage.getItem('theme') === 'dark') {
                    document.documentElement.classList.add('dark-mode');
                }
                `,
            }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayoutLogic isAuthenticated={isAuthenticated} unreadNotificationsCount={unreadNotificationsCount}>
          {children}
        </ClientLayoutLogic>
      </body>
    </html>
  );
}