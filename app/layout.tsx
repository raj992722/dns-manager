import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import ConvexClientProvider from "@/components/provider/ConvexClientProvider";
import AuthConvexProviderWithClerk from "@/components/provider/covexProviderWithClerk";
import { ThemeProvider } from "@/components/provider/ThemeProvider";

import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DNS Manager",
  description: "A place for handling all your data records",
  icons:{
    icon :[
      {
        media:"(prefers-color-scheme: light",
        url: "/logo.svg",
        href : "/logo.svg"
      },
      {
        media:"(prefers-color-scheme: dark",
        url: "/logo.svg",
        href : "/logo.svg"
      },

    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <AuthConvexProviderWithClerk>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
          <Toaster  position="bottom-center"/>

        
        {children}
       
        </ThemeProvider>
        </AuthConvexProviderWithClerk>
        </body>
    </html>
  );
}
