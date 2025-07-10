import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { useEffect } from 'react';

const PostDetail = () => {
  const { id } = useParams();
  const { posts, loading, error, removePost } = useBlog();
  const navigate = useNavigate();
  
  const post = posts.find(p => p._id === id);

  useEffect(() => {
    if (!post && !loading && posts.length > 0) {
      navigate('/');
    }
  }, [post, loading, posts, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await removePost(id);
        navigate('/');
      } catch (err) {
        console.error('Failed to delete post:', err);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  if (!post) return <div className="text-center py-8">Post not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <div className="flex space-x-2">
            <Link
              to={`/posts/${post._id}/edit`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-64 object-cover rounded mb-6"
          />
        )}

        <div className="flex space-x-2 mb-6">
          {post.categories?.map(category => (
            <span
              key={category._id}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
            >
              {category.name}
            </span>
          ))}
        </div>

        <div className="prose max-w-none">
          <p className="whitespace-pre-line">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;