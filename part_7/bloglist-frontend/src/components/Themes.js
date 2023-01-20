const surface = {
  light: {
    bg: 'rgb(156 163 175)',
    bg_hover: '#CFD6E2',
    color: '#d4d4d4',
  },
  dark: {
    bg: '#171717',
    bg_hover: '#4A4A4A',
    color: '#d4d4d4',
  },
};

const primary = {
  light: {
    bg: 'rgb(79 70 229)',
    bgHover: '#6366f1',
    bgActive: '',
    fg: '#fff',
    fgHover: 'rgb(79 70 229)',
    fgActive: '#f9f9f9',
  },
  dark: {
    bg: '#6366f1',
    bgHover: '#7281C9',
    bgActive: '',
    fg: '#fff',
    fgHover: '#a5b4fc',
    fgActive: '#f9f9f9',
  },
};

const light = {
  bg: '#f9f9f9',
  surface: surface.light,
  primary: primary.light,
  fg: '#000',
  fg_hover: '#a5b4fc',
  fg_active: '#f9f9f9',
};

const dark = {
  bg: '#000',
  surface: surface.dark,
  primary: primary.dark,
  fg: '#fafafa',
  fg_hover: '#a5b4fc',
  fg_active: '#f9f9f9',
};

export const lightTheme = {
  mode: 'light',
  background: light.bg,
  onBackground: light.fg,
  onBackground_Hover: light.fg_hover,
  onBackground_Active: light.fg_active,
  surface: light.surface,
  primary: light.primary,
  border: '#FFF',
  body: '#',
  color: '#FAFAFA',
};

export const darkTheme = {
  mode: 'dark',
  background: dark.bg,
  onBackground: dark.fg,
  onBackground_Hover: dark.fg_hover,
  onBackground_Active: dark.fg_active,
  surface: dark.surface,
  primary: dark.primary,
  border: '#FFF',
  body: '#',
  color: '#FAFAFA',
};
