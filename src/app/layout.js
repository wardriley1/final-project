import { ClerkProvider, UserButton, auth, currentUser } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Link from "next/link";


import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Album Reviews",
  description: "Album reviews you can trust",
};

export default async function RootLayout({ children }) { // START of a default function RootLayout //

  // Getting userId from auth() -- user is not logged in when null//
  const { userId } = auth();
  console.log("userID:", userId); // This is to check userID in console and if he logged in //

  // Get the BackEnd API object when we need access to the user's info //
  const users = await currentUser();
  console.log("User:", users)



  return ( // START of returning in RootLAYOUT //
  <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>

      <nav>
            <Link classname="homepage" href="/">HOME PAGE DUDE!</Link>
            {userId && <UserButton ID = "userbutton" afterSignOutUrl="/" />}
            {userId && <Link href = "/sign-in">Sign in</Link>}

        </nav>
      <h5>
       <Link href="/">HOME</Link>
       <Link href="/about">ABOUT</Link>
       
       </h5>
        
        
     

          <div id="wrapper">
        {children}
        </div>
        
      </body>
    </html>
    </ClerkProvider>
  ); // END of returning in RootLayout// 
}; // END of a default function RootLayout //
