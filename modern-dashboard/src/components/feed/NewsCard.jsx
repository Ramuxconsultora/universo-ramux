const NewsCard = ({ item, neonColor = 'cyan' }) => {
    // Colors based on neonColor prop
    const colorMap = {
        cyan: 'text-cyan-400 border-cyan-500/20',
        lime: 'text-lime-400 border-lime-500/20',
        amber: 'text-amber-400 border-amber-500/20',
        violet: 'text-violet-400 border-violet-500/20'
    };

    const activeColor = colorMap[neonColor] || colorMap.cyan;

    const itemUrl = item.url || '#';
