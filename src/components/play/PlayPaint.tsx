'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { IconBrush, IconEraser, IconDeviceFloppy, IconArrowBack, IconArrowForward, IconTrash, IconPaint } from "@tabler/icons-react";
import Image from 'next/image';

const MAX_HISTORY = 20; // Limit history size to prevent memory bloat
const CANVAS_WIDTH = 2000;
const CANVAS_HEIGHT = 2000;

const colors = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#808040', '#004040', '#0080FF', '#004080', '#8000FF', '#804000',
  '#FFFFFF', '#C0C0C0', '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#FFFF80', '#00FF80', '#80FFFF', '#8080FF', '#FF0080', '#FF8040'
];

export function PlayPaint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [tool, setTool] = useState<'brush' | 'eraser' | 'bucket'>('brush');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);

  // Initialize canvas and context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    contextRef.current = context;
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Save initial state
    const initialState = context.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    setHistory([initialState]);
    setCurrentStep(0);

    // Cleanup function
    return () => {
      // Clear canvas
      context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      // Clear refs
      contextRef.current = null;
      // Clear history to free memory
      setHistory([]);
      setCurrentStep(-1);
    };
  }, []);

  const saveToHistory = () => {
    const context = contextRef.current;
    if (!context) return;

    const currentState = context.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Limit history size by removing oldest entries when exceeding MAX_HISTORY
    const newHistory = history.slice(Math.max(0, currentStep + 1 - MAX_HISTORY), currentStep + 1);
    newHistory.push(currentState);
    
    setHistory(newHistory);
    setCurrentStep(Math.min(currentStep + 1, MAX_HISTORY - 1));
  };

  const undo = () => {
    if (currentStep > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      const previousState = history[currentStep - 1];
      context.putImageData(previousState, 0, 0);
      setCurrentStep(currentStep - 1);
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      const nextState = history[currentStep + 1];
      context.putImageData(nextState, 0, 0);
      setCurrentStep(currentStep + 1);
    }
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'my-painting.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    if (tool === 'bucket') {
      context.fillStyle = color;
      context.fillRect(0, 0, canvas.width, canvas.height);
      saveToHistory();
      return;
    }

      const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
      context.beginPath();
      context.moveTo(x, y);
      setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

      const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
      context.lineTo(x, y);
      context.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
    context.lineWidth = tool === 'eraser' ? 40 : 4;
      context.lineCap = 'round';
    context.lineJoin = 'round';
      context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      saveToHistory();
    }
    setIsDrawing(false);
  };

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setPosition({
      x: e.clientX - (containerRef.current?.offsetLeft || 0),
      y: e.clientY - (containerRef.current?.offsetTop || 0)
    });
  };

  const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      const left = e.clientX - position.x;
      const top = e.clientY - position.y;
      if (containerRef.current) {
        containerRef.current.style.left = `${left}px`;
        containerRef.current.style.top = `${top}px`;
      }
    }
  };

  const stopDragging = () => {
    setDragging(false);
  };

  const setBackground = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04]" />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-50 via-surface-50/95 to-surface-50" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-emerald-500/[0.02]" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-12 gap-8 lg:flex-row-reverse flex-col">
              {/* Instructions Section - Full width on mobile, 1/3 width on desktop */}
              <div className="col-span-12 lg:col-span-4 order-1 lg:order-2 mb-8 lg:mb-0">
                <div className="bg-ethereal-dark/95 backdrop-blur-ethereal border border-ethereal-glass-border shadow-2xl rounded-2xl overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-2xl font-serif text-white mb-4">Reference Guide</h3>
                    <div className="prose prose-invert">
                      <p className="text-ethereal-text-secondary mb-6">
                        Start with a horizon line at 1/3 height. Add mountains using triangular shapes above, varying their heights. Place a sun in one upper corner. Add trees using simple vertical lines for trunks and cloud-like shapes for foliage. Finish with small v-shaped birds in the sky.
                      </p>
                    </div>
                    
                    <div className="mt-8">
                      <h4 className="text-lg font-medium text-white mb-3">Community Showcase</h4>
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src="/images/paint_image.jpg"
                          alt="Example landscape with basic shapes"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="mt-3 text-sm text-ethereal-text-secondary italic">
                        By @community_artist - "Mountain Sunset"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Canvas Section - Full width on mobile, 2/3 width on desktop */}
              <div className="col-span-12 lg:col-span-8 order-2 lg:order-1">
                <div 
                  ref={containerRef}
                  className="bg-ethereal-dark/95 backdrop-blur-ethereal border border-ethereal-glass-border shadow-2xl rounded-2xl mx-auto overflow-hidden" 
                  style={{ width: '100%' }}
                >
                  {/* Title Bar */}
                  <div 
                    className="bg-gradient-to-r from-blue-600/90 to-emerald-600/90 backdrop-blur-sm text-white px-4 py-2.5 flex justify-between items-center cursor-move"
                    onMouseDown={startDragging}
                    onMouseMove={onDrag}
                    onMouseUp={stopDragging}
                    onMouseLeave={stopDragging}
                  >
                    <div className="flex items-center gap-3">
                      <IconBrush className="w-5 h-5 text-white/90" />
                      <span className="font-medium font-mono tracking-wide">Digital Paint</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="h-6 w-6 p-0 min-w-0 text-white/90 hover:bg-white/10 rounded-lg">_</button>
                      <button className="h-6 w-6 p-0 min-w-0 text-white/90 hover:bg-white/10 rounded-lg">□</button>
                      <button className="h-6 w-6 p-0 min-w-0 text-white/90 hover:bg-white/10 rounded-lg">×</button>
                    </div>
                  </div>

                  {/* Menu Bar */}
                  <div className="bg-ethereal-dark/50 border-b border-ethereal-glass-border/20 px-4 py-1.5 text-sm font-medium text-ethereal-text-secondary/80">
                    <div className="flex gap-6">
                      <span className="hover:text-ethereal-text-primary cursor-pointer transition-colors">File</span>
                      <span className="hover:text-ethereal-text-primary cursor-pointer transition-colors">Edit</span>
                      <span className="hover:text-ethereal-text-primary cursor-pointer transition-colors">View</span>
                      <span className="hover:text-ethereal-text-primary cursor-pointer transition-colors">Image</span>
                      <span className="hover:text-ethereal-text-primary cursor-pointer transition-colors">Options</span>
                      <span className="hover:text-ethereal-text-primary cursor-pointer transition-colors">Help</span>
                    </div>
                  </div>

                  <div className="flex">
                    {/* Tools */}
                    <div className="w-14 bg-ethereal-dark/50 border-r border-ethereal-glass-border/20 p-2 flex flex-col gap-2">
                      <button
                        className={`w-10 h-10 p-0 min-w-0 rounded-xl transition-all duration-200 ${
                          tool === 'brush' 
                            ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30 shadow-sm' 
                            : 'text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10'
                        }`}
                        onClick={() => setTool('brush')}
                      >
                        <IconBrush className="w-5 h-5" />
                      </button>
                      <button
                        className={`w-10 h-10 p-0 min-w-0 rounded-xl transition-all duration-200 ${
                          tool === 'eraser' 
                            ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30 shadow-sm' 
                            : 'text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10'
                        }`}
                        onClick={() => setTool('eraser')}
                      >
                        <IconEraser className="w-5 h-5" />
                      </button>
                      <button
                        className={`w-10 h-10 p-0 min-w-0 rounded-xl transition-all duration-200 ${
                          tool === 'bucket' 
                            ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30 shadow-sm' 
                            : 'text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10'
                        }`}
                        onClick={() => setTool('bucket')}
                      >
                        <IconPaint className="w-5 h-5" />
                      </button>
                      <div className="h-px bg-ethereal-glass-border/20 my-2" />
                      <button
                        className="w-10 h-10 p-0 min-w-0 rounded-xl text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10 disabled:opacity-40 transition-all duration-200"
                        onClick={undo}
                        disabled={currentStep <= 0}
                      >
                        <IconArrowBack className="w-5 h-5" />
                      </button>
                      <button
                        className="w-10 h-10 p-0 min-w-0 rounded-xl text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10 disabled:opacity-40 transition-all duration-200"
                        onClick={redo}
                        disabled={currentStep >= history.length - 1}
                      >
                        <IconArrowForward className="w-5 h-5" />
                      </button>
                      <div className="h-px bg-ethereal-glass-border/20 my-2" />
                      <button
                        className="w-10 h-10 p-0 min-w-0 rounded-xl text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10 transition-all duration-200"
                        onClick={saveCanvas}
                      >
                        <IconDeviceFloppy className="w-5 h-5" />
                      </button>
                      <button
                        className="w-10 h-10 p-0 min-w-0 rounded-xl text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10 transition-all duration-200"
                        onClick={clearCanvas}
                      >
                        <IconTrash className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Canvas */}
                    <div className="flex-grow bg-white" style={{ height: '600px' }}>
                      <canvas
                        ref={canvasRef}
                        width={2000}
                        height={2000}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseOut={stopDrawing}
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div className="bg-ethereal-dark/50 border-t border-ethereal-glass-border/20 p-3">
                    <div className="flex flex-wrap gap-1.5">
                      {colors.map((c) => (
                        <button
                          key={c}
                          className={`w-8 h-8 p-0 min-w-0 rounded-lg transition-all duration-200 ${
                            color === c 
                              ? 'ring-2 ring-blue-400/60 ring-offset-2 ring-offset-ethereal-dark/50' 
                              : 'hover:ring-1 hover:ring-ethereal-glass-highlight/30 hover:ring-offset-1 hover:ring-offset-ethereal-dark/50'
                          }`}
                          style={{ backgroundColor: c }}
                          onClick={() => setColor(c)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Status Bar */}
                  <div className="bg-ethereal-dark/50 px-4 py-2 text-sm text-ethereal-text-secondary/70 border-t border-ethereal-glass-border/20 flex justify-between items-center">
                    <span>Ready</span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 bg-ethereal-dark/30 rounded">2000 x 2000 px</span>
                      <span className="px-2 py-1 bg-ethereal-dark/30 rounded">{tool === 'brush' ? 'Brush Tool' : tool === 'eraser' ? 'Eraser Tool' : 'Bucket Tool'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


