import { ClerkProvider, UserButton, auth, currentUser } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Album Reviews",
  description: "Album reviews you can trust",
};

export default async function RootLayout({ children }) {

  const { userId } = auth();
  console.log("userID:", userId); // This is to check userID in console and if he logged in //

  // Get the BackEnd API object when we need access to the user's info //
  const users = await currentUser();
  console.log("User:", users)


  return (
  <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        
{/*         
          <Header/> */}

          <nav>
          <Link classname="homepage" href="/">HOME</Link>
            {userId && <UserButton ID = "userbutton" afterSignOutUrl="/" />}
            {userId && <Link href = "/sign-in">Sign in</Link>}
          </nav>

      <h5>
       <Link href="/">HOME</Link>
       <Link href="/about">MAIN</Link>
       
      </h5>

          <div id="wrapper">
        {children}
        </div>
      
      </body>
    </html>
  </ClerkProvider>
  );
}
