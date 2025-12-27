"use client";

import React from "react";
import Footer from "@/components/Footer";
import ParallaxBubbles from "@/components/ParallaxBubbles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Mail,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
import useScrollScale from "@/hooks/useScrollScale";

import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

const ContactPage = () => {
  const { ref: contactContentRef, style: contactContentStyle } = useScrollScale(
    { threshold: 0.1 }
  );

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        <ParallaxBubbles />

        <PageHero
          badge="Get In Touch"
          title="Communication is everything"
          description="We have a record of answering everything in 24 hours or less."
        />

        <section className="relative py-20 -mt-10 z-20">
          <div
            ref={contactContentRef as React.RefObject<HTMLDivElement>}
            style={contactContentStyle}
            className="container mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2 space-y-6">
                <div className="glass-card rounded-2xl p-6 hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Working Hours</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        We're here to help
                      </p>
                      <div className="text-foreground font-medium space-y-1">
                        <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-lg mb-1">Email Us</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        We'll respond within 24 hours
                      </p>
                      <a
                        href="mailto:crispcleaningmelbourne@outlook.com"
                        className="text-primary font-medium hover:underline break-all">
                        crispcleaningmelbourne@outlook.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Call Us</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        Mon-Fri from 8am to 5pm
                      </p>
                      <a
                        href="tel:+61451433786"
                        className="text-primary font-medium hover:underline">
                        +61 451 433 786
                      </a>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Socials</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        Follow us on social media
                      </p>

                      <div className="flex items-center gap-3">
                        <a
                          href="#"
                          className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors text-primary group"
                          aria-label="Instagram">
                          <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </a>
                        <a
                          href="#"
                          className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors text-primary group"
                          aria-label="Facebook">
                          <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </a>
                        <a
                          href="#"
                          className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors text-primary group"
                          aria-label="LinkedIn">
                          <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="glass-card rounded-3xl p-8 md:p-12 shadow-xl border border-border/50">
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
                      Send us a Message
                    </h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you shortly.
                    </p>
                  </div>

                  <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          First Name
                        </label>
                        <Input
                          placeholder="John"
                          className="h-14 rounded-xl bg-background/50 border-border/50 focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Last Name
                        </label>
                        <Input
                          placeholder="Doe"
                          className="h-14 rounded-xl bg-background/50 border-border/50 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="h-14 rounded-xl bg-background/50 border-border/50 focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="+61 400 000 000"
                        className="h-14 rounded-xl bg-background/50 border-border/50 focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Message
                      </label>
                      <Textarea
                        placeholder="Tell us about your cleaning needs..."
                        className="min-h-[160px] rounded-xl resize-none bg-background/50 border-border/50 focus:border-primary transition-colors"
                      />
                    </div>

                    <Button
                      variant="hero"
                      size="xl"
                      className="w-full shadow-xl shadow-primary/20">
                      Send Message
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection
          heading="Experience the Difference"
          description="Ready to transform your space? Get a free, no-obligation quote today and see why Melbourne trusts Crisp Cleaning."
          primaryAction={{
            text: "Get a Free Quote",
            href: "/#services",
          }}
        />
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
