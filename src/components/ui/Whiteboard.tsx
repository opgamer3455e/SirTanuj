import React, { useRef, useState, useEffect } from 'react';
import { Pencil, Type, Image as ImageIcon, Trash2, CheckCircle } from 'lucide-react';
import { Socket } from 'socket.io-client';

interface WhiteboardProps {
  socket: Socket | null;
  roomId: string;
  isTeacher: boolean;
  initialWhiteboardActions?: any[]; // To sync state for late-joiners if available
}

export default function Whiteboard({ socket, roomId, isTeacher }: WhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'draw' | 'text' | 'image'>('draw');
  const [color, setColor] = useState('#FFFFFF');
  const [brushSize, setBrushSize] = useState(5);
  
  // Text Tool State
  const [textInput, setTextInput] = useState('');
  const [textPos, setTextPos] = useState<{ x: number; y: number } | null>(null);

  // Tracks the last mouse position to connect lines smoothly
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions
    canvas.width = canvas.parentElement?.clientWidth || 800;
    canvas.height = canvas.parentElement?.clientHeight || 500;
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;

    // Handle resizing
    const handleResize = () => {
      // Save canvas contents before resize
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) tempCtx.drawImage(canvas, 0, 0);

      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 500;
      
      // Restore styling
      context.lineCap = 'round';
      context.strokeStyle = color;
      context.lineWidth = brushSize;
      
      // Draw contents back
      context.drawImage(tempCanvas, 0, 0);
    };

    window.addEventListener('resize', handleResize);

    // Socket listeners for students to see teacher's whiteboard actions
    if (socket) {
      socket.on('whiteboard-action', (action: any) => {
        handleIncomingAction(action);
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (socket) {
        socket.off('whiteboard-action');
      }
    };
  }, [socket]);

  // Update stroke style when color/brush changes
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = brushSize;
    }
  }, [color, brushSize]);

  const handleIncomingAction = (action: any) => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    switch (action.type) {
      case 'draw':
        ctx.beginPath();
        ctx.strokeStyle = action.color;
        ctx.lineWidth = action.width;
        ctx.moveTo(action.x0, action.y0);
        ctx.lineTo(action.x1, action.y1);
        ctx.stroke();
        break;
      case 'text':
        ctx.fillStyle = action.color;
        ctx.font = `${action.size * 3}px Inter, sans-serif`;
        ctx.fillText(action.text, action.x, action.y);
        break;
      case 'image':
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, action.x, action.y, action.w, action.h);
        };
        img.src = action.dataUrl;
        break;
      case 'clear':
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        break;
    }
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    // Account for styling scale
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    return { x, y };
  };

  // --- DRAW TOOL ---
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isTeacher) return; // Only teacher can draw
    if (tool !== 'draw') return;

    const { x, y } = getCoordinates(e);
    setIsDrawing(true);
    lastPos.current = { x, y };

    contextRef.current?.beginPath();
    contextRef.current?.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPos.current || !contextRef.current || tool !== 'draw') return;

    const { x, y } = getCoordinates(e);
    const x0 = lastPos.current.x;
    const y0 = lastPos.current.y;

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();

    // Broadcast the drawing action
    const action = {
      type: 'draw',
      x0,
      y0,
      x1: x,
      y1: y,
      color,
      width: brushSize
    };
    socket?.emit('whiteboard-action', roomId, action);

    lastPos.current = { x, y };
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };

  // --- TEXT TOOL ---
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isTeacher) return;
    if (tool !== 'text') return;

    const { x, y } = getCoordinates(e);
    setTextPos({ x, y });
  };

  const submitText = () => {
    if (!textInput.trim() || !textPos || !contextRef.current) return;

    const ctx = contextRef.current;
    ctx.fillStyle = color;
    ctx.font = `${brushSize * 3}px Inter, sans-serif`;
    ctx.fillText(textInput, textPos.x, textPos.y);

    // Broadcast the text action
    const action = {
      type: 'text',
      text: textInput,
      x: textPos.x,
      y: textPos.y,
      color,
      size: brushSize
    };
    socket?.emit('whiteboard-action', roomId, action);

    setTextInput('');
    setTextPos(null);
  };

  // --- IMAGE TOOL ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTeacher) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const ctx = contextRef.current;
        const canvas = canvasRef.current;
        if (!ctx || !canvas) return;

        // Auto-scale image to fit canvas nicely
        const maxW = canvas.width * 0.5;
        const maxH = canvas.height * 0.5;
        let w = img.width;
        let h = img.height;

        if (w > maxW) {
          h = (maxW / w) * h;
          w = maxW;
        }
        if (h > maxH) {
          w = (maxH / h) * w;
          h = maxH;
        }

        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;

        ctx.drawImage(img, x, y, w, h);

        // Broadcast the image action
        const action = {
          type: 'image',
          dataUrl,
          x,
          y,
          w,
          h
        };
        socket?.emit('whiteboard-action', roomId, action);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  // --- CLEAR TOOL ---
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    socket?.emit('whiteboard-action', roomId, { type: 'clear' });
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl">
      {/* Tool Header (Only visible to teacher/host) */}
      {isTeacher && (
        <div className="flex items-center justify-between p-3 bg-black/60 border-b border-white/10 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setTool('draw'); setTextPos(null); }}
              className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                tool === 'draw' ? 'bg-[#FC642D] text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
              title="Draw Tool"
            >
              <Pencil size={18} />
            </button>
            
            <button
              onClick={() => { setTool('text'); }}
              className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                tool === 'text' ? 'bg-[#FC642D] text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
              title="Text Tool"
            >
              <Type size={18} />
            </button>

            <label className="p-2 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors" title="Insert Image">
              <ImageIcon size={18} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex items-center gap-4">
            {/* Color picker */}
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-6 h-6 rounded-full border-0 bg-transparent cursor-pointer"
                title="Brush/Text Color"
              />
              <span className="text-[10px] uppercase font-bold text-zinc-500 font-mono">{color}</span>
            </div>

            {/* Brush Size */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-zinc-500 font-mono">SIZE</span>
              <input
                type="range"
                min="2"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-20 accent-[#FC642D] cursor-pointer"
              />
              <span className="text-xs text-zinc-400 font-mono w-4">{brushSize}</span>
            </div>

            <button
              onClick={clearCanvas}
              className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2"
              title="Clear Canvas"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Canvas Area */}
      <div className="flex-1 relative overflow-hidden bg-black/40">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onClick={handleCanvasClick}
          className={`w-full h-full block ${isTeacher ? 'cursor-crosshair' : 'cursor-default'}`}
        />

        {/* Text Input Overlay for Teacher */}
        {textPos && (
          <div
            className="absolute z-20 flex items-center gap-2 p-1.5 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl"
            style={{
              left: `${(textPos.x / (canvasRef.current?.width || 1)) * 100}%`,
              top: `${(textPos.y / (canvasRef.current?.height || 1)) * 100}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <input
              type="text"
              autoFocus
              placeholder="Type message..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitText()}
              className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#FC642D] transition-colors w-40"
            />
            <button
              onClick={submitText}
              className="p-1.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg transition-colors"
            >
              <CheckCircle size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
