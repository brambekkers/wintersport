export default {
    state: {
        location: null
    },
    getters: {
        location(state) {
            return state.location;
        },
      
    },
    mutations: {
        location(state, val) {
            state.location = val;
        },
       
    },
actions: {
    getLocation({commit, dispatch}) {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                pos => commit('location', pos),(err)=>{
                    dispatch('highAccuracyError', err)
                },
                { maximumAge: 0, timeout: 5000, enableHighAccuracy: true }
            );
        }
    },
    highAccuracyError({commit, dispatch}, error) {
        if (error.code == error.TIMEOUT) {
            navigator.geolocation.watchPosition(
                pos => commit('location', pos), (err)=>{
                    dispatch('lowAccuracyError', err)
                },
                { maximumAge: 0, timeout: 10000, enableHighAccuracy: false }
            );
            return;
        }
    },
    lowAccuracyError({commit}, error) {
       commit('location', null),
        console.log(error);
    },
}
}