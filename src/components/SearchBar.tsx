import React from "react";
import { Search, X, Beer, CupSoda, Martini, GlassWater } from "lucide-react";
import { motion } from "motion/react";
import { SearchFilters } from "../types";

/**
 * Props del componente SearchBar:
 * - filters: objeto con el estado actual de búsqueda y filtros activos
 * - onChangeFilters: callback que actualiza los filtros en el componente padre (App)
 * - availableCategories: lista de categorías disponibles obtenidas desde la API
 */
interface SearchBarProps {
  filters: SearchFilters;
  onChangeFilters: (filters: SearchFilters) => void;
  availableCategories: string[];
}

export default function SearchBar({
  filters,
  onChangeFilters,
  availableCategories,
}: SearchBarProps) {
  // Actualiza el filtro de texto libre al escribir en el input
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFilters({ ...filters, query: e.target.value });
  };

  // Limpia el texto de búsqueda al hacer clic en el botón de limpiar
  const handleClearQuery = () => {
    onChangeFilters({ ...filters, query: "" });
  };

  // Actualiza el filtro de tipo alcohólico cuando el usuario selecciona una opción
  const handleAlcoholicSelect = (type: "All" | "Alcoholic" | "Non_Alcoholic") => {
    onChangeFilters({ ...filters, alcoholicType: type });
  };

  // Actualiza el filtro de categoría seleccionada
  const handleCategorySelect = (category: string) => {
    onChangeFilters({ ...filters, category });
  };

  // Retorna tema visual (color e ícono) personalizado según la categoría para una UI de alta fidelidad
  const getCategoryTheme = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "all":
      case "todos":
        return { label: "Todos", icon: GlassWater, bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/10" };
      case "cocktail":
      case "cóctel":
        return { label: "Cóctel", icon: Martini, bg: "bg-violet-500/10", text: "text-violet-500", border: "border-violet-500/10" };
      case "ordinary drink":
      case "bebida común":
        return { label: "Bebida Común", icon: Beer, bg: "bg-amber-500/15", text: "text-amber-600", border: "border-amber-500/10" };
      case "shot":
      case "chupito / shot":
        return { label: "Chupito", icon: GlassWater, bg: "bg-rose-500/10", text: "text-rose-500", border: "border-rose-500/10" };
      case "shake":
      case "batido / shake":
        return { label: "Batido", icon: CupSoda, bg: "bg-sky-500/10", text: "text-sky-500", border: "border-sky-500/10" };
      default:
        return { label: cat, icon: GlassWater, bg: "bg-zinc-500/10", text: "text-zinc-600", border: "border-zinc-500/10" };
    }
  };

  const alcoholTabs = [
    { value: "All", label: "Todos" },
    { value: "Alcoholic", label: "Con Alcohol" },
    { value: "Non_Alcoholic", label: "Sin Alcohol" },
  ] as const;

  return (
    <div id="search-bar-container" className="w-full bg-zinc-50/50 py-5 px-4 md:px-6 rounded-3xl border border-zinc-100/60 shadow-inner flex flex-col gap-4">
      
  {/* Caja de búsqueda por texto */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400">
          <Search className="w-5 h-5 stroke-[2]" />
        </div>
        <input
          id="search-input"
          type="text"
          value={filters.query}
          onChange={handleQueryChange}
          placeholder="Buscar un trago (ej: Margarita, Mojito, Gin)..."
          className="w-full pl-11 pr-11 py-3 bg-white border border-zinc-200 hover:border-zinc-300 focus:border-zinc-400 focus:outline-none rounded-2xl text-zinc-800 text-sm placeholder-zinc-400 font-sans shadow-sm transition-all focus:ring-4 focus:ring-zinc-400/5"
        />
        {filters.query && (
          <motion.button
            id="btn-clear-search"
            whileTap={{ scale: 0.85 }}
            onClick={handleClearQuery}
            className="absolute inset-y-0 right-4 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            <X className="w-5 h-5 p-0.5 rounded-full bg-zinc-100" />
          </motion.button>
        )}
      </div>

      {/* Fila de controles de filtro */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Selector segmentado deslizante (preferencia alcohólica) */}
        <div className="w-full md:w-auto self-start flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-zinc-400 font-mono tracking-wider uppercase pl-1 select-none">
            Tipo de Trago
          </span>
          <div className="relative flex p-1 bg-zinc-200/50 rounded-2xl border border-zinc-200/30 w-full sm:max-w-md md:w-80">
            {alcoholTabs.map((tab) => {
              const isActive = filters.alcoholicType === tab.value;
              return (
                <button
                  id={`tab-${tab.value.toLowerCase()}`}
                  key={tab.value}
                  onClick={() => handleAlcoholicSelect(tab.value)}
                  className={`relative z-10 flex-1 py-1.5 text-center text-xs font-semibold rounded-xl cursor-pointer select-none transition-colors ${
                    isActive ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeAlcoholTab"
                      className="absolute inset-0 bg-white shadow-sm border border-black/[0.04] rounded-xl z-[-1]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>



      </div>
    </div>
  );
}
