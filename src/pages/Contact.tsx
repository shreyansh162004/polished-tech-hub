import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => (
  <div className="min-h-screen pt-20">
    <section className="section-padding">
      <div className="container-tight">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Get in Touch</h1>
          <p className="text-muted-foreground mt-3">Have questions? We're here to help you find the perfect laptop.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Phone, title: "Phone", value: "+91 97111 27853", href: "tel:+919711127853" },
            { icon: MessageCircle, title: "WhatsApp", value: "Chat with us", href: "https://wa.me/919711127853?text=Hi%20KDY%20InfoTech!" },
            { icon: Mail, title: "Email", value: "info@kdyinfotech.com", href: "mailto:info@kdyinfotech.com" },
            { icon: Clock, title: "Working Hours", value: "Mon–Sat: 10AM – 8PM", href: undefined },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-card text-center hover:shadow-card-hover transition-shadow"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
              {item.href ? (
                <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm text-accent hover:underline">
                  {item.value}
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">{item.value}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Big CTA */}
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mt-16 text-center">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="https://wa.me/919711127853?text=Hi!%20I%20need%20help%20with%20a%20laptop."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-semibold hover:brightness-110 transition-all shadow-lg shadow-accent/25"
          >
            <MessageCircle className="w-5 h-5" /> Start a Conversation
          </motion.a>
        </motion.div>
      </div>
    </section>
  </div>
);

export default Contact;
