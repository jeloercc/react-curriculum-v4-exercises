import './Lesson07Styles.css';
import { useState, useEffect } from 'react';
import { getPosts } from './api';

// Fetches and displays posts when the component mounts.
export default function FetchOnRender() {
  // Store posts, loading status, and error messages.
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch posts when the component mounts.
  useEffect(() => {
    let active = true;
    async function fetchPosts() {
      try {
        const data = await getPosts();
        if (active) {
          setPosts(data);
        }
      } catch (err) {
        console.error(err);
        if (active) {
          setError(err.message);
        }
      } finally {
        // Stop loading after success or failure.
        if (active) {
          setLoading(false);
        }
      }
    }
    fetchPosts();

    // Avoid state updates after unmounting.
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="root">
      <h1 className="heading">Fetch list of posts on render</h1>
      <div className="content">
        {/* Display loading, errors, or the fetched posts. */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          posts.map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
