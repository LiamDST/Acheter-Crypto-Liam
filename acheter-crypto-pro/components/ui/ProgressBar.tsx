"use client";
import { motion } from "framer-motion";

export function ProgressBar({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`h-2 overflow-hidden rounded-full bg-line ${className}`}>
      <motion.div initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: 0.9, ease: "easeOut" }} className="h-full rounded-full bg-blue" />
    </div>
  );
}
