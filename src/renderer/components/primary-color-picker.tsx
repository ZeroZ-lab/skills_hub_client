import { Palette } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PrimaryColorPickerProps {
  color: string;
  onChange: (value: string) => void;
}

export const PrimaryColorPicker = ({ color, onChange }: PrimaryColorPickerProps) => {
  const { t } = useTranslation();

  return (
    <label className="flex items-center gap-3 text-sm">
      <Palette size={16} />
      <span className="text-muted-foreground">{t("primaryColor")}</span>
      <input
        type="color"
        value={color}
        onChange={(event) => onChange(event.target.value)}
        className="h-8 w-12 cursor-pointer rounded-md border border-input bg-background"
        aria-label={t("primaryColor")}
      />
      <span className="font-mono text-xs text-muted-foreground">{color}</span>
    </label>
  );
};
