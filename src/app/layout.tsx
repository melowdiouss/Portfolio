import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shreyansh | Full-Stack Developer Portfolio",
  description: "Full-stack developer specializing in React, Next.js, Node.js, and modern web technologies. View my projects, skills, and get in touch.",
  keywords: ["portfolio", "full-stack developer", "react", "next.js", "node.js", "web developer"],
  authors: [{ name: "Shreyansh" }],
  openGraph: {
    title: "Shreyansh | Full-Stack Developer",
    description: "Full-stack developer building performant, elegant digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen min-w-screen">
        {children}
      </body>
    </html>
  );
}
