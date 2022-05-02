import Vue from 'vue'
import Router from 'vue-router'
import GMap from '../components/GMap'
import ViewProfile from '../components/ViewProfile'
import EditComment from '../components/EditComment'
import Signup from '../components/auth/Signup'
import Login from '../components/auth/Login'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      beforeEnter: (to, from, next) => {
        let user = firebase.auth().currentUser
        if(!user){
          next({name:'Login'})
        }else{
          next()
        }

      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      beforeEnter: (to, from, next) => {
        let user = firebase.auth().currentUser
        if(!user){
          next({name:'Login'})
        }else{
          next()
        }
      }
    },
    {
      path: '/edit-comment/:id',
      name: 'EditComment',
      component: EditComment,
      beforeEnter: (to, from, next) => {
        let user = firebase.auth().currentUser
        if(!user){
          next({name:'Login'})
        }else{
          next()
        }
      }

    }
  ]
})
