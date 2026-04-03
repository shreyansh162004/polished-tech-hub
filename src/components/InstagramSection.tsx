import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";

const INSTA_URL = "https://www.instagram.com/kdy_infotech?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

const posts = [
  { id: 1, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop" },
  { id: 2, img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop" },
  { id: 3, img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop" },
  { id: 4, img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop" },
  { id: 5, img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop" },
  { id: 6, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop" },
];

const InstagramSection = ({ variant = "home" }: { variant?: "home" | "about" }) => (
  <section className={`section-padding ${variant === "about" ? "" : "bg-secondary/50"}`}>
    <div className="container-tight">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <Instagram className="w-4 h-4" /> Follow us on Instagram
        </div>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
          @kdy_infotech
        </h2>
        <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
          Stay updated with our latest arrivals, deals, and behind-the-scenes content.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {posts.map((post, i) => (
          <motion.a
            key={post.id}
            href={INSTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="group relative aspect-square rounded-2xl overflow-hidden"
          >
            <img
              src={post.img}
              alt="Instagram post"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-300 flex items-center justify-center">
              <Instagram className="w-8 h-8 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-8"
      >
        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          href={INSTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-background px-7 py-3 rounded-full font-semibold text-sm hover:brightness-110 transition-all shadow-lg"
        >
          <Instagram className="w-5 h-5" /> Follow @kdy_infotech <ExternalLink className="w-3.5 h-3.5" />
        </motion.a>
      </motion.div>
    </div>
  </section>
);

export default InstagramSection;
