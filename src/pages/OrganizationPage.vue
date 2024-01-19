<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="user">User</v-tab>
      <v-tab value="owner">Owner</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="owner">
          <OrganizationsComponent :role="owner" />
        </v-window-item>

        <v-window-item value="user">
          <OrganizationsComponent :role="user" />
        </v-window-item>
      </v-window>

      <div class="text-center pt-2">
        <v-btn @click="openJoinModal">Join to organization</v-btn>
      </div>

      <!-- Modal for Joining Organization -->
      <v-dialog v-model="joinModal" max-width="400">
        <v-card>
          <v-card-title class="headline">Join Organization</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="joinOrganization">
              <v-text-field v-model="organizationCode" label="Organization Code" required></v-text-field>
              <v-row class="mb-3" justify="center">
                <v-btn class="mr-3" type="submit" color="primary">Join</v-btn>
                <v-btn @click="closeJoinModal">Cancel</v-btn>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import OrganizationsComponent from "@/components/OrganizationsComponent.vue";

const tab = ref("users");
const user = "user";
const owner = "owner";

const joinModal = ref(false);
const organizationCode = ref("");

const openJoinModal = () => {
  joinModal.value = true;
};

const closeJoinModal = () => {
  joinModal.value = false;
};

const joinOrganization = () => {
  console.log("Joining organization with code:", organizationCode.value);

  closeJoinModal();
};
</script>

<style scoped>
</style>
