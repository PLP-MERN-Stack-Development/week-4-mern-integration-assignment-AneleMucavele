import { useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { useBlog } from '../context/BlogContext';

const Home = () => {
  const { posts, loading, error } = useBlog();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-8">Loading posts...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Latest Posts</h1>
        <Link
          to="/posts/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create Post
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => <PostCard key={post._id} post={post} />)
        ) : (
          <div className="text-center py-8">
            {searchTerm ? 'No posts match your search' : 'No posts available'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;