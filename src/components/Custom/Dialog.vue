<template>
  <el-dialog :before-close="cancel" :model-value="visible" :title="title" append-to-body destroy-on-close draggable width="680px">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" size="default">
      <el-row>
        <el-col v-for="item of config" :key="item.prop" :span="item.span || 24">
          <el-form-item :prop="item.prop">
            <template #label>
              <span>
                <el-tooltip v-if="item.label.content" :content="item.label.content" placement="top">
                  <el-icon>
                    <QuestionFilled />
                  </el-icon>
                </el-tooltip>
                {{ item.label.title }}
              </span>
            </template>
            <template v-if="item.type === 'tree-select'" #default>
              <el-tree-select
                v-model="formData[item.prop]"
                :data="item.options"
                :render-after-expand="false"
                accordion
                check-strictly
                clearable
              />
            </template>
            <template v-if="item.type === 'input'" #default>
              <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" type="text" />
            </template>
            <template v-if="item.type === 'input-number'" #default>
              <el-input-number v-model="formData[item.prop]" :min="0" controls-position="right" />
            </template>
            <template v-if="item.type === 'radio-group'" #default>
              <el-radio-group v-model="formData[item.prop]">
                <el-radio v-for="dict in item.options" :key="dict.value" :label="dict.value">{{ dict.label }} </el-radio>
              </el-radio-group>
            </template>
            <template v-if="item.type === 'icon'" #default>
              <el-popover :width="540" placement="bottom-start" trigger="click">
                <template #reference>
                  <el-input v-model="formData[item.prop]" placeholder="点击选择图标" readonly @click="showSelectIcon">
                    <template #prefix>
                      <svg-icon
                        v-if="formData[item.prop]"
                        :icon-class="formData[item.prop]"
                        class="el-input__icon"
                        style="height: 32px; width: 16px"
                      />
                      <el-icon v-else style="height: 32px; width: 16px">
                        <Search />
                      </el-icon>
                    </template>
                  </el-input>
                </template>
                <SelectIcon ref="iconSelectRef" @selected="(icon) => (formData[item.prop] = icon)" />
              </el-popover>
            </template>
            <template v-if="item.type === 'textarea'">
              <el-input v-model="formData[item.prop]" :autosize="{ minRows: 2 }" :placeholder="item.placeholder" type="textarea" />
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" name="Dialog" setup>
import type { PropType } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import type { ICustomDialog } from "../types";
import { ref, reactive, toRaw } from "vue";
import { ElTreeSelect } from "element-plus";
import { QuestionFilled, Search } from "@element-plus/icons-vue";
import { SelectIcon } from "@/components";

const emits = defineEmits(["update:visible", "submitForm"]);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: "添加"
  },
  config: {
    type: Array as PropType<ICustomDialog.IConfig[]>,
    default: []
  }
});

const formRef = ref<FormInstance>();
const formData = reactive({});
const formRules = reactive<FormRules>({});

const submitForm = () => {
  formRef.value?.validate((isValid) => {
    if (isValid) {
      emits("submitForm", formData);
    }
  });
};
const cancel = () => {
  emits("update:visible", false);
};
// TODO: 选择 icon 图标
const iconSelectRef = ref<InstanceType<typeof SelectIcon> | null>(null);
const showSelectIcon = () => {
  iconSelectRef.value && iconSelectRef.value[0].reset();
};
// TODO: 初始化 form, rule
const unwatchConfig = watch(
  () => props.config,
  (config) => {
    for (const item of config) {
      if (item.rule) {
        formRules[item.prop] = item.rule;
      }
      formData[item.prop] = item.value;
    }
    setTimeout(() => unwatchConfig(), 0);
  },
  {
    immediate: true
  }
);

const unwatchVisible = watch(
  () => props.visible,
  (val) => {
    console.log(val);
  }
);
onUnmounted(() => {
  unwatchVisible();
});
</script>
