<?php

namespace App\Repositories;

use App\Models\Task;
use App\Models\User;

class TaskRepository
{
    public function getUserTasks(User $user): \Illuminate\Database\Eloquent\Collection
    {
        return $user->tasks()->orderBy('created_at')->get();
    }

    public function createTask(User $user, array $data)
    {
        return $user->tasks()->create($data);
    }

    public function updateTask(Task $task, array $data): Task
    {
        $task->update($data);
        return $task;
    }

    public function toggleTaskStatus(Task $task): Task
    {
        $task->status = !$task->status;
        $task->save();
        return $task;
    }
}
