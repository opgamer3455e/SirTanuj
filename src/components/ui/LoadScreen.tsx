import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
    fill?: string
    text?: string
    textColor?: string
    accentColor?: string
    duration?: number
    autoHide?: boolean
    showProgress?: boolean
    showSpinner?: boolean
    cornerRadius?: number
}

export default function LoadScreen(props: Props) {
    const {
        fill = "rgb(255, 47, 0)",
        text = "Loading",
        textColor = "#FFFFFF",
        accentColor = "#FFFFFF",
        duration = 2.4,
        autoHide = false,
        showProgress = true,
        showSpinner = true,
        cornerRadius = 0,
    } = props

    const [visible, setVisible] = React.useState(true)

    React.useEffect(() => {
        if (!autoHide) return
        const timeout = window.setTimeout(() => {
            setVisible(false)
        }, duration * 1000)
        return () => window.clearTimeout(timeout)
    }, [autoHide, duration])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.02,
                        filter: "blur(12px)",
                    }}
                    transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        minHeight: 480,
                        overflow: "hidden",
                        borderRadius: cornerRadius,
                        background: fill,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily:
                            "Inter, Inter Tight, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 28,
                            color: textColor,
                        }}
                    >
                        {showSpinner && (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 1.15,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                style={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: "50%",
                                    border: `2px solid ${withAlpha(
                                        textColor,
                                        0.22
                                    )}`,
                                    borderTopColor: accentColor,
                                    borderRightColor: accentColor,
                                }}
                            />
                        )}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 10,
                            }}
                        >
                            <motion.div
                                animate={{
                                    opacity: [0.55, 1, 0.55],
                                }}
                                transition={{
                                    duration: 1.6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                style={{
                                    fontSize: 18,
                                    lineHeight: 1.2,
                                    fontWeight: 600,
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                {text}
                            </motion.div>
                            <div
                                style={{
                                    width: 180,
                                    height: 1,
                                    background: withAlpha(textColor, 0.28),
                                }}
                            />
                        </div>
                        {showProgress && (
                            <div
                                style={{
                                    position: "relative",
                                    width: 260,
                                    height: 6,
                                    overflow: "hidden",
                                    borderRadius: 999,
                                    background: withAlpha(textColor, 0.18),
                                }}
                            >
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{
                                        duration: 1.25,
                                        repeat: Infinity,
                                        ease: [0.65, 0, 0.35, 1],
                                    }}
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        width: "55%",
                                        borderRadius: 999,
                                        background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                                    }}
                                />
                            </div>
                        )}
                    </motion.div>
                    <motion.div
                        aria-hidden
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.35, 0.65, 0.35],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            position: "absolute",
                            width: "42%",
                            aspectRatio: 1,
                            borderRadius: "50%",
                            background: `radial-gradient(circle, ${withAlpha(
                                accentColor,
                                0.34
                            )}, transparent 68%)`,
                            filter: "blur(42px)",
                            pointerEvents: "none",
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

function withAlpha(color: string, alpha: number) {
    if (color.startsWith("#")) {
        const hex = color.replace("#", "")
        const bigint = parseInt(hex.length === 3
            ? hex
                  .split("")
                  .map((char) => char + char)
                  .join("")
            : hex, 16)
        const r = (bigint >> 16) & 255
        const g = (bigint >> 8) & 255
        const b = bigint & 255
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
    if (color.startsWith("rgb(")) {
        return color.replace("rgb(", "rgba(").replace(")", `, ${alpha})`)
    }
    return color
}
