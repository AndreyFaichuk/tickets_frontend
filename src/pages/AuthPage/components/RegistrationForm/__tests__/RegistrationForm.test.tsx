import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { expect, test, describe, vi, beforeEach } from 'vitest';

import { renderWithProviders } from '../../../../../tests-utils';
import { RegistrationForm } from '../RegistrationForm';
import * as registrationHooks from '../RegistrationForm.hooks';
import { SecondStepRegistrationForm } from '../components/SecondStepRegistrationForm';
import { FIELDS, REGISTRATIONS_STEPS } from '../RegistrationForm.constants';
import { FirstStepRegistrationForm } from '../components/FirstStepRegistrationForm';
import { ThirdStepRegistrationForm } from '../components/ThirdStepRegistrationForm';
import { FourthStepRegistrationForm } from '../components/FourthStepRegistrationForm';
import { LOGIN_FORM_COMPOSITE_NAMES, REGISTRATION_FORM } from '../constants';

describe('src/pages/AuthPage/components/RegistrationForm/RegistrationForm.tsx', () => {
  const handleSubmit = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const emailErrorText = 'Enter a valid email.';
  const firstNameErrorText = 'First name must consist of at least 1 character';
  const lastNameErrorText = 'Last name must consist of at least 1 character';

  test('it renders', () => {
    renderWithProviders(<RegistrationForm onSubmit={handleSubmit} />);

    const rootElement = screen.getByTestId(REGISTRATION_FORM.root);
    const submitElement = screen.getByTestId(REGISTRATION_FORM.submitButton);
    const backButtonElement = screen.queryByTestId(
      REGISTRATION_FORM.backButton,
    );

    expect(rootElement).toBeInTheDocument();
    expect(submitElement).toBeInTheDocument();
    expect(backButtonElement).not.toBeInTheDocument();
  });

  test('it should call onSubmit if all fields are filled correctly in each step', async () => {
    renderWithProviders(<RegistrationForm onSubmit={handleSubmit} />);

    const firstNameElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.firstName,
    );
    const lastNameElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.lastName,
    );

    fireEvent.input(firstNameElement, { target: { value: 'John' } });
    fireEvent.input(lastNameElement, { target: { value: 'Smith' } });

    const nextButton = screen.getByTestId(REGISTRATION_FORM.submitButton);

    await act(async () => {
      fireEvent.click(nextButton);
    });

    const emailElement = screen.getByTestId(LOGIN_FORM_COMPOSITE_NAMES.email);

    await waitFor(() => {
      expect(emailElement).toBeInTheDocument();
    });

    fireEvent.input(emailElement, { target: { value: 'example@gmail.com' } });

    await act(async () => {
      fireEvent.click(nextButton);
    });

    const selectWithSearchElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.country,
    );

    await waitFor(() => {
      expect(selectWithSearchElement).toBeInTheDocument();
    });

    fireEvent.mouseDown(selectWithSearchElement);

    const option = await screen.findByText('Ukraine');

    fireEvent.click(option);

    await act(async () => {
      fireEvent.click(nextButton);
    });

    const datePickerElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.dateOfBirth,
    );
    const rememberMeElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.isRememberMe,
    );
    const passwordElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.password,
    );
    const repeatPasswordElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.repeatPassword,
    );

    await waitFor(() => {
      expect(datePickerElement).toBeInTheDocument();
      expect(rememberMeElement).toBeInTheDocument();
      expect(passwordElement).toBeInTheDocument();
      expect(repeatPasswordElement).toBeInTheDocument();
    });

    const dateButton = await screen.findByRole('gridcell', { name: '1' });

    fireEvent.click(dateButton);

    fireEvent.input(passwordElement, {
      target: { value: '12345678' },
    });

    fireEvent.input(repeatPasswordElement, {
      target: { value: '12345678' },
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId(REGISTRATION_FORM.submitButton));
    });

    expect(handleSubmit).toHaveBeenCalledOnce();
  });

  test('it should throw errors if click next button with empty fields on the first step', async () => {
    renderWithProviders(<RegistrationForm onSubmit={handleSubmit} />);

    const nextButton = screen.getByTestId(REGISTRATION_FORM.submitButton);

    await act(async () => {
      fireEvent.click(nextButton);
    });

    await waitFor(() => {
      screen.getByText(firstNameErrorText);
      screen.getByText(lastNameErrorText);
    });

    const firstNameErrorMessages = screen.getByText(firstNameErrorText);

    const lastNameErrorMessages = screen.getByText(lastNameErrorText);

    expect(firstNameErrorMessages).toBeInTheDocument();
    expect(lastNameErrorMessages).toBeInTheDocument();
  });

  test('it should proceed to the second step if first name and second name fields are filled correctly', async () => {
    renderWithProviders(<RegistrationForm onSubmit={handleSubmit} />);

    const firstNameElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.firstName,
    );
    const lastNameElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.lastName,
    );

    const nextButton = screen.getByTestId(REGISTRATION_FORM.submitButton);

    fireEvent.input(firstNameElement, { target: { value: 'John' } });
    fireEvent.input(lastNameElement, { target: { value: 'Smith' } });

    await act(async () => {
      fireEvent.click(nextButton);
    });

    const emailElement = screen.getByTestId(LOGIN_FORM_COMPOSITE_NAMES.email);

    await waitFor(() => {
      expect(emailElement).toBeInTheDocument();
    });
  });

  test('it should render the second step directly', () => {
    vi.spyOn(
      registrationHooks,
      'useRegistrationFormManagement',
    ).mockReturnValue({
      onNext: vi.fn(),
      onBack: vi.fn(),
      steps: {
        firstStep: { render: <FirstStepRegistrationForm /> },
        secondStep: { render: <SecondStepRegistrationForm /> },
        thirdStep: { render: <ThirdStepRegistrationForm /> },
        fourthStep: { render: <FourthStepRegistrationForm /> },
      },
      currentStep: REGISTRATIONS_STEPS.secondStep,
      currentStepOptions: FIELDS[REGISTRATIONS_STEPS.secondStep],
    });

    renderWithProviders(<RegistrationForm onSubmit={handleSubmit} />);

    const secondStepElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.email,
    );

    const backButtonElement = screen.getByTestId(REGISTRATION_FORM.backButton);

    expect(backButtonElement).toBeInTheDocument();
    expect(secondStepElement).toBeInTheDocument();
  });

  test('it should throw error if click next button with invalid email on the second step', async () => {
    vi.spyOn(
      registrationHooks,
      'useRegistrationFormManagement',
    ).mockReturnValue({
      onNext: vi.fn(),
      onBack: vi.fn(),
      steps: {
        firstStep: { render: <FirstStepRegistrationForm /> },
        secondStep: { render: <SecondStepRegistrationForm /> },
        thirdStep: { render: <ThirdStepRegistrationForm /> },
        fourthStep: { render: <FourthStepRegistrationForm /> },
      },
      currentStep: REGISTRATIONS_STEPS.secondStep,
      currentStepOptions: FIELDS[REGISTRATIONS_STEPS.secondStep],
    });

    renderWithProviders(<RegistrationForm onSubmit={handleSubmit} />);

    const nextButton = screen.getByTestId(REGISTRATION_FORM.submitButton);

    const emailElement = screen.getByTestId(LOGIN_FORM_COMPOSITE_NAMES.email);

    fireEvent.input(emailElement, { target: { value: 'invalid_email' } });

    await act(async () => {
      fireEvent.click(nextButton);
    });

    await waitFor(() => screen.getByText(emailErrorText));

    const emailErrorMessage = screen.getByText(emailErrorText);

    expect(emailErrorMessage).toBeInTheDocument();
  });

  test('it should render the third step directly', async () => {
    vi.spyOn(
      registrationHooks,
      'useRegistrationFormManagement',
    ).mockReturnValue({
      onNext: vi.fn(),
      onBack: vi.fn(),
      steps: {
        firstStep: { render: <FirstStepRegistrationForm /> },
        secondStep: { render: <SecondStepRegistrationForm /> },
        thirdStep: { render: <ThirdStepRegistrationForm /> },
        fourthStep: { render: <FourthStepRegistrationForm /> },
      },
      currentStep: REGISTRATIONS_STEPS.thirdStep,
      currentStepOptions: FIELDS[REGISTRATIONS_STEPS.thirdStep],
    });

    renderWithProviders(<RegistrationForm onSubmit={handleSubmit} />);

    const selectWithSearchElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.country,
    );

    const backButtonElement = screen.getByTestId(REGISTRATION_FORM.backButton);

    expect(backButtonElement).toBeInTheDocument();
    expect(selectWithSearchElement).toBeInTheDocument();
  });

  test('it should render the fourth step directly', async () => {
    vi.spyOn(
      registrationHooks,
      'useRegistrationFormManagement',
    ).mockReturnValue({
      onNext: vi.fn(),
      onBack: vi.fn(),
      steps: {
        firstStep: { render: <FirstStepRegistrationForm /> },
        secondStep: { render: <SecondStepRegistrationForm /> },
        thirdStep: { render: <ThirdStepRegistrationForm /> },
        fourthStep: { render: <FourthStepRegistrationForm /> },
      },
      currentStep: REGISTRATIONS_STEPS.fourthStep,
      currentStepOptions: FIELDS[REGISTRATIONS_STEPS.fourthStep],
    });

    renderWithProviders(<RegistrationForm onSubmit={handleSubmit} />);

    const datePickerElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.dateOfBirth,
    );
    const rememberMeElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.isRememberMe,
    );
    const passwordElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.password,
    );
    const repeatPasswordElement = screen.getByTestId(
      LOGIN_FORM_COMPOSITE_NAMES.repeatPassword,
    );

    const backButtonElement = screen.getByTestId(REGISTRATION_FORM.backButton);

    expect(datePickerElement).toBeInTheDocument();
    expect(rememberMeElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(repeatPasswordElement).toBeInTheDocument();
    expect(backButtonElement).toBeInTheDocument();
  });
});
