import { Absence } from "@prisma/client";

interface TemplateAbsence extends Partial<Absence> {
  reasoned: boolean;
  card_section_uid: string;
}

export default TemplateAbsence;
