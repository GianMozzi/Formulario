import type { RegistroValues } from "./schemas"

/** Simula el POST a una API. Reemplazar por fetch() cuando exista el backend. */
export async function enviarRegistro(datos: RegistroValues): Promise<RegistroValues> {
  await new Promise((r) => setTimeout(r, 800))
  return datos
}
