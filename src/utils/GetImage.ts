

export const getImageUrl = (path?: string, size: string = 'original'): string => {
    if (!path) return '';
    const baseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/';
    return `${baseUrl}${size}${path}`;
};
