//Lesson-03 Component Lifecycle, Hooks, State, and Props
//Exercise: React Bug Hunt – Fix the broken components in this folder
//Impport components here
import BugEffectLoop from './BugEffectLoop';
import BugMutatedState from './BugMutatedState';
import BugProps from './BugProps';

export default function StudentWork() {
  return (
    <div>
      <h2>student work - lesson 3</h2>
      <BugEffectLoop />

      <BugMutatedState />

      <BugProps name="friend" />
    </div>
  );
}
