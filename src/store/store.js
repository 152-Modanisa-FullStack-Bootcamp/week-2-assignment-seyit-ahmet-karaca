import Vuex from 'vuex';
import Vue from 'vue';
import VideosAPI from "../services/VideosAPI";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        videos: [],
        favoriteVideoIds: []
    },
    getters: {
        favoriteVideos(state) {
            return state.videos.filter(video => state.favoriteVideoIds.includes(video.id))
        },
        getVideos(state) {
            return state.videos;
        }
    },
    mutations: {
        setVideos(state, payload) {
            state.videos.push(...payload);
        },
        manageFavoriteVideoIds(state, payload) {
            const isVideoIn = state.favoriteVideoIds.some(id => id === payload);
            if (isVideoIn) {
                state.favoriteVideoIds.splice(state.favoriteVideoIds.indexOf(payload), 1);
            } else {
                state.favoriteVideoIds.push(payload);
            }
        }
    },
    actions: {
        async initVideos({commit}) {
            const videos = await VideosAPI.getVideoList();
            commit('setVideos', videos);
        }
    }
});

export default store;