export const aplicarMascaraDocumento = (valor: string) => {
  valor = valor.replace(/\D/g, "");
  if (valor.length > 14) {
    valor = valor.slice(0, 14);
  }

  if (valor.length <= 11) {
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    valor = valor.replace(/\.(\d{3})(\d)/, "$1/$2");
    valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
  }

  return valor;
};

export const aplicarMascaraTelefone = (valor: string) => {
  valor = valor.replace(/\D/g, "");

  if (valor.length > 11) {
    valor = valor.slice(0, 11);
  }

  if (valor.length <= 10) {
    valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
    valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
  }

  return valor;
};

export const removeMascaraTelefone = (valor: string) => {
  valor = valor.replace(/\D/g, "");
  return valor;
};

export const removeMascaraDocumento = (valor: string) => {
  valor = valor.replace(/\D/g, "");
  return valor;
};

export const aplicarMascaraCep = (value: string): string => {
  const onlyNumbers = value.replace(/\D/g, "");

  if (onlyNumbers.length <= 5) {
    return onlyNumbers;
  }

  return `${onlyNumbers.slice(0, 5)}-${onlyNumbers.slice(5, 8)}`;
};

export const removeMascaraCep = (value: string): string => {
  const onlyNumbers = value.replace(/\D/g, "");

  return onlyNumbers;
};

export const aplicarMascaraDataDeNascimento = (value: string): string => {
  const onlyNumbers = value.replace(/\D/g, "");

  if (onlyNumbers.length <= 4) {
    return onlyNumbers;
  }

  return `${onlyNumbers.slice(0, 4)}-${onlyNumbers.slice(4, 6)}`;
};

export const removeMascaraDataDeNascimento = (
  value: string | undefined,
): string | undefined => {
  if (!value) return undefined;
  const onlyNumbers = value.replace(/\D/g, "");

  return onlyNumbers;
};
