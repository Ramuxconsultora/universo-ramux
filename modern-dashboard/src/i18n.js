import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "Bienvenido/a a Universo Ramux": "Welcome to Ramux Universe",
            "Terminal RAMUX": "RAMUX Terminal",
            "Canal de Noticias y Análisis Automático": "Automated News & Analysis Channel",
            "Noticias": "News",
            "Comunidad": "Community",
            "Nacional": "National",
            "Internacional": "International",
            "Economía, Mercado y Finanzas": "Economy, Market & Finance",
            "Tecnología e Innovación": "Technology & Innovation",
            "Live Feed": "Live Feed",
            "items": "items",
            "Fuente": "Source",
            "Leer artículo completo": "Read full article",
            "Visita la fuente original para más detalles.": "Visit the original source for more details.",
            "Ir a la Fuente": "Go to Source",
            "Volver": "Back",
            "Traducir": "Translate",
            "STATUS_ONLINE": "Online",
            "LOGIN": "Log in",
            "SOCIAL_FOLLOW": "Follow us"
        }
    },
    es: {
        translation: {
            "Bienvenido/a a Universo Ramux": "Bienvenido/a a Universo Ramux",
            "Terminal RAMUX": "Terminal RAMUX",
            "Canal de Noticias y Análisis Automático": "Canal de Noticias y Análisis Automático",
            "Noticias": "Noticias",
            "Comunidad": "Comunidad",
            "Nacional": "Nacional",
            "Internacional": "Internacional",
            "Economía, Mercado y Finanzas": "Economía, Mercado y Finanzas",
            "Tecnología e Innovación": "Tecnología e Innovación",
            "Live Feed": "Live Feed",
            "items": "items",
            "Fuente": "Fuente",
            "Leer artículo completo": "Leer artículo completo",
            "Visita la fuente original para más detalles.": "Visita la fuente original para más detalles.",
            "Ir a la Fuente": "Ir a la Fuente",
            "Volver": "Volver",
            "Traducir": "Traducir",
            "STATUS_ONLINE": "En Línea",
            "LOGIN": "Iniciar Sesión",
            "SOCIAL_FOLLOW": "Síguenos"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false, // react already safes from xss
        }
    });

export default i18n;
