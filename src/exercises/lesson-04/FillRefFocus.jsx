// TOPIC: Correct useRef usage to control DOM elements
// TASK: Implement focusing an input field when the button is clicked.
import { useRef } from 'react';
export default function FillRefFocus() {
  // Create a reference to target the input DOM element
  const inputRef = useRef(null);

  function focusInput() {
    //focus the input element using the native .focus() method
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <div>
      <h2>useRef: Focusing an Input</h2>

      <input ref={inputRef} type="text" placeholder="Type here..." />

      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
//We use `useRef` to get a direct reference to the `<input>` DOM node.
//  By attaching `ref={inputRef}` to the input and calling `inputRef.current.focus()`
//  inside the handler, we can imperatively trigger the focus state without needing state variables
