<template>
  <div class="app-container">
    <el-form ref="formHeaderRef" :inline="true" :model="queryParams">
      <el-form-item label="设备编码" prop="deviceCode">
        <el-input v-model="queryParams.deviceCode" @keydown.enter="getList" class="input rounded" placeholder="请输入设备编码" clearable />
      </el-form-item>
      <el-form-item label="型号" prop="categoryName">
        <el-input v-model="queryParams.categoryName" @keydown.enter="getList" class="input rounded" placeholder="请输入型号" clearable />
      </el-form-item>
      <el-form-item label="品牌" prop="brandName">
        <el-input v-model="queryParams.brandName" @keydown.enter="getList" class="input rounded" placeholder="请输入品牌" clearable />
      </el-form-item>
      <el-form-item label="绑定用户" prop="nickname">
        <el-input v-model="queryParams.nickname" @keydown.enter="getList" class="input rounded" placeholder="请输入绑定用户" clearable />
      </el-form-item>
      <el-form-item label="绑定时间" prop="datePickerValue">
        <el-date-picker
          class="date"
          v-model="datePickerValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          size="small"
          @change="onHandleDatePicker"
        />
      </el-form-item>
      <el-form-item>
        <el-button text bg class="h-[30px]" @click="resetHeaderForm(formHeaderRef)">
          <el-icon class="mr-2">
            <RefreshLeft />
          </el-icon>
          重置
        </el-button>
        <el-button type="primary" class="h-[30px]" @click="getList">
          <el-icon class="mr-2">
            <Search />
          </el-icon>
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <div class="line"></div>
    <div class="my-2 flex items-center">
      <el-button color="#1F63FF" :icon="Plus" @click="onHandleAdd">新建</el-button>
      <el-upload ref="uploadRef" @change="onUpload" :limit="1" :show-file-list="false" :auto-upload="false" class="mx-2 flex items-center">
        <el-button color="#F7F8FA">批量导入</el-button>
      </el-upload>
      <el-button link type="primary" @click="onDownLoadTemplate">导入模板下载</el-button>
    </div>
    <el-table :data="tableData" v-loading="loading" class="w-full" header-cell-class-name="table-header">
      <el-table-column type="index" label="序号" align="center" width="60" />
      <el-table-column label="设备编码" align="center" prop="deviceCode" />
      <el-table-column label="品牌" align="center" prop="brandName">
        <template #default="{ row }">
          <span>{{ (row as TList).brandName || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="型号" align="center" prop="categoryName">
        <template #default="{ row }">
          <span>{{ (row as TList).categoryName || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="wxId" align="center" prop="wxId" />
      <el-table-column label="绑定用户" align="center" prop="nickname">
        <template #default="{ row }">
          <span>{{ (row as TList).nickname || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" prop="phone" />
      <el-table-column label="绑定时间" align="center" prop="createdAt">
        <template #default="{ row }">
          <span>{{ dateTimeFormat((row as TList).createdAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template #default="{ row }">
          <el-button type="primary" link @click="onHandleChargeStationUnbind(row)"> 解绑 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="relative float-right"
      v-model:current-page="paginationParams.currentPage"
      v-model:page-size="paginationParams.pageSize"
      :page-sizes="[10, 30, 50, 100]"
      background
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="(val) => (paginationParams.pageSize = val)"
      @current-change="(val) => (paginationParams.currentPage = val)"
      @change="getList"
    />
    <FormComp
      v-if="visible"
      v-model.visible="visible"
      @update:visible="(bool) => (visible = bool)"
      :title="title"
      @confirm="onHandleConfirm"
    />
  </div>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import { ElMessage, ElMessageBox, type FormInstance, type UploadInstance } from "element-plus";
import { Search, RefreshLeft, Plus } from "@element-plus/icons-vue";
import { dateTimeFormat, excludingFakeObject } from "@/utils";
import {
  getChargeStationListAPI,
  postChargeStationOperateUnbindAPI,
  postChargeStationTemplateDownloadAPI,
  postChargeStationXLSXImportAPI
} from "@/service/charging";
import FormComp from "@/views/charging/deviceEncoding/components/FormComp.vue";
import type { TList, TListParams } from "@/views/charging/deviceEncoding/types";

const formHeaderRef = ref<FormInstance>();
const uploadRef = ref<UploadInstance>();
const total = ref(0);
const loading = ref(true);
const title = ref("");
const visible = ref(false);
const datePickerValue = ref([]);
const paginationParams = reactive({
  currentPage: 1,
  pageSize: 10
});
const queryParams = reactive<Partial<TListParams>>({
  deviceCode: "",
  categoryName: "",
  brandId: "",
  nickname: "",
  bindAtGte: undefined,
  bindAtLte: undefined
});
const tableData = ref<TList[]>([]);
const onUpload = (_, uploadFile) => {
  if (Array.isArray(uploadFile) && uploadFile.length > 0) {
    const file = uploadFile[0];
    const formData = new FormData();
    formData.append("limit_type", file.name.split(".")[1]);
    formData.append("file", file.raw);
    postChargeStationXLSXImportAPI(formData).then(() => {
      ElMessage({
        message: "导入成功",
        type: "success",
        plain: true
      });
      getList();
    });
  }
};
const onHandleConfirm = () => {
  visible.value = false;
  getList();
};
// 解绑设备
const onHandleChargeStationUnbind = (row) => {
  ElMessageBox.confirm(
    `<div>确认解绑
          <span style="color: #106bfe;margin: 0 2px;">${row.deviceCode}</span>
          设备? 当前绑定用户为<span style="color: #106bfe;margin: 0 2px;">${row.nickname}</span>
    </div>`,
    "解绑设备",
    {
      dangerouslyUseHTMLString: true
    }
  )
    .then(() => {
      postChargeStationOperateUnbindAPI(row.id).then(() => {
        ElMessage({
          message: "解绑成功",
          type: "success",
          plain: true
        });
        getList();
      });
    })
    .catch(() => {});
};
const resetHeaderForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  datePickerValue.value = [];
  queryParams.bindAtGte = undefined;
  queryParams.bindAtLte = undefined;
  formEl.resetFields();
  getList();
};
const getList = () => {
  loading.value = true;
  getChargeStationListAPI({ ...paginationParams, ...excludingFakeObject(queryParams) }).then((res) => {
    const data = res.data;
    tableData.value = data.list;
    total.value = data.total;
    loading.value = false;
  });
};
const onHandleAdd = () => {
  title.value = "新建";
  visible.value = true;
};
const onHandleDatePicker = (date) => {
  if (date) {
    queryParams.bindAtGte = dayjs(date[0]).valueOf();
    queryParams.bindAtLte = dayjs(date[1]).valueOf();
    getList();
  } else {
    queryParams.bindAtGte = undefined;
    queryParams.bindAtLte = undefined;
  }
};
const onDownLoadTemplate = () => {
  postChargeStationTemplateDownloadAPI().then((response: any) => {
    const contentDisposition = response.headers["content-disposition"];
    const filenameMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/);
    let fileName;
    if (filenameMatch) {
      if (filenameMatch[1]) {
        fileName = decodeURIComponent(filenameMatch[1]);
      } else {
        fileName = filenameMatch[2];
      }
    }
    const blob = new Blob([response.data], { type: response.data.type });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = decodeURIComponent(fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(fileUrl);
  });
};
getList();
</script>
<style scoped lang="scss">
:deep(.el-button) {
  height: 30px;
  font-size: 12px;
}

:deep(.el-select) {
  width: 100px !important;
}

:deep(.el-input) {
  .el-input__wrapper {
    box-shadow: none;
    background-color: rgba(247, 248, 250, 1);
    color: rgba(136, 136, 136, 1);
    font-size: 12px;
  }
}

:deep(.el-date-editor) {
  background-color: rgba(247, 248, 250, 1);
  color: rgba(136, 136, 136, 1);
  width: 220px;
  height: 30px;
  box-shadow: none;
}
:deep(.el-form-item__label) {
  font-weight: 600;
}
:deep(.table-header) {
  .cell {
    font-weight: bolder !important;
    white-space: nowrap !important;
  }
}
</style>
