import React from 'react';

const SidebarSection = ({ title, icon: Icon, children, colorClass = "text-slate-200" }) => {
    return (
        <div className="mb-8">
            <h2 className={`text-[22px] font-black mb-4 flex items-center justify-center gap-3 ${colorClass} uppercase tracking-tight`}>
                {Icon && <Icon size={20} />} {title}
            </h2>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );
};

export default SidebarSection;
