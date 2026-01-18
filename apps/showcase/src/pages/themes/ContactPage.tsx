import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Github,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { ContactForm } from "../../components/shared";
import { type ThemeId, getThemeById } from "../../config/themes";

interface ContactPageProps {
  themeId: ThemeId;
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@crazyone.dev",
    href: "mailto:hello@crazyone.dev",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "San Francisco, CA",
    href: "#",
  },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: MessageCircle, label: "Discord", href: "https://discord.com" },
];

export function ContactPage({ themeId }: ContactPageProps) {
  const theme = getThemeById(themeId);

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className={`absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br ${theme?.gradient} opacity-10 blur-3xl`}
          />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions about @crazyone? Want to discuss a partnership or
              enterprise deal? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <ContactForm />
              </motion.div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                {/* Contact Details */}
                <div className="p-6 rounded-2xl border border-border bg-card">
                  <h3 className="text-lg font-bold mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    {contactInfo.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {item.label}
                          </p>
                          <p className="font-medium group-hover:text-primary transition-colors">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="p-6 rounded-2xl border border-border bg-card">
                  <h3 className="text-lg font-bold mb-6">Follow Us</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                      >
                        <social.icon className="w-5 h-5" />
                        <span className="font-medium">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                  <div
                    className={`h-48 bg-gradient-to-br ${theme?.gradient} opacity-20 flex items-center justify-center`}
                  >
                    <div className="text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm opacity-50">Map Placeholder</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-medium">Headquarters</p>
                    <p className="text-sm text-muted-foreground">
                      123 Design Street, San Francisco, CA 94102
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Need Quick Answers?</h2>
            <p className="text-muted-foreground mb-8">
              Check out our documentation and FAQ for instant answers to common
              questions about pricing, features, and implementation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#"
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                View Documentation
              </a>
              <a
                href="#"
                className="px-6 py-3 rounded-xl border-2 border-border font-medium hover:border-primary hover:bg-primary/5 transition-all"
              >
                Read FAQ
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
