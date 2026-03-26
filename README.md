# Text Processing API

API REST con Node.js y Express para procesar y manipular cadenas de texto.

## Demo

API desplegada en Railway — no requiere instalación para probarla:

🔗 **Swagger UI:** https://nerds-ai-prueba-production.up.railway.app/docs

Desde ahí puedes probar ambos endpoints directamente en el navegador con el botón **"Try it out"**.

![swagger](https://github.com/user-attachments/assets/45d0761d-339a-482e-ae59-ad5d9b53a974)



## Requisitos previos
- Node.js v18+
- npm

## Instalación y uso
```bash
git clone https://github.com/diegouaq20/nerds-ai-prueba.git
cd nerds-ai-prueba
npm install
node index.js
```

Servidor disponible en `http://localhost:3000`

## Endpoints

### `POST /text/process`
Invierte el contenido de paréntesis de adentro hacia afuera, devolviendo cada paso.
```json
// Request
{ "text": "(Hola (Mundo))" }

// Response
{ "result": ["(Hola (Mundo))", "(Hola odnuM)", "Mundo aloH"] }
```

### `POST /text/transform`
Aplica tres transformaciones al texto: capitalización alternada, reemplazo de vocales y detección de palabras únicas.

> **Nota sobre reemplazo de vocales:** Se implementa estrictamente la regla `a→e, e→i, i→o, o→u, u→a`.
> El ejemplo del enunciado original presenta inconsistencias respecto a esta regla.
```json
// Request
{ "text": "Hello world! This is a test. Hello again." }

// Response
{
  "alternating_caps": "HeLlO WoRlD! tHiS Is a tEsT. hElLo aGaIn.",
  "vowel_replacement": "Hillu wurld! Thos os e tist. Hillu egeon.",
  "unique_words": ["world", "This", "is", "a", "test", "again"]
}
```
## Documentación

La API cuenta con documentación interactiva generada con Swagger.  
Una vez iniciado el servidor, visita `http://localhost:3000/docs` para explorar y probar los endpoints desde el navegador.
