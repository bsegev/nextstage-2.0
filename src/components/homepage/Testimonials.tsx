import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Star, ArrowRight, Quote } from 'lucide-react';

// Testimonial data structure
const testimonials = [
  {
    id: 1,
    name: "Steve J.",
    role: "Tech Visionary",
    company: "[Famous Fruit Company]",
    quote: "Design is not just what it looks like and feels like. Design is how it works. Ben gets this at a fundamental level.",
    metrics: ["[Metric 1]", "[Timeline]"],
    tags: ["Strategy", "Design", "Tech"],
    color: "#60A5FA",
    spiderData: {
      strategy: 0.9,
      design: 0.7,
      tech: 0.8
    }
  },
  {
    id: 2,
    name: "Sam A.",
    role: "AI Pioneer",
    company: "[Cutting-Edge Lab]",
    quote: "The most impressive people I know spent their time with their head down, working on something they're passionate about. Ben exemplifies this approach.",
    metrics: ["[Metric 2]", "[Outcome]"],
    tags: ["Product", "AI", "Growth"],
    color: "#818CF8",
    spiderData: {
      strategy: 0.7,
      design: 0.6,
      tech: 0.9
    }
  },
  {
    id: 3,
    name: "Leonardo d.V.",
    role: "Renaissance Polymath",
    company: "[Italian Workshop]",
    quote: "Simplicity is the ultimate sophistication. I've observed Ben's work from afar and admire his ability to make the complex appear simple.",
    metrics: ["[Metric 3]", "[Renaissance KPI]"],
    tags: ["Brand", "Design", "Strategy"],
    color: "#34D399",
    spiderData: {
      strategy: 0.8,
      design: 0.9,
      tech: 0.6
    }
  }
];

const ImpactVisualization = ({ activeIndex }: { activeIndex: number }) => {
  // Define the axes for the spider chart
  const axes = [
    { name: "Strategy", key: "strategy", angle: 0 },
    { name: "Design", key: "design", angle: 120 },
    { name: "Tech", key: "tech", angle: 240 }
  ];
  
  // Get the current testimonial's spider data
  const spiderData = testimonials[activeIndex].spiderData;
  
  // Calculate the size of the chart
  const chartSize = 180;
  const centerX = 0;
  const centerY = 0;
  
  // Function to calculate point coordinates based on value and angle
  const calculatePoint = (value: number, angle: number) => {
    const radians = (angle - 90) * (Math.PI / 180);
    const x = centerX + (chartSize / 2) * value * Math.cos(radians);
    const y = centerY + (chartSize / 2) * value * Math.sin(radians);
    return { x, y };
  };
  
  // Generate points for the spider chart
  const points = axes.map(axis => {
    const value = spiderData[axis.key as keyof typeof spiderData];
    return calculatePoint(value, axis.angle);
  });
  
  // Create the path for the spider chart
  const pathData = points.map((point, i) => 
    (i === 0 ? 'M' : 'L') + `${point.x},${point.y}`
  ).join(' ') + 'Z';

  return (
    <div className="relative w-full h-full">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color),transparent_70%)] opacity-5"
          style={{ '--color': testimonials[activeIndex].color } as any} />
      </div>

      {/* Spider Chart */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[300px] h-[300px]">
          {/* Background Grid */}
          <svg className="absolute inset-0 w-full h-full" viewBox="-150 -150 300 300">
            {/* Grid Circles */}
            {[0.25, 0.5, 0.75, 1].map((radius) => (
              <circle 
                key={radius}
                cx={0}
                cy={0}
                r={chartSize * radius / 2}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}
            
            {/* Axis Lines */}
            {axes.map((axis) => {
              const point = calculatePoint(1, axis.angle);
              return (
                <line
                  key={axis.name}
                  x1={0}
                  y1={0}
                  x2={point.x}
                  y2={point.y}
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
              );
            })}
            
            {/* Spider Chart Path */}
            <motion.path
              d={pathData}
              fill={`${testimonials[activeIndex].color}20`}
              stroke={testimonials[activeIndex].color}
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Data Points */}
            {points.map((point, i) => (
              <motion.circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="4"
                fill={testimonials[activeIndex].color}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              />
            ))}
            
            {/* Central Circle - moved inside SVG */}
            <motion.circle
              cx="0"
              cy="0"
              r="20"
              fill={`${testimonials[activeIndex].color}20`}
              stroke={testimonials[activeIndex].color}
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          
          {/* Axis Labels */}
          {axes.map((axis) => {
            const point = calculatePoint(1.2, axis.angle);
            return (
              <motion.div
                key={axis.name}
                className="absolute whitespace-nowrap px-3 py-1 rounded-full bg-white shadow-sm border border-gray-100"
                style={{
                  left: `calc(50% + ${point.x}px)`,
                  top: `calc(50% + ${point.y}px)`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="font-mono text-sm" style={{ color: testimonials[activeIndex].color }}>
                  {axis.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const nextTestimonial = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.03),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(99, 102, 241, 0.03) 0%, transparent 70%)",
            filter: "blur(80px)"
          }}
          animate={{
            opacity: [0.5, 0.7, 0.5],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y, opacity }}
      >
        {/* Section Header */}
        <motion.div 
          className="mx-auto max-w-2xl text-center"
          style={{ opacity, y }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
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
                Client Stories
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
                See What We've{' '}
                <span className="block mt-2 sm:mt-3">
                  <span className="aurora-text-gradient-light relative">
                  Built Together
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
            <p className="font-sans text-lg sm:text-xl text-ethereal-dark/70 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Real results and transformative outcomes for ambitious founders and teams.
            </p>
            
            {/* Placeholder Note */}
            <motion.div 
              className="max-w-2xl mx-auto mb-8 sm:mb-12 px-4 py-3 bg-blue-50/50 border border-blue-100 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <p className="text-base font-sans text-blue-700/80 italic">
                <span className="font-medium">Note:</span> These testimonials are placeholders while I collect the actual ones from past clients. 
                But hey, they still show how I work and what I can do for you! 😊
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
                {/* Testimonial Content */}
                <div className="lg:col-span-3 relative">
                  <Quote className="absolute -top-6 -left-4 w-12 h-12 text-blue-500/10" />
                  <blockquote className="relative">
                    <p className="text-xl sm:text-2xl text-ethereal-dark leading-relaxed mb-8">
                      {testimonials[activeIndex].quote}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-serif text-xl text-ethereal-dark">
                            {testimonials[activeIndex].name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="font-serif text-lg text-ethereal-dark">
                          {testimonials[activeIndex].name}
                        </div>
                        <div className="font-mono text-sm text-ethereal-dark/60">
                          {testimonials[activeIndex].role} · {testimonials[activeIndex].company}
                        </div>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-4">
                      {testimonials[activeIndex].metrics.map((metric, index) => (
                        <motion.div
                          key={metric}
                          className="px-4 py-2 rounded-full bg-white/50 border border-gray-200 shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="font-mono text-sm text-ethereal-dark">
                            {metric}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </blockquote>
                </div>

                {/* Impact Visualization */}
                <div className="lg:col-span-2 relative aspect-square">
                  <ImpactVisualization activeIndex={activeIndex} />
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-3 mt-12">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'bg-blue-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-ethereal-dark rounded-xl overflow-hidden group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative font-mono text-white">
              View Work
            </span>
            <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
} 