<template>
    <div class="container py-2">
        <div class="col-md-12">
            <h2>Our Products</h2>
        </div>
        <div class="row" v-if="apiCallLoaded">
            <div class="col-md-3 mb-3" v-for="product in products" :key="product.id">
                <div class="card">
                    <img class="card-img-top" :src="product.image" style="height:150px; object-fit:cover; overflow:hidden" alt="Card image cap">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <label class="badge badge-danger mb-2">{{ product.category.name }}</label>
                            <h4>${{ product.price }}</h4>
                        </div>
                        <h5 class="card-title">{{ product.title }}</h5>
                        <!-- <p class="card-text">{{ product.description }}</p> -->
                        <router-link :to="{name: 'product-details', params:{slug: product.slug} }" class="btn btn-primary">View Product</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center my-3">
            <button class="btn btn-primary" :disabled="!next_page_url" @click.prevent="loadMoreProducts(next_page_url)">Load More..</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                products: [],
                next_page_url: null,
                apiCallLoaded: false
            }
        },
        methods: {
            async loadProducts(){
                let { data } = await axios.get('/api/products');
                console.log(data);
                this.products = data.data;
                this.next_page_url = data.next_page_url;
                this.apiCallLoaded = true;
            },
            async loadMoreProducts(url){
                let { data } = await axios.get(url);

                let products = data.data;
                products.forEach(element => {
                    this.products.push(element);
                });
                //this.products.concat(data.data);
                this.next_page_url = data.next_page_url;
            }
        },
        mounted(){
            this.loadProducts();
        }
    }
</script>
