import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Github, Linkedin, Mail } from "lucide-react";
import emailjs from "@emailjs/browser";

// Initialize EmailJS with your public key
// Get your public key from https://dashboard.emailjs.com/
const EMAILJS_PUBLIC_KEY = "8WMt2lx7RKdueN8hkP2LN"; // Replace with your actual public key
const EMAILJS_SERVICE_ID = "service_pb15ntw"; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = "template_9assdsp"; // Replace with your EmailJS template ID
const RECIPIENT_EMAIL = "mariammarroun23@gmail.com";

emailjs.init(EMAILJS_PUBLIC_KEY);

const Contact = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    setLoading(true);
    try {
      const formData = new FormData(formRef.current);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const message = formData.get("message") as string;

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: RECIPIENT_EMAIL,
          from_name: name,
          user_email: email,
          user_message: message,
          title: "Portfolio Contact Form" // <-- match the template variable
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      formRef.current.reset();
      setTimeout(() => setSent(false), 3000);
    } catch (error: any) {
      console.error("Failed to send email:", error);
      console.error("Error status:", error.status);
      console.error("Error text:", error.text);
      alert(`Failed to send message: ${error.status || "Unknown error"}. Please check your template setup.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl font-bold mb-4 text-center"
        >
          {t("contact.title")}
          <span className="text-primary">.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mb-12"
        >
          {t("contact.subtitle")}
        </motion.p>

        <motion.form
          ref={formRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="glass-card p-8 space-y-5"
        >
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.name")}</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground/50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.email")}</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground/50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.message")}</label>
            <textarea
              name="message"
              rows={5}
              required
              className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none placeholder:text-muted-foreground/50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl gradient-bordeaux text-foreground font-medium text-sm tracking-wide hover:opacity-90 transition-all duration-300 ruby-glow-sm hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : sent ? t("contact.success") : t("contact.send")}
          </button>
        </motion.form>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-6 mt-10"
        >
          {[
            { icon: Github, href: "#" },
            { icon: Linkedin, href: "#" },
            { icon: Mail, href: `mailto:${RECIPIENT_EMAIL}` },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="w-11 h-11 rounded-xl border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200 hover:scale-105"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
