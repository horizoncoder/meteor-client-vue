<!-- TableContainer.vue -->

<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="users">Users</v-tab>
      <v-tab value="organizations">Organizations</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="users">
         <UserComponent/>
        </v-window-item>

        <v-window-item value="organizations">
          <OrganizationsComponent/>
        </v-window-item>

      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import UserComponent from "@/components/UserComponent.vue";
import OrganizationsComponent from "@/components/OrganizationsComponent.vue";
const tab = ref("users");
</script>

<style scoped>
</style>

