import Image from "next/image"
import Link from "next/link"
import code from "../../../public/images/code.jpg"





export default function About() {

    return(
            <div className="mb-about-container">
            <Image
            alt =""
            src={code}
            height={100} className="barCode" />
            <h2>About</h2>
            <h3>1. HOME</h3>
            <p>On the <Link href='/'>HOME</Link> page, you can view a little about us, and what our app is about.</p>
            <h3>2. Profiles</h3>
            <p>To view current user profiles, you can navigate to the <Link href='/profiles'>PROFILES</Link>. Here you can view users username and bio. Depending on if youre signed up or not, user profiles will be clickable, sending you to their pofile page with a list of their existing album reviews.  </p>
            <h3>3. My Profile</h3>
            <p>The MY POFILE page should appear in the navbar if youre logged it. Just click on it to get your profile.</p>
            <p>In this page, the ability to change your username/ bio is available, through a form and |Edit profile| button. Additionally, reviews can be added through a form, with fileds for the albums title, artist, score and a text box for a short review.</p>
            <p>Underneath, your exisiting reviews will be displayed and clickable</p>
            <h3>4. Individual reviews</h3>
            <p>When you click on a review, itll bring you to its Individual page. Here, you can edit the review -if you are the one who posted it-, and add a comment to the review. You can also edit the comment if youre the one who posted it.</p>
        </div>
    )
}