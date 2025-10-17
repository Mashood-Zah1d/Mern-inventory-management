import React, { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Barcode from "react-barcode";
function Barcodes() {
    const location = useLocation();
    const {product} = location.state;
    const barcodeRefs = useRef([]);
    const handleDownload = (index, code) => {
    const canvas = barcodeRefs.current[index].querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${code}.png`;
    a.click();
  };
  return (
     <div className="min-h-screen bg-gradient-to-br py-10 px-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Barcodes for Variants
      </h1>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Product: <span className="text-indigo-600">{product?.title}</span>
        </h2>

        {product?.Variants?.map((variant, index) => (
          <div 
            key={index} 
            className="flex justify-between items-center border-b py-4 last:border-none"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">Variant Details</h3>
              <p className="text-gray-600"><span className="font-medium">Color:</span> {variant.color}</p>
              <p className="text-gray-600"><span className="font-medium">Size:</span> {variant.size}</p>
              <p className="text-gray-600"><span className="font-medium">Stock:</span> {variant.stock}</p>
            </div>

            <div className="flex flex-col items-center" ref={(el)=>(barcodeRefs.current[index]=el)}>
              <Barcode value={`${variant.barcode}`} />
              <p className="text-xs text-gray-500 mt-2">Code: {variant.barcode}</p>
               <button onClick={() => handleDownload(index, variant.barcode)}>
            Download
          </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Barcodes