<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login_left.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo.png" alt="" />
          <!--          <h3 class="logo-text">科力安</h3>-->
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts" name="login" setup>
import LoginForm from "./components/LoginForm.vue";
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
