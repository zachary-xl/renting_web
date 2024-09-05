<template>
  <div class="app-container">
    <el-form ref="formHeaderRef" :inline="true" :model="queryParams">
      <el-form-item label="品牌名" prop="brandId">
        <el-select v-model="queryParams.brandId" placeholder="请选择品牌名" @change="getList">
          <el-option v-for="item in brandOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="型号名" prop="name">
        <el-input v-model="queryParams.name" @keydown.enter="getList" class="input rounded" placeholder="请输入型号名" clearable />
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
      <el-button color="#1F63FF" :icon="Plus" @click="onHandleCreate">新建</el-button>
    </div>
    <el-table :data="tableData" v-loading="loading" class="w-full" header-cell-class-name="table-header">
      <el-table-column type="index" label="序号" align="center" width="60" />
      <el-table-column label="品牌名称" align="center" prop="brandName" />
      <el-table-column label="型号名称" align="center" prop="name" />
      <el-table-column label="型号接口信息" align="center" prop="categoryUrlName" />
      <el-table-column label="图片" align="center" prop="avatarId">
        <template #default="{ row }">
          <el-image :src="(row as TList).image" fit="cover" class="w-[60px]" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createdAt">
        <template #default="{ row }">
          <span>{{ dateTimeFormat((row as TList).createdAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template #default="{ row }">
          <el-button type="primary" link @click="onHandleUpdate(row)"> 编辑</el-button>
          <el-button type="danger" link @click="onHandleDelete(row)"> 删除</el-button>
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
      :title="title"
      v-if="visible"
      :id="id"
      @confirm="onHandleConfirm"
      @update:visible="(bool) => (visible = bool)"
      :visible="visible"
    />
  </div>
</template>
<script setup lang="ts">
import { Search, RefreshLeft, Plus } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox, type FormInstance } from "element-plus";
import { dateTimeFormat, excludingFakeObject } from "@/utils";
import {
  deleteChargeStationCategoryDeleteAPI,
  getChargeStationBrandListAPI,
  getChargeStationCategoryListAPI
} from "@/service/charging/categoryManage";
import FormComp from "@/views/charging/categoryManage/components/FormComp.vue";
import type { TListParams, TList, TBrandList, TFormData } from "@/views/charging/categoryManage/types";
import { getFileDownloadAPI } from "@/service";

const formHeaderRef = ref<FormInstance>();
const total = ref(0);
const loading = ref(true);
const title = ref("");
const visible = ref(false);
const paginationParams = reactive({
  currentPage: 1,
  pageSize: 10
});
const queryParams = reactive<Partial<TListParams>>({
  name: "",
  brandId: ""
});
const id = ref<string>();
const brandOptions = ref<TBrandList[]>([]);
const tableData = ref<TList[]>([]);
const resetHeaderForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  getList();
};
const getList = async () => {
  loading.value = true;
  const res = await getChargeStationCategoryListAPI({ ...paginationParams, ...excludingFakeObject(queryParams) });
  const data = res.data;
  for (let item of data.list) {
    const response = await getFileDownloadAPI(item.avatarId);
    const base64String = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ""));
    item.image = `data:image/jpeg;base64,${base64String}`;
  }
  tableData.value = data.list;
  total.value = data.total;
  loading.value = false;
};
const onHandleConfirm = () => {
  visible.value = false;
  getList();
};
// 新增
const onHandleCreate = () => {
  title.value = "新增";
  visible.value = true;
  id.value = undefined;
};
// 修改
const onHandleUpdate = (row) => {
  title.value = "编辑";
  visible.value = true;
  id.value = row.id;
};
// 删除
const onHandleDelete = (row) => {
  ElMessageBox.confirm(
    `<div>
      确认删除 ${row.name} 型号吗？
    </div>`,
    "删除型号",
    {
      dangerouslyUseHTMLString: true
    }
  ).then(() => {
    deleteChargeStationCategoryDeleteAPI(row.id).then(() => {
      ElMessage({
        message: "删除成功",
        type: "success",
        plain: true
      });
      getList();
    });
  });
};
const getChargeStationBrandList = () => {
  getChargeStationBrandListAPI().then((res) => {
    brandOptions.value = res.data.list.map((i) => ({ ...i, label: i.name, value: i.id }));
  });
};
getList();
getChargeStationBrandList();
</script>
<style scoped lang="scss">
:deep(.el-button) {
  height: 30px;
  font-size: 12px;
}

:deep(.el-input) {
  .el-input__wrapper {
    box-shadow: none;
    background-color: rgba(247, 248, 250, 1);
    color: rgba(136, 136, 136, 1);
    font-size: 12px;
  }
}

:deep(.el-select) {
  width: 220px !important;
  .el-select__wrapper {
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
