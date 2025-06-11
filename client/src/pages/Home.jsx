import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Veri alınamadı:", err));
  }, []);

  // Tüm kategorileri ürünlerden çıkar (eşsiz olarak)
  const categories = [...new Set(products.map((p) => p.category))];

  // Kategoriye göre filtrele
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900 font-sans">
      {/* Üst Bar */}
      <nav className="bg-blue-700 text-white py-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">Dokusan Teknik ve Yedek Parça</h1>
          <nav className="space-x-6 text-sm">
            <a href="#" className="text-white hover:underline">Ana Sayfa</a>
            <a href="#" className="text-white hover:underline">Ürünler</a>
            <Link to="/login" className="text-white hover:underline">
              Giriş Yap
            </Link>
          </nav>
          <input
            type="text"
            placeholder="Ürün ara..."
            className="w-1/2 p-2 rounded border border-blue-200 text-blue-900 bg-white"
          />
        </div>
      </nav>

      {/* Ana İçerik */}
      <main className="container flex-grow mx-auto px-4 py-8 grid md:grid-cols-4 gap-6">
        {/* Sol Kategori Menüsü */}
        <aside className="md:col-span-1 bg-blue-50 border border-blue-200 p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Kategoriler</h2>
          <ul className="space-y-3 text-blue-800">
            <li>
              <button
                onClick={() => setSelectedCategory("")}
                className={`w-full text-left px-2 py-1 rounded bg-white text-black hover:bg-blue-100 transition ${
                  selectedCategory === "" ? "font-bold underline" : ""
                }`}
              >
                Tüm Ürünler
              </button>
            </li>
            {categories.map((cat, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-2 py-1 rounded bg-white text-black hover:bg-blue-100 transition ${
                    selectedCategory === cat ? "font-bold underline" : ""
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Ürünler */}
        <section className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-blue-100 rounded shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={product.image || "https://via.placeholder.com/400x250?text=Yedek+Parça"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                  <p className="text-sm text-blue-800 mb-3">
                    {product.description?.slice(0, 80)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 font-bold text-lg">
                      {product.price}₺
                    </span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-blue-600">Ürün bulunamadı.</p>
          )}
        </section>
      </main>

      <footer className="bg-blue-50 border-t mt-12 py-6 text-center text-sm text-blue-700">
        © 2025 Dokusan Teknik. Tüm hakları saklıdır.
      </footer>
    </div>
  );
};

export default Home;
