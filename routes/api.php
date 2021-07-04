<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PublicAPIController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth:sanctum'])->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/user', [AuthController::class,'update_user']);

    Route::resource('category', CategoryController::class);
    Route::resource('product', ProductController::class);
});

Route::get('products', [PublicAPIController::class,'products']);
Route::get('products/{slug}', [PublicAPIController::class,'product_details']);
