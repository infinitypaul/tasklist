<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        if (auth()->attempt($request->validated())) {
            return new UserResource(auth()->user(), true);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }
}
