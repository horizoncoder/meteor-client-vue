<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent=""
        width="1024"
    >
      <template v-slot:activator="{ props }">
        <v-btn
            color="primary"
            v-bind="props"
            style="margin-bottom: 20px"
        >
          Create Organization
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Organization Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="formData.name"
                    label="Name*"
                    required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="formData.adminCode"
                    label="Admin Code*"
                    required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="formData.userCode"
                    label="User Code*"
                    required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
              color="blue-darken-1"
              variant="text"
              @click="saveOrganization"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { defineProps } from 'vue';
import { ref  } from 'vue'
const props = defineProps(['createOrganization'])
const dialog = ref(false)
const formData = ref({
  name: '',
  adminCode: '',
  userCode: '',
})

const saveOrganization = () => {
  props.createOrganization(formData)
  dialog.value = false
}
</script>
