import { sql } from "@vercel/postgres";

export default async function Home() {
  const reviews = await sql`SELECT * FROM reviews`;
  return (
    <div>
    <h2>Home</h2>
    <h3>This is home</h3>
    <ul>
      {reviews.rows.map((review) => (
        <p key={review.id}>{review.album_title}</p>
      ))}
    </ul>
    </div>
  )
}