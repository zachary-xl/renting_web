<template>
  <div class="app-container">
    <Query />
    <Table
      ref="tableRef"
      :columnConfig="tableConfig"
      :handel-delete="handelDelete"
      :handle-edit="handleEdit"
      :table-attr="{ border: false, 'row-key': 'id' }"
      :table-data="tableData"
    ></Table>
    <Pagination v-model:limit="limit" v-model:page="page" :total="100" @pagination="pagination" />
    <Dialog v-model:visible="visible" :config="dialogConfig" @submitForm="submitForm" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Query from "./Query.vue";
import { Dialog, Table, Pagination } from "@/components";
import { tableConfig, dialogConfig } from "./config";
const tableData: any[] = [
  {
    staffName: "123",
    roleVOList: ["123", "1242"],
    phone: "123",
    email: "@qq",
    createTime: "2021",
    state: 0,
    id: 1
  },
  {
    staffName: "123",
    roleVOList: ["123", "1242"],
    phone: "123",
    email: "@qq",
    createTime: "2021",
    state: 1,
    id: 2
  },
  {
    staffName: "123",
    roleVOList: ["123", "1242"],
    phone: "123",
    email: "@qq",
    createTime: "2021",
    state: 2,
    id: 3
  },
  {
    staffName: "123",
    roleVOList: ["123", "1242"],
    phone: "123",
    email: "@qq",
    createTime: "2021",
    state: 3,
    id: 4
  }
];
const visible = ref(false);
const submitForm = form => {
  console.log(form);
};
const handelDelete = form => {
  console.log(form);
};
const handleEdit = form => {
  console.log(form);
};
const pagination = e => {
  console.log(e);
};
const page = ref(1);
const limit = ref(10);
watchEffect(() => {
  console.log("page", page);
  console.log("limit", limit);
});
</script>

<style scoped></style>
