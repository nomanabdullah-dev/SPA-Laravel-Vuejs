<template>
    <div class="container py-2">
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h2>{{ product.title }}</h2>
                    </div>
                    <div class="card-body">
                        <img :src="product.image" alt="" class="img-fluid">
                        <div class="d-flex justify-content-between align-items-center">
                            <label class="badge badge-danger mb-2">{{ product.category.name }}</label>
                            <h3>${{ product.price }}</h3>
                        </div>
                        <p>{{ product.description }}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <router-link :to="{name: 'home'}" class="btn btn-primary">Go To Home</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                product: [],
                apiCallLoaded: false
            }
        },
        methods: {
            async loadProductData(){
                let slug = this.$route.params.slug;
                let { data } = await axios.get('/api/products/'+slug);
                this.product = data;
                this.apiCallLoaded = true;
            }
        },
        mounted(){
            this.loadProductData();
        }
    }
</script>
