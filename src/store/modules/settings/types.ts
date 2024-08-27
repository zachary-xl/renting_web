export interface IState {
  isExpand: boolean;
  isFullScreen: boolean;
  isFixedHeader: boolean;
  isThemed: TTheme;

  title: string;
  dynamicTitle: string;
}

export type TTheme = "light" | "dark";
