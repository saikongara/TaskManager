import React from 'react';
import { TaskCard } from './TaskCard';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
}

export function TaskList({ tasks, onToggleComplete }: TaskListProps) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
}