import type { MetadataRoute } from "next";

const BASE_URL = "https://ttdevs.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/tom", "/therese"].map((path) => ({
    url: `${BASE_URL}${path === "/" ? "" : path}`,
  }));
}
