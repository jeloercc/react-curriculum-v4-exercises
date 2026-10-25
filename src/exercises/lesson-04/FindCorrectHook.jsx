// TOPIC: Choose the correct tool: useRef vs useState
// TASK: Make sure it updates the text *without* triggering a re-render
import { useRef } from 'react';
export default function FindCorrectHook() {
  // Store the count value in memory without notifying React
  const clickCount = useRef(0);
  // Create a reference to attach to the HTML button element
  const buttonRef = useRef(null);

  function handleClick() {
    clickCount.current++;
    // Change the text directly in the DOM using standard JavaScript
    if (buttonRef.current) {
      buttonRef.current.innerText = `${clickCount.current} Clicks`;
    }
  }

  // Attach the reference to the button and set an initial static value
  return (
    <div>
      <h2>useRef vs useState Decision</h2>
      <button ref={buttonRef} onClick={handleClick}>
        0 Clicks
      </button>
    </div>
  );
}
// We use useRef instead of useState because the explicit requirement is to avoid
// a re-render. useState forces React to redraw the component on every change.
// By using one useRef for the counter and a second reference to target the button,
// we can mutate the internal value and manipulate the DOM text directly,
// strictly fulfilling the "without triggering a re-render" constraint.
