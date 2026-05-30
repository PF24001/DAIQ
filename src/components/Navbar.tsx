import { Sparkles, Heart } from "lucide-react";
import { motion } from "motion/react";
import Logo from "./Logo";

/**
 * Props del componente Navbar:
 * - favoriteCount: cantidad de cócteles marcados como favoritos (para mostrar en el contador)
 * - onRandomClick: función que dispara la búsqueda de un cóctel aleatorio
 * - onToggleFavorites: función para alternar la vista de solo favoritos
 * - showFavoritesOnly: indica si actualmente se están mostrando solo los favoritos
 */
interface NavbarProps {
  favoriteCount: number;
  onRandomClick: () => void;
  onToggleFavorites: () => void;
  showFavoritesOnly: boolean;
}

export default function Navbar({
  favoriteCount,
  onRandomClick,
  onToggleFavorites,
  showFavoritesOnly,
}: NavbarProps) {
  return (
    <nav
      id="app-navbar"
      className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 border-b border-zinc-100/80 px-4 py-3.5 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo y título de la marca */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-none overflow-hidden flex items-center justify-center border border-zinc-100">
            <Logo className="w-full h-full" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-semibold tracking-tight text-zinc-900 text-lg leading-tight">
                DAIQ
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase leading-none">
              TheCocktailDB API
            </p>
          </div>
        </div>

        {/* Bandeja de acciones (compacta, estilo iOS) */}
        <div className="flex items-center gap-2">
          {/* Botón: Cóctel aleatorio */}
          <motion.button
            id="btn-random-cocktail"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={onRandomClick}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 rounded-full border border-zinc-200/60 text-xs font-semibold transition-colors cursor-pointer shadow-sm shadow-black/[0.02]"
            title="Sugerir trago aleatorio"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="hidden sm:inline">Sorpréndeme</span>
          </motion.button>

          {/* Botón: Alternar vista de favoritos */}
          <motion.button
            id="btn-toggle-favorites"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={onToggleFavorites}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold select-none cursor-pointer transition-all shadow-sm ${
              showFavoritesOnly
                ? "bg-rose-500 text-white border border-rose-500"
                : "bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200/80"
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                showFavoritesOnly
                  ? "fill-current text-white"
                  : "text-rose-500 fill-rose-500/10"
              }`}
            />
            <span>Favoritos</span>
            {favoriteCount > 0 && (
              <span
                className={`inline-flex items-center justify-center min-w-4 h-4 text-[10px] font-bold rounded-full px-1 ${
                  showFavoritesOnly
                    ? "bg-white text-rose-600"
                    : "bg-zinc-100 text-zinc-700 border border-zinc-200"
                }`}
              >
                {favoriteCount}
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
