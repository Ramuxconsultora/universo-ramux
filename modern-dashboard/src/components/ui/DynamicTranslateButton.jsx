import React from 'react';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * DynamicTranslateButton - Reusable AI translation component.
 * 
 * TODO: When integrating actual AI capabilities (e.g. Gemini API), 
 * the system prompt MUST strictly be:
 * "Solo traduce el texto proporcionado al idioma destino. No agregues información extra, explicaciones, ni resúmenes."
 */
const DynamicTranslateButton = ({ text, className = "" }) => {
    const { t } = useTranslation();

    const handleTranslate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Llamando a la API de traducción para el contenido...", text);
        // FUTURE: call AI translate here, maybe display a toast with loading and then replace text or show modal.
    };

    return (
        <button
            onClick={handleTranslate}
            className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-400 hover:text-sky-400 bg-slate-800/50 hover:bg-slate-700/50 rounded transition-colors border border-slate-700/50 ${className}`}
            title={t("Traducir")}
        >
            <Languages size={14} />
            <span>{t("Traducir")}</span>
        </button>
    );
};

export default DynamicTranslateButton;
