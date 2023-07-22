import TemplateTeacher from "./TemplateTeacher";

interface TemplateUpdateTeacher extends Partial<TemplateTeacher> {
  passwordVer: string;
}

export default TemplateUpdateTeacher;
