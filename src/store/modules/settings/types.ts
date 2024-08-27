export interface IState {
  isExpand: boolean;
  isFullScreen: boolean;
  isFixedHeader: boolean;
  isThemed: TTheme;

  title: string;
  dynamicTitle: boolean;
}

export type TTheme = "light" | "dark";
