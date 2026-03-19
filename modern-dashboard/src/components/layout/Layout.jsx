import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import NavigationBar from './NavigationBar';
import { NavigationProvider } from '../../contexts/NavigationContext';
import galacticBackground from '../../assets/galactic-background.png';

const Layout = ({ children, showNav = true, showSidebar = true, navProps = {}, sidebarProps = {} }) => {
    const location = useLocation();
    
    // Lógica de rutas para comportamiento de Sidebar
    const isDashboard = location.pathname === '/dashboard' || location.pathname === '/noticias';
    const isNewsDetail = location.pathname.startsWith('/news/');
    
    // Configuramos si el Sidebar debe ser solo un "Drawer" (menú oculto) o estar fijo
    const finalSidebarProps = {
        isDrawerOnly: !isDashboard || isNewsDetail,
        ...sidebarProps
    };

    // Si es detalle de noticia, centramos el contenido para mejorar la lectura
    const shouldCenter = !showSidebar || finalSidebarProps.isDrawerOnly;

    return (
        <NavigationProvider>
            {/* Contenedor Base */}
            <div className="antialiased min-h-screen flex flex-col font-sans text-white relative bg-[#02040a] overflow-x-hidden">
                
                {/* Capa de Fondo Galáctico (Fixed para que no se mueva al hacer scroll) */}
                <div className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat opacity-40"
                    style={{ backgroundImage: `url(${galacticBackground})` }}
                ></div>
                
                {/* Overlay de Legibilidad (Garantiza contraste con el texto) */}
                <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-[#02040a] via-transparent to-[#02040a] pointer-events-none"></div>

                {/* El Header nuevo tiene z-[100] y h-20 */}
                <Header />

                {/* 
                   CONTENIDO PRINCIPAL 
                   pt-32: Deja espacio para el Header (h-20) + un margen visual de seguridad.
                */}
                <div className="flex-grow pt-32 pb-12 px-4 max-w-[1600px] mx-auto w-full relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
                    
                    {/* Área de Contenido */}
                    <main className={`flex-1 min-w-0 space-y-8 ${shouldCenter ? 'lg:max-w-5xl mx-auto w-full' : 'w-full'}`}>
                        
                        {/* 
                           NavigationBar: Se renderiza dentro del flujo para que baje con el scroll 
                           proporcionando los botones de "Regresar" y "Menú" secundarios.
                        */}
                        {showNav && <NavigationBar {...navProps} />}
                        
                        <div className="animate-fade-in">
                            {children}
                        </div>
                    </main>

                    {/* Sidebar lateral */}
                    {showSidebar && !finalSidebarProps.isDrawerOnly && (
                        <aside className="hidden lg:block lg:w-80 transition-all duration-300">
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
