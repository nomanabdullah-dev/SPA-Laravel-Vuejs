<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5>Edit Product - {{ productForm.title}}</h5>
                        <router-link :to="{name: 'product-list'}" class="btn btn-primary">Product List</router-link>
                    </div>
                    <div class="card-body">
                        <div class="col-md-6 offset-3">
                            <form @submit.prevent="saveProduct">
                                <div class="form-group">
                                    <label for="">Product Title</label>
                                    <input type="text" v-model="productForm.title" name="title" class="form-control"
                                        placeholder="product title">
                                    <div v-if="productForm.errors.has('title')" v-html="productForm.errors.get('title')"
                                        class="text-danger" />
                                </div>
                                <div class="form-group">
                                    <label for="">Select Product Category</label>
                                    <select name="category_id" class="form-control" v-model="productForm.category_id">
                                        <option value="" style="display:none" selected>Select Category</option>
                                        <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.name }}</option>
                                    </select>
                                    <div v-if="productForm.errors.has('category_id')" v-html="productForm.errors.get('category_id')" class="text-danger" />
                                </div>
                                <div class="form-group">
                                    <label for="">Product Price</label>
                                    <input type="text" v-model="productForm.price" name="price" class="form-control"
                                        placeholder="product price">
                                    <div v-if="productForm.errors.has('price')" v-html="productForm.errors.get('price')"
                                        class="text-danger" />
                                </div>
                                <div class="row">
                                    <div class="col-8">
                                        <div class="form-group">
                                            <label for="">Product Image</label>
                                            <input type="file" class="form-control-file" @change="onImageChange">
                                            <div v-if="productForm.errors.has('image')"
                                                v-html="productForm.errors.get('image')" class="text-danger" />
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div style="width:100%; max-height:150px; overflow:hidden">
                                            <img :src="image" class="img-fluid">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="">Product Description</label>
                                    <textarea v-model="productForm.description" name="description" class="form-control"
                                        placeholder="product description" rows="5"></textarea>
                                    <div v-if="productForm.errors.has('description')"
                                        v-html="productForm.errors.get('description')" class="text-danger" />
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-success">Update Product</button>
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
    import { objectToFormData } from 'object-to-formdata'

    export default {
        data() {
            return {
                productForm: new Form({
                    title: '',
                    category_id: '',
                    price: '',
                    image: '',
                    description: '',
                    _method: 'put'
                }),
                image: '',
                categories: []
            }
        },
        methods: {
            loadProductData() {
                let id = this.$route.params.id;

                axios.get(`/api/product/${id}/edit`).then(response => {
                    let product             = response.data;

                    this.productForm.title  = product.title;
                    this.productForm.price  = product.price;
                    this.productForm.description = product.description;
                    this.productForm.category_id = product.category_id;
                    this.image              = product.image;
                });
            },
            saveProduct() {
                let id = this.$route.params.id;

                this.productForm.post('/api/product/'+id, {
                    transformRequest: [function (data, headers) {
                        return objectToFormData(data)
                    }],
                    onUploadProgress: e => {
                        // Do whatever you want with the progress event
                        console.log(e)
                    }
                }).then(({ data }) => {
                    this.image = data.image;

                    this.$toast.success({
                        title: 'Success!',
                        message: 'Product save successfully'
                    })
                })
            },
            onImageChange(e) {
                const file = e.target.files[0]
                // Do some client side validation...
                this.productForm.image = file
            },
            loadCategories(){
                axios.get('/api/category').then(response => {
                    this.categories = response.data;
                });
            }
        },
        mounted() {
            this.loadProductData();
            this.loadCategories();
        }
    }

</script>

<style>

</style>
