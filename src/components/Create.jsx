import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { productContext } from "../utils/Context";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
  const { products, setProducts } = useContext(productContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const addProductHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 3 ||
      price.trim().length < 1 ||
      description.trim().length < 10
    ) {
      toast.error("Please fill all the fields correctly");
      return;
    }

    const newProduct = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };

    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
    toast.success("Product added successfully!");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <form
      onSubmit={addProductHandler}
      className="p-[5%] w-screen h-screen flex flex-col items-center bg-white overflow-y-auto"
    >
      <ToastContainer />
      <h1 className="w-[40%] text-3xl font-semibold mb-6 text-blue-600">
        Add New Product
      </h1>

      {/* Inputs remain the same */}
      <input
        type="url"
        placeholder="Image link"
        className="w-[40%] text-lg bg-zinc-100 p-2 border border-blue-300 rounded-md mb-4"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="Title"
        className="w-[40%] text-lg bg-zinc-100 p-2 border border-blue-300 rounded-md mb-4"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <div className="w-[40%] flex justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Category"
          className="w-1/2 text-lg bg-zinc-100 p-2 border border-blue-300 rounded-md"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <input
          type="number"
          placeholder="Price"
          className="w-1/2 text-lg bg-zinc-100 p-2 border border-blue-300 rounded-md"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        placeholder="Enter product description here..."
        className="w-[40%] text-lg bg-zinc-100 p-2 border border-blue-300 rounded-md mb-5"
        rows="6"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      ></textarea>

      <button
        type="submit"
        className="py-3 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
      >
        Add Product
      </button>
    </form>
  );
};

export default Create;
