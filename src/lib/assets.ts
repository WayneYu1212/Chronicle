export const assetBasePath = process.env.GITHUB_PAGES === "true" ? "/Chronicle" : "";

export function assetPath(path: string) {
  return `${assetBasePath}${path.startsWith("/") ? path : `/${path}`}`;
}
