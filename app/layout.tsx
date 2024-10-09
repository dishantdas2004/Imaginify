import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import {
  ClerkProvider,
  SignInButton,
  SignedOut,
} from "@clerk/nextjs";

const IBMPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  title: "Imaginify",
  description: "AI-powered image generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
    afterSignOutUrl="/"
    appearance={{
      variables: {colorPrimary: '#624cf5'}
    }} >
      <html lang="en">
        <body className={cn("font-IMBPlex antialiased", IBMPlex.variable)}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
