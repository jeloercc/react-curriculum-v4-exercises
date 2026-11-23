const POSTS_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts/';

// Retrieves all posts and returns them as an array of objects.
export async function getPosts() {
  console.log('[getPosts]: fetching list of posts');

  const url = `${POSTS_ENDPOINT}?_limit=10`;
  const response = await fetch(url);
  // Throw an error if the server returns an unsuccessful HTTP status.
  if (!response.ok) {
    throw new Error(
      `[getPosts]: failed to fetch, HTTP error ${response.status}`
    );
  }
  // Parse the response body from JSON into JavaScript data.
  const data = await response.json();

  console.log(data);
  return data;
}

// Retrieves a single post by its ID and returns it as an object.
export async function getSinglePost(postId) {
  // Prevent requests when no post ID is provided.
  if (!postId) {
    throw new Error('[getSinglePost]: postId parameter is required!');
  }

  console.log('[getSinglePost]: fetching post with id:', postId);
  // Build the endpoint URL for the requested post.
  const url = `${POSTS_ENDPOINT}${postId}`;
  const response = await fetch(url);

  // Throw an error if the server returns an unsuccessful HTTP status.
  if (!response.ok) {
    throw new Error(
      `[getSinglePost]: failed to fetch, HTTP error ${response.status}`
    );
  }

  // Parse the JSON response into a single post object.
  const data = await response.json();
  console.log(data);
  return data;
}
