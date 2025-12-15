import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export function youtubeToEmbed(
  url: string,
  sanitizer: DomSanitizer
): SafeResourceUrl | null {

  if (!url) return null;

  const videoId = url.split('v=')[1]?.split('&')[0];
  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;

  return sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
}
