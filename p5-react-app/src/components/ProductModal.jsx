import { useEffect } from "react";

const ProductModal = ({ product, handleExit }) => {
  useEffect(() => {
    if (!product) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <img
          className="mx-auto w-40 rounded-full border-2 border-dashed border-amber-400 bg-amber-50 p-2"
          src={product.imageUrl[0].url}
          alt={product.name}
        />

        <div className="pt-4 text-center">
          <h2 className="text-2xl font-bold text-dark-leon-700">
            {product.name}
          </h2>
          <p className="pt-1 text-gray-500">{product.category}</p>
          <p className="pt-1 text-gray-500">{product.description}</p>
          <p className="pt-2 text-xl font-bold text-amber-700">
            P{product.price}
          </p>
        </div>

        <div className="pt-5 text-center">
          <button
            className="rounded-md bg-dark-leon-700 px-4 py-2 text-sm font-semibold text-white"
            onClick={handleExit}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
