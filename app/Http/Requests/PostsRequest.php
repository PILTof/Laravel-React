<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'nft_image' => 'required|mimes:png,svg|max:2048',
            'label' => 'required|string|max:55',
            'bid' => 'required',
            'price' => 'required',
            'user_id' => 'required',
        ];
    }
}
