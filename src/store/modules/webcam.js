export default {
    state: {
        webcams: null,
    },
    getters: {
        webcams(state) {
            return state.webcams;
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
    },
    actions: {
        webcamWatcher({ getters, commit }) {
            getters.db.doc("webcams/areas").onSnapshot((doc) => {
                commit("webcams", doc.data());
            });
        },
        async updateCam({ dispatch }, { webcam }) {
            console.log('Update webcam: ', name)
            await dispatch('scrapeData', webcam)
            return true
        },
        async scrapeData({ getters }, webcam) {
            const response = await fetch(webcam.url);

            if (getters.webcams) {
                // status "OK"
                if (response.status === 200) {
                    // Get dom
                    var html = await response.text();
                    var parser = new DOMParser();
                    console.log(webcam.url)
                    // Get items
                    var doc = await parser.parseFromString(html, "text/html");
                    var video = doc.querySelector("video");
                    const time = doc
                        .querySelector("#video_clock_div")
                        .querySelector("nobr").textContent;
                    const videoUrl = video
                        .querySelector("source")
                        .src.match(/(.*?(?:mp4))|.*/)[0];

                    // Set Data to Vue
                    webcam.scrapeDate = Date.now();
                    webcam.poster = video.poster;
                    webcam.time = time
                    webcam.videoUrl = videoUrl
                }
            }

            return webcam
        },
        updateAllCams({ getters }, webcams) {
            getters.db.doc(`webcams/areas`).set(webcams)

        }
    },
};
