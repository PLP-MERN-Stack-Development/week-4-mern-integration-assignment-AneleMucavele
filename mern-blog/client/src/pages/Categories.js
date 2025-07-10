import { useBlog } from '../context/BlogContext';

const Categories = () => {
  const { categories } = useBlog();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <div className="grid gap-4">
        {categories.map(category => (
          <div key={category._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{category.name}</h2>
            {category.description && (
              <p className="text-gray-600 mt-2">{category.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;