// hooks/useTranslation.js
// Hook simple pour récupérer les traductions selon la langue active
import { useRouter } from "next/router";
import fr from "../locales/fr";
import en from "../locales/en";

export function useTranslation() {
  const { locale } = useRouter();
  const t = locale === "en" ? en : fr;
  return { t, locale };
}
