import './Lesson07Styles.css';
import { useState } from 'react';
import { getSinglePost } from './api';

// Fetches a single post when the button is clicked.
export default function FetchOnClick() {
  // Store the post, loading status, and error messages.
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Fetch post 1 when the user clicks the button.
  async function fetchPost() {
    setLoading(true);
    setError(null);
    setPost(null);
    try {
      const data = await getSinglePost(1);
      setPost(data);
    } catch (err) {
      // Store request errors to display them.
      console.error(err);
      setError(err.message);
    } finally {
      // Stop loading after success or failure.
      setLoading(false);
    }
  }

  return (
    <div className="root">
      <h1 className="heading">Fetch single post on click</h1>

      <button type="button" onClick={fetchPost} disabled={loading}>
        Get post
      </button>

      <div className="content">
        {/* Display loading, errors, or the fetched post. */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : post ? (
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
