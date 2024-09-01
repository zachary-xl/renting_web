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
      <el-form-item label="品牌名" prop="brandId">
        <el-select
          v-model="formData.brandId"
          placeholder="请选择品牌名"
        >
          <el-option
            v-for="item in brandOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="型号名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入型号名称" />
      </el-form-item>
      <el-form-item label="图片" prop="avatarId">
        <el-upload
          :show-file-list="false"
          drag
          :auto-upload="false"
          list-type="picture-card"
          :on-change="onChangeUpload"
          :before-upload="onBeforeUpload"
        >
          <img v-if="formData.avatarId" :src="imageUrl" class="avatar" alt=""/>
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="emits('update:visible', false)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup lang="ts">
import { ElMessage, type FormInstance } from "element-plus";
import {
  getChargeStationBrandListAPI,
  postChargeStationCategoryCreateAPI,
  postChargeStationCategoryUpdateAPI
} from "@/service/charging/categoryManage";
import { Plus } from "@element-plus/icons-vue";
import { TBrandList, TFormCompProps, TFormData } from "@/views/charging/categoryManage/types";

const emits = defineEmits(['update:visible', "confirm"])
const props = defineProps<TFormCompProps>();
const isVisible = ref(props.visible);
const formInstance = ref<FormInstance>();
const formData = reactive<TFormData>({
  name: "",
  brandId: "",
  avatarId: ""
});
const imageUrl = ref("")
const brandOptions = ref<TBrandList[]>([]);
const rules = {
  name: [{ required: true, message: "型号名称不能为空", trigger: "blur" }],
  brandId: [{ required: true, message: "品牌名不能为空", trigger: "blur" }],
  avatarId: [{ required: true, message: "图片不能为空", trigger: "blur" }],
};
const submitForm = ()=>{
  formInstance.value?.validate(async (isValid) => {
    if (isValid) {
      try {
        if(props.title === "新增"){
          await postChargeStationCategoryCreateAPI(formData)
        }else if(props.title === "编辑" && props.initFormData.id){
          await postChargeStationCategoryUpdateAPI(props.initFormData.id, formData)
        }
        ElMessage({
          message: props.title + "成功",
          type: "success",
          plain: true,
        });
        emits("confirm");
      }catch (e) {
        ElMessage({
          message: props.title + "失败",
          type: "error",
          plain: true,
        });
      }
    }
  })
}
const onChangeUpload = (uploadFile, uploadFiles)=>{
  console.log(uploadFile, uploadFiles);
}
const onBeforeUpload = (file)=>{
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    ElMessage.error('上传的文件必须是图片')
    return false;
  }
  const formData = new FormData();
  formData.append('file', file);
  formData.append('limit_type', "img");
}
const getChargeStationBrandList = () => {
  getChargeStationBrandListAPI().then((res) => {
    brandOptions.value = res.data.list.map(i => ({ ...i, label: i.name, value: i.id }));
  });
};
onMounted(()=>{
  if(props.initFormData){
    Object.assign(formData, props.initFormData);
  }
  getChargeStationBrandList();
})
</script>

<style scoped lang="scss">

</style>
