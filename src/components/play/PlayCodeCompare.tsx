'use client';

import { motion } from "framer-motion";
import { CodeCompare } from "@/components/ui/code-compare";

export function PlayCodeCompare() {
  return (
    <section className="relative py-8 md:py-16 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04]" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-50 via-surface-50/95 to-surface-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-emerald-500/[0.02]" />
      </div>
      <div className="relative z-10 container mx-auto px-2 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-12 md:mb-16">
            {/* Label */}
            <motion.div 
              className="inline-flex items-center gap-2 sm:gap-3 mb-6"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div 
                className="h-px w-6 sm:w-8 bg-gradient-to-r from-blue-500/80 to-purple-500/80"
                initial={{ width: 0 }}
                whileInView={{ width: "2rem" }}
                transition={{ duration: 0.8 }}
              />
              <span className="font-mono text-xs sm:text-sm tracking-wider text-ethereal-dark uppercase">
                Design Evolution
              </span>
              <motion.div 
                className="h-px w-6 sm:w-8 bg-gradient-to-r from-purple-500/80 to-emerald-500/80"
                initial={{ width: 0 }}
                whileInView={{ width: "2rem" }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>

            {/* Main Heading with Gradient */}
            <div className="relative mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-ethereal-dark">
                Visualize{' '}
                <span className="block mt-2 sm:mt-3">
                  <span className="aurora-text-gradient-light relative">
                    Then & Now
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </span>
                </span>
              </h2>
            </div>

            {/* Subheading */}
            <p className="font-sans text-lg sm:text-xl text-ethereal-dark/70 max-w-3xl leading-relaxed">
              Compare design iterations side by side to see how our approach has evolved. Witness the transformation from concept to polished implementation.
            </p>
          </div>

          {/* Code Compare Component */}
          <CodeCompare
            firstContent={
              // 2018 E-commerce Design
              <div className="w-full h-full bg-white overflow-hidden">
                <nav className="w-full bg-black px-4 py-2 text-xs text-white text-center">
                  Free shipping on orders over $75 | Shop Now Pay Later with Afterpay
                </nav>
                <div className="w-full bg-white border-b shadow-sm px-6 py-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold tracking-tight">VELOCITY</span>
                    <div className="hidden md:flex gap-8">
                      <a className="text-gray-800 hover:text-black font-medium">NEW IN</a>
                      <a className="text-gray-800 hover:text-black font-medium">MEN</a>
                      <a className="text-gray-800 hover:text-black font-medium">WOMEN</a>
                      <a className="text-gray-800 hover:text-black font-medium">SALE</a>
                    </div>
                    <div className="flex items-center gap-4">
                      <button>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                      <button>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </button>
                    </div>
        </div>
      </div>

                <div className="relative h-[400px] bg-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=3300&auto=format&fit=crop"
                    alt="Basketball Player" 
                    className="w-full h-full object-cover object-center brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div>
                      <span className="text-white/90 text-sm font-medium tracking-wider uppercase mb-4 block">New Collection</span>
                      <h1 className="text-5xl font-bold text-white mb-6">
                        ELEVATE YOUR GAME
                      </h1>
                      <p className="text-white/90 mb-8 text-lg max-w-xl mx-auto">
                        Every detail engineered for the moments that matter.
                        Your game deserves nothing less.
                      </p>
                      <button className="bg-white text-black px-8 py-3 font-medium hover:bg-gray-100 transition-colors">
                        SHOP BASKETBALL
                      </button>
        </div>
      </div>
    </div>

                <div className="py-16 px-6">
                  <h2 className="text-2xl font-bold text-center mb-12">TRENDING IN HOOPS</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      {
                        img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2000&auto=format&fit=crop",
                        name: "Pro Elite Basketball Shoes",
                        price: "$159.99"
                      },
                      {
                        img: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2000&auto=format&fit=crop",
                        name: "Performance Jersey",
                        price: "$89.99"
                      },
                      {
                        img: "https://images.unsplash.com/photo-1509027572446-af8401acfdc3?q=80&w=2000&auto=format&fit=crop",
                        name: "Game Day Shorts",
                        price: "$65.00"
                      },
                      {
                        img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?q=80&w=2000&auto=format&fit=crop",
                        name: "Basketball",
                        price: "$29.99"
                      }
                    ].map((product, i) => (
                      <div key={i} className="group cursor-pointer">
                        <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                          <img 
                            src={product.img}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h3 className="font-medium mb-1">{product.name}</h3>
                        <p className="text-gray-600">{product.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
            secondContent={
              // Modern E-commerce Design
              <div className="w-full h-full bg-[#0A0A0A] overflow-hidden font-['Syncopate']">
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?q=80&w=2940&auto=format&fit=crop"
                    alt="Basketball Action"
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4KICA8ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+CiAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCIvPgo8L3N2Zz4=')] opacity-20 mix-blend-overlay" />
                </div>

                <nav className="relative z-10 w-full px-8 py-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl text-white font-bold tracking-[0.2em]">COURT</span>
                    <button className="text-white/80 hover:text-white transition-colors text-sm tracking-widest">
                      MENU
                    </button>
                  </div>
                </nav>

                <div className="relative z-10 h-full flex items-center">
                  <div className="max-w-4xl mx-auto px-20">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="mb-12 text-center"
                    >
                      <h1 className="text-[8vw] font-bold text-white leading-none tracking-tighter mb-8">
                        RISE<br />
                        <span className="text-[#FF4D4D]">ABOVE</span>
                      </h1>
                      <p className="text-xl text-white/90 font-['Inter'] font-light max-w-2xl mx-auto">
                        Where passion meets precision. Each piece crafted for those 
                        who know the difference between playing and living the game.
                      </p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-center gap-8"
                    >
                      <button className="relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
                        <div className="relative px-8 py-4 text-white font-['Inter'] flex items-center gap-4">
                          DISCOVER SS24
                          <span className="w-8 h-[1px] bg-white group-hover:w-12 transition-all duration-300" />
                        </div>
                      </button>
                      <button className="text-white/60 hover:text-white transition-colors font-['Inter']">
                        OUR STORY
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            }
            className="shadow-2xl h-[800px] max-h-[80vh] rounded-2xl overflow-hidden mb-32"
            slideMode="drag"
          />

          {/* SaaS Platform Comparison */}
          <CodeCompare
            firstContent={
              // 2015 Enterprise Banking Compliance Software
              <div className="w-full h-full bg-[#F5F7FA] overflow-hidden">
                <nav className="relative z-20 w-full bg-[#003366] px-6 py-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-white">ComplianceGuard™</span>
                      <span className="text-xs text-white/60">v4.2.1</span>
                    </div>
                    <div className="hidden md:flex gap-6 text-sm">
                      <a className="text-white/80 hover:text-white">Solutions</a>
                      <a className="text-white/80 hover:text-white">Products</a>
                      <a className="text-white/80 hover:text-white">Support</a>
                      <a className="text-white/80 hover:text-white">Resources</a>
                      <a className="text-white/80 hover:text-white">Contact Sales</a>
                    </div>
                    <button className="bg-[#FF9900] text-white px-4 py-1.5 text-sm font-bold rounded">
                      Request Demo
                    </button>
                  </div>
                </nav>

                <div className="max-w-6xl mx-auto px-6 py-12">
                  <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                      <div className="inline-block mb-4 px-3 py-1 bg-[#E5F0FF] text-[#003366] text-sm font-bold rounded">
                        Enterprise Solution
                      </div>
                      <h1 className="text-[32px] font-bold text-[#1A1A1A] leading-tight mb-6">
                        Comprehensive Banking<br />Compliance Management
                      </h1>
                      <p className="text-[#666666] mb-8 leading-relaxed">
                        Industry-leading solution trusted by 80% of Fortune 500 banks. 
                        Ensure regulatory compliance with our robust, secure platform.
                      </p>
                      <div className="flex gap-4">
                        <button className="bg-[#003366] text-white px-6 py-3 text-sm font-bold rounded">
                          Schedule Product Tour
                        </button>
                        <button className="border-2 border-[#003366] text-[#003366] px-6 py-3 text-sm font-bold rounded">
                          Download Whitepaper
                        </button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <img 
                        src="https://images.unsplash.com/photo-1537111261224-6fa49cecda2f?q=80&w=3000&auto=format&fit=crop"
                        alt="Enterprise Dashboard" 
                        className="w-full rounded-lg shadow-xl brightness-95"
                      />
                    </div>
                  </div>

                  <div className="mt-20">
                    <h2 className="text-center text-2xl font-bold text-[#1A1A1A] mb-12">
                      Trusted by Leading Financial Institutions
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      {[
                        "Regulatory Reporting",
                        "Risk Assessment",
                        "Audit Management",
                        "Document Control"
                      ].map((feature, i) => (
                        <div key={i} className="p-6 bg-white border border-gray-200 rounded-lg text-center">
                          <div className="w-12 h-12 mx-auto mb-4 bg-[#E5F0FF] rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="font-bold text-[#1A1A1A]">{feature}</h3>
                          <p className="text-sm text-[#666666] mt-2">Enterprise-grade security</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center mt-12">
                    <div className="inline-block px-4 py-2 bg-[#E5F0FF] text-[#003366] text-sm rounded-full">
                      ISO 27001 Certified | SOC 2 Type II Compliant | GDPR Ready
                    </div>
                  </div>
                </div>
              </div>
            }
            secondContent={
              // 2024 AI-Powered Compliance Platform
              <div className="w-full h-full bg-[#0A0A0A] overflow-hidden font-['Inter']">
                <nav className="relative z-20 w-full px-8 py-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-xl text-white font-light tracking-tight">guard<span className="text-violet-400 font-bold">.ai</span></span>
                      <div className="h-4 w-px bg-white/20" />
                      <span className="text-white/40 text-sm">Intelligent Compliance</span>
                    </div>
                    <button className="text-white/90 hover:text-white transition-colors px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-sm text-sm border border-white/10 hover:bg-white/10">
                      Book Demo
                    </button>
                  </div>
                </nav>

                <div className="relative z-10 h-full flex items-center">
                  <div className="max-w-6xl mx-auto px-8 pt-12">
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                      >
                        <div className="flex items-center gap-3 justify-center mb-6">
                          <span className="px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-300 text-sm">
                            AI-Enhanced Monitoring
                          </span>
                          <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-300 text-sm">
                            SOC 2 Type II Certified
                          </span>
                        </div>
                        <h1 className="text-6xl font-bold text-white leading-none tracking-tight mb-6">
                          Compliance at<br />
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400">
                            Enterprise Scale
                          </span>
                        </h1>
                        <p className="text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                          Streamline regulatory compliance with intelligent automation.
                          Built for modern financial institutions.
                        </p>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative w-full max-w-4xl aspect-[16/9] rounded-xl overflow-hidden"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1642790551116-18e150f248e3?q=80&w=3000&auto=format&fit=crop"
                          alt="AI Dashboard"
                          className="w-full h-full object-cover brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-blue-500/10 mix-blend-overlay" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-full max-w-3xl aspect-[21/9] rounded-lg overflow-hidden mx-8">
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm border border-white/10" />
                            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500" />
                            <div className="relative p-6">
                              <div className="flex items-center justify-between mb-6">
                                <div>
                                  <div className="text-white/60 text-sm mb-1">Risk Analysis</div>
                                  <div className="text-white font-medium">Compliance Overview</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-400 font-medium">98.2%</span>
                                  <div className="flex h-4 items-center gap-0.5">
                                    {[...Array(6)].map((_, i) => (
                                      <div key={i} className="w-0.5 h-full bg-emerald-400/80" style={{ height: `${(i + 1) * 15}%` }} />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                {[
                                  { title: "KYC Status", status: "Verified", icon: "✓" },
                                  { title: "Data Security", status: "Protected", icon: "🔒" },
                                  { title: "Risk Level", status: "Low", icon: "⚡" }
                                ].map((item, i) => (
                                  <div key={i} className="px-4 py-3 rounded-lg bg-white/5 border border-white/10">
                                    <div className="flex items-center gap-2">
                                      <span className="text-white/40 text-xs">{item.icon}</span>
                                      <div className="text-white/40 text-xs">{item.title}</div>
                                    </div>
                                    <div className="text-white/90 font-medium mt-1">
                                      {item.status}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 p-8">
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full w-[98.2%] bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 rounded-full" />
                              </div>
                            </div>
                            <span className="text-white/90 font-medium">98.2% Compliant</span>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-8 mt-12"
                      >
                        <button className="group relative overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500">
                          <span className="relative z-10 text-white font-medium flex items-center gap-2">
                            Request Access
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                        <button className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Product Tour
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            }
            className="shadow-2xl h-[800px] max-h-[80vh] rounded-2xl overflow-hidden mb-32"
            slideMode="drag"
          />

          {/* Law Firm Comparison */}
          <CodeCompare
            firstContent={
              // 2018 Law Firm Design
              <div className="w-full h-full bg-white overflow-hidden">
                <nav className="w-full bg-gray-900 px-6 py-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-serif text-white">JAMES WILSON</span>
                    <div className="hidden md:flex gap-8">
                      <a className="text-white/80 hover:text-white">Practice Areas</a>
                      <a className="text-white/80 hover:text-white">Experience</a>
                      <a className="text-white/80 hover:text-white">Contact</a>
                    </div>
                    <button className="border border-white text-white px-4 py-2">
                      Free Consultation
                    </button>
                  </div>
                </nav>

                <div className="relative h-[400px]">
                  <img 
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=3270&auto=format&fit=crop"
                    alt="Law Office" 
                    className="w-full h-full object-cover brightness-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div>
                      <h1 className="text-4xl font-serif text-white mb-6">
                        Experienced Legal Counsel<br />You Can Trust
                      </h1>
                      <p className="text-white/90 mb-8 max-w-xl mx-auto">
                        Over 20 years of experience in corporate and business law.
                        Dedicated to protecting your interests.
                      </p>
                      <button className="bg-white text-gray-900 px-8 py-3 font-medium">
                        Schedule Consultation
                      </button>
                    </div>
                  </div>
                </div>

                <div className="py-16 px-6">
                  <h2 className="text-2xl font-serif text-center mb-12">Practice Areas</h2>
                  <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {[
                      "Corporate Law",
                      "Business Formation",
                      "Contract Review",
                      "Mergers & Acquisitions",
                      "Intellectual Property",
                      "Litigation"
                    ].map((area, i) => (
                      <div key={i} className="text-center p-6 border">
                        <h3 className="font-serif">{area}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
            secondContent={
              // Modern Law Firm Design
              <div className="w-full h-full bg-[#0A0A0A] overflow-hidden font-['Cormorant']">
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?q=80&w=3270&auto=format&fit=crop"
                    alt="Modern Law Office"
                    className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
                </div>

                <nav className="relative z-10 w-full px-8 py-6 border-b border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl text-white font-light tracking-wide">WILSON<span className="text-[#C4A484]">LAW</span></span>
                    <div className="flex items-center gap-12">
                      <div className="hidden md:flex items-center gap-8">
                        <a className="text-white/60 hover:text-white transition-colors text-sm tracking-wide">About</a>
                        <a className="text-white/60 hover:text-white transition-colors text-sm tracking-wide">Services</a>
                        <a className="text-white/60 hover:text-white transition-colors text-sm tracking-wide">Team</a>
                        <a className="text-white/60 hover:text-white transition-colors text-sm tracking-wide">Insights</a>
                      </div>
                      <div className="flex items-center gap-6">
                        <button className="text-white/80 hover:text-white transition-colors text-sm tracking-wide">
                          EN
                        </button>
                        <button className="px-5 py-2 border border-white/20 hover:border-white/40 text-white text-sm tracking-wide transition-all duration-200 rounded-full">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </nav>

                <div className="relative z-10 h-full flex items-center">
                  <div className="max-w-4xl mx-auto px-20">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="mb-12 text-center"
                    >
                      <h1 className="text-[8vw] font-light text-white leading-none tracking-tight mb-8">
                        Legal<br />
                        <span className="text-[#C4A484]">Excellence</span>
                      </h1>
                      <p className="text-xl text-white/90 font-['Inter'] font-light max-w-2xl mx-auto">
                        Where tradition meets innovation. Crafting sophisticated legal
                        solutions for modern challenges.
                      </p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-center gap-8"
                    >
                      <button className="relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300 rounded-full" />
                        <div className="relative px-8 py-4 text-white font-['Inter'] flex items-center gap-4">
                          SCHEDULE A CONSULTATION
                          <span className="w-8 h-[1px] bg-white group-hover:w-12 transition-all duration-300" />
                        </div>
                      </button>
                      <button className="text-white/60 hover:text-white transition-colors font-['Inter'] tracking-wide">
                        EXPERTISE
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            }
            className="shadow-2xl h-[800px] max-h-[80vh] rounded-2xl overflow-hidden"
            slideMode="drag"
          />
        </div>
      </div>
    </section>
  );
} 