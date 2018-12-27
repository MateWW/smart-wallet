export const validationErrorMessages = {
    required: (name: string = 'This Field') => `${name} is required`,
    email: () => 'Email should look like example@mail.com',
    alreadyUsed: name => `This ${name} is already used`,
    password: () =>
        'Password must have at least 8 signs and contain least 1 uppercase lowercase, special character and number',
};
