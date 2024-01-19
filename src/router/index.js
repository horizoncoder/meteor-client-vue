import { createRouter, createWebHistory,  } from "vue-router";
import HomeComponent from "@/pages/HomeComponent.vue";
import UserComponent from "@/components/UserComponent.vue";

import AccountPage from "@/pages/AccountPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import InfoPage from "@/pages/InfoPage.vue";
import OrganizationPage from '@/pages/OrganizationPage.vue'
import meetPage from "@/pages/MeetPage.vue";
import roomComponent from "@/components/RoomComponent.vue";
const routes  = [
    {
        path: "/",
        name: "Home",
        component: HomeComponent
    },
    {
        path: "/login",
        name: "Login",
        component: LoginPage
    },
    {
        path: "/info",
        name: "Info",
        component: InfoPage
    },
    {
        path: "/user",
        name: "User",
        component: UserComponent
    },
    {
        path: "/account",
        name: "Account",
        component: AccountPage
    },
    {
        path: "/organizations",
        name: "Organizations",
        component: OrganizationPage
    },
    {
        path: "/meet/:id",
        name: "Meets",
        component: meetPage
    },
    {
        path: "/room/:id",
        name: "Room",
        component: roomComponent
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
