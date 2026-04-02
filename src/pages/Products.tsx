import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, brands, categories, conditions } from "@/data/products";

const Products = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const toggle = (arr: string[], val: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedBrands.length) result = result.filter((p) => selectedBrands.includes(p.brand));
    if (selectedCategories.length) result = result.filter((p) => selectedCategories.includes(p.category));
    if (selectedConditions.length) result = result.filter((p) => selectedConditions.includes(p.condition));
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [selectedBrands, selectedCategories, selectedConditions, sortBy]);

  const activeFilters = selectedBrands.length + selectedCategories.length + selectedConditions.length;

  const FilterSection = ({ title, options, selected, setter }: { title: string; options: readonly string[]; selected: string[]; setter: React.Dispatch<React.SetStateAction<string[]>> }) => (
    <div className="mb-6">
      <h4 className="font-heading font-semibold text-sm text-foreground mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <motion.button
            key={opt}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggle(selected, opt, setter)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
              selected.includes(opt) ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20">
      <div className="container-tight px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">All Products</h1>
          <p className="text-muted-foreground mt-2">{filtered.length} laptops available</p>
        </motion.div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-56 shrink-0"
          >
            <FilterSection title="Brand" options={brands} selected={selectedBrands} setter={setSelectedBrands} />
            <FilterSection title="Category" options={categories} selected={selectedCategories} setter={setSelectedCategories} />
            <FilterSection title="Condition" options={conditions} selected={selectedConditions} setter={setSelectedConditions} />
          </motion.aside>

          {/* Main */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden inline-flex items-center gap-2 text-sm font-medium text-foreground bg-secondary px-4 py-2 rounded-full"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters {activeFilters > 0 && `(${activeFilters})`}
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm bg-secondary text-secondary-foreground px-4 py-2 rounded-full border-none outline-none cursor-pointer ml-auto"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={filtered.map((p) => p.id).join(",")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">No products match your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50" onClick={() => setShowFilters(false)} />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-card z-50 p-6 overflow-y-auto shadow-elevated"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-semibold text-foreground">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
              </div>
              <FilterSection title="Brand" options={brands} selected={selectedBrands} setter={setSelectedBrands} />
              <FilterSection title="Category" options={categories} selected={selectedCategories} setter={setSelectedCategories} />
              <FilterSection title="Condition" options={conditions} selected={selectedConditions} setter={setSelectedConditions} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
