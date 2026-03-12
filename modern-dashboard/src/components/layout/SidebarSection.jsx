import React from 'react';

const SidebarSection = ({ title, icon: Icon, children, colorClass = "text-white" }) => {
    return (
        <div className="mb-8">
            <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${colorClass}`}>
                {Icon && <Icon />} {title}
            </h2>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );
};

export default SidebarSection;
