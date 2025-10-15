import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const comments = [
  {
    name: 'Alice Johnson',
    role: 'Frontend Developer',
    text: 'This blog helped me master Tailwind CSS animations! Highly recommended.'
  },
  {
    name: 'Bob Lee',
    role: 'Product Manager',
    text: 'The guides are clear and actionable. My team ships faster now.'
  },
  {
    name: 'Sara Kim',
    role: 'UI Designer',
    text: 'Love the design system tips. The examples are practical and modern.'
  }
];

export default function PeopleSay() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="w-full max-w-xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">People Say</h2>
      <div className="flex justify-center mb-4 gap-2">
        {comments.map((c, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded-full transition-colors duration-200 font-medium ${selected === idx ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setSelected(idx)}
          >
            {c.name.split(' ')[0]}
          </button>
        ))}
      </div>
      <div className="relative min-h-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-lg rounded-xl p-6 text-center"
          >
            <p className="text-lg mb-4">"{comments[selected].text}"</p>
            <span className="block font-semibold text-blue-600">{comments[selected].name}</span>
            <span className="block text-sm text-gray-500">{comments[selected].role}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
