import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Website Generator Platform",
  description: "Create professional websites for influencers with our easy-to-use platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
