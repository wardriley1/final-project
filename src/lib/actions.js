'use server';
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";




export async function handleAddToDB(album) {

     await sql`INSERT INTO reviews (album_id, album_image_url, album_name, spotify_link, album_artist) 
    VALUES (${album.id}, ${album.images[0].url}, ${album.name}, ${album.external_urls.spotify}, ${album.artists[0].name})`;

}

export async function handleReviewForm(formData) {
    const {userId} = auth();

    const album_score = formData.get("album_score");
    const album_review = formData.get("album_review");

    await sql`INSERT INTO reviews (album_score, album_review, user_id) VALUES (${album_score},${album_review},${userId})`;
  }


