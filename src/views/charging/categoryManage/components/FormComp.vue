<template>
  <el-dialog :title="title" @close="emits('update:visible', false)" v-model="isVisible" width="600px" append-to-body
    destroy-on-close center>
    <el-form ref="formInstance" :model="formData" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="品牌名" prop="brandId">
            <el-select v-model="formData.brandId" placeholder="请选择品牌名">
              <el-option v-for="item in brandOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="型号名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入型号名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="型号接口信息" prop="categoryUrlId">
            <el-select v-model="formData.categoryUrlId" placeholder="请选择型号接口信息">
              <el-option v-for="item in categoryUrlOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="默认图片" prop="avatarId">
            <el-upload :show-file-list="false" drag list-type="picture-card" :http-request="onCustomUpload"
              :on-success="onHandleSuccessAvatar" :on-remove="() => formData.avatarId = ''" class="h-full w-full">
              <el-image v-if="formData.avatarId" :src="avatarImageUrl" fit="contain" class="h-full w-full" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="充电图片" prop="chargeAvatarId">
            <el-upload :show-file-list="false" drag list-type="picture-card" :http-request="onCustomUpload"
              :on-success="onHandleSuccessChargeAvatar" :on-remove="() => formData.chargeAvatarId = ''" class="h-full w-full">
              <el-image v-if="formData.chargeAvatarId" :src="chargeAvatarImageUrl" fit="contain" class="h-full w-full" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="emits('update:visible', false)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup lang="ts">
import { ElMessage, type FormInstance, type UploadRequestOptions } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import {
  getChargeStationBrandListAPI, getChargeStationCategoryDetailAPI,
  getChargeStationCategoryUrlListAPI,
  postChargeStationCategoryCreateAPI,
  postChargeStationCategoryUpdateAPI
} from "@/service/charging/categoryManage";
import { getFileDownloadAPI, postFileUploadAPI } from "@/service";
import type { TBrandList, TFormCompProps, TFormData } from "@/views/charging/categoryManage/types";

const emits = defineEmits(["update:visible", "confirm"]);
const props = defineProps<TFormCompProps>();
const isVisible = ref(props.visible);
const formInstance = ref<FormInstance>();
const formData = reactive<TFormData>({
  name: "",
  brandId: "",
  categoryUrlId: "",
  avatarId: "",
  chargeAvatarId: ""
});
const avatarImageUrl = ref("");
const chargeAvatarImageUrl = ref("");
const brandOptions = ref<TBrandList[]>([]);
const categoryUrlOptions = ref<TBrandList[]>([]);
const rules = {
  name: [{ required: true, message: "型号名称不能为空", trigger: "blur" }],
  brandId: [{ required: true, message: "品牌名不能为空", trigger: "blur" }],
  categoryUrlId: [{ required: true, message: "型号接口信息不能为空", trigger: "blur" }],
  avatarId: [{ required: true, message: "默认图片不能为空", trigger: "blur" }],
  chargeAvatarId: [{ required: true, message: "充电中图片不能为空", trigger: "blur" }]
};
const submitForm = () => {
  formInstance.value?.validate(async (isValid) => {
    if (isValid) {
      try {
        if (props.title === "新增") {
          await postChargeStationCategoryCreateAPI(formData);
        } else if (props.title === "编辑" && props?.id) {
          await postChargeStationCategoryUpdateAPI(props.id, formData);
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
const onCustomUpload = async (options: UploadRequestOptions): Promise<any> => {
  const { file } = options;
  if (file) {
    const isImage = file.type.startsWith("image/");
    const fileType = file.name?.match(/\.(.*)/)?.[1] || "";
    if (!isImage) {
      ElMessage.error("上传的文件必须是图片");
      return false;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("limit_type", fileType);
    try {
      const res = await postFileUploadAPI(formData);
      return res.data.id;
    } catch (err) {
      ElMessage.error("上传失败");
      throw err;
    }
  }
  return false;
};
const onHandleSuccessAvatar = (id: string, file) => {
  formData.avatarId = id;
  avatarImageUrl.value = file.url;
};
const onHandleSuccessChargeAvatar = (id: string, file) => {
  formData.chargeAvatarId = id;
  chargeAvatarImageUrl.value = file.url;
};
const getChargeStationBrandList = () => {
  getChargeStationBrandListAPI().then((res) => {
    brandOptions.value = res.data.list.map((i) => ({ ...i, label: i.name, value: i.id }));
  });
};
const getChargeStationCategoryUrlList = () => {
  getChargeStationCategoryUrlListAPI().then((res) => {
    categoryUrlOptions.value = res.data.list.map((i) => ({ ...i, label: i.name, value: i.id }));
  });
};
onMounted(async () => {
  if (props.id) {
    const response = await getChargeStationCategoryDetailAPI(props.id);
    if (response?.data?.avatarId) {
      const imgResponse = await getFileDownloadAPI(response.data.avatarId);
      const base64String = btoa(new Uint8Array(imgResponse.data).reduce((data, byte) => data + String.fromCharCode(byte), ""));
      avatarImageUrl.value = `data:image/jpeg;base64,${base64String}`;
    }
    if (response?.data?.chargeAvatarId) {
      const imgResponse = await getFileDownloadAPI(response.data.chargeAvatarId);
      const base64String = btoa(new Uint8Array(imgResponse.data).reduce((data, byte) => data + String.fromCharCode(byte), ""));
      chargeAvatarImageUrl.value = `data:image/jpeg;base64,${base64String}`;
    }
    Object.assign(formData, response.data);
  }
  getChargeStationBrandList();
  getChargeStationCategoryUrlList();
});
</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.el-upload-dragger) {
  padding: 0;
  width: 100%;
  height: 100%;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  width: 100%;
  height: 100%;
}

:deep(.el-form-item__label) {
  font-weight: 700;
}
</style>
