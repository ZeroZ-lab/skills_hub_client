import PageLayout from "@/app/layout/page-layout";
import { useTranslation } from "react-i18next";

const DoctorPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout title={t("pages.doctor.title")} description={t("pages.doctor.description")}>
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="text-sm text-muted-foreground">{t("common.placeholder")}</div>
      </div>
    </PageLayout>
  );
};

export default DoctorPage;

