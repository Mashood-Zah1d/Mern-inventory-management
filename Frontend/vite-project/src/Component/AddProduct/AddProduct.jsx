import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input/Input.jsx";
import AddVariants from "../AddVariants/AddVariants.jsx";
import {useNavigate} from "react-router-dom";
function AddProduct() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [variants, setVariants] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const variantData = (data) => {
    console.log(data);
    
    setVariants((prev) => [...prev, data]);
    setDisplayForm(false);
  };

  const onSubmit = async (data) => {
    const productData = {
      ...data,
      variants,
    };
    try {
      const res = await fetch('http://localhost:8000/api/v1/product/addproduct',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(productData)
        })

        if (!res.ok) {
            const errData = await res.json();
            setError(errData);
            return;
        }
        
        const result = await res.json();
        console.log(result);
        setResponse(result.message);
        setTimeout(()=>{
        navigate('/barcode',{state:{product:result.data}})
        },1000)
        
    } catch (error) {
        setError(error.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <div className="w-400 max-w-lg bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Add Product
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <Input
            label="SKU"
            type="text"
            placeholder="Enter Product SKU"
            {...register("sku", { required: "SKU is required" })}
          />
          {errors.sku && <p className="text-red-500 text-sm">{errors.sku.message}</p>}

          <Input
            label="Title"
            type="text"
            placeholder="Enter Product Title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

          <Input
            label="Category"
            type="text"
            placeholder="Enter Product Category"
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

          <Input
            label="Brand"
            type="text"
            placeholder="Enter Product Brand"
            {...register("brand", { required: "Brand is required" })}
          />
          {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}

          <Input
            label="Price"
            type="number"
            placeholder="Enter Product Price"
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setDisplayForm(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              + Add Variant
            </button>
          </div>

          {displayForm && (
            <div className="mt-5 border-t pt-4">
              <AddVariants variantData={variantData} />
            </div>
          )}

          {variants.length > 0 && (
            <div className="mt-5">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Added Variants:</h2>
              <ul className="space-y-2">
                {variants.map((variant, index) => (
                  <li
                    key={index}
                    className="bg-gray-50 p-3 rounded-lg border text-sm text-gray-700"
                  >
                    <span className="font-semibold">Color:</span> {variant.color} |{" "}
                    <span className="font-semibold">Size:</span> {variant.size} |{" "}
                    <span className="font-semibold">Stock:</span> {variant.stock}
                  </li>
                ))}
              </ul>
            </div>
          )}
        
          {response && <p className="text-green-500">{response}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg mt-6 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
