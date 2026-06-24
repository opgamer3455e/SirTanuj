import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
const ElasticHueSlider = ({ value, onChange, min = 0, max = 360, step = 1, label = 'Adjust Hue', }) => {
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef(null);
    const progress = ((value - min) / (max - min));
    const thumbPosition = progress * 100;
    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    return (_jsxs("div", { className: "scale-50 relative w-full max-w-xs flex flex-col items-center", ref: sliderRef, children: [label && _jsx("label", { htmlFor: "hue-slider-native", className: "text-gray-300 text-sm mb-1", children: label }), _jsxs("div", { className: "relative w-full h-5 flex items-center", children: [_jsx("input", { id: "hue-slider-native", type: "range", min: min, max: max, step: step, value: value, onChange: (e) => onChange(Number(e.target.value)), onMouseDown: handleMouseDown, onMouseUp: handleMouseUp, onTouchStart: handleMouseDown, onTouchEnd: handleMouseUp, className: "absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer z-20 opacity-0" }), _jsx("div", { className: "absolute left-0 w-full h-1 bg-gray-700 rounded-full z-0" }), _jsx("div", { className: "absolute left-0 h-1 bg-blue-500 rounded-full z-10", style: { width: `${thumbPosition}%` } }), _jsx(motion.div, { className: "absolute top-1/2 transform -translate-y-1/2 z-30 w-4 h-4 bg-white rounded-full shadow-lg", style: { left: `calc(${thumbPosition}% - 8px)` }, animate: { scale: isDragging ? 1.4 : 1 }, transition: { type: "spring", stiffness: 500, damping: isDragging ? 20 : 30 } })] }), _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, y: -5 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 5 }, transition: { duration: 0.2 }, className: "text-xs text-gray-400 mt-4", children: [value, "\u00B0"] }, value) })] }));
};
const FeatureItem = ({ name, value, position }) => {
    return (_jsx("div", { className: `absolute ${position} z-10 group transition-all duration-300 hover:scale-110`, children: _jsxs("div", { className: "flex items-center gap-2 relative", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-2 h-2 bg-white rounded-full group-hover:animate-pulse" }), _jsx("div", { className: "absolute -inset-1 bg-white/20 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300" })] }), _jsxs("div", { className: " text-white relative", children: [_jsx("div", { className: "font-medium group-hover:text-white transition-colors duration-300", children: name }), _jsx("div", { className: "text-white/70 text-sm group-hover:text-white/70 transition-colors duration-300", children: value }), _jsx("div", { className: "absolute -inset-2 bg-white/10 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 -z-10" })] })] }) }));
};
const Lightning = ({ hue = 210, // Adjusted to match Skolla electric blue
xOffset = 0, speed = 1, intensity = 1, size = 1, }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const resizeCanvas = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        const gl = canvas.getContext("webgl");
        if (!gl) {
            console.error("WebGL not supported");
            return;
        }
        const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;
        const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      
      #define OCTAVE_COUNT 10

      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
          p = fract(p * .1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));
          
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          vec2 uv = fragCoord / iResolution.xy;
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          uv.x += uXOffset;
          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
          
          float dist = abs(uv.x);
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
          vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
          col = pow(col, vec3(1.0));
          fragColor = vec4(col, 1.0);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;
        const compileShader = (source, type) => {
            const shader = gl.createShader(type);
            if (!shader)
                return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error("Shader compile error:", gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };
        const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
        if (!vertexShader || !fragmentShader)
            return;
        const program = gl.createProgram();
        if (!program)
            return;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Program linking error:", gl.getProgramInfoLog(program));
            return;
        }
        gl.useProgram(program);
        const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        const aPosition = gl.getAttribLocation(program, "aPosition");
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
        const iTimeLocation = gl.getUniformLocation(program, "iTime");
        const uHueLocation = gl.getUniformLocation(program, "uHue");
        const uXOffsetLocation = gl.getUniformLocation(program, "uXOffset");
        const uSpeedLocation = gl.getUniformLocation(program, "uSpeed");
        const uIntensityLocation = gl.getUniformLocation(program, "uIntensity");
        const uSizeLocation = gl.getUniformLocation(program, "uSize");
        const startTime = performance.now();
        const render = () => {
            resizeCanvas();
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
            const currentTime = performance.now();
            gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);
            gl.uniform1f(uHueLocation, hue);
            gl.uniform1f(uXOffsetLocation, xOffset);
            gl.uniform1f(uSpeedLocation, speed);
            gl.uniform1f(uIntensityLocation, intensity);
            gl.uniform1f(uSizeLocation, size);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [hue, xOffset, speed, intensity, size]);
    return _jsx("canvas", { ref: canvasRef, className: "w-full h-full relative" });
};
export const HeroSection = () => {
    const [lightningHue, setLightningHue] = useState(210); // Match Skolla Electric Blue
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };
    return (_jsxs("div", { className: "relative w-full h-[85vh] bg-transparent text-white overflow-hidden rounded-b-[40px]", children: [_jsxs("div", { className: "relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center", children: [_jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "absolute w-full z-10 top-[20%] left-0 right-0 pointer-events-none", children: [_jsx(motion.div, { variants: itemVariants, children: _jsx(FeatureItem, { name: "React", value: "Interactive", position: "left-4 sm:left-20 top-40" }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(FeatureItem, { name: "Tailwind", value: "Styled", position: "left-1/4 top-10" }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(FeatureItem, { name: "Framer", value: "Animated", position: "right-1/4 top-10" }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(FeatureItem, { name: "WebGL", value: "Lightning", position: "right-4 sm:right-20 top-40" }) })] }), _jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "relative z-30 flex flex-col items-center text-center max-w-4xl mx-auto mt-[-100px]", children: [_jsx(ElasticHueSlider, { value: lightningHue, onChange: setLightningHue, label: "" }), _jsxs(motion.button, { variants: itemVariants, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "flex items-center space-x-2 px-6 py-2 bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md rounded-full text-sm mb-8 transition-all duration-300 group shadow-[0_0_15px_rgba(255,255,255,0.05)]", children: [_jsx("span", { className: "font-medium text-white/90 tracking-wide", children: "Join us for a free trial" }), _jsx(ArrowRight, { size: 16, className: "transform group-hover:translate-x-1 transition-transform duration-300 text-white/80" })] }), _jsx(motion.h1, { variants: itemVariants, className: "text-5xl md:text-8xl font-bold mb-4 font-display tracking-tight text-white drop-shadow-lg", children: "Master Your Future." }), _jsx(motion.h2, { variants: itemVariants, className: "text-2xl md:text-4xl pb-4 font-medium bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent", children: "Lighting Up The Curriculum" }), _jsx(motion.p, { variants: itemVariants, className: "text-gray-400 text-lg mb-12 max-w-2xl font-light", children: "Interactive literature guides, comprehensive lab manuals, and top-tier notes designed to help you score 95%+ in your board exams." }), _jsx(motion.button, { variants: itemVariants, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]", children: "Start Learning" })] })] }), _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1.5 }, className: "absolute inset-0 z-0 pointer-events-none", children: [_jsx("div", { className: "absolute inset-0 bg-[#0A0A0A]/60 backdrop-blur-[2px]" }), _jsx("div", { className: "absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[100px] opacity-30", style: { background: `radial-gradient(circle, hsl(${lightningHue}, 100%, 60%) 0%, transparent 60%)` } }), _jsx("div", { className: "absolute top-0 w-full left-1/2 transform -translate-x-1/2 h-full opacity-80 mix-blend-screen", children: _jsx(Lightning, { hue: lightningHue, xOffset: 0, speed: 1.2, intensity: 0.8, size: 1.5 }) }), _jsx("div", { className: "z-10 absolute -bottom-[10%] left-1/2 transform -translate-x-1/2 w-[800px] h-[300px] backdrop-blur-2xl rounded-[100%] bg-[radial-gradient(ellipse_at_top,_rgba(20,20,20,0.8)_0%,_#0A0A0A_70%)] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]" })] })] }));
};
