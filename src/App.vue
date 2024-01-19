<template>
  <v-app>
    <v-navigation-drawer color="red" v-model="sidebar" app>
      <v-list>
        <v-list-tile
            v-for="item in menuItems"
            :key="item.title"
            :to="item.path"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="bg-indigo-lighten-1" app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar"></v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <strong>{{ appTitle }}</strong>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
            flat=""
            v-for="item in menuItems"
            :key="item.title"
            :to="item.path"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content style="margin-bottom: 60px">
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useUserStore } from "@/store/user";

export default {
  name: "App",
  setup() {
    const appTitle = "Meteor Meet";
    const sidebar = ref(false);
    const menuItems = [
      { title: "Home", path: "/home", icon: "home" },
      { title: "Info", path: "/info", icon: "face" },
      { title: "Organizations", path: "/organizations", icon: "face" },
      { title: "Sign Up", path: "/signup", icon: "face" },
      { title: "Sign In", path: "/login", icon: "lock_open" }
    ];

    const store = useUserStore();

    onMounted(async () => {
      try {
        await store.fetchUserData();
      } catch (error) {
        console.error(error);
      }
    });

    return {
      appTitle,
      sidebar,
      menuItems,
    };
  },
};
</script>

<style>
</style>
