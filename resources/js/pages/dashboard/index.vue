<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-4">
                <div class="list-group">
                    <a class="list-group-item list-group-item-action" href="#">Demo Link</a>
                    <a class="list-group-item list-group-item-action" href="#" @click.prevent="logout">Logout</a>
                </div>
            </div>
            <div class="col-8">
                <div class="card">
                    <div class="card-header">
                        Dashboard
                    </div>
                    <div class="card-body">
                        Welcome, {{ user.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            logout(){
                axios.post('/logout').then(response => {
                    console.log('success');
                    this.$toast.success({
                    title:'Success!',
                    message:'Logout Successfully!'
                    });

                    localStorage.removeItem("auth");
                    this.$store.commit('SET_AUTHENTICATED', false);
                    this.$router.push({name: 'login'});
                });
            }
        },
        computed: {
            user(){
                return this.$store.getters.getUser;
            }
        }
    }
</script>

<style>

</style>
