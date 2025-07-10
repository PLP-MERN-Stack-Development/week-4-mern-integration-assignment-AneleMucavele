import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Categories from './pages/Categories';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <BlogProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/posts/new" element={<CreatePost />} />
              <Route path="/posts/:id/edit" element={<EditPost />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </main>
        </div>
      </BlogProvider>
    </Router>
  );
}

export default App;