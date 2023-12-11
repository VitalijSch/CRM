const validate = (value) => {
    const errors = {};
    const namePattern = /^[A-Z][a-zA-Z]*$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isFirstNameValid = (firstName) => {
        return firstName.trim() === "" ? "Das Eingabefeld muss ausgefüllt sein" : !namePattern.test(firstName) ? "Vorname muss mit einem Großbuchstaben anfangen" : "";
    };

    const isLastNameValid = (lastName) => {
        return lastName.trim() === "" ? "Das Eingabefeld muss ausgefüllt sein" : !namePattern.test(lastName) ? "Nachname muss mit einem Großbuchstaben anfangen" : "";
    };

    const isEmailValid = (email) => {
        return email.trim() === "" ? "Das Eingabefeld muss ausgefüllt sein" : !emailPattern.test(email) ? "E-Mail beispiel: benutzername@domain.com" : "";
    };

    const isPhoneNumberValid = (phoneNumber) => {
        return phoneNumber.trim() === "" ? "Das Eingabefeld muss ausgefüllt sein" : "";
    };

    errors.firstName = isFirstNameValid(value.firstName);
    errors.lastName = isLastNameValid(value.lastName);
    errors.email = isEmailValid(value.email);
    errors.phoneNumber = isPhoneNumberValid(value.phoneNumber);

    return errors;
};

export default validate;