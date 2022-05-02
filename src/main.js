// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

let app = null

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(() => {
if(!app){


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
}

})


