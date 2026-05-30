import { motion } from "motion/react";

/**
 * Componente SkeletonsGrid: muestra una cuadrícula de tarjetas en blanco animadas
 * (efecto shimmer) mientras los datos de la API se están cargando.
 * Imita la estructura visual de CocktailCard para evitar el "salto" de diseño al cargar.
 */
export default function SkeletonsGrid() {
  // Genera un arreglo de 8 elementos vacíos para renderizar 8 tarjetas esqueleto
  const mockCards = Array.from({ length: 8 });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4.5 px-1.5 animate-pulse">
        <div className="h-4 bg-zinc-200 rounded-md w-36" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockCards.map((_, idx) => (
          <div
            id={`skeleton-card-${idx}`}
            key={idx}
            className="bg-white border border-zinc-100/90 rounded-[32px] p-4 flex flex-col h-full animate-pulse"
          >
            {/* Tarjeta esqueleto individual con animación de pulso */}
            {/* Marcador de posición shimmer en proporción cuadrada (imagen) */}
            <div className="aspect-square w-full bg-zinc-100 rounded-[24px] mb-3.5" />

            {/* Content Shimmer placeholders */}
            <div className="flex-1 flex flex-col justify-between px-1">
              <div>
                {/* Category mini line */}
                <div className="h-3 bg-zinc-200 rounded-md w-16 mb-2" />
                {/* Title line */}
                <div className="h-4.5 bg-zinc-200 rounded-md w-4/5" />
              </div>

              {/* Bottom footer Indicators shunt */}
              <div className="mt-4.5 pt-3.5 border-t border-zinc-100 flex items-center justify-between">
                <div className="h-3.5 bg-zinc-100 rounded-md w-24" />
                <div className="h-3.5 bg-zinc-100 rounded-md w-10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
