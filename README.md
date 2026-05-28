# Otaingenio Lab — Rediseño Premium e Interactivo

Esta es la versión rediseñada de la plataforma **Otaingenio Lab**, convertida de un Google Sites plano a una aplicación web interactiva, moderna y cinematográfica.

## Estructura del Proyecto

- `index.html`: Estructura semántica principal y metatags de SEO.
- `styles/main.css`: Sistema de diseño premium con variables calibradas (Carbono, Petróleo, Ámbar, KPI, Alerta), glows dinámicos en movimiento, glassmorphism y maqueta 3D en CSS del libro.
- `js/`: Módulos Javascript (ES6) nativos para la telemetría, el comparador, la calculadora financiera de CPOR y el simulador de reparto:
  - `app.js`: Enrutamiento y control de vistas.
  - `telemetry.js`: Gráfico de tensión SVG y tickers en tiempo real.
  - `paradigm.js`: Comparación interactiva clásica vs créditos.
  - `simulator.js`: Mini SaaS de reparto de créditos.
  - `calculator.js`: Cuadro de mandos CPOR.
  - `resources.js`: Blog editorial técnico con visor de cronometría y simulador de bajas del equipo.

## Cómo Ejecutar Localmente

No requiere de ningún paso de compilación o servidor complejo de Node.js. Simplemente haz doble clic sobre **`index.html`** directamente en tu ordenador para abrirlo y disfrutar de toda la interactividad.

## Despliegue en un Clic

Puedes arrastrar y soltar este directorio completo en [Netlify Drop](https://app.netlify.com/drop) o vincular este repositorio en [Vercel](https://vercel.com) seleccionando "Other/Static HTML" para publicarlo en internet de forma 100% gratuita y en milisegundos.
