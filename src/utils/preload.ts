export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadVideo = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.onloadeddata = () => resolve();
    video.onerror = reject;
    video.src = src;
    video.load();
  });
}; 