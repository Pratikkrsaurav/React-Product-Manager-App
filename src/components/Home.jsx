import React, { useContext, useState, useEffect } from "react";
import Nav from "../Nav";
import { Link, useLocation } from "react-router-dom";
import { productContext } from "../utils/Context";
import Loading from "../utils/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { products } = useContext(productContext);
  const { search } = useLocation();

  const categoryParam = search ? decodeURIComponent(search.split("=")[1]) : null;
  const category = categoryParam === "undefined" ? null : categoryParam;

  const [filteredProducts, setFilteredProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Search + Filter logic
  useEffect(() => {
    if (products) {
      let filtered = category
        ? products.filter((product) => product.category === category)
        : products;

      if (searchTerm.trim()) {
        filtered = filtered.filter((p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
      setCurrentPage(1); // Reset page on filter change
    }
  }, [products, category, searchTerm]);

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil((filteredProducts?.length || 0) / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    toast.info(`Page changed to ${page}`);
  };

  return filteredProducts ? (
    <>
      <ToastContainer />
      <Nav />

      <div className="w-[100%] px-10 pt-[5%]">
        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="mb-6 p-3 w-[50%] border border-blue-300 rounded shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* 🛒 Products Grid */}
        <div className="flex flex-wrap gap-5">
          {currentProducts.map((product) => (
            <Link
              key={product.id}
              to={`/details/${product.id}`}
              className="card p-5 border shadow rounded w-[18%] h-[35vh] flex justify-center items-center flex-col"
            >
              <div
                className="mb-2 w-full h-[80%] hover:scale-115 bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${product.image})` }}
              ></div>
              <h1 className="text-2xl font-semibold hover:text-blue-500">
                {product.title.length > 20
                  ? product.title.slice(0, 20) + "..."
                  : product.title}
              </h1>
            </Link>
          ))}
        </div>

        {/* 📄 Pagination Controls */}
        <div className="mt-6 flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded border ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 border-blue-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
