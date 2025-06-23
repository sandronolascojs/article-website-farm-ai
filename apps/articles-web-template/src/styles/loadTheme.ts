import { ThemeAvailable } from '@auto-articles/types';

export const loadTheme = async (theme: ThemeAvailable): Promise<void> => {
  if (theme === ThemeAvailable.DEFAULT) {
    require('./globals.css');
    return;
  }
  require(`./globals.${theme}.css`);
};
