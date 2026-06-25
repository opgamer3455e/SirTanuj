import * as React from "react"
import { motion } from "framer-motion"

type Props = {
    baseImage?: string
    revealImage?: string
    backgroundColor?: string
    blobSize?: number
    fadeSpeed?: number
    blobColorBackground?: string
    blobColorSoftShape?: string
    blobColorLine?: string
    mobileBreakpoint?: number
    mobilePosition?: "Top" | "Bottom" | "Center"
    fadeInDelay?: number
    fadeInDuration?: number
}

export default function LorenzoInteractivePortrait(props: Props) {
    const {
        baseImage = "https://framerusercontent.com/images/qvY2HYOKHmT5Urm3CA8rBFA0e4.png",
        revealImage = "https://framerusercontent.com/images/z4LUyH2iu95sOu5mTFtQjdinVI.png",
        backgroundColor = "#FFFFFF",
        blobSize = 0.35,
        fadeSpeed = 2.5,
        mobileBreakpoint = 768,
        mobilePosition = "Bottom",
        fadeInDelay = 0.2,
        fadeInDuration = 0.8,
    } = props
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const [pointer, setPointer] = React.useState({ x: 50, y: 50 })
    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
        const update = () => {
            setIsMobile(window.innerWidth <= mobileBreakpoint)
        }
        update()
        window.addEventListener("resize", update)
        return () => window.removeEventListener("resize", update)
    }, [mobileBreakpoint])

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100
        setPointer({
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
        })
    }

    function handlePointerLeave() {
        setPointer({ x: 50, y: 50 })
    }

    const mobileAlignment =
        mobilePosition === "Top"
            ? "flex-start"
            : mobilePosition === "Bottom"
              ? "flex-end"
              : "center"
    const revealRadius = `${Math.round(blobSize * 100)}%`

    return (
        <motion.div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: fadeInDelay,
                duration: fadeInDuration,
                ease: [0.22, 1, 0.36, 1],
            }}
            style={{
                width: 250,
                height: 250,
                position: "relative",
                overflow: "hidden",
                borderRadius: "50%",
                background: backgroundColor,
                display: "flex",
                alignItems: isMobile ? mobileAlignment : "center",
                justifyContent: "center",
                cursor: "none",
                userSelect: "none",
            }}
        >
            <img
                src={baseImage}
                alt=""
                draggable={false}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
            <img
                src={revealImage}
                alt=""
                draggable={false}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: `clip-path ${fadeSpeed}s cubic-bezier(.22,1,.36,1)`,
                    clipPath: `circle(${revealRadius} at ${pointer.x}% ${pointer.y}%)`,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    left: `${pointer.x}%`,
                    top: `${pointer.y}%`,
                    width: `${blobSize * 220}px`,
                    height: `${blobSize * 220}px`,
                    transform: "translate(-50%, -50%)",
                    borderRadius: "44% 56% 58% 42% / 48% 44% 56% 52%",
                    border: "1px solid rgba(232, 232, 232, 0.8)",
                    background:
                        "radial-gradient(circle at 35% 35%, rgba(255,255,255,.55), rgba(245,245,245,.22) 55%, rgba(255,255,255,0) 72%)",
                    mixBlendMode: "screen",
                    pointerEvents: "none",
                    transition: `left ${fadeSpeed}s cubic-bezier(.22,1,.36,1), top ${fadeSpeed}s cubic-bezier(.22,1,.36,1)`,
                }}
            />
        </motion.div>
    )
}
