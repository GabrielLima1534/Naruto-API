const translations = {
  id: "ID",
  name: "Nome",
  images: "Imagens",

  // estrutura real da API
  debut: "Estreia",
  family: "Família",
  personal: "Informações pessoais",
  natureType: "Natureza de chakra",
  rank: "Rank",
  tools: "Ferramentas",
  voiceActors: "Dubladores",

  // subcampos comuns dentro de personal
  birthdate: "Data de nascimento",
  sex: "Sexo",
  age: "Idade",
  height: "Altura",
  weight: "Peso",
  bloodType: "Tipo sanguíneo",
  clan: "Clã",
  occupation: "Ocupação",
  affiliation: "Afiliação",
  team: "Equipe",
  titles: "Títulos",

  // campos de combate
  jutsu: "Jutsus",
  jutsus: "Jutsus",
  kekkeiGenkai: "Kekkei Genkai",

  // extras que aparecem na sua API
  classification: "Classificação",
  tailedBeast: "Bijuu",
  natureTypes: "Tipos de Natureza",
};

export function translateKey(key) {
  return translations[key] || key;
}