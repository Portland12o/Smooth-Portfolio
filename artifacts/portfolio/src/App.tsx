import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { CustomCursor } from "./components/CustomCursor";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { LoadingScreen } from "./components/LoadingScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <CustomCursor />
            <Navbar />
            <main className="w-full flex flex-col bg-background selection:bg-primary selection:text-primary-foreground">
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Contact />
            </main>
            <Toaster />
          </motion.div>
        )}
      </AnimatePresence>
    </QueryClientProvider>
  );
}

export default App;
