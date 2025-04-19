'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles';
import { TypingText, ExploreEvents, TitleText } from '../components';
import { staggerContainer } from '../utils/motion';
import { exploreEVENTS } from '../constants';

const Events = () => {
  const [active, setActive] = useState('world-2');

  return (
    <section  className={`${styles.paddings}`} id="explore">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| Our Events" textStyles="text-center" />
        <TitleText title={<>Uncover the unexpected at our <br className="md:block hidden " />Club Events</>} textStyles="text-center" />

        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {exploreEVENTS.map((world, index) => (
            <ExploreEvents
              key={world.id}
              {...world}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Events;
