<template>
  <el-dialog :title="title" @close="emits('update:visible', false)" :model-value="isVisible" width="600px"
             append-to-body destroy-on-close center>
    <el-form ref="formInstance" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="充电桩名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入充电桩名称" />
      </el-form-item>
      <el-form-item label="品牌id" prop="brandId">
        <el-input v-model="formData.brandId" placeholder="请输入品牌id" />
      </el-form-item>
      <el-form-item label="型号id" prop="categoryId">
        <el-input v-model="formData.categoryId" placeholder="请输入型号id" />
      </el-form-item>
      <el-form-item label="IMEI" prop="imei">
        <el-input v-model="formData.imei" placeholder="请输入IMEI" />
      </el-form-item>
      <el-form-item label="图片" prop="avatarIds">
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
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="emits('update:visible', false)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup lang="ts">
const formInstance = ref(null)
const formData = reactive({
  name: "",
  brandId: "",
  categoryId: "",
  imei: "",
  avatarIds: "",
  isShare: "",
  isParkCharge: "",
  address: "",
  latitude: 0,
  longitude: 0
});
const rules = {
  brandId: [{ required: true, message: "品牌id不能为空", trigger: "blur" }],
  categoryId: [{ required: true, message: "型号id不能为空", trigger: "blur" }],
  imei: [{ required: true, message: "IMEI不能为空", trigger: "blur" }],
}
const emits = defineEmits(["update:visible"]);
const props = defineProps({
  visible: Boolean,
  title: {
    type: String,
    default: "新增",
    required: true
  }
});
const isVisible = ref(props.visible);
const submitForm = ()=>{
  formInstance.value?.validate((isValid) => {
    console.log(isValid);
  })
}
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
</style>
