<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-4">
                <div class="list-group">
                    <router-link class="list-group-item list-group-item-action" :to="{ name: 'dashboard' }">Dashboard
                    </router-link>
                    <router-link class="list-group-item list-group-item-action" :to="{ name: 'user-profile' }">User
                        Profile</router-link>
                    <a class="list-group-item list-group-item-action" href="#" @click.prevent="logout">Logout</a>
                </div>
            </div>
            <div class="col-8">
                <div class="card">
                    <div class="card-header">
                        User Profile
                    </div>
                    <div class="card-body">
                        <form action="" @submit.prevent="updateUserProfile()">
                            <div class="row">
                                <div class="col-6">
                                    <div class="from-group">
                                        <label for="">Your Name</label>
                                        <input type="text" v-model="userProfile.name" class="form-control" placeholder="Your name">
                                        <div v-if="userProfile.errors.has('name')" v-html="userProfile.errors.get('name')" class="text-danger" />
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="from-group">
                                        <label for="">Your Email</label>
                                        <input type="text" v-model="userProfile.email" class="form-control" placeholder="Your email">
                                    </div>
                                    <div v-if="userProfile.errors.has('email')" v-html="userProfile.errors.get('email')" class="text-danger" />
                                </div>
                                <div class="col-6">
                                    <div class="from-group">
                                        <label for="">Your Password</label>
                                        <input type="password" v-model="userProfile.password" class="form-control" placeholder="password">
                                    </div>
                                    <div v-if="userProfile.errors.has('password')" v-html="userProfile.errors.get('password')" class="text-danger" />
                                </div>
                                <div class="col-6">
                                    <div class="from-group">
                                        <label for="">Confirm Password</label>
                                        <input type="password" v-model="userProfile.password_confirmation" class="form-control" placeholder="confirm password">
                                    </div>
                                    <div v-if="userProfile.errors.has('password_confirmation')" v-html="userProfile.errors.get('password_confirmation')" class="text-danger" />
                                </div>
                            </div>
                            <button type="submit" class="btn btn-success mt-3">Save Profile</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Form from 'vform'
    export default {
        data(){
            return {
                userProfile: new Form({
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
                })
            }
        },
        methods: {
            user() {
                let user = this.$store.getters.getUser;
                this.userProfile.name = user.name;
                this.userProfile.email = user.email;
            },
            updateUserProfile(){
                this.userProfile.post('/api/user').then(response => {
                    //user update on vuex store
                    this.$store.commit('SET_USER', response.data);

                    this.$toast.success({
                        title:'Success!',
                        message:'Profile updated successfully'
                    })
                });
            }
        },
        created(){
            this.user();
        },
        computed: {
            auth(){
                return this.$store.getters.getUser;
            }
        }
    }

</script>

<style>

</style>
