import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./Idea.module.scss";
import { ideaCards } from "../../content/homeContent";
import { premiumEase, revealUp, viewportOnce } from "../../utilities/motion";

const Idea = () => {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = ideaCards[activeIndex];

  return (
    <section className={styles.mainIdea} id="idea" aria-labelledby="idea-title">
      <div className={styles.inner}>
        <motion.header
          className={styles.sectionIntro}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          variants={revealUp}
        >
          <span className={styles.eyebrow}>Why SkillSphere</span>
          <h2 id="idea-title">Guidance that stays with the work.</h2>

          <div className={styles.storyIndex} aria-label="Current principle">
            {ideaCards.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={index === activeIndex ? styles.activeDot : ""}
                onClick={() => document.getElementById(`idea-step-${item.id}`)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" })}
                aria-label={`Go to principle ${index + 1}: ${item.label}`}
              >
                <span>{item.id}</span>
              </button>
            ))}
          </div>

          <div className={styles.activeStory} aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeItem.id}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: reduceMotion ? 0 : 0.32, ease: premiumEase }}
              >
                <span>{activeItem.accent}</span>
                <p>{activeItem.copy}</p>
                <small>{activeItem.detail}</small>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.header>

        <div className={styles.storyPanels}>
          {ideaCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                id={`idea-step-${item.id}`}
                className={styles.storyPanel}
                key={item.id}
                onViewportEnter={() => setActiveIndex(index)}
                viewport={{ amount: 0.62 }}
                initial={reduceMotion ? false : { opacity: 0.5, y: 20, scale: 0.99 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, ease: premiumEase }}
              >
                <div className={styles.panelTop}>
                  <span className={styles.number}>{item.id}</span>
                  <span className={styles.icon}><Icon /></span>
                </div>

                <div className={styles.panelVisual}>
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className={styles.mediaShade} aria-hidden="true" />
                  <div className={styles.mediaBadge} aria-hidden="true">
                    <span className={styles.visualIcon}><Icon /></span>
                    <span className={styles.visualLabel}>{item.accent}</span>
                  </div>
                  <div className={styles.panelHeadline}>
                    <span>{item.label}</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Idea;
