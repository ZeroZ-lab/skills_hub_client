import PageLayout from "@/app/layout/page-layout";
import { useTranslation } from "react-i18next";

const ProfilesPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout title={t("pages.profiles.title")} description={t("pages.profiles.description")}>
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="text-sm text-muted-foreground">{t("common.placeholder")}</div>
      </div>
    </PageLayout>
  );
};

export default ProfilesPage;

