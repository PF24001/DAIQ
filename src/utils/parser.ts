import { RawCocktail, Cocktail, IngredientItem } from "../types";
import {
  translateIngredient,
  translateCategory,
  translateGlass,
  translateAlcoholicType,
  translateInstructions,
} from "./translation";

/**
 * Convierte un objeto de cóctel en crudo (tal como lo devuelve TheCocktailDB)
 * en una interfaz Cocktail limpia y bien estructurada.
 */
export function parseRawCocktail(raw: RawCocktail): Cocktail {
  const ingredients: IngredientItem[] = [];

  // La API devuelve hasta 15 ingredientes con sus medidas en campos numerados (strIngredient1..15)
  for (let i = 1; i <= 15; i++) {
    const ingredientName = raw[`strIngredient${i}`];
    const ingredientMeasure = raw[`strMeasure${i}`];

    // Solo se agrega el ingrediente si tiene nombre y no es una cadena vacía
    if (ingredientName && ingredientName.trim() !== "") {
      const trimmedName = ingredientName.trim();
      ingredients.push({
        id: `${raw.idDrink}-${i}`,           // ID único generado en el cliente para usar como key
        name: translateIngredient(trimmedName), // Nombre traducido al español
        originalName: trimmedName,             // Nombre original en inglés (para peticiones a la API de imágenes)
        measure: ingredientMeasure ? ingredientMeasure.trim() : "",
      });
    }
  }

  // Parsear etiquetas (tags) separadas por coma
  let tags: string[] = [];
  if (raw.strTags) {
    tags = raw.strTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
  }

  // Agregar la clasificación IBA como etiqueta extra si está disponible y no está duplicada
  if (raw.strIBA && raw.strIBA.trim() !== "") {
    const ibaTag = raw.strIBA.trim();
    if (!tags.some((t) => t.toLowerCase() === ibaTag.toLowerCase())) {
      tags.push(ibaTag);
    }
  }

  // Construir y devolver el objeto Cocktail normalizado
  return {
    id: raw.idDrink,
    name: raw.strDrink,
    thumbnail: raw.strDrinkThumb,
    category: translateCategory(raw.strCategory || "Uncategorized"),
    alcoholic: raw.strAlcoholic === "Alcoholic",                        // true si es alcohólico
    alcoholicLabel: translateAlcoholicType(raw.strAlcoholic || "Unknown"),
    glass: translateGlass(raw.strGlass || "Standard Glass"),
    // Priorizar instrucciones en español de la API; si no hay, traducir las inglesas con regex
    instructions: raw.strInstructionsES || translateInstructions(raw.strInstructions),
    tags,
    ingredients,
  };
}
