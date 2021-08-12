import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        api: 'https://aaiss.ce.aut.ac.ir/api/2021',
        mediaRoot:'https://aaiss.ce.aut.ac.ir',
        // api: 'http://localhost:8000/api',
        // media: 'http://localhost:8000',



        presenters: [],
        teachers: [],
        presentations: [],
        workshops: [],
        currentWorkshops: [],
        scientificCommittee: [],
        staffList: [],
        email: localStorage.getItem('email') || "",
        FOI: [],
        currentPresenter: {},
        currentTeacher: {},
        currentWorkshop: {},
        currentPresentation: {},
        register: 'false',
        scheduled: 'false'
    },
    mutations: {
        updatePresenters(state, newPresenter) {
            state.presenters = newPresenter;
        },
        updateStaffList(state, newStaffLIst) {
            state.staffList = newStaffLIst;
        },
        updateTeachers(state, newTeacher) {
            state.teachers = newTeacher;
        },
        updateScientificCommittee(state, newCommittee) {
            state.scientificCommittee = newCommittee;
        },
        updateCurrentTeacher(state, newTeacher) {
            state.currentTeacher = newTeacher;
        },
        updateCurrentPresenter(state, newPresenter) {
            state.currentPresenter = newPresenter;
        },
        updateFOI(state, newFOI) {
            state.FOI = newFOI;
        },
        updateWorkshops(state, newWorkshops) {
            state.workshops = newWorkshops
        },
        updatePresentations(state, newPresentation) {
            state.presentations = newPresentation
        },
        updateCurrentWorkshop(state, newWorkshop) {
            state.currentWorkshop = newWorkshop
        },
        updateCurrentWorkshops(state, newWorkshop) {
            state.currentWorkshops.push(newWorkshop)
        },
        clearCurrentWorkshops(state){
            state.currentWorkshops = [];
        },
        updateRegisterStatus(state, status) {
            state.register = status.desc

        },
        updateScheduledStatus(state, status) {
            state.scheduled = status.desc

        },
        updateCurrentPresentation(state, presentation){
            state.currentPresentation = presentation
        },
        updateEmail(state){
            state.email = localStorage.getItem('email') || "";
        }

    },
    actions: {
        getRegisterStatus: function ({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    url: this.getters.getApi + '/misc/register/',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                }).then((response) => {
                    commit('updateRegisterStatus', response.data);
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                })
            })

        },
        getScientificCommittee: function ({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    url: this.getters.getApi + '/committee/',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                }).then((response) => {
                    commit('updateScientificCommittee', response.data);
                    resolve(response.data);
                    console.log(response.data);
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        getScheduledStatus: function ({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    url: this.getters.getApi + '/misc/scheduled/',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                }).then((response) => {
                    commit('updateScheduledStatus', response.data);
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                })
            })

        },
        getPresenters: function ({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    url: this.getters.getApi + '/presenter/',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                }).then((response) => {
                    commit('updatePresenters', response.data);
                    console.log(response.data)
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                })
            })

        },
        getPresenterById: function ({commit}, id) {
            window.console.log('getting speaker with id:', id);
            return new Promise((resolve, reject) => {
                axios({
                    url: this.getters.getApi + '/presenter/' + id + '/',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                }).then((response) => {
                    commit('updateCurrentPresenter', response.data);
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        getTeachers: function ({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    url: this.getters.getApi + '/teacher/',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                }).then((response) => {
                    commit('updateTeachers', response.data);
                    console.log(response.data)

                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                })
            })

        },
        getTeacherById: function ({commit}, id) {
            window.console.log('getting speaker with id:', id);
            return new Promise((resolve, reject) => {
                axios({
                    url: this.getters.getApi + '/teacher/' + id + '/',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                }).then((response) => {
                    commit('updateCurrentTeacher', response.data);
                    commit('clearCurrentWorkshops');
                    console.log(this.state.currentWorkshops);
                    resolve(response.data);
                    console.log(response.data);
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        getFieldsOfInterest: function ({commit}, id) {
            return new Promise((resolve, reject) => {
                axios({
                    url: "https://aaiss.ce.aut.ac.ir/api" + '/foi/',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                }).then((response) => {
                    commit('updateFOI', response.data);
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        getWorkshops: function ({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    url: this.getters.getApi + '/workshop/',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                }).then((response) => {
                    commit('updateWorkshops', response.data);
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        getWorkshopById: function ({commit}, id) {
            return new Promise((resolve, reject) => {
                axios({
                    url: this.getters.getApi + '/workshop/' + id+ '/',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                }).then((response) => {
                    commit('updateCurrentWorkshops', response.data);
                    commit('updateCurrentWorkshop', response.data);
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        getPresentations: function ({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    url: this.getters.getApi + '/presentation/',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                }).then((response) => {
                    commit('updatePresentations', response.data);
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        getStaff: function ({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    url: this.getters.getApi + '/staff/',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                }).then((response) => {
                    commit('updateStaffList', response.data);
                    resolve(response.data);
                    console.log(response.data);
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        getPresentationById: function ({commit}, id) {
            return new Promise((resolve, reject) => {
                axios({
                    url: this.getters.getApi + '/presentation/' + id+ '/',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                }).then((response) => {
                    commit('updateCurrentPresentation', response.data);
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                })
            })
        },
    },


    getters: {
        getApi: state => {
            return state.api;
        },
        getPresenters:
            state => {
                return state.presenters;
            },
        getTeachers:
            state => {
                return state.teachers;
            },
        getFOI:
            state => {
                return state.FOI;
            },
        getWorkshops:
            state => {
                return state.workshops;
            },
        getPresentations:
            state => {
                return state.presentations;
            },
        getCurrentPresenter:
            state => {
                return state.currentPresenter;
            },
        getCurrentTeacher:
            state => {
                return state.currentTeacher;
            },
        getMediaRoot:
            state => {
                return state.mediaRoot;
            },
        getRegistrationStatus:
            state => {
                return state.register;
            },
            getScheduledStatus:
            state => {
                return state.scheduled;
            },
        getCurrentPresentation:
            state => {
                return state.currentPresentation
            },
        getCurrentWorkshop:
            state => {
                return state.currentWorkshop
            },
            getCurrentWorkshops:
            state => {
                return state.currentWorkshops
            },
            getStaffList: state => {
                return state.staffList;
            },
        getEmail:
            state => {
                return state.email
            },
            getScientificCommittee: state => {
                return state.scientificCommittee;
            }

    }
})
