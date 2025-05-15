import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Details from './Details';
import Create from './components/Create';
import Edit from './components/Edit';

const App = () => {
  const { pathname, search } = useLocation();

  const showHomeLink = pathname !== '/' || search; // ✅

  return (
    <div className='h-screen w-full flex'>
      {showHomeLink && (
        <Link
        to="/"
        className="absolute left-[17%] top-[3%] bg-white text-blue-500 px-4 py-2 rounded-full shadow-md border border-blue-300 hover:bg-blue-100 hover:shadow-lg transition-all duration-300"
      >
        ⬅ Back to Home
      </Link>      
      )}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='create' element={<Create />} />
        <Route path='details/:id' element={<Details />} />
        <Route path='edit/:id' element={<Edit />} />

      </Routes>
    </div>
  );
};

export default App;
