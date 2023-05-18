<template>
  <!--    <div class="w-full h-full center-center">
        <div class="bg-[#fff] py-4 px-10 rounded-lg flex">
          <div class="w-96">&nbsp;</div>
          <div class="flex flex-col justify-center items-center">
            <el-image :src="image" alt="logo" class="w-14 rounded-full" fit="fill" lazy
                      placeholder="Mr. Liu" />
            <h1 class="text-2xl font-bold text-center text-slate-900 py-4 text-[#00a8ff]">Vue TS Vite</h1>
            <el-form ref="formRef" :model="formData" :rules="rules"  label-width="50px"
                     size="large">
              <el-form-item label="账号" prop="username">
                <el-input v-model="formData.username" autocomplete="off" name="username" placeholder="用户名/手机号" prefix-icon="UserFilled"
                          type="text" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="formData.password" autocomplete="off" name="password" placeholder="密码" prefix-icon="Lock"
                          show-password type="password" />
              </el-form-item>
              <el-form-item class="remember" prop="remember">
                <el-checkbox v-model="formData.remember" label="记住密码" />
              </el-form-item>
              <el-form-item>
                <el-button class="w-full bg-[#00a8ff]" size="large" type="primary" @click="submitForm(formRef)">
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>-->
  <div class="w-full h-full flex rounded-xl relative">
    <el-image :src="image" alt="安居" class="flex-1" fit="fill" lazy />
    <div class="w-[450px] flex-col bg-white relative px-16">
      <div class="w-full h-full flex flex-col justify-center">
        <h1 class="text-2xl font-bold text-center text-slate-900 py-4 text-[#00a8ff]">登录</h1>
        <div class="form__box flex my-5 relative">
          <span class="form__box__label h-full">账号</span>
          <input v-model="formData.username" autocomplete="off" autofocus class="form__box__input h-full flex-1"
                 placeholder="请输入账号" type="text" :style="{'border-color': isUserName ? '#eee' : '#f56c6c'}">
          <span class="verify" v-show="isUserName">请输入用户名/手机号</span>
        </div>
        <div class="form__box flex my-5 relative">
          <span class="form__box__label h-full">密码</span>
          <input v-model="formData.password" :type="isEye ? 'text' : 'password'" autocomplete="off"
                 class="form__box__input h-full flex-1" placeholder="请输入密码">
          <span class="verify" v-show="isPassword">请输入密码</span>
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
      <div class="copyright absolute w-full text-center bottom-5">Copyright (c) 2023 未知科技</div>
    </div>
  </div>
</template>

<script lang="ts" name="Login" setup>
import { ref, reactive, computed, onMounted } from "vue";
import { hasStorage, setStorage, getStorage } from "@/utils";
import { View, Hide } from "@element-plus/icons-vue";

const isEye = ref(false);
onMounted(() => {
  hasStorage("remember") && (formData.remember = getStorage("remember")) && (formData.username = getStorage("username"));
  console.log(formData);
});
const isUserName = ref(false)
const isPassword = ref(false)
const formData = reactive({
  username: "",
  password: "",
  remember: false
});

// const image = computed(() => new URL("@/assets/images/background/login.png", import.meta.url).href);
const submitForm = async () => {
  console.log(formData);
  if (formData.remember) {
    setStorage("username", formData.username);
    setStorage("password", formData.password);
    setStorage("remember", formData.remember);
  }
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
    border-width: 2px;
    border-style: solid;
    border-radius: 2px;
  }
  .verify{
    position: absolute;
    font-size: 12px;
    color: #f56c6c;
    bottom: -70%;
    padding-left: 45px;
    display: none;
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
