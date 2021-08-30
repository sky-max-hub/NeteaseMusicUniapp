import Vue from 'vue';
import App from './App';
import store from './store'


Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.config.debug = false;

App.mpType = 'app'

// #ifdef APP-PLUS
// //重写toast, 将退出应用的提示拦截
var tmpToast = plus.nativeUI.toast;
plus.nativeUI.toast = function(message, options) {
	if (message == '再按一次退出应用') {
		return false;
	} else {
		tmpToast(message, options);
	}
};
// #endif

const app = new Vue({
    ...App,
	store
})
app.$mount()
