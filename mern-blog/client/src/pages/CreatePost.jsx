import { useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import PostForm from '../components/PostForm';
import * as api from '../services/api';

const CreatePost = () => {
  const { addPost, categories } = useBlog();
  const navigate = useNavigate();

  const handleSubmit = async (postData) => {
    try {
      const response = await api.createPost(postData);
      addPost(response.data);
      navigate('/');
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <PostForm onSubmit={handleSubmit} categories={categories} />
    </div>
  );
};

export default CreatePost;