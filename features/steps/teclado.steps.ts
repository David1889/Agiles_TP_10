import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { When, Then } = createBdd();

When("el jugador usa el teclado en pantalla para la letra {string}", async ({ page }, letra: string) => {
  const boton = page.getByRole("button", { name: letra });
  await expect(boton).toBeVisible();
  await boton.click();
});

Then("se muestra un teclado con las letras del alfabeto", async ({ page }) => {
  const keyboard = page.getByTestId("keyboard");
  await expect(keyboard).toBeVisible();
  await expect(keyboard.getByRole("button", { name: "A" })).toBeVisible();
  await expect(keyboard.getByRole("button", { name: "Z" })).toBeVisible();
});

Then("la letra {string} está disponible", async ({ page }, letra: string) => {
  const boton = page.getByRole("button", { name: letra });
  await expect(boton).toBeEnabled();
});

Then("la letra {string} está marcada como no disponible", async ({ page }, letra: string) => {
  const boton = page.getByRole("button", { name: letra });
  await expect(boton).toBeDisabled();
});
