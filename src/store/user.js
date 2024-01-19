//stores/users.js

import { defineStore } from 'pinia'
import axios from "axios"
import axiosInstance from "@/api/api";
export const useUserStore = defineStore("user", {
    state: () => ({
        users: [],
        user:{},
        isLoggedIn:false
    }),
    getters: {
        getUsers(state){
            return state.users
        }
    },
    actions: {
        async getAllUsers(page,limit) {
            try {
                return await axiosInstance.get(`/users/all?page=${page}&limit=${limit}`)
            }
            catch (error) {
                console.log(error)
            }
        },
        async fetchUsers() {
            try {
                const data = await axios.get('https://jsonplaceholder.typicode.com/users')
                this.users = data.data
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async fetchUserData() {
            try {
                const response = await axiosInstance.get('/users/me');
                if (response.status === 200) {
                    this.user = response.data;
                    this.isLoggedIn = true
                    console.log(this.isLoggedIn)
                } else {

                    this.logout();
                }
            } catch (error) {
                console.error(error);
                // this.logout();
            }
        },
        logout() {
            this.isLoggedIn = false;
            this.user = {};
            this.$router.push('/login');
        },
        async login(data) {
            try {
              const result =  await axiosInstance.post(`users/sign-in`, data)
                if(result){
                    localStorage.setItem('accessToken', result.data.token)
                    this.isLoggedIn = true

                }

            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
        checkLoggedInStatus(){
            if ( localStorage.getItem('user')){
                this.isLoggedIn = true
            }
        }
    },


})
