<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="pagedOrganizations"
        item-key="_id"
        :items-per-page="limit"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn size="small" class="me-2" @click="goToOrganization(item._id)">
          view
        </v-btn>
        <template v-if="props.role">
          <v-btn size="small" class="me-2" @click="editOrganization(item)">
            edit
          </v-btn>
          <v-btn size="small" @click="openDeleteDialog(item)">
            delete
          </v-btn>
        </template>


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
      <create-organization :create-organization="createOrganization" />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useOrganizationStore } from '@/store/organizations';
import CreateOrganization from '@/components/modals/createOrganization.vue';
import router from "@/router";
export default {
  name: 'OrganizationsComponent',
  components: { CreateOrganization },
  props: {
    role: String,
  },
  setup(props) {
    console.log(props.role)
    const store = useOrganizationStore();

    const headers = props.role ? [
      { title: 'Name', value: 'name' },
      { title: 'Created At', value: 'createdAtFormatted' },
      { title: 'Actions', value: 'actions', sortable: false },
    ]: [
      { title: 'Name', value: 'name' },
      { title: 'Admin Code', value: 'adminCode' },
      { title: 'User Code', value: 'userCode' },
      { title: 'Created At', value: 'createdAtFormatted' },
      { title: 'Actions', value: 'actions', sortable: false },
    ];

    const page = ref(1);
    const limit = 10;

    const localOrganizations = ref([]);
    const editDialog = ref(false);
    const deleteDialog = ref(false);
    const editedOrganization = ref({
      _id: '',
      name: '',
      adminCode: '',
      userCode: '',
    });
const organizationId= ref(null)
    const totalOrganizations = computed(() => localOrganizations.value.length);
    const totalPages = computed(() => Math.ceil(totalOrganizations.value / limit));
    const pagedOrganizations = computed(() => {
      const startIndex = (page.value - 1) * limit;
      const endIndex = startIndex + limit;
      return localOrganizations.value.slice(startIndex, endIndex);
    });
    const openDeleteDialog=(data)=>{
      organizationId.value = data._id
      deleteDialog.value= true
    }
    const closeDeleteDialog = () => {
      deleteDialog.value = false;
    };
    const getAllOrganizations = async () => {
      const response = props.role ? await store.getAllOrganizationsByRole(page.value, limit, props.role) : await store.getAllOrganizations(page.value, limit);
      localOrganizations.value = response.data.data.map((org) => ({
        ...org,
        createdAtFormatted: new Date(org.createdAt).toLocaleString(),
      }));
    };
    watch(page, getAllOrganizations);

    onMounted(getAllOrganizations);

    const createOrganization = async (data) => {
      await store.createOrganization(data.value).then(getAllOrganizations).catch((e) => {
        console.log(e);
      });
    };

    const editOrganization = async (organization) => {
      editedOrganization.value = {...organization};
      editDialog.value = true;


    };

const deleteOrganization = async ()=>{
  await store.deleteOrganization(organizationId.value).then(getAllOrganizations).catch((e) => {
    console.log(e);
  });
  deleteDialog.value =false
}
const goToOrganization = (id)=>{
  router.push(`/meet/${id}`)
}
    const closeEditDialog = () => {
      editDialog.value = false;
    };

    const saveEditedOrganization = async () => {
      await store.updateOrganization(editedOrganization.value).then(getAllOrganizations).catch((e) => {
        console.log(e);
      });
      editDialog.value = false;
      await getAllOrganizations();
    };


    return {
      headers,
      page,
      limit,
      goToOrganization,
      totalOrganizations,
      totalPages,
      pagedOrganizations,
      createOrganization,
      editOrganization,
      closeEditDialog,
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
