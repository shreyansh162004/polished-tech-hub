import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { products, brands, categories, conditions } from "@/data/products";

const priceRanges = [
  { label: "Under ₹20,000", min: 0, max: 20000 },
  { label: "₹20K – ₹30K", min: 20000, max: 30000 },
  { label: "₹30K – ₹40K", min: 30000, max: 40000 },
  { label: "Above ₹40,000", min: 40000, max: 999999 },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Apply chatbot filters from URL params
  useEffect(() => {
    const brand = searchParams.get("brand");
    const category = searchParams.get("category");
    const budget = searchParams.get("budget");

    if (brand) setSelectedBrands([brand]);
    if (category) setSelectedCategories([category]);
    if (budget) {
      const [min, max] = budget.split("-").map(Number);
      const idx = priceRanges.findIndex((r) => r.min === min && r.max === max);
      if (idx >= 0) setSelectedPriceRange(idx);
    }
  }, [searchParams]);

  const toggle = (arr: string[], val: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedBrands.length) result = result.filter((p) => selectedBrands.includes(p.brand));
    if (selectedCategories.length) result = result.filter((p) => selectedCategories.includes(p.category));
    if (selectedConditions.length) result = result.filter((p) => selectedConditions.includes(p.condition));
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter((p) => p.price >= range.min && p.price <= range.max);
    }
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [selectedBrands, selectedCategories, selectedConditions, selectedPriceRange, sortBy]);

  const activeFilters = selectedBrands.length + selectedCategories.length + selectedConditions.length + (selectedPriceRange !== null ? 1 : 0);

  // Get "other suggestions" — products NOT matching current filters
  const otherSuggestions = useMemo(() => {
    if (activeFilters === 0) return [];
    const filteredIds = new Set(filtered.map((p) => p.id));
    return products.filter((p) => !filteredIds.has(p.id)).slice(0, 4);
  }, [filtered, activeFilters]);

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

  const PriceFilter = () => (
    <div className="mb-6">
      <h4 className="font-heading font-semibold text-sm text-foreground mb-3">Budget</h4>
      <div className="flex flex-wrap gap-2">
        {priceRanges.map((range, i) => (
          <motion.button
            key={range.label}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
              selectedPriceRange === i ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            {range.label}
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
            <PriceFilter />
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

            {/* Other suggestions when filters are active */}
            {otherSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16"
              >
                <div className="border-t border-border pt-10">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                    You might also like
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Explore other options — consider a different brand or slightly higher budget for more choices.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    {otherSuggestions.map((p, i) => (
                      <ProductCard key={p.id} product={p} index={i} />
                    ))}
                  </div>
                </div>
              </motion.div>
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
              <PriceFilter />
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
