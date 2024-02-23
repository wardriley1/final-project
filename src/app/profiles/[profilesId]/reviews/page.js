import CreateReviewBtn from "@/app/components/CreateReviewBtn";
import EditProfileBtn from "@/app/components/EditProfileBtn";
import OutputCoverArt from "@/app/components/OutputCoverArt";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";



export const metadata = {
  title: "RiffRater - USERs PROFILE",
  description: "Reviews made by users",
};


export default async function ProfilePage({ params }) {
  const {userId} = auth();

  // Fetch the user's profile
  const profile = await sql `
    SELECT * 
    FROM profiles 
    WHERE id = ${params.profilesId}
  `;

  // Fetch the user's reviews
  const reviews = await sql `
    SELECT * 
    FROM reviews 
    WHERE user_id = ${profile.rows[0].clerk_user_id} 
    ORDER BY id desc
  `;

  //console.log(reviews); 

  async function handleEditProfile(formData) {
    "use server";
  
    const username = formData.get("username");
    const bio = formData.get("bio");
  
    // Write the data to database on profile edit
    await sql`
      UPDATE profiles 
      SET username = ${username}, bio = ${bio} 
      WHERE clerk_user_id = ${userId}
    `;
    
    revalidatePath(`/profiles`);
    revalidatePath(`/profiles/${params.profilesId}/reviews`);
    redirect(`/profiles/${params.profilesId}/reviews`);
  }


  async function handleCreateReview(formData) {
    "use server";
    const album_title = formData.get("album_title");
    const album_artist = formData.get("album_artist");
    const album_score = formData.get("album_score");
    const album_review = formData.get("album_review");

    // Write the review into the 'reviews' table
    await sql`
      INSERT INTO reviews 
      (album_title, album_artist, album_score, album_review, user_id) 
      VALUES (${album_title}, ${album_artist}, ${album_score}, ${album_review}, ${userId})
    `;

    revalidatePath(`/profiles/${params.profileId}/reviews`);
  }


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
    <h4>Profile</h4>
    <div>
      <div className="rev-form">
      <h3 className="rev">User:</h3>
      <p className="rev">{profile.rows[0].username}</p><br/>
      <h3 className="rev">Bio:</h3>
      <p className="rev">{profile.rows[0].bio}</p>
      </div>
      {userId === profile.rows[0].clerk_user_id && (
    <div>

     <br/>
    <h4>Edit profile</h4>
    <form action={handleEditProfile} className="rev-form">
      <label className="rev">User: </label><br/>
      <input
        className="rev"
        name="username"
        placeholder="Username"
        defaultValue={profile.rows[0].username}
        required
      /><br/><br/>
      <label className="rev">Bio: </label><br/>
      <div className="wrap-textarea">
      <textarea
        className="text-max-wide"
        name="bio"
        placeholder="Bio"
        defaultValue={profile.rows[0].bio}
        cols="3"
        required
        >
      </textarea>
      </div><br/>
      
      <EditProfileBtn />
    </form>
  </div>
  )}
      
 
  {/*{profile.rows[0].username}*/}
  {userId === profile.rows[0].clerk_user_id && (
    <>
    <br/>
    <h4>Add a new review</h4>
  <form action={handleCreateReview} className="rev-form">
  
    <label className="rev">Title: </label><br/>
    <input 
      className="rev"
      name="album_title" 
      placeholder="Album Title" 
    /><br/><br/>
    <label className="rev">Artist: </label><br/>
    <input
      className="rev"
      name="album_artist" 
      placeholder="Album Title" 
    /><br/><br/>

    <label className="rev">Score: </label><br/>
    <input 
      type="number"
      name="album_score" 
      placeholder="Album Score"
      min="0"
      max="5"
    />
    <br/><br/>
    <label className="rev">Review: </label><br/>
    <div className="wrap-textarea">
    <textarea 
      className="text-max-wide"
      name="album_review" 
      placeholder="Review"
      rows="5"
      >
    </textarea>
    </div>
    <br/>
    
    <CreateReviewBtn/>
  </form>
  </>)}

  {!userId && <div><h2>Please... Sign in to add reviews</h2></div>}
     
  <div> {/* ??? */}
  
  <br/>
  <h4>Reviews</h4>
  {reviews.rows.map((review) => (
    <div key={review.id} className="rev-div">
      <p>ALBUM TITLE:</p>
      <h3>{review.album_title}</h3><br/>
      <p>ALBUM ARTIST:</p>
      <h3>{review.album_artist}</h3>

      <OutputCoverArt 
        image_name={review.album_image} 
        altTitle={review.album_title}
        altArtist={review.album_artist}
      />

      <p>REVIEW:</p>
      <p>{truncateText(review.album_review)}</p>
      <Link href={`/profiles/${params.profilesId}/reviews/${review.id}`}>
        <button className="review">Read Full Review</button>
      </Link>
    </div>
  ))}
  <br/>
  <h4>Number of reviews: {reviews.rowCount}</h4>
  </div>
  </div>
  </>
  )

}

