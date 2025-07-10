import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold mb-2">
        <Link to={`/posts/${post._id}`} className="hover:text-blue-600">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600 mb-2">By {post.author}</p>
      <p className="text-gray-700 line-clamp-2">{post.content}</p>
      <div className="mt-3 flex justify-between items-center">
        <div className="flex space-x-2">
          {post.categories?.map(category => (
            <span key={category._id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {category.name}
            </span>
          ))}
        </div>
        <Link 
          to={`/posts/${post._id}`} 
          className="text-blue-600 hover:underline"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default PostCard;