// Header component //


// IMPORTing below:
"use client"
import * as React from "react";
import { motion } from "framer-motion"; // import motion variable //


export default function Header(){

  return (
    <header>

    <motion.div animate = {{x: 500, y: 0}} >
      <h1 className="head">🎼 ♪ ♪ ♪ ♫ RiffRater ♫ ♪ ♪ ♪ 🎸 </h1>
    </motion.div>

    </header>
  );

}
