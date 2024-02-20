import { sql } from "@vercel/postgres"
import Link from "next/link";


export default async function DataBase() {
    const dbReviews = await sql `SELECT * FROM reviews`;

    console.log("SAVED REVIEWS", dbReviews);

  return (
    <div>
        <h1>SAVED ALBUMS:</h1>
         <ul>
                    {dbReviews.rows.map( (dbReview) => {
                      return (
                        <div className="albumContainer">
                        <div key={dbReview.album_id}>
                        <img src={`${dbReview.album_image_url}`} />
                        <h3>{dbReview.album_name}</h3>
                        <Link href={`${dbReview.spotify_link}`}>Play</Link>
                        <p>Artist: {dbReview.album_artist}</p>
                        <p>Score: {dbAlbum.album_score}</p>
                        <p>Review: {dbAlbum.album_review}</p>
                        </div>
                        </div>
                      )
                    })}
                </ul>
    </div>
  )
}
