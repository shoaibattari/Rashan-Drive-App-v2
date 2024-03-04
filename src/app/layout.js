import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OMJ Rashan Drive App",
  description: "invoice create rashan drive app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="px-2 justify-items-center md:px-[25%]">{children}</body>
    </html>
  );
}
