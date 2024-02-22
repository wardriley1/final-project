// HOME PAGE //


import BackPicture from "./components/BackPicture"


export const metadata = {
  title: "RiffRater - HOME",
};   



export default async function Home() {
  return (
    <div className="homepage">
    <BackPicture />
  <div className="homecontent">
    <h2>RiffRater by MARD Disc-cuss.</h2>
     <h3>Reviews you can trust!</h3>
        <p>RiffRater! This is the only website which allows you to post about your favourite music albums</p>
        <p>You can now post your reviews and recommend tracks You love!</p>
        
  </div>
</div>
  )
}