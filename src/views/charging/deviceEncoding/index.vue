<template>
  <div class="app-container">
    <el-form ref="formHeaderRef" :inline="true" :model="queryParams" class="demo-form-inline">
      <el-form-item label="设备编码" property="imei">
        <el-input v-model="queryParams.imei" class="input rounded" placeholder="请输入设备编码" clearable />
      </el-form-item>
      <el-form-item label="型号" property="categoryName">
        <el-input v-model="queryParams.categoryName" class="input rounded" placeholder="请输入型号" clearable />
      </el-form-item>
      <el-form-item label="品牌" property="brandName">
        <el-input v-model="queryParams.brandName" class="input rounded" placeholder="请输入品牌" clearable />
      </el-form-item>
      <el-form-item label="绑定用户" property="userId">
        <el-input v-model="queryParams.userId" class="input rounded" placeholder="请输入绑定用户" clearable />
      </el-form-item>
      <el-form-item label="绑定时间" property="datePickerValue">
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
        <el-button text bg class="h-[30px]" @click="resetHeaderForm">
          <el-icon class="mr-2">
            <RefreshLeft />
          </el-icon>
          重置
        </el-button>
        <el-button type="primary" class="h-[30px]" @click="submitHeaderForm">
          <el-icon class="mr-2">
            <Search />
          </el-icon>
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <div class="line"></div>
    <el-table :data="tableData" class="w-full" header-cell-class-name="table-header">
      <el-table-column type="index" label="序号" align="center" width="60" />
      <el-table-column label="设备编码" align="center" prop="username"  />
      <el-table-column label="型号" align="center" prop="wxId" />
      <el-table-column label="品牌" align="center" prop="chargeDegree" />
      <el-table-column label="绑定用户" align="center" prop="chargeStationNum" />
      <el-table-column label="绑定时间" align="center" prop="createdAt">
        <template #default="{ row }">
          <span>{{ dateTimeFormat((row as TUserList).createdAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template #default="scope">
          <el-button
            type="primary"
            link
          >
            解绑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      v-model:page="queryParams.currentPage"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import type { FormInstance } from "@/views/login/types";
import { postUserListAPI } from "@/service/user";
import { dateTimeFormat } from "@/utils";
import { TUserList } from "@/views/user/types";
const formHeaderRef = ref<FormInstance>()
const total = ref(0);
const datePickerValue = ref([]);
const queryParams = reactive({
  noPage: "true",
  currentPage: 2,
  pageSize: 20,
  search: "",
  imei: "",
  brandId: "",
  brandName: "",
  categoryName: "",
  userId: "",
  nickame: "",
  isParkCharge: "",
  status: 0,
  bindAtGte: 0,
  bindAtLte: 0
});
const tableData = ref<TUserList[]>([]);
const submitHeaderForm = ()=>{
  console.log(formHeaderRef.value);
  console.log(queryParams);
}
const resetHeaderForm = ()=>{
  formHeaderRef.value?.resetFields()
}

const getList = () => {
  postUserListAPI(queryParams).then(res => {
    console.log(res);
    const data = res.data;
    tableData.value = data.list;
    total.value = data.total
  });
};
const onHandleDatePicker = (date) => {
  if (date) {
    queryParams.createdAtGte = dayjs(date[0]).valueOf() as undefined;
    queryParams.createdAtLte = dayjs(date[1]).valueOf() as undefined;
  } else {
    queryParams.createdAtGte = undefined;
    queryParams.createdAtLte = undefined;
  }
};
onMounted(() => {
  getList();
});
</script>
<style scoped lang="scss">
::v-deep .el-button {
  height: 30px;
  font-size: 12px;
}

::v-deep .el-input {
  width: 100px;

  .el-input__wrapper {
    box-shadow: none;
    background-color: rgba(247, 248, 250, 1);
    color: rgba(136, 136, 136, 1);
    font-size: 12px;
  }
}

::v-deep .el-date-editor {
  background-color: rgba(247, 248, 250, 1);
  color: rgba(136, 136, 136, 1);
  width: 200px;
  height: 30px;
  box-shadow: none;

  .el-range-input {
    font-size: 12px;
  }
}

::v-deep .table-header {
  font-weight: bolder !important;
  white-space: nowrap !important;

  .cell {
    font-weight: bolder !important;
    white-space: nowrap !important;
  }
}
</style>
