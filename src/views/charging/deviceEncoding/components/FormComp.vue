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
      <!--      <el-form-item label="充电桩名称" prop="name">-->
      <!--        <el-input v-model="formData.name" placeholder="请输入充电桩名称" />-->
      <!--      </el-form-item>-->
      <el-form-item label="品牌名" prop="brandId">
        <el-select v-model="formData.brandId" @change="val => getChargeStationCategoryList(val)" placeholder="请输入品牌名">
          <el-option :label="brand.name" :value="brand.id" v-for="brand of brandOptions" :key="brand.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="型号名" prop="categoryId">
        <el-select :disabled="!formData.brandId" v-model="formData.categoryId" placeholder="请输入型号名">
          <el-option :label="category.name" :value="category.id" v-for="category of categoryOptions" :key="category.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="设备编码" prop="deviceCode">
        <el-input v-model="formData.deviceCode" placeholder="请输入设备编码" />
      </el-form-item>
      <!--  <el-form-item label="图片" prop="avatarIds">
        <el-input v-model="formData.avatarIds" placeholder="请输入图片" />
      </el-form-item>
      <el-form-item label="是否共享" prop="isShare">
        <el-input v-model="formData.isShare" placeholder="请输入是否共享" />
      </el-form-item>
      <el-form-item label="停车是否收费" prop="isParkCharge">
        <el-input v-model="formData.isParkCharge" placeholder="请输入停车是否收费" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="formData.address" placeholder="请输入地址" />
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        <el-input v-model="formData.longitude" placeholder="请输入经度" />
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        <el-input v-model="formData.latitude" placeholder="请输入纬度" />
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="emits('update:visible', false)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup lang="ts">
import { getChargeStationBrandListAPI, getChargeStationCategoryListAPI, postChargeStationCreateAPI } from "@/service/charging";
import { excludingFakeObject } from "@/utils";
import { ElMessage, type FormInstance } from "element-plus";
import type { TBrandList, TCategoryList, TFormData } from "@/views/charging/deviceEncoding/types";

const formInstance = ref<FormInstance>();
const formData = reactive<TFormData>({
  // name: "",
  brandId: "",
  categoryId: "",
  deviceCode: ""
  // avatarIds: "",
  // isShare: "",
  // isParkCharge: "",
  // address: "",
  // latitude: 0,
  // longitude: 0
});
const rules = {
  brandId: [{ required: true, message: "品牌名不能为空", trigger: "blur" }],
  categoryId: [{ required: true, message: "型号名不能为空", trigger: "blur" }],
  deviceCode: [{ required: true, message: "设备编码不能为空", trigger: "blur" }]
};
const emits = defineEmits(["update:visible", "confirm"]);
const props = defineProps({
  visible: Boolean,
  title: {
    type: String,
    default: "新增",
    required: true
  }
});
const brandOptions = ref<TBrandList[]>([]);
const categoryOptions = ref<TCategoryList[]>([]);

const isVisible = ref(props.visible);
const submitForm = () => {
  formInstance.value?.validate(isValid => {
    if (isValid) {
      postChargeStationCreateAPI(excludingFakeObject(formData))
        .then(() => {
          ElMessage({
            message: "新增充电桩设备成功",
            type: "success",
            plain: true
          });
          emits("confirm");
        })
        .catch(() => {
          ElMessage({
            message: "新增充电桩设备失败",
            type: "error",
            plain: true
          });
        });
    }
  });
};
// 品牌
const getChargeStationBrandList = () => {
  getChargeStationBrandListAPI({ noPage: "true" }).then(res => {
    brandOptions.value = res.data.list;
  });
};
// 型号
const getChargeStationCategoryList = brandId => {
  getChargeStationCategoryListAPI({ noPage: "true", brandId }).then(res => {
    categoryOptions.value = res.data.list;
  });
};
onMounted(() => {
  getChargeStationBrandList();
});
</script>
<style scoped lang="scss">
:deep(.el-input) {
  .el-input__wrapper {
    box-shadow: none;
    background-color: rgba(247, 248, 250, 1);
    color: rgba(136, 136, 136, 1);
    font-size: 12px;
  }
}
:deep(.el-select) {
  .el-select__wrapper {
    box-shadow: none;
    background-color: rgba(247, 248, 250, 1);
    color: rgba(136, 136, 136, 1);
    font-size: 12px;
  }
}
</style>
