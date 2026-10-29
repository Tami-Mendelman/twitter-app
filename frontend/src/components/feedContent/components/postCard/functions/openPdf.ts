export const openPdf = (dataUrl: string): void => {
  const [header, base64] = dataUrl.split(',');
  const mimeType = header.match(/data:(.*?);base64/)?.[1];

  if (!base64 || mimeType !== 'application/pdf') {
    return;
  }

  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  window.open(url, '_blank', 'noopener,noreferrer');
};