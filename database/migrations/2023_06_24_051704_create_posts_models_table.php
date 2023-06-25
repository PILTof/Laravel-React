<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts_models', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->float('bid');
            $table->float('price');
            $table->text('desc')->nullable();
            $table->string('email');
            $table->string('label');
            $table->integer('user_id');
            $table->string('file_name',60);
            $table->string('filepath');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts_models');
    }
};
