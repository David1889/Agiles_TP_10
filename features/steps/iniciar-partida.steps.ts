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
