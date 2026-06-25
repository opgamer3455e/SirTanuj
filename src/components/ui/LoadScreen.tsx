import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadScreen() {
    const [visible, setVisible] = React.useState(true);

    React.useEffect(() => {
        // Hide this screen after the full animation (2 seconds)
        const timeout = window.setTimeout(() => {
            setVisible(false);
        }, 2000);
        return () => window.clearTimeout(timeout);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "#FF0000",
                        zIndex: 90, // Under the navbar (which is 100)
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden"
                    }}
                >
                    {/* Grid Lines */}
                    <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "space-evenly", pointerEvents: "none" }}>
                        <div style={{ width: "2px", backgroundColor: "rgba(180, 0, 0, 0.5)", height: "100%" }} />
                        <div style={{ width: "2px", backgroundColor: "rgba(180, 0, 0, 0.5)", height: "100%" }} />
                        <div style={{ width: "2px", backgroundColor: "rgba(180, 0, 0, 0.5)", height: "100%" }} />
                        <div style={{ width: "2px", backgroundColor: "rgba(180, 0, 0, 0.5)", height: "100%" }} />
                    </div>

                    {/* Expanding White Square */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 0, 150] }}
                        transition={{
                            duration: 2,
                            times: [0, 0.5, 1], // wait 1s, then expand over 1s
                            ease: "easeInOut"
                        }}
                        style={{
                            width: "2vw",
                            height: "2vw",
                            backgroundColor: "#FFFFFF",
                            position: "absolute"
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
