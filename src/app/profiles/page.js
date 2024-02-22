import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import Link from "next/link";


export default async function Profiles() {
  const {userId} = auth();
  const profiles = await sql `
    SELECT * 
    FROM profiles`;

  return (
    <div>
      <h2>Profiles</h2>
      {!userId && (
        <div>
          <h2>Please sign up/in to view user reviews</h2>

          {/* Maybe delete this map block???*/}
          {profiles.rows.map((profile) => (
            <div key={profile.id + "ky"}>
              <h3 className="rev">User: {profile.username}</h3>
              <p className="rev">Bio: {profile.bio}</p>
              <br/>
            </div>
          ))}
          {/* block end */}

        </div>
      )}
      
      {userId && (
        <div>
          {profiles.rows.map((profile) => (
            <div className="rev-form" key={profile.id + "pr"}>
              <Link key={profile.id} 
                className="rev" 
                href={`/profiles/${profile.id}/reviews`}>
                <h3 className="rev">User: {profile.username}</h3>
                <p className="rev">Bio: {profile.bio}</p>
              </Link>
            </div>
          ))}

          <br/>
          <h4>Number of users: {profiles.rowCount}</h4>
        </div>
      )}
    </div>
  );


}