import CreateCommentBtn from "@/app/components/CreateCommentBtn";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import OutputCoverArt from "@/app/components/OutputCoverArt";

export default async function SingleReview({ params }) {
    const {userId} = auth();

    const review = await sql`SELECT * FROM reviews WHERE id = ${params.reviewid}`;
    const comments = await sql`SELECT * FROM comments where review_id = ${params.reviewid} ORDER BY id asc`;
    const currentUsername = await sql`SELECT username FROM profiles where clerk_user_id = ${userId} `;

    async function handleAddComment(formData) {
        "use server";
        const username = formData.get("username");
        const content = formData.get("content");
    
        await sql`INSERT INTO comments 
          (username, content, review_id, user_id) 
          VALUES 
          (${username}, ${content}, ${params.reviewid}, ${userId})`;
        revalidatePath(`/${params.reviewid}`);
        }
    
  
    return (
      <>
        <div className="rev-div">
            <h3 className="title">ALBUM TITLE:</h3> 
            <p className="content">{review.rows[0].album_title}</p><br/>
            <h3 className="title">ALBUM ARTIST:</h3> 
            <p className="content">{review.rows[0].album_artist}</p><br/>
            <h3 className="title">ALBUM SCORE:</h3> 
            <p className="content">{review.rows[0].album_score}</p>
            <OutputCoverArt 
                image_name={review.rows[0].album_image} 
                altTitle={review.rows[0].album_title}
                altArtist={review.rows[0].album_artist}
              />
            <h3 className="title">ALBUM REVIEW:</h3><br/>
            <p className="content">{review.rows[0].album_review}</p><br/>

            {/* There should probably be a 'posted by' field here. */}

            

            {userId === review.rows[0].user_id && <Link href={`/profiles/${params.profilesId}/reviews/${params.reviewid}/edit`}><button className="review dark">Edit</button></Link>}
            </div>
          <div>
            <br/><br/><h4>Add a comment</h4>
            {userId && <form action={handleAddComment} className="rev-form">
              <label className="rev">User: </label><br/>
              <input name="username"
                className="rev"
                placeholder="Username" 
                defaultValue={currentUsername.rows[0].username} 
                readOnly
              /><br/><br/>
              <label className="rev">Comment: </label><br/>
              <div className="wrap-textarea">
                <textarea name="content"
                  className="text-max-wide" 
                  placeholder="Comment">
                </textarea>
              </div>
              <br/>
              <CreateCommentBtn />
            </form>}
          {!userId && <h2>Please sign in to add comments</h2>}

          {comments.rows.map((comment) => {
        return (
         
          <div key={comment.id} className="rev-form">
            <h3 className="rev">User: {comment.username}</h3>
            <p className="rev">Comment: {comment.content}</p>
            <p>
            {userId === comment.user_id && <Link href={`/profiles/${params.profilesId}/reviews/${params.reviewid}/comments/${comment.id}/edit`}>
            <button className="review">Edit</button>
            </Link>}</p>
          </div>
          
        );
      })}
        </div>
        </>
    );
}
