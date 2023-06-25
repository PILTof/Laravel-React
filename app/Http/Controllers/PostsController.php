<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostsRequest;
use App\Models\PostsModel;
use Faker\Core\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PostsController extends Controller
{
    protected function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $randomString;
    }
    //
    public function createPost(PostsRequest $request)
    {

        $file = $request->file('nft_image');
        $fileName = $file->getClientOriginalName();
        $file_new_name = $this->generateRandomString(10) . '_' . $fileName;
        $filePath = $file->storeAs('uploads', $file_new_name, 'public');
        $res = [
            'label' => $request['label'],
            'price' => $request['price'],
            'bid' => $request['bid'],
            'desc' => $request['desc'],
            'user_id' => $request['user_id'],
            'email' => $request['email'],
            'file_name' => $file_new_name,
            'filepath' => $filePath
        ];
        $post = PostsModel::create($res);
        return response($res, 200);
    }


    public function getAllPosts(Request $request)
    {
        $posts = DB::table('posts_models')->get();
        return response($posts, 200);
    }



    public function getPostByUserId(Request $request, $id)
    {
        # code...->where('user_id',$id)
        $posts = DB::table('posts_models')->where('user_id', $id)->get();
        // $filenames = DB::table('posts_models')->where('user_id', $id)->get('file_name');
        // $url = Storage::url($filenames[4]->file_name);
        


        return response($posts, 200);
        // ->file($path_to_file[0])
    }

    public function deletePostByPostId(Request $request, $id)
    {
        $posts = DB::table('posts_models')->where('id', $id)->delete();
        return response('',200);
    }
}
