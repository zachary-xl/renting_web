<template>
  <div class="app-container">
    <el-form ref="formHeaderRef" :inline="true" :model="queryParams">
      <el-form-item label="订单号" prop="code">
        <el-input v-model="queryParams.code" @keydown.enter="getList" class="input rounded" placeholder="请输入订单号" clearable />
      </el-form-item>
      <el-form-item label="充电桩编码" prop="chargeStationDeviceCode">
        <el-input
          v-model="queryParams.chargeStationDeviceCode"
          @keydown.enter="getList"
          class="input rounded"
          placeholder="请输入充电桩编码"
          clearable
        />
      </el-form-item>
      <el-form-item label="充电时间" prop="datePickerValue">
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
    <el-table :data="tableData" v-loading="loading" class="w-full" header-cell-class-name="table-header">
      <el-table-column type="index" label="序号" align="center" width="60" />
      <el-table-column label="用户名" align="center" prop="userName" />
      <el-table-column label="订单号" align="center" prop="code" />
      <el-table-column label="充电度数" align="center" prop="chargeDegree">
        <template #default="{ row }">
          <span>{{ (row as TOrderList).chargeDegree || 0 }}度</span>
        </template>
      </el-table-column>
      <el-table-column label="充电金额" align="center" prop="recordList" :formatter="recordListFormatter" />
      <el-table-column label="充电桩编码" align="center" prop="chargeStationDeviceCode" />
      <el-table-column label="充电开始时间" align="center" prop="startAt">
        <template #default="{ row }">
          <span>{{ dateTimeFormat((row as TOrderList).startAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template #default="scope">
          <el-button type="primary" link @click="onHandleDetail(scope.row.id)"> 查看 </el-button>
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
      @size-change="val => (paginationParams.pageSize = val)"
      @current-change="val => (paginationParams.currentPage = val)"
      @change="getList"
    />
    <el-dialog title="订单详情" v-model="isShowDialog" width="450px" append-to-body>
      <div class="mb-2 rounded bg-[#f7f7f7] px-2 pb-1 pt-2">
        <div class="flex items-center pl-2 text-base font-bold before:mr-2 before:h-[20px] before:w-[4px] before:bg-[#00BCBC]">
          充电桩信息
        </div>
        <div class="px-4">
          <div class="flex items-center">
            <span class="text-[#7D7D7D]">充电桩名：</span>
            <span class="font-medium text-black">{{ formData?.chargeStationName }}</span>
          </div>
          <div class="my-1 flex items-center">
            <span class="text-[#7D7D7D]">充电桩编码：</span>
            <span class="font-medium text-black">{{ formData?.chargeStationDeviceCode }}</span>
          </div>
          <div class="my-1 flex items-center">
            <span class="text-[#7D7D7D]">所属位置：</span>
            <span class="font-medium text-black">{{ formData?.chargeStationaddress }}</span>
          </div>
        </div>
      </div>
      <div class="mb-2 rounded bg-[#f7f7f7] px-2 pb-1 pt-2">
        <div class="flex items-center pl-2 text-base font-bold before:mr-2 before:h-[20px] before:w-[4px] before:bg-[#00BCBC]">
          订单信息
        </div>
        <div class="px-4 py-1">
          <div class="my-1 flex items-center">
            <span class="text-[#7D7D7D]">订单号：</span>
            <span class="font-medium text-black">{{ formData?.code }}</span>
          </div>
          <div class="my-1 flex items-center">
            <span class="text-[#7D7D7D]">充电用户：</span>
            <span class="font-medium text-black">{{ formData?.userName }}</span>
          </div>
        </div>
      </div>
      <div class="mb-2 rounded bg-[#f7f7f7] px-2 pb-1 pt-2">
        <div class="flex items-center pl-2 text-base font-bold before:mr-2 before:h-[20px] before:w-[4px] before:bg-[#00BCBC]">
          充电信息
        </div>
        <div class="px-4 py-1">
          <div class="mt-1 flex items-center">
            <div class="flex flex-col">
              <div>{{ dateTimeFormat(formData?.startAt, "MM月DD日") }}</div>
              <div class="text-base font-bold">{{ dateTimeFormat(formData?.startAt, "HH:mm:ss") }}</div>
            </div>
            <div class="mx-4 h-0.5 w-full bg-[#ECECEC]"></div>
            <div v-if="formData?.endAt">
              <div>{{ dateTimeFormat(formData?.endAt, "MM月DD日") }}</div>
              <div class="text-base font-bold">{{ dateTimeFormat(formData?.endAt, "HH:mm:ss") }}</div>
            </div>
            <div class="whitespace-nowrap text-base font-bold" v-else>充电中</div>
          </div>
          <div class="my-1 h-0.5 w-full bg-[#ECECEC80]"></div>
          <div class="item-center flex justify-between">
            <div>充电时长</div>
            <div class="text-black">{{ dateTimeDifference(formData?.startAt, formData?.endAt) }}</div>
          </div>
          <div class="item-center flex justify-between">
            <div>充电度数</div>
            <div class="text-black">{{ formData?.chargeDegree }}度</div>
          </div>
        </div>
      </div>
      <div class="mb-2 rounded bg-[#f7f7f7] px-2 pb-1 pt-2">
        <div class="flex items-center pl-2 text-base font-bold before:mr-2 before:h-[20px] before:w-[4px] before:bg-[#00BCBC]">
          充电费用
        </div>
        <div class="px-4 py-1">
          <div class="my-1 flex items-center">
            <span class="text-[#7D7D7D]">充电费用：</span>
            <span class="font-medium text-black">{{ formData?.chargeCost }}元</span>
          </div>
          <div class="my-1 h-0.5 w-full bg-[#ECECEC80]"></div>
          <div class="my-1 flex items-center" v-for="record of formData?.recordList" :key="record.id">
            <span class="text-[#7D7D7D]">{{ record.startHour }}:00-{{ record.startHour + 1 }}:00</span>
            <span class="pl-4 font-medium text-black">充电{{ record.chargeDegree }}度</span>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-center">
          <el-button @click="onHandleCloseDialog()">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import { postOrderManageDetailAPI, postOrderManageListAPI } from "@/service/order";
import { dateTimeDifference, dateTimeFormat, excludingFakeObject } from "@/utils";
import type { TOrderList, TOrderManageListParams } from "@/views/order/types";
import type { FormInstance } from "element-plus";

const formHeaderRef = ref<FormInstance>();
const total = ref(0);
const loading = ref(true);
const isShowDialog = ref(false);
const datePickerValue = ref([]);
const paginationParams = reactive({
  currentPage: 1,
  pageSize: 10
});
const queryParams = reactive<Partial<TOrderManageListParams>>({
  code: "",
  chargeStationDeviceCode: "",
  startAtGte: undefined,
  startAtLte: undefined
});
const tableData = ref<TOrderList[]>([]);
const formData = ref<TOrderList>();
const resetHeaderForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  datePickerValue.value = [];
  queryParams.startAtGte = undefined;
  queryParams.startAtLte = undefined;
  formEl.resetFields();
  getList();
};
const recordListFormatter = row => {
  if (!row.recordList) return "-";
  return row.recordList.reduce((sum, record) => sum + record.chargeCost, 0);
};
const getList = () => {
  loading.value = true;
  postOrderManageListAPI({ ...paginationParams, ...excludingFakeObject(queryParams) }).then(res => {
    const data = res.data;
    tableData.value = data.list;
    total.value = data.total;
    loading.value = false;
  });
};
const onHandleDetail = (id: string) => {
  postOrderManageDetailAPI(id).then(res => {
    formData.value = res.data;
    isShowDialog.value = true;
  });
};
const onHandleCloseDialog = () => {
  isShowDialog.value = false;
  formData.value = undefined;
};
const onHandleDatePicker = date => {
  if (date) {
    queryParams.startAtGte = dayjs(date[0]).valueOf();
    queryParams.startAtLte = dayjs(date[1]).valueOf();
  } else {
    queryParams.startAtGte = undefined;
    queryParams.startAtLte = undefined;
  }
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
:deep(.el-form-item__label){
  font-weight: 600;
}
:deep(.el-date-editor) {
  background-color: rgba(247, 248, 250, 1);
  color: rgba(136, 136, 136, 1);
  width: 220px;
  height: 30px;
  box-shadow: none;
}

:deep(.table-header) {
  .cell {
    font-weight: bolder !important;
    white-space: nowrap !important;
  }
}
</style>
