import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div className="p-6 grid gap-6 grid-cols-2 md:grid-cols-4">
      {products.map(prod => (
        <Link key={prod._id} to={`/product/${prod._id}`}>
          <div className="bg-white shadow rounded p-2 hover:shadow-lg">
            <img src={prod.image} alt={prod.name} className="h-40 w-full object-contain" />
            <div className="font-bold mt-2">{prod.name}</div>
            <div className="text-gray-600">{prod.brand}</div>
            <div className="text-blue-600 mt-1">₹{prod.price}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}