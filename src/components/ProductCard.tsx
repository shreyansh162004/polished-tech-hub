import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { addToCart } = useCart();

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/products/${product.id}`} className="group block">
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-border"
        >
          {/* Image */}
          <div className="relative overflow-hidden aspect-[4/3] bg-secondary">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-full">
              {discount}% OFF
            </div>
            <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-foreground">
              {product.condition}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{product.brand}</p>
            <h3 className="font-heading font-semibold text-sm text-foreground group-hover:text-accent transition-colors line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mt-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium text-foreground">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs text-muted-foreground">{product.ram}</span>
              <span className="text-muted-foreground/40">•</span>
              <span className="text-xs text-muted-foreground">{product.storage}</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div>
                <span className="font-heading font-bold text-lg text-foreground">₹{product.price.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="bg-accent text-accent-foreground p-2 rounded-full hover:brightness-110 transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
