'use client';

import { motion } from 'framer-motion';
import styles from '../styles';
import { fadeIn, staggerContainer, zoomIn } from '../utils/motion';
                                                        {/* CAN ADD CSE HOD  */}
const Feedback = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-6`}
     > 
         
      <motion.div
        variants={fadeIn('right', 'tweeen', 0.2, 1)}
        className="flex-[0.4] lg:max-[570px]  flex justify-end lg:justify-center flex-col gradient-05 sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6a6a6a] relative"
      >
        <div className="feedback-gradient" />
        <div>
          <h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40px] leading-[36px] text-white">Prof. Sunitha</h4>
          <p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22px] leading-[16px] text-white">Mentor of Pathfinder | HOD of CSE department</p>
        </div>
        <p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45px] leading-[39px] text-white">
        "It's remarkable to see how far our management club has come since its inception in 2003. Over the years, we've witnessed countless bright minds come together, sharing ideas, collaborating on projects, and honing their leadership skills. The club has evolved into a vibrant community that fosters innovation, creativity, and entrepreneurial spirit. It's truly inspiring to see the impact this club has had on the lives of so many students."
        </p>
      </motion.div>

      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className="relative flex-1 flex justify-center item-center"
      >
        <img src="/planet-09.png" alt="planet" className="w-full mt-55 lg:h-[610px] h-auto min-h-[210px] object-cover rounded-[40px]" />
        <motion.div
          variants={zoomIn(0.4, 1)}
          className="lg:block hidden absolute -left-[10%] top-[3%]"
        >
          <img src="/stampf.png" alt="stamp" className="md:w-[170px] w-[115px]  md:h-[170px] h-[115px] object-contain" />
        </motion.div>
      </motion.div>
    </motion.div>
  </section>
);

export default Feedback;
