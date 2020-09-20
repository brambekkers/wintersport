import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#2ba97a',
                secondary: '#747374',
                anchor: '#2ba97a',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
            dark: {

            }
        },
    },
});
