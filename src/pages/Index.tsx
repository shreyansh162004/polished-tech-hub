import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, Star, Shield, Truck, RefreshCw, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const stats = [
  { value: "5000+", label: "Happy Customers" },
  { value: "12+", label: "Years Experience" },
  { value: "4.8★", label: "Average Rating" },
  { value: "6 Mo", label: "Warranty" },
];

const trustPoints = [
  { icon: Shield, title: "Quality Assured", desc: "Every device tested with 50+ point checklist" },
  { icon: RefreshCw, title: "Easy Returns", desc: "7-day no-questions-asked return policy" },
  { icon: Truck, title: "Fast Delivery", desc: "Free shipping across India" },
  { icon: Star, title: "Top Rated", desc: "4.8★ rating from 5000+ customers" },
];

const Home = () => {
  const featured = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary via-primary to-surface-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/50 rounded-full blur-3xl" />
        </div>
        <div className="container-tight px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Trusted by 5000+ customers
              </span>
            </motion.div>
            <motion.h1
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.1] mb-6"
            >
              Premium Refurbished
              <br />
              <span className="text-accent">Laptops</span> & Electronics
            </motion.h1>
            <motion.p
              initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="text-primary-foreground/70 text-lg md:text-xl max-w-xl mb-8 leading-relaxed"
            >
              Get top-brand laptops at up to 60% off — tested, certified, and backed by our 6-month warranty.
            </motion.p>
            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={3}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/919711127853?text=Hi%20KDY%20InfoTech!%20I'm%20interested%20in%20your%20refurbished%20laptops."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-full font-semibold text-sm hover:brightness-110 transition-all shadow-lg shadow-accent/25"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </motion.a>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground px-7 py-3.5 rounded-full font-semibold text-sm border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all"
                >
                  Explore Products <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-b border-border">
        <div className="container-tight px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-heading font-bold text-2xl md:text-3xl text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section-padding bg-secondary/50">
        <div className="container-tight">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Why Choose Us</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">We don't just sell laptops — we deliver trust, quality, and peace of mind.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover transition-shadow border border-border"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container-tight">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Featured Laptops</h2>
              <p className="text-muted-foreground mt-2">Handpicked deals on top brands</p>
            </div>
            <Link to="/products" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          <div className="sm:hidden mt-6 text-center">
            <Link to="/products" className="text-sm font-medium text-accent hover:underline">View All Products →</Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-surface-dark p-8 md:p-14"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-80 h-80 bg-accent rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 max-w-xl">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-4">
                Can't find what you need?
              </h2>
              <p className="text-primary-foreground/70 mb-6">
                Tell us your requirements and we'll find the perfect laptop for you. Chat with us on WhatsApp for instant help!
              </p>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/919711127853?text=Hi!%20I%20need%20help%20finding%20a%20laptop."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-full font-semibold text-sm hover:brightness-110 transition-all shadow-lg shadow-accent/25"
              >
                <MessageCircle className="w-5 h-5" /> Chat Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
