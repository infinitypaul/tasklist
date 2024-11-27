<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SharedTaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'task' => new TaskResource($this->whenLoaded('task')),
           'invited_by' => new BasicUserResource($this->whenLoaded('invitedBy')),
            'invitee' => new BasicUserResource($this->whenLoaded('inviteeUser')),
            'permission' => new PermissionResource($this->whenLoaded('permission')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
