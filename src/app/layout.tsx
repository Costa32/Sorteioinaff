import type { Metadata } from "next";

import { Roboto } from 'next/font/google';
import "./globals.css";
import { ChakraUIProvider } from "@/components/ui/provider";

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  weight: ["100", "300", "400", "700", "900"]
});

export const metadata: Metadata = {
  title: "INAFF",
  description: "Formulário de cadastro ou atualização de usuários do Inaff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable}`}>
        <ChakraUIProvider>{children}</ChakraUIProvider>
      </body>
    </html>
  );
}
