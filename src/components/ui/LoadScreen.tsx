import * as React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export default function LoadScreen() {
    const [visible, setVisible] = React.useState(true);

    React.useEffect(() => {
        // Hide this screen after the full animation (2 seconds)
        const timeout = window.setTimeout(() => {
            setVisible(false);
        }, 2000);
        return () => window.clearTimeout(timeout);
    }, []);

    // Staggered curtain reveal animation
    const containerVariants: Variants = {
        hidden: {},
        show: {
            transition: {
                delayChildren: 0.5,
                staggerChildren: 0.15,
            }
        }
    };

    const columnVariants: Variants = {
        hidden: { y: "0%" },
        show: {
            y: "-100%",
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    if (!visible) return null;

    return (
        <motion.div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 90, // Under the navbar
                display: "flex",
                overflow: "hidden",
                pointerEvents: "none"
            }}
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            {/* 5 Columns for the curtain reveal */}
            {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                    key={i}
                    variants={columnVariants}
                    style={{
                        flex: 1,
                        height: "100%",
                        backgroundColor: "#6b21a8", // Purple to match the SiteSmiths logo/aesthetic
                        borderRight: i < 4 ? "1px solid rgba(255, 255, 255, 0.05)" : "none"
                    }}
                />
            ))}
        </motion.div>
    );
}
