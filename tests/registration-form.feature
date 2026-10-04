@registration @smoke @regression
Feature: User Registration Form
  As a new user
  I want to register on the platform
  So that I can create an account and access services

  Background:
    Given the user is on the registration form page

  @positive @critical
  Scenario: User successfully registers with valid information
    When the user fills the first name with "John"
    And the user fills the last name with "Doe"
    And the user fills the username with "johndoe"
    And the user fills the email address with "john.doe@example.com"
    And the user fills the password with "SecurePass123!"
    And the user fills the phone number with "571-555-1234"
    And the user selects the gender "Male"
    And the user fills the date of birth with "01/15/1990"
    And the user selects the department "Department of Engineering"
    And the user selects the job title "SDET"
    And the user selects the programming language "JavaScript"
    And the user clicks the Sign up button
    Then the user should see a successful registration confirmation
    And the user should be redirected to the registration confirmation page