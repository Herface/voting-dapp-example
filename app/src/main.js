import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button, Space, Progress, Row, Col, Card, Statistic, InputNumber, List, Layout} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "./plugins/web3"
Vue.use(Button);
Vue.use(Space);
Vue.use(Progress);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Statistic);
Vue.use(InputNumber);
Vue.use(List);
Vue.use(Layout);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
