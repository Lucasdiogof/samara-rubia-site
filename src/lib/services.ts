import { site } from "@/config/site";
import { services } from "@/content/services";

export const enabledServices = () => services.filter((s) => site.enabledServices.includes(s.slug));
