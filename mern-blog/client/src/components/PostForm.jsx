import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  author: yup.string().required('Author is required'),
});

const PostForm = ({ onSubmit, initialData, categories }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      title: '',
      content: '',
      author: '',
      categories: []
    }
  });

  const [selectedCategories, setSelectedCategories] = useState(
    initialData?.categories?.map(c => c._id) || []
  );

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setSelectedCategories(initialData.categories?.map(c => c._id) || []);
    }
  }, [initialData, reset]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const onSubmitHandler = (data) => {
    onSubmit({ ...data, categories: selectedCategories });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          {...register('content')}
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Author</label>
        <input
          {...register('author')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categories</label>
        <div className="mt-2 space-y-2">
          {categories.map(category => (
            <div key={category._id} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category._id}`}
                checked={selectedCategories.includes(category._id)}
                onChange={() => handleCategoryChange(category._id)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={`category-${category._id}`} className="ml-2 text-sm text-gray-700">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {initialData ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
};

export default PostForm;