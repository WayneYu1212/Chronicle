import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "佣书 · Chronicle", description: "一款关于历史如何被保存的互动叙事游戏。" };
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#241c17" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
