import React, { useEffect, useRef } from 'react';
import NeumorphicPanel from '../ui/NeumorphicPanel';

const TradingViewChart = ({ symbol = "BCBA:GGAL" }) => {
    const containerRef = useRef();

    useEffect(() => {
        const scriptId = 'tradingview-widget-script';
        const renderWidget = () => {
            if (window.TradingView && containerRef.current) {
                new window.TradingView.widget({
                    "autosize": true,
                    "symbol": symbol,
                    "interval": "D",
                    "timezone": "Etc/UTC",
                    "theme": "dark",
                    "style": "1",
                    "locale": "es",
                    "toolbar_bg": "#1a1f2b",
                    "enable_publishing": false,
                    "hide_side_toolbar": false,
                    "allow_symbol_change": true,
                    "container_id": containerRef.current.id,
                    "backgroundColor": "rgba(10, 14, 26, 1)",
                    "gridColor": "rgba(42, 46, 57, 0.1)",
                    "width": "100%",
                    "height": "500"
                });
            }
        };

        if (window.TradingView) {
            renderWidget();
        } else {
            // Fallback load if not ready
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://s3.tradingview.com/tv.js';
            script.async = true;
            script.onload = renderWidget;
            document.head.appendChild(script);
        }
    }, [symbol]);

    return (
        <NeumorphicPanel className="p-4 md:p-8 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-black text-white italic tracking-tight uppercase">Advanced Technical Analysis</h3>
                    <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mt-1">Source: TradingView Official Widget</p>
                </div>
            </div>
            <div 
                id={`tradingview_${Math.random().toString(36).substring(7)}`} 
                ref={containerRef} 
                className="w-full h-[500px] rounded-2xl overflow-hidden border border-white/5" 
            />
        </NeumorphicPanel>
    );
};

export default TradingViewChart;
