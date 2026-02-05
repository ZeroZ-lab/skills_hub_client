import PageLayout from "@/app/layout/page-layout";
import { Button } from "@/components/ui/button";
import type { Profile } from "@shared/app-state";
import { useTranslation } from "react-i18next";

interface DashboardPageProps {
  activeProfileId: string;
  profiles: Profile[];
}

const DashboardPage = ({ activeProfileId, profiles }: DashboardPageProps) => {
  const { t } = useTranslation();
  const activeProfile = profiles.find((profile) => profile.id === activeProfileId);

  return (
    <PageLayout title={t("pages.dashboard.title")} description={t("pages.dashboard.description")}>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-sm font-semibold">{t("dashboard.currentProfile")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("dashboard.currentProfileHint")}</p>
          <div className="mt-4 text-sm">
            <span className="text-muted-foreground">{t("dashboard.activeProfile")}:</span>{" "}
            <span className="font-medium text-foreground">
              {activeProfile?.name ?? activeProfileId}
            </span>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-sm font-semibold">{t("dashboard.quickActions")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("dashboard.quickActionsHint")}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              {t("actions.install")}
            </Button>
            <Button variant="outline" size="sm">
              {t("actions.sync")}
            </Button>
            <Button variant="outline" size="sm">
              {t("actions.takeover")}
            </Button>
            <Button variant="outline" size="sm">
              {t("actions.rollback")}
            </Button>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-sm font-semibold">{t("dashboard.recentProjects")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("dashboard.recentProjectsHint")}</p>
          <div className="mt-4 text-sm text-muted-foreground">{t("common.placeholder")}</div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-sm font-semibold">{t("dashboard.marketStatus")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("dashboard.marketStatusHint")}</p>
          <div className="mt-4 text-sm text-muted-foreground">{t("common.placeholder")}</div>
        </section>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
