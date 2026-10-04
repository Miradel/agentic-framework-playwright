import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { Page, expect, chromium, Browser, BrowserContext } from '@playwright/test';
import { RegistrationPage } from '../pages/registration.page';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let registrationPage: RegistrationPage;

/**
 * Hook: Initialize browser and page before each scenario
 */
Before(async function () {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
  registrationPage = new RegistrationPage(page);
});

/**
 * Hook: Close browser and context after each scenario
 */
After(async function () {
  await context.close();
  await browser.close();
});

/**
 * Given: User is on the registration form page
 */
Given('the user is on the registration form page', async function () {
  await registrationPage.goto();
  await expect(registrationPage.signUpButton).toBeVisible();
});

/**
 * When: User fills the first name
 */
When('the user fills the first name with {string}', async function (firstName: string) {
  await registrationPage.fillFirstName(firstName);
});

/**
 * When: User fills the last name
 */
When('the user fills the last name with {string}', async function (lastName: string) {
  await registrationPage.fillLastName(lastName);
});

/**
 * When: User fills the username
 */
When('the user fills the username with {string}', async function (username: string) {
  await registrationPage.fillUsername(username);
});

/**
 * When: User fills the email address
 */
When('the user fills the email address with {string}', async function (email: string) {
  await registrationPage.fillEmail(email);
});

/**
 * When: User fills the password
 */
When('the user fills the password with {string}', async function (password: string) {
  await registrationPage.fillPassword(password);
});

/**
 * When: User fills the phone number
 */
When('the user fills the phone number with {string}', async function (phoneNumber: string) {
  await registrationPage.fillPhoneNumber(phoneNumber);
});

/**
 * When: User selects the gender
 */
When('the user selects the gender {string}', async function (gender: string) {
  await registrationPage.selectGender(gender);
});

/**
 * When: User fills the date of birth
 */
When('the user fills the date of birth with {string}', async function (dateOfBirth: string) {
  await registrationPage.fillDateOfBirth(dateOfBirth);
});

/**
 * When: User selects the department
 */
When('the user selects the department {string}', async function (department: string) {
  await registrationPage.selectDepartment(department);
});

/**
 * When: User selects the job title
 */
When('the user selects the job title {string}', async function (jobTitle: string) {
  await registrationPage.selectJobTitle(jobTitle);
});

/**
 * When: User selects the programming language
 */
When(
  'the user selects the programming language {string}',
  async function (language: string) {
    await registrationPage.selectProgrammingLanguage(language);
  },
);

/**
 * When: User clicks the Sign up button
 */
When('the user clicks the Sign up button', async function () {
  await registrationPage.clickSignUp();
});

/**
 * Then: User should see a successful registration confirmation
 */
Then('the user should see a successful registration confirmation', async function () {
  await expect(registrationPage.confirmationHeading).toBeVisible();
  await expect(registrationPage.confirmationText).toBeVisible();
});

/**
 * Then: User should be redirected to the registration confirmation page
 */
Then(
  'the user should be redirected to the registration confirmation page',
  async function () {
    const currentUrl = await registrationPage.getCurrentUrl();
    expect(currentUrl).toContain('registration_confirmation');
  },
);