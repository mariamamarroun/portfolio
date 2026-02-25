import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const categories = [
  {
    key: "frontend",
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Framer Motion"],
  },
  {
    key: "backend",
    techs: ["Node.js", "Express", "Python", "Django", "GraphQL", "REST API"],
  },
  {
    key: "database",
    techs: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase", "Firebase"],
  },
  {
    key: "devops",
    techs: ["Docker", "AWS", "CI/CD", "GitHub Actions", "Vercel", "Linux"],
  },
];

const TechStack = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          {t("skills.title")}
          <span className="text-primary">.</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover p-6"
            >
              <h3 className="font-display text-lg font-semibold mb-4 text-foreground">
                {t(`skills.${cat.key}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary/60 text-secondary-foreground border border-border/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
