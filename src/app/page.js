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
  <div className="names">
      <h2>This app was made by:</h2>
      <h3>Danny &#128016;</h3>
      <p>Some say his droppings have been found as far north as York, and that he has a full-sized tattoo of his face on his face</p>
      <h3>Riley &#x1F436;</h3>
      <p>Some say that he knows two facts about ducks, and both of them are wrong</p>
      <h3>Artur &#x1F43A;</h3>
      <p>Some say he can swim seven lengths under water, and he has webbed buttocks</p>
      <h3>Myles &#x1F98D;</h3>
      <p>Some say that on Thursdays, he becomes incredibly bulbous, and that recently, pigs in Mexico have started to die of something called *Myles flu*</p>
      <br />
      <p>In all seriousness, we created this app due to our combined love of music. Hope you enjoy!</p>
      </div>
</div>
  )
}