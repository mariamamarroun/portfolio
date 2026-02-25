import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const experiences = ["1", "2", "3"];

const Experience = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          {t("experience.title")}
          <span className="text-primary">.</span>
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 timeline-line opacity-40" />

          {experiences.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className={`relative flex items-start gap-8 mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Node */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ruby-glow-sm z-10 mt-2" />

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className="glass-card p-6">
                  <span className="text-xs font-medium text-primary tracking-wide">
                    {t(`exp.${key}.period`)}
                  </span>
                  <h3 className="font-display text-lg font-semibold mt-1 text-foreground">
                    {t(`exp.${key}.role`)}
                  </h3>
                  <p className="text-sm text-primary/70 font-medium mb-2">
                    {t(`exp.${key}.company`)}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`exp.${key}.desc`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
