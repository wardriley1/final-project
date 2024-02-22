/// LAYOUT ///



import Link from "next/link";
import "./globals.css";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import Header from '@/app/components/Header';
import CreateProfile from "./components/CreateProfile";




export const metadata = {
  title: "RiffRater - HOME",
  description: "Album Reviews you can trust",
};

export default async function RootLayout({ children }) {
  const { userId } = auth();

  // If a new user tries to authentcate through GitHub, the code crashes as
  // there is no clerk id in query results. (Vercel server app crashes).
  // I inserted my clerk_id into the table via a temporary update SQL statement
  // with my credentials(just here).
  const profileRes =
    await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}`;



  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />

          
          <div id="nav-wrapper">
            
            <nav>
              <ul>
                <li><Link href ="/">Home</Link></li>
                <li><Link href ="/about">About</Link></li>
                <li><Link href ="/allreviews">Reviews</Link></li>
                <li><Link href ="/profiles">Profiles</Link></li>
                
                {userId && profileRes.rowCount !== 0 && <li><Link href={`/profiles/${profileRes.rows[0].id}/reviews`}>My Profile</Link></li>}
                {!userId && <li><Link href="/sign-in">Sign In</Link></li>}
              </ul>
            </nav>
          </div>
          
          <div id="wrapper">
            {userId && <UserButton afterSignOutUrl="/" />}
            <br/><br/>
            {userId && profileRes.rowCount === 0 && <CreateProfile />}
            {userId && profileRes.rowCount !== 0}
          </div>
          {children}
        <div>
     <footer>Copyright: MARD Disc-cuss - Myles Artur Reily Danny &copy;</footer>
       </div>
        </body>
      </html>
    </ClerkProvider> 
  );

}
