<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    private bool $show_token;
    public function __construct($resource, bool $show_token = false)
    {
        $this->show_token = $show_token;
        parent::__construct($resource);
    }
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'name' => $this->name,
            'email' => $this->email,
            $this->mergeWhen($this->show_token, [
                'token' => $this->createToken('API Token')->plainTextToken,
            ]),
        ];
    }
}
