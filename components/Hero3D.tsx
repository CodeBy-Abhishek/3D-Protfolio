'use client';
import { useState, useEffect } from 'react';

export default function Hero3D() {
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 z-10">
                <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/20 z-10 backdrop-blur-sm pointer-events-none">
                    <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
                </div>
            )}
            <iframe
                src="https://my.spline.design/genkubgreetingrobot-TfhbrfJuxxsR6alFZHXsBeGS/"
                frameBorder="0"
                width="100%"
                height="100%"
                className={`w-full h-full transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
                title="3D Robot Model"
            ></iframe>

            {/* Overlay to intercept mouse events if needed, but we want interaction so we keep it behind or limited */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(5,5,7,0.8)]"></div>
        </div>
    );
}
