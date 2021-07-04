<?php

namespace Database\Factories;

use App\Models\Product;
use Facade\Ignition\Support\FakeComposer;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{

    protected $model = Product::class;

    public function definition()
    {

        $title = $this->faker->sentence(8);
        $slug = Str::slug($title);
        return [
            'title' => $title,
            'slug' => $slug,
            'price' => rand(100, 300),
            'image' => $this->faker->imageUrl(600,400),
            'description' => $this->faker->text(300)
        ];
    }
}
