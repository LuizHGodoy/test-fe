export const validarEmail = (email: string) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

export const validarCpfCnpj = (cpfCnpj: string) => {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  return cpfRegex.test(cpfCnpj) || cnpjRegex.test(cpfCnpj);
};

export const isValidCEP = (cep: string) => {
  const cepPattern = /^\d{8}$/; // Regex para CEP com 8 dígitos
  return cepPattern.test(cep);
};
