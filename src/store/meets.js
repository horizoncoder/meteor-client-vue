

import { defineStore } from 'pinia'
import axiosInstance from "@/api/api";
export const useMeetsStore = defineStore("meets", {
    state: () => ({
    }),
    getters: {},
    actions: {
        async getAllMeets(page,limit, organizationId) {
            try {
                return await axiosInstance.get(`/meet?page=${page}&limit=${limit}&organizationId=${organizationId}`)
            }
            catch (error) {
                console.log(error)
            }
        },
        async createMeet(data) {
            try {
                return await axiosInstance.post(`/meet/create`, data)
            }
            catch (error) {
                console.log(error)
            }
        },
    },


})
