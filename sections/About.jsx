'use client';

import { motion } from 'framer-motion';
import { TypingText } from '../components';
import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';

const About = () => {
  return (
    <section id="about-section" className={`${styles.paddings} relative z-10`}>
      <div className="gradient-02 z-0" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
      >
        <TypingText
          title="| About Pathfinder"
          textStyles="text-center"
        />

        <motion.p
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
        >
          <span className="font-extrabold"> Pathfinder </span> is a 22-year-old management club, where you can experience thrilling and fun events like treasure hunts, city marathons, and many more exciting activities. This club fosters teamwork and leadership in a vibrant and dynamic environment, making it really the <span className="font-extrabold">ultimate adventure</span> of campus life. Whether you're a runner or a strategist, you can <span className="font-extrabold">explore</span> new heights of fun and competition. Let's <span className="font-extrabold">embark</span> on the journey with Pathfinder by joining us today!
        </motion.p>

        <motion.img
          variants={fadeIn('up', 'tween', 0.3, 1)}
          src="/arrow-down.svg"
          alt="arrow-down"
          className="w-[18px] h-[28px] object-contain mt-[28px]"
        />
      </motion.div>
    </section>
  );
};

export default About;
