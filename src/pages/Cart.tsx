import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, MessageCircle, ShoppingCart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const whatsappMsg = items.length
    ? `Hi KDY InfoTech! I'd like to order:\n\n${items.map((i) => `• ${i.product.name} (x${i.quantity}) — ₹${(i.product.price * i.quantity).toLocaleString()}`).join("\n")}\n\nTotal: ₹${totalPrice.toLocaleString()}`
    : "";

  return (
    <div className="min-h-screen pt-20">
      <div className="container-tight px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-8">Your Cart</h1>
        </motion.div>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="font-heading font-semibold text-xl text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Browse our collection and add some laptops!</p>
            <Link to="/products" className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all">
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    layout
                    className="flex gap-4 bg-card rounded-2xl p-4 border border-border shadow-card"
                  >
                    <Link to={`/products/${item.product.id}`} className="w-24 h-24 rounded-xl overflow-hidden bg-secondary shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/products/${item.product.id}`} className="font-heading font-semibold text-sm text-foreground hover:text-accent transition-colors line-clamp-1">
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.product.ram} · {item.product.storage}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-foreground"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </motion.button>
                          <span className="text-sm font-semibold text-foreground w-6 text-center">{item.quantity}</span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-foreground"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                        <span className="font-heading font-bold text-foreground">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors self-start p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:sticky lg:top-24 h-fit">
              <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                <h3 className="font-heading font-semibold text-foreground mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-accent font-medium">Free</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-heading font-bold text-lg text-foreground">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/919711127853?text=${encodeURIComponent(whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3.5 rounded-full font-semibold text-sm hover:brightness-110 transition-all shadow-lg shadow-accent/25"
                >
                  <MessageCircle className="w-5 h-5" /> Order on WhatsApp
                </motion.a>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
