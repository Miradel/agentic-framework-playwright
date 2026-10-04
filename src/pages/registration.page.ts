import { Page, Locator } from '@playwright/test';

/**
 * RegistrationPage - Page Object Model for the registration form page
 * Encapsulates all interactions with the registration form without assertions
 *
 * @remarks
 * Follows .clinerules/page-object-model.md and .clinerules/locator-rules.md
 */
export class RegistrationPage {
  readonly page: Page;

  // -----------------------------------------------------------------
  // Locators – using highest-priority selector strategy per locator rules
  // -----------------------------------------------------------------

  // Form inputs (accessibility selectors first, with fallbacks)
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly departmentSelect: Locator;
  readonly jobTitleSelect: Locator;

  // Radio buttons for gender
  readonly maleRadio: Locator;
  readonly femaleRadio: Locator;
  readonly otherRadio: Locator;

  // Checkboxes for programming languages
  readonly cppCheckbox: Locator;
  readonly javaCheckbox: Locator;
  readonly javascriptCheckbox: Locator;

  // Submit button
  readonly signUpButton: Locator;

  // Confirmation page elements
  readonly confirmationAlert: Locator;
  readonly confirmationHeading: Locator;
  readonly confirmationText: Locator;

  constructor(page: Page) {
    this.page = page;

    // -----------------------------------------------------------------
    // Form inputs
    // -----------------------------------------------------------------
    this.firstNameInput = page
      .getByRole('textbox', { name: 'first name' })
      .or(page.locator('input[name="firstname"]'));

    this.lastNameInput = page
      .getByRole('textbox', { name: 'last name' })
      .or(page.locator('input[name="lastname"]'));

    this.usernameInput = page
      .getByRole('textbox', { name: 'username' })
      .or(page.locator('input[name="username"]'));

    this.emailInput = page
      .getByRole('textbox', { name: 'email@email.com' })
      .or(page.locator('input[name="email"]'));

    this.passwordInput = page
      .locator('input[name="password"]')
      .or(page.locator('input[type="password"]'));

    this.phoneNumberInput = page
      .getByRole('textbox', { name: '571-000-0000' })
      .or(page.locator('input[name="phone"]'));

    this.dateOfBirthInput = page
      .getByRole('textbox', { name: 'MM/DD/YYYY' })
      .or(page.locator('input[name="birthday"]'));

    this.departmentSelect = page
      .locator('select[name="department"]')
      .or(page.locator('select').nth(0));

    this.jobTitleSelect = page
      .locator('select[name="job_title"]')
      .or(page.locator('select').nth(1));

    // -----------------------------------------------------------------
    // Gender radio buttons
    // -----------------------------------------------------------------
    this.maleRadio = page.getByRole('radio', { name: 'Male', exact: true });
    this.femaleRadio = page.getByRole('radio', { name: 'Female', exact: true });
    this.otherRadio = page.getByRole('radio', { name: 'Other', exact: true });

    // -----------------------------------------------------------------
    // Programming language checkboxes
    // -----------------------------------------------------------------
    this.cppCheckbox = page.getByRole('checkbox', { name: 'C++' });
    this.javaCheckbox = page.getByRole('checkbox', { name: 'Java' });
    this.javascriptCheckbox = page.getByRole('checkbox', { name: 'JavaScript' });

    // -----------------------------------------------------------------
    // Submit button
    // -----------------------------------------------------------------
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });

    // -----------------------------------------------------------------
    // Confirmation page elements
    // -----------------------------------------------------------------
    this.confirmationAlert = page.locator('[role="alert"]');
    this.confirmationHeading = page.getByRole('heading', { name: 'Well done!' });
    this.confirmationText = page.getByText("You've successfully completed registration!");
  }

  /**
   * Navigate to the registration form page
   */
  async goto(): Promise<void> {
    await this.page.goto('https://the-internet-5chk.onrender.com/registration_form', {
      waitUntil: 'networkidle',
    });
  }

  /**
   * Fill the first name input field
   * @param firstName - The first name to enter
   */
  async fillFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  /**
   * Fill the last name input field
   * @param lastName - The last name to enter
   */
  async fillLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  /**
   * Fill the username input field
   * @param username - The username to enter
   */
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Fill the email address input field
   * @param email - The email address to enter
   */
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /**
   * Fill the password input field
   * @param password - The password to enter
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Fill the phone number input field
   * @param phoneNumber - The phone number to enter
   */
  async fillPhoneNumber(phoneNumber: string): Promise<void> {
    await this.phoneNumberInput.fill(phoneNumber);
  }

  /**
   * Fill the date of birth input field
   * @param dateOfBirth - The date of birth in MM/DD/YYYY format
   */
  async fillDateOfBirth(dateOfBirth: string): Promise<void> {
    await this.dateOfBirthInput.fill(dateOfBirth);
  }

  /**
   * Select a department/office from the dropdown
   * @param department - The department/office name
   */
  async selectDepartment(department: string): Promise<void> {
    await this.departmentSelect.selectOption({ label: department });
  }

  /**
   * Select a job title from the dropdown
   * @param jobTitle - The job title
   */
  async selectJobTitle(jobTitle: string): Promise<void> {
    await this.jobTitleSelect.selectOption({ label: jobTitle });
  }

  /**
   * Select a gender radio button
   * @param gender - The gender to select ('Male', 'Female', or 'Other')
   */
  async selectGender(gender: string): Promise<void> {
    switch (gender.toLowerCase()) {
      case 'male':
        await this.maleRadio.check();
        break;
      case 'female':
        await this.femaleRadio.check();
        break;
      case 'other':
        await this.otherRadio.check();
        break;
      default:
        throw new Error(`Unknown gender: ${gender}`);
    }
  }

  /**
   * Select a programming language checkbox
   * @param language - The programming language to select ('C++', 'Java', or 'JavaScript')
   */
  async selectProgrammingLanguage(language: string): Promise<void> {
    switch (language) {
      case 'C++':
        await this.cppCheckbox.check();
        break;
      case 'Java':
        await this.javaCheckbox.check();
        break;
      case 'JavaScript':
        await this.javascriptCheckbox.check();
        break;
      default:
        throw new Error(`Unknown programming language: ${language}`);
    }
  }

  /**
   * Click the Sign up button to submit the form
   */
  async clickSignUp(): Promise<void> {
    await this.signUpButton.click();
    // Wait for navigation to the confirmation page
    await this.page.waitForURL('**/registration_confirmation', { timeout: 10_000 }).catch(() => {
      // If navigation doesn't complete, the test will fail on verification
    });
  }

  /**
   * Fill the entire registration form with the provided data
   * @param data - Registration data object
   */
  async fillRegistrationForm(data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    gender: string;
    dateOfBirth: string;
    department: string;
    jobTitle: string;
    programmingLanguage: string;
  }): Promise<void> {
    await this.fillFirstName(data.firstName);
    await this.fillLastName(data.lastName);
    await this.fillUsername(data.username);
    await this.fillEmail(data.email);
    await this.fillPassword(data.password);
    await this.fillPhoneNumber(data.phoneNumber);
    await this.selectGender(data.gender);
    await this.fillDateOfBirth(data.dateOfBirth);
    await this.selectDepartment(data.department);
    await this.selectJobTitle(data.jobTitle);
    await this.selectProgrammingLanguage(data.programmingLanguage);
  }

  /**
   * Check if the registration confirmation alert is visible
   */
  async isConfirmationVisible(): Promise<boolean> {
    return await this.confirmationAlert.isVisible().catch(() => false);
  }

  /**
   * Get the confirmation text from the confirmation page
   */
  async getConfirmationText(): Promise<string> {
    try {
      return (await this.confirmationText.textContent()) || '';
    } catch {
      return '';
    }
  }

  /**
   * Check if the confirmation heading is visible
   */
  async isConfirmationHeadingVisible(): Promise<boolean> {
    return await this.confirmationHeading.isVisible().catch(() => false);
  }

  /**
   * Get the current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
