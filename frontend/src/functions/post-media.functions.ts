export type PostMediaType = 'image' | 'pdf' | 'link';

const IMAGE_FILE_EXTENSION = /\.(?:avif|bmp|gif|jpe?g|png|svg|webp)(?:[?#]|$)/i;
const PDF_FILE_EXTENSION = /\.pdf(?:[?#]|$)/i;

export const getPostMediaType = (media: string): PostMediaType =>
  IMAGE_FILE_EXTENSION.test(media)
    ? 'image'
    : PDF_FILE_EXTENSION.test(media)
      ? 'pdf'
      : 'link';
