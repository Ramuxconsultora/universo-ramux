import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import NavigationBar from './NavigationBar';
import { NavigationProvider } from '../../contexts/NavigationContext';

const Layout = ({ children, showNav = true, showSidebar = true, navProps = {}, sidebarProps = {} }) => {
    const location = useLocation();
    
    // Sidebar logic: Persistent only on dashboard and noticias
    const isDashboard = location.pathname === '/dashboard' || location.pathname === '/noticias';
    
    // Combine passed props with auto-calculated drawer mode
    const finalSidebarProps = {
        isDrawerOnly: !isDashboard,
        ...sidebarProps
    };

    // Centered layout if sidebar is hidden or in drawer mode
    const shouldCenter = !showSidebar || finalSidebarProps.isDrawerOnly;
    return (
        <NavigationProvider>
            <div className="antialiased min-h-screen flex flex-col font-sans text-white relative bg-[#02040a]">
                <Header />

                <div className="flex-grow pt-28 pb-12 px-4 max-w-[1600px] mx-auto w-full relative z-10 flex flex-col lg:flex-row gap-12">
                    {/* Main Content Area */}
                    <main className={`flex-1 min-w-0 space-y-8 ${shouldCenter ? 'lg:max-w-4xl mx-auto' : ''}`}>
                        {showNav && <NavigationBar {...navProps} />}
                        {children}
                    </main>

                    {/* Global Sidebar (Menu) */}
                    {showSidebar && <Sidebar {...finalSidebarProps} />}
                </div>

                <Footer />
            </div>
        </NavigationProvider>
    );
};

export default Layout;
