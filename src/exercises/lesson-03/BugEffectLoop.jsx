//src/exercises/lesson-03/BugEffectLoop.jsx

/* 
  BUG #1 — Effect Issue 

  This component uses useState and useEffect to update a value.
  The effect is running on every render, which causes the
  component to behave incorrectly.
  */

import { useEffect, useState } from 'react';

export default function BugEffectLoop() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((prevCount) => prevCount + 1);
  }, []); // <----

  return <p>Bug 1 Count: {count}</p>;
}

// Explanation:
// If we don't put the `[]` at the end, useEffect runs every time the component renders,
// causing an infinite loop. Adding `[]` tells React to run this code only once.
// Also, we used `(prevCount) => prevCount + 1`.
// Sometimes React gets confused and uses an old 'count' number.
// Using `prevCount =>` tells React: "always grab the most recent number you have saved, and add 1 to it."
