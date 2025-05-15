import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Loading from './utils/Loading';
import { productContext } from './utils/Context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Details = () => {
  const { products, setProducts } = useContext(productContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (products) {
      const foundProduct = products.find((p) => String(p.id) === id);
      setProduct(foundProduct);
    }
  }, [products, id]);

  const deleteProduct = (id) => {
    const filteredProducts = products.filter(p => String(p.id) !== id);
    setProducts(filteredProducts);
    localStorage.setItem("products", JSON.stringify(filteredProducts));
    navigate("/");
    toast.success("Product deleted successfully!");
  };

  if (!product) return <Loading />;

  return (
    <div className='w-[70%] flex items-center justify-between h-full m-auto p-[10%] gap-7'>
      <ToastContainer />
      <img className='w-[60%] h-[90%] object-contain' src={product.image} alt={product.title} />
      <div className='content'>
        <h1 className='text-4xl font-semibold mb-5'>{product.title}</h1>
        <h3 className='text-zinc-400 text-2xl mb-2'>{product.category}</h3>
        <h2 className='text-red-300 text-2xl mb-2'>$ {product.price}</h2>
        <p className='mb-[5%]'>{product.description}</p>
        
        <Link 
          to={`/edit/${product.id}`} 
          className='py-3 px-5 border rounded mb-3 border-blue-300 text-blue-400 mr-5 inline-block'
        >
          Edit
        </Link>

        <button
          onClick={() => deleteProduct(product.id)}
          className='py-3 px-5 border rounded mb-3 border-red-300 text-red-400'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Details;
