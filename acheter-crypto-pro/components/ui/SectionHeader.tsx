"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function SectionHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow ? <Badge tone="premium" icon={Sparkles}>{eyebrow}</Badge> : null}
      <h2 className="mt-5 text-3xl font-extrabold leading-tight text-ink md:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-muted md:text-lg">{description}</p> : null}
    </motion.div>
  );
}
