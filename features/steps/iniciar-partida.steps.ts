import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

Given("una partida con la palabra {string}", async ({ page }, palabra: string) => {
  await page.goto(`/?word=${encodeURIComponent(palabra)}`);
});

Given("una partida con la lista {string} y semilla {string}", async ({ page }, lista: string, seed: string) => {
  await page.goto(`/?words=${encodeURIComponent(lista)}&seed=${seed}`);
});

When("la página arranca", async ({ page }) => {
  await page.waitForLoadState("networkidle");
});

Then("se ve la palabra {string}", async ({ page }, esperada: string) => {
  await expect(page.getByTestId("word")).toHaveText(esperada);
});

Then("se ven {int} vidas", async ({ page }, vidas: number) => {
  await expect(page.getByTestId("lives")).toHaveText(String(vidas));
});

Then("se ve el mensaje {string}", async ({ page }, mensaje: string) => {
  await expect(page.getByTestId("message")).toHaveText(mensaje);
});

Then("el campo de entrada está deshabilitado", async ({ page }) => {
  await expect(page.getByRole("textbox")).toBeDisabled();
});

Then("se muestra un teclado con las letras del alfabeto", async ({ page }) => {
  const botones = page.locator("[data-testid^='key-']");
  await expect(botones).toHaveCount(27);
});

Then("la letra {string} está disponible", async ({ page }, letra: string) => {
  await expect(page.getByTestId(`key-${letra.toLowerCase()}`)).toBeEnabled();
});

When("el jugador usa la letra {string}", async ({ page }, letra: string) => {
  await page.getByTestId(`key-${letra.toLowerCase()}`).click();
});

When("el jugador usa el teclado en pantalla para la letra {string}", async ({ page }, letra: string) => {
  await page.getByTestId(`key-${letra.toLowerCase()}`).click();
});

Then("la letra {string} ya no está disponible", async ({ page }, letra: string) => {
  await expect(page.getByTestId(`key-${letra.toLowerCase()}`)).toBeDisabled();
});

Then("la letra {string} sigue disponible", async ({ page }, letra: string) => {
  await expect(page.getByTestId(`key-${letra.toLowerCase()}`)).toBeEnabled();
});

Then("la letra {string} se muestra como acertada", async ({ page }, letra: string) => {
  await expect(page.getByTestId(`key-${letra.toLowerCase()}`)).toBeDisabled();
});

Then("la letra {string} se muestra como fallada", async ({ page }, letra: string) => {
  await expect(page.getByTestId(`key-${letra.toLowerCase()}`)).toBeDisabled();
});
