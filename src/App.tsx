import React, { useState, useCallback, useMemo } from 'react';
import { PlusCircle, CheckCircle, Clock, ListTodo } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { Task, TaskGroup, TaskFormData } from './types';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { TaskFilters } from './components/TaskFilters';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Draft and review the Q2 project proposal document',
    priority: 'high',
    completed: false,
    dueDate: '2024-03-25',
    createdAt: new Date().toISOString(),
    tags: ['work', 'planning'],
  },
  {
    id: '2',
    title: 'Schedule team meeting',
    description: 'Coordinate with team members for weekly sync',
    priority: 'medium',
    completed: false,
    dueDate: '2024-03-20',
    createdAt: new Date().toISOString(),
    tags: ['work', 'meetings'],
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleComplete = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleCreateTask = (formData: TaskFormData) => {
    const newTask: Task = {
      id: uuidv4(),
      ...formData,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    tasks.forEach(task => task.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => task.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [tasks, searchQuery, selectedTags]);

  const taskGroups: TaskGroup[] = useMemo(() => [
    {
      title: 'Today',
      tasks: filteredTasks.filter(task => 
        !task.completed && 
        format(new Date(task.dueDate), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
      ),
    },
    {
      title: 'Upcoming',
      tasks: filteredTasks.filter(task => 
        !task.completed && 
        new Date(task.dueDate) > new Date()
      ),
    },
    {
      title: 'Completed',
      tasks: filteredTasks.filter(task => task.completed),
    },
  ], [filteredTasks]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Personal Assistant</h1>
          <p className="text-gray-600 mt-2">Keep track of your tasks and stay organized</p>
        </header>

        <div className="mb-6 space-y-4">
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <PlusCircle size={20} />
            <span>Add New Task</span>
          </button>

          <TaskFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            availableTags={availableTags}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-blue-500" />
              <h2 className="font-semibold text-gray-900">Today</h2>
              <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {taskGroups[0].tasks.length}
              </span>
            </div>
            <TaskList
              tasks={taskGroups[0].tasks}
              onToggleComplete={toggleComplete}
            />
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ListTodo className="text-yellow-500" />
              <h2 className="font-semibold text-gray-900">Upcoming</h2>
              <span className="ml-auto bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                {taskGroups[1].tasks.length}
              </span>
            </div>
            <TaskList
              tasks={taskGroups[1].tasks}
              onToggleComplete={toggleComplete}
            />
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="text-green-500" />
              <h2 className="font-semibold text-gray-900">Completed</h2>
              <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {taskGroups[2].tasks.length}
              </span>
            </div>
            <TaskList
              tasks={taskGroups[2].tasks}
              onToggleComplete={toggleComplete}
            />
          </div>
        </div>

        {isFormOpen && (
          <TaskForm
            onSubmit={handleCreateTask}
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;