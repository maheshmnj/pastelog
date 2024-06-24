import React, { useEffect, useRef, useState } from 'react';
import useBannerState from '../_services/BannerState';

type BannerProps = {
    children?: React.ReactNode;
    message: string;
    className?: string;
    show: boolean;
};

const Banner: React.FC<BannerProps> = ({ children, className, show }) => {
    const [height, setHeight] = useState<number | undefined>(undefined);
    const contentRef = useRef<HTMLDivElement>(null);
    const { show: showRemote, message } = useBannerState();
    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        }
    }, [message, children]);


    useEffect(() => {
        console.log('Banner state updated:', { show, message });
    }, [show, showRemote, message]);

    return (
        <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${className}`}
            style={{
                maxHeight: show && showRemote ? height : 0,
                opacity: show && showRemote ? 1 : 0,
                transform: show && showRemote ? 'translateY(0)' : 'translateY(-100%)',
            }}
        >
            <div ref={contentRef} className="flex items-center justify-center text-center bg-emerald-600">
                <div className='grow'><p className='text-white'>{message}</p></div>
                {children}
            </div>
            {/* Debugging info */}
            <div className="text-xs text-gray-500">
                Show: {show.toString()}, Message: {message}
            </div>
        </div>
    );
};

export default Banner;