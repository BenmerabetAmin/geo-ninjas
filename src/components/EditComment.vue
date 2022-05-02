<template>
     <div class="view-profile container">
        <div  class="card">
            <h2 class="deep-purple-text center">Edit the comment</h2>
           
            <form @submit.prevent="EditComment">
                <div class="field">
                    <label for="comment">Edit the comment</label>
                    <input type="text" name="comment" v-model="comment">
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
export default {
    name: 'EditComment',
    data(){
        return{
        comment: null, 
        feedback: null,                    
        user: null,

    }
    },
    created(){
         
        //get current user
        db.collection('users').where('user_id', '==', firebase.auth().currentUser.uid).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.user = doc.data(),
                this.user.id = doc.id
            })
        })

        let ref = db.collection('comments')        
        //profile data
        ref.doc(this.$route.params.id).get()
        .then(user => {
            this.comment = (user.data().content) 
        })
    },
    methods: {
        EditComment(){
            if(this.comment){
            db.collection('comments').doc(this.$route.params.id).update({
                content : this.comment,
            })
            this.$router.push({name: 'ViewProfile', params: {id: this.user.id}})
            }else {
                this.feedback = "You can't edit an empty comment"
            }
            
        }
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
   

</style>