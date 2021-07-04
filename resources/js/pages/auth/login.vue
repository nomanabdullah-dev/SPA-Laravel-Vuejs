<template>
    <div class="container">
        <div class="py-5">
            <div class="row">
                <div class="col-6 offset-3">
                    <div class="card card-default">
                        <div class="card-header">
                            Login
                        </div>
                        <div class="card-body">
                            <form action="" method="post" @submit.prevent="login()">
                                <div class="form-group">
                                    <label for="">Eamil</label>
                                    <input type="text" v-model="loginForm.email" class="form-control" placeholder="email">
                                    <div v-if="loginForm.errors.has('email')" v-html="loginForm.errors.get('email')" class="text-danger" />
                                </div>
                                <div class="form-group">
                                    <label for="">Password</label>
                                    <input type="password" v-model="loginForm.password" class="form-control" placeholder="password">
                                    <div v-if="loginForm.errors.has('password')" v-html="loginForm.errors.get('password')" class="text-danger" />
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-success px-4">Login</button>
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
                loginForm: new Form({
                    email: '',
                    password: ''
                })
            }
        },
        methods: {
            login(){
                axios.get('/sanctum/csrf-cookie').then(response => {
                    this.loginForm.post('/login').then(response => {
                        this.getUserData();

                        this.$toast.success({
                        title:'Success!',
                        message:'Welcome, dear!'
                        });

                        this.$router.push({ name: 'dashboard' });
                    });
                })
            },
            getUserData(){
                axios.get('/api/user').then(response => {
                    let user = response.data;
                    this.$store.commit('SET_USER', user);
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
