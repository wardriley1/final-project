import { sql } from "@vercel/postgres";
import { motion } from "framer-motion"

export default async function Home() {
  const reviews = await sql`SELECT * FROM reviews`;

  return (
  
 
  
    <div className="homepage">
        <div className="homeimage">
          <img 
              className="homebg"
              src="./pictures/notesagain.png"
              alt="">
          </img>
        </div>
          <div className="homecontent">
            <h2>RiffRater by MARD Disc-cuss.</h2>
             <h3>Reviews you can trust!</h3>
                <p>RiffRater! This is the only website which allows you to post about your favourite music albums</p>
                <p>You can now post your reviews and recommend tracks You love!</p>
                
          </div>
    </div>

  );
};