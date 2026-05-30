<div align="center">

<br/>

<img width="1904" height="918" alt="Captura de pantalla 2026-05-29 231324" src="https://github.com/user-attachments/assets/49ec2a19-70a1-4621-b8da-010849795ffc" />


### Cocktail Explorer · Powered by TheCocktailDB API

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white&labelColor=20232a)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite&logoColor=white&labelColor=1a1a2e)](https://vitejs.dev)
[![Axios](https://img.shields.io/badge/Axios-1.x-5a29e4?style=flat-square&logo=axios&logoColor=white&labelColor=1a1a2e)](https://axios-http.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white&labelColor=0f172a)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript&logoColor=white&labelColor=1a1a2e)](https://www.typescriptlang.org)

<br/>

> *Descubre, explora y guarda las mejores recetas de cócteles del mundo.*  
> *Construido con arquitectura de componentes React, consumo de API REST con Axios y diseño premium.*

<br/>

</div>

---

## ✦ ¿Qué es DAIQ?

**DAIQ** es una aplicación web SPA (*Single Page Application*) de exploración de cócteles construida con **React + Vite**. Consume la API pública de **[TheCocktailDB](https://www.thecocktaildb.com/)** en tiempo real para mostrar recetas, ingredientes, instrucciones de preparación y un cóctel destacado del día generado aleatoriamente.

El proyecto fue desarrollado como demostración del dominio en:
- 🧩 **Arquitectura de componentes** React con separación de responsabilidades
- ⚡ **Consumo de APIs REST** de solo lectura con **Axios** dentro de `useEffect`
- 🔁 **Manejo de estados** con `useState` (datos, loading, error)
- 🗂️ **Renderizado dinámico** con `.map()` y `key` única
- 💾 **Persistencia local** de favoritos con `localStorage`

<img width="1920" height="3769" alt="screencapture-localhost-3000-2026-05-29-23_12_44" src="https://github.com/user-attachments/assets/ef06737d-5237-4a7f-a84c-833f48ce4a5e" />


---

## 🚀 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Entorno de ejecución | Node.js (LTS) |
| Herramienta de construcción | Vite 6 |
| Lenguaje | TypeScript / JSX |
| Librería principal | React 19 (Hooks + Componentes funcionales) |
| Consumo de API | Axios (peticiones HTTP GET) |
| Estilos | Tailwind CSS v4 |
| Animaciones | Motion (Framer Motion) |
| Iconos | Lucide React |

---

## 📁 Estructura del Proyecto

```
daiq/
├── src/
│   ├── components/
│   │   ├── CocktailCard.tsx      # Tarjeta visual de cada cóctel
│   │   ├── CocktailDetail.tsx    # Panel de detalle con receta completa
│   │   ├── CocktailGrid.tsx      # Grilla de tarjetas con .map()
│   │   ├── Logo.tsx              # Logo SVG de la marca
│   │   ├── Navbar.tsx            # Barra de navegación (mobile)
│   │   ├── SearchBar.tsx         # Buscador con filtros
│   │   └── Skeletons.tsx         # Estado de carga animado (shimmer)
│   ├── utils/
│   │   ├── parser.ts             # Normaliza los datos crudos de la API
│   │   └── translation.ts        # Traduce ingredientes, categorías y vasos al español
│   ├── App.tsx                   # Componente raíz: estados, Axios, lógica principal
│   ├── types.ts                  # Interfaces TypeScript globales
│   ├── main.tsx                  # Punto de entrada de la aplicación
│   └── index.css                 # Estilos globales (Tailwind)
├── index.html
├── vite.config.ts
└── package.json
```

---

## ⚙️ Instalación y Uso

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/daiq.git
cd daiq

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

> La app estará disponible en `http://localhost:3000`

---

## 🔌 API Consumida

**TheCocktailDB** — API pública y gratuita de recetas de cócteles.

| Endpoint | Descripción |
|----------|-------------|
| `GET /search.php?s=a` | Lista inicial de cócteles |
| `GET /list.php?c=list` | Categorías disponibles |
| `GET /random.php` | Cóctel aleatorio del día |
| `GET /search.php?s={query}` | Búsqueda por nombre |

Todas las peticiones son de **solo lectura (GET)**. No se modifica ningún dato en el servidor.

---

## 🧠 Arquitectura de Componentes

```
App (contenedor raíz — estados + Axios)
├── Navbar          → Props: favoriteCount, onRandomClick, onToggleFavorites
├── SearchBar       → Props: filters, onChangeFilters, availableCategories
├── CocktailGrid    → Props: cocktails[], favoriteIds, callbacks
│   └── CocktailCard × N  → Props: cocktail, isFavorite, onToggleFavorite, onSelect
├── CocktailDetail  → Props: cocktail, onClose, isFavorite, onToggleFavorite
└── SkeletonsGrid   → (sin props — estado de carga independiente)
```

El flujo de datos es **unidireccional**: `App` centraliza todos los estados y los distribuye hacia abajo mediante **props**. Los hijos comunican eventos hacia arriba mediante **callbacks**.

---

## ✨ Funcionalidades

- 🍹 **Exploración** de cócteles obtenidos desde la API en tiempo real
- 🔍 **Búsqueda inteligente** por nombre o ingrediente con debouncer de 450 ms
- 🎲 **Sugerencia aleatoria** — botón que llama al endpoint `/random.php` y abre el detalle
- ❤️ **Favoritos** persistidos en `localStorage` (sobreviven al recargar la página)
- 📋 **Detalle completo** con lista de ingredientes con tildado interactivo
- ⚗️ **Filtros** por tipo alcohólico (Con Alcohol / Sin Alcohol)
- 💀 **Skeletons animados** durante la carga inicial
- ⚠️ **Manejo de errores** con banner visual y botón de reintento
- 📱 **Diseño responsive** — sidebar en escritorio, navbar en móvil

---

## 🎓 Requisitos técnicos cumplidos

| Requisito | Implementación |
|-----------|---------------|
| ✅ Consumo con Axios dentro de `useEffect` | `loadInitialData()` + efecto de búsqueda |
| ✅ Estado de datos (`useState`) | `cocktails`, `categories`, `featuredCocktail` |
| ✅ Estado de carga (`loading`) | `SkeletonsGrid` mientras `loading === true` |
| ✅ Estado de error con `try/catch` | Banner de error + botón "Reintentar Carga" |
| ✅ Componente contenedor/padre | `App.tsx` |
| ✅ Componentes hijos reutilizables | `CocktailCard`, `CocktailGrid`, `Navbar`, etc. |
| ✅ Paso de información con Props | Todos los componentes reciben datos vía props |
| ✅ Renderizado dinámico con `.map()` | `CocktailGrid` y listas de ingredientes/tags |
| ✅ Propiedad `key` única en `.map()` | `cocktail.id`, `ing.id`, `tag` |

---

<div align="center">

**DAIQ** · 2026

*Desarrollado con la API pública de [TheCocktailDB](https://www.thecocktaildb.com/)*

</div>
