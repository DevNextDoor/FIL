import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Phone, MapPin, Mail, Clock, MessageSquareShare } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project_scope: '',
    botcheck: '' // Honeypot field
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.botcheck) {
      setStatus('success');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', project_scope: '', botcheck: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-zinc-900 text-white px-4 md:px-8 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-850 opacity-90 z-0" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-display">
                Get In Touch
              </h2>
              <p className="mt-4 text-zinc-300 font-light leading-relaxed">
                Contact us today for custom designs, bulk orders, or architect consultations. We deliver high-end hardware quality across Aligarh and international shipments.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {/* Contact Card 1 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-850 flex items-center justify-center border border-zinc-800 shadow-[3px_3px_6px_rgba(0,0,0,0.3),-3px_-3px_6px_rgba(255,255,255,0.05)] shrink-0">
                  <Phone className="w-5 h-5 text-zinc-350" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Phone & WhatsApp</span>
                  <a href="tel:+919997773393" className="block text-sm font-extrabold text-zinc-200 hover:text-white transition-colors mt-0.5">
                    +91 999 777 3393
                  </a>
                </div>
              </div>

              {/* Contact Card 2 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-850 flex items-center justify-center border border-zinc-800 shadow-[3px_3px_6px_rgba(0,0,0,0.3),-3px_-3px_6px_rgba(255,255,255,0.05)] shrink-0">
                  <Mail className="w-5 h-5 text-zinc-350" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Email Address</span>
                  <a href="mailto:info@frink-international.com" className="block text-sm font-extrabold text-zinc-200 hover:text-white transition-colors mt-0.5">
                    info@frink-international.com
                  </a>
                </div>
              </div>

              {/* Contact Card 3 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-850 flex items-center justify-center border border-zinc-800 shadow-[3px_3px_6px_rgba(0,0,0,0.3),-3px_-3px_6px_rgba(255,255,255,0.05)] shrink-0">
                  <Clock className="w-5 h-5 text-zinc-350" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Working Hours</span>
                  <span className="block text-sm font-extrabold text-zinc-200 mt-0.5">
                    Mon - Sat: 9:00 AM - 6:00 PM (Sunday Closed)
                  </span>
                </div>
              </div>

              {/* Contact Card 4 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-850 flex items-center justify-center border border-zinc-800 shadow-[3px_3px_6px_rgba(0,0,0,0.3),-3px_-3px_6px_rgba(255,255,255,0.05)] shrink-0">
                  <MapPin className="w-5 h-5 text-zinc-350" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Address location</span>
                  <span className="block text-sm font-extrabold text-zinc-200 leading-snug mt-0.5">
                    AB-512, Nagla Masani Khair Road, Hira Nagar, Jalalpur, Aligarh, Uttar Pradesh 202001
                  </span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp link */}
            <a 
              href="https://wa.me/+919997773393?text=Hi!+I'm+interested+in+Frink+International+hardware+products."
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm uppercase tracking-wider px-6 py-4 rounded-3xl shadow-md transition-all active:scale-95 cursor-pointer max-w-xs select-none"
            >
              <MessageSquareShare className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Right Column: Dark Neumorphic Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-850 border border-zinc-800/80 p-8 rounded-[40px] w-full shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Honeypot hidden input */}
              <input 
                type="text" 
                name="botcheck" 
                value={formData.botcheck} 
                onChange={handleChange}
                className="hidden" 
                tabIndex={-1} 
                autoComplete="off" 
              />

              {/* Name field */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 ml-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name" 
                  className="w-full px-5 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-zinc-750 outline-none font-medium text-white placeholder-zinc-500 focus:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4)] transition-all text-sm"
                />
              </div>

              {/* Email & Phone grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 ml-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email" 
                    className="w-full px-5 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-zinc-750 outline-none font-medium text-white placeholder-zinc-500 focus:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4)] transition-all text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 ml-2">Phone</label>
                  <input 
                    type="text" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number" 
                    className="w-full px-5 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-zinc-750 outline-none font-medium text-white placeholder-zinc-500 focus:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4)] transition-all text-sm"
                  />
                </div>
              </div>

              {/* Message field */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 ml-2">Project Scope / Requirements</label>
                <textarea 
                  name="project_scope"
                  value={formData.project_scope}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Detail your requirements here..." 
                  className="w-full px-5 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-zinc-750 outline-none font-medium text-white placeholder-zinc-500 focus:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4)] transition-all text-sm resize-none"
                />
              </div>

              {/* Submit Status Alerts */}
              {status === 'success' && (
                <div className="p-4 bg-emerald-950/80 border border-emerald-800 text-emerald-450 rounded-2xl text-xs font-bold text-center">
                  Message sent successfully! We will get back to you shortly.
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 bg-rose-950/80 border border-rose-800 text-rose-450 rounded-2xl text-xs font-bold text-center">
                  Failed to send message. Please try again or reach out on WhatsApp.
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-slate-900 font-bold text-xs uppercase tracking-wider py-4 rounded-2xl shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2 select-none focus:outline-none"
              >
                <Send className="w-4 h-4" />
                {status === 'loading' ? 'Sending Message...' : 'Submit Inquiry'}
              </button>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
