import TemplateStudent from "./TemplateStudent";

interface TemplateUpdateStudent extends Partial<TemplateStudent> {
  passwordVer: string;
  subscription?: string;
}

export default TemplateUpdateStudent;
