import { useState } from "react"
import { RegistroForm } from "./components/RegistroForm"
import { ThemeToggle } from "./components/ThemeToggle"
import type { RegistroValues } from "./lib/schemas"

const RESUMEN: [label: string, key: keyof RegistroValues][] = [
  ["Nombre", "nombre"],
  ["Apellido", "apellido"],
  ["Documento", "documento"],
  ["Email", "email"],
  ["Edad", "edad"],
  ["Actividad", "actividad"],
  ["Nivel de estudio", "nivelEstudio"],
]

export default function App() {
  const [registro, setRegistro] = useState<RegistroValues | null>(null)

  return (
    <main>
      <ThemeToggle />
      <section className="card wide">
        {registro ? (
          <div className="welcome">
            <div className="check" aria-hidden="true">✓</div>
            <h1>¡Registro exitoso!</h1>
            <p>Estos son los datos que enviaste</p>
            <dl className="summary">
              {RESUMEN.map(([label, key]) => (
                <div key={key}>
                  <dt>{label}</dt>
                  <dd>{String(registro[key])}</dd>
                </div>
              ))}
              <div>
                <dt>Novedades</dt>
                <dd>{registro.publicidad.length ? registro.publicidad.join(", ") : "Ninguna"}</dd>
              </div>
            </dl>
            <button className="primary" onClick={() => setRegistro(null)}>Registrar otra persona</button>
          </div>
        ) : (
          <>
            <header>
              <h1>Formulario de registro</h1>
              <p>Completá tus datos para crear tu cuenta</p>
            </header>
            <RegistroForm onSuccess={setRegistro} />
          </>
        )}
      </section>
      <footer className="credit">
        Demo · hecho por <a href="https://github.com/GianMozzi" target="_blank" rel="noreferrer">Gianni Mozzi</a>
      </footer>
    </main>
  )
}
