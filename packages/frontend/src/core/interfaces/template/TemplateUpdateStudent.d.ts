import TemplateStudent from "./TemplateStudent";

interface TemplateUpdateStudent extends Partial<TemplateStudent> {
  passwordVer: string;
}

export default TemplateUpdateStudent;
