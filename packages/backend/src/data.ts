import { Subjects } from "@prisma/client";

export const siteUrl =
  process.env.NODE_ENV === "prouduction"
    ? "https://highschool-site-app-ca.netlify.app/reset-pass"
    : `http://localhost:3000/reset-pass`;

export const resetPassEmailMessage = (
  modelType: string,
  resetPassLink: string
) => {
  return `Am primit o cerere de resetare a parolei pentru contul tău de ${modelType} din Highschool Site App. Pentru a continua procesul de resetare a parolei, te rugăm să dai click pe următorul link:
${resetPassLink}
Dacă nu ai solicitat această resetare a parolei, te rugăm să ignori acest email. Parola ta va rămâne neschimbată.
Te rugăm să reții că acest link pentru resetarea parolei este valabil timp de 2 ore. După expirarea acestui termen, va trebui să inițiezi din nou procesul de resetare a parolei.

Mulțumim,
Echipa Highschool Site App`;
};

export const defaultSubjects: Subjects[] = [
  "MATEMATICA",
  "FIZICA",
  "CHIMIE",
  "INFORMATICA",
  "INFORMATICA_OPTIONAL",
  "ROMANA",
  "ENGLEZA",
  "FRANCEZA",
  "LATINA",
  "GERMANA",
  "BIOLOGIE",
  "ISTORIE",
  "GEOGRAFIE",
  "PSIHOLOGIE",
  "MUZICA",
  "DESEN",
  "RELIGIE",
  "SPORT",
];
export const classLabelPattern = /^(9|10|11|12)[A-F]$/;
