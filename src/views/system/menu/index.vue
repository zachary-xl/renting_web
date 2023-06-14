<template>
  <div class="app-container">
    <Query />
    <Table ref="tableRef" :columnConfig="tableConfig" :handel-delete="handelDelete" :handle-edit="handleEdit"
           :table-attr="{border:false,'row-key':'id'}" :table-data="tableData"></Table>
    <Pagination v-model:limit="limit" v-model:page="page" :total="100" @pagination="pagination" />
    <Dialog v-model:visible="visible" :config="dialogConfig" @submitForm="submitForm" />
  </div>
</template>

<script lang="ts" name="Menu" setup>
import { ref } from "vue";
import Query from "./Query.vue";
import { Dialog, Table, Pagination } from "@/components";
import { tableConfig, dialogConfig } from "./config";

const tableData: any[] = [
  {
    id: 1,
    date: "2016-05-02",
    name: "wangxiaohu",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    id: 2,
    date: "2016-05-04",
    name: "wangxiaohu",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    id: 3,
    date: "2016-05-01",
    name: "wangxiaohu",
    address: "No. 189, Grove St, Los Angeles",
    children: [
      {
        id: 31,
        date: "2016-05-01",
        name: "wangxiaohu",
        address: "No. 189, Grove St, Los Angeles"
      },
      {
        id: 32,
        date: "2016-05-01",
        name: "wangxiaohu",
        address: "No. 189, Grove St, Los Angeles"
      }
    ]
  },
  {
    id: 4,
    date: "2016-05-03",
    name: "wangxiaohu",
    address: "No. 189, Grove St, Los Angeles"
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
const pagination = (e) => {
  console.log(e);
};
const page = ref(1);
const limit = ref(10);
watchEffect(() => {
  console.log("page", page);
  console.log("limit", limit);
});
</script>
