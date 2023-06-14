import { defineComponent, h, ref } from "vue";
import { ElInput } from "element-plus";

export default defineComponent({
  components: { ElInput },
  setup(props, { emit, expose }) {
    const icons = getSvg();
    const iconList = ref(icons);
    const iconName = ref<string>("");
    const filterIcons = () => {
      iconList.value = icons;
      if (iconName.value) {
        iconList.value = icons.filter((item) => item.indexOf(iconName.value) !== -1);
      }
    };
    const selectedIcon = (name) => {
      emit("selected", name);
      document.body.click();
    };

    const reset = () => {
      iconName.value = "";
      iconList.value = icons;
    };

    expose({
      reset
    });
    return () => (
      <div class="w-full p-2 pb-0">
        <el-input
          v-model={iconName.value}
          clearable
          placeholder="请输入图标名称"
          onInput={(_) => filterIcons()}
          onClear={(_) => filterIcons()}
        />
        <div class="my-2 h-52 overflow-y-auto">
          {iconList.value.map((item, index) => (
            <div
              class="float-left -mb-2 flex h-8 w-1/3 cursor-pointer items-center leading-8"
              key={index}
              onClick={(e) => selectedIcon(item)}
            >
              <svg-icon icon-class={item} style="height: 30px;width: 16px;" />
              <span class="inline-block overflow-hidden fill-current pl-2">{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
});

// 获取所有 svg
const getSvg = (): string[] => {
  const icons: string[] = [];
  const modules = import.meta.glob("@/assets/images/svg/*.svg");
  for (const path in modules) {
    const p = path.split("/src/assets/images/svg/")[1]?.split(".svg")[0] ?? "";
    icons.push(p);
  }
  return icons;
};
