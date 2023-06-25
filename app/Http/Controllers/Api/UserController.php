<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
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
            $user = DB::table('users')
                ->where('id', $id)
                ->update(['name' => $request['name'], 'bio' => $request['bio']]);


            return response(compact('user'));
        } catch (\Throwable $th) {
            //throw $th;
            return response($th,422);
        }
    }
}
