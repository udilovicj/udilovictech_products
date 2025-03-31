'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
    { text: "👋 Hi there! Need help with your web project?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { theme } = useTheme();

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: inputValue, sender: 'user' as const }];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I'd be happy to discuss your web development needs. What kind of project are you working on?",
        "We specialize in React, Next.js, and modern web technologies. How can we help with your project?",
        "Our team can handle everything from design to deployment. Would you like to schedule a consultation?",
        "Thanks for reaching out! One of our developers will get back to you shortly with more information."
      ];
      const randomIndex = Math.floor(Math.random() * botResponses.length);
      setMessages(prev => [...prev, { text: botResponses[randomIndex], sender: 'bot' as const }]);
      setIsTyping(false);
    }, 1000); // Reduced delay for better responsiveness
  };

  // Simple animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
          className="glass-effect mb-4 rounded-2xl w-80 md:w-96 overflow-hidden shadow-xl"
        >
          <div className="bg-blue-600 dark:bg-blue-700 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="font-medium">Udilovic Tech Support</span>
              </div>
              <button 
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 h-72 overflow-y-auto p-4">
            <div className="flex flex-col space-y-3">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.2 }}
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white ml-auto rounded-tr-none' 
                      : 'bg-gray-100 dark:bg-slate-700 dark:text-white rounded-tl-none'
                  }`}
                >
                  {message.text}
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.2 }}
                  className="max-w-[80%] p-3 rounded-2xl bg-gray-100 dark:bg-slate-700 dark:text-white rounded-tl-none inline-flex"
                >
                  <span className="flex space-x-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300 animate-pulse" style={{ animationDuration: '1s' }}></span>
                    <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300 animate-pulse" style={{ animationDuration: '1s', animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300 animate-pulse" style={{ animationDuration: '1s', animationDelay: '0.4s' }}></span>
                  </span>
                </motion.div>
              )}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="flex-1 bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-full py-2 px-4 focus:outline-none"
              />
              <button
                type="submit"
                className="ml-2 bg-blue-600 dark:bg-blue-700 text-white p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
        </motion.div>
      )}
      
      <motion.button
        onClick={toggleChat}
        className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget; 