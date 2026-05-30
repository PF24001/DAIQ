import React from "react";
import { Wine, Trash2, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Cocktail } from "../types";
import CocktailCard from "./CocktailCard";

/**
 * Props del componente CocktailGrid:
 * - cocktails: arreglo de cócteles ya filtrados y procesados para renderizar
 * - favoriteIds: conjunto de IDs de cócteles marcados como favoritos
 * - onToggleFavorite: callback para marcar/desmarcar un cóctel como favorito
 * - onSelectCocktail: callback para abrir el detalle de un cóctel seleccionado
 * - onResetFilters: callback para limpiar todos los filtros activos
 */
interface CocktailGridProps {
  cocktails: Cocktail[];
  favoriteIds: Set<string>;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectCocktail: (cocktail: Cocktail) => void;
  onResetFilters: () => void;
}

export default function CocktailGrid({
  cocktails,
  favoriteIds,
  onToggleFavorite,
  onSelectCocktail,
  onResetFilters,
}: CocktailGridProps) {
  if (cocktails.length === 0) {
    return (
      <div
        id="grid-empty-state"
        className="w-full flex flex-col items-center justify-center py-16 px-6 bg-zinc-50 border border-zinc-100/60 rounded-[32px] text-center"
      >
        <div className="w-14 h-14 bg-zinc-100 flex items-center justify-center text-zinc-400 rounded-2xl mb-4 border border-zinc-200/50">
          <Wine className="w-7 h-7" />
        </div>
        <h3 className="font-sans font-bold text-zinc-800 text-lg mb-1.5">
          No se encontraron tragos
        </h3>
        <p className="text-zinc-500 text-sm max-w-sm mb-6 leading-relaxed">
          Prueba buscando con otra palabra o ajustando los filtros de alcohol y categoría para encontrar más recetas.
        </p>
        <motion.button
          id="btn-grid-reset"
          whileTap={{ scale: 0.95 }}
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white rounded-2xl text-xs font-semibold hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Restablecer Filtros</span>
        </motion.button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Encabezado con el contador de resultados disponibles */}
      <div className="flex items-center justify-between mb-4.5 px-1.5 entries-header">
        <span className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">
          Tragos Disponibles ({cocktails.length})
        </span>
      </div>

      <motion.div
        layout
        id="cocktails-layout-grid"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {cocktails.map((cocktail) => (
            <motion.div
              key={cocktail.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            >
              <CocktailCard
                cocktail={cocktail}
                isFavorite={favoriteIds.has(cocktail.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={() => onSelectCocktail(cocktail)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
