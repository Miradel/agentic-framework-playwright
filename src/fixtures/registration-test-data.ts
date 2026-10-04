/**
 * Registration Test Data Fixtures
 * Contains test data for registration form scenarios
 */

/**
 * Interface for valid registration form data
 */
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

/**
 * Valid registration data for a successful sign-up scenario
 */
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

/**
 * Collection of registration test cases
 */
export const REGISTRATION_TEST_CASES: Array<{
  data: RegistrationData;
  description: string;
}> = [
  {
    data: VALID_REGISTRATION_DATA,
    description: 'Valid registration with all fields filled',
  },
];

/**
 * Available gender options on the registration form
 */
export const GENDER_OPTIONS = ['Male', 'Female', 'Other'] as const;

/**
 * Available department/office options on the registration form
 */
export const DEPARTMENT_OPTIONS = [
  'Department of Engineering',
  'Department of Agriculture',
  "Accounting Office",
  "Tresurer's Office",
  'MPDC',
  'MCTC',
  'MCR',
  "Mayor's Office",
  'Tourism Office',
] as const;

/**
 * Available job title options on the registration form
 */
export const JOB_TITLE_OPTIONS = [
  'Designer',
  'Manager',
  'Developer',
  'SDET',
  'QA',
  'Scrum Master',
  'Product Owner',
  'Project Manager',
] as const;

/**
 * Available programming language options on the registration form
 */
export const PROGRAMMING_LANGUAGE_OPTIONS = ['C++', 'Java', 'JavaScript'] as const;