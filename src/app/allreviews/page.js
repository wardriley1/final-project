import CreateReviewBtn from "@/app/components/CreateReviewBtn";
import EditProfileBtn from "@/app/components/EditProfileBtn";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";



export const metadata = {
  title: "Album Review | Reviews",
  description: "Reviews made by users",
};


export default async function AllReviews({ params }) {
  const {userId} = auth();

  // Fetch the user's profile
  const profile = await sql `
    SELECT * 
    FROM profiles 
    WHERE id = ${params.profilesId}
  `;

  // Fetch the user's reviews - join reviews to profiles table, to get the username
  const reviews = await sql `
    SELECT album_artist, album_title, album_score, album_review, username, 
    reviews.id AS review_id, profiles.id AS prof_id
    FROM reviews
    INNER JOIN profiles
    ON reviews.user_id = profiles.clerk_user_id
    ORDER BY reviews.id desc
  `;

  

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
          <br/>
          <h4>Reviews</h4>
          {reviews.rows.map((review) => (
            <div key={review.review_id} className="rev-compact">
            <p>ALBUM:</p>
            <h3>{review.album_title} - {review.album_artist}</h3><br/>
            <p>REVIEW:</p>
            <p>{truncateText(review.album_review)}</p>
            <Link href={`/profiles/${review.prof_id}/reviews/${review.review_id}`}>
              <button className="review">Read Full Review</button>
            </Link>
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

