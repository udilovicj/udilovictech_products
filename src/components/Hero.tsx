'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

// Define the particle type
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

// Enhanced particle background with dynamic elements
const ParticleBackground = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Enhanced particle system with more variety
    const particleCount = 35;
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: Math.random() * 0.3 - 0.15,
        speedY: Math.random() * 0.3 - 0.15,
        color: theme === 'dark' 
          ? i % 5 === 0 
            ? `rgba(129, 140, 248, ${0.2 + Math.random() * 0.1})` // Indigo particles
            : i % 7 === 0 
              ? `rgba(167, 139, 250, ${0.15 + Math.random() * 0.1})` // Purple particles
              : `rgba(59, 130, 246, ${0.15 + Math.random() * 0.1})` // Blue particles
          : i % 5 === 0
            ? `rgba(79, 70, 229, ${0.08 + Math.random() * 0.05})` // Indigo particles
            : i % 7 === 0
              ? `rgba(139, 92, 246, ${0.07 + Math.random() * 0.05})` // Purple particles
              : `rgba(37, 99, 235, ${0.08 + Math.random() * 0.05})`, // Blue particles
        opacity: 0.1 + Math.random() * 0.5
      });
    }
    
    let animationFrame: number;
    let lastTime = 0;
    let mouseX = 0;
    let mouseY = 0;
    
    // Track mouse position for interactive particles
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Enhanced render with mouse interaction and wave effect
    const animate = (timestamp: number) => {
      if (timestamp - lastTime > 25) { // ~40fps for better performance with more effects
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          // Calculate distance from mouse
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Enhanced mouse interaction
          if (distance < 250) {
            const force = 0.3 * (1 - distance / 250);
            particle.speedX += dx * force * 0.01;
            particle.speedY += dy * force * 0.01;
          }
          
          // Apply some drag to limit speed
          particle.speedX *= 0.97;
          particle.speedY *= 0.97;
          
          // Add subtle wave motion
          particle.y += Math.sin(timestamp * 0.001 + particle.x * 0.01) * 0.2;
          
          // Update position
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Boundary checking with wrap-around
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
          
          // Draw particle with enhanced pulsing effect
          const pulseSize = particle.size * (0.75 + Math.sin(timestamp * 0.002 + particle.x * 0.01) * 0.25);
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.opacity * (0.8 + Math.sin(timestamp * 0.001) * 0.2);
          ctx.fill();
          
          // Add glow effect
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, pulseSize * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = particle.color.replace(/[\d.]+\)$/g, '0.05)');
          ctx.fill();
          
          ctx.globalAlpha = 1;
        });
        
        // Connect particles with more interesting patterns
        for (let a = 0; a < particles.length; a += 2) {
          for (let b = a + 1; b < particles.length; b += 3) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              // Calculate fade based on distance
              const opacity = 
                theme === 'dark' 
                  ? 0.05 * (1 - distance / 150) 
                  : 0.04 * (1 - distance / 150);
              
              // Draw line with gradient
              const gradient = ctx.createLinearGradient(
                particles[a].x, 
                particles[a].y, 
                particles[b].x, 
                particles[b].y
              );
              
              if (theme === 'dark') {
                gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity * 1.2})`);
                gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`);
              } else {
                gradient.addColorStop(0, `rgba(37, 99, 235, ${opacity * 1.2})`);
                gradient.addColorStop(1, `rgba(79, 70, 229, ${opacity})`);
              }
              
              ctx.beginPath();
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 0.7;
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.stroke();
            }
          }
        }
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full -z-5 opacity-40"
    />
  );
};

// Modern code display component with VS Code styling
const CodeDisplay = ({ codeLines, visibleLines }: { codeLines: string[], visibleLines: number }) => {
  const truncatedLines = codeLines.filter((_, i) => 
    i === 0 || 
    i === 1 || 
    i === 2 || 
    i === 4 || 
    i === 8 || 
    (i >= 19 && i <= 23) || 
    i === codeLines.length - 1
  );
  
  return (
    <div className="vscode-ui rounded-xl overflow-hidden shadow-2xl mb-6 border border-gray-800/50 dark:border-black/50">
      {/* VS Code-like title bar */}
      <div className="bg-[#252526] dark:bg-[#1e1e1e] text-white p-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="text-xs opacity-80 mono flex items-center">
            <svg className="w-4 h-4 mr-1.5 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.4 3.6C20.9 3.1 21.8 3.1 22.4 3.8C22.9 4.4 22.9 5.3 22.4 5.8L21.3 7.1L17 2.7L18.2 1.6C18.7 1.1 19.6 1.1 20.2 1.8C20.7 2.4 20.7 3.3 20.2 3.8L20.4 3.6ZM2.3 17.3L16.4 3.2L20.8 7.6L6.7 21.7C6.5 21.9 6.3 22 6 22H2V18C2 17.8 2.1 17.5 2.3 17.3Z" fill="currentColor"/>
            </svg>
            page.tsx
          </div>
        </div>
        <div className="text-xs text-gray-400 flex space-x-4">
          <span>TypeScript</span>
          <span>UTF-8</span>
          <span>LF</span>
        </div>
      </div>
      
      {/* VS Code-like tab bar */}
      <div className="bg-[#2d2d2d] dark:bg-[#252526] border-b border-black/30 flex text-xs">
        <div className="px-4 py-2 bg-[#1e1e1e] dark:bg-[#1e1e1e] text-white flex items-center border-r border-black/30">
          <span className="mr-2">page.tsx</span>
          <span className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-gray-600/50 cursor-pointer">×</span>
        </div>
        <div className="px-4 py-2 text-gray-400 border-r border-black/30">Hero.tsx</div>
        <div className="px-4 py-2 text-gray-400">Navbar.tsx</div>
      </div>
      
      {/* VS Code line numbers + code */}
      <div className="bg-[#1e1e1e] p-0 overflow-hidden h-60 flex">
        {/* Line numbers */}
        <div className="bg-[#1e1e1e] text-gray-500 text-xs p-2 text-right select-none w-10 border-r border-gray-800/30">
          {truncatedLines.slice(0, Math.min(visibleLines, truncatedLines.length)).map((_, i) => (
            <div key={i} className="leading-5 pr-2">{codeLines.indexOf(truncatedLines[i]) + 1}</div>
          ))}
        </div>
        
        {/* Code content */}
        <pre className="text-gray-200 text-xs p-2 overflow-x-auto flex-1 font-mono">
          <code>
            {truncatedLines.slice(0, Math.min(visibleLines, truncatedLines.length)).map((line, i) => (
              <div key={i} className="leading-5">
                {line.includes('import') ? (
                  <span className="text-[#9cdcfe]">{line}</span>
                ) : line.includes('//') ? (
                  <span className="text-[#6a9955]">{line}</span>
                ) : line.includes('export') || line.includes('function') || line.includes('const') ? (
                  <span>
                    <span className="text-[#569cd6]">{line.includes('export') ? 'export ' : ''}{line.includes('function') ? 'function ' : ''}{line.includes('const') ? 'const ' : ''}</span>
                    <span className="text-[#dcdcaa]">{line.split(/export |function |const /)[1]}</span>
                  </span>
                ) : line.includes('try') || line.includes('catch') || line.includes('finally') ? (
                  <span className="text-[#c586c0]">{line}</span>
                ) : line.includes('return') ? (
                  <span className="text-[#c586c0]">{line}</span>
                ) : line.includes('setIsLoading') || line.includes('await') ? (
                  <span className="text-[#dcdcaa]">{line}</span>
                ) : line.includes('<') && line.includes('>') ? (
                  <span className="text-[#4ec9b0]">{line}</span>
                ) : (
                  <span>{line}</span>
                )}
                {i === 0 && <span className="text-white ml-1 animate-pulse">|</span>}
              </div>
            ))}
          </code>
        </pre>
      </div>
      
      {/* VS Code-like status bar */}
      <div className="bg-[#007acc] text-white text-xs px-2 py-1 flex justify-between items-center">
        <div className="flex space-x-4">
          <span className="flex items-center">
            <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="currentColor"/>
              <path d="M11 11H7V13H11V17H13V13H17V11H13V7H11V11Z" fill="currentColor"/>
            </svg>
            main
          </span>
          <span className="flex items-center">
            <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none">
              <path d="M19.9 12.4C19.3 12.4 18.7 12.2 18.2 11.9L15 9.89998V17.4C15 18.5 14.1 19.4 13 19.4H4.99999C3.89999 19.4 2.99999 18.5 2.99999 17.4V6.89998C2.99999 5.79998 3.89999 4.89998 4.99999 4.89998H13C14.1 4.89998 15 5.79998 15 6.89998V8.19998L18.7 5.89998C19.1 5.59998 19.5 5.49998 20 5.49998C21.1 5.49998 22 6.29998 22 7.49998V15.9C22 17.1 21.1 17.9 20 17.9C19.8 17.9 19.6 17.9 19.4 17.8" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            TypeScript
          </span>
        </div>
        <div className="flex space-x-4">
          <span>Ln 23, Col 42</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span>LF</span>
        </div>
      </div>
    </div>
  );
};

// Enhanced stats dashboard with better animations
const StatsDashboard = () => {
  return (
    <div className="glass-effect rounded-2xl shadow-2xl overflow-hidden border border-white/10 dark:border-slate-700/30 transform transition-all hover:scale-[1.02] duration-300">
      <div className="bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 p-4">
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center shadow-lg mr-3 transform transition-transform hover:rotate-12 duration-300">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 dark:text-white">Udilovic Tech</span>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1 animate-pulse"></span>
            Online
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/80 dark:bg-slate-800/50 rounded-xl p-3 shadow-sm backdrop-blur-sm border border-white/40 dark:border-slate-700/30 transition-all hover:shadow-md hover:translate-y-[-2px] duration-300">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <svg className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 3H4a1 1 0 0 0-1 1v9H1l4 4 4-4H7V5h6zm10 7h-2V5h-6V3h7a1 1 0 0 1 1 1z"/>
                </svg>
                <span className="text-gray-900 dark:text-gray-100 text-sm font-medium">Web Development</span>
              </div>
              <span className="status-badge bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-xs px-2 py-0.5 rounded-full">Active</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Modern web applications with React & Next.js</p>
          </div>
        
          <div className="bg-white/80 dark:bg-slate-800/50 rounded-xl p-3 shadow-sm backdrop-blur-sm border border-white/40 dark:border-slate-700/30 transition-all hover:shadow-md hover:translate-y-[-2px] duration-300">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <svg className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"/>
                </svg>
                <span className="text-gray-900 dark:text-gray-100 text-sm font-medium">QA Services</span>
              </div>
              <span className="status-badge bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 text-xs px-2 py-0.5 rounded-full">Popular</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Testing and quality assurance</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white p-3 rounded-xl mb-4 shadow-lg transform transition-all hover:translate-x-1 duration-300">
          <div className="flex items-center mb-1.5">
            <svg className="h-4 w-4 mr-1.5 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
              <path d="M10 5a1 1 0 100 2 1 1 0 000-2zm0 3a1 1 0 00-1 1v3a1 1 0 002 0V9a1 1 0 00-1-1z"/>
            </svg>
            <span className="font-medium text-sm">Udilovic Tech Expertise</span>
          </div>
          <div className="ml-5 space-y-0.5 text-xs">
            <div className="flex items-center">
              <span className="mr-1.5 text-blue-300">•</span>
              <span>TypeScript & React</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1.5 text-blue-300">•</span>
              <span>Node.js & Next.js</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1.5 text-blue-300">•</span>
              <span>Testing & QA</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="text-center bg-white/60 dark:bg-slate-800/40 rounded-lg py-2 backdrop-blur-sm transition-all hover:bg-white/80 dark:hover:bg-slate-800/60 duration-300">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Projects</div>
            <div className="text-blue-600 dark:text-blue-400 font-semibold text-sm">87+</div>
          </div>
          <div className="text-center bg-white/60 dark:bg-slate-800/40 rounded-lg py-2 backdrop-blur-sm transition-all hover:bg-white/80 dark:hover:bg-slate-800/60 duration-300">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Clients</div>
            <div className="text-blue-600 dark:text-blue-400 font-semibold text-sm">42</div>
          </div>
          <div className="text-center bg-white/60 dark:bg-slate-800/40 rounded-lg py-2 backdrop-blur-sm transition-all hover:bg-white/80 dark:hover:bg-slate-800/60 duration-300">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Success Rate</div>
            <div className="text-blue-600 dark:text-blue-400 font-semibold text-sm">99%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modern navigation buttons with hover effects
const NavigationButtons = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <motion.a 
        href="#contact" 
        className="btn btn-primary group relative overflow-hidden"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="relative z-10 flex items-center">
          Get Started
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </motion.a>
      
      <motion.a 
        href="#services" 
        className="btn btn-outline group relative overflow-hidden"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="relative z-10 flex items-center">
          Our Services
          <svg className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </motion.a>
    </div>
  );
};

// Main Hero component
const Hero = () => {
  const { theme } = useTheme();
  const [visibleLines, setVisibleLines] = useState(() => 0);
  const [logoHovered, setLogoHovered] = useState(false);

  const codeLines = [
    "// Modern web solutions with Udilovic Tech",
    "import { useState } from 'react';",
    "import { createClient } from '@/lib/client';",
    "",
    "export default function App() {",
    "  const [isLoading, setIsLoading] = useState(false);",
    "  const client = createClient();",
    "",
    "  const handleSubmit = async (data) => {",
    "    setIsLoading(true);",
    "    try {",
    "      await client.deploy(data);",
    "      // Success! Your project is live",
    "    } catch (error) {",
    "      console.error(error);",
    "    } finally {",
    "      setIsLoading(false);",
    "    }",
    "  };",
    "  ",
    "  return (",
    "    <div className=\"container\">",
    "      <h1>Your Vision, Our Code</h1>",
    "      <Button onClick={handleSubmit}>",
    "        {isLoading ? 'Deploying...' : 'Launch Project'}",
    "      </Button>",
    "    </div>",
    "  );",
    "}"
  ];

  useEffect(() => {
    let isMounted = true;
    const timer = setInterval(() => {
      if (isMounted) {
        setVisibleLines(prev => {
          if (prev < codeLines.length) {
            return prev + 1;
          }
          clearInterval(timer);
          return prev;
        });
      }
    }, 120);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [codeLines.length]);

  // Company logo component
  const CompanyLogo = useCallback(({ name, src }: { name: string, src: string }) => (
    <div className="group relative">
      <motion.img 
        src={src} 
        alt={name} 
        className="h-8 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
        whileHover={{ y: -3 }}
      />
      <motion.div 
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 h-0.5 w-0"
        initial={{ width: 0 }}
        whileHover={{ width: '80%' }}
      />
    </div>
  ), []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center overflow-hidden pt-24 md:pt-32"
    >   
      <ParticleBackground />
      
      {/* Gradient orbs */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-blue-400 dark:bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-400 dark:bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-emerald-400 dark:bg-emerald-500 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
         
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center mb-6">
              <motion.div 
                className="w-12 h-12 mr-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 10, scale: 1.1 }}
                onHoverStart={() => setLogoHovered(true)}
                onHoverEnd={() => setLogoHovered(false)}
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              <motion.div 
                className="text-3xl font-extrabold"
                animate={{ scale: logoHovered ? 1.03 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="gilroy">Udilović</span>
                <span className="gilroy text-blue-600 dark:text-blue-400"> Tech</span>
              </motion.div>
            </div>
            
            <h1 className="gilroy text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Building <span className="gradient-text text-shadow relative">
                digital solutions
                <svg className="absolute -bottom-3 left-0 w-full h-2 text-blue-600/20 dark:text-blue-500/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 C20,0 50,10 100,5 L100,10 L0,10 Z" fill="currentColor" />
                </svg>
              </span> for modern businesses
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl leading-relaxed">
              We specialize in creating high-performing web applications and software solutions that help businesses grow in the digital landscape.
            </p>
            
            <NavigationButtons />

            <div className="mt-12">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex items-center">
                <span className="inline-block w-12 h-px bg-gray-300 dark:bg-gray-700 mr-3"></span>
                Trusted by innovative companies
              </p>
              <div className="flex flex-wrap items-center gap-10">
                <CompanyLogo name="Company 1" src="/company1-logo.svg" />
                <CompanyLogo name="Company 2" src="/company2-logo.svg" />
                <CompanyLogo name="Company 3" src="/company3-logo.svg" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              {/* Code Editor */}
              <CodeDisplay codeLines={codeLines} visibleLines={visibleLines} />

              {/* Stats Dashboard */}
              <StatsDashboard />
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-400 dark:bg-yellow-500 rounded-full opacity-10 dark:opacity-5 blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-600 dark:bg-blue-500 rounded-full opacity-10 dark:opacity-5 blur-2xl"></div>
              
              {/* Badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 text-white text-xs px-3 py-1 rounded-full shadow-lg transform rotate-12">
                New features!
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <p className="text-xs mb-2">Scroll to explore</p>
        <motion.div 
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 