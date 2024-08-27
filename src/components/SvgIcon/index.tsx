import type { ISvgIconProps } from "../types";
import { defineComponent, h, computed } from "vue";

export default defineComponent({
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    }
  },
  setup(props: ISvgIconProps) {
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      }
      return "svg-icon";
    });
    return () => (
      <svg className={svgClass.value} aria-hidden="true">
        <use xlinkHref={iconName.value} fill={props.color} />
      </svg>
    );
  }
});
