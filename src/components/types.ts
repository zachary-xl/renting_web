import type { FormRules } from "element-plus";

export interface ISvgIconProps {
  iconClass: string;
  className?: string;
  color?: string;
}

export namespace ICustomDialog {
  export interface IConfig {
    type: "input" | "tree-select" | "input-number" | "radio-group" | "icon" | "textarea";
    prop: string;
    span?: number;
    value: string | number;
    placeholder?: string;
    label: ILabel;
    options?: IOptions[];
    rule?: FormRules;
  }

  export interface IOptions {
    value: string | number;
    label: string;
    children?: IOptions[];
  }

  export interface ILabel {
    title: string;
    content?: string;
  }
}
