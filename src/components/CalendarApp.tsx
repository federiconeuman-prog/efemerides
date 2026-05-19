import React, { useState, useMemo, useRef, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { parseCsvEvents, Evento } from '../data/events';
import { getJewishHolidaysForYear } from '../data/jewishHolidays';
import { neoResourcesMap } from '../data/neoResources';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Tag, BookOpen, ExternalLink, Star, Globe, Book, X, Info, Search, Filter, ChevronDown, ChevronLeft as ChevronLeftIcon, List, LayoutGrid } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'motion/react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTitleCase(text: string) {
    const connectors = ['y', 'e', 'ni', 'o', 'u', 'de', 'del', 'la', 'las', 'el', 'los', 'en', 'con', 'por', 'a'];
    return text.split(' ').map((word, index) => {
        const cleaned = word.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '');
        if (cleaned.toUpperCase() === 'ESI' || cleaned.toUpperCase() === 'TIC' || cleaned.toUpperCase() === 'STEM') {
            return word.toUpperCase();
        }
        
        const lower = word.toLowerCase();
        if (index > 0 && connectors.includes(lower)) {
            return lower;
        }
        
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }).join(' ');
}

const getTypeStyles = (tipo: string, isJewish?: boolean) => {
  if (isJewish || tipo === 'Efemérides religiosas' || tipo === 'Efemérides judías') {
    return { bg: 'bg-[var(--color-brand-yellow)]', text: 'text-[var(--color-brand-dark)]', icon: Book, label: 'Efeméride Religiosa', shortLabel: 'Religiosas' };
  }
  if (tipo === 'Efemérides internacionales') {
    return { bg: 'bg-[var(--color-brand-dark)]', text: 'text-[var(--color-brand-white)]', icon: Globe, label: 'Efeméride Internacional', shortLabel: 'Internacional' };
  }
  if (tipo === 'Efemérides nacionales') {
    return { bg: 'bg-[var(--color-brand-blue)]', text: 'text-[var(--color-brand-white)]', icon: Star, label: 'Efeméride Nacional', shortLabel: 'Nacional' };
  }
  return { bg: 'bg-gray-500', text: 'text-white', icon: Tag, label: 'Efeméride General', shortLabel: 'General' };
};

const MONTHS_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio", 
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

const NEO_EFEMERIDES = {
  edicion: "128",
  tema: "NEO #128 - Efemérides",
  link: "https://campus.ort.edu.ar/articulo/2371902/-128-efemerides"
};

function MonthYearPicker({ 
  currentDate, 
  onSelect, 
  onClose 
}: { 
  currentDate: Date, 
  onSelect: (d: Date) => void, 
  onClose: () => void 
}) {
  const [viewMode, setViewMode] = useState<'months' | 'years'>('months');
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const selectedYear = currentDate.getFullYear();
    // Providing a wider range for selection
    return Array.from({ length: 101 }, (_, i) => currentYear - 50 + i);
  }, []);

  const [viewYear, setViewYear] = useState(currentDate.getFullYear());
  const yearsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewMode === 'years' && yearsGridRef.current) {
        const activeItem = yearsGridRef.current.querySelector(`[data-year-grid="${viewYear}"]`);
        if (activeItem) {
            activeItem.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
    }
  }, [viewMode, viewYear]);

  return (
    <>
      <div 
        className="fixed inset-0 z-[60] bg-black/20 md:bg-transparent backdrop-blur-[2px] md:backdrop-blur-none" 
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed md:absolute inset-x-4 top-[15%] md:inset-auto md:top-full md:left-0 mt-3 bg-white rounded-[32px] shadow-2xl border border-gray-100 p-5 md:p-7 z-[70] w-auto max-w-[360px] md:w-[380px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6 px-1">
            <button 
                onClick={() => setViewYear(prev => prev - 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-all active:scale-90"
            >
                <ChevronLeft className="w-6 h-6 text-gray-400" />
            </button>
            
            <button 
                onClick={() => setViewMode(viewMode === 'months' ? 'years' : 'months')}
                className="flex flex-col items-center group cursor-pointer"
            >
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:text-[var(--color-brand-blue)] transition-colors">
                    {viewMode === 'months' ? 'Toca para elegir año' : 'Volver a meses'}
                </span>
                <div className="flex items-center gap-2">
                    <div className="text-4xl font-bold text-[var(--color-brand-dark)] tracking-tight tabular-nums group-hover:text-[var(--color-brand-blue)] transition-colors font-display">
                        {viewYear}
                    </div>
                    <ChevronDown className={cn("w-6 h-6 text-gray-300 transition-transform duration-300", viewMode === 'years' && "rotate-180")} />
                </div>
            </button>

            <button 
                onClick={() => setViewYear(prev => prev + 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-all active:scale-90"
            >
                <ChevronRight className="w-6 h-6 text-gray-400" />
            </button>
        </div>

        <AnimatePresence mode="wait">
            {viewMode === 'months' ? (
                <motion.div
                    key="months"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="grid grid-cols-3 gap-3"
                >
                    {MONTHS_ES.map((month, index) => {
                        const isSelected = currentDate.getMonth() === index && currentDate.getFullYear() === viewYear;
                        return (
                            <button
                                key={month}
                                onClick={() => {
                                    const newDate = new Date(currentDate);
                                    newDate.setFullYear(viewYear);
                                    newDate.setMonth(index);
                                    onSelect(newDate);
                                }}
                                className={cn(
                                    "group py-4 px-2 rounded-2xl text-[11px] font-bold transition-all relative overflow-hidden uppercase tracking-widest",
                                    isSelected 
                                        ? "bg-[var(--color-brand-yellow)] text-[var(--color-brand-dark)]" 
                                        : "bg-gray-50/50 border border-transparent hover:border-gray-200 hover:bg-white text-gray-500 hover:text-[var(--color-brand-dark)]"
                                )}
                            >
                                <span className="relative z-10">{month}</span>
                            </button>
                        );
                    })}
                </motion.div>
            ) : (
                <motion.div
                    key="years"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-[280px]"
                >
                    <div 
                        ref={yearsGridRef}
                        className="grid grid-cols-4 gap-2 overflow-y-auto pr-2 custom-scrollbar"
                    >
                        {years.map(y => {
                            const isSelectedYear = viewYear === y;
                            return (
                                <button
                                    key={y}
                                    data-year-grid={y}
                                    onClick={() => {
                                        setViewYear(y);
                                        setViewMode('months');
                                    }}
                                    className={cn(
                                        "py-3 rounded-xl text-sm font-bold transition-all",
                                        isSelectedYear 
                                            ? "bg-[var(--color-brand-dark)] text-white" 
                                            : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                    )}
                                >
                                    {y}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="mt-8 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-4 px-4 bg-gray-50 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 transition-all text-xs uppercase tracking-widest md:hidden"
          >
            Cerrar
          </button>
          <button 
            onClick={() => onSelect(new Date())}
            className="flex-1 py-4 px-4 bg-[var(--color-brand-blue)] text-white font-bold rounded-2xl hover:bg-[var(--color-brand-dark)] transition-all text-xs uppercase tracking-widest text-center"
          >
            Ir a hoy
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [direction, setDirection] = useState(0);
  const [viewMode, setViewMode] = useState<'calendar' | 'agenda'>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllNeo, setShowAllNeo] = useState(false);
  const [hiddenCategories, setHiddenCategories] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // Parse static events
  const staticEvents = useMemo(() => parseCsvEvents(), []);
  
  // Get jewish holidays for current year
  const jewishHolidays = useMemo(() => {
    return getJewishHolidaysForYear(currentDate.getFullYear());
  }, [currentDate.getFullYear()]);

  // All events combined
  const allEvents = useMemo(() => {
    return [...staticEvents, ...jewishHolidays];
  }, [staticEvents, jewishHolidays]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(allEvents.map(e => e.tipo).filter(Boolean));
    return Array.from(cats).sort();
  }, [allEvents]);

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(subMonths(currentDate, 1));
  };
  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(addMonths(currentDate, 1));
  };
  const handleToday = () => {
    setDirection(0);
    setCurrentDate(new Date());
  };

  // Get days in current month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Map events to days
  const getEventsForDay = (date: Date) => {
    const monthName = format(date, 'MMMM', { locale: es });
    // Capitalize first letter of monthName to match CSV (e.g. "Enero", "Febrero")
    const monthNameCap = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    const dayNum = date.getDate();

    return allEvents.filter(ev => {
      // For static events, match month string and day number
      if (!ev.isJewish) {
        return ev.mes === monthNameCap && parseInt(ev.dia as string, 10) === dayNum;
      } else {
        // Jewish holidays already have exact month/day for the current year
        return ev.mes === monthNameCap && ev.dia === dayNum;
      }
    }).filter(ev => {
      if (hiddenCategories.includes(ev.tipo)) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return ev.nombre.toLowerCase().includes(query) || (ev.resumen && ev.resumen.toLowerCase().includes(query));
      }
      return true;
    });
  };

  const renderSidebar = (isMobile = false) => {
    const dayEventsForDate = selectedDate ? getEventsForDay(selectedDate) : [];

    if (!selectedDate && !selectedEvent) {
        if (isMobile) return null;
        return (
            <div className="flex flex-col gap-4 h-full">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center text-center flex-1 min-h-0">
                    <div className="w-48 h-48 mb-6 flex justify-center items-center">
                        <img src="/Efemerides.png" alt="Efemérides" className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Selecciona una fecha</h3>
                    <p className="text-sm text-gray-500 max-w-[250px]">
                        Haz clic en cualquier día marcado en el calendario para ver los detalles de la efeméride.
                    </p>
                </div>
            </div>
        );
    }

    // Show list view if date is selected but no specific event
    // OR if we are on mobile and a day with multiple events was just clicked
    // ONLY in calendar mode
    if (viewMode === 'calendar' && selectedDate && !selectedEvent) {
        return (
            <div className="flex flex-col gap-4 h-full pb-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300 flex-1 min-h-0">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <div>
                            <h3 className="text-xl font-bold text-[var(--color-brand-dark)] font-display">
                                {format(selectedDate, "d 'de' MMMM", { locale: es })}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {dayEventsForDate.length === 1 ? '1 efeméride' : `${dayEventsForDate.length} efemérides`}
                            </p>
                        </div>
                        <button 
                            onClick={() => {
                                setSelectedDate(null);
                                setSelectedEvent(null);
                            }}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm text-gray-500 hover:text-gray-800"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="p-4 flex flex-col gap-3 overflow-y-auto">
                        {dayEventsForDate.map((ev, i) => {
                            const styles = getTypeStyles(ev.tipo, ev.isJewish);
                            const Icon = styles.icon;
                            return (
                                <button 
                                    key={`${ev.id}-${i}`}
                                    onClick={() => {
                                        setSelectedEvent(ev);
                                        setShowAllNeo(false);
                                    }}
                                    className="flex flex-col gap-2 p-4 bg-white border border-gray-200 hover:border-[var(--color-brand-yellow)] hover:bg-amber-50/10 rounded-xl transition-all text-left group relative overflow-hidden"
                                >
                                    <div className={cn("absolute left-0 top-0 bottom-0 w-1", styles.bg)} />
                                    <div className="flex items-center gap-3">
                                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", styles.bg, styles.text)}>
                                            <Icon size={16} />
                                        </div>
                                        <h4 className="font-bold text-[var(--color-brand-dark)] text-sm group-hover:text-[var(--color-brand-blue)] transition-colors">
                                            {ev.nombre}
                                        </h4>
                                    </div>
                                    {ev.resumen && (
                                        <p className="text-xs text-gray-500 line-clamp-2 pl-11">
                                            {ev.resumen}
                                        </p>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    if (!selectedEvent) return null; // Fallback

    const typeStyles = getTypeStyles(selectedEvent.tipo, selectedEvent.isJewish);
    const Icon = typeStyles.icon;

    const eventName = (selectedEvent.nombre || "").toLowerCase();
    const normalizedName = eventName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Use the correctly matched imagenUrl from our data mapping
    const overrideImage = selectedEvent.imagenUrl;

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative flex flex-col animate-in fade-in slide-in-from-right-4 md:slide-in-from-right-4 duration-300 flex-1 min-h-0">
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                    {viewMode === 'calendar' && dayEventsForDate.length > 1 && (
                        <button 
                            onClick={() => setSelectedEvent(null)}
                            className="h-8 px-3 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm text-xs font-bold text-[var(--color-brand-blue)] hover:bg-gray-50 transition-colors"
                        >
                            <ChevronLeft size={14} className="mr-1" />
                            Lista
                        </button>
                    )}
                </div>
                
                <button 
                    onClick={() => {
                        setSelectedEvent(null);
                        setSelectedDate(null);
                        setShowAllNeo(false);
                    }}
                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm text-gray-500 hover:text-gray-800 transition-colors"
                >
                    <X size={18} />
                </button>

                <div className="h-48 bg-white flex flex-col items-center justify-center p-6 pb-8 relative border-b border-gray-100">
                    <div className="w-full flex-1 bg-white flex items-center justify-center pt-2">
                        {overrideImage ? (
                             <img 
                                src={overrideImage} 
                                alt={selectedEvent.nombre} 
                                className="h-[120px] object-contain" 
                             />
                        ) : null}
                    </div>
                    <div 
                        className="text-[10px] text-gray-400 mt-2 italic text-center w-full"
                        style={{ display: overrideImage ? 'none' : 'block' }}
                    >
                        Ilustración tomada de unDraw.co
                    </div>
                    <div className={cn(
                        "absolute bottom-0 left-6 translate-y-1/2 flex items-center gap-2 px-3 py-1.5 rounded-lg shadow-md font-semibold select-none text-[11px] tracking-wide uppercase",
                        typeStyles.bg, typeStyles.text
                    )}>
                        <Icon size={14} />
                        {typeStyles.label}
                    </div>
                </div>
                
                <div className={cn("pt-8 p-6 flex flex-col gap-5 flex-1", showAllNeo ? "overflow-y-auto" : "overflow-hidden")}>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-[var(--color-brand-dark)] leading-tight font-display">
                            {selectedEvent.nombre}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <CalendarIcon size={16} className="text-[var(--color-brand-yellow)]" />
                            {selectedEvent.dia} de {selectedEvent.mes}
                        </div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedEvent.resumen}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                        {selectedEvent.tematicas && (
                            <div className="space-y-2">
                                <h4 className="text-[9px] lg:text-[10px] font-bold text-gray-500 tracking-widest flex items-center gap-1.5 uppercase">
                                    <Tag size={12} className="shrink-0" /> <span>Temáticas</span>
                                </h4>
                                <div className="flex flex-col gap-2">
                                    {selectedEvent.tematicas.split(';').map((t, i) => {
                                        const trimmed = t.trim();
                                        const formatted = formatTitleCase(trimmed);
                                        return (
                                            <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-medium w-full text-left truncate" title={formatted}>
                                                {formatted}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        
                        {selectedEvent.areas && (
                            <div className="space-y-2">
                                <h4 className="text-[9px] lg:text-[10px] font-bold text-gray-500 tracking-widest flex items-center gap-1.5 uppercase">
                                    <BookOpen size={12} className="shrink-0" /> <span>Áreas Curriculares</span>
                                </h4>
                                <div className="flex flex-col gap-2">
                                    {selectedEvent.areas.split(';').map((t, i) => {
                                        const trimmed = t.trim();
                                        const formatted = formatTitleCase(trimmed);
                                        return (
                                            <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-medium w-full text-left truncate" title={formatted}>
                                                {formatted}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {(() => {
                        const baseResources = neoResourcesMap[selectedEvent.id] || [];
                        const finalResources = [...baseResources];
                        
                        // Add global NEO #128 if not already present
                        if (!finalResources.some(r => r.edicion === "128")) {
                            finalResources.push(NEO_EFEMERIDES);
                        }

                        // Use existing logic: show CSV enlace only if no map entry existed
                        const showEnlace = !neoResourcesMap[selectedEvent.id] && !!selectedEvent.enlace;

                        return (
                            <ResourcesList 
                                eventId={selectedEvent.id}
                                resourcesList={finalResources} 
                                additionalEnlace={showEnlace ? selectedEvent.enlace : undefined} 
                            />
                        );
                    })()}
                </div>
            </div>
        </div>
    );
  };

  return (

    <div className="min-h-screen bg-[var(--color-brand-light)] font-sans flex flex-col text-[var(--color-brand-dark)]">
      
        {/* Top Navigation */}
        <header className="w-full bg-white shadow-sm border-b border-gray-200 mb-3 md:mb-4 shrink-0 z-50 relative">
            <div className="max-w-[1400px] mx-auto w-full pt-8 pb-4 md:pt-14 md:pb-6 px-4 md:px-8 flex flex-col xl:flex-row items-center gap-4 md:gap-6">
                <div className="flex flex-wrap md:flex-nowrap items-center md:items-start xl:items-start gap-3 md:gap-4 flex-1">
                    <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-[var(--color-brand-yellow)] rounded-xl flex items-center justify-center shadow-sm md:mt-0 xl:mt-1">
                        <CalendarIcon size={20} className="md:w-6 md:h-6 text-[var(--color-brand-dark)]" />
                    </div>
                    <h1 className="md:hidden flex-1 text-lg font-bold tracking-tight leading-tight text-[var(--color-brand-dark)] font-display">
                        Calendario educativo de efemérides
                    </h1>
                    <div className="w-full md:flex-1 flex flex-col justify-center gap-1 md:gap-1.5 font-sans">
                        <h1 className="hidden md:block text-2xl font-bold tracking-tight leading-none text-[var(--color-brand-dark)] font-display">
                            Calendario educativo de efemérides
                        </h1>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-4xl">
                            <span className="md:hidden">
                                Un recorrido por fechas conmemorativas nacionales, internacionales y religiosas, festividades y feriados. Cada efeméride reúne ediciones de NEO
                                {!isDescExpanded ? (
                                    <>
                                        ... <button onClick={() => setIsDescExpanded(true)} className="text-[var(--color-brand-blue)] font-semibold ml-1 focus:outline-none">Leer más</button>
                                    </>
                                ) : (
                                    <>
                                        {" relacionadas con su temática, para acercar recursos, experiencias y materiales que pueden servir de punto de partida para planificar propuestas de enseñanza. "}
                                        <button onClick={() => setIsDescExpanded(false)} className="text-[var(--color-brand-blue)] font-semibold focus:outline-none">Leer menos</button>
                                    </>
                                )}
                            </span>
                            <span className="hidden md:inline">
                                Un recorrido por fechas conmemorativas nacionales, internacionales y religiosas, festividades y feriados. Cada efeméride reúne ediciones de NEO relacionadas con su temática, para acercar recursos, experiencias y materiales que pueden servir de punto de partida para planificar propuestas de enseñanza.
                            </span>
                        </p>
                    </div>
                </div>

                <div className="xl:ml-auto flex flex-row items-center gap-2 md:gap-4 shrink-0 w-full xl:w-auto">
                <div className="flex-1 flex items-center gap-2 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl px-3 py-2 border border-gray-200 focus-within:border-gray-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-[var(--color-brand-yellow)] focus-within:ring-opacity-50">
                    <Search size={18} className="text-gray-400 shrink-0" />
                    <input 
                        type="text" 
                        placeholder="Buscar efeméride..." 
                        className="bg-transparent border-none outline-none text-sm text-[var(--color-brand-dark)] w-full placeholder:text-gray-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="relative shrink-0">
                    <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={cn(
                            "flex items-center gap-2 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl px-3 py-2 border h-[38px]",
                            hiddenCategories.length > 0 ? "border-[var(--color-brand-yellow)]" : "border-gray-200",
                            isFilterOpen && "ring-2 ring-[var(--color-brand-yellow)] ring-opacity-50"
                        )}
                    >
                        <Filter size={18} className={hiddenCategories.length > 0 ? "text-[var(--color-brand-dark)]" : "text-gray-400"} />
                        <span className="text-sm text-[var(--color-brand-dark)] hidden md:block">Categorías</span>
                        <span className="text-sm text-[var(--color-brand-dark)] font-bold bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                            {categories.length - hiddenCategories.length}
                        </span>
                    </button>

                    {isFilterOpen && (
                        <>
                            <div 
                                className="fixed inset-0 z-40" 
                                onClick={() => setIsFilterOpen(false)}
                            />
                            <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-xl border border-gray-100 rounded-xl p-2 z-50 flex flex-col gap-1">
                                <div className="px-2 py-1.5 border-b border-gray-100 mb-1 flex justify-between items-center">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Filtrar por:</span>
                                    {hiddenCategories.length > 0 && (
                                        <button 
                                            onClick={() => setHiddenCategories([])}
                                            className="text-[10px] font-bold text-[var(--color-brand-blue)] hover:underline"
                                        >
                                            Restablecer
                                        </button>
                                    )}
                                </div>
                                {categories.map(c => (
                                    <label key={c} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors select-none">
                                        <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                                            <input 
                                                type="checkbox" 
                                                checked={!hiddenCategories.includes(c)}
                                                onChange={() => {
                                                    if (hiddenCategories.includes(c)) {
                                                        setHiddenCategories(prev => prev.filter(x => x !== c));
                                                    } else {
                                                        setHiddenCategories(prev => [...prev, c]);
                                                    }
                                                }}
                                                className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded cursor-pointer checked:bg-[var(--color-brand-yellow)] checked:border-[var(--color-brand-yellow)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-brand-yellow)]"
                                            />
                                            <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className={cn("text-sm transition-colors text-left leading-tight", hiddenCategories.includes(c) ? "text-gray-400" : "text-gray-700 font-medium")}>{c}</span>
                                    </label>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            </div>
        </header>

        <div className="flex-1 max-w-[1400px] mx-auto w-full flex flex-col">
        {/* Main Content Layout */}
        <main className="flex-1 px-4 md:px-8 pb-8 flex flex-col lg:flex-row gap-4 md:gap-6 items-stretch">
          
          {/* Left Column: Calendar UI */}
          <div className="flex-1 w-full flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col w-full h-full">
                {/* Yellow Header */}
                <div className="bg-[#fdc600] py-1.5 md:py-3.5 px-3 md:px-6 flex items-center justify-between pointer-events-auto">
                    <div className="relative flex items-center gap-1 text-[17px] md:text-2xl font-semibold md:font-bold text-[#333544]">
                        <button 
                            onClick={() => setIsPickerOpen(!isPickerOpen)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-black/5 transition-all focus:outline-none focus:ring-2 focus:ring-black/10 active:scale-95 group"
                        >
                            <span className="capitalize">{MONTHS_ES[currentDate.getMonth()]}</span>
                            <span>{currentDate.getFullYear()}</span>
                            <ChevronDown className={cn("w-4 h-4 md:w-6 md:h-6 transition-transform duration-300 opacity-60 group-hover:opacity-100", isPickerOpen && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                            {isPickerOpen && (
                                <MonthYearPicker 
                                    currentDate={currentDate} 
                                    onSelect={(d) => {
                                        setCurrentDate(d);
                                        setIsPickerOpen(false);
                                    }} 
                                    onClose={() => setIsPickerOpen(false)} 
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center gap-1.5 md:gap-4 shrink-0">
                        {/* Desktop: Separate Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            <button 
                                onClick={handleToday}
                                className={cn(
                                    "px-4 py-2 text-sm font-bold rounded-xl transition-all h-[38px] flex items-center",
                                    isSameDay(currentDate, new Date())
                                        ? "bg-black/10 text-[var(--color-brand-dark)] cursor-default"
                                        : "bg-white text-[var(--color-brand-dark)] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95"
                                )}
                            >
                                Hoy
                            </button>

                            <div className="flex items-center gap-0.5 bg-black/5 rounded-2xl p-1 shadow-inner">
                                <button 
                                    onClick={handlePrevMonth}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/10 transition-colors"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button 
                                    onClick={handleNextMonth}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/10 transition-colors"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>

                            <div className="flex bg-black/10 p-1 rounded-xl shadow-inner h-[42px]">
                                <button 
                                    onClick={() => setViewMode('calendar')}
                                    className={cn(
                                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-bold",
                                        viewMode === 'calendar' 
                                            ? "bg-white shadow-sm text-[var(--color-brand-dark)] scale-[1.02]" 
                                            : "text-black/40 hover:text-black/60"
                                    )}
                                >
                                    <LayoutGrid size={14} />
                                    <span>Calendario</span>
                                </button>
                                <button 
                                    onClick={() => setViewMode('agenda')}
                                    className={cn(
                                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-bold",
                                        viewMode === 'agenda' 
                                            ? "bg-white shadow-sm text-[var(--color-brand-dark)] scale-[1.02]" 
                                            : "text-black/40 hover:text-black/60"
                                    )}
                                >
                                    <List size={14} />
                                    <span>Agenda</span>
                                </button>
                            </div>
                        </div>

                        {/* Mobile: Unified Single-Row Navigation & Alternating View Toggle */}
                        <div className="flex md:hidden items-center gap-1.5">
                            <div className="flex items-center bg-black/5 rounded-xl p-0.5 shadow-inner">
                                <button 
                                    onClick={handlePrevMonth}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/10 transition-colors active:scale-90"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <button 
                                    onClick={handleToday}
                                    className={cn(
                                        "px-2 py-1 text-[11px] font-bold rounded-lg transition-colors active:scale-95",
                                        isSameDay(currentDate, new Date()) ? "text-black/40" : "text-black hover:bg-black/10"
                                    )}
                                >
                                    Hoy
                                </button>
                                <button 
                                    onClick={handleNextMonth}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/10 transition-colors active:scale-90"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>

                            <button 
                                onClick={() => setViewMode(viewMode === 'calendar' ? 'agenda' : 'calendar')}
                                className="flex items-center justify-center w-9 h-9 bg-black/5 hover:bg-black/10 rounded-xl transition-all shadow-inner active:scale-95"
                                title={viewMode === 'calendar' ? "Ver Agenda" : "Ver Calendario"}
                            >
                                {viewMode === 'calendar' ? (
                                    <List size={18} className="text-black/60" />
                                ) : (
                                    <LayoutGrid size={18} className="text-black/60" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid Structure */}
                <div className="flex flex-col w-full flex-1 min-h-0 relative overflow-hidden">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        {viewMode === 'calendar' ? (
                            <motion.div
                                key={`calendar-${currentDate.toString()}`}
                                custom={direction}
                                variants={{
                                    enter: (direction: number) => ({
                                        x: direction > 0 ? '100%' : direction < 0 ? '-100%' : 0,
                                        opacity: 0
                                    }),
                                    center: {
                                        zIndex: 1,
                                        x: 0,
                                        opacity: 1
                                    },
                                    exit: (direction: number) => ({
                                        zIndex: 0,
                                        x: direction < 0 ? '100%' : direction > 0 ? '-100%' : 0,
                                        opacity: 0
                                    })
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(_, info) => {
                                    const swipeThreshold = 50;
                                    if (info.offset.x < -swipeThreshold) {
                                        handleNextMonth();
                                    } else if (info.offset.x > swipeThreshold) {
                                        handlePrevMonth();
                                    }
                                }}
                                className="flex flex-col w-full flex-1 min-h-0 cursor-grab active:cursor-grabbing"
                            >
                                {/* Days of week header */}
                                <div className="grid grid-cols-7 border-b border-gray-200 bg-[#f8f9fa]">
                                    {['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'].map((day, idx) => {
                                        const mobileInitials = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
                                        return (
                                            <div key={day} className="py-3 text-center text-[10px] md:text-[11px] font-bold text-[#4a4c5f] tracking-widest uppercase border-r last:border-r-0 border-transparent font-display">
                                                <span className="md:hidden text-[9px] font-bold text-gray-400 tracking-normal">{mobileInitials[idx]}</span>
                                                <span className="hidden md:inline">{day}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                
                                {/* Calendar Cells Container */}
                                <div className="grid grid-cols-7 md:auto-rows-fr bg-gray-200 gap-px md:flex-1">
                                    {/* Padding cells */}
                                    {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                                        <div key={`empty-${i}`} className="bg-[#f9f9f9] min-h-[52px] md:min-h-[85px] lg:min-h-[96px]" />
                                    ))}
                                    
                                    {/* Day cells */}
                                    {daysInMonth.map(date => {
                                        const dayEvents = getEventsForDay(date);
                                        const isToday = isSameDay(date, new Date());
                                        const isSelectedDay = selectedDate ? isSameDay(date, selectedDate) : (selectedEvent ? dayEvents.some(ev => ev.id === selectedEvent.id) : false);
                                        
                                        return (
                                            <div 
                                                key={date.toString()} 
                                                onClick={() => {
                                                    if (dayEvents.length > 0) {
                                                        setSelectedDate(date);
                                                        // Desktop behavior
                                                        if (window.innerWidth >= 768) {
                                                            setSelectedEvent(dayEvents[0]);
                                                        } else {
                                                            // Mobile: if only 1 event, show detail directly. If more, show list.
                                                            if (dayEvents.length === 1) {
                                                                setSelectedEvent(dayEvents[0]);
                                                            } else {
                                                                setSelectedEvent(null);
                                                            }
                                                        }
                                                        setShowAllNeo(false);
                                                    }
                                                }}
                                                className={cn(
                                                    "bg-white min-h-[52px] md:min-h-[85px] lg:min-h-[96px] p-1 md:p-2 flex flex-col gap-0.5 md:gap-1 transition-colors relative group",
                                                    isToday && "bg-amber-50/10",
                                                    dayEvents.length > 0 && "cursor-pointer"
                                                )}
                                            >
                                                {isSelectedDay && <div className="absolute inset-0 border-2 border-[#fdc600] z-20 pointer-events-none" />}
                                                
                                                <span className={cn(
                                                    "text-[10px] md:text-sm font-semibold w-5 h-5 md:w-7 md:h-7 flex items-center justify-center rounded-full md:mb-1 z-10 relative",
                                                    isToday ? "bg-[#fdc600] text-black" : "text-[#4a4c5f]",
                                                    "self-start ml-0.5"
                                                )}>
                                                    {date.getDate()}
                                                </span>

                                                {/* Mobile: Minimalist indicators (Dots) */}
                                                <div className="flex md:hidden flex-col gap-0.5 z-10">
                                                    {dayEvents.slice(0, 3).map((ev, i) => {
                                                        const dotColor = ev.isJewish || ev.tipo === 'Efemérides religiosas' || ev.tipo === 'Efemérides judías' ? 'bg-[#fdc600]' :
                                                                    ev.tipo === 'Efemérides internacionales' ? 'bg-[#333544]' :
                                                                    'bg-[#52556b]';
                                                        return (
                                                            <button 
                                                                key={`${ev.nombre}-${i}`}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setSelectedDate(date);
                                                                    setSelectedEvent(ev);
                                                                    setShowAllNeo(false);
                                                                }}
                                                                className={cn("w-1.5 h-1.5 rounded-full shadow-sm hover:scale-110 active:scale-95 transition-transform", dotColor)}
                                                                title={ev.nombre}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                                
                                                <div className="hidden md:flex flex-col gap-1 z-10 overflow-hidden">
                                                    {dayEvents.map((ev, i) => {
                                                        const styles = getTypeStyles(ev.tipo, ev.isJewish);
                                                        const Icon = styles.icon;
                                                        
                                                        // Ensure darker color badges text contrast
                                                        const bgClass = ev.isJewish || ev.tipo === 'Efemérides religiosas' || ev.tipo === 'Efemérides judías' ? 'bg-[#fdc600] text-[#333544]' :
                                                                    ev.tipo === 'Efemérides internacionales' ? 'bg-[#333544] text-white' :
                                                                    'bg-[#52556b] text-white';

                                                        return (
                                                            <button 
                                                                key={`${ev.nombre}-${i}`}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setSelectedDate(date);
                                                                    setSelectedEvent(ev);
                                                                    setShowAllNeo(false);
                                                                }}
                                                                className={cn(
                                                                    "text-left flex items-center gap-1.5 px-1.5 py-1 rounded-[4px] text-[10px] lg:text-xs font-semibold truncate w-full hover:opacity-90 transition-opacity",
                                                                    bgClass
                                                                )}
                                                                title={ev.nombre}
                                                            >
                                                                <Icon size={12} className="shrink-0" />
                                                                <span className="truncate">{ev.nombre}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {/* Fill remaining cells of the last week to keep the grid even */}
                                    {Array.from({ length: 6 - monthEnd.getDay() }).map((_, i) => (
                                        <div key={`empty-end-${i}`} className="bg-[#f9f9f9] min-h-[52px] md:min-h-[85px] lg:min-h-[96px]" />
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={`agenda-${currentDate.toString()}`}
                                custom={direction}
                                variants={{
                                    enter: (direction: number) => ({
                                        x: direction > 0 ? '100%' : direction < 0 ? '-100%' : 0,
                                        opacity: 0
                                    }),
                                    center: {
                                        zIndex: 1,
                                        x: 0,
                                        opacity: 1
                                    },
                                    exit: (direction: number) => ({
                                        zIndex: 0,
                                        x: direction < 0 ? '100%' : direction > 0 ? '-100%' : 0,
                                        opacity: 0
                                    })
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="flex flex-col w-full flex-1 min-h-[500px] bg-white overflow-y-auto"
                            >
                                <div className="p-3 md:p-6 flex flex-col gap-3">
                                    {daysInMonth.map(date => {
                                        const dayEvents = getEventsForDay(date);
                                        if (dayEvents.length === 0) return null;

                                        return dayEvents.map(ev => {
                                            const styles = getTypeStyles(ev.tipo, ev.isJewish);
                                            
                                            // Define colors for the date box based on category - matching legend and dots
                                            let dateBoxBg = 'bg-[#333544]'; // Default Internacional
                                            const isReligiosa = ev.isJewish || ev.tipo === 'Efemérides religiosas' || ev.tipo === 'Efemérides judías';
                                            const isNacional = ev.tipo === 'Efemérides nacionales';
                                            
                                            if (isNacional) dateBoxBg = 'bg-[#52556b]';
                                            if (isReligiosa) dateBoxBg = 'bg-[#fdc600]';
                                            
                                            return (
                                                <button 
                                                    key={ev.id}
                                                    onClick={() => {
                                                        setSelectedDate(date);
                                                        setSelectedEvent(ev);
                                                        setShowAllNeo(false);
                                                    }}
                                                    className="flex items-center gap-3 p-2 md:p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group active:scale-[0.98]"
                                                >
                                                    {/* Left Column: Date Box */}
                                                    <div className={cn(
                                                        "w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl flex flex-col items-center justify-center text-white",
                                                        dateBoxBg,
                                                        isReligiosa && "text-[#333544]" // Dark text for yellow background
                                                    )}>
                                                        <span className="text-[9px] md:text-[10px] font-bold uppercase opacity-80 leading-none mb-0.5">
                                                            {format(date, 'MMM', { locale: es }).replace('.', '')}
                                                        </span>
                                                        <span className="text-lg md:text-xl font-bold leading-none font-display">
                                                            {date.getDate()}
                                                        </span>
                                                    </div>

                                                    {/* Right Column: Content */}
                                                    <div className="flex flex-col flex-1 min-w-0">
                                                        <h4 className="font-bold text-[var(--color-brand-dark)] text-[14px] md:text-base leading-tight line-clamp-2 md:line-clamp-none font-display">
                                                            {ev.nombre}
                                                        </h4>
                                                        <span className="text-[10px] md:text-[11px] font-medium text-gray-400 mt-0.5 md:mt-1">
                                                            {ev.tipo}
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        });
                                    })}

                                    {/* Empty State for Month */}
                                    {daysInMonth.every(d => getEventsForDay(d).length === 0) && (
                                        <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                                            <div className="w-24 h-24 mb-6 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                                                <Search size={40} />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-700 font-display">No se encontraron efemérides</h3>
                                            <p className="text-sm text-gray-500 mt-2 max-w-[280px]">
                                                Prueba ajustando los filtros o buscando otro mes.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Referencias Footer */}
                <div className="bg-[#f8f9fa] border-t border-gray-200 py-3 md:py-4 px-2 md:px-6 flex flex-row items-center justify-center gap-3 md:gap-8 overflow-hidden">
                    <span className="hidden sm:block text-[9px] md:text-[11px] font-bold text-[#4a4c5f] tracking-widest uppercase shrink-0 font-display">REFERENCIAS:</span>
                    
                    <div className="flex flex-row flex-nowrap items-center justify-center gap-2.5 md:gap-12 text-[10px] md:text-sm font-medium text-[#4a4c5f] shrink-0">
                        <div className="flex items-center gap-1 md:gap-2 shrink-0">
                            <div className="w-2.5 h-2.5 md:w-4 md:h-4 rounded-[3px] md:rounded-[4px] bg-[#52556b]"></div>
                            <span>Nacional</span>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2 shrink-0">
                            <div className="w-2.5 h-2.5 md:w-4 md:h-4 rounded-[3px] md:rounded-[4px] bg-[#333544]"></div>
                            <span>Internacional</span>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2 shrink-0">
                            <div className="w-2.5 h-2.5 md:w-4 md:h-4 rounded-[3px] md:rounded-[4px] bg-[#fdc600]"></div>
                            <span>Religiosas</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Column: Sidebar (Desktop only) */}
          <div className="hidden lg:block w-full lg:w-[360px] shrink-0 relative">
              <div className="lg:absolute lg:inset-0 h-full">
                  {renderSidebar()}
              </div>
          </div>

          {/* Mobile Modal Overlay */}
          {(selectedDate || selectedEvent) && (
              <div className="lg:hidden fixed inset-0 z-[100] flex items-center justify-center p-4">
                  <div 
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={() => {
                        setSelectedDate(null);
                        setSelectedEvent(null);
                    }}
                  />
                  <div className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                    <div className="overflow-y-auto flex-1">
                        {renderSidebar(true)}
                    </div>
                  </div>
              </div>
          )}

        </main>
      </div>

      <footer className="w-full bg-white border-t border-gray-200 py-4 mt-auto shrink-0 relative z-10 shadow-sm">
          <div className="text-center text-xs text-gray-500 flex flex-col gap-1">
              <span>Calendario de efemérides educativo desarrollado por NEO - Newsletter Escuela ORT</span>
              <a href="https://campus.ort.edu.ar/neo" target="_blank" rel="noopener noreferrer" className="text-[var(--color-brand-blue)] hover:underline font-bold flex items-center justify-center gap-1">
                  <span>www.campus.ort.edu.ar/neo</span>
              </a>
          </div>
      </footer>
    </div>
  );
}

function ResourcesList({ resourcesList, additionalEnlace, eventId }: { resourcesList: any[], additionalEnlace?: string, eventId: string }) {
    const [showAllNeo, setShowAllNeo] = React.useState(false);
    const [isOverflowing, setIsOverflowing] = React.useState(false);
    const listRef = React.useRef<HTMLDivElement>(null);
    const topRef = React.useRef<HTMLHeadingElement>(null);

    const COLLAPSED_HEIGHT = 160;

    // Reset expansion when switching events
    React.useEffect(() => {
        setShowAllNeo(false);
    }, [eventId]);

    React.useEffect(() => {
        const checkOverflow = () => {
            if (listRef.current) {
                const { scrollHeight } = listRef.current;
                setIsOverflowing(scrollHeight > COLLAPSED_HEIGHT);
            }
        };

        checkOverflow();
        const timer = setTimeout(checkOverflow, 100);
        
        window.addEventListener('resize', checkOverflow);
        return () => {
            window.removeEventListener('resize', checkOverflow);
            clearTimeout(timer);
        };
    }, [resourcesList, additionalEnlace]);

    const handleToggle = (expand: boolean) => {
        setShowAllNeo(expand);
        if (!expand && topRef.current) {
            // Scroll to the list header when collapsing
            topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="pt-4 mt-2 flex flex-col min-h-0 relative">
            <h4 ref={topRef} className="text-[9px] lg:text-[10px] font-bold text-gray-500 tracking-widest flex items-center gap-1.5 uppercase mb-3 shrink-0 scroll-mt-6 font-display">
                <ExternalLink size={12} className="shrink-0" /> <span>Recursos Educativos</span>
            </h4>
            <div 
                ref={listRef}
                className={cn(
                    "flex flex-col gap-2 relative transition-all duration-300 ease-in-out", 
                    showAllNeo ? "max-h-[1000px] overflow-y-auto" : "max-h-[160px] overflow-hidden",
                    !showAllNeo && isOverflowing && "pb-4"
                )}
                style={{
                    maxHeight: showAllNeo ? '1000px' : (`${COLLAPSED_HEIGHT}px`)
                }}
            >
                {resourcesList.map((res, idx) => (
                    <a 
                        key={idx}
                        href={res.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex flex-col items-start gap-1 w-full p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all shrink-0"
                    >
                        <span className="font-bold text-[11px] lg:text-xs text-[var(--color-brand-dark)] group-hover:text-[var(--color-brand-blue)] transition-colors text-left uppercase">
                            {res.tema
                                .replace(/NEO #/i, 'NEO #')
                                .replace(/en foco:\s*/i, '')
                                .replace(/\s*en foco/i, '')}
                        </span>
                    </a>
                ))}
                
                {additionalEnlace && (
                    <a 
                        href={additionalEnlace} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 w-full p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all shrink-0 mt-1"
                    >
                        <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                            <ExternalLink size={18} />
                        </div>
                        <span className="font-bold text-[11px] lg:text-xs text-[var(--color-brand-dark)] text-left">
                            Recurso educativo
                        </span>
                    </a>
                )}
            </div>
            {!showAllNeo && isOverflowing && (
                <>
                    <div className="absolute bottom-12 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
                    <button
                        onClick={() => handleToggle(true)}
                        className="mt-2 w-full py-2 bg-gray-100 hover:bg-gray-200 text-[var(--color-brand-blue)] text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0 relative z-20 shadow-[0_-8px_16px_rgba(255,255,255,1)]"
                    >
                        Ver más ({resourcesList.length}) <ChevronDown className="w-4 h-4 transition-transform" />
                    </button>
                </>
            )}
            {showAllNeo && (
                <button
                    onClick={() => handleToggle(false)}
                    className="mt-3 w-full py-2 bg-gray-100 hover:bg-gray-200 text-[var(--color-brand-blue)] text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0"
                >
                    Ocultar <ChevronDown className="w-4 h-4 rotate-180 transition-transform" />
                </button>
            )}
        </div>
    );
}
