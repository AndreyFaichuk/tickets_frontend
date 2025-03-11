import { fireEvent, screen, waitFor } from '@testing-library/react';
import { expect, test, describe, vi, beforeEach } from 'vitest';

import { renderWithProviders } from '../../../../../tests-utils';
import { RegistrationForm } from '../RegistrationForm';
import * as registrationHooks from '../RegistrationForm.hooks';
import { SecondStepRegistrationForm } from '../components/SecondStepRegistrationForm';
import { FIELDS, REGISTRATIONS_STEPS } from '../RegistrationForm.constants';
import { FirstStepRegistrationForm } from '../components/FirstStepRegistrationForm';
import { ThirdStepRegistrationForm } from '../components/ThirdStepRegistrationForm';
import { FourthStepRegistrationForm } from '../components/FourthStepRegistrationForm';

describe('src/pages/AuthPage/components/RegistrationForm/RegistrationForm.tsx', () => {
  const handleSubmit = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('it renders', () => {
    renderWithProviders(<RegistrationForm onSubmit={handleSubmit} />);

    const rootElement = screen.getByTestId('registration-form');

    expect(rootElement).toBeInTheDocument();
  });

  test('it should throw errors if click next button with empty fields on the first step', async () => {
    renderWithProviders(<RegistrationForm onSubmit={handleSubmit} />);

    const nextButton = screen.getByTestId('form-next_button');

    fireEvent.click(nextButton);

    await waitFor(() =>
      screen.getByText('First name must consist of at least 1 character'),
    );

    await waitFor(() =>
      screen.getByText('Last name must consist of at least 1 character'),
    );

    const firstNameErrorMessages = screen.getAllByText(
      'First name must consist of at least 1 character',
    );

    const lastNameErrorMessages = screen.getAllByText(
      'Last name must consist of at least 1 character',
    );

    expect(firstNameErrorMessages.length).toBeGreaterThan(0);
    expect(lastNameErrorMessages.length).toBeGreaterThan(0);
  });

  test('it should proceed to the second step if first name and second name fields are filled correctly', async () => {
    renderWithProviders(<RegistrationForm onSubmit={handleSubmit} />);

    const firstNameElement = screen.getByTestId('form-input_firstName');
    const lastNameElement = screen.getByTestId('form-input_lastName');

    const nextButton = screen.getByTestId('form-next_button');

    fireEvent.input(firstNameElement, { target: { value: 'John' } });
    fireEvent.input(lastNameElement, { target: { value: 'Smith' } });

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByTestId('form-input_email')).toBeInTheDocument();
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

    const secondStepElement = screen.getByTestId('form-input_email');

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

    const nextButton = screen.getByTestId('form-next_button');

    const emeilInputElement = screen.getByTestId('form-input_email');

    fireEvent.input(emeilInputElement, { target: { value: 'invalid_email' } });

    fireEvent.click(nextButton);

    await waitFor(() => screen.getByText('Enter a valid email.'));

    const emailErrorMessage = screen.getAllByText('Enter a valid email.');

    expect(emailErrorMessage.length).toBeGreaterThan(0);
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
      'form-select-with-search_country',
    );

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

    const fourthStepElement = screen.getByTestId(
      'registration-form-fourth-step_root',
    );

    expect(fourthStepElement).toBeInTheDocument();
  });
});
