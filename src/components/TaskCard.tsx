import React from 'react';
import { CheckCircle2, Circle, Clock, Flag, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
}

const priorityColors = {
  low: 'text-blue-500',
  medium: 'text-yellow-500',
  high: 'text-red-500',
};

export function TaskCard({ task, onToggleComplete }: TaskCardProps) {
  const formattedDate = format(new Date(task.dueDate), 'MMM d, yyyy');
  const isOverdue = !task.completed && new Date(task.dueDate) < new Date();

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow ${
      isOverdue ? 'border-l-4 border-red-500' : ''
    }`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="mt-1 hover:opacity-80 transition-opacity"
        >
          {task.completed ? (
            <CheckCircle2 className="text-green-500" size={20} />
          ) : (
            <Circle className="text-gray-400" size={20} />
          )}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            <Flag className={`${priorityColors[task.priority]} h-4 w-4`} />
          </div>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          
          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {task.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className={`flex items-center gap-2 mt-2 text-sm ${
            isOverdue ? 'text-red-500' : 'text-gray-500'
          }`}>
            <Clock size={14} />
            <span>{formattedDate}</span>
            {isOverdue && <span className="text-xs font-medium">OVERDUE</span>}
          </div>
        </div>
      </div>
    </div>
  );
}