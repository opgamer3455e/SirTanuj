import * as React from "react";
import { motion } from "framer-motion";

type Props = {
    baseImage: string;
    revealImage: string;
};

export default function AdvancedInteractivePortrait({ baseImage, revealImage }: Props) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [pointer, setPointer] = React.useState({ x: 0.5, y: 0.5 });
    const [isHovered, setIsHovered] = React.useState(false);

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        setPointer({
            x: Math.max(0, Math.min(1, x)),
            y: Math.max(0, Math.min(1, y)),
        });
    }

    function handlePointerLeave() {
        setIsHovered(false);
        setPointer({ x: 0.5, y: 0.5 });
    }

    function handlePointerEnter() {
        setIsHovered(true);
    }

    // Determine opacities of different sections based on pointer (x, y)
    // x and y are 0 to 1
    const { x, y } = pointer;

    let crownOpacity = 0;
    let gogglesOpacity = 0;
    let mouthOpacity = 0;
    let collarLeftOpacity = 0;
    let collarRightOpacity = 0;

    if (isHovered) {
        // Top Left (x < 0.4, y < 0.4)
        if (x < 0.4 && y < 0.4) {
            crownOpacity = 1;
            gogglesOpacity = 1;
            collarLeftOpacity = 1;
        }
        // Bottom Left (x < 0.4, y > 0.6)
        else if (x < 0.4 && y > 0.6) {
            mouthOpacity = 1;
            collarLeftOpacity = 1;
            collarRightOpacity = 1;
        }
        // Far Right (x > 0.7, y > 0.4)
        else if (x > 0.7 && y > 0.4) {
            collarLeftOpacity = 0.5; // only small fragment of collar
        }
        // Top Right (x > 0.7, y < 0.4)
        else if (x > 0.7 && y < 0.4) {
            // Disappear sequentially - handled by just turning off
            crownOpacity = 0;
            gogglesOpacity = 0;
            mouthOpacity = 0;
            collarLeftOpacity = 0;
            collarRightOpacity = 0;
        }
        // Central Hover (0.4 <= x <= 0.7, 0.4 <= y <= 0.7)
        else if (x >= 0.4 && x <= 0.7 && y >= 0.4 && y <= 0.7) {
            gogglesOpacity = 1;
            mouthOpacity = 1;
        }
        // Upper Middle (0.4 <= x <= 0.7, y < 0.4)
        else if (x >= 0.4 && x <= 0.7 && y < 0.4) {
            crownOpacity = 1;
            gogglesOpacity = 1;
            mouthOpacity = 1;
            collarLeftOpacity = 1;
            collarRightOpacity = 1;
        }
        // Bottom Middle
        else {
            mouthOpacity = 1;
            collarLeftOpacity = 1;
            collarRightOpacity = 1;
        }
    }

    const sections = [
        {
            id: "crown",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 30%, 0% 30%)",
            opacity: crownOpacity
        },
        {
            id: "goggles",
            clipPath: "polygon(0% 30%, 100% 30%, 100% 55%, 0% 55%)",
            opacity: gogglesOpacity
        },
        {
            id: "mouth",
            clipPath: "polygon(0% 55%, 100% 55%, 100% 80%, 0% 80%)",
            opacity: mouthOpacity
        },
        {
            id: "collarLeft",
            clipPath: "polygon(0% 80%, 50% 80%, 50% 100%, 0% 100%)",
            opacity: collarLeftOpacity
        },
        {
            id: "collarRight",
            clipPath: "polygon(50% 80%, 100% 80%, 100% 100%, 50% 100%)",
            opacity: collarRightOpacity
        }
    ];

    return (
        <div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerEnter={handlePointerEnter}
            style={{
                width: 400,
                height: 500,
                position: "relative",
                overflow: "hidden",
                borderRadius: "20px",
                background: "#FFFFFF", // "The background is completely solid white"
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                cursor: "crosshair"
            }}
        >
            {/* Base Image */}
            <img
                src={baseImage}
                alt="Base"
                draggable={false}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                }}
            />

            {/* Faint translucent smoke-like light grey shapes */}
            <motion.div
                animate={{ opacity: isHovered ? 0.4 : 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(circle at 50% 50%, rgba(200,200,200,0.5), transparent 70%)",
                    pointerEvents: "none"
                }}
            />

            {/* Overlay Sections */}
            {sections.map((sec) => (
                <motion.img
                    key={sec.id}
                    src={revealImage}
                    alt={sec.id}
                    draggable={false}
                    animate={{ opacity: sec.opacity }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        clipPath: sec.clipPath,
                        pointerEvents: "none",
                        filter: "contrast(1.1) saturate(1.2)"
                    }}
                />
            ))}
        </div>
    );
}
