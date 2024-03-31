import "@/styles/globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "./auth/Provider";
import { TRPCReactProvider } from "@/trpc/react";
import Navbar from "./_components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "HavenColiving",
  description: "HavenColiving web-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <AuthProvider>
          <Navbar />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
// $2b$10$76S3.YHNdxdq9NEhDTS5uO4ytjS.QjQKpf5rRkglWbD2TObVcT7Uu
