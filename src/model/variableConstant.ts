const baseSize = {
  "--font-size-first-level-title": "18px",
  "--font-size-second-level-title": "16px"
};

// 浅色
export const lightTheme = {
  "--themeColor": "#01cc8c",
  "--left-bg": "rgb(182, 23, 23)",
  "--right-bg": "rgb(63, 9, 9)",
  "--top-bg": "rgb(6, 36, 65)",
  "--bottom-bg": "rgb(55, 214, 10)",
  ...baseSize
};

// 深色
export const darkTheme = {
  "--themeColor": "#56518C",
  "--left-bg": "#0094ff",
  "--right-bg": "blue",
  "--top-bg": "red",
  "--bottom-bg": "pink",
  ...baseSize
};
