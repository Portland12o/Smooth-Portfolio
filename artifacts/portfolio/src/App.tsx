import React from "react";
import { Navbar } from "./components/Navbar";
import { CustomCursor } from "./components/CustomCursor";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
