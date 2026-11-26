import { useState } from 'react';

// Imports updated to match the new project structure
import UserProfile from '../../components/UserProfile';
import FilterButtonGroup from '../../components/FilterButtonGroup';
import TaskItem from '../../components/TaskItem';
import { filterTasks } from '../../utils/filterTasks';
import { useTasks } from '../../hooks/useTasks';

export default function StudentWork() {
  // Data-fetching logic moved to a custom hook
  const { tasks, loading } = useTasks();

  // State for the UI filter
  const [filter, setFilter] = useState('all');

  // Filtering logic moved out to a helper function
  const visibleTasks = filterTasks(tasks, filter);

  // Loading behavior does not change
  if (loading) {
    return <p>Loading tasks...</p>;
  }

  // Refactored using new components
  return (
    <div>
      <UserProfile name="Student" />

      <FilterButtonGroup filter={filter} setFilter={setFilter} />

      <ul>
        {visibleTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
