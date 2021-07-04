<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function update_user(Request $request)
    {
        $user = auth()->user();

        $this->validate($request, [
            'name'      => 'required',
            'email'     => "required|unique:users,email,$user->id",
            'password'  => 'sometimes|nullable|confirmed|min:8'
        ]);

        $user->update([
            'name'      => $request->name,
            'email'     => $request->email,
        ]);

        if($request->password){
            $user->update([
                'password'=> bcrypt($request->password)
            ]);
        }

        return response()->json($user, 200);
    }
}
