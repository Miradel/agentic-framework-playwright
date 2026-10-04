import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registration.page';
import { VALID_REGISTRATION_DATA } from '../fixtures/registration-test-data';

test.describe('Registration form', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
  });

  test('Fill registration form and submit', async () => {
    // Fill the form with valid data
    await registrationPage.fillRegistrationForm(VALID_REGISTRATION_DATA);

    // Submit
    await registrationPage.clickSignUp();

    // Verify confirmation heading is visible
    await expect(registrationPage.confirmationHeading).toBeVisible();
    await expect(registrationPage.confirmationText).toBeVisible();
  });
});
