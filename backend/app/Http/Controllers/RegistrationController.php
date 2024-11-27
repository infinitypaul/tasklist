<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create($request->validated());

        return new UserResource($user, true);
    }
}
