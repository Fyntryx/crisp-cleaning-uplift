"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import useScrollScale from "@/hooks/useScrollScale";
import { CTASection } from "@/components/CTASection";

const Contact = () => {
  const { ref: sectionRef, style: scaleStyle } = useScrollScale({
    threshold: 0.1,
  });

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-16 relative overflow-hidden"
      style={scaleStyle}>
      <div className="mb-12">
        <CTASection
          heading="Experience the Difference"
          description="Feel free to contact us to establish project details."
          primaryAction={{
            text: "Contact Us",
            href: "/contact",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Let's Start a <span className="text-gradient">Conversation</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Have questions or ready to book? We'd love to hear from you. Reach
              out and we'll respond as soon as possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium break-all">
                    crispcleaningmelbourne@outlook.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+61 (03) 1234 5678</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Melbourne, Australia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    First Name
                  </label>
                  <Input placeholder="John" className="h-12 rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Last Name
                  </label>
                  <Input placeholder="Doe" className="h-12 rounded-xl" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="h-12 rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="+61 400 000 000"
                  className="h-12 rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Message
                </label>
                <Textarea
                  placeholder="Tell us about your cleaning needs..."
                  className="min-h-[120px] rounded-xl resize-none"
                />
              </div>
              <Button variant="hero" size="lg" className="w-full">
                Send Message
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
