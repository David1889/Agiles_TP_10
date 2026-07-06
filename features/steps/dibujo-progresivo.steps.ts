import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { When, Then } = createBdd();

// Letras que no están en "GATO", la palabra fijada por el escenario.
const LETRAS_QUE_FALLAN = "BCDEFH";

When("el jugador falla {int} letras", async ({ page }, cantidad: number) => {
  const input = page.getByRole("textbox");
  for (const letra of LETRAS_QUE_FALLAN.slice(0, cantidad)) {
    await input.fill(letra);
    await input.press("Enter");
  }
});

Then("se ven las partes {string} del muñeco", async ({ page }, partes: string) => {
  const esperadas = partes.split(",").map((parte) => parte.trim());
  for (const parte of esperadas) {
    await expect(page.getByTestId(`parte-${parte}`)).toBeVisible();
  }
  await expect(page.locator("[data-testid^=parte-]")).toHaveCount(esperadas.length);
});
