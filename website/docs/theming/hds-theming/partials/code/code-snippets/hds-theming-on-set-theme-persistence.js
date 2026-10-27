/* eslint-disable no-undef */
this.hdsTheming.setTheme({
  theme: currentTheme,
  onSetTheme: ({ currentTheme }) => {
    localStorage.setItem('hds-theme', currentTheme);
  },
});
