export interface IState {
  isExpand: boolean;
  isFullScreen: boolean;
  isFixedHeader: boolean;
  isThemed: TTheme;
}

export type TTheme = "light" | "dark";
