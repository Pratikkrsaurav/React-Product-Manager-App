import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productContext } from './utils/Context';

const Nav = () => {
  const { products } = useContext(productContext);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  const categoryImages = {};
  if (products) {
    products.forEach(product => {
      if (!categoryImages[product.category]) {
        categoryImages[product.category] = product.image;
      }
    });
  }

  let distinct_category = products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];

  const filteredCategories = distinct_category.filter(category =>
    category.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <nav className='w-full sm:w-[15%] h-auto sm:h-full bg-zinc-100 flex sm:flex-col items-center p-4 gap-4 sm:pt-5 overflow-x-auto sm:overflow-y-auto'>
      <Link
        className='py-3 px-5 border rounded border-blue-300 text-blue-500 hover:bg-blue-100 transition'
        to="/create"
      >
        ➕ Add Product
      </Link>
      <hr className='w-full sm:w-[80%]' />
      <h1 className='text-xl sm:text-2xl font-semibold mb-3'>Categories</h1>

      <input
        type='text'
        placeholder='Search category...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-full sm:w-[80%] p-2 rounded border border-zinc-300 mb-3 text-sm'
      />

      <div className='w-full sm:w-[80%] flex flex-wrap sm:flex-col gap-3'>
        {filteredCategories.length ? (
          filteredCategories.map((category, index) => (
            <Link
              key={index}
              to={`/?category=${encodeURIComponent(category)}`}
              className='flex items-center gap-2 p-2 rounded hover:bg-blue-100 transition border border-zinc-200 bg-white shadow w-full sm:w-auto'
            >
              <img
                src={categoryImages[category] || '/icons/default.svg'}
                alt={category}
                className='w-8 h-8 object-contain rounded-full'
              />
              <span className='capitalize'>{category}</span>
            </Link>
          ))
        ) : (
          <p className='text-gray-400 text-sm italic'>No categories found</p>
        )}
      </div>
    </nav>
  );
};

export default Nav;