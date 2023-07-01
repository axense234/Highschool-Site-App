import { Subjects } from "@prisma/client";

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
