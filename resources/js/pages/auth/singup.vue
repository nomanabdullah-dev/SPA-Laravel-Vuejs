<template>
    <div class="container">
        <div class="py-5">
            <div class="row">
                <div class="col-6 offset-3">
                    <div class="card card-default">
                        <div class="card-header">
                            Sign up
                        </div>
                        <div class="card-body">
                            <form action="" method="post" @submit.prevent="createUser()">
                                <div class="form-group">
                                    <label for="">Name</label>
                                    <input type="text" v-model="signupForm.name" class="form-control" placeholder="name">
                                    <div v-if="signupForm.errors.has('name')" v-html="signupForm.errors.get('name')" class="text-danger" />
                                </div>
                                <div class="form-group">
                                    <label for="">Eamil</label>
                                    <input type="text" v-model="signupForm.email" class="form-control" placeholder="email">
                                    <div v-if="signupForm.errors.has('email')" v-html="signupForm.errors.get('email')" class="text-danger" />
                                </div>
                                <div class="form-group">
                                    <label for="">Password</label>
                                    <input type="password" v-model="signupForm.password" class="form-control" placeholder="password">
                                    <div v-if="signupForm.errors.has('password')" v-html="signupForm.errors.get('password')" class="text-danger" />
                                </div>
                                <div class="from-group">
                                        <label for="">Confirm Password</label>
                                        <input type="password" v-model="signupForm.password_confirmation" class="form-control" placeholder="confirm password">
                                        <div v-if="signupForm.errors.has('password_confirmation')" v-html="signupForm.errors.get('password_confirmation')" class="text-danger" />
                                </div>
                                <div class="form-group mt-3">
                                    <button type="submit" :disabled="signupForm.busy" class="btn btn-success px-4">Create An Account</button>
                                </div>
                            </form>
                        </div>
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
                signupForm: new Form({
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                })
            }
        },
        methods: {
            async createUser(){
                await axios.get('/sanctum/csrf-cookie');

                await this.signupForm.post('/register');
                await this.getUserData();

                this.$toast.success({
                title:'Success!',
                message: 'Your account has been created!'
                });

                this.$router.push({ name: 'dashboard' });
            },
            async getUserData(){
                await axios.get('/api/user').then(response => {
                    let user = response.data;
                    this.$store.commit('SET_USER', user);
                    this.$store.commit('SET_AUTHENTICATED', true);

                    localStorage.setItem("auth", true);
                });
            }
        },
        mounted(){
            //this.getUserData();
        }
    }
</script>

<style lang="scss" scoped>

</style>
