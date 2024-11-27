<?php

namespace App\Repositories;

use App\Models\SharedTask;
use App\Models\User;

class SharedTaskRepository
{
    public function getTasksSharedWith(User $user): \Illuminate\Database\Eloquent\Collection
    {
        return SharedTask::with(['task', 'permission'])
            ->where('invitee', $user->id)
            ->get();
    }

    public function getTasksSharedByUser(User $user, $taskId): \Illuminate\Database\Eloquent\Collection
    {
        return SharedTask::with(['task', 'inviteeUser', 'invitedBy', 'permission'])
            ->where('task_id', $taskId)
            ->where('invited_by', $user->id)
            ->get();

    }

    public function createSharedTask(array $data)
    {
        return SharedTask::create($data);
    }

    public function isTaskAlreadyShared($taskId, $invitedBy, $invitee): bool
    {
        return SharedTask::where('task_id', $taskId)
            ->where('invitee', $invitee)
            ->where('invited_by', $invitedBy)
            ->exists();
    }



}
