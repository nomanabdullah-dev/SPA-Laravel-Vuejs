<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5>Create Category</h5>
                        <router-link :to="{name: 'category-list'}" class="btn btn-primary">Category List</router-link>
                    </div>
                    <div class="card-body">
                        <div class="col-md-6 offset-3">
                            <form @submit.prevent="createCategory">
                                <div class="form-group">
                                    <label for="">Category Name</label>
                                    <input type="text" v-model="categoryForm.name" name="name" class="form-control" placeholder="category name">
                                    <div v-if="categoryForm.errors.has('name')" v-html="categoryForm.errors.get('name')" class="text-danger" />
                                </div>
                                <button type="submit" class="btn btn-success">Create Category</button>
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
        data: () => ({
            categoryForm: new Form({
                name: ''
            })
        }),
        methods: {
            createCategory(){
                this.categoryForm.post('/api/category').then(({data}) => {
                    this.categoryForm.name = '';
                    this.$toast.success({
                        title:'Success!',
                        message:'Category created successfully'
                    })
                })
            }
        }
    }
</script>

<style>

</style>
