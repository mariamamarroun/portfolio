import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "fr" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Lang, Record<string, string>> = {
  fr: {
    // Nav
    "nav.about": "À propos",
    "nav.skills": "Compétences",
    "nav.projects": "Projets",
    "nav.experience": "Expérience",
    "nav.contact": "Contact",
    // Hero
    "hero.role": "Développeuse python",
    "hero.tagline": "Je conçois des applications modernes, scalables et performantes.",
    "hero.cta.contact": "Me contacter",
    "hero.cta.cv": "Télécharger CV",
    // About
    "about.title": "À propos",
    "about.p1": "Développeuse passionnée par l'architecture logicielle et la création d'expériences numériques performantes. Avec plus de 5 ans d'expérience, je transforme des idées complexes en solutions élégantes et maintenables.",
    "about.p2": "Spécialisée dans le développement full stack, je maîtrise les technologies modernes du frontend au backend. Mon approche allie rigueur technique, créativité et vision produit pour livrer des applications qui font la différence.",
    "about.p3": "Leadership technique, architecture clean code, et une passion pour l'innovation — voilà ce qui me définit en tant qu'ingénieure.",
    // Skills
    "skills.title": "Stack Technique",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.database": "Base de données",
    "skills.devops": "DevOps",
    // Projects
    "projects.title": "Projets",
    "projects.github": "GitHub",
    "projects.demo": "Démo",
    "projects.1.title": "E-Commerce Platform",
    "projects.1.desc": "Plateforme e-commerce complète avec paiement sécurisé, gestion des stocks et tableau de bord analytique en temps réel.",
    "projects.2.title": "SaaS Dashboard",
    "projects.2.desc": "Application SaaS avec authentification, gestion d'équipe, et visualisation de données en temps réel.",
    "projects.3.title": "AI Content Engine",
    "projects.3.desc": "Moteur de génération de contenu propulsé par l'IA avec interface intuitive et API RESTful.",
    // Experience
    "experience.title": "Expérience",
    "exp.1.role": "Lead Développeuse Full Stack",
    "exp.1.company": "TechVision Corp",
    "exp.1.period": "2023 — Présent",
    "exp.1.desc": "Direction technique d'une équipe de 6 développeurs. Architecture microservices, CI/CD, et livraison de 3 produits majeurs.",
    "exp.2.role": "Développeuse Full Stack Senior",
    "exp.2.company": "Digital Wave Agency",
    "exp.2.period": "2021 — 2023",
    "exp.2.desc": "Conception et développement d'applications web complexes pour des clients Fortune 500. Migration cloud et optimisation des performances.",
    "exp.3.role": "Développeuse Frontend",
    "exp.3.company": "StartUp Innov",
    "exp.3.period": "2019 — 2021",
    "exp.3.desc": "Développement d'interfaces utilisateur modernes avec React et Vue.js. Mise en place de design systems et amélioration de l'UX.",
    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Envie de collaborer ? N'hésitez pas à me contacter.",
    "contact.name": "Nom",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Envoyer",
    "contact.success": "Message envoyé avec succès !",
    // Footer
    "footer.rights": "Tous droits réservés.",
    // Meta
    "meta.title": "Portfolio — Développeuse Full Stack",
    "meta.description": "Portfolio professionnel d'une développeuse full stack passionnée par l'architecture logicielle et les applications performantes.",
  },
  en: {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "hero.role": "Full Stack Developer",
    "hero.tagline": "I build modern, scalable and high-performance applications.",
    "hero.cta.contact": "Contact Me",
    "hero.cta.cv": "Download CV",
    "about.title": "About Me",
    "about.p1": "Passionate software engineer focused on clean architecture and impactful digital experiences. With 5+ years of experience, I transform complex ideas into elegant, maintainable solutions.",
    "about.p2": "Specialized in full stack development, I master modern technologies from frontend to backend. My approach combines technical rigor, creativity, and product vision to deliver applications that make a difference.",
    "about.p3": "Technical leadership, clean code architecture, and a passion for innovation — that's what defines me as an engineer.",
    "skills.title": "Tech Stack",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.database": "Database",
    "skills.devops": "DevOps",
    "projects.title": "Projects",
    "projects.github": "GitHub",
    "projects.demo": "Demo",
    "projects.1.title": "E-Commerce Platform",
    "projects.1.desc": "Full-featured e-commerce platform with secure payments, inventory management, and real-time analytics dashboard.",
    "projects.2.title": "SaaS Dashboard",
    "projects.2.desc": "SaaS application with authentication, team management, and real-time data visualization.",
    "projects.3.title": "AI Content Engine",
    "projects.3.desc": "AI-powered content generation engine with intuitive interface and RESTful API.",
    "experience.title": "Experience",
    "exp.1.role": "Lead Full Stack Developer",
    "exp.1.company": "TechVision Corp",
    "exp.1.period": "2023 — Present",
    "exp.1.desc": "Technical leadership of a 6-developer team. Microservices architecture, CI/CD, and delivery of 3 major products.",
    "exp.2.role": "Senior Full Stack Developer",
    "exp.2.company": "Digital Wave Agency",
    "exp.2.period": "2021 — 2023",
    "exp.2.desc": "Design and development of complex web applications for Fortune 500 clients. Cloud migration and performance optimization.",
    "exp.3.role": "Frontend Developer",
    "exp.3.company": "StartUp Innov",
    "exp.3.period": "2019 — 2021",
    "exp.3.desc": "Development of modern user interfaces with React and Vue.js. Design system implementation and UX improvement.",
    "contact.title": "Contact",
    "contact.subtitle": "Want to collaborate? Feel free to reach out.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send",
    "contact.success": "Message sent successfully!",
    "footer.rights": "All rights reserved.",
    "meta.title": "Portfolio — Full Stack Developer",
    "meta.description": "Professional portfolio of a full stack developer passionate about software architecture and high-performance applications.",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const browserLang = navigator.language.startsWith("en") ? "en" : "fr";
    setLang(browserLang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = translations[lang]["meta.title"];
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", translations[lang]["meta.description"]);
  }, [lang]);

  const t = (key: string) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
