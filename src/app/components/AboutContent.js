// IMPORTing below:
"use client"
import * as React from "react";
import { motion } from "framer-motion"; // import motion variable //
import Link from "next/link";

export default function AboutContent() {

  return (


    <motion.div initial={{ x: -500, y: 0 }} animate = {{x: 0, y: 0}} >

    <div className="mb-about-container">
            <h2>ABOUT</h2>
            <h3>Home</h3>
            <p>On the <Link href='/'>HOME</Link> page, you can view a little about us, and what our app is about.</p>
            <h3>Reviews</h3>
            <p>When you click on <Link href="/allreviews">REVIEWS</Link>, itll bring you to a page with all current reviews from all existing users. Here, you can sort by review score, and access the full review by clicking on the READ FULL REVIEW button. A count of the number of reviews on our app will be displayed at the bottom of the page.</p>
            <h3>Profiles</h3>
            <p>To view current user profiles, you can navigate to <Link href='/profiles'>PROFILES</Link>. Here you can view existing profiles, with their username and bio. Depending on if youre signed up or not, user profiles will be clickable, sending you to their pofile page with a list of their existing album reviews. </p>
            <h3>My Profile</h3>
            <p>The MY POFILE page should appear in the navbar if youre logged in. Just click on it to get your profile.</p>
            <p>In this page, the ability to change your username/ bio is available, through a form and |Edit profile| button. </p>
            <p> Additionally, reviews can be added through a form, with fileds for the albums title, artist, score and a text box for a short review.</p>
            <p>Underneath, your exisiting reviews will be displayed and clickable. A count of your current reviews will be displayed at the bottom of the page.</p>
            <div className="cd">
                    <img src="https://www.theaudiodb.com/images/media/album/3dthumb/mcskr51610469388.png" alt="Front cover Marvin" className="front"/>
                    <img src="https://www.theaudiodb.com/images/media/album/3dthumb/rxlw021599542173.png" alt="Front cover Aphex" className="front"/>
                    <img src="https://www.theaudiodb.com/images/media/album/3dthumb/owztti1605169108.png" alt="Front cover Fleetwood" className="front"/>
                    <img src="https://www.theaudiodb.com/images/media/album/3dthumb/axamtw1667218416.png" alt="Front cover Beatles" className="front"/>
                    <img src="https://www.theaudiodb.com/images/media/album/3dthumb/z7hcnk1639141383.png" alt="Front cover Beach Boys" className="front"/>
            </div>
    </div>

       
    </motion.div>


  );
};
