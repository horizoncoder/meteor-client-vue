<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="pagedUsers"
        item-key="name"
        :items-per-page="limit"
    ></v-data-table>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useUserStore } from "@/store/user";
export default {
  name:"UserComponent",
  setup() {
    const store =  useUserStore()

    const headers = [
      { title: 'Name', value: 'name' },
      { title: 'Surname', value: 'surname' },
      { title: 'Email', value: 'email' },

    ];

    const page = ref(1);
    const limit = 10;

    const localUsers = ref([]);

    const totalUsers = computed(() => localUsers.value.length);
    const totalPages = computed(() => Math.ceil(totalUsers.value / limit));
    const pagedUsers = computed(() => {
      const startIndex = (page.value - 1) * limit;
      const endIndex = startIndex + limit;
      return localUsers.value.slice(startIndex, endIndex);
    });

    const getAllUsers = async () => {
      const response = await store.getAllUsers(page.value, limit);
      localUsers.value = response.data.data;
    };

    watch(page, getAllUsers);

    onMounted(getAllUsers);

    return {
      headers,
      page,
      limit,
      totalUsers,
      totalPages,
      pagedUsers,
    };
  },
};
</script>
