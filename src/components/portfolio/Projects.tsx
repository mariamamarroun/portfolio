import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Github, ExternalLink } from "lucide-react";

const projectData = [
  {
    key: "1",
    techs: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    github: "#",
    demo: "#",
  },
  {
    key: "2",
    techs: ["React", "Node.js", "MongoDB", "Chart.js"],
    github: "#",
    demo: "#",
  },
  {
    key: "3",
    techs: ["Python", "OpenAI", "FastAPI", "React"],
    github: "#",
    demo: "#",
  },
];

const Projects = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          {t("projects.title")}
          <span className="text-primary">.</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projectData.map((project, i) => (
            <motion.div
              key={project.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card-hover p-6 flex flex-col"
            >
              {/* Placeholder image area */}
              <div className="w-full h-44 rounded-xl bg-secondary/40 mb-5 overflow-hidden border border-border/30">
                <div className="w-full h-full gradient-bordeaux opacity-60" />
              </div>

              <h3 className="font-display text-xl font-semibold mb-2 text-foreground">
                {t(`projects.${project.key}.title`)}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                {t(`projects.${project.key}.desc`)}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={project.github}
                  className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github size={14} />
                  {t("projects.github")}
                </a>
                <a
                  href={project.demo}
                  className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink size={14} />
                  {t("projects.demo")}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
