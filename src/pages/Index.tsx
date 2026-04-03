import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, Star, Shield, Truck, RefreshCw, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import InstagramSection from "@/components/InstagramSection";
import { products } from "@/data/products";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }),
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
  const heroRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // Page-level scroll for background color morphing
  const { scrollYProgress: pageScroll } = useScroll();
  const bgHue = useTransform(pageScroll, [0, 0.3, 0.6, 1], [230, 220, 200, 240]);
  const bgLightness = useTransform(pageScroll, [0, 0.3, 0.5, 0.8, 1], [10, 97, 95, 8, 97]);
  const textIsDark = useTransform(pageScroll, (v) => v > 0.05 && v < 0.75);

  return (
    <div ref={pageRef} className="min-h-screen overflow-hidden">
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center bg-gradient-to-br from-primary via-primary to-surface-dark overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-accent/8 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className="container-tight px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-8 border border-accent/20">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Trusted by 5000+ customers
              </span>
            </motion.div>

            <motion.h1
              initial="hidden" animate="visible" variants={fadeUp} custom={0.5}
              className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-[1.02] mb-3 tracking-tight"
            >
              KDY <span className="text-accent">InfoTech</span>
            </motion.h1>

            <motion.h2
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-primary-foreground/80 leading-tight mb-6 tracking-tight"
            >
              Premium Refurbished
              <br />
              <span className="text-accent">Laptops</span> & Electronics
            </motion.h2>
            <motion.p
              initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="text-primary-foreground/60 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
            >
              Get top-brand laptops at up to 60% off — tested, certified, and backed by our 6-month warranty.
            </motion.p>
            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={3}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px hsl(152 68% 42% / 0.3)" }}
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/919711127853?text=Hi%20KDY%20InfoTech!%20I'm%20interested%20in%20your%20refurbished%20laptops."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-semibold text-sm transition-all glow-accent"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </motion.a>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground px-8 py-4 rounded-full font-semibold text-sm border border-primary-foreground/15 hover:bg-primary-foreground/15 transition-all backdrop-blur-sm"
                >
                  Explore Products <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary-foreground/20 flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-primary-foreground/40 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats with scroll-triggered bg morph */}
      <motion.section
        className="border-b border-border relative transition-colors duration-700"
        style={{
          backgroundColor: useTransform(
            pageScroll,
            [0.05, 0.15],
            ["hsl(0 0% 100%)", "hsl(220 20% 97%)"]
          ),
        }}
      >
        <div className="container-tight px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <div className="font-heading font-bold text-3xl md:text-4xl text-foreground tracking-tight">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Trust */}
      <section className="section-padding bg-secondary/40">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground tracking-tight">Why Choose Us</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">We don't just sell laptops — we deliver trust, quality, and peace of mind.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trustPoints.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-card rounded-2xl p-7 text-center shadow-card hover:shadow-card-hover transition-shadow border border-border group"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/20 transition-colors">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products with dark section morph */}
      <section className="section-padding bg-gradient-to-b from-background via-secondary/30 to-background">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground tracking-tight">Featured Laptops</h2>
              <p className="text-muted-foreground mt-2">Handpicked deals on top brands</p>
            </div>
            <Link to="/products" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={p} index={i} />
              </motion.div>
            ))}
          </div>
          <div className="sm:hidden mt-6 text-center">
            <Link to="/products" className="text-sm font-medium text-accent hover:underline">View All Products →</Link>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <InstagramSection variant="home" />

      {/* CTA Banner - dark morph */}
      <section className="section-padding">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-surface-dark p-10 md:p-16"
          >
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: "linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }} />
            </div>
            <div className="relative z-10 max-w-xl">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-4 tracking-tight">
                Can't find what you need?
              </h2>
              <p className="text-primary-foreground/60 mb-8 leading-relaxed">
                Tell us your requirements and we'll find the perfect laptop for you. Chat with us on WhatsApp for instant help!
              </p>
              <motion.a
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px hsl(152 68% 42% / 0.3)" }}
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/919711127853?text=Hi!%20I%20need%20help%20finding%20a%20laptop."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-semibold text-sm transition-all glow-accent"
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
