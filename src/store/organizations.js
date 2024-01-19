

import { defineStore } from 'pinia'
import axiosInstance from "@/api/api";
export const useOrganizationStore = defineStore("organizations", {
    state: () => ({
    }),
    getters: {},
    actions: {
        async getAllOrganizations(page,limit) {
            try {
                return await axiosInstance.get(`/organizations/all?page=${page}&limit=${limit}`)
            }
            catch (error) {
                console.log(error)
            }
        },
        async getAllOrganizationsByRole(page,limit, role) {
            try {
                return await axiosInstance.get(`/organizations/byRole?page=${page}&limit=${limit}&role=${role}`)
            }
            catch (error) {
                console.log(error)
            }
        },

        async createOrganization(data) {
            try {
                return await axiosInstance.post(`/organizations/create`, data)
            }
            catch (error) {
                console.log(error)
            }
        },
        async deleteOrganization(id) {
            try {
                return await axiosInstance.delete(`/organizations/delete/${id}`, )
            }
            catch (error) {
                console.log(error)
            }
        },
        async updateOrganization(data) {
            const {   _id, name, adminCode, userCode} = data
            try {
                return await axiosInstance.put(`/organizations/update?organizationId=${_id}`, {name, adminCode, userCode})
            }
            catch (error) {
                console.log(error)
            }
        }
    },


})
