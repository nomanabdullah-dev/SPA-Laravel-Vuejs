<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3" v-for="product in products" :key="product.id">
                <div class="card">
                    <img class="card-img-top" :src="product.image" style="height:150px; object-fit:cover; overflow:hidden" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">{{ product.title }}</h5>
                        <p class="card-text">{{ product.description }}</p>
                        <a href="#" class="btn btn-primary">{{ product.price }}</a>
                    </div>
                </div>
            </div>
        </div>
        <pre>{{products}}</pre>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                products: []
            }
        },
        methods: {
            async loadProducts(){
                let { data } = await axios.get('/api/products');

                this.products = data.data
            }
        },
        mounted(){
            this.loadProducts();
        }
    }
</script>
