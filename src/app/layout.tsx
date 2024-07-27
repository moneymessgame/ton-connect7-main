import type { Metadata } from "next";

import Script from 'next/script';

import { Inter } from "next/font/google";
import "./globals.css";

import LangProvider from '@/components/providers/lang-provider';
import { ThemeProvider } from "@/components/providers/theme-provider";
import TmaProvider from "@/components/providers/tma-provider";
import TonProvider from "@/components/providers/ton-provider";

import { ModalProvider } from '@/contexts/ModalContext';
import { UserProvider } from '@/contexts/UserContext';

import Navigation from "@/components/Navigation";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Money Mess Game",
  description: "Best app in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        <LangProvider>
          <TonProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <TmaProvider>
                <UserProvider>
                  <ModalProvider>
                    <main className="flex min-h-screen flex-col items-center justify-between">
                      {children}
											{/* <Toaster /> */}
                      <Navigation />
                    </main>
                  </ModalProvider>
                </UserProvider>
              </TmaProvider>
            </ThemeProvider>
          </TonProvider> 
        </LangProvider>  
      </body>
    </html>
  );
}
