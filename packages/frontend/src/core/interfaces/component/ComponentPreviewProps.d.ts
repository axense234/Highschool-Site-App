import TemplateStudent from "../template/TemplateStudent";
import TemplateTeacher from "../template/TemplateTeacher";

interface ComponentPreviewProps {
  component: TemplateTeacher | TemplateStudent;
  type: "teacher" | "student";
}

export default ComponentPreviewProps;
