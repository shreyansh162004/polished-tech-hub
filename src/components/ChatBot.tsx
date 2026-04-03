import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Bot, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { brands, categories } from "@/data/products";

type Step = "greeting" | "budget" | "brand" | "category" | "done";

interface ChatState {
  budget?: string;
  brand?: string;
  category?: string;
}

const budgetOptions = [
  { label: "Under ₹20,000", min: 0, max: 20000 },
  { label: "₹20,000 – ₹30,000", min: 20000, max: 30000 },
  { label: "₹30,000 – ₹40,000", min: 30000, max: 40000 },
  { label: "Above ₹40,000", min: 40000, max: 999999 },
  { label: "Any Budget", min: 0, max: 999999 },
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("greeting");
  const [state, setState] = useState<ChatState>({});
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([]);
  const navigate = useNavigate();

  const reset = () => {
    setStep("greeting");
    setState({});
    setMessages([]);
  };

  const addMessages = (bot: string, user?: string) => {
    setMessages((prev) => {
      const next = [...prev];
      if (user) next.push({ from: "user", text: user });
      next.push({ from: "bot", text: bot });
      return next;
    });
  };

  const handleStart = () => {
    setStep("budget");
    addMessages("What's your budget range? 💰");
  };

  const handleBudget = (opt: typeof budgetOptions[number]) => {
    setState((s) => ({ ...s, budget: `${opt.min}-${opt.max}` }));
    setStep("brand");
    addMessages("Any preferred brand? 🏷️", opt.label);
  };

  const handleBrand = (brand: string) => {
    setState((s) => ({ ...s, brand }));
    setStep("category");
    addMessages("What type of laptop? 💻", brand);
  };

  const handleCategory = (cat: string) => {
    setState((s) => ({ ...s, category: cat }));
    setStep("done");
    addMessages("Great choices! Let me find the best matches for you. 🎯", cat);

    // Navigate with filters
    const params = new URLSearchParams();
    if (state.budget) params.set("budget", state.budget);
    if (state.brand && state.brand !== "Any Brand") params.set("brand", state.brand);
    if (cat !== "Any Type") params.set("category", cat);
    
    setTimeout(() => {
      navigate(`/products?${params.toString()}`);
      setOpen(false);
      reset();
    }, 1500);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => { setOpen(true); if (step === "greeting") handleStart(); }}
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg glow-accent ${open ? "hidden" : ""}`}
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-6 left-6 z-50 w-80 max-h-[480px] bg-card rounded-2xl shadow-elevated border border-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-accent/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm text-foreground">KDY Assistant</p>
                  <p className="text-[11px] text-muted-foreground">Find your perfect laptop</p>
                </div>
              </div>
              <button onClick={() => { setOpen(false); reset(); }} className="p-1 rounded-full hover:bg-muted transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-muted rounded-2xl rounded-bl-md px-3 py-2 text-sm text-foreground max-w-[85%]"
              >
                👋 Hey! I'm your KDY assistant. Let me help you find the perfect laptop!
              </motion.div>

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.from === "bot" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`rounded-2xl px-3 py-2 text-sm max-w-[85%] ${
                    msg.from === "bot"
                      ? "bg-muted text-foreground rounded-bl-md"
                      : "bg-accent text-accent-foreground rounded-br-md ml-auto"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>

            {/* Options */}
            <div className="p-3 border-t border-border space-y-2">
              {step === "budget" && budgetOptions.map((opt) => (
                <motion.button
                  key={opt.label}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleBudget(opt)}
                  className="w-full text-left text-sm px-3 py-2 rounded-xl bg-secondary hover:bg-muted transition-colors flex items-center justify-between group"
                >
                  {opt.label} <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                </motion.button>
              ))}

              {step === "brand" && [...brands, "Any Brand" as const].map((b) => (
                <motion.button
                  key={b}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleBrand(b)}
                  className="w-full text-left text-sm px-3 py-2 rounded-xl bg-secondary hover:bg-muted transition-colors flex items-center justify-between group"
                >
                  {b} <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                </motion.button>
              ))}

              {step === "category" && [...categories, "Any Type" as const].map((c) => (
                <motion.button
                  key={c}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleCategory(c)}
                  className="w-full text-left text-sm px-3 py-2 rounded-xl bg-secondary hover:bg-muted transition-colors flex items-center justify-between group"
                >
                  {c} <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                </motion.button>
              ))}

              {step === "done" && (
                <div className="text-center text-xs text-muted-foreground py-2">
                  Finding your matches...
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
