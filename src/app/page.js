import { sql } from "@vercel/postgres";
import { motion } from "framer-motion"

export default async function Home() {
  const reviews = await sql`SELECT * FROM reviews`;
  return (
    <>

    <p>random text</p>
    <div className="homepage">
    <h2>HOME</h2>
    
    <h3>This is home, dude!</h3>
    </div>
    </>
  );
};