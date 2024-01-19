import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})
import "vuetify/dist/vuetify.min.css";
import { createPinia } from "pinia";

const pinia = createPinia();
createApp(App)
    .use(router)
    .use(vuetify)
    .use(pinia)
    .mount("#app");
