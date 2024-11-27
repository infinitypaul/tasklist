<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperPermission
 */
class Permission extends Model
{
    protected $fillable = ['name'];

    CONST EDIT = 'edit';
    CONST VIEW = 'view';


}
