<?php

namespace App\Policies;

use App\Models\Permission;
use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TaskPolicy
{

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Task $task): bool
    {
        if($shared = $user->shared()->with('permission')->where('task_id', $task->id)->first()){
            return in_array($shared->permission->name, [Permission::VIEW, Permission::EDIT]);
        }

        return $user->id === $task->user_id;
    }



    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Task $task): bool
    {
        if($shared = $user->shared()->with('permission')->where('task_id', $task->id)->first()){
            return $shared->permission->name === Permission::EDIT;
        }

        return $user->id === $task->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Task $task): bool
    {
        return $user->id === $task->user_id;
    }


}
