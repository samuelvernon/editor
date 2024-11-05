export const Utils = {
  get styles(): string[] {
    return (document.querySelector('link[rel*="stylesheet"]')) ? Object.values(document.querySelectorAll('link[rel*="stylesheet"]')).map((l) => (l as HTMLLinkElement).href) : null;
  }
};