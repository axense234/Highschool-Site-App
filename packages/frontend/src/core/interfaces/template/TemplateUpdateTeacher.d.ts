import TemplateTeacher from "./TemplateTeacher";

interface TemplateUpdateTeacher extends Partial<TemplateTeacher> {
  passwordVer: string;
  subscription?: string;
}

export default TemplateUpdateTeacher;
