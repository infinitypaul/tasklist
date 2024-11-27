<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperTask
 */
class Task extends Model
{
    protected $fillable = ['name', 'status', 'description'];

    protected $casts = [
        'status' => 'boolean'
    ];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
