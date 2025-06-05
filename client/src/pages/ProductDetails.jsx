import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProd(res.data));
  }, [id]);

  const handleAddToCart = async () => {
    await axios.post(
      "http://localhost:5000/api/cart/add",
      { productId: prod._id, quantity },
      { withCredentials: true }
    );
    alert("Added to cart!");
  };

  const handleBuyNow = async () => {
    // Call API to create order & get Stripe session URL
    const res = await axios.post(
      "http://localhost:5000/api/orders/buy-now",
      { productId: prod._id, quantity },
      { withCredentials: true }
    );
    window.location.href = res.data.sessionUrl; // Redirect to Stripe
  };

  if (!prod) return <div>Loading...</div>;
  return (
    <div className="p-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
      <img src={prod.image} alt={prod.name} className="h-80 w-80 object-contain bg-gray-50 rounded" />
      <div>
        <div className="text-3xl font-bold mb-2">{prod.name}</div>
        <div className="text-gray-500 mb-2">{prod.brand}</div>
        <div className="text-lg mb-4">Category: {prod.category}</div>
        <div className="text-2xl text-blue-600 mb-4">₹{prod.price}</div>
        <div className="mb-4">{prod.description}</div>
        <div className="flex items-center mb-6">
          <label className="mr-2">Quantity:</label>
          <input type="number" min="1" value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            className="border w-16 p-1 rounded" />
        </div>
        <div className="flex gap-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}