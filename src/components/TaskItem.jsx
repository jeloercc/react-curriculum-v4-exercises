// Extracts a single task item, Receives task data via props
export default function TaskItem({ task }) {
  return (
    <li>
      {task.title} {task.completed ? '✅' : '⏳'}
    </li>
  );
}
