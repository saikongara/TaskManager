export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  dueDate: string;
  createdAt: string;
  tags: string[];
}

export interface TaskGroup {
  title: string;
  tasks: Task[];
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  tags: string[];
}