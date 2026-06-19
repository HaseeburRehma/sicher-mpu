import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/beratung", "/nachhilfe", "/kontakt", "/impressum"];
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: new Date("2026-06-19"),
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
