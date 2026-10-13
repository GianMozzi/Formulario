# 📝 Formulario de registro · React + TypeScript

Formulario de registro con validación en tiempo real, accesible y con modo oscuro. Es la reescritura de mi primer formulario hecho con HTML/CSS/JS vanilla.

**🔗 Demo:** https://gianmozzi.github.io/formulario/

## ✨ Features

- Validación con **Zod** + **React Hook Form** (los errores aparecen al salir del campo)
- Esquema único y tipado: el tipo `RegistroValues` se infiere del schema, sin duplicar nada
- Validaciones reales: DNI argentino (con o sin puntos), email, mayoría de edad, nombres solo con letras
- Selects, checkbox obligatorio de términos y grupo de checkboxes opcionales
- Pantalla de resumen al enviar, con botón para registrar a otra persona
- Modo claro / oscuro (respeta `prefers-color-scheme` y recuerda tu elección)
- Responsive: grilla de 2 columnas en desktop, 1 en mobile
- Accesibilidad: labels asociados, `aria-invalid`, `aria-describedby`, `role="alert"`, foco visible
- Tests con **Vitest** y CI/CD con **GitHub Actions** → GitHub Pages

## 🧱 Stack

React 19 · TypeScript · Vite · React Hook Form · Zod · Vitest · CSS moderno

## 🚀 Correr en local

```bash
npm install
npm run dev      # servidor de desarrollo
npm test         # tests
npm run build    # build de producción en /dist
```

## 🔧 Qué mejoré respecto a la versión original

| Antes | Ahora |
|---|---|
| Validación manual con `querySelectorAll` y concatenando ids | Un schema Zod declarativo y testeado |
| El email inválido **no bloqueaba** el envío | Todos los campos bloquean el envío si son inválidos |
| `id="publicidad"` duplicado y `label for="inline"` roto | Checkboxes y labels correctamente asociados |
| El documento aceptaba cualquier texto | Valida formato de DNI |
| Edad vacía se trataba como 0 | Mensaje propio para edad vacía y para menores de 18 |
| Resultado en un `alert()` | Pantalla de resumen con estados de carga |
| Sin tests ni deploy | Tests + CI/CD automático |

## 📄 Licencia

MIT
