import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const activeIdx = navLinks.findIndex((l) => l.to === location.pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const getIndicatorStyle = () => {
    const idx = hoveredIdx !== null ? hoveredIdx : activeIdx;
    const el = navRefs.current[idx];
    if (!el) return { width: 0, x: 0 };
    const parent = el.parentElement;
    if (!parent) return { width: 0, x: 0 };
    return {
      width: el.offsetWidth,
      x: el.offsetLeft,
    };
  };

  const indicator = getIndicatorStyle();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container-tight flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="font-heading font-bold text-lg tracking-tight text-foreground relative z-10">
          KDY<span className="text-accent">.</span>
        </Link>

        {/* Center pill nav */}
        <div className="hidden md:flex items-center">
          <div
            className={`relative flex items-center gap-1 px-1.5 py-1.5 rounded-full transition-all duration-500 ${
              scrolled ? "glass" : "bg-foreground/5 backdrop-blur-xl"
            }`}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Sliding indicator */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-accent/15"
              animate={{ x: indicator.x, width: indicator.width }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              style={{ left: 0 }}
            />
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                ref={(el) => { navRefs.current[i] = el; }}
                onMouseEnter={() => setHoveredIdx(i)}
                className={`relative z-10 text-sm font-medium px-5 py-2 rounded-full transition-colors duration-200 ${
                  location.pathname === link.to
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/cart" className="relative group p-2 rounded-full hover:bg-foreground/5 transition-colors">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <ShoppingCart className="w-5 h-5 text-foreground" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-3">
          <Link to="/cart" className="relative p-2">
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-full hover:bg-foreground/5 transition-colors">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mx-4 mt-2 glass rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-3 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium py-2.5 px-4 rounded-xl transition-colors ${
                    location.pathname === link.to
                      ? "text-accent bg-accent/10"
                      : "text-muted-foreground hover:bg-foreground/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
