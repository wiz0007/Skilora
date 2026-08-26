import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./FinalCta.module.scss";
import brandMark from "../../assets/skillSphere-mark.svg";
import { BRAND_NAME, MAIN_SITE_URL } from "../../constants/site";
import { editorialMedia } from "../../content/homeContent";
import ViewportVideo from "../media/ViewportVideo";
import { premiumEase, revealUp, viewportOnce } from "../../utilities/motion";

const FinalCta = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.finalCta} aria-labelledby="final-cta-title">
      <motion.div
        className={styles.panel}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={viewportOnce}
        variants={revealUp}
      >
        <ViewportVideo
          className={styles.media}
          posterClassName={styles.poster}
          src={editorialMedia.collaborativeStudyVideo}
          poster={editorialMedia.groupStudyPoster.src}
        />
        <div className={styles.mediaShade} aria-hidden="true" />

        <div className={styles.copy}>
          <div className={styles.brandLine}>
            <img src={brandMark} alt="" />
            <span>SkillSphere</span>
          </div>
          <span className={styles.eyebrow}>Ready when you are</span>
          <h2 id="final-cta-title">Start with a skill. Meet someone who can help.</h2>
          <p>Move from discovery to a real conversation, then keep the learning going.</p>
          <motion.a
            href={MAIN_SITE_URL}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            transition={{ duration: 0.22, ease: premiumEase }}
          >
            Enter {BRAND_NAME} <span aria-hidden="true">↗</span>
          </motion.a>
        </div>

        <div className={styles.proof} aria-hidden="true">
          <span>Learn live</span>
          <span>Stay connected</span>
          <span>Build momentum</span>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCta;
