<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MailingListRequest;
use App\Models\mailing_list;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MailingListController extends Controller
{
    public function send(MailingListRequest $request) 
    {
        $data = $request;
        /** @var \App\Models\mailing_list $mailing_list */
        $mailing_list = mailing_list::create([
            'email' => $data['email'],
        ]);
    }
    public function getAll(Request $request)
    {
        $data = DB::table('mailing_lists')->get();
        return $data;
    }
}
