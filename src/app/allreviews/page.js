/*
  This page lists all album reviews.
  It provides sort order functionality through a dynamic button which toggles
  between sort ascending and sort order descending, changing the text on the 
  button accordingly.

  Accessed via the URL: '/allreviews'
*/

import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import OutputCoverArt from "../components/OutputCoverArt";


export const metadata = {
  title: "RiffRater - REVIEWS",
  description: "Reviews made by users",
};



export default async function AllReviews({ params, searchParams }) {
  const {userId} = auth();

  let sortOrder = "desc"; 

  // if the user has put ?sort=asc, change the sort order
  if (searchParams.sort === "asc") sortOrder = "asc";


  // Fetch the user's profile
  const profile = await sql `
    SELECT * 
    FROM profiles 
    WHERE id = ${params.profilesId}
  `;

  // SELECT JOIN query so that data from the profiles and reviews table can be
  // shown. There is a naming conflict, so aliases are used for id's 
  const queryStr = `SELECT album_artist, album_title, album_score, album_review, username, 
    reviews.id AS review_id, profiles.id AS prof_id, album_image
    FROM reviews
    INNER JOIN profiles
    ON reviews.user_id = profiles.clerk_user_id
    ORDER BY album_score ${sortOrder}, album_title`;

  const reviews = await sql.query(queryStr); 

 


  // Takes the text of the review and truncates it so that
  // there is a standard maximum string length. This improves the uniformity
  // of layout as no review instance in this page can be gamed to show a huge 
  // post. Tempts the user to click on the button to read more.
  function truncateText(reviewString){
    reviewString = reviewString.substr(0, 40);
    return reviewString += '...';
  }

  return (
    <>
      <div>
        {!userId && <div><h2>Please... Sign in to view reviews</h2></div>}
     
        {userId && <div>
        <div>
        
          <h2>Reviews</h2>

          {searchParams.sort ==="desc" && <Link href="/allreviews/?sort=asc"><button className="review">Sort: Lowest Score First</button></Link>}
          {searchParams.sort ===undefined && <Link href="/allreviews/?sort=asc"><button className="review">Sort: Lowest Score First</button></Link>}
          {searchParams.sort ==="asc" && <Link href="/allreviews/?sort=desc"><button className="review">Sort: Highest Score First</button></Link>}

          {reviews.rows.map((review) => (
            <div key={review.review_id} className="rev-compact">
              
              <p>SCORE:</p>
              <h3>{review.album_score}</h3><br/>
              <p>ALBUM:</p>
              <h3>{review.album_title} - {review.album_artist}</h3>
              
              <OutputCoverArt 
                image_name={review.album_image} 
                altTitle={review.album_title}
                altArtist={review.album_artist}
              />

              <p>REVIEW:</p>
              <p>{truncateText(review.album_review)}</p>
              
              

              <Link href={`/profiles/${review.prof_id}/reviews/${review.review_id}`}>
                <button className="review">Read Full Review</button>
              </Link><br/><br/>

              <p>REVIEWER:</p>
              <h3>{review.username}</h3>
            </div>
          ))}
          <br/>
          <h4>Number of reviews: {reviews.rowCount}</h4>
        </div>
      </div>}
    </div>
  </>
  )

}