import { Page, Locator } from '@playwright/test';

/**
 * Example Page Object.
 *
 * @remarks
 * Demonstrates the required structure per .clinerules/page-object-model.md.
 * Replace `<PageName>` and locators with real values.
 */
export class ExamplePage {
  readonly page: Page;

  // -----------------------------------------------------------------
  // Locators – use highest‑priority selector per .clinerules/locator-rules.md
  // -----------------------------------------------------------------
  readonly loginButton: Locator;
  // Add more locators here

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  /** Navigate to the page */
  async goto(): Promise<this> {
    await this.page.goto('/example');
    return this;
  }

  /** Perform a login action */
  async clickLogin(): Promise<this> {
    await this.loginButton.click();
    return this;
  }

  // Add additional high‑level methods here
}
