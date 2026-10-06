# Registration Form Test Suite

## Overview

This test suite provides comprehensive coverage for the user registration form on `https://the-internet-5chk.onrender.com/registration_form`. It follows the **Page Object Model (POM)** pattern with Playwright and Cucumber BDD framework.

## Target Application

- **Registration Form URL:** `https://the-internet-5chk.onrender.com/registration_form`
- **Confirmation Page URL:** `https://the-internet-5chk.onrender.com/registration_confirmation`

## Valid Registration Data

| Field                 | Value                        |
| --------------------- | ---------------------------- |
| First Name            | `John`                       |
| Last Name             | `Doe`                        |
| Username              | `johndoe`                    |
| Email                 | `john.doe@example.com`       |
| Password              | `SecurePass123!`             |
| Phone Number          | `571-555-1234`               |
| Gender                | `Male`                       |
| Date of Birth         | `01/15/1990`                 |
| Department            | `Department of Engineering`  |
| Job Title             | `SDET`                       |
| Programming Language  | `JavaScript`                 |

## File Structure

```
tests/
├── registration-form.feature     # Gherkin feature file with scenarios
└── REGISTRATION_TEST_SUITE.md    # This documentation file

src/
├── pages/
│   └── registration.page.ts      # Page Object Model for registration form
├── steps/
│   └── registration.steps.ts     # Step definitions for registration scenarios
├── tests/
│   └── registration.test.ts      # Playwright spec for registration form
└── fixtures/
    └── registration-test-data.ts # Test data and fixtures
```

## Scenarios Overview

### Positive Test Cases (Happy Path)

1. **User successfully registers with valid information** `@positive @critical`
   - Fills the entire registration form with valid data
   - Submits the form and verifies the confirmation page
   - Asserts the `Well done!` heading and success message are visible
   - Verifies redirect to the registration confirmation page

### Feature Tags

- **Feature Level:** `@registration @smoke @regression`
- **Scenario Level:** `@positive @critical`

## Playwright Spec Coverage

### `src/tests/registration.test.ts`

1. **Fill registration form and submit**
   - Navigates to the registration form page
   - Fills all 11 form fields using `fillRegistrationForm(VALID_REGISTRATION_DATA)`
   - Clicks the Sign up button
   - Verifies the confirmation heading (`Well done!`) is visible
   - Verifies the confirmation text is visible

This single spec runs against **all three browser projects** configured in `playwright.config.ts`:

- **Chromium** (Desktop Chrome)
- **Firefox** (Desktop Firefox)
- **WebKit** (Desktop Safari)

## Page Object Model (RegistrationPage)

### Key Locators

- **First Name Input:** `getByRole('textbox', { name: 'first name' })` with fallback `input[name="firstname"]`
- **Last Name Input:** `getByRole('textbox', { name: 'last name' })` with fallback `input[name="lastname"]`
- **Username Input:** `getByRole('textbox', { name: 'username' })` with fallback `input[name="username"]`
- **Email Input:** `getByRole('textbox', { name: 'email@email.com' })` with fallback `input[name="email"]`
- **Password Input:** `input[name="password"]` with fallback `input[type="password"]`
- **Phone Number Input:** `getByRole('textbox', { name: '571-000-0000' })` with fallback `input[name="phone"]`
- **Date of Birth Input:** `getByRole('textbox', { name: 'MM/DD/YYYY' })` with fallback `input[name="birthday"]`
- **Department Select:** `select[name="department"]` with fallback to first `select`
- **Job Title Select:** `select[name="job_title"]` with fallback to second `select`
- **Gender Radio Buttons:** `getByRole('radio', { name: 'Male' | 'Female' | 'Other', exact: true })`
- **Programming Language Checkboxes:** `getByRole('checkbox', { name: 'C++' | 'Java' | 'JavaScript' })`
- **Sign Up Button:** `getByRole('button', { name: 'Sign up' })`
- **Confirmation Alert:** `[role="alert"]`
- **Confirmation Heading:** `getByRole('heading', { name: 'Well done!' })`
- **Confirmation Text:** `getByText("You've successfully completed registration!")`

All locators use the **highest-priority selector strategy** per `.clinerules/locator-rules.md`, with resilient `.or()` fallback chains.

### Key Methods

#### Navigation

- `goto()` - Navigate to the registration form page (`waitUntil: 'networkidle'`)
- `getCurrentUrl()` - Get current page URL

#### Input Actions

- `fillFirstName(firstName)` - Fill first name field
- `fillLastName(lastName)` - Fill last name field
- `fillUsername(username)` - Fill username field
- `fillEmail(email)` - Fill email address field
- `fillPassword(password)` - Fill password field
- `fillPhoneNumber(phoneNumber)` - Fill phone number field
- `fillDateOfBirth(dateOfBirth)` - Fill date of birth in `MM/DD/YYYY` format
- `selectDepartment(department)` - Select department from dropdown
- `selectJobTitle(jobTitle)` - Select job title from dropdown
- `selectGender(gender)` - Select gender radio button (`Male`, `Female`, or `Other`)
- `selectProgrammingLanguage(language)` - Select language checkbox (`C++`, `Java`, or `JavaScript`)
- `clickSignUp()` - Click Sign up button and wait for confirmation navigation
- `fillRegistrationForm(data)` - Fill the entire registration form in one call

#### Validations (without assertions - returns state)

- `isConfirmationVisible()` - Check confirmation alert visibility
- `isConfirmationHeadingVisible()` - Check heading visibility
- `getConfirmationText()` - Get confirmation text content
- `getCurrentUrl()` - Get current URL for redirect verification

## Step Definitions

### Setup/Teardown

- **Before Hook:** Launches Chromium browser, creates context/page, and initializes `RegistrationPage` instance
- **After Hook:** Closes context and browser after each scenario

### Given Steps

- `the user is on the registration form page` - Navigate and verify Sign up button is visible

### When Steps

- `the user fills the first name with {string}` - Fill first name field
- `the user fills the last name with {string}` - Fill last name field
- `the user fills the username with {string}` - Fill username field
- `the user fills the email address with {string}` - Fill email field
- `the user fills the password with {string}` - Fill password field
- `the user fills the phone number with {string}` - Fill phone number field
- `the user selects the gender {string}` - Select gender radio button
- `the user fills the date of birth with {string}` - Fill date of birth field
- `the user selects the department {string}` - Select department from dropdown
- `the user selects the job title {string}` - Select job title from dropdown
- `the user selects the programming language {string}` - Select language checkbox
- `the user clicks the Sign up button` - Submit the registration form

### Then Steps

- `the user should see a successful registration confirmation` - Verify heading and success message
- `the user should be redirected to the registration confirmation page` - Verify URL contains `registration_confirmation`

## Test Data Fixtures

### Interface

```typescript
export interface RegistrationData {
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
}
```

### Valid Registration Data

```typescript
export const VALID_REGISTRATION_DATA: RegistrationData = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  password: 'SecurePass123!',
  phoneNumber: '571-555-1234',
  gender: 'Male',
  dateOfBirth: '01/15/1990',
  department: 'Department of Engineering',
  jobTitle: 'SDET',
  programmingLanguage: 'JavaScript',
};
```

### Available Options

- **Gender:** `['Male', 'Female', 'Other']`
- **Departments:** 9 options (`Department of Engineering`, `Department of Agriculture`, `Accounting Office`, `Tresurer's Office`, `MPDC`, `MCTC`, `MCR`, `Mayor's Office`, `Tourism Office`)
- **Job Titles:** 8 options (`Designer`, `Manager`, `Developer`, `SDET`, `QA`, `Scrum Master`, `Product Owner`, `Project Manager`)
- **Programming Languages:** `['C++', 'Java', 'JavaScript']`

### Test Cases

The `REGISTRATION_TEST_CASES` array contains a predefined test case covering valid registration with all fields filled.

## Running the Tests

### Run the Playwright spec (all browsers)

```bash
npm run test -- src/tests/registration.test.ts
```

### Run the Playwright spec on a single browser

```bash
npx playwright test src/tests/registration.test.ts --project=Chromium
npx playwright test src/tests/registration.test.ts --project=Firefox
npx playwright test src/tests/registration.test.ts --project=WebKit
```

### Run the Cucumber feature

```bash
npx cucumber-js tests/registration-form.feature --require src/steps/registration.steps.ts --require-module ts-node/register
```

### Run specific tags

```bash
npx cucumber-js tests/registration-form.feature --require src/steps/registration.steps.ts --require-module ts-node/register --tags "@positive"
npx cucumber-js tests/registration-form.feature --require src/steps/registration.steps.ts --require-module ts-node/register --tags "@critical"
npx cucumber-js tests/registration-form.feature --require src/steps/registration.steps.ts --require-module ts-node/register --tags "@smoke"
```

### Run with reporting

```bash
npm run test:report -- src/tests/registration.test.ts
npm run allure:serve
```

## Test Coverage

| Category           | Count | Coverage                                 |
| ------------------ | ----- | ---------------------------------------- |
| Positive Scenarios | 1     | Successful end-to-end registration flow  |
| Cross-Browser      | 3     | Chromium, Firefox, WebKit                |
| **Total (spec)**   | **3** | **Comprehensive**                        |

## Best Practices Applied

✅ **Page Object Model (POM)** - All UI interactions encapsulated in RegistrationPage  
✅ **No Assertions in POM** - Only getter methods returning state  
✅ **Accessibility-First Selectors** - Using `getByRole()`, `getByLabel()`, `getByText()`  
✅ **Resilient Locators** - `.or()` fallback chains for selectors across UI variations  
✅ **Thin Step Definitions** - Delegates to POM methods  
✅ **BDD Format** - Business-focused Gherkin scenarios  
✅ **Test Data Separation** - Fixtures in separate file  
✅ **Error Handling** - Graceful catch on confirmation navigation wait  
✅ **Reusable Methods** - `fillRegistrationForm()` aggregates all field actions  
✅ **Auto-waiting** - Playwright's auto-waiting, no explicit `waitForTimeout`  
✅ **Networkidle Navigation** - `waitUntil: 'networkidle'` for full page load  

## Coding Standards Compliance

- **TypeScript:** Strict mode enabled, explicit typing
- **Naming:** PascalCase for classes, camelCase for methods
- **Documentation:** JSDoc comments for all public methods
- **Code Style:** Consistent formatting with Prettier

## Notes

- Tests use Chromium, Firefox, and WebKit browsers by default
- Networkidle waiting for page loads
- Sign up click gracefully handles both immediate and delayed confirmation navigation
- Confirmation page validation uses role-based and text-based assertions
- Extensible for additional scenarios, options, and data-driven tests

## Future Enhancements

- [ ] Add negative test scenarios (invalid email, short password, required fields)
- [ ] Add field-level validation checks for each input
- [ ] Add duplicate username/email handling
- [ ] Add password strength verification
- [ ] Add data-driven scenarios using Gherkin Examples tables
- [ ] Add multi-language registration testing
- [ ] Add visual regression testing
- [ ] Add accessibility (a11y) automated testing
- [ ] Add API integration tests for registration
- [ ] Add performance benchmarking for form submission