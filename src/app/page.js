/// HOME PAGE ///



// import { sql } from "@vercel/postgres";

// export default async function Home() {
//   const reviews = await sql`SELECT * FROM reviews`;
//   return (
//     <div>
//     <h2>Home</h2>
//     <h3>This is home</h3>
//     </div>
//   )
// }

// import { sql } from "@vercel/postgres";
// import BackPicture from '@/app/components/BackPicture';

import { sql } from "@vercel/postgres";
import BackPicture from '@/app/components/BackPicture';

export default async function Home() {
  const reviews = await sql`SELECT * FROM reviews`;

  return (
  
    <div className="homepage">
            <BackPicture />
          <div className="homecontent">
            <h2>RiffRater by MARD Disc-cuss.</h2>
             <h3>Reviews you can trust!</h3>
                <p>RiffRater! This is the only website which allows you to post about your favourite music albums</p>
                <p>You can now post your reviews and recommend tracks You love!</p>
                
          </div>
    </div>

  );
};
