<template>
    <div class="view-profile container">
        <div v-if="profile"  class="card">
            <h2 class="deep-purple-text center">{{profile.alias}}'s  Profile</h2>
            <ul class="comments collection">
                <li v-for="(comment, index) in this.comments" :key="index">
                    <div class="deep-purple-text ">{{comment.from}}</div>
                    <div class="grey-text text-darken-4">{{comment.content}}</div>
                    <div class="grey-text">{{comment.timestamp}}</div>
                    <i v-if="checkForDeleting(comment.from)" class="material-icons delete " @click="deleteComment(comment.id)">delete</i>
                    <span>
                        <router-link :to="{name: 'EditComment', params: {id: comment.id}}">
                            <i v-if="checkForEditing(comment.from)" class="material-icons edit" >edit</i>
                        </router-link>
                    </span>

                    
             
                </li>
            </ul>
            <form @submit.prevent="addComment">
                <div class="field">
                    <label for="comment">Add a comment</label>
                    <input type="text" name="comment" v-model="newComment">
                    <p v-if="feedback" class="red-text center">{{feedback}}</p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import db from '../firebase/init'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import moment from 'moment'
import slugify from 'slugify'

export default {
    name: 'ViewProfile',
    data(){
        return{
            profile: null,
            newComment: null,
            feedback: null,
            user: null,
            comments: [],
            userLogged: null
        }
    },
   
    created(){
        let ref = db.collection('users')
        //get current user
        ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.user = doc.data(),
                this.user.id = doc.id
            })
        })
        //profile data
        ref.doc(this.$route.params.id).get()
        .then(user => {
            this.profile = user.data()
        })

        //comments
        db.collection('comments').orderBy('time').where('to', '==', this.$route.params.id)
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                 if (change.type == 'added'){
                this.comments.unshift({
                    from: change.doc.data().from,
                    content: change.doc.data().content,
                    timestamp: moment(change.doc.data().time).format('lll'),
                    id: change.doc.id
                })
                 }
            })
        })
    },
    methods: {
    async addComment(){
            if(this.newComment){
                this.feedback = null
                await db.collection('comments').add({
                    to: this.$route.params.id,
                    from: this.user.alias,
                    content: this.newComment,
                    time: Date.now(),
                })
                this.newComment = null
            } else {
                this.feedback = 'You must add a comment'
            }   
        },
    async deleteComment (id){
        await db.collection('comments').doc(id).delete()
        this.comments = this.comments.filter(comment =>{
        return comment.id != id
     })
    },
    checkForDeleting(commentOwner){
        if (this.user.id ==   slugify(commentOwner, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        }) || this.user.id ==  slugify(this.profile.alias, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        }) ){
            return true
        }
    },
    checkForEditing(commentOwner){
        return this.user.id ==   slugify(commentOwner, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
    },
    }
    }

</script>

<style>
.view-profile .card {
    padding: 20px;
    margin-top: 20px;
    
    
}

.view-profile h2 {
    font-size: 2em;
    margin-top: 0;

}
.view-profile li {
    padding:  10px;
    margin-bottom: 1px solid #eee;
      
}
.delete{
position: relative;  
left: 800px;
bottom: 45px;
color: grey ;
cursor: pointer;
}
.edit{
position: relative;  
left: 740px;
bottom: 45px; 
color: grey;
cursor: pointer;
}

</style>