import type { BuilderInput, BuilderResult } from "@/types/builder";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "ai";
  text: string;
  id: string;
}

function getAIResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("add") && (q.includes("floor") || q.includes("storey"))) {
    return "I've noted your request to add a floor. I recommend updating your BuilderForm to increment floors by 1. Would you like me to calculate the additional cost? Rough estimate: +₹8–12L per floor for a 1500 sqft footprint.";
  }
  if (
    q.includes("reduce cost") ||
    q.includes("cheaper") ||
    q.includes("cost less") ||
    q.includes("save")
  ) {
    return "To reduce costs by ~10%, consider: (1) AAC blocks instead of red brick (−8%), (2) ceramic tiles instead of marble flooring (−5%), (3) standard grade steel instead of premium grade. These changes can save ₹1.2–1.8L on a 1500 sqft home.";
  }
  if (
    q.includes("make modern") ||
    q.includes("contemporary") ||
    q.includes("more modern")
  ) {
    return "Modern style elements: flat roof ✓, large glass windows, minimal external ornamentation, concrete + glass facade. Your current design uses a traditional approach — I'd suggest updating style to 'Modern' in the form and selecting the 'Glass & Concrete' material preset.";
  }
  if (
    q.includes("foundation cost") ||
    q.includes("cost of foundation") ||
    q.includes("foundation price")
  ) {
    return "Foundation cost for your project: Excavation ₹28,000 + PCC ₹15,000 + Footings/Raft ₹1,12,000 + Waterproofing ₹18,000 = Total ₹1,73,000 (~16% of total structure cost).";
  }
  if (
    q.includes("electrical") ||
    q.includes("wiring") ||
    q.includes("circuit")
  ) {
    return "Electrical plan: 8 circuits recommended for 1500 sqft (Lighting×3, Power×3, Kitchen×1, AC×1). Estimated: 420m of wire, 24 points, 1 ELCB + 8 MCBs. Cost: ₹85,000–₹1,10,000 including panels and fixtures.";
  }
  if (q.includes("vastu") || q.includes("vaastu")) {
    return "Key Vastu guidelines: main entrance N or NE (best), kitchen in SE, master bedroom SW, pooja room NE, avoid bedroom in SW corner for children. Use LocationOptimization tool for detailed Vastu recommendations.";
  }
  if (q.includes("material") || q.includes("cement") || q.includes("steel")) {
    return "For a standard 30×50 ft G+1 house: Cement ~450 bags, Steel ~3200 kg, AAC Blocks ~85 m³, Sand ~45 m³, Aggregate ~60 m³. See the Detailed BOQ panel for full quantities and current market prices.";
  }
  return "I can help with floor additions, cost reduction, style updates, foundation details, material quantities, electrical planning, and Vastu guidelines. What would you like to know?";
}

interface Props {
  result?: BuilderResult;
  input?: BuilderInput;
}

export function AIAssistant({ result: _result, input: _input }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hello! I'm your Nirman AI Assistant. Ask me about adding floors, reducing costs, style updates, or improving your design.",
      id: "welcome",
    },
  ]);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [open]);

  function handleSend() {
    const text = draft.trim();
    if (!text) return;
    const userMsg: Message = { role: "user", text, id: `u-${Date.now()}` };
    const aiResponse: Message = {
      role: "ai",
      text: getAIResponse(text),
      id: `a-${Date.now()}`,
    };
    setMessages((prev) => [...prev, userMsg, aiResponse]);
    setDraft("");
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            data-ocid="ai_assistant.open_modal_button"
            aria-label="Open AI Assistant"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent text-accent-foreground rounded-full shadow-2xl flex items-center justify-center hover:opacity-90 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.3, 0, 0.4, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-2rem)] h-[400px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            data-ocid="ai_assistant.dialog"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground flex-shrink-0">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                <span className="text-sm font-semibold font-display">
                  Nirman AI Assistant
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 rounded-md hover:bg-primary-foreground/10 transition-smooth"
                aria-label="Close assistant"
                data-ocid="ai_assistant.close_button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm border border-border"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-2.5 border-t border-border bg-card flex-shrink-0">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about floors, costs, materials..."
                className="flex-1 text-xs bg-input border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-smooth"
                data-ocid="ai_assistant.input"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!draft.trim()}
                className="w-8 h-8 flex items-center justify-center bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-smooth disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                aria-label="Send message"
                data-ocid="ai_assistant.send_button"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
