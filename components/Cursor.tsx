'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function Cursor() {
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).closest('button')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="hidden lg:block">
            {/* Primary Dot */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-500 rounded-full pointer-events-none z-[10000]"
                style={{ x: mouseX, y: mouseY, translateX: -0.75, translateY: -0.75 }}
            />
            {/* Secondary Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-cyan-500/30 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
                style={{ x: cursorX, y: cursorY, translateX: -16, translateY: -16 }}
                animate={{
                    scale: isHovered ? 1.5 : 1,
                    borderColor: isHovered ? 'rgba(6, 182, 212, 0.6)' : 'rgba(6, 182, 212, 0.3)',
                }}
            >
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute inset-0 border border-cyan-500/20 rounded-full"
                        />
                    )}
                </AnimatePresence>

                {/* Subdued Lock-on Text */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.span
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 25 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute left-full ml-4 text-[7px] font-mono text-cyan-500/70 whitespace-nowrap tracking-[0.4em] uppercase"
                        >
                            Node::Interacted
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
