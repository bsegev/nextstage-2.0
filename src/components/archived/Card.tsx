"use client";

import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  title: string;
  description: string;
  timeEstimate: string;
  priceEstimate: string;
  features: string[];
  perfectFor: string;
  className?: string;
  featured?: boolean;
}

export function Card({
  title,
  description,
  timeEstimate,
  priceEstimate,
  features,
  perfectFor,
  className,
  featured = false,
}: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={clsx(
        'bg-white rounded-2xl shadow-lg p-8 transition-all hover:shadow-xl border-2',
        featured ? 'border-olive-600' : 'border-transparent',
        className
      )}
    >
      <div className="min-h-[380px]">
        <h3 className={clsx(
          "text-2xl font-serif mb-4",
          featured ? "text-olive-600" : "text-olive-700"
        )}>
          {title}
        </h3>
        <p className="text-gray-600 mb-6 min-h-[3rem]">{description}</p>
        
        <div className="space-y-4 mb-6">
          <div>
            <span className="font-medium text-olive-600">Time:</span>
            <span className="ml-2 text-gray-700">{timeEstimate}</span>
          </div>
          <div>
            <span className="font-medium text-olive-600">Investment:</span>
            <span className="ml-2 text-gray-700">{priceEstimate}</span>
          </div>
          <div>
            <span className="font-medium text-olive-600">Perfect For:</span>
            <span className="ml-2 text-gray-700">{perfectFor}</span>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="font-medium text-olive-600 mb-2">What You Get:</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="text-gray-700 flex items-start">
                <span className="text-olive-600 mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={clsx(
          "w-full px-6 py-3 rounded-lg font-medium transition-colors",
          featured ? 
            "bg-olive-600 text-white hover:bg-olive-700" :
            "bg-beige-200 text-olive-700 hover:bg-beige-500"
        )}
      >
        Book an Appointment
      </motion.button>
    </motion.div>
  );
} 