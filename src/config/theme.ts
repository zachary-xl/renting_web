import cssVars from "css-vars-ponyfill";
import { lightTheme, darkTheme } from "@/model";

export const initTheme = (theme: "dark" | "light") => {
  document.documentElement.setAttribute("data-theme", theme ? "light" : "dark");
  cssVars({
    watch: true, // 当添加，删除或修改其<link>或<style>元素的禁用或href属性时，ponyfill将自行调用
    variables: theme === "light" ? lightTheme : darkTheme, // variables 自定义属性名/值对的集合
    onlyLegacy: true // false  默认将css变量编译为浏览器识别的css样式  true 当浏览器不支持css变量的时候将css变量编译为识别的css
  });
};
