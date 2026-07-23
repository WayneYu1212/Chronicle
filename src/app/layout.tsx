import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/assets";
import "./globals.css";

export const metadata: Metadata = {
  title: "佣书 · Chronicle",
  description: "一款关于历史如何被保存的互动叙事游戏。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#241c17",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const assetVars = {
    "--paper-texture": `url("${assetPath("/assets/aged-handmade-paper.png")}")`,
    "--cover-texture": `url("${assetPath("/assets/chronicle-cover.webp")}")`,
  } as CSSProperties;

  return (
    <html lang="zh-CN">
      <head>
        <link rel="preload" as="image" href={assetPath("/assets/chronicle-cover.webp")} type="image/webp" />
        <link rel="preload" as="image" href={assetPath("/assets/aged-handmade-paper.png")} type="image/png" />
      </head>
      <body style={assetVars}>{children}</body>
    </html>
  );
}
