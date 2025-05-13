export const useSliderImages = () => {
  const imageModules = import.meta.glob('~/assets/imgs/*.png', { eager: true, import: 'default' })

  return Object.entries(imageModules).map(([path, src], index) => ({
    id: index + 1,
    src,
    alt: path.split('/').pop()?.replace('.png', '') || `slide-${index}`,
  }))
}
