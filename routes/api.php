<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MailingListController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\PostsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/updateuser/{id}',[UserController::class,'updateUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/createPost',[PostsController::class, 'createPost']);
    Route::post('/deletePost/{id}',[PostsController::class, 'deletePostByPostId']);
});


Route::get('/getusers', [UserController::class, 'getusers']);
Route::get('/getemails', [MailingListController::class, 'getAll']);
Route::post('/singup', [AuthController::class, 'singup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/send', [MailingListController::class, 'send']);
Route::get('/getallposts', [PostsController::class, 'getAllPosts']);
Route::get('/getpost/user/{id}', [PostsController::class, 'getPostByUserId']);