<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="account-card" v-if="store.isLoggedIn">
          <v-card-title>Account Information</v-card-title>
          <v-card-subtitle>Email: {{ store.user.email }}</v-card-subtitle>
          <v-card-subtitle>Name: {{ store.user.name }}</v-card-subtitle>
          <v-card-subtitle>Surname: {{ store.user.surname }}</v-card-subtitle>
          <v-card-subtitle>Role: {{ store.user.role }}</v-card-subtitle>
        </v-card>
        <v-card v-else>
          <v-card-title>Login Required</v-card-title>
          <v-card-text>Please log in to view account information.</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useUserStore } from "@/store/user";

export default {
  name: "AccountPage",
  setup() {
    const store = useUserStore();

    return {
     store
    };
  },
};
</script>

<style scoped>
v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

v-card {
  width: 300px;
  text-align: center;
  padding: 16px;
  margin: 16px;
}

v-card-title {
  font-size: 1.5em;
  margin-bottom: 16px;
}

v-card-subtitle {
  font-size: 1.2em;
  margin-bottom: 8px;
}
</style>
