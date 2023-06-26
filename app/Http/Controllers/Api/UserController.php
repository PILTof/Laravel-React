<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mockery\Undefined;

class UserController extends Controller
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
    // All users
    public function getusers(Request $request)
    {

        /** @var User $user */
        $users = DB::table('users')->get();
        return $users;
    }

    public function updateUser(Request $request, $id)
    {
        /** @var User $user */
        try {
            if ($request->hasFile('avatar_img')) {
                $old_avatar = DB::table('users')->where('id', $id)->get('file_name');
                if($old_avatar[0]->file_name !== null) {
                    $old_avatar_path = public_path() . '/storage/uploads/' . $old_avatar[0]->file_name;
                    unlink($old_avatar_path);
                }



                $file = $request->file('avatar_img');
                $fileName = $file->getClientOriginalName();

                $file_new_name = $this->generateRandomString(20) . '_' . 'avatar_img_' . $fileName;
                $filePath = $file->storeAs('uploads', $file_new_name, 'public');
                $user = DB::table('users')
                    ->where('id', $id)
                    ->update(['name' => $request['name'], 'bio' => $request['bio'], 'filepath' => $filePath, 'file_name' => $file_new_name]);
                return response($user, 200);
            } else {
                $user = DB::table('users')
                    ->where('id', $id)
                    ->update(['name' => $request['name'], 'bio' => $request['bio']]);
                return response($user, 200);
            }
        } catch (\Throwable $th) {
            //throw $th;
            return response($th, 422);
        }
    }

    // public function updateUserAvatar(Request $request, $id)
    // {
    //     /** @var User $user */
    //     try {
    //         $file = $request->file('avatar_img');
    //         $file_new_name = $this->generateRandomString(20) . '_' . 'avatar_img' . $request['file_name'];
    //         $filePath = $file->storeAs('uploads', $file_new_name, 'public');
    //         $user = DB::table('users')
    //             ->where('id', $id)
    //             ->update(['filepath' => $filePath, 'file_name' => $file_new_name]);
    //         return response(compact('user'));
    //     } catch (\Throwable $th) {
    //         return response('', 500);
    //     }
    // }
}
