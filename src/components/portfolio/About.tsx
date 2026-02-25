import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInView } from "framer-motion";
import { useRef } from "react";
import portrait from "@/assets/portrait.jpg";

const About = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          {t("about.title")}
          <span className="text-primary">.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-primary/20 ruby-glow-sm">
              <img
                src={portrait}
                alt="Portrait"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl border border-primary/20 -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed text-base">
              {t("about.p1")}
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              {t("about.p2")}
            </p>
            <p className="text-foreground font-medium leading-relaxed text-base">
              {t("about.p3")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
