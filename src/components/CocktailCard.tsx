import React from "react";
import { Heart, GlassWater, Milestone, Check } from "lucide-react";
import { motion } from "motion/react";
import { Cocktail } from "../types";

/**
 * Props del componente CocktailCard:
 * - cocktail: objeto del cóctel con todos sus datos normalizados
 * - isFavorite: indica si este cóctel está marcado como favorito
 * - onToggleFavorite: callback para marcar/desmarcar el cóctel como favorito
 * - onSelect: callback para abrir el panel de detalle del cóctel
 */
interface CocktailCardProps {
  cocktail: Cocktail;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelect: () => void;
}

export default function CocktailCard({
  cocktail,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: CocktailCardProps) {
  // Conteo de ingredientes para mostrar en el indicador inferior de la tarjeta
  const ingredientsCount = cocktail.ingredients.length;

  return (
    <motion.div
      id={`cocktail-card-${cocktail.id}`}
      layout
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={onSelect}
      className="group relative bg-white border border-zinc-100/90 rounded-[32px] p-4 shadow-xs hover:shadow-md hover:border-zinc-200/50 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Botón flotante para marcar/desmarcar como favorito */}
      <div className="absolute top-6 right-6 z-15">
        <motion.button
          id={`btn-fav-${cocktail.id}`}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          onClick={(e) => onToggleFavorite(cocktail.id, e)}
          className={`w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-md transition-all shadow-sm ${
            isFavorite
              ? "bg-rose-500 text-white"
              : "bg-white/80 hover:bg-white text-zinc-400 hover:text-rose-500"
          }`}
        >
          <Heart
            className={`w-4.5 h-4.5 transition-colors ${
              isFavorite ? "fill-white text-white" : "fill-transparent"
            }`}
          />
        </motion.button>
      </div>

      {/* Imagen principal del cóctel en proporción cuadrada */}
      <div className="relative aspect-square w-full bg-zinc-50 rounded-[24px] overflow-hidden mb-3.5">
        <img
          src={cocktail.thumbnail}
          alt={cocktail.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        {/* Insignia semitransparente de tipo alcohólico sobre la imagen */}
        <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
          <span
            className={`px-2.5 py-1 text-[9px] font-bold rounded-lg uppercase tracking-wider backdrop-blur-md shadow-xs border ${
              cocktail.alcoholic
                ? "bg-black/40 text-amber-300 border-white/5"
                : "bg-black/40 text-emerald-300 border-white/5"
            }`}
          >
            {cocktail.alcoholicLabel}
          </span>
        </div>
      </div>

      {/* Sección de metadatos del cóctel (categoría, nombre, etiquetas) */}
      <div className="flex-1 flex flex-col justify-between px-1">
        <div>
          {/* Pastilla de mini-categoría */}
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold text-zinc-400 font-mono tracking-wider uppercase">
              {cocktail.category}
            </span>
          </div>

          {/* Título del cóctel */}
          <h3 className="font-sans font-bold text-zinc-900 text-[17px] leading-tight group-hover:text-black transition-colors line-clamp-1">
            {cocktail.name}
          </h3>

          {/* Etiquetas del cóctel (máximo 2 visibles) */}
          {cocktail.tags && cocktail.tags.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2 flex-wrap max-h-[22px] overflow-hidden">
              {cocktail.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-zinc-50 text-[9px] text-zinc-500 font-medium rounded-md border border-zinc-100 font-mono"
                >
                  #{tag}
                </span>
              ))}
              {cocktail.tags.length > 2 && (
                <span className="text-[9px] text-zinc-400 font-mono">
                  +{cocktail.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Indicadores técnicos del pie de la tarjeta (copa y cantidad de ingredientes) */}
        <div className="mt-4.5 pt-3.5 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <GlassWater className="w-3.5 h-3.5 text-zinc-400" />
            <span className="truncate max-w-[110px] font-medium text-zinc-500">
              {cocktail.glass}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-mono text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-lg font-semibold border border-zinc-200/30">
              {ingredientsCount} ing.
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
