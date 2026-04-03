import { motion } from "framer-motion";
import { Shield, Award, Heart, Users } from "lucide-react";
import InstagramSection from "@/components/InstagramSection";

const values = [
  { icon: Shield, title: "Quality First", desc: "Every device undergoes a rigorous 50-point quality check before reaching you." },
  { icon: Award, title: "Certified Products", desc: "All laptops come with genuine software licenses and verified hardware." },
  { icon: Heart, title: "Customer Love", desc: "We believe in building relationships, not just making sales." },
  { icon: Users, title: "Expert Team", desc: "Our technicians have 12+ years of experience in laptop refurbishment." },
];

const About = () => (
  <div className="min-h-screen pt-20">
    {/* Hero */}
    <section className="section-padding bg-gradient-to-br from-primary to-surface-dark">
      <div className="container-tight text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading font-bold text-3xl md:text-5xl text-primary-foreground mb-4 tracking-tight"
        >
          About KDY InfoTech
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-primary-foreground/60 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          We're on a mission to make premium technology accessible to everyone through quality-certified refurbished electronics.
        </motion.p>
      </div>
    </section>

    {/* Story */}
    <section className="section-padding">
      <div className="container-tight max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6 tracking-tight">Our Story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              KDY InfoTech was born from a simple belief: everyone deserves access to quality technology without breaking the bank. Founded over 12 years ago, we've grown from a small repair shop to one of India's most trusted names in refurbished electronics.
            </p>
            <p>
              We carefully source laptops from top brands like HP, Dell, and Lenovo, put them through rigorous testing and refurbishment, and deliver them with a warranty you can count on. Over 5,000 happy customers trust us for their computing needs.
            </p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding bg-secondary/40">
      <div className="container-tight">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-12 tracking-tight"
        >
          What We Stand For
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-card rounded-2xl p-7 text-center shadow-card hover:shadow-card-hover transition-shadow border border-border group"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/20 transition-colors">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Instagram */}
    <InstagramSection variant="about" />
  </div>
);

export default About;
