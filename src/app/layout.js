import Link from "next/link";
import "./globals.css";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import CreateProfile from "./components/CreateProfile";







export const metadata = {
  title: "Album Reviews",
  description: "Album Reviews you can trust",
};

export default async function RootLayout({ children }) {
  const { userId } = auth();

  const profileRes =
    await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}`;


  return (
    <ClerkProvider>
      <html lang="en">
        <body>
        <header>ALBUM REVIEWS</header>
        <nav>
     <Link href ="/">HOME</Link> | <Link href ="/about">ABOUT</Link> 
   </nav>
        {!userId && <div><Link href="/sign-in">Sign In</Link>{children}</div>}
        {userId && <UserButton afterSignOutUrl="/" />}
        {userId && profileRes.rowCount === 0 && <CreateProfile />}
        {userId && profileRes.rowCount !== 0 && children}
        <div>
     <footer>Property of Myles Artur Danny Reily &copy;</footer>
       </div>
        </body>
      </html>
    </ClerkProvider> 
  );

}
