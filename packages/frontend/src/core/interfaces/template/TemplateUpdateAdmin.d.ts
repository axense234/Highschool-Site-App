import TemplateAdmin from "./TemplateAdmin";

interface TemplateUpdateAdmin extends Partial<TemplateAdmin> {
  passwordVer: string;
}

export default TemplateUpdateAdmin;
