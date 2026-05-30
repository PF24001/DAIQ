// Diccionario de traducción de ingredientes: clave en inglés (minúsculas) → nombre en español
const INGREDIENT_DICT: Record<string, string> = {
  "light rum": "Ron blanco",
  "dark rum": "Ron oscuro",
  "spiced rum": "Ron especiado",
  "white rum": "Ron blanco",
  "malibu rum": "Ron Malibu",
  "rum": "Ron",
  "vodka": "Vodka",
  "gin": "Ginebra",
  "dry gin": "Ginebra seca",
  "tequila": "Tequila",
  "triple sec": "Triple seco",
  "bourbon": "Bourbon",
  "whiskey": "Whisky",
  "scotch": "Whisky escocés",
  "irish whiskey": "Whisky irlandés",
  "brandy": "Brandy",
  "cognac": "Coñac",
  "champagne": "Champaña",
  "sweet vermouth": "Vermut dulce",
  "dry vermouth": "Vermut seco",
  "vermouth": "Vermut",
  "campari": "Campari",
  "aperol": "Aperol",
  "kahlua": "Kahlúa",
  "baileys irish cream": "Crema irlandesa Baileys",
  "baileys": "Baileys",
  "amaretto": "Amaretto",
  "cointreau": "Cointreau",
  "grand marnier": "Grand Marnier",
  "lime juice": "Jugo de lima",
  "lemon juice": "Jugo de limón",
  "orange juice": "Jugo de naranja",
  "pineapple juice": "Jugo de piña",
  "cranberry juice": "Jugo de arándano",
  "apple juice": "Jugo de manzana",
  "grapefruit juice": "Jugo de toronja",
  "tomato juice": "Jugo de tomate",
  "lemon-lime soda": "Refresco de limón y lima",
  "sprite": "Sprite",
  "coca-cola": "Coca-Cola",
  "cola": "Refresco de cola",
  "ginger ale": "Ginger ale",
  "ginger beer": "Cerveza de jengibre",
  "club soda": "Soda / Sifón",
  "soda water": "Agua de sifón",
  "sparkling water": "Agua con gas",
  "tonic water": "Agua tónica",
  "water": "Agua",
  "orange bitters": "Amargo de naranja",
  "bitters": "Amargo",
  "angostura bitters": "Amargo de Angostura",
  "sugar syrup": "Jarabe de azúcar",
  "simple syrup": "Jarabe simple",
  "grenadine": "Granadina",
  "sugar": "Azúcar",
  "brown sugar": "Azúcar morena",
  "honey": "Miel",
  "maple syrup": "Jarabe de arce",
  "milk": "Leche",
  "heavy cream": "Crema de leche",
  "cream": "Crema",
  "egg white": "Clara de huevo",
  "egg yolk": "Yema de huevo",
  "egg": "Huevo",
  "mint": "Menta",
  "mint leaves": "Hojas de menta",
  "lime": "Lima",
  "lemon": "Limón",
  "orange": "Naranja",
  "pineapple": "Piña",
  "cherry": "Cereza",
  "cherries": "Cerezas",
  "maraschino cherry": "Cereza al marrasquino",
  "olive": "Aceituna",
  "olives": "Aceitunas",
  "salt": "Sal",
  "black pepper": "Pimienta negra",
  "pepper": "Pimienta",
  "hot sauce": "Salsa picante",
  "tabasco sauce": "Tabasco",
  "worcestershire sauce": "Salsa inglesa (Worcestershire)",
  "nutmeg": "Nuez moscada",
  "cinnamon": "Canela",
  "cinnamon stick": "Rama de canela",
  "cloves": "Clavos de olor",
  "vanilla extract": "Extracto de vainilla",
  "vanilla": "Vainilla",
  "ice": "Hielo",
  "crushed ice": "Hielo triturado",
  "cubed ice": "Hielo en cubos",
  "cream of coconut": "Crema de coco",
  "coconut cream": "Crema de coco",
  "coconut milk": "Leche de coco",
  "midori melon liqueur": "Licor de melón Midori",
  "peach schnapps": "Licor de durazno",
  "sloe gin": "Ginebra de endrina",
  "blue curacao": "Curazao azul",
  "creme de cacao": "Crema de cacao",
  "creme de menthe": "Crema de menta",
  "creme de cassis": "Crema de casis",
  "chambord": "Chambord",
  "frangelico": "Frangelico",
  "sambuca": "Sambuca",
  "sherry": "Jerez",
  "port": "Oporto",
  "red wine": "Vino tinto",
  "white wine": "Vino blanco",
  "prosecco": "Prosecco",
  "beer": "Cerveza",
  "coffee": "Café",
  "espresso": "Café expreso",
  "tea": "Té",
  "chocolate": "Chocolate",
  "cocoa powder": "Cacao en polvo",
  "pisco": "Pisco",
  "claret": "Clarete",
  "applejack": "Licor de manzana Applejack",
  "ale": "Cerveza Ale",
  "lager": "Cerveza Lager",
  "yeast": "Levadura",
  "guinness stout": "Cerveza negra Guinness",
  "cider": "Sidra",
  "carbonated water": "Agua carbonatada",
  "whipped cream": "Crema batida",
  "cayenne pepper": "Pimienta de cayena",
  "pineapple slices": "Rodajas de piña",
  "lime wedge": "Rodaja de lima",
  "lime juice of": "Jugo de lima (fresca)",
  "juice of lemon": "Jugo de limón (fresco)",
  "juice of lime": "Jugo de lima (fresco)",
  "lemon peel": "Cáscara de limón",
  "orange peel": "Cáscara de naranja",
  "maraschino liqueur": "Licor de marrasquino",
  "powdered sugar": "Azúcar impalpable",
  "celery salt": "Sal de apio",
  "olive brine": "Salmuera de aceituna",
  "soda": "Soda",
  "club-soda": "Soda / Sifón",
  "ginger-ale": "Ginger ale",
  "carbonated beverage": "Bebida gasificada",
  "cranberries": "Arándanos rojos",
  "berries": "Bayas / Frutos rojos",
  "warm water": "Agua tibia",
  "hot water": "Agua caliente",
  "cold water": "Agua fría",
  "brown sugar cube": "Terrón de azúcar morena",
  "sugar cube": "Terrón de azúcar",
  "tonic": "Tónica",
  "cachaca": "Cachaça",
  "ouzo": "Ouzo",
  "absinthe": "Ajenjo / Absenta",
  "peach brandy": "Brandy de durazno",
  "cherry brandy": "Brandy de cereza",
  "apricot brandy": "Brandy de albaricoque",
  "blackberry brandy": "Brandy de mora",
  "apple brandy": "Brandy de manzana",
  "calvados": "Calvados",
  "gold tequila": "Tequila dorado",
  "white tequila": "Tequila blanco",
  "reposado tequila": "Tequila reposado",
  "dry vermouth dry vermouth": "Vermut seco",
  "sweet vermouth sweet vermouth": "Vermut dulce",
  "sweet and sour": "Mezcla agridulce",
  "sweet & sour": "Mezcla agridulce",
  "sour mix": "Mezcla sour (limón y jarabe)",
  "ginger": "Jengibre",
  "coriander": "Cilantro / Corandro",
  "basil": "Albahaca",
  "rosemary": "Romero",
  "thyme": "Tomillo",
  "lavender": "Lavanda",
};

// Diccionario de traducción de categorías de cócteles
const CATEGORY_DICT: Record<string, string> = {
  "ordinary drink": "Bebida Común",
  "cocktail": "Cóctel",
  "shake": "Batido / Shake",
  "other / unknown": "Otros / Desconocido",
  "cocoa": "Cacao / Chocolate",
  "shot": "Chupito / Shot",
  "coffee / tea": "Café / Té",
  "homemade liqueur": "Licor Casero",
  "punch / party drink": "Ponche / Bebida de Fiesta",
  "beer": "Cerveza",
  "soft drink": "Refresco / Soda",
  "soft drink / soda": "Refresco / Soda",
  "other": "Otro",
  "unknown": "Desconocido",
  "all": "Todos",
};

// Diccionario de traducción de tipos de copa/vaso
const GLASS_DICT: Record<string, string> = {
  "cocktail glass": "Copa de cóctel",
  "highball glass": "Vaso de tubo (Highball)",
  "old-fashioned glass": "Vaso bajo (Old Fashioned)",
  "collins glass": "Vaso Collins",
  "champagne flute": "Copa Flauta de Champaña",
  "whiskey sour glass": "Copa de Whiskey Sour",
  "mug": "Taza / Jarra",
  "shot glass": "Vaso de chupito (Shot)",
  "pint glass": "Vaso de pinta",
  "copper mug": "Paso de cobre",
  "wine glass": "Copa de vino",
  "beer mug": "Jarra de cerveza",
  "irish coffee cup": "Copa de café irlandés",
  "hurricane glass": "Copa Huracán",
  "martini glass": "Copa Martini",
  "punch bowl": "Ponchera",
  "margarita/coupette glass": "Copa de Margarita/Coupette",
  "margarita glass": "Copa Margarita",
  "beer pilsner": "Vaso Pilsner",
  "pitcher": "Jarra / Pichel",
  "white wine glass": "Copa de vino blanco",
  "red wine glass": "Copa de vino tinto",
  "coupette glass": "Copa Coupe",
  "coupe glass": "Copa Coupe",
  "coffee mug": "Taza de café",
  "jar": "Tarro",
  "mason jar": "Frasco de vidrio (Mason Jar)",
  "standard glass": "Vaso estándar",
  "balloon glass": "Copa Balón",
  "brandy snifter": "Copa de brandy (Copón)",
  "nick and nora glass": "Copa Nick & Nora",
  "champagne coupe": "Copa Coupe de Champaña",
  "sherry glass": "Copa de jerez",
  "cordial glass": "Copa de licor (Cordial)",
};

// Diccionario de traducción del tipo de contenido alcohólico
const ALCOHOL_DICT: Record<string, string> = {
  "alcoholic": "Con Alcohol",
  "non alcoholic": "Sin Alcohol",
  "non_alcoholic": "Sin Alcohol",
  "optional alcohol": "Alcohol Opcional",
  "all": "Todos",
};

// Lista de pares [expresión regular, traducción en español] para convertir instrucciones de preparación.
// El orden importa: las frases más largas y específicas tienen mayor prioridad para preservar la gramática.
const PHRASE_TRANSLATIONS: Array<[RegExp, string]> = [
  // 1. Frases completas largas y muy específicas (mayor prioridad para preservar la gramática correcta)
  [/shake with ice and strain into a chilled cocktail glass/gi, "Agitar con hielo y colar en una copa de cóctel fría"],
  [/stir with ice and strain into a chilled cocktail glass/gi, "Remover con hielo y colar en una copa de cóctel fría"],
  [/shake well with ice and strain into a chilled cocktail glass/gi, "Agitar bien con hielo y colar en una copa de cóctel fría"],
  [/pour all ingredients into an old-fashioned glass over ice/gi, "Verter todos los ingredientes en un vaso bajo (Old Fashioned) sobre hielo"],
  [/pour all ingredients into a shaker with ice/gi, "Verter todos los ingredientes en una coctelera con hielo"],
  [/pour all ingredients into a highball glass over ice/gi, "Verter todos los ingredientes en un vaso alto (Highball) sobre hielo"],
  [/pour all ingredients into a collins glass over ice/gi, "Verter todos los ingredientes en un vaso Collins sobre hielo"],
  [/pour ingredients into a shaker half-filled with ice/gi, "Verter los ingredientes en una coctelera llena de hielo hasta la mitad"],
  [/shake with ice and strain into a collins glass/gi, "Agitar con hielo y colar en un vaso Collins"],
  [/shake with ice and strain into a highball glass/gi, "Agitar con hielo y colar en un vaso de tubo (Highball)"],
  [/shake with ice and strain into an old-fashioned glass/gi, "Agitar con hielo y colar en un vaso bajo (Old Fashioned)"],
  [/shake with ice and strain into a shot glass/gi, "Agitar con hielo y colar en un vaso de chupito"],
  [/stir and strain into an old-fashioned glass/gi, "Remover y colar en un vaso bajo (Old Fashioned)"],
  [/stir and strain into a chilled cocktail glass/gi, "Remover y colar en una copa de cóctel fría"],
  [/stir and strain into a glass/gi, "Remover y colar en un vaso"],
  [/garnish with a slice of orange and a cherry/gi, "Decorar con una rodaja de naranja y una cereza"],
  [/garnish with a slice of lemon and a cherry/gi, "Decorar con una rodaja de limón y una cereza"],
  [/garnish with a slice of lime and a cherry/gi, "Decorar con una rodaja de lima y una cereza"],
  [/garnish with a lime wedge and a cherry/gi, "Decorar con una rodaja de lima y una cereza"],
  [/garnish with a lemon wedge and a cherry/gi, "Decorar con una rodaja de limón y una cereza"],

  // 2. Frases verbales de longitud media y acciones de preparación
  [/garnish with a slice of lime/gi, "Decorar con una rodaja de lima"],
  [/garnish with a slice of lemon/gi, "Decorar con una rodaja de limón"],
  [/garnish with a slice of orange/gi, "Decorar con una rodaja de naranja"],
  [/garnish with a lime wheel/gi, "Decorar con una rodaja de lima (rueda)"],
  [/garnish with a lime wedge/gi, "Decorar con una rodaja de lima"],
  [/garnish with a lemon wedge/gi, "Decorar con una rodaja de limón"],
  [/garnish with a lemon wheel/gi, "Decorar con una rodaja de limón (rueda)"],
  [/garnish with a maraschino cherry/gi, "Decorar con una cereza al marrasquino"],
  [/garnish with an orange twist/gi, "Decorar con un twist de naranja"],
  [/garnish with a lemon twist/gi, "Decorar con un twist de limón"],
  [/garnish with mint sprig/gi, "Decorar con una ramita de menta"],
  [/garnish with mint sprigs/gi, "Decorar con ramitas de menta"],
  [/garnish with mint leaf/gi, "Decorar con una hoja de menta"],
  [/garnish with mint leaves/gi, "Decorar con hojas de menta"],
  [/garnish with a cherry/gi, "Decorar con una cereza"],
  
  [/shake with ice and strain into a/gi, "Agitar con hielo y colar en un/a"],
  [/shake with ice and strain into an/gi, "Agitar con hielo y colar en un/a"],
  [/shake with ice and strain into/gi, "Agitar con hielo y colar en"],
  [/shake with ice and strain/gi, "Agitar con hielo y colar"],
  [/shake well and strain into a/gi, "Agitar bien y colar en un/a"],
  [/shake well and strain into/gi, "Agitar bien y colar en"],
  [/shake well and strain/gi, "Agitar bien y colar"],
  [/shake all ingredients with ice/gi, "Agitar todos los ingredientes con hielo"],
  [/shake ingredients with ice/gi, "Agitar los ingredientes con hielo"],
  [/shake and strain into a/gi, "Agitar y colar en un/a"],
  [/shake and strain into/gi, "Agitar y colar en"],
  [/shake and strain/gi, "Agitar y colar"],

  [/pour all ingredients into an/gi, "Verter todos los ingredientes en un/a"],
  [/pour all ingredients into a/gi, "Verter todos los ingredientes en un/a"],
  [/pour all ingredients into/gi, "Verter todos los ingredientes en"],
  [/pour ingredients into a shaker/gi, "Verter los ingredientes en una coctelera"],
  [/pour ingredients into a/gi, "Verter los ingredientes en un/a"],
  [/pour ingredients into/gi, "Verter los ingredientes en"],
  [/pour into a chilled cocktail glass/gi, "Verter en una copa de cóctel fría"],
  [/pour into a chilled old-fashioned glass/gi, "Verter en un vaso bajo (Old Fashioned) frío"],
  [/pour into a chilled highball glass/gi, "Verter en un vaso alto (Highball) frío"],
  [/pour into a highball glass/gi, "Verter en un vaso alto (Highball)"],
  [/pour into an old-fashioned glass/gi, "Verter en un vaso bajo (Old Fashioned)"],
  [/pour into a collins glass/gi, "Verter en un vaso Collins"],
  [/pour into a shot glass/gi, "Verter en un vaso de chupito"],
  [/pour into glass over ice/gi, "Verter en el vaso sobre hielo"],
  [/pour everything into/gi, "Verter todo en"],
  [/pour over ice and serve/gi, "Verter sobre hielo y servir"],
  [/pour over crushed ice/gi, "Verter sobre hielo triturado"],
  [/pour over ice cubes/gi, "Verter sobre cubitos de hielo"],
  [/pour over ice/gi, "Verter sobre hielo"],
  [/pour into a/gi, "Verter en un/a"],
  [/pour into an/gi, "Verter en un/a"],
  [/pour into/gi, "Verter en"],

  [/blend until smooth/gi, "Licuar hasta que quede homogéneo"],
  [/blend with ice/gi, "Licuar con hielo"],
  [/blend all ingredients/gi, "Licuar todos los ingredientes"],
  [/blend with crushed ice/gi, "Licuar con hielo triturado"],

  [/stir well with ice/gi, "Remover bien con hielo"],
  [/stir and strain into a/gi, "Remover y colar en un/a"],
  [/stir and strain into/gi, "Remover y colar en"],
  [/stir and strain/gi, "Remover y colar"],
  [/stir with a spoon/gi, "Remover con una cuchara"],
  [/stir ingredients with ice/gi, "Remover los ingredientes con hielo"],
  [/stir well/gi, "Remover bien"],

  [/rub the rim of the glass with/gi, "Frotar el borde del vaso con"],
  [/rim of the glass with/gi, "El borde del vaso con"],
  [/rimmed with salt/gi, "Escarchado con sal"],
  [/rim with salt/gi, "Escarchar el borde con sal"],
  [/with a salt-rimmed glass/gi, "Con un vaso escarchado con sal"],

  [/squeeze the juice of/gi, "Exprimir el jugo de"],
  [/squeeze in the juice of/gi, "Exprimir el jugo de"],
  [/squeeze juice of/gi, "Exprimir el jugo de"],
  [/squeeze of/gi, "un chorrito de"],

  [/fill glass with crushed ice/gi, "Llenar el vaso con hielo triturado"],
  [/fill glass with ice cubes/gi, "Llenar el vaso con cubitos de hielo"],
  [/fill glass with ice/gi, "Llenar el vaso con hielo"],
  [/fill shaker with ice cubes/gi, "Llenar la coctelera con cubitos de hielo"],
  [/fill shaker with ice/gi, "Llenar la coctelera con hielo"],
  [/fill with ice cubes/gi, "Llenar con cubitos de hielo"],
  [/fill with crushed ice/gi, "Llenar con hielo triturado"],
  [/fill with ice/gi, "Llenar con hielo"],
  [/fill the glass with/gi, "Llenar el vaso con"],
  [/fill glass with/gi, "Llenar el vaso con"],
  [/fill of glass/gi, "Llenar el vaso"],

  [/combine all ingredients in a shaker/gi, "Combinar todos los ingredientes en una coctelera"],
  [/combine all ingredients in a/gi, "Combinar todos los ingredientes en un/a"],
  [/combine all ingredients with ice/gi, "Combinar todos los ingredientes con hielo"],
  [/combine all ingredients/gi, "Combinar todos los ingredientes"],
  [/combine ingredients with ice/gi, "Combinar los ingredientes con hielo"],
  [/combine ingredients/gi, "Combinar los ingredientes"],
  [/combine the/gi, "Combinar el/la"],

  [/muddle mint leaves with sugar and lime juice/gi, "Machacar las hojas de menta con el azúcar y el jugo de lima"],
  [/muddle mint leaves and sugar/gi, "Machacar las hojas de menta y el azúcar"],
  [/muddle the mint leaves/gi, "Machacar las hojas de menta"],
  [/muddle mint leaves/gi, "Machacar las hojas de menta"],
  [/muddle the/gi, "Machacar el/la"],

  [/float on top/gi, "Flotar por encima"],
  [/float the/gi, "Hacer flotar el/la"],
  [/top up with/gi, "Rellenar con / Completar con"],
  [/top with/gi, "Completar con"],

  [/serve over ice/gi, "Servir con hielo"],
  [/serve on the rocks/gi, "Servir en las rocas (con hielo)"],
  [/serve with ice/gi, "Servir con hielo"],
  [/serve with a straw/gi, "Servir con un sorbete/pajita"],
  [/serve in a highball glass/gi, "Servir en un vaso alto (Highball)"],
  [/serve in a collins glass/gi, "Servir en un vaso Collins"],
  [/serve in a cocktail glass/gi, "Servir en una copa de cóctel"],
  [/serve in an old-fashioned glass/gi, "Servir en un vaso bajo (Old Fashioned)"],
  [/serve in a shot glass/gi, "Servir en un vaso de chupito"],
  [/serve with/gi, "Servir con"],
  [/and severe/gi, "y servir"],
  [/and serve/gi, "y servir"],

  [/mix all ingredients/gi, "Mezclar todos los ingredientes"],
  [/mix well/gi, "Mezclar bien"],

  [/add ice cubes/gi, "Añadir cubitos de hielo"],
  [/add ice/gi, "Añadir hielo"],
  [/add the/gi, "Añadir el/la"],
  [/add all ingredients/gi, "Añadir todos los ingredientes"],

  // 3. Palabras cortas individuales e indicadores estructurales directos
  [/\bin a shaker\b/gi, "en una coctelera"],
  [/\bin a blender\b/gi, "en una licuadora"],
  [/\bin a glass\b/gi, "en un vaso"],
  [/\binto a chilled\b/gi, "en una copa/vaso frío"],
  [/\binto a\b/gi, "en un/a"],
  [/\binto an\b/gi, "en un/a"],
  [/\bon top\b/gi, "en la parte superior"],
  [/\bon the rocks\b/gi, "en las rocas (con hielo)"],
  [/\bover ice\b/gi, "sobre hielo"],
  [/\bwith ice\b/gi, "con hielo"],
  [/\bcrushed ice\b/gi, "hielo triturado"],
  [/\bice cubes\b/gi, "cubitos de hielo"],
  [/\bcold water\b/gi, "agua fría"],
  [/\bwarm water\b/gi, "agua tibia"],
  [/\bhot water\b/gi, "agua caliente"],
  [/\bboiling water\b/gi, "agua hirviendo"],
  [/\bchilled glass\b/gi, "vaso frío / copa fría"],
  [/\bcocktail glass\b/gi, "copa de cóctel"],
  [/\bcollins glass\b/gi, "vaso Collins"],
  [/\bhighball glass\b/gi, "vaso de tubo (Highball)"],
  [/\bold-fashioned glass\b/gi, "vaso bajo (Old-Fashioned)"],
  [/\bshot glass\b/gi, "vaso de chupito"],
  [/\bwine glass\b/gi, "copa de vino"],
  [/\bpint glass\b/gi, "vaso de pinta"],
  [/\bcopper mug\b/gi, "taza de cobre"],
  [/\bbeer mug\b/gi, "jarra de cerveza"],
  [/\bchampagne flute\b/gi, "copa de champaña (flauta)"],
  [/\band stir\b/gi, "y remover"],
  [/\band shake\b/gi, "y agitar"],
  [/\band blend\b/gi, "y licuar"],
  [/\bto taste\b/gi, "al gusto"],
  [/\bshaken\b/gi, "agitado/a"],
  [/\bstirred\b/gi, "removido/a"],
  [/\bblended\b/gi, "licuado/a"],
  [/\bstrained\b/gi, "colado/a"],
  [/\bmuddled\b/gi, "machacado/a"],
  [/\bsweet and sour\b/gi, "mezcla agridulce"],
  [/\bsour mix\b/gi, "mezcla sour (agridulce)"],
  [/\bsimple syrup\b/gi, "jarabe simple"],
  [/\bheavy cream\b/gi, "crema de leche"],
  [/\begg white\b/gi, "clara de huevo"],
  [/\begg yolk\b/gi, "yema de huevo"],
  [/\blime juice\b/gi, "jugo de lima"],
  [/\blemon juice\b/gi, "jugo de limón"],
  [/\borange juice\b/gi, "jugo de naranja"],
  [/\bpineapple juice\b/gi, "jugo de piña"],
  [/\bcranberry juice\b/gi, "jugo de arándanos"],
  [/\bgrapefruit juice\b/gi, "jugo de toronja"],
  [/\btomato juice\b/gi, "jugo de tomate"],
  [/\btonic water\b/gi, "agua tónica"],
  [/\bsoda water\b/gi, "soda"],
  [/\bclub soda\b/gi, "soda"],
  [/\bginger ale\b/gi, "ginger ale"],
  [/\bginger beer\b/gi, "cerveza de jengibre"],
  [/\bdash of\b/gi, "un toque de"],
  [/\bdashes of\b/gi, "toques de"],
  [/\bdash\b/gi, "un golpe"],
  [/\bdashes\b/gi, "toques"],
  [/\bslice of\b/gi, "rodaja de"],
  [/\bslices of\b/gi, "rodajas de"],
  [/\bwedge of\b/gi, "rodaja de"],
  [/\bwedges of\b/gi, "rodajas de"],
  [/\bpeel of\b/gi, "cáscara de"],
  [/\btwist of\b/gi, "twist de"],
  [/\blime wedge\b/gi, "rodaja de lima"],
  [/\blemon wedge\b/gi, "rodaja de limón"],
  [/\borange slice\b/gi, "rodaja de naranja"],
  [/\blime slice\b/gi, "rodaja de lima"],
  [/\blemon slice\b/gi, "rodaja de limón"],
  [/\bsprig of\b/gi, "ramita de"],
  [/\bsprigs of\b/gi, "ramitas de"],
  [/\bwell\b/gi, "bien"],
  [/\bgently\b/gi, "suavemente"],
  [/\bvigorously\b/gi, "vigorosamente"],
  [/\bshaker\b/gi, "coctelera"],
  [/\bshake\b/gi, "agitar"],
  [/\bstir\b/gi, "remover"],
  [/\bblend\b/gi, "licuar"],
  [/\bfloat\b/gi, "hacer flotar"],
  [/\bmix\b/gi, "mezclar"],
  [/\badd\b/gi, "añadir"],
  [/\bserve\b/gi, "servir"],
  [/\bgarnish\b/gi, "decorar"],
];

/**
 * Traduce el nombre de un ingrediente al español usando el diccionario local.
 * Si no encuentra coincidencia exacta, intenta una búsqueda parcial por inclusión.
 * Como último recurso, devuelve el nombre original con la primera letra en mayúscula.
 */
export function translateIngredient(name: string): string {
  if (!name) return "";
  const clean = name.toLowerCase().trim();
  
  // Búsqueda de coincidencia exacta en el diccionario
  if (INGREDIENT_DICT[clean]) {
    return INGREDIENT_DICT[clean];
  }

  // Búsqueda por inclusión parcial (ej: "fresh lime juice" → coincide con "lime juice")
  for (const [eng, esp] of Object.entries(INGREDIENT_DICT)) {
    if (clean.includes(eng) && eng.length > 4) {
      // Reemplaza la parte del ingrediente conocido y capitaliza cada palabra del resultado
      return clean.replace(eng, esp).split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
  }

  // Si no se encontró ninguna coincidencia, devolver el nombre original con mayúscula inicial
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Traduce el nombre de una categoría de cóctel al español.
 * Si no existe en el diccionario, devuelve la cadena original sin modificar.
 */
export function translateCategory(cat: string): string {
  if (!cat) return "Sin Categoría";
  const clean = cat.toLowerCase().trim();
  return CATEGORY_DICT[clean] || cat;
}

/**
 * Traduce el nombre del tipo de copa o vaso al español.
 * Si no existe en el diccionario, devuelve el nombre original sin modificar.
 */
export function translateGlass(glass: string): string {
  if (!glass) return "Vaso Estándar";
  const clean = glass.toLowerCase().trim();
  return GLASS_DICT[clean] || glass;
}

/**
 * Traduce la etiqueta del tipo de contenido alcohólico al español.
 * Normaliza el texto (minúsculas, reemplaza espacios por guión bajo) antes de buscar en el diccionario.
 */
export function translateAlcoholicType(type: string): string {
  if (!type) return "Desconocido";
  const clean = type.toLowerCase().trim().replace(" ", "_");
  return ALCOHOL_DICT[clean] || ALCOHOL_DICT[type.toLowerCase().trim()] || type;
}

/**
 * Traductor de instrucciones de preparación basado en expresiones regulares.
 * Se usa como respaldo cuando la API no provee instrucciones en español (strInstructionsES).
 * Recorre la lista PHRASE_TRANSLATIONS aplicando cada reemplazo sobre el texto de entrada.
 */
export function translateInstructions(text: string): string {
  if (!text) return "No hay instrucciones disponibles.";
  
  let translated = text;
  for (const [regex, replacement] of PHRASE_TRANSLATIONS) {
    translated = translated.replace(regex, replacement);
  }
  
  return translated;
}
