import bcrypt from 'bcryptjs';

const saltRounds: number = 10;

// Função para criptografar a senha
export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword: string = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Função para comparar a senha fornecida com a senha criptografada
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isMatch: boolean = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};