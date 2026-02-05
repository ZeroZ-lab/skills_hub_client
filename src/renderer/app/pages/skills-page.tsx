import PageLayout from "@/app/layout/page-layout";
import { useTranslation } from "react-i18next";

const SkillsPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout title={t("pages.skills.title")} description={t("pages.skills.description")}>
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="text-sm text-muted-foreground">{t("common.placeholder")}</div>
      </div>
    </PageLayout>
  );
};

export default SkillsPage;

