import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import {repository} from "@/store";
import 'remixicon/fonts/remixicon.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './styles/main.scss'
import APIService from "@/service/api.service";


APIService.init(process.env.VUE_APP_ROOT_API);
const app = createApp(App);
app.use(Vuex);
app.use(router);
app.config.productionTip = false;
app.use(repository);
app.mount('#app');

