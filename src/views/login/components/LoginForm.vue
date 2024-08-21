<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="请输入账号">
        <template #prefix>
          <el-icon class="el-input__icon">
            <User />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password autocomplete="new-password">
        <template #prefix>
          <el-icon class="el-input__icon">
            <Lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input
        v-model="loginForm.code"
        size="large"
        auto-complete="off"
        placeholder="验证码"
        style="width: 63%"
        @keyup.enter="login(loginFormRef)"
      >
        <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
      </el-input>
      <div class="login-code">
        <img @click="getCode" class="login-code-img" alt="验证码" src="data:image/gif;base64,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" />
      </div>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)"> 重置 </el-button>
    <el-button :icon="UserFilled" round size="large" type="primary" :loading="loading" @click="login(loginFormRef)"> 登录 </el-button>
  </div>
</template>

<script setup lang="ts">
import { ElForm } from "element-plus";
import { CircleClose, UserFilled, User, Lock } from "@element-plus/icons-vue";
import type { IReqLoginForm } from "@/views/login/types";

type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const loading = ref(false);
const loginForm = reactive<IReqLoginForm>({
  username: "",
  password: "",
  code: ""
});
const login = (formEl: FormInstance | undefined) => {
  console.log(formEl);
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const getCode = ()=> {

  // getCodeImg().then(res => {
  //   captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled;
  //   if (captchaEnabled.value) {
  //     codeUrl.value = "data:image/gif;base64," + res.img;
  //     loginForm.value.uuid = res.uuid;
  //   }
  // });
}
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
