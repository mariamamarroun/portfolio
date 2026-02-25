import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/30 py-8 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Portfolio. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
