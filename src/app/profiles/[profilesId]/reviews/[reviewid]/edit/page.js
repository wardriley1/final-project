import EditReviewBtn from "@/app/components/EditReviewBtn";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export default async function EditReview({ params }) {
  const { userId } = auth();


  const review = await sql`SELECT * FROM reviews WHERE id = ${params.reviewid}`;

  async function handleEditReview(formData) {
    "use server";
      const album_title = formData.get("album_title");
      const album_artist = formData.get("album_artist");
      const album_score = formData.get("album_score");
      const album_review = formData.get("album_review");

      await sql`UPDATE reviews SET album_title = ${album_title},album_artist = ${album_artist}, album_score= ${album_score}, album_review = ${album_review} WHERE user_id = ${userId}`;

      revalidatePath(`/profiles/${params.profilesId}/reviews${params.reviewid}`); 
      revalidatePath(`/profiles/${params.profilesId}/reviews${params.reviewid}/edit`);
      redirect(`/profiles/${params.profilesId}/reviews/${params.reviewid}`);

  }


if(userId !== review.rows[0].user_id) {
  return <p>404 not found</p>
}

  return (
    <div>
      <h2>Edit Review</h2>
      <form action={handleEditReview} className="rev-form">
        <h4>Edit Review of - {review.rows[0].album_title}</h4>
        <label className="rev">Title: </label><br/>
        <input name="album_title"
          className="rev" 
          value={review.rows[0].album_title}
        /><br/><br/>
        <label className="rev">Artist: </label><br/>
        <input name="album_artist"
          className="rev"
          value={review.rows[0].album_artist}
        /><br/><br/>
        <label className="rev">Score: </label><br/>
        <input name="album_score" value={review.rows[0].album_score}/><br/><br/>
        <label className="rev">Review: </label><br/>
        <div className="wrap-textarea">
          <textarea name="album_review"
            className="text-max-wide"
            rows="8"
            defaultValue={review.rows[0].album_review}
            >
          </textarea>
        </div>
        <br/>
        <EditReviewBtn />

      </form>
    </div>
  );
}