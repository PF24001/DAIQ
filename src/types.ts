// Tipos de datos centrales de la aplicación DAIQ
// Define las interfaces usadas en toda la app para garantizar consistencia de tipos.

/**
 * Estructura cruda de un cóctel tal como la devuelve la API de TheCocktailDB.
 * Los campos de ingredientes y medidas son dinámicos (strIngredient1..15, strMeasure1..15).
 */
export interface RawCocktail {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: string | null;
  strTags: string | null;
  strVideo: string | null;
  strCategory: string;
  strIBA: string | null;                        // Clasificación de la Asociación Internacional de Bartenders
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;                      // Instrucciones en inglés (predeterminado)
  strInstructionsES: string | null;             // Instrucciones en español (cuando están disponibles)
  strInstructionsDE: string | null;             // Instrucciones en alemán
  strInstructionsFR: string | null;             // Instrucciones en francés
  strInstructionsIT: string | null;             // Instrucciones en italiano
  "strInstructionsZH-HANS": string | null;      // Instrucciones en chino simplificado
  "strInstructionsZH-HANT": string | null;      // Instrucciones en chino tradicional
  strDrinkThumb: string;                        // URL de la imagen miniatura del cóctel
  // Ingredientes del 1 al 15 (strIngredient1..strIngredient15, strMeasure1..strMeasure15)
  [key: string]: string | null;
}

/**
 * Representa un ingrediente individual ya procesado y normalizado.
 */
export interface IngredientItem {
  id: string;           // ID único generado en el cliente (para usar como key en .map())
  name: string;         // Nombre traducido al español
  originalName: string; // Nombre original en inglés (necesario para las peticiones de imágenes a la API)
  measure: string;      // Cantidad o medida del ingrediente
}

/**
 * Estructura de un cóctel limpio y normalizado, lista para ser usada en los componentes.
 */
export interface Cocktail {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  alcoholic: boolean;       // true si es alcohólico, false en caso contrario
  alcoholicLabel: string;   // Etiqueta traducida al español (ej: "Con Alcohol", "Sin Alcohol")
  glass: string;
  instructions: string;
  tags: string[];
  ingredients: IngredientItem[];
  isFavorite?: boolean;     // Propiedad opcional usada para marcado visual en la UI
}

/**
 * Filtros de búsqueda y categorización aplicados por el usuario.
 */
export interface SearchFilters {
  query: string;                                        // Texto de búsqueda libre (por nombre o ingrediente)
  category: string;                                     // 'All' o una categoría específica
  alcoholicType: 'All' | 'Alcoholic' | 'Non_Alcoholic'; // Filtro de tipo alcohólico
}

/**
 * Estado genérico de la carga de datos desde la API.
 * Utilizado para controlar loading, error y datos en los componentes.
 */
export interface ApiState {
  data: Cocktail[] | null;
  loading: boolean;
  error: string | null;
}
