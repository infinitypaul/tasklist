<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Repositories\TaskRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TaskController extends Controller
{
    protected TaskRepository $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }
    public function index()
    {
        $tasks = $this->taskRepository->getUserTasks(auth()->user());

        return response()->json([
            'tasks' => TaskResource::collection($tasks),
        ]);
    }

    public function store(StoreTaskRequest $request)
    {
        $task = $this->taskRepository->createTask(auth()->user(), $request->validated());

        return response()->json([
            'message' => 'Task created!',
            'task' => new TaskResource($task),
        ]);
    }


    public function update(Task $task, UpdateTaskRequest $request)
    {
        Gate::authorize('update', $task);

        $updatedTask = $this->taskRepository->updateTask($task, $request->validated());

        return response()->json([
            'message' => 'Task updated!',
            'task' => new TaskResource($updatedTask),
        ]);
    }

    public function destroy(Task $task)
    {
        Gate::authorize('delete', $task);

        $task->delete();

        return response()->json([
            'message' => 'Task deleted!'
        ]);
    }

    public function show(Task $task)
    {
        Gate::authorize('view', $task);

        $shared = auth()->user()->shared()->where('task_id', $task->id)->exists();

        return response()->json([
            'task' => new TaskResource($task),
            'shared' => $shared,
        ]);
    }

    public function mark_task(Task $task)
    {
        Gate::authorize('update', $task);

        $updatedTask = $this->taskRepository->toggleTaskStatus($task);

        return response()->json([
            'message' => 'Task marked ' . ($updatedTask->status ? 'completed' : 'incomplete'),
            'task' => new TaskResource($updatedTask),
        ]);
    }


}
