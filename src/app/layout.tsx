import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import styles from "@/app/layout.module.css";

import { QueryProvider } from "@/app/lib/contexts/queryContext";
import { PlaylistProvider } from "./lib/contexts/playlistContext";
import { NotificationProvider } from "./ui/notification/NotificationContext";
import Notification from "./ui/notification/Notification";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Recoz",
  description: "Playlists & Tracks Recommendations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NotificationProvider>
      <PlaylistProvider>
        <QueryProvider>
          <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
              <Notification />
              {children}
              <footer className={styles.footer}>
                <p>@fk</p>
                <a
                  href="https://francoiskerforn.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
                <a
                  href="https://twitter.com/francoiskerforn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                <a
                  href="https://www.linkedin.com/in/fkerforn/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin
                </a>
              </footer>
            </body>
          </html>
        </QueryProvider>
      </PlaylistProvider>
    </NotificationProvider>
  );
}
