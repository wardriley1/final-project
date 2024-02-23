// Background picture component //

// Importing below //

"use client"
import * as React from "react";
import { motion } from "framer-motion"; // import motion variable //

// function:
export default function BackPicture () { // START for BackPicure Function //

    return ( // START for returning in BackPicture function //
    
        <motion.div animate = {{ x: 100, scale: 1}} initial = {{ scale: 0}} > 

                <div className="homeimage">
                    <img 
                        className="homebg"
                        src="./images/notesagain.png"
                        alt="">
                    </img>
        </div>

        </motion.div>

    
    
    
    ); // END of returning in BackPicture function //



}; // END of BackPicture function //