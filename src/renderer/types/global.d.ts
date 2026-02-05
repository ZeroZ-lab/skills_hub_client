export {};

declare global {
  interface Window {
    electron?: {
      versions: NodeJS.ProcessVersions;
    };
  }
}
