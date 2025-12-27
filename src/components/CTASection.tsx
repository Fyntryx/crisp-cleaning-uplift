"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAAction {
  text: string;
  href: string;
}

interface CTASectionProps {
  heading: string;
  description: string;
  primaryAction: CTAAction;
  secondaryAction?: CTAAction;
}

export const CTASection = ({
  heading,
  description,
  primaryAction,
  secondaryAction,
}: CTASectionProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent p-12 md:p-16 overflow-hidden shadow-xl text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              {heading}
            </h2>
            <p className="text-white/90 text-lg mb-8">{description}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={primaryAction.href}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl shadow-xl">
                  {primaryAction.text} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              {secondaryAction && (
                <Link href={secondaryAction.href}>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl shadow-xl">
                    {secondaryAction.text}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
