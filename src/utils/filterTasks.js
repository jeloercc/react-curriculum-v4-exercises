// Accepts the task list and filter value, returns the filtered tasks
export function filterTasks(tasks, filter) {
  if (filter === 'completed') {
    return tasks.filter((task) => task.completed);
  }
  if (filter === 'pending') {
    return tasks.filter((task) => !task.completed);
  }
  return tasks;
}
