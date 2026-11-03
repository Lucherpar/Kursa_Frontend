# Política de Calidad · Kursa Frontend

> **Documento obligatorio.** Ningún cambio puede integrarse en `develop` ni en `main` sin cumplir las reglas de este documento.

## 1. Propósito

Garantizar que el frontend de Kursa sea **correcto, accesible, mantenible y verificable** antes de cada integración. La calidad no es una fase final: se verifica en cada *pull request*.

## 2. Alcance

Aplica a todo el código de `src/`, la configuración del proyecto, los estilos y la documentación del repositorio.

## 3. Principios

1. **Todo cambio es verificable**: si no se puede probar, no está terminado.
2. **La automatización manda**: los criterios se comprueban con comandos reproducibles.
3. **Sin regresiones**: ningún cambio puede romper lo que ya funcionaba.
4. **Accesibilidad por defecto**: HTML semántico, foco visible y contraste adecuado.
5. **Trazabilidad**: cada cambio está vinculado a un issue y a una pull request.

## 4. Reglas obligatorias

| ID | Regla | Verificación |
| :--- | :--- | :--- |
| **R1** | **`npm run test` debe ejecutarse y pasar al 100 %** (0 fallos, 0 tests omitidos injustificadamente). | `npm run test` |
| **R2** | El proyecto debe **compilar** sin errores de TypeScript ni de Vite. | `npm run build` |
| **R3** | El **lint** no debe introducir nuevos warnings ni errores. | `npm run lint` |
| **R4** | La cobertura de código **nuevo o modificado** no puede disminuir; objetivo mínimo del **70 %** en módulos nuevos. | `npm run test:coverage` |
| **R5** | Toda entrada de formulario debe validarse con **Zod** y mostrarse los errores al usuario. | Revisión de código |
| **R6** | No se permiten **secretos** ni credenciales en el repositorio; solo `.env.example`. | Revisión + `git grep` |
| **R7** | Cada PR requiere **al menos una aprobación** de otro miembro del equipo. | GitHub |
| **R8** | Los mensajes de commit siguen **Conventional Commits**. | Historial de Git |
| **R9** | Los componentes nuevos deben ser **accesibles** (roles, labels, foco) y **responsive**. | Revisión + Lighthouse |

> **R1 y R2 son bloqueantes.** Si cualquiera falla, la PR no puede fusionarse.

## 5. Flujo de calidad

```
feature/* ──► test + build + lint en local ──► PR a develop ──► revisión ──► merge
                                                                   │
                                                          al menos 1 aprobación
```

Antes de abrir una PR, el autor debe ejecutar en local:

```bash
npm run test
npm run build
npm run lint
```

## 6. Definition of Done (DoD)

Una tarea se considera terminada cuando:

- [ ] El issue asociado está actualizado.
- [ ] `npm run test` pasa.
- [ ] `npm run build` compila sin errores.
- [ ] `npm run lint` no añade warnings.
- [ ] Se añadieron tests para la lógica nueva.
- [ ] La PR tiene al menos una aprobación.
- [ ] No se introdujeron secretos ni dependencias innecesarias.
- [ ] La interfaz es responsive y accesible.
- [ ] La documentación afectada fue actualizada.

## 7. Cómo ejecutar las comprobaciones

| Comprobación | Comando |
| :--- | :--- |
| Tests (obligatorio) | `npm run test` |
| Tests en vigilancia | `npm run test:watch` |
| Cobertura | `npm run test:coverage` |
| Compilación (obligatorio) | `npm run build` |
| Lint | `npm run lint` |

## 8. Tests actuales

| Área | Archivo | Qué cubre |
| :--- | :--- | :--- |
| Utilidades | `src/lib/utils.test.ts` | Combinación y resolución de clases Tailwind. |
| Esquemas | `src/schemas/auth.schema.test.ts` | Login y registro. |
| Esquemas | `src/schemas/course.schema.test.ts` | Validación de cursos. |
| Componentes | `src/components/ui/button.test.tsx` | Render y variantes del botón. |

## 9. Checklist de pull request

- [ ] Rama creada desde `develop` y actualizada.
- [ ] Commits con formato Conventional Commits.
- [ ] `npm run test` en verde.
- [ ] `npm run build` en verde.
- [ ] `npm run lint` sin nuevos warnings.
- [ ] Tests añadidos/actualizados.
- [ ] Sin secretos ni `console.log` de depuración.
- [ ] Descripción de la PR con contexto y capturas si aplica.

## 10. Excepciones

Cualquier excepción a estas reglas debe justificarse en la PR y ser aprobada por al menos **dos** miembros del equipo. Las excepciones nunca pueden saltarse **R1** ni **R6**.

## 11. Responsables

El **Scrum Master** vela por el cumplimiento de esta política y el **Product Owner** prioriza la deuda técnica cuando impida cumplirla.
