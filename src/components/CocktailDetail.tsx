import { useState, useEffect } from "react";
import { X, Heart, Beer, Check, ClipboardList, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Cocktail } from "../types";

/**
 * Props del componente CocktailDetail:
 * - cocktail: el cóctel actualmente seleccionado (null si no hay ninguno abierto)
 * - onClose: callback para cerrar el panel de detalle
 * - isFavorite: indica si el cóctel actual es favorito
 * - onToggleFavorite: callback para marcar/desmarcar como favorito desde el modal
 */
interface CocktailDetailProps {
  cocktail: Cocktail | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function CocktailDetail({
  cocktail,
  onClose,
  isFavorite,
  onToggleFavorite,
}: CocktailDetailProps) {
  // Estado local: set de ingredientes que el usuario ha tildado en la lista de preparación
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  // Estado local: ingrediente cuya imagen está siendo mostrada en el modal de zoom
  const [zoomedIngredient, setZoomedIngredient] = useState<{ name: string; originalName: string } | null>(null);

  // Reiniciar los ingredientes tildados y el zoom cada vez que cambia el cóctel mostrado
  useEffect(() => {
    setCheckedIngredients(new Set());
    setZoomedIngredient(null);
  }, [cocktail]);

  // Función para activar/desactivar el tildado de un ingrediente por su ID
  const toggleIngredient = (id: string) => {
    const next = new Set(checkedIngredients);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setCheckedIngredients(next);
  };

  // Bloquear el scroll del body cuando el modal está abierto; restaurarlo al cerrarse
  useEffect(() => {
    if (cocktail) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [cocktail]);

  if (!cocktail) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
        {/* Fondo oscuro semitransparente con difuminado (backdrop) */}
        <motion.div
          id="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm cursor-pointer"
        />

        {/* Hoja del cajón modal deslizable */}
        <motion.div
          id="modal-card-sheet"
          initial={{ y: "100%", opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0.5 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="relative w-full md:max-w-2xl bg-white rounded-t-[32px] md:rounded-[36px] overflow-hidden shadow-2xl flex flex-col max-h-[92vh] md:max-h-[85vh] z-10 border border-zinc-100"
        >
          {/* Asa de arrastre estilo iOS (visible solo en móvil) */}
          <div className="md:hidden w-full flex justify-center py-2.5 bg-white cursor-pointer" onClick={onClose}>
            <div className="w-10 h-1 bg-zinc-200 rounded-full" />
          </div>

          {/* Botones de acción en la cabecera del modal */}
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            {/* Botón de favorito directo dentro del modal */}
            <motion.button
              id={`modal-fav-${cocktail.id}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggleFavorite(cocktail.id)}
              className={`w-9 h-9 flex items-center justify-center rounded-full shadow-sm border transition-all ${
                isFavorite
                  ? "bg-rose-500 text-white border-rose-500"
                  : "bg-white/80 backdrop-blur text-zinc-500 border-zinc-100 hover:text-rose-500"
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-white" : ""}`} />
            </motion.button>

            {/* Botón de cierre del modal */}
            <motion.button
              id="modal-btn-close"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-9 h-9 bg-white/80 hover:bg-white text-zinc-500 border border-zinc-100 shadow-sm flex items-center justify-center rounded-full backdrop-blur cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Cuerpo desplazable del modal */}
          <div id="modal-content-scroller" className="flex-1 overflow-y-auto overflow-x-hidden p-0 scrollbar-thin">
            {/* Área de encabezado con imagen de fondo difuminada */}
            <div className="relative min-h-[220px] sm:min-h-[260px] w-full bg-zinc-950 overflow-hidden py-6 px-6 sm:px-8 flex items-center">
              {/* Fondo con blur ambiental de la imagen del cóctel */}
              <div 
                className="absolute inset-0 bg-cover bg-center blur-2xl scale-110 opacity-45 select-none pointer-events-none"
                style={{ backgroundImage: `url(${cocktail.thumbnail})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/80 to-zinc-950/40 z-10" />
              
              {/* Contenedor de contenido: fila o columna según el tamaño de pantalla */}
              <div className="relative z-20 w-full flex flex-col sm:flex-row items-center sm:items-center gap-6">
                
                {/* Marco cuadrado del retrato del cóctel */}
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-32 h-32 sm:w-40 sm:h-40 bg-zinc-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl shrink-0 flex items-center justify-center relative group"
                >
                  <img
                    src={cocktail.thumbnail}
                    alt={cocktail.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {/* Capa brillante sutil sobre la imagen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
                </motion.div>

                {/* Columna de texto con información del cóctel */}
                <div className="flex-1 text-center sm:text-left text-white space-y-1 md:space-y-2">
                  <div className="flex justify-center sm:justify-start gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold bg-amber-500 text-white px-2.5 py-1 rounded-full uppercase tracking-wider font-sans shadow-sm border border-amber-600/25">
                      {cocktail.category}
                    </span>
                    <span className="text-[10px] font-bold bg-zinc-800/90 backdrop-blur-md text-zinc-200 px-2.5 py-1 rounded-full uppercase tracking-wider font-sans border border-white/10 shadow-sm">
                      {cocktail.alcoholicLabel}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    {cocktail.name}
                  </h2>

                  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 pt-1 font-medium text-xs text-zinc-300">
                    <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-xs w-max px-3 py-1 rounded-xl border border-white/5 mx-auto sm:mx-0 shrink-0">
                      <Beer className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Copa: <strong className="font-semibold text-white">{cocktail.glass}</strong></span>
                    </div>

                    {cocktail.tags && cocktail.tags.length > 0 && (
                      <div className="flex gap-1.5 flex-wrap justify-center sm:justify-start items-center">
                        {cocktail.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-white/10 backdrop-blur-md text-white/90 text-[9px] font-semibold font-mono px-2 py-0.5 rounded-lg border border-white/5 uppercase select-none"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Cuadrícula de contenido: ingredientes e instrucciones */}
            <div className="p-6 md:p-8 flex flex-col md:grid md:grid-cols-5 gap-6">
              
              {/* COLUMNA IZQUIERDA: Lista con tildado de ingredientes (3/5 del ancho en escritorio) */}
              <div className="md:col-span-3">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/10">
                    <Check className="w-4 h-4" />
                  </div>
                  <h4 className="font-sans font-bold text-zinc-900 text-sm tracking-tight">
                    Ingredientes ({cocktail.ingredients.length})
                  </h4>
                </div>
                
                <p className="text-[11px] text-zinc-400 mb-4 pl-1 leading-normal">
                  💡 Selecciona los ingredientes que ya tienes listos para medir tu preparación:
                </p>

                <div className="space-y-2.5">
                  {cocktail.ingredients.map((ing) => {
                    const isChecked = checkedIngredients.has(ing.id);
                    return (
                      <motion.div
                        id={`ing-item-${ing.id}`}
                        key={ing.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleIngredient(ing.id)}
                        className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all cursor-pointer ${
                          isChecked
                            ? "bg-emerald-50/40 border-emerald-100/80 text-neutral-400"
                            : "bg-zinc-50 border-zinc-200/50 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100/30"
                        }`}
                      >
                        {/* Casilla circular estilo iOS para tildar ingredientes */}
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center transition-all border shrink-0 ${
                            isChecked
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : "border-zinc-300 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        {/* Miniatura del ingrediente con clic para ampliar */}
                        <div
                          className="relative w-10 h-10 rounded-xl bg-white border border-zinc-200/60 p-0.5 flex items-center justify-center overflow-hidden shrink-0 hover:scale-105 active:scale-95 transition-all shadow-xs"
                          title="Haz clic para ver ingrediente"
                          onClick={(e) => {
                            e.stopPropagation();
                            setZoomedIngredient({ name: ing.name, originalName: ing.originalName });
                          }}
                        >
                          <img
                            src={`https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(ing.originalName)}-Small.png`}
                            alt={ing.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain mix-blend-multiply"
                            onError={(e) => {
                            // Si la imagen falla, se oculta el elemento (sin romper el layout)
                            e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>

                        {/* Texto: Nombre del ingrediente y su medida */}
                        <div className="flex-1 flex justify-between items-center gap-2 text-xs">
                          <div className="flex flex-col">
                            <span className={`font-semibold tracking-tight ${isChecked ? "line-through text-zinc-400" : "text-zinc-800"}`}>
                              {ing.name}
                            </span>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setZoomedIngredient({ name: ing.name, originalName: ing.originalName });
                              }}
                              className="text-[10px] text-amber-600 hover:text-amber-700 hover:underline font-medium cursor-pointer mt-0.5"
                            >
                              Ver foto
                            </span>
                          </div>
                          <span className={`font-mono text-[10px] bg-zinc-200/40 text-zinc-600 px-1.5 py-0.5 rounded-md font-semibold shrink-0 ${isChecked ? "text-zinc-300 bg-zinc-100/10" : ""}`}>
                            {ing.measure || "Al gusto"}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* COLUMNA DERECHA: Instrucciones y etiquetas (2/5 del ancho en escritorio) */}
              <div className="md:col-span-2 flex flex-col gap-5">
                
                {/* Instrucciones de preparación, divididas en pasos numerados */}
                <div className="border border-zinc-200/50 bg-zinc-50/30 rounded-3xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/10">
                      <ClipboardList className="w-4 h-4" />
                    </div>
                    <h4 className="font-sans font-bold text-zinc-900 text-sm tracking-tight">
                      Instrucciones
                    </h4>
                  </div>
                  
                  <div className="text-zinc-600 text-xs leading-relaxed space-y-2 font-sans">
                    {cocktail.instructions.split(". ").map((step, idx) => {
                      const trimmed = step.trim();
                      if (!trimmed) return null;
                      return (
                        <div key={idx} className="flex gap-2.5">
                          <span className="font-mono text-indigo-500 font-bold leading-relaxed">{idx + 1}.</span>
                          <span className="flex-1 leading-normal">{trimmed}{trimmed.endsWith('.') ? '' : '.'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Etiquetas del cóctel, si las hay */}
                {cocktail.tags.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 font-mono tracking-wider uppercase mb-2 block">
                      Etiquetas
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cocktail.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-zinc-100 text-zinc-600 font-mono text-[10px] font-semibold rounded-md border border-zinc-200/50"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>

          {/* Pie del modal con advertencia y botón de cierre */}
          <div className="border-t border-zinc-100 p-4.5 bg-zinc-50/80 backdrop-blur-xl flex justify-between gap-3">
            <div className="flex-1 text-[11px] text-zinc-400 leading-snug flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Sirve y disfruta de manera responsable.</span>
            </div>
            
            <button
              id="modal-btn-close-bottom"
              onClick={onClose}
              className="px-6 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl text-xs font-semibold select-none cursor-pointer border border-zinc-950 transition-colors"
            >
              Cerrar Receta
            </button>
          </div>

          {/* Modal superpuesto para ampliar la imagen del ingrediente */}
          <AnimatePresence>
            {zoomedIngredient && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-white rounded-[32px] p-6 max-w-sm w-full border border-zinc-200/50 shadow-2xl relative flex flex-col items-center text-center"
                >
                  {/* Botón de cierre del zoom */}
                  <button
                    onClick={() => setZoomedIngredient(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <span className="text-[10px] font-bold text-amber-500 tracking-wider uppercase font-mono mb-2">
                    Ingrediente del Trago
                  </span>

                  <h3 className="text-lg font-bold text-zinc-900 mb-4 px-6 leading-tight">
                    {zoomedIngredient.name}
                  </h3>

                  {/* Contenedor de la imagen ampliada del ingrediente */}
                  <div className="w-44 h-44 rounded-2xl bg-zinc-50 border border-zinc-100 p-4 flex items-center justify-center mb-5 relative overflow-hidden shadow-xs">
                    <img
                      src={`https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(zoomedIngredient.originalName)}-Medium.png`}
                      alt={zoomedIngredient.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <p className="text-[11px] text-zinc-400 mb-5 leading-normal max-w-xs">
                    Las proporciones e ingredientes frescos garantizan el sabor perfecto de tu {cocktail.name}.
                  </p>

                  <button
                    onClick={() => setZoomedIngredient(null)}
                    className="w-full py-2.5 bg-black hover:bg-zinc-900 text-white font-semibold text-xs rounded-xl cursor-pointer"
                  >
                    Regresar a la receta
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
