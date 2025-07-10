import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import PostForm from '../components/PostForm';
import * as api from '../services/api';

const EditPost = () => {
  const { id } = useParams();
  const { posts, updatePostInList, categories } = useBlog();
  const navigate = useNavigate();
  
  const post = posts.find(p => p._id === id);

  const handleSubmit = async (postData) => {
    try {
      const response = await api.updatePost(id, postData);
      updatePostInList(response.data);
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error('Failed to update post:', err);
    }
  };

  if (!post) return <div className="text-center py-8">Loading post...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <PostForm 
        onSubmit={handleSubmit} 
        initialData={post} 
        categories={categories} 
      />
    </div>
  );
};

export default EditPost;