import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Menu, X, CheckCircle, BarChart3, Users, Clock, Zap, ArrowRight, ArrowUpRight } from 'lucide-react';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Dark gradient background */}
      <div className="fixed inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed w-full bg-slate-950/80 backdrop-blur-md z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <span className="text-xl font-display font-bold text-white">GearGuard</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-12">
              {['Features', 'Benefits', 'Pricing', 'Contact'].map((item, idx) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-slate-300 hover:text-white transition relative group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              ))}
            </div>

            <motion.div
              className="hidden md:flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white transition"
              >
                Login
              </button>
              <button
                onClick={() => setShowSignupModal(true)}
                className="px-5 py-2 text-sm font-medium text-white bg-linear-to-r from-green-500 to-emerald-600 rounded-lg hover:shadow-lg hover:shadow-green-500/20 transition"
              >
                Get Started
              </button>
            </motion.div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <motion.div
              className="md:hidden pb-6 space-y-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {['Features', 'Benefits', 'Pricing'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm font-medium text-slate-300">
                  {item}
                </a>
              ))}
              <button
                onClick={() => setShowSignupModal(true)}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-green-500 to-emerald-600 rounded-lg"
              >
                Get Started
              </button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section with Background Video */}
      <section className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
        {/* Background Video Layer */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="https://pw-assets-production-c.squarecdn.com/video/5mObdhW0r5D0lyp3iVJFA6/b4d81931-7cfa-4402-bb41-efc4126e3f95-en-ee526a6b-3ca3-4ae5-9bc2-be60cb21229f-en-Homepage_Edit-updated.webm" type="video/mp4" />
          </video>
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/70 to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            className="space-y-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.h1
                className="text-6xl md:text-7xl font-display font-bold text-white leading-tight"
                variants={itemVariants}
              >
                Maintenance that
                <span className="block mt-2">
                  <span className="relative">
                    <span className="relative z-10">works</span>
                    <span className="absolute bottom-2 left-0 right-0 h-3 bg-green-500/30 -z-10 rounded"></span>
                  </span>
                </span>
              </motion.h1>
              <motion.p className="text-lg text-slate-300 leading-relaxed max-w-xl" variants={itemVariants}>
                Stop reactive repairs. Start intelligent prevention. Track equipment health, predict failures, and optimize your maintenance strategy with real-time insights.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => setShowSignupModal(true)}
                className="px-7 py-3 text-base font-medium text-white bg-linear-to-r from-green-500 to-emerald-600 rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start for Free
                <ArrowRight size={18} />
              </motion.button>
              <motion.button
                onClick={() => setShowLoginModal(true)}
                className="px-7 py-3 text-base font-medium text-white border-2 border-slate-700 rounded-lg hover:border-slate-600 hover:bg-slate-800/50 transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
            </motion.div>

            <motion.div className="pt-4 space-y-3" variants={itemVariants}>
              {[
                '14-day free trial • No credit card',
                '99.9% uptime guarantee'
              ].map((text, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-3 text-sm text-slate-300"
                  whileHover={{ x: 3 }}
                >
                  <CheckCircle size={18} className="text-green-500 shrink-0" />
                  {text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Video Demo */}
          <motion.div
            className="hidden md:block relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden group cursor-pointer relative h-96"
              whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
            >
              {/* Video Container */}
              <div className="w-full h-full bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="https://pw-assets-production-c.squarecdn.com/video/5mObdhW0r5D0lyp3iVJFA6/b4d81931-7cfa-4402-bb41-efc4126e3f95-en-ee526a6b-3ca3-4ae5-9bc2-be60cb21229f-en-Homepage_Edit-updated.webm" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Overlay Gradient on Hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play Button Overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-green-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Video Info Below */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-slate-400">
                <span className="font-semibold text-green-500">▶</span> Watch GearGuard in action
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            <div className="mb-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl">⭐</span>
                ))}
              </div>
            </div>
            <blockquote className="text-2xl md:text-3xl font-display font-bold text-white mb-8 leading-tight">
              "Without GearGuard, we'd still be relying on spreadsheets. It's made us far more efficient and helps us understand exactly where our maintenance spending goes."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-600 rounded-full"></div>
              <div>
                <p className="font-semibold text-white">Sarah Chen</p>
                <p className="text-sm text-slate-400">Operations Manager, TechFlow Industries</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center space-y-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            <h2 className="text-5xl font-display font-bold text-white">Powerful features</h2>
            <p className="text-xl text-slate-300">Everything you need to manage maintenance intelligently</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {[
              {
                icon: Clock,
                title: 'Smart SLA Tracking',
                description: 'Real-time SLA monitoring with automatic escalation. Never miss a deadline again.'
              },
              {
                icon: BarChart3,
                title: 'Health Intelligence',
                description: 'AI-powered equipment health scoring. Predict failures before they happen.'
              },
              {
                icon: Users,
                title: 'Workload Optimization',
                description: 'Smart technician assignment based on skills and availability. Fair distribution.'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-green-500" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center space-y-4 mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
          >
            <h2 className="text-5xl font-display font-bold text-white">Real results</h2>
            <p className="text-xl text-slate-300">See the impact in your first month</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              {[
                { title: '30% Cost Reduction', desc: 'Emergency repairs eliminated through preventive maintenance' },
                { title: '40% Faster Response', desc: 'Smart assignment reduces mean time to repair' },
                { title: '5 Breakdowns Prevented', desc: 'Predictive algorithms catch failures before they happen' },
                { title: '78% Team Utilization', desc: 'Fair workload distribution increases productivity' }
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  className="flex gap-4"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-500/20">
                      <ArrowUpRight className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-lg">{benefit.title}</h4>
                    <p className="text-slate-300 mt-1">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="bg-slate-900 rounded-2xl p-10 border border-slate-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="font-display font-bold text-white text-2xl mb-8">First 30 Days</h3>
              {[
                { label: 'Overdue Requests', from: '5', to: '0' },
                { label: 'Prevention Rate', from: '15%', to: '45%' },
                { label: 'Cost Savings', from: '$0', to: '$47K' }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  className="mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-white">{metric.label}</span>
                    <span className="text-green-500 font-bold">{metric.from} → {metric.to}</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-linear-to-r from-green-500 to-emerald-600 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ delay: idx * 0.15 + 0.2, duration: 1.5, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center space-y-4 mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
          >
            <h2 className="text-5xl font-display font-bold text-white">Simple pricing</h2>
            <p className="text-xl text-slate-300">Choose the plan that works for you</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {[
              {
                name: 'Starter',
                price: '$99',
                description: 'Perfect for small teams',
                features: ['Up to 50 equipment', '5 team members', 'Basic analytics', 'Email support']
              },
              {
                name: 'Professional',
                price: '$299',
                description: 'For growing operations',
                features: ['Unlimited equipment', '25 team members', 'Advanced analytics', 'Priority support', 'Predictive AI'],
                highlighted: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'For large enterprises',
                features: ['Everything in Pro', 'Unlimited team members', 'Custom integrations', 'Dedicated manager', '24/7 support']
              }
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                className={`rounded-2xl p-8 border transition ${
                  plan.highlighted
                    ? 'bg-linear-to-br from-green-500/20 to-emerald-600/20 border-green-500/50 shadow-lg'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-display font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-300 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-display font-bold text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-slate-400">/month</span>}
                </div>
                <motion.button
                  onClick={() => setShowSignupModal(true)}
                  className={`w-full py-3 rounded-lg font-semibold mb-8 transition ${
                    plan.highlighted
                      ? 'bg-linear-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/30'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  Get Started
                </motion.button>
                <ul className="space-y-4">
                  {plan.features.map((feature, fidx) => (
                    <motion.li
                      key={fidx}
                      className="flex items-center gap-3 text-sm text-slate-300"
                      whileHover={{ x: 3 }}
                    >
                      <CheckCircle size={18} className="text-green-500" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-slate-900 to-slate-950 border-t border-slate-800">
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          <div className="space-y-4">
            <h2 className="text-5xl font-display font-bold text-white">Ready to get started?</h2>
            <p className="text-xl text-slate-300">
              Join companies already transforming their maintenance operations.
            </p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <motion.button
              onClick={() => setShowSignupModal(true)}
              className="px-8 py-3 text-base font-medium text-white bg-linear-to-r from-green-500 to-emerald-600 rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition inline-flex items-center justify-center gap-2"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              Start Free Trial
              <ArrowRight size={18} />
            </motion.button>
            <motion.button
              onClick={() => setShowLoginModal(true)}
              className="px-8 py-3 text-base font-medium text-white border-2 border-slate-700 rounded-lg hover:border-slate-600 hover:bg-slate-800 transition"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              Sign In
            </motion.button>
          </motion.div>

          <motion.p
            className="text-sm text-slate-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            14-day free trial • No credit card required • Full access to all features
          </motion.p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
          <p>&copy; 2024 GearGuard. All rights reserved. | Intelligent Maintenance Management</p>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <SignupModal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)} />
    </div>
  );
}
