export default {
    state: {
        webcams: null,
        videoVisible: null,
    },
    getters: {
        webcams(state) {
            return state.webcams;
        },
        videoVisible(state) {
            return state.videoVisible;
        },
        allCams(state) {
            const allCams = [];
            if (state.webcams) {
                for (const area of Object.values(state.webcams)) {
                    for (const webcam of area) {
                        allCams.push(webcam);
                    }
                }
            }
            return allCams;
        }
    },
    mutations: {
        webcams(state, val) {
            state.webcams = val;
        },
        videoVisible(state, val) {
            state.videoVisible = val;
        }
    },
    actions: {
        webcamWatcher({ getters, commit }) {
            getters.db.doc("webcams/areas").onSnapshot((doc) => {
                commit("webcams", doc.data());
            });
        },
        async updateCam({ dispatch }, { webcam }) {
            await dispatch("scrapeData", webcam);
            return true;
        },
        async scrapeData({ getters }, webcam) {
            const response = await fetch(webcam.url);

            if (getters.webcams) {
                // status "OK"
                if (response.status === 200) {
                    // Get dom
                    var html = await response.text();
                    var parser = new DOMParser();
                    // Get items
                    var doc = await parser.parseFromString(html, "text/html");
                    if (doc) {
                        var video = doc.querySelector("video");
                        const videoDiv = doc.querySelector("#video_clock_div");
                        if (video && videoDiv) {
                            const time = videoDiv.querySelector("nobr").textContent;
                            const videoUrl = video.querySelector("source").src.match(/(.*?(?:mp4))|.*/)[0];

                            // Set Data to Vue
                            webcam.scrapeDate = Date.now();
                            webcam.poster = video.poster;
                            webcam.time = time;
                            webcam.videoUrl = videoUrl;
                            webcam.online = true;
                        } else {
                            webcam.online = false;
                            console.log("set offline");
                        }
                    }
                }
            }

            return webcam;
        },
        updateAllCams({ getters }, webcams) {
            getters.db.doc(`webcams/areas`).set(webcams);
        }
    }
};
