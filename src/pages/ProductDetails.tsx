import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle, ArrowLeft, Star, Check } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading font-bold text-2xl text-foreground mb-4">Product Not Found</h1>
          <Link to="/products" className="text-accent hover:underline">← Back to Products</Link>
        </div>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const whatsappMsg = `Hi! I'm interested in the ${product.name} (₹${product.price.toLocaleString()}). Is it available?`;
  const related = products.filter((p) => p.brand === product.brand && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container-tight px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-secondary rounded-3xl overflow-hidden aspect-square mb-4">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    i === selectedImage ? "border-accent" : "border-border"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{product.brand} · {product.category}</span>
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mt-2">{product.name}</h1>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold text-foreground">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              <span className="bg-accent/10 text-accent text-xs font-semibold px-2 py-0.5 rounded-full">{product.condition}</span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-heading font-bold text-3xl text-foreground">₹{product.price.toLocaleString()}</span>
              <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="bg-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-full">{discount}% OFF</span>
            </div>

            <p className="text-muted-foreground mt-4 leading-relaxed">{product.description}</p>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                { label: "Processor", value: product.processor },
                { label: "RAM", value: product.ram },
                { label: "Storage", value: product.storage },
                { label: "Screen", value: product.screenSize },
              ].map((s) => (
                <div key={s.label} className="bg-secondary rounded-xl p-3">
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                  <div className="text-sm font-semibold text-foreground">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Detailed Specs */}
            <div className="mt-6 border-t border-border pt-6">
              <h3 className="font-heading font-semibold text-foreground mb-3">Specifications</h3>
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-sm py-1.5 border-b border-border/50 last:border-0">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium text-foreground">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sticky bottom-4 z-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdd}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm transition-all ${
                  added ? "bg-accent text-accent-foreground" : "bg-foreground text-background hover:opacity-90"
                }`}
              >
                {added ? <><Check className="w-5 h-5" /> Added!</> : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/919711127853?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3.5 rounded-full font-semibold text-sm hover:brightness-110 transition-all shadow-lg shadow-accent/25"
              >
                <MessageCircle className="w-5 h-5" /> Buy on WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-heading font-bold text-2xl text-foreground mb-6">More from {product.brand}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
