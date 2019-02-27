export const validationErrorMessages = {
    required: (name: string = 'This Field') => `${name} is required`,
    email: () => 'Email should look like example@mail.com',
    alreadyUsed: name => `This ${name} is already used`,
    minLength: (name, length) => `${name} must have least ${length} signs`,
    password: () => 'Password must contain least 1 uppercase lowercase, special character and number',
    invalidLoginOrPassword: () => 'Email or password are incorrect',
};
