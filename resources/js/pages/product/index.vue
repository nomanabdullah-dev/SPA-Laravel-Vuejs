<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Product List</h5>
                        <router-link :to="{name: 'create-product'}" class="btn btn-primary">Create Product</router-link>
                    </div>

                    <div class="card-body">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th style="width:80px">ID</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th style="width:150px">Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="products.length">
                                <tr v-for="product in products" :key="product.id">
                                    <td style="width:80px">{{ product.id }}</td>
                                    <td>
                                        <div style="max-width:120px; max-height:120px; overflow:hidder">
                                            <img :src="product.image" class="img-fluid">
                                        </div>
                                    </td>
                                    <td>{{ product.title }}</td>
                                    <td>
                                        <span v-if="product.category">{{ product.category.name }}</span>
                                        <span v-else>{{ product.category_id  }}</span>
                                    </td>
                                    <td>{{ product.price }}</td>
                                    <td>{{ product.description }}</td>
                                    <td style="width:150px">
                                        <router-link :to="{name: 'edit-product', params: {id: product.id}}" class="btn btn-sm btn-primary">Edit</router-link>
                                        <a @click.prevent="deleteProduct(product)" href="#" class="btn btn-sm btn-danger">Delete</a>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4">
                                        <h5 class="text-center mt-4 mb-4">No products found</h5>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data(){
            return{
                products: []
            }
        },
        methods: {
            loadProducts(){
                axios.get('/api/product').then(response => {
                    this.products = response.data;
                });
            },
            async deleteProduct(product){
                await axios.delete(`/api/product/${product.id}`).then(()=>{
                    this.$toast.success({
                        title:'Success!',
                        message:'Product deleted successfully'
                    })
                });
                let index = this.products.indexOf(product);
                this.products.splice(index, 1);
            }
        },
        mounted() {
            this.loadProducts();
        }
    }
</script>
