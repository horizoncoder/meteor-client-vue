<template>
  <v-sheet class="login-form-container">
    <v-form @submit.prevent="submitForm" class="login-form">
      <v-text-field
          v-model="email"
          label="Email"
          :rules="emailRules"
      ></v-text-field>

      <v-text-field
          v-model="password"
          label="Password"
      ></v-text-field>

      <v-btn class="text-none text-subtitle-1 mt-4" color="#5865f2" size="large" variant="flat" type="submit">Login</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from "@/store/user";
import router from "@/router";

export default {
  name: "LoginComponent",
  setup() {
    // declare variables using ref
    const email = ref('');
    const emailRules = ref([
      value => {
        if (value?.length > 3) return true;
        return 'Email must be at least 3 characters.';
      },
    ]);
    const password = ref('');

    // use the user store
    const store = useUserStore();

    // define the submitForm method
    const submitForm = () => {
      // Simulate login success
      store.login({
        email: email.value,
        password: password.value,
      });

      router.push('/account');
    };

    // return values and methods for the template
    return {
      email,
      emailRules,
      password,
      submitForm,
    };
  },
};
</script>

<style scoped>
.login-form-container {
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 300px;
}
</style>
