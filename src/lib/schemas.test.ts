import { describe, expect, it } from "vitest"
import { registroSchema, type RegistroValues } from "./schemas"

const valido: RegistroValues = {
  nombre: "Gianni",
  apellido: "Mozzi",
  documento: "12.345.678",
  email: "gianni@ejemplo.com",
  edad: 21,
  actividad: "Programación",
  nivelEstudio: "Universitario incompleto",
  aceptoTerminos: true,
  publicidad: [],
}

const camposConError = (datos: unknown) => {
  const r = registroSchema.safeParse(datos)
  return r.success ? [] : r.error.issues.map((i) => i.path[0])
}

describe("registroSchema", () => {
  it("acepta un registro válido", () => {
    expect(registroSchema.safeParse(valido).success).toBe(true)
  })

  it("acepta DNI con o sin puntos", () => {
    expect(registroSchema.safeParse({ ...valido, documento: "12345678" }).success).toBe(true)
    expect(registroSchema.safeParse({ ...valido, documento: "1.234.567" }).success).toBe(true)
  })

  it("rechaza documentos inválidos", () => {
    expect(camposConError({ ...valido, documento: "abc123" })).toContain("documento")
    expect(camposConError({ ...valido, documento: "123" })).toContain("documento")
  })

  it("rechaza menores de 18 y edades vacías (NaN)", () => {
    expect(camposConError({ ...valido, edad: 17 })).toContain("edad")
    expect(camposConError({ ...valido, edad: NaN })).toContain("edad")
  })

  it("rechaza emails mal formados", () => {
    expect(camposConError({ ...valido, email: "a@b" })).toContain("email")
  })

  it("exige elegir actividad y nivel de estudio", () => {
    const campos = camposConError({ ...valido, actividad: "", nivelEstudio: "" })
    expect(campos).toEqual(expect.arrayContaining(["actividad", "nivelEstudio"]))
  })

  it("exige aceptar los términos", () => {
    expect(camposConError({ ...valido, aceptoTerminos: false })).toEqual(["aceptoTerminos"])
  })

  it("no permite números en el nombre", () => {
    expect(camposConError({ ...valido, nombre: "Gian123" })).toContain("nombre")
  })
})
