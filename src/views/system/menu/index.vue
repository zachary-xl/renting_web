<template>
  <div class="app-container">
    <CustomQuery />
    <!--    <CustomTable />-->
    <!--    <CustomQuery v-model:search-params="tableParams" :items="formConfig" />-->
    <Table
      ref="tableRef"
      :columnConfig="contentTableConfig"
      :handel-delete="handelDelete"
      :handle-edit="handleEdit"
    ></Table>
    <Pagination
      v-model:limit="limit"
      v-model:page="page"
      :total="100"
      @pagination="pagination"
    />
    <Dialog v-model:visible="visible" :config="menuConfig" @submitForm="submitForm" />
  </div>
</template>

<script lang="ts" name="Menu" setup>
import { ref } from "vue";
import CustomQuery from "./CustomQuery.vue";
// import CustomTable from "./CustomTable.vue";
import { Dialog, Table, Pagination } from "@/components";
import menuConfig from "./menuConfig";
import contentTableConfig from "./content.config";
import formConfig from "./form.config";

const visible = ref(false);
const tableParams = ref({});
const submitForm = (form) => {
  console.log(form);
};
const handelDelete = (form) => {
  console.log(form);
};
const handleEdit = (form) => {
  console.log(form);
};

const page = ref();
const limit = ref();
watchEffect(() => {
  console.log("page", page);
  console.log("limit", limit);
});

</script>

