import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, AlertCircle, RefreshCw, Heart, Wine } from "lucide-react";

import { Cocktail, RawCocktail, SearchFilters } from "./types";
import { parseRawCocktail } from "./utils/parser";
import { translateCategory } from "./utils/translation";
import Logo from "./components/Logo";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CocktailGrid from "./components/CocktailGrid";
import CocktailDetail from "./components/CocktailDetail";
import SkeletonsGrid from "./components/Skeletons";

export default function App() {
  // ─── Estados principales de datos ───────────────────────────────────────────
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [featuredCocktail, setFeaturedCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ─── Estados de búsqueda y filtros ─────────────────────────────────────────
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "All",
    alcoholicType: "All",
  });

  // ─── Modos de visualización ─────────────────────────────────────────────────
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);

  // IDs de favoritos almacenados en un Set y persistidos en localStorage
  // Se inicializa con una función lazy para leer desde localStorage solo al montar
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("cocktail-explorer-favorites");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Efecto secundario: sincroniza los favoritos con localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("cocktail-explorer-favorites", JSON.stringify(Array.from(favoriteIds)));
  }, [favoriteIds]);

  /**
   * Cargador inicial de datos: se ejecuta al montar el componente para obtener
   * la lista estándar de cocteles, las categorías disponibles y un cóctel
   * aleatorio que se muestra en el banner "Destacado del Día".
   */
  const loadInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Peticiones GET paralelas con Axios (más eficiente que hacerlas en secuencia)
      const [drinksRes, categoriesRes, randomRes] = await Promise.all([
        axios.get<{ drinks: RawCocktail[] | null }>("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a"),
        axios.get<{ drinks: { strCategory: string }[] | null }>("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"),
        axios.get<{ drinks: RawCocktail[] | null }>("https://www.thecocktaildb.com/api/json/v1/1/random.php"),
      ]);

      // Parsear y normalizar los cocteles recibidos
      const rawDrinks = drinksRes.data.drinks;
      if (Array.isArray(rawDrinks)) {
        const parsed = rawDrinks.map(parseRawCocktail);
        setCocktails(parsed);
      } else {
        setCocktails([]);
      }

      // Parsear y traducir las categorías disponibles
      const rawCategories = categoriesRes.data.drinks;
      if (Array.isArray(rawCategories)) {
        const parsedCats = rawCategories
          .map((item) => translateCategory(item.strCategory))
          .filter(Boolean)
          .sort();
        setCategories(parsedCats);
      }

      // Parsear y asignar el cóctel aleatorio como "Destacado del Día"
      const rawRandom = randomRes.data.drinks;
      if (Array.isArray(rawRandom) && rawRandom.length > 0) {
        setFeaturedCocktail(parseRawCocktail(rawRandom[0]));
      }
    } catch (err: any) {
      console.error("Error loading initial data:", err);
      setError(
        err.message || "No se pudo conectar con el servidor de recetas. Revisa tu conexión a internet."
      );
    } finally {
      setLoading(false);
    }
  };

  // Efecto de montaje: llama al cargador inicial una única vez al montar el componente
  useEffect(() => {
    loadInitialData();
  }, []);

  /**
   * Efecto de búsqueda por texto: gestiona las peticiones a la API cuando el usuario escribe.
   * Incluye un debouncer de 450 ms para evitar saturar la API en cada tecla.
   * Usa AbortController para cancelar peticiones anteriores y evitar condiciones de carrera
   * entre respuestas que llegan fuera de orden.
   */
  useEffect(() => {
    const controller = new AbortController();

    // Si la búsqueda está vacía, restaurar el listado estándar inicial
    if (filters.query.trim() === "") {
      const resetSearch = async () => {
        try {
          const res = await axios.get<{ drinks: RawCocktail[] | null }>(
            "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a",
            { signal: controller.signal }
          );
          if (Array.isArray(res.data.drinks)) {
            setCocktails(res.data.drinks.map(parseRawCocktail));
          } else {
            setCocktails([]);
          }
        } catch (err) {
          if (!axios.isCancel(err)) {
            console.error("Silent error resetting search list:", err);
          }
        }
      };
      resetSearch();
      return;
    }

    const fetchSearch = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<{ drinks: RawCocktail[] | null }>(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(filters.query)}`,
          { signal: controller.signal }
        );
        const rawDrinks = res.data.drinks;
        if (Array.isArray(rawDrinks)) {
          setCocktails(rawDrinks.map(parseRawCocktail));
        } else {
          setCocktails([]);
        }
      } catch (err: any) {
        if (!axios.isCancel(err)) {
          console.error("Search API error:", err);
          setError("Fallo al realizar la búsqueda. Por favor, reintenta.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSearch();
    }, 450);

    return () => {
      clearTimeout(delayDebounceFn);
      controller.abort();
    };
  }, [filters.query]);

  /**
   * Función "Sorpréndeme" (Aleatorio): llama al endpoint de cóctel random
   * y abre inmediatamente el panel de detalle para una experiencia instantánea.
   */
  const handleFetchRandom = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<{ drinks: RawCocktail[] | null }>(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );
      if (Array.isArray(res.data.drinks) && res.data.drinks.length > 0) {
        const parsed = parseRawCocktail(res.data.drinks[0]);
        
        // Agregar al listado si el cóctel random no está ya en la lista actual
        setCocktails((prev) => {
          if (prev.some((c) => c.id === parsed.id)) return prev;
          return [parsed, ...prev];
        });

        // Abrir el panel de detalle de forma inmediata
        setSelectedCocktail(parsed);
      }
    } catch (err: any) {
      console.error("Randomizer error:", err);
      // Fallback error banner
      alert("No se pudo obtener un trago aleatorio. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Función para alternar el estado de favorito de un cóctel por su ID
  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) {
      // Evita que el clic también abra la tarjeta del cóctel
      e.stopPropagation();
    }
    const next = new Set(favoriteIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setFavoriteIds(next);
  };

  // Función para restablecer todos los filtros al estado inicial
  const handleResetFilters = () => {
    setFilters({
      query: "",
      category: "All",
      alcoholicType: "All",
    });
    setShowFavoritesOnly(false);
  };

  /**
   * Filtrado interactivo del lado del cliente:
   * Recorre los registros de la base de datos obtenidos vía Axios y aplica:
   * 1. Filtro de favoritos
   * 2. Filtro de tipo alcohólico
   * 3. Filtro de categoría
   * 4. Búsqueda semántica por nombre o ingrediente
   * useMemo evita recalcular este listado a menos que cambien sus dependencias.
   */
  const processedCocktails = useMemo(() => {
    return cocktails.filter((cocktail) => {
      // 1. Filtro de favoritos: excluye los que no estén marcados si la vista es solo favoritos
      if (showFavoritesOnly && !favoriteIds.has(cocktail.id)) {
        return false;
      }

      // 2. Filtro por tipo alcohólico (Con Alcohol / Sin Alcohol)
      if (filters.alcoholicType !== "All") {
        const targetLabel = filters.alcoholicType === "Alcoholic" ? "Con Alcohol" : "Sin Alcohol";
        // Comparar en minúsculas para evitar diferencias por capitalización
        if (cocktail.alcoholicLabel.toLowerCase() !== targetLabel.toLowerCase()) {
          return false;
        }
      }

      // 3. Filtro por categoría (ej: Cóctel, Shot, Batido, etc.)
      if (filters.category !== "All") {
        if (cocktail.category.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }
      }

      // 4. Filtro de búsqueda textual inteligente (coincide con nombre O con ingredientes)
      if (filters.query.trim() !== "") {
        const queryClean = filters.query.toLowerCase().trim();
        const matchesName = cocktail.name.toLowerCase().includes(queryClean);
        const matchesIngredient = cocktail.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(queryClean)
        );

        return matchesName || matchesIngredient;
      }

      return true;
    });
  }, [cocktails, filters, showFavoritesOnly, favoriteIds]);

  // Contadores de ingredientes base calculados dinámicamente desde el listado actual de la API
  const ingredientCounts = useMemo(() => {
    let gin = 0;
    let vodka = 0;
    let rum = 0;
    let tequila = 0;
    cocktails.forEach((c) => {
      const hasIng = (name: string) =>
        c.ingredients.some((i) => i.originalName.toLowerCase().includes(name.toLowerCase()));
      if (hasIng("gin")) gin++;
      if (hasIng("vodka")) vodka++;
      if (hasIng("rum")) rum++;
      if (hasIng("tequila")) tequila++;
    });
    return { gin, vodka, rum, tequila };
  }, [cocktails]);

  return (
    <div id="app-root-container" className="min-h-screen bg-[#F2F2F7] flex flex-col lg:flex-row font-sans selection:bg-amber-100 selection:text-amber-900 text-[#1C1C1E]">
      
      {/* Barra lateral: Navegación izquierda (visible solo en escritorio) */}
      <aside className="hidden lg:flex w-72 bg-white/60 backdrop-blur-xl border-r border-zinc-200/50 flex-col p-8 shrink-0 justify-between select-none sticky top-0 h-screen z-30">
        <div className="space-y-12">
          {/* Logo en la parte superior del sidebar */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-none overflow-hidden flex items-center justify-center border border-zinc-100">
              <Logo className="w-full h-full" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-neutral-900 block leading-none">DAIQ</span>
            </div>
          </div>

          <nav className="space-y-8">
            {/* Sección de navegación principal */}
            <div>
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4 ml-2">Explorar</p>
              <ul className="space-y-1">
                <li 
                  onClick={() => handleResetFilters()}
                  className={`rounded-xl px-4 py-3 flex items-center gap-3 font-semibold text-sm cursor-pointer transition-all ${
                    !showFavoritesOnly ? "bg-black/5 text-black" : "text-zinc-500 hover:bg-black/2.5 hover:text-zinc-900"
                  }`}
                >
                  <Sparkles className="w-4.5 h-4.5 text-amber-500" />
                  <span>Principal</span>
                </li>
                <li 
                  onClick={() => setShowFavoritesOnly(true)}
                  className={`rounded-xl px-4 py-3 flex items-center gap-3 font-semibold text-sm cursor-pointer transition-all ${
                    showFavoritesOnly ? "bg-black/5 text-black" : "text-zinc-500 hover:bg-black/2.5 hover:text-zinc-900"
                  }`}
                >
                  <Heart className={`w-4.5 h-4.5 ${showFavoritesOnly ? "text-rose-500 fill-rose-500" : "text-rose-500"}`} />
                  <span>Favoritos ({favoriteIds.size})</span>
                </li>
              </ul>
            </div>

            {/* Sección de filtros por tipo alcohólico */}
            <div>
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4 ml-2 border-b border-zinc-100 pb-1.5">Categorías de Trago</p>
              <ul className="space-y-0.5">
                {[
                  { key: "all", label: "Todos los Tipos", value: "All" },
                  { key: "alc", label: "Con Alcohol", value: "Alcoholic" },
                  { key: "non_alc", label: "Sin Alcohol", value: "Non_Alcoholic" }
                ].map((item) => (
                  <li
                    key={item.key}
                    onClick={() => setFilters({ ...filters, alcoholicType: item.value as any })}
                    className={`px-4 py-2 flex items-center justify-between text-xs font-semibold rounded-lg cursor-pointer transition-all ${
                      filters.alcoholicType === item.value 
                        ? "bg-zinc-100 text-zinc-900 font-bold" 
                        : "text-zinc-500 hover:bg-zinc-100/40"
                    }`}
                  >
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Estadísticas de ingredientes base del listado actual */}
            <div>
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4 ml-2 border-b border-zinc-100 pb-1.5 border-none">Ingredientes Base</p>
              <ul className="space-y-1">
                <li 
                  onClick={() => setFilters({ ...filters, query: "Gin" })}
                  className={`px-4 py-2 flex items-center justify-between text-xs font-medium rounded-lg cursor-pointer transition-all ${
                    filters.query.toLowerCase() === "gin" ? "bg-amber-100/50 text-amber-900" : "text-zinc-500 hover:bg-black/2.5"
                  }`}
                >
                  <span>Ginebra (Gin)</span>
                  <span className="text-[10px] font-mono font-bold bg-zinc-200 px-2 py-0.5 rounded-full text-zinc-700">
                    {ingredientCounts.gin}
                  </span>
                </li>
                <li 
                  onClick={() => setFilters({ ...filters, query: "Vodka" })}
                  className={`px-4 py-2 flex items-center justify-between text-xs font-medium rounded-lg cursor-pointer transition-all ${
                    filters.query.toLowerCase() === "vodka" ? "bg-amber-100/50 text-amber-900" : "text-zinc-500 hover:bg-black/2.5"
                  }`}
                >
                  <span>Vodka</span>
                  <span className="text-[10px] font-mono font-bold bg-zinc-200 px-2 py-0.5 rounded-full text-zinc-700">
                    {ingredientCounts.vodka}
                  </span>
                </li>
                <li 
                  onClick={() => setFilters({ ...filters, query: "Rum" })}
                  className={`px-4 py-2 flex items-center justify-between text-xs font-medium rounded-lg cursor-pointer transition-all ${
                    filters.query.toLowerCase() === "rum" ? "bg-amber-100/50 text-amber-900" : "text-zinc-500 hover:bg-black/2.5"
                  }`}
                >
                  <span>Ron (Rum)</span>
                  <span className="text-[10px] font-mono font-bold bg-zinc-200 px-2 py-0.5 rounded-full text-zinc-700">
                    {ingredientCounts.rum}
                  </span>
                </li>
                <li 
                  onClick={() => setFilters({ ...filters, query: "Tequila" })}
                  className={`px-4 py-2 flex items-center justify-between text-xs font-medium rounded-lg cursor-pointer transition-all ${
                    filters.query.toLowerCase() === "tequila" ? "bg-amber-100/50 text-amber-900" : "text-zinc-500 hover:bg-black/2.5"
                  }`}
                >
                  <span>Tequila</span>
                  <span className="text-[10px] font-mono font-bold bg-zinc-200 px-2 py-0.5 rounded-full text-zinc-700">
                    {ingredientCounts.tequila}
                  </span>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Widget indicador del motor de peticiones Axios */}
        <div className="p-4.5 bg-zinc-100/50 rounded-2xl border border-zinc-200/20 shadow-xs">
          <p className="text-[10px] font-bold text-zinc-400 tracking-wider font-mono">MOTOR DE PETICIONES AXIOS</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <p className="text-[11px] text-zinc-500 font-semibold truncate">
              Estado: <span className="text-emerald-600 font-bold font-mono">200 OK</span>
            </p>
          </div>
        </div>
      </aside>

      {/* Contenedor principal del contenido */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Encabezado móvil/tablet: visible solo por debajo del breakpoint lg (escritorio) */}
        <div className="lg:hidden">
          <Navbar
            favoriteCount={favoriteIds.size}
            onRandomClick={handleFetchRandom}
            onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
            showFavoritesOnly={showFavoritesOnly}
          />
        </div>

        {/* Cuerpo de contenido dentro del layout principal */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col gap-6 md:gap-8">
          
          {/* Sección de cabecera destacada: Banner con cóctel aleatorio del día */}
          <section id="hero-banner" className="relative h-64 md:h-76 w-full rounded-[40px] overflow-hidden bg-black flex flex-col justify-center px-6 sm:px-12 border border-zinc-800 shadow-sm group">
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10 animate-fade-in" />
            <img 
              src={featuredCocktail ? featuredCocktail.thumbnail : "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1024&h=400&fit=crop"} 
              alt={featuredCocktail ? featuredCocktail.name : "Old Fashioned"}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out opacity-60"
            />
            
            <div className="relative z-20 max-w-lg space-y-2">
              <span className="bg-white/15 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full w-max mb-1.5 tracking-wider uppercase font-mono border border-white/5 inline-block">
                DESTACADO DEL DÍA
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tighter leading-none">
                {featuredCocktail ? featuredCocktail.name : "Cargando..."}
              </h1>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-md line-clamp-3">
                {featuredCocktail 
                  ? (featuredCocktail.instructions || "Un trago recomendado para hoy.")
                  : "Descubriendo una deliciosa sugerencia para ti hoy..."}
              </p>

              {featuredCocktail && featuredCocktail.tags && featuredCocktail.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {featuredCocktail.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/10 backdrop-blur-md text-zinc-200 text-[9px] font-semibold px-2 py-0.5 rounded-lg border border-white/5 tracking-widest font-mono uppercase"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="pt-2.5 flex items-center gap-3">
                <button 
                  onClick={() => handleFetchRandom()}
                  className="bg-white text-black hover:bg-zinc-100 px-5.5 py-2 rounded-2xl font-extrabold text-xs transition-colors cursor-pointer shadow-xs"
                >
                  Sugerencia Random
                </button>
                {featuredCocktail && (
                  <button 
                    onClick={() => setSelectedCocktail(featuredCocktail)}
                    className="text-xs font-bold text-white/90 hover:text-white flex items-center gap-1.5 bg-black/35 hover:bg-black/55 backdrop-blur-xs px-3.5 py-2 rounded-2xl transition-all cursor-pointer"
                  >
                    Ver Receta &rarr;
                  </button>
                )}
              </div>
            </div>
            
            {/* Visual gradient accent circles inside banner */}
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          </section>

          {/* Controlador centralizado del motor de búsqueda y filtros */}
          <SearchBar
            filters={filters}
            onChangeFilters={setFilters}
            availableCategories={categories}
          />

          {/* Flujo de estados de carga dinámica del contenido */}
          {error ? (
            <div
              id="error-banner-container"
              className="w-full flex flex-col items-center justify-center p-8 bg-rose-50 border border-rose-100 rounded-3xl text-center"
            >
              <div className="w-12 h-12 bg-rose-100/80 rounded-2xl flex items-center justify-center text-rose-500 mb-3.5 border border-rose-200/50">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-sans font-bold text-rose-900 text-base mb-1">
                Error de Conexión
              </h3>
              <p className="text-rose-700/80 text-xs max-w-md mb-4.5 leading-relaxed">
                {error}
              </p>
              <motion.button
                id="btn-retry-load"
                whileTap={{ scale: 0.95 }}
                onClick={loadInitialData}
                className="inline-flex items-center gap-2 px-4.5 py-2.5 bg-rose-600 hover:bg-rose-700 transition-colors text-white rounded-xl text-xs font-semibold shadow-sm cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reintentar Carga</span>
              </motion.button>
            </div>
          ) : loading && cocktails.length === 0 ? (
            /* Shimmers iniciales de carga (esqueletos animados) */
            <SkeletonsGrid />
          ) : (
            /* Listado completo e interactivo de tarjetas de cócteles */
            <div className="relative">
              {/* Indicadores de filtro activos e información de resultados */}
              {showFavoritesOnly && processedCocktails.length === 0 && (
                <div id="favorites-empty-state" className="w-full text-center py-16 px-4 bg-white rounded-[32px] border border-dashed border-zinc-200">
                  <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mx-auto mb-3 border border-rose-100">
                    <Heart className="w-5 h-5 fill-rose-500/20" />
                  </div>
                  <h3 className="font-sans font-bold text-zinc-800 text-sm mb-1">
                    Tu bar todavía está vacío
                  </h3>
                  <p className="text-zinc-500 text-xs max-w-sm mx-auto leading-relaxed mb-4">
                    Haz clic en el icono de corazón de cualquier cóctel que te guste para agregarlo a tus recetas guardadas personales.
                  </p>
                  <button
                    id="btn-fav-empty-reset"
                    onClick={() => setShowFavoritesOnly(false)}
                    className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Ver Todos los Tragos
                  </button>
                </div>
              )}

              {!(showFavoritesOnly && processedCocktails.length === 0) && (
                <>
                  {/* Spinner secundario superpuesto cuando se busca en segundo plano mientras el usuario escribe */}
                  {loading && (
                    <div className="absolute top-2 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur border border-zinc-100 px-3 py-1.5 rounded-full shadow-xs text-zinc-500 text-xs z-10 font-medium">
                      <RefreshCw className="w-3 h-3 animate-spin text-amber-500" />
                      <span>Buscando...</span>
                    </div>
                  )}

                  <CocktailGrid
                    cocktails={processedCocktails}
                    favoriteIds={favoriteIds}
                    onToggleFavorite={handleToggleFavorite}
                    onSelectCocktail={setSelectedCocktail}
                    onResetFilters={handleResetFilters}
                  />
                </>
              )}
            </div>
          )}
        </main>

        {/* Pie de página con información del sistema */}
        <footer id="app-footer" className="w-full border-t border-zinc-200/40 py-6 bg-white/40 mt-12 text-center text-zinc-400 text-[10px] font-mono tracking-wide">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span>DAIQ® &bull; © 2026. Todos los derechos reservados.</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Desarrollado con la API pública de TheCocktailDB</span>
              <span>&bull;</span>
              <span className="text-emerald-500 font-bold">&bull; SERVICIO EN EJECUCIÓN CON ÉXITO</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Panel de detalle deslizable estilo iOS (drawer inferior) */}
      <CocktailDetail
        cocktail={selectedCocktail}
        onClose={() => setSelectedCocktail(null)}
        isFavorite={selectedCocktail ? favoriteIds.has(selectedCocktail.id) : false}
        onToggleFavorite={(id) => handleToggleFavorite(id)}
      />
    </div>
  );
}
