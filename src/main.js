import Vue from "vue";
import App from "./App.vue";
import {
  Table,
  TableColumn,
  Form,
  FormItem,
  Input,
  Button,
  Drawer,
  Checkbox,
  CheckboxGroup,
  Radio,
  DatePicker,
  Pagination,
  Loading,
} from "element-ui";

Vue.config.productionTip = false;
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Drawer);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(DatePicker);
Vue.use(Pagination);
Vue.use(Loading);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
