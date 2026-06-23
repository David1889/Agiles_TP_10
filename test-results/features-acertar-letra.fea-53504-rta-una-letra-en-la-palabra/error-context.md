# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: features\acertar-letra.feature.spec.js >> Acertar letra >> El jugador acierta una letra en la palabra
- Location: .features-gen\features\acertar-letra.feature.spec.js:6:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('textbox')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: _ _ _ _
  - generic [ref=e5]: "6"
```

# Test source

```ts
  1  | import { createBdd } from "playwright-bdd";
  2  | 
  3  | const { When } = createBdd();
  4  | 
  5  | When("el jugador adivina la letra {string}", async ({ page }, letra: string) => {
  6  |   const input = page.getByRole("textbox");
> 7  |   await input.fill(letra);
     |               ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  8  |   await input.press("Enter");
  9  | });
  10 | 
```