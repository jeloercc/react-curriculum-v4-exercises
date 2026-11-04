// TOPIC: Event Bubbling & Stopping Propagation
// TASK: Ensure only the inner button's action triggers an alert when the button is pushed

export default function BugEventPropagation() {
  function handleOuterClick() {
    alert("RED BOX CLICKED ❌ Don't show me!");
  }

  function handleInnerClick(event) {
    // Stop the event from bubbling up to the parent container
    event.stopPropagation();
    alert('Button Clicked ✅');
  }

  return (
    <>
      <h2>Stopping Event Propagation</h2>
      <div
        style={{ padding: 20, border: '2px solid red' }}
        onClick={handleOuterClick}
      >
        <button onClick={handleInnerClick}>Click inner button</button>
      </div>
    </>
  );
}
//I use `event.stopPropagation()` inside the `handleInnerClick` function
// to prevent the click event from "bubbling up" from the inner button to the outer red box.
// Without this method, clicking the button would trigger both alerts sequentially because
// the event naturally propagates up through parent elements in the DOM.
