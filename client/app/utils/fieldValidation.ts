export function isValidEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

export function isValidUsername(username: string): boolean {
  const re = /^[a-zA-Z0-9_-]{3,20}$/;
  return re.test(username);
}

export function isValidYearOfGraduation(yearOfGraduation: number): boolean {
  return yearOfGraduation >= 2023 && yearOfGraduation <= 2033;
}
