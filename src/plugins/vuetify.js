import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        theme: { dark: true },
        themes: {
            light: {
                primary: "#2ba97a",
                secondary: "#747374",
                anchor: "#2ba97a",
                accent: "#8c9eff",
                error: "#b71c1c"
            },
            dark: {
                primary: "#a92b96",
                secondary: "#747374",
                anchor: "#2ba97a",
                accent: "#8c9eff",
                error: "#b71c1c"
            }
        }
    }
});
