
export default function OutputCoverArt({image_name, altTitle, altArtist}){

  return(
    <>
    <div className="cover-art-box">
    <img 
      src={"/images/" + image_name}
      alt={"cover art for the album " + altTitle + " by " + altArtist}
    />
     </div>
    </>
  )
}
