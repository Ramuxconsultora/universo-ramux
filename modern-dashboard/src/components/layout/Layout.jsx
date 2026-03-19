import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import NavigationBar from './NavigationBar';
import { NavigationProvider } from '../../contexts/NavigationContext';
import galacticBackground from '../../assets/galactic-background.png';

const Layout = ({ children, showNav = true, showSidebar = true, navProps = {}, sidebarProps = {} }) => {
    const location = useLocation();
    
    // Sidebar logic: Persistent en dashboard y noticias
    // Agregamos el check para que en el detalle de noticia (/news/...) el layout sepa cómo comportarse
    const isDashboard = location.pathname === '/dashboard' || location.pathname === '/noticias';
    const isNewsDetail = location.pathname.startsWith('/news/');
    
    // Combine passed props with auto-calculated drawer mode
    // Si es detalle de noticia, preferimos modo "Drawer" para que el texto ocupe más espacio
    const finalSidebarProps = {
        isDrawerOnly: !isDashboard || isNewsDetail,
        ...sidebarProps
    };

    // Centered layout if sidebar is hidden or in drawer mode (ideal para lectura de noticias)
    const shouldCenter = !showSidebar || finalSidebarProps.isDrawerOnly;

    return (
        <NavigationProvider>
            {/* Contenedor principal con scroll suave y fondo oscuro base */}
            <div className="antialiased min-h-screen flex flex-col font-sans text-white relative bg-[#02040a] overflow-x-hidden">
                
                {/* Galactic Background Layer con opacidad controlada para no cansar la vista */}
                <div className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat opacity-40"
                    style={{ backgroundImage: `url(${galacticBackground})` }}
                ></div>
                
                {/* Cosmic Overlay: Degradado para asegurar que el texto blanco siempre se lea bien */}
                <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-[#02040a] via-transparent to-[#02040a] pointer-events-none"></div>

                <Header />

                {/* Ajuste de Padding Top (pt-24 o pt-28) para que el Header no tape el contenido */}
                <div className="flex-grow pt-24 pb-12 px-4 max-w-[1600px] mx-auto w-full relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
                    
                    {/* Main Content Area */}
                    <main className={`flex-1 min-w-0 space-y-8 ${shouldCenter ? 'lg:max-w-5xl mx-auto w-full' : 'w-full'}`}>
                        {/* Barra de navegación interna (opcional según la página) */}
                        {showNav && <NavigationBar {...navProps} />}
                        
                        {/* Contenedor de los hijos con animación de entrada suave */}
                        <div className="animate-fade-in">
                            {children}
                        </div>
                    </main>

                    {/* Global Sidebar (Menu lateral dinámico) */}
                    {showSidebar && (
                        <aside className={`${finalSidebarProps.isDrawerOnly ? 'w-0' : 'lg:w-80'} transition-all duration-300`}>
                            <Sidebar {...finalSidebarProps} />
                        </aside>
                    )}
                </div>

                <Footer />
            </div>
        </NavigationProvider>
    );
};

export default Layout;
