<template>
  <div>
    <h1></h1>
    <v-data-table
        :headers="headers"
        :items="pagedOrganizations"
        item-key="_id"
        :items-per-page="limit"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <template v-if="item.role==='owner'">
          <v-btn size="small" class="me-2" @click="editOrganization(item)">
            edit
          </v-btn>
          <v-btn size="small" @click="openDeleteDialog(item)">
            delete
          </v-btn>
        </template>
        <v-btn size="small" class="ml-2" @click="goToMeet(item.id)">
          join
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="editDialog" persistent="" width="600">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Organization</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedOrganization.name" label="Name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedOrganization.adminCode" label="Admin Code*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedOrganization.userCode" label="User Code*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeEditDialog">Close</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="saveEditedOrganization">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" persistent="" width="600">
      <v-card>
        <v-card-title>
          <span class="text-h5">Delete Organization ?</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDeleteDialog">Close</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="deleteOrganization">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="!props.role" class="text-center pt-2">
      <create-meet :create-meet="createMeet"></create-meet>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import {useRoute} from "vue-router";
import {useMeetsStore} from "@/store/meets";
import CreateMeet from "@/components/modals/createMeet.vue";
import router from "@/router";

export default {
  name: 'OrganizationsComponent',
  components: {CreateMeet},
  props: {
    role: String,
  },
  setup(props) {
    const route = useRoute();
    const store = useMeetsStore();

    const headers= [
      { title: 'Name', value: 'name' },
      { title: 'Owner name', value: 'ownerName' },
      { title: 'Created At', value: 'createdAtFormatted' },
      { title: 'Actions', value: 'actions', sortable: false },
    ];

    const page = ref(1);
    const limit = 10;

    const meets = ref([]);
    const editDialog = ref(false);
    const deleteDialog = ref(false);
    const editedOrganization = ref({
      _id: '',
      name: '',
      adminCode: '',
      userCode: '',
    });
    const organizationId= ref(null)
    const totalOrganizations = computed(() => meets.value.length);
    const totalPages = computed(() => Math.ceil(totalOrganizations.value / limit));
    const pagedOrganizations = computed(() => {
      const startIndex = (page.value - 1) * limit;
      const endIndex = startIndex + limit;
      return meets.value.slice(startIndex, endIndex);
    });
    const openDeleteDialog=(data)=>{
      organizationId.value = data._id
      deleteDialog.value= true
    }
    const closeDeleteDialog = () => {
      deleteDialog.value = false;
    };
    const getAllMeets = async () => {
      const response =await store.getAllMeets(page.value, limit, route.params.id)
      meets.value = response.data.data.map((org) => ({
        ...org,
        createdAtFormatted: new Date(org.createdAt).toLocaleString(),
      }));
    };
    watch(page, getAllMeets);

    onMounted(getAllMeets);

    const createMeet = async (data) => {
      await store.createMeet(data.value).then(getAllMeets).catch((e) => {
        console.log(e);
      });
    };

    const editOrganization = async (organization) => {
      editedOrganization.value = {...organization};
      editDialog.value = true;


    };
    const goToMeet = (id)=>{
     router.push(`/room/${id}`)
    }

    const deleteOrganization = async ()=>{
      // await store.deleteOrganization(organizationId.value).then(getAllMeets).catch((e) => {
      //   console.log(e);
      // });
      // deleteDialog.value =false
    }
    const closeEditDialog = () => {
      editDialog.value = false;
    };

    const saveEditedOrganization = async () => {
      // await store.updateOrganization(editedOrganization.value).then(getAllMeets).catch((e) => {
      //   console.log(e);
      // });
      // editDialog.value = false;
      // await getAllMeets()
    };


    return {
      headers,
      page,
      limit,
      totalOrganizations,
      totalPages,
      pagedOrganizations,
      createMeet,
      editOrganization,
      closeEditDialog,
      goToMeet,
      editedOrganization,
      saveEditedOrganization,
      deleteOrganization,
      editDialog,
      deleteDialog,
      openDeleteDialog,
      closeDeleteDialog,
      props
    };
  },
};
</script>
