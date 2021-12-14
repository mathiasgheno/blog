export function getTheme(): 'Light' | 'Dark' {
  const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
  if(!mediaQueryList.matches) {
    return 'Dark';
  }
  return 'Light'
}
