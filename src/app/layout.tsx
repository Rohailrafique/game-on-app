import { ReactqueryProvider } from "./ReactQueryProvider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movie Web App",
  description: "Movie Web App with TMDB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactqueryProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ReactqueryProvider>
  );
}
