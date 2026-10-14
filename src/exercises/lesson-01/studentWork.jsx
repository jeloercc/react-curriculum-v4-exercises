//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export default function StudentWork() {
  // variables
  const name = 'Julian Martinez';
  const age = 31;
  const hobbies = ['Web Development', 'Astronomy', 'Hiking', 'homelabs'];
  // Return jsx
  return (
    <div>
      <h2>About Me</h2>
      <p>
        Hi everyone! I'm {name}. I'm {age} years old and I'm really excited to
        be learning React.
      </p>
      <ul>
        {hobbies.map((hobby) => (
          <li key={hobby}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
