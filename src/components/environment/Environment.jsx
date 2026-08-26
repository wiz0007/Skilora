import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import styles from "./Environment.module.scss";
import { communityFeatures } from "../../content/homeContent";
import { revealUp, viewportOnce } from "../../utilities/motion";

const CommunityVisual = ({ type }) => {
  if (type === "chat") {
    return (
      <div className={`${styles.visualCanvas} ${styles.chatVisual}`} aria-hidden="true">
        <div className={styles.chatTop}><span /><strong>Mentor conversation</strong><i /></div>
        <div className={styles.messages}>
          <span className={styles.messageLeft}>Move that state closer to the component that owns it.</span>
          <span className={styles.messageRight}>Then the child only receives what it needs?</span>
          <span className={styles.messageLeft}>Exactly. Test the update path once more.</span>
        </div>
        <div className={styles.composer}><span>Continue the conversation…</span><b>↗</b></div>
      </div>
    );
  }

  if (type === "group") {
    return (
      <div className={`${styles.visualCanvas} ${styles.groupVisual}`} aria-hidden="true">
        <div className={styles.groupHeader}>
          <div className={styles.avatarStack}><span>A</span><span>K</span><span>R</span><span>+8</span></div>
          <small>Frontend sprint · Week 03</small>
        </div>
        <div className={styles.goalCard}>
          <span>Shared goal</span>
          <strong>Build and ship a responsive dashboard</strong>
        </div>
        <div className={styles.groupGrid}>
          <div><span>Progress</span><strong>72%</strong><i /></div>
          <div><span>Check-ins</span><strong>18</strong><small>This week</small></div>
        </div>
      </div>
    );
  }

  if (type === "feedback") {
    return (
      <div className={`${styles.visualCanvas} ${styles.feedbackVisual}`} aria-hidden="true">
        <div className={styles.reviewTop}><span>Review request</span><strong>UI state handling</strong></div>
        <div className={styles.reviewCode}>
          <i /><i /><i /><i /><i />
          <span className={styles.commentPin}>1</span>
        </div>
        <div className={styles.reviewComment}>
          <span className={styles.reviewAvatar}>AM</span>
          <div><strong>Mentor feedback</strong><p>Keep the source of truth here and derive the view state below.</p></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.visualCanvas} aria-hidden="true">
      <div className={styles.roomTop}><span className={styles.liveDot} /> Live room <small>48:12</small></div>
      <div className={styles.roomStage}>
        <div className={styles.sharedScreen}>
          <span /><span /><span /><span /><span />
          <small>skillsphere / session.jsx</small>
        </div>
        <div className={styles.peopleColumn}>
          <div><span>AM</span><strong>Mentor</strong><small>Sharing</small></div>
          <div><span>K</span><strong>Learner</strong><small>Live</small></div>
        </div>
      </div>
    </div>
  );
};

const CommunityCard = ({ feature, index, total, progress, reduceMotion }) => {
  const Icon = feature.icon;
  const introHold = 0.12;
  const outroHold = 0.12;
  const usableProgress = 1 - introHold - outroHold;
  const segment = total > 1 ? usableProgress / (total - 1) : usableProgress;

  const entryStart = index === 0 ? 0 : introHold + ((index - 1) * segment);
  const entryEnd = index === 0 ? 0.001 : Math.min(entryStart + (segment * 0.76), 1 - outroHold);
  const nextStart = index < total - 1 ? introHold + (index * segment) : 1 - outroHold;
  const nextEnd = index < total - 1
    ? Math.min(nextStart + (segment * 0.76), 1 - outroHold)
    : 1;

  const y = useTransform(
    progress,
    [entryStart, Math.max(entryStart + 0.001, entryEnd)],
    index === 0 ? ["0%", "0%"] : ["104%", "0%"],
  );
  const scale = useTransform(
    progress,
    [nextStart, Math.max(nextStart + 0.001, nextEnd)],
    index < total - 1 ? [1, 0.976] : [1, 1],
  );
  const opacity = useTransform(
    progress,
    [nextStart, Math.max(nextStart + 0.001, nextEnd)],
    index < total - 1 ? [1, 0.74] : [1, 1],
  );

  return (
    <motion.article
      className={styles.card}
      data-community-card
      style={reduceMotion ? { zIndex: index + 1 } : { y, scale, opacity, zIndex: index + 1 }}
    >
      <div className={styles.cardBackdrop} aria-hidden="true" />

      <div className={styles.cardCopy}>
        <div className={styles.cardTopline}>
          <span className={styles.cardNumber}>0{index + 1}</span>
          <div className={styles.cardIcon}><Icon /></div>
        </div>
        <div className={styles.cardBody}>
          <span className={styles.panelEyebrow}>{feature.eyebrow}</span>
          <h3>{feature.title}</h3>
          <p>{feature.copy}</p>
          <small>{feature.meta}</small>
        </div>
      </div>

      <div className={styles.cardVisual}>
        {feature.image?.src && (
          <img
            className={styles.realMedia}
            src={feature.image.src}
            alt={feature.image.alt || ""}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        )}
        <div className={styles.mediaShade} aria-hidden="true" />
        <CommunityVisual type={feature.visual} />
      </div>
    </motion.article>
  );
};

const Environment = () => {
  const storyRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  const storyHeight = `${120 + (Math.max(communityFeatures.length - 1, 0) * 78)}svh`;

  return (
    <section className={styles.environment} id="community" aria-labelledby="community-title">
      <div className={styles.headingWrap}>
        <motion.header
          className={styles.heading}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          variants={revealUp}
        >
          <span className={styles.eyebrow}>Community</span>
          <h2 id="community-title">Learning that stays connected.</h2>
          <p>Live guidance can continue as conversation, shared progress, and focused feedback.</p>
        </motion.header>
      </div>

      <div
        ref={storyRef}
        className={styles.story}
        style={reduceMotion ? undefined : { "--community-story-height": storyHeight }}
      >
        <div className={styles.stickyScene}>
          <div className={styles.deck}>
            <div className={styles.deckFrame}>
              {communityFeatures.map((feature, index) => (
                <CommunityCard
                  key={feature.id}
                  feature={feature}
                  index={index}
                  total={communityFeatures.length}
                  progress={scrollYProgress}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Environment;
