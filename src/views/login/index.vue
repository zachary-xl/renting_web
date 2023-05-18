<template>
  <div class="w-full h-full flex rounded-xl relative">
    <el-image :src="image" alt="安居" class="flex-1" fit="fill" lazy />
    <div class="w-[450px] flex-col bg-white relative px-16">
      <div class="w-full h-full flex flex-col justify-center">
        <h1 class="text-2xl font-bold text-center text-slate-900 py-4 text-[#00a8ff]">登录</h1>
        <div class="form__box flex my-5 relative">
          <span class="form__box__label h-full">账号</span>
          <input v-model="formData.username" :style="{'border-color': isUserName ? '#f56c6c' : '#eee'}"
                 autocomplete="off" autofocus
                 class="form__box__input h-full flex-1" placeholder="请输入账号" type="text">
          <span v-show="isUserName" :style="{width:isUserName ? 'auto' : '0'}" class="verify">请输入用户名/手机号</span>
        </div>
        <div class="form__box flex my-5 relative">
          <span class="form__box__label h-full">密码</span>
          <input v-model="formData.password" :style="{'border-color': isPassword ? '#f56c6c' : '#eee'}"
                 :type="isEye ? 'text' : 'password'"
                 autocomplete="off" class="form__box__input h-full flex-1"
                 placeholder="请输入密码">
          <span v-show="isPassword" class="verify">请输入密码</span>
          <el-icon class="icon h-full" @click="isEye = !isEye">
            <View v-show="isEye" />
            <Hide v-show="!isEye" />
          </el-icon>
        </div>
        <el-button class="w-full mt-5" color="#c6cdd3" plain size="large" @click="submitForm">
          登录
        </el-button>
        <div class="mt-4">
          <el-checkbox v-model="formData.remember" label="记住我" />
        </div>
      </div>
      <div class="copyright absolute w-full text-center bottom-5 left-0 -translate-y-1/2">Copyright (c) 2023 未知科技
      </div>
    </div>
  </div>
</template>

<script lang="ts" name="login" setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { View, Hide } from "@element-plus/icons-vue";
import { hasStorage, setStorage, getStorage, removeStorage } from "@/utils";
import { postLoginAPI } from "@/service/login";
import type { IFormData } from "./types";

onMounted(() => {
  hasStorage("remember") && (formData.remember = getStorage("remember")) && (formData.username = getStorage("username"));
});
const router = useRouter();
const isEye = ref(false);
const isUserName = ref(false);
const isPassword = ref(false);
const formData: IFormData = reactive({
  username: "",
  password: "",
  remember: false
});
const image = computed(() => new URL("@/assets/images/background/login.png", import.meta.url).href);
const submitForm = async () => {
  if (verifyForm()) {
    if (formData.remember) {
      setStorage("username", formData.username);
      setStorage("password", formData.password);
      setStorage("remember", formData.remember);
    } else {
      removeStorage("username");
      removeStorage("password");
      removeStorage("remember");
    }
    const form = new FormData();
    form.append("username",formData.username);
    form.append("password",formData.password);
    postLoginAPI(form).then(res => {
      router.push("/");
    });
  }
};
const verifyForm = (): boolean => {
  if (!formData.username) {
    isUserName.value = true;
    return false;
  }
  isUserName.value = false;
  if (!formData.password) {
    isPassword.value = true;
    return false;
  }
  isPassword.value = false;
  return true;
};
</script>

<style lang="scss" scoped>
.form__box {
  height: 30px;
  font-size: 16px;

  &__label {
    display: inline-block;
    margin-right: 10px;
  }

  &__input {
    background-color: transparent;
    padding: 0 5px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    transition: all .3s;
  }

  .verify {
    position: absolute;
    font-size: 12px;
    color: #f56c6c;
    bottom: -70%;
    padding-left: 45px;
    transition: all .3s;
  }

  .icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style>
