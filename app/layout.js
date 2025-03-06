import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import Nav from "./(components)/Nav";
import Footer from "./(components)/Footer";
import AuthProvider from "./(components)/AuthProvider";

const inter = Inter({ subsets: ["latin"] });
const dancingScript = Dancing_Script({ subsets: ["latin"] });

export const metadata = {
  title: "Recitore",
  description: "Created by Arush ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className} bg-bgColor text-page-text-color`}>
          <div>
            <Nav />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
