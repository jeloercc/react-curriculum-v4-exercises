// src/exercises/lesson-03/BugMutatedState.jsx

/*
  BUG #2 — State Issue

  This component displays a count and updates it when the button is clicked.
  However, the way the count is being changed causes the component to behave
  incorrectly.
*/

import { useState } from 'react';
export default function BugMutatedState() {
  let [count, setCount] = useState(0);

  function handleAdd() {
    setCount((prevCount) => prevCount + 1); //<-----
  }

  return (
    <div>
      <p>Bug 2 Count: {count}</p>
      <button onClick={handleAdd}>Add 1</button>
    </div>
  );
}

// Explanation:
// We used `count++`, which modifies the state variable directly. In React, state must
// be treated as immutable (unchangeable directly). If we mutate it, React might not
// realize it needs to re-render the screen. The fix is to remove `count++` and only
// update the value using the `setCount` function.
