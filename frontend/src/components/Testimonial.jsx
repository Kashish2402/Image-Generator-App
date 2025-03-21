import React from "react";
import ReviewCard from "./ReviewCard";
import { delay, motion } from "motion/react";

function Testimonial() {
  return (
    <motion.div
      className="mt-15 flex flex-col items-center justify-between gap-10"
      initial={{ opacity: 0.2, y: 200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-semibold">Testimonials</h1>
        <p className="text-neutral-400 text-center">
          Here are some testimonials from our satisfied customers:
        </p>
      </div>

      <div className="w-[80%] flex flex-wrap gap-6 items-center">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </motion.div>
  );
}

export default Testimonial;
