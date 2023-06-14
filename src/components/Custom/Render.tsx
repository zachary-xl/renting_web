import { defineComponent } from "vue";

export default defineComponent({
  props: {
    row: Object,
    render: {
      type: Function,
      required: true
    },
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  setup(props: any, { attrs }) {
    return () =>
      props.render({
        ...props,
        ...attrs
      });
  }
});
