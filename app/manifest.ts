import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "غُرزة — تعلّم الكروشيه من الصفر إلى الاحتراف",
    short_name: "غُرزة",
    description:
      "مسار عربي متكامل لتعلّم الكروشيه: دروس مرتّبة، مراجع الخيوط والإبر والأدوات، وأفضل المصادر.",
    id: "/",
    start_url: "/",
    display: "standalone",
    dir: "rtl",
    lang: "ar",
    background_color: "#fbf4ef",
    theme_color: "#fbf4ef",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
