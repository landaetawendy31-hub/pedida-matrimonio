# Pedida de matrimonio — Cloudflare

## Estructura
- `public/index.html` — página y formularios.
- `functions/api/create.js` — crea una propuesta y devuelve el código.
- `functions/api/respond.js` — guarda la segunda parte y devuelve el acta.
- `schema.sql` — tabla D1.
- `wrangler.toml` — configuración de ejemplo.

## Configuración
1. Crea una base D1 llamada `pedida-matrimonio`.
2. Ejecuta `schema.sql` sobre esa base.
3. Copia el ID de la base D1 a `wrangler.toml`.
4. Sube el proyecto a Cloudflare Pages/Functions o despliega el Worker/Functions con Wrangler.
5. Prueba primero creando una propuesta y luego respondiéndola con el código.

Cloudflare documenta que D1 se conecta mediante un binding y que la base queda disponible como `env.DB`. Para este proyecto el uso esperado es muy pequeño y cabe holgadamente en los límites gratuitos actuales.
