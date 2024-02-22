import EditCommentBtn from "@/app/components/EditCommentBtn";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export default async function EditComment({ params }) {
    const { userId } = auth();

  const comment =
    await sql`SELECT * FROM comments WHERE id = ${params.commentid}`;

   const profile = await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}`;

  async function handleEditComment(formData) {
    "use server";
    const username = formData.get("username");
    const content = formData.get("content");

    await sql`UPDATE comments SET username = ${username}, content = ${content} WHERE id = ${params.commentid}`;
    revalidatePath(`/profiles/${params.profilesId}/reviews/${params.reviewid}/comments/${params.commentid}/edit`);
    revalidatePath(`/profiles/${params.profilesId}/reviews/${params.reviewid}`);
    redirect(`/profiles/${params.profilesId}/reviews/${params.reviewid}`);
  }
  
  if(userId !== profile.rows[0].clerk_user_id) {
   return <p>404 not found</p>
  }

  return (
    <div>
      <form action={handleEditComment} className="rev-form">
        <h3 className="rev">Edit Comment</h3>
        <label className="rev">User: </label><br/>
        <input
          className="rev"
          name="username"
          placeholder="Username"
          defaultValue={profile.rows[0].username}
          value={profile.rows[0].username} 
          readOnly
        /><br/><br/>
        <label className="rev">Comment: </label><br/>
        <div className="wrap-textarea">
          <textarea
            className="text-max-wide"
            name="content"
            placeholder="Content"
            defaultValue={comment.rows[0].content}
        ></textarea>
        </div>
        <EditCommentBtn />
      </form>
    </div>
  );
}
