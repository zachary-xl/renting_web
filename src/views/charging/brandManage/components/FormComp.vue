<template>
  <el-dialog
    :title="title"
    @close="emits('update:visible', false)"
    v-model="isVisible"
    width="600px"
    append-to-body
    destroy-on-close
    center
  >
    <el-form ref="formInstance" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="品牌名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入品牌名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="emits('update:visible', false)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup lang="ts">
import { ElMessage, FormInstance } from "element-plus";
import { TFormCompProps, TFormData } from "@/views/charging/brandManage/types";
import { postChargeStationBrandCreateAPI, putChargeStationBrandUpdateAPI } from "@/service/charging/brandManage";
const emits = defineEmits(["update:visible", "confirm"]);

const props = defineProps<TFormCompProps>();
const isVisible = ref(props.visible);
const formInstance = ref<FormInstance>();
const formData = reactive<TFormData>({
  name: ""
});
const rules = {
  name: [{ required: true, message: "品牌名称不能为空", trigger: "blur" }]
};
const submitForm = () => {
  formInstance.value?.validate(async (isValid) => {
    if (isValid) {
      try {
        if (props.title === "新增") {
          await postChargeStationBrandCreateAPI(formData);
        } else if (props.title === "编辑" && props?.initFormData?.id) {
          await putChargeStationBrandUpdateAPI(props.initFormData.id, formData);
        }
        ElMessage({
          message: props.title + "成功",
          type: "success",
          plain: true
        });
        emits("confirm");
      } catch (e) {
        ElMessage({
          message: props.title + "失败",
          type: "error",
          plain: true
        });
      }
    }
  });
};
onMounted(() => {
  if (props.initFormData) {
    Object.assign(formData, props.initFormData);
  }
});
</script>
