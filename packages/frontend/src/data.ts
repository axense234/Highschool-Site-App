// Prisma
import { Teacher } from "@prisma/client";
// React Icons
import { AiFillHome, AiFillInfoCircle } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import {
  MdAnnouncement,
  MdContactSupport,
  MdEmail,
  MdPeople,
  MdWebStories,
} from "react-icons/md";
import { CgProfile, CgFacebook } from "react-icons/cg";
import { FaBookOpen, FaHistory, FaSchool } from "react-icons/fa";
import {
  BsFillPatchQuestionFill,
  BsGithub,
  BsGlobe2,
  BsInfoLg,
  BsPersonCircle,
} from "react-icons/bs";
import { TbOlympics } from "react-icons/tb";
import { BiBookBookmark, BiBookContent, BiLogIn } from "react-icons/bi";
import { IoSchoolSharp, IoPeople, IoLibrarySharp } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi2";
import { SiGoogleclassroom } from "react-icons/si";
import { GrDesktop, GrDocument, GrDocumentUser } from "react-icons/gr";
import { CiLocationOn, CiLogout } from "react-icons/ci";
import { GiStack } from "react-icons/gi";
// Types
import {
  BookmarkIconShownMapType,
  SortByOption,
  ProfileOption,
  TypeNavOption,
  SelectOptionType,
  IstoricPinPoint,
  SubjectType,
  AboutTechnologyType,
  SidebarLink,
  InfoSectionType,
  FacilityImageType,
  FacilityRoomType,
  OfferingItemType,
  IndividualPageData,
  PageData,
  BackgroundImageUrl,
} from "./core/types/constants";
import {
  OverlayType,
  GetAllQueryParams,
  BookSortingOptions,
  CategoryType,
  DocumentOrLaw,
} from "./core/types/variables";
// Templates
import TemplateAnnouncement from "./core/interfaces/template/TemplateAnnouncement";
import TemplateAbsence from "./core/interfaces/template/TemplateAbsence";
import TemplateAdmin from "./core/interfaces/template/TemplateAdmin";
import TemplateBook from "./core/interfaces/template/TemplateBook";
import TemplateBookmark from "./core/interfaces/template/TemplateBookmark";
import TemplateClass from "./core/interfaces/template/TemplateClass";
import TemplateGrade from "./core/interfaces/template/TemplateGrade";
import TemplateStudent from "./core/interfaces/template/TemplateStudent";
import TemplateTeacher from "./core/interfaces/template/TemplateTeacher";
import TemplateUser from "./core/interfaces/template/TemplateUser";
import TemplateEmailForm from "./core/interfaces/template/TemplateEmailForm";

// TEMPLATE DATA
export const defaultTemplateAbsence: TemplateAbsence = {
  card_section_uid: "",
  id: "",
  absence_uid: "",
  reasoned: false,
};

export const defaultTemplateBookmark: TemplateBookmark = {
  id: "",
  dest: "",
  label: "",
  type: "DEFAULT",
};

export const defaultTemplateBook: TemplateBook = {
  author: "",
  id: "",
  created_by_admin_uid: "",
  created_by_teacher_uid: "",
  description: "",
  pdf_file_url: "",
  pdf_file_preview_url: "",
  title: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const defaultTemplateGrade: TemplateGrade = {
  card_section_uid: "",
  id: "",
  grade_uid: "",
  value: 1,
};

export const defaultEmailFormTemplate: TemplateEmailForm = {
  emailAddress: "",
  message: "",
  sender: "",
  subject: "",
};

export const defaultTemplateAdmin: TemplateAdmin = {
  email: "",
  password: "PAROLA",
  fullname: "",
  role: "ADMIN",
  accountCode: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const defaultTemplateStudent: TemplateStudent = {
  email: "",
  password: "PAROLA",
  fullname: "",
  role: "ELEV",
  class_label: "",
  accountCode: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const defaultTemplateProfile: TemplateUser = {
  email: "",
  password: "PAROLAs",
  fullname: "",
  role: "ELEV",
};

export const defaultTemplateAnnouncement: TemplateAnnouncement = {
  description: "",
  img_url: "",
  video_pozition: "FINAL",
  title: "",
  video_url: "",
  id: "",
  category: "GENERALE",
  created_by_admin_uid: null,
  created_by_admin_name: null,
  created_by_teacher_name: null,
  created_by_teacher_uid: null,
  updatedAt: new Date(),
  createdAt: new Date(),
};

export const defaultTemplateTeacher: TemplateTeacher = {
  id: "",
  description: "",
  subject: "SPORT",
  fullname: "",
  email: "",
  master_catalogue_uid: "",
  master_class_uid: "",
  password: "PAROLA",
  master: false,
  master_class_label: "",
  classes: [],
  role: "PROFESOR",
  accountCode: "",
  profile_img_url:
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const defaultTemplateClass: TemplateClass = {
  label: "",
  id: "",
  created_by_admin_uid: "",
  public: true,
  students: [],
  teachers: [],
  master_teacher_uid: "",
  master_teacher_name: "",
  master_teacher: defaultTemplateTeacher as Teacher,
  catalogue_uid: "",
  image_url:
    "https://res.cloudinary.com/birthdayreminder/image/upload/v1686921592/Highschool%20Site%20App/IMG-20230614-WA0020_paxhx6.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const defaultProfile: TemplateUser = {
  email: "",
  password: "",
  fullname: "",
  role: "",
};

export const defaultOverlay: OverlayType = {
  overlayFunctionUsed: "logout",
  showOverlay: false,
  title: "",
};

export const bookmarkIconShownMap: BookmarkIconShownMapType[] = [
  { id: 1, dest: "/home", icon: AiFillHome({}) },
  { id: 2, dest: "/anunturi", icon: MdAnnouncement({}) },
  { id: 3, dest: "/contact", icon: MdContactSupport({}) },
  { id: 4, dest: "/oferta", icon: IoSchoolSharp({}) },
  { id: 5, dest: "/documente", icon: HiDocumentText({}) },
  { id: 6, dest: "/profesori", icon: MdPeople({}) },
  { id: 7, dest: "/istoric", icon: FaHistory({}) },
  { id: 8, dest: "/", icon: FcAbout({}) },
  { id: 9, dest: "/login", icon: BiLogIn({}) },
  { id: 10, dest: "/signup", icon: IoPeople({}) },
  { id: 11, dest: "/profil", icon: CgProfile({}) },
  { id: 12, dest: "/clase", icon: SiGoogleclassroom({}) },
  { id: 13, dest: "/biblioteca", icon: IoLibrarySharp({}) },
  { id: 14, dest: "/home#differences", icon: FaSchool({}) },
  { id: 15, dest: "/home#facilities", icon: GrDesktop({}) },
  { id: 16, dest: "/home#location", icon: CiLocationOn({}) },
  { id: 17, dest: "/home#bac", icon: GrDocumentUser({}) },
  { id: 18, dest: "/home#offerings", icon: BsGlobe2({}) },
  { id: 19, dest: "/contact#info", icon: AiFillInfoCircle({}) },
  { id: 21, dest: "/contact#email", icon: MdEmail({}) },
  { id: 22, dest: "/#aboutMe", icon: BsPersonCircle({}) },
  { id: 23, dest: "/#siteMotives", icon: BsFillPatchQuestionFill({}) },
  { id: 24, dest: "/#pagesInfo", icon: MdWebStories({}) },
  { id: 25, dest: "/#generalInfo", icon: BsInfoLg({}) },
  { id: 26, dest: "/#homePage", icon: AiFillHome({}) },
  { id: 27, dest: "/#announcementsPage", icon: MdAnnouncement({}) },
  { id: 28, dest: "/#contactPage", icon: MdContactSupport({}) },
  { id: 29, dest: "/#offerPage", icon: IoSchoolSharp({}) },
  { id: 30, dest: "/#documentsPage", icon: HiDocumentText({}) },
  { id: 31, dest: "/#teachersPage", icon: MdPeople({}) },
  { id: 32, dest: "/#historyPage", icon: FaHistory({}) },
  { id: 33, dest: "/#aboutPage", icon: FcAbout({}) },
  { id: 34, dest: "/#technologiesUsed", icon: GiStack({}) },
  {
    id: 35,
    dest: /\/documente#document-([0-9]+)/i,
    icon: GrDocument({}),
    hasRegExpDest: true,
  },
  {
    id: 36,
    dest: /\/clase\/[a-z0-9-]+#classCatalogue/i,
    icon: FaBookOpen({}),
    hasRegExpDest: true,
  },
  {
    id: 37,
    dest: /\/clase\/[a-z0-9-]+/i,
    icon: SiGoogleclassroom({}),
    hasRegExpDest: true,
  },
  {
    id: 38,
    dest: "/profil#studentCard",
    icon: BiBookContent({}),
  },
  {
    id: 39,
    dest: /\/profil\/[a-z0-9-]+\?type=student#studentCard/i,
    icon: BiBookBookmark({}),
    hasRegExpDest: true,
  },
  {
    id: 40,
    dest: /\/profil\/[a-z0-9-]+/i,
    icon: CgProfile({}),
    hasRegExpDest: true,
  },
];

export const defaultGetAllQueryParams: GetAllQueryParams = {
  query: "",
  sortByOption: "",
};

export const defaultBookSortingOptions: BookSortingOptions = {
  sortByFilter: "createdAt",
  sortByFilterValue: "asc",
  filterQuery: "author",
  filterQueryValue: "",
  hasPdfFileUrl: false,
};

export const sortByAnnouncementOptions: SortByOption[] = [
  { id: 1, label: "Titlu Anunț", value: "title" },
  { id: 2, label: "Descriere Anunț", value: "description" },
  { id: 3, label: "Anunțuri Recente", value: "createdAt" },
];

export const sortByTeacherOptions: SortByOption[] = [
  { id: 1, label: "Nume Profesor", value: "fullname" },
  { id: 2, label: "Descriere Profesor", value: "description" },
  { id: 3, label: "Materie Profesor", value: "subject" },
  { id: 4, label: "Profesori adăugați recent", value: "createdAt" },
];

export const profileOptionsAdmin: ProfileOption[] = [
  { id: 1, label: "Setări", content: "settings" },
  { id: 2, label: "Creați o Clasă", content: "createClass" },
  { id: 3, label: "Creați un Anunț", content: "createAnnouncement" },
  { id: 4, label: "Creați o Carte", content: "createBook" },
  { id: 5, label: "Ieșiți din Cont", content: "logout" },
];

export const profileOptionsAdminRead: ProfileOption[] = [
  { id: 1, label: "Neimplementat", content: "" },
];

export const profileOptionsTeacher: ProfileOption[] = [
  { id: 1, label: "Setări", content: "settings" },
  { id: 2, label: "Clasele Dumneavoastră", content: "viewTeacherClassrooms" },
  { id: 3, label: "Creați un Anunț", content: "createAnnouncement" },
  { id: 4, label: "Creați o Carte", content: "createBook" },
  { id: 5, label: "Ieșiți din Cont", content: "logout" },
];

export const profileOptionsTeacherRead: ProfileOption[] = [
  { id: 1, label: "Clasele Profesorului", content: "viewTeacherClassrooms" },
];

export const profileOptionsStudent: ProfileOption[] = [
  { id: 1, label: "Setări", content: "settings" },
  { id: 2, label: "Clasa Dumneavoastră", content: "viewStudentClassroom" },
  { id: 4, label: "Ieșiți din Cont", content: "logout" },
];

export const profileOptionsStudentRead: ProfileOption[] = [
  { id: 2, label: "Clasa Elevului", content: "viewStudentClassroom" },
];

export const announcementCategories: CategoryType[] = [
  { id: 1, name: "GENERALE", dest: "GENERALE", label: "GENERALE" },
  { id: 2, name: "ELEVI", dest: "ELEVI", label: "ELEVI" },
  { id: 3, name: "PROFESORI", dest: "PROFESORI", label: "PROFESORI" },
  { id: 4, name: "SPECIALE", dest: "SPECIALE", label: "SPECIALE" },
];

export const typeNavOptions: TypeNavOption[] = [
  {
    id: 1,
    label: "ADMIN",
    steps: [
      { id: 1, label: "PASUL 1" },
      { id: 2, label: "PASUL 2" },
    ],
  },
  {
    id: 2,
    label: "ELEV",
    steps: [
      { id: 1, label: "PASUL 1" },
      { id: 2, label: "PASUL 2" },
    ],
  },
  {
    id: 3,
    label: "PROFESOR",
    steps: [
      { id: 1, label: "PASUL 1" },
      { id: 2, label: "PASUL 2" },
    ],
  },
  { id: 4, label: "RESETARE PAROLA" },
];

export const possibleClassLabels: SelectOptionType[] = [
  {
    id: 1,
    label: "9A",
  },
  {
    id: 2,
    label: "9B",
  },
  {
    id: 3,
    label: "9C",
  },
  {
    id: 4,
    label: "9D",
  },
  {
    id: 5,
    label: "9E",
  },
  {
    id: 6,
    label: "9F",
  },
  {
    id: 7,
    label: "10A",
  },
  {
    id: 8,
    label: "10B",
  },
  {
    id: 9,
    label: "10C",
  },
  {
    id: 10,
    label: "10D",
  },
  {
    id: 11,
    label: "10E",
  },
  {
    id: 12,
    label: "10F",
  },
  {
    id: 13,
    label: "11A",
  },
  {
    id: 14,
    label: "11B",
  },
  {
    id: 15,
    label: "11C",
  },
  {
    id: 16,
    label: "11D",
  },
  {
    id: 17,
    label: "11E",
  },
  {
    id: 18,
    label: "11F",
  },
  {
    id: 19,
    label: "12A",
  },
  {
    id: 20,
    label: "12B",
  },
  {
    id: 21,
    label: "12C",
  },
  {
    id: 22,
    label: "12D",
  },
  {
    id: 23,
    label: "12E",
  },
  {
    id: 24,
    label: "12F",
  },
];

// STATIC DATA AND DATA THAT MOST LIKELY WON'T CHANGE
export const documentsAndLawsInfo: DocumentOrLaw[] = [
  {
    id: 1,
    label: "CODURI DE ETICĂ",
    pdfURLs: [
      "https://drive.google.com/file/d/12nQpQqbqyBTIFHHjcL9H24mHzyWX54-Z/preview",
      "https://drive.google.com/file/d/1sq-M3hLtYDA7IwscyuGWpEzHlurcz9UJ/preview",
    ],
  },
  {
    id: 2,
    label: "ORGANIGRAMĂ",
    pdfURLs: [
      "https://drive.google.com/file/d/1Id9F-iRRY74ZGnwS-mO71zVJ1kb6OKZK/preview",
    ],
  },
  {
    id: 3,
    label: "REGULAMENT DE ORGANIZARE ŞI FUNCŢIONARE",
    pdfURLs: [
      "https://drive.google.com/file/d/1Z8v7M0KSRYF3DbpV6S03HZ2r5yf1lCDF/preview",
    ],
  },
  {
    id: 4,
    label: "REGULAMENT INTERN Liceul Teoretic „Ion Barbu” Piteşti",
    pdfURLs: [
      "https://drive.google.com/file/d/1Z8Yud0d8iquDHI-xIKTkWiXE31cxdmGH/preview",
    ],
  },
  {
    id: 5,
    label: "BURSE PENTRU ELEVII LICEULUI",
    pdfURLs: [
      "https://drive.google.com/file/d/1WrPZg1fUlZcl5UHd-nH1XQSVKgsi1EDx/preview",
    ],
  },
  {
    id: 6,
    label:
      'ORDIN Nr. 5.034 pentru aprobarea Metodologiei de organizare a Programului national "Scoala altfel"',
    pdfURLs: [
      "https://drive.google.com/file/d/1YARkCaM4IWodJHYk7vcVUYiDxDOyPJVL/preview",
    ],
  },
];

export const classCatalogueSubjectsCountMap = [{ id: 0 }, { id: 1 }, { id: 2 }];

export const istoricPinpoints: IstoricPinPoint[] = [
  {
    id: 1,
    timePeriod: "1952",
    content:
      "Înființarea primei școli secundare de nivel gimnazial în Pitești.",
  },
  {
    id: 2,
    timePeriod: "1968",
    content: "Transformarea școlii secundare în Liceul Teoretic Ion Barbu.",
  },
  {
    id: 3,
    timePeriod: "Anii 1970",
    content:
      "Consolidarea poziției liceului ca una dintre instituțiile de învățământ de prestigiu din Pitești și județul Argeș.",
  },
  {
    id: 4,
    timePeriod: "Anii 1980",
    content:
      "Extinderea infrastructurii liceului pentru a face față cerințelor în creștere ale elevilor și profesorilor.",
  },
  {
    id: 5,
    timePeriod: "1990-2000",
    content:
      "Adaptarea curriculumului școlar la noile cerințe și schimbări educaționale din sistemul de învățământ din România.",
  },
  {
    id: 6,
    timePeriod: "Anii 2000",
    content:
      "Participarea și obținerea de rezultate remarcabile la competiții școlare și olimpiade naționale și internaționale.",
  },
  {
    id: 7,
    timePeriod: "2010-2020",
    content:
      "Modernizarea și dotarea infrastructurii liceului cu echipamente și tehnologii avansate pentru sprijinirea procesului de învățare.",
  },
  {
    id: 8,
    timePeriod: "2024",
    content:
      "Liceul Teoretic Ion Barbu Pitesti continuă să se mențină în topul instituțiilor de învățământ din Pitești și se angajează să ofere o educație de calitate, pregătind elevii pentru provocările viitorului.",
  },
];

export const subjects: SubjectType[] = [
  { id: 1, name: "MATEMATICA" },
  { id: 2, name: "FIZICA" },
  { id: 3, name: "CHIMIE" },
  { id: 4, name: "INFORMATICA" },
  { id: 5, name: "INFORMATICA_OPTIONAL" },
  { id: 6, name: "ROMANA" },
  { id: 7, name: "ENGLEZA" },
  { id: 8, name: "FRANCEZA" },
  { id: 9, name: "LATINA" },
  { id: 10, name: "GERMANA" },
  { id: 11, name: "BIOLOGIE" },
  { id: 12, name: "ISTORIE" },
  { id: 13, name: "GEOGRAFIE" },
  { id: 14, name: "PSIHOLOGIE" },
  { id: 15, name: "MUZICA" },
  { id: 16, name: "DESEN" },
  { id: 17, name: "RELIGIE" },
  { id: 18, name: "SPORT" },
];

export const aboutTechnologiesUsedFrontend: AboutTechnologyType[] = [
  {
    id: 1,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1668764486/Icons%20and%20Stuff/HTML5_badge_ag98vs.webp",
    label: "HTML",
    techUrl: "https://www.w3schools.com/html/",
  },
  {
    id: 2,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1668764497/Icons%20and%20Stuff/css-118-569410_pqbfyw.webp",
    label: "CSS",
    techUrl: "https://www.w3schools.com/css/",
  },
  {
    id: 3,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1674063331/Icons%20and%20Stuff/typescript_logo_png_kl85ny.webp",
    label: "Typescript",
    techUrl: "https://www.typescriptlang.org/",
  },
  {
    id: 4,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1668764549/Icons%20and%20Stuff/react_js_logo_icon512_b7nzgm.webp",
    label: "React",
    techUrl: "https://reactjs.org/",
  },
  {
    id: 5,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1674571442/Icons%20and%20Stuff/next-js-logo-7929BCD36F-seeklogo.com_vxm0md.webp",
    label: "NextJS",
    techUrl: "https://nextjs.org/",
  },
  {
    id: 6,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1674063415/Icons%20and%20Stuff/sass-logo-2_xkltmh.webp",
    label: "Sass",
    techUrl: "https://sass-lang.com/",
  },
  {
    id: 7,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1668764511/Icons%20and%20Stuff/redux-logo_ejnmb7.webp",
    label: "Redux Toolkit",
    techUrl: "https://redux-toolkit.js.org/",
  },
];

export const aboutTechnologiesUsedBackend: AboutTechnologyType[] = [
  {
    id: 1,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1668764542/Icons%20and%20Stuff/nodejs-logo-png--435_xz77cw.webp",
    label: "Node",
    techUrl: "https://nodejs.org/en/",
  },
  {
    id: 2,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1668764524/Icons%20and%20Stuff/express-js-icon-20_onazqf.webp",
    label: "Express",
    techUrl: "https://expressjs.com/",
  },
  {
    id: 3,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1674063331/Icons%20and%20Stuff/typescript_logo_png_kl85ny.webp",
    label: "Typescript",
    techUrl: "https://www.typescriptlang.org/",
  },
  {
    id: 4,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1674063477/Icons%20and%20Stuff/postgresql-logo-png-transparent_zxfyrt.webp",
    label: "PostgreSQL",
    techUrl: "https://www.postgresql.org/",
  },
  {
    id: 5,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1674063501/Icons%20and%20Stuff/prisma-logo-3805665B69-seeklogo.com_cj8pk8.webp",
    label: "Prisma",
    techUrl: "https://www.prisma.io/",
  },
  {
    id: 6,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1674063521/Icons%20and%20Stuff/redis-logo_i8mudb.webp",
    label: "Redis",
    techUrl: "https://redis.io/",
  },
];

export const sidebarPageLinks: SidebarLink[] = [
  { id: 1, label: "Acasă", dest: "/home", logoUrl: AiFillHome({}) },
  { id: 2, label: "Anunțuri", dest: "/anunturi", logoUrl: MdAnnouncement({}) },
  { id: 3, label: "Contact", dest: "/contact", logoUrl: MdContactSupport({}) },
  {
    id: 4,
    label: "Oferta Educațională",
    dest: "/oferta",
    logoUrl: IoSchoolSharp({}),
  },
  {
    id: 5,
    label: "Legi și Documente",
    dest: "/documente",
    logoUrl: HiDocumentText({}),
  },
  { id: 6, label: "Profesori", dest: "/profesori", logoUrl: MdPeople({}) },
  { id: 7, label: "Istoric", dest: "/istoric", logoUrl: FaHistory({}) },
  { id: 8, label: "Despre Proiect", dest: "/", logoUrl: FcAbout({}) },
  { id: 9, label: "Intră în Cont", dest: "/login", logoUrl: BiLogIn({}) },
  {
    id: 10,
    label: "Crează-ți un cont",
    dest: "/signup",
    logoUrl: IoPeople({}),
  },
  { id: 11, label: "Profil", dest: "/profil", logoUrl: CgProfile({}) },
  {
    id: 12,
    label: "Clasele Noastre",
    dest: "/clase",
    logoUrl: SiGoogleclassroom({}),
  },
  {
    id: 13,
    label: "Bibliotecă",
    dest: "/biblioteca",
    logoUrl: IoLibrarySharp({}),
  },
  {
    id: 14,
    label: "Ieșiți din Cont",
    dest: "/logout",
    logoUrl: CiLogout({}),
  },
];

export const sidebarSocialMediaLinks: SidebarLink[] = [
  {
    id: 1,
    label: "Facebook",
    dest: "https://web.facebook.com/LiceulTeoreticIonBarbu/?locale=ro_RO&_rdc=1&_rdr",
    logoUrl: CgFacebook({}),
  },
  {
    id: 2,
    label: "Site-ul liceului LTIBP",
    dest: "https://sites.google.com/ltibp.ro/licionbarbu/acasa?authuser=0",
    logoUrl: FaSchool({}),
  },
  {
    id: 3,
    label: "Cod Sursa",
    dest: "https://github.com/axense234/Highschool-Site-App",
    logoUrl: BsGithub({}),
  },
  {
    id: 4,
    label: "Concurs",
    dest: "https://cnodobescu.ro/2024/04/05/concursul-regional-de-creatie-literara-realizare-site-web-si-filme-scoala-intre-viziune-si-misiune/",
    logoUrl: TbOlympics({}),
  },
];

export const infoSections: InfoSectionType[] = [
  {
    id: 1,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677315508/Highschool%20Site%20App/pregatire.png",
    desc: "Prestigiul liceului este demonstrat atat de numarul foarte mare de absolventi ai clasei a VIII-a care doresc sã urmeze cursurile acestui liceu, precum si de absolventii care au promovat in procent de aproape 90% examenele de bacalaureat.",
    title: "Pregătire",
  },
  {
    id: 2,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677315525/Highschool%20Site%20App/infiintare.png",
    desc: 'Liceul Teoretic "Ion Barbu" a fost infiintat la 1 septembrie 1971 sub denumirea de "Liceul real-umanist nr. 4" Pitesti. Particularitatea acestui liceu, in raport cu celelalte licee din judet, a constat in predarea intensiva a limbii germane, motiv pentru care liceul a devenit cunoscut (neoficial) sub numele de Liceul German.',
    title: "Inființare",
  },
  {
    id: 3,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677315534/Highschool%20Site%20App/transformare.png",
    desc: 'In septembrie 1977, cand toate liceele din Romania au fost transformate in licee industriale, Liceul German a devenit Liceul Industrial Nr. 5 Pitesti, fiind dat in patronatul Intreprinderii de Micromotoare Pitesti. In anul scolar 1990-1991, Liceul Industrial Nr. 5 a redevenit liceu teoretic primind, un an mai tarziu, numele actual – Liceul Teoretic "Ion Barbu" Pitești.',
    title: "Transformare",
  },
  {
    id: 4,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677315668/Highschool%20Site%20App/com-locala_ubmszn.png",
    desc: "A beneficiat de-a lungul anilor de resurse generoase din partea Primăriei municipiului Piteşti, a Inspectoratului Şcolar Judeţean, care au asigurat dotarea, modernizarea, întreţinerea şi repararea bazei materiale.",
    title: "Comunitate Locala",
  },
];

export const facilityImages: FacilityImageType[] = [
  {
    id: 1,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677316598/Highschool%20Site%20App/fac1_rzomtk.jpg",
    title: "Prima Clasă Renovată",
  },
  {
    id: 2,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677316599/Highschool%20Site%20App/fac2_q1eyam.jpg",
    title: "A Doua Clasă Renovată",
  },
  {
    id: 3,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677316599/Highschool%20Site%20App/fac3_szle8n.jpg",
    title: "A Treia Clasă Renovată",
  },
  {
    id: 4,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677316599/Highschool%20Site%20App/fac4_bcnwpg.jpg",
    title: "A Patra Clasă Renovată",
  },
  {
    id: 5,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677316599/Highschool%20Site%20App/fac5_lu9ace.jpg",
    title: "A Cincea Clasă Renovată",
  },
  {
    id: 6,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677316599/Highschool%20Site%20App/fac6_b20wqj.jpg",
    title: "A Șasea Clasă Renovată",
  },
];

export const facilityRooms: FacilityRoomType[] = [
  { id: 1, desc: "4 LABORATOARE DE INFORMATICĂ" },
  { id: 2, desc: "CABINET DE LIMBA ROMANĂ" },
  { id: 3, desc: "LABORATOR DE CHIMIE" },
  { id: 4, desc: "LABORATOR DE FIZICĂ" },
  { id: 5, desc: "LABORATOR DE BIOLOGIE" },
  { id: 6, desc: "CABINET DE LIMBA GERMANĂ" },
  { id: 7, desc: "CABINET DE LIMBA ENGLEZĂ" },
  { id: 8, desc: "CABINET DE LIMBA FRANCEZĂ" },
  { id: 10, desc: "SALĂ DE SPORT ȘI FITNESS" },
  { id: 11, desc: "CABINET MEDICAL" },
  { id: 12, desc: "CABINET PSIHOPEDAGOGIC" },
  { id: 13, desc: "BIBLIOTECA ȘCOLARĂ" },
  { id: 14, desc: "Conexiune Wi-Fi în perimetrul liceului" },
];

export const offeringsList: OfferingItemType[] = [
  {
    id: 1,
    desc: "Suntem Academie CISCO.",
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677318772/Highschool%20Site%20App/cisco_m3obd3.png",
    title: "CISCO",
    dest: "https://www.netacad.com/",
  },
  {
    id: 2,
    desc: "Suntem Academie ORACLE.",
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677331057/Highschool%20Site%20App/oracle_rva8ki.webp",
    title: "ORACLE",
    dest: "https://www.oracle.com/",
  },
  {
    id: 3,
    desc: "Oferim acces la platforma OFFICE 365.",
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677330994/Highschool%20Site%20App/Office-365_o5eghb.webp",
    title: "OFFICE365",
    dest: "https://www.microsoft.com/en-us/microsoft-365",
  },
  {
    id: 4,
    desc: "Utilizăm platforma G-Suite for education.",
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677330927/Highschool%20Site%20App/g-suite-icon-35_bgahox.webp",
    title: "G-SUITE",
    dest: "https://workspace.google.com/",
  },
];

// GENERAL DATA ABOUT PAGES
export const individualPagesData: IndividualPageData[] = [
  // Home Page
  {
    id: 1000,
    recommendations: [
      {
        id: 1,
        dest: "/home/#differences",
        label: "Acasă - Ce ne diferențiază?",
      },
      {
        id: 2,
        dest: "/home/#facilities",
        label: "Acasă - Dotarea Liceului",
      },
      {
        id: 3,
        dest: "/home/#location",
        label: "Acasă - Localizarea Liceului",
      },
      {
        id: 4,
        dest: "/home/#bac",
        label: "Acasă - Promovabilitatea la Bacalaureat",
      },
      {
        id: 5,
        dest: "/home/#offerings",
        label: "Acasă - Ce oferim?",
      },
    ],
    pageDest: "/home",
    searchbarPlaceholder: "Căutați în tot site-ul și pagina Acasă:",
  },
  // Announcements Page
  {
    id: 1001,
    recommendations: (announcementCategories as PageData[]).map((cat) => {
      return {
        id: (cat.id as number) + 100,
        dest: `/anunturi/#${cat.dest}`,
        label: `Anunțuri ${cat.label}`,
      };
    }),
    pageDest: "/anunturi",
    searchbarPlaceholder: "Căutați în tot site-ul și pagina Anunțuri:",
  },
  // Contact Page
  {
    id: 1002,
    recommendations: [
      {
        id: 6,
        dest: "/contact/#info",
        label: "Contact - Informații de contact",
      },
      {
        id: 7,
        dest: "/contact/#email",
        label: "Contact - Trimite-ne un email!",
      },
    ],
    pageDest: "/contact",
    searchbarPlaceholder: "Căutați în tot site-ul și pagina Contact:",
  },
  // Education Offer Page
  {
    id: 1003,
    recommendations: [],
    pageDest: "/oferta",
    searchbarPlaceholder:
      "Căutați în tot site-ul și pagina Oferta educațională:",
  },
  // Documents Page
  {
    id: 1004,
    recommendations: (documentsAndLawsInfo as unknown as PageData[]).map(
      (doc) => {
        return {
          id: (doc.id as number) + 200,
          dest: `/documente/#${doc.label}`,
          label: doc.label,
        };
      }
    ),
    pageDest: "/documente",
    searchbarPlaceholder: "Căutați în tot site-ul și pagina Legi și Documente:",
  },
  // Teachers Page
  {
    id: 1005,
    recommendations: [],
    pageDest: "/profesori",
    searchbarPlaceholder: "Căutați în tot site-ul și pagina Profesori:",
  },
  // History Page
  {
    id: 1006,
    recommendations: [],
    pageDest: "/istoric",
    searchbarPlaceholder: "Căutați în tot site-ul și pagina Istoric:",
  },
  // !!!
  // About Project Page
  {
    id: 1007,
    recommendations: [
      {
        id: 8,
        dest: "/#aboutMe",
        label: "Despre Proiect - Cine sunt eu?",
      },
      {
        id: 9,
        dest: "/#siteMotives",
        label: "Despre Proiect - De ce am făcut acest site?",
      },
      {
        id: 10,
        dest: "/#pagesInfo",
        label: "Despre Proiect - Informații despre Paginile Site-ului",
      },
      {
        id: 11,
        dest: "/#adminInfo",
        label: "Despre Proiect - Informații despre Contul Admin",
      },
      {
        id: 12,
        dest: "/#technologiesUsed",
        label: "Despre Proiect - Tehnologiile Folosite",
      },
    ],
    pageDest: "/",
    searchbarPlaceholder: "Căutați în tot site-ul și pagina Despre Proiect:",
  },
  // Login Page
  {
    id: 1008,
    recommendations: [],
    pageDest: "/login",
    searchbarPlaceholder: "Căutați în tot site-ul și pagina Intrați în Cont:",
  },
  {
    id: 1009,
    recommendations: [],
    pageDest: "/signup",
    searchbarPlaceholder: "Căutați în tot site-ul și pagina Creați un Cont:",
  },
  // Profile Page
  {
    id: 1010,
    recommendations: [],
    pageDest: "/profil",
    searchbarPlaceholder: "Căutați în tot site-ul și pagina Profilul Tău:",
  },
  // Classrooms Page
  {
    id: 1011,
    recommendations: [],
    pageDest: "/clase",
    searchbarPlaceholder: "Căutați în tot site-ul și pagina Clasele Liceului:",
  },
  // Library Page
  {
    id: 1012,
    recommendations: [],
    pageDest: "/biblioteca",
    searchbarPlaceholder:
      "Căutați în tot site-ul și pagina Biblioteca Liceului:",
  },
];

export const pagesData: PageData[] = [
  { id: 2001, label: "Pagină - Acasă", dest: "/home" },
  { id: 2002, label: "Pagină - Anunțuri", dest: "/anunturi" },
  { id: 2003, label: "Pagină - Contact", dest: "/contact" },
  {
    id: 2004,
    label: "Pagină - Oferta educațională",
    dest: "/oferta",
  },
  {
    id: 2005,
    label: "Pagină - Legi și Documente",
    dest: "/documente",
  },
  { id: 2006, label: "Pagină - Profesori", dest: "/profesori" },
  { id: 2007, label: "Pagină - Istoric", dest: "/istoric" },
  { id: 2008, label: "Pagină - Despre Proiect", dest: "/" },
  { id: 2009, label: "Pagină - Intră în cont", dest: "/login" },
  { id: 2010, label: "Pagină - Crează-ți un cont", dest: "/signup" },
  { id: 2011, label: "Pagină - Profil", dest: "/profil" },
  { id: 2012, label: "Pagină - Clasele Liceului", dest: "/clase" },
  { id: 2013, label: "Pagină - Biblioteca Liceului", dest: "/biblioteca" },
];

export const pageTitleBackgroundImageUrls: BackgroundImageUrl[] = [
  {
    pagePath: "/home",
    backgroundUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1678691260/Highschool%20Site%20App/IMG-20230313-WA0004_e5vfrt.jpg",
  },
  {
    pagePath: "/anunturi",
    backgroundUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1686502836/Highschool%20Site%20App/IMG-20230608-WA0012_e117jz.jpg",
  },
  {
    pagePath: "/contact",
    backgroundUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1686502837/Highschool%20Site%20App/IMG-20230608-WA0021_ime128.jpg",
  },
  {
    pagePath: "/oferta",
    backgroundUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1686502836/Highschool%20Site%20App/IMG-20230608-WA0016_unzyje.jpg",
  },
  {
    pagePath: "/documente",
    backgroundUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1686502837/Highschool%20Site%20App/IMG-20230608-WA0020_xyq6ms.jpg",
  },
  {
    pagePath: "/profesori",
    backgroundUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1686921591/Highschool%20Site%20App/IMG-20230614-WA0004_mebbon.jpg",
  },
  {
    pagePath: "/istoric",
    backgroundUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1686921591/Highschool%20Site%20App/IMG-20230614-WA0003_o4bv66.jpg",
  },
  {
    pagePath: "/",
    backgroundUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1686504249/Highschool%20Site%20App/Captur%C4%83_ecran_8_rqirc7.png",
  },
  {
    pagePath: "/login",
    backgroundUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1686504535/Highschool%20Site%20App/nighthighschool_v8xnie.jpg",
  },
  {
    pagePath: "/signup",
    backgroundUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1686921592/Highschool%20Site%20App/IMG-20230614-WA0020_paxhx6.jpg",
  },
  {
    pagePath: "/profil",
    backgroundUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1686504536/Highschool%20Site%20App/nightschool2_zoolin.jpg",
  },
  {
    pagePath: "/reset-pass",
    backgroundUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1686921591/Highschool%20Site%20App/IMG-20230614-WA0015_yyesh7.jpg",
  },
  {
    pagePath: "/clase",
    backgroundUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1686731956/Highschool%20Site%20App/announcements/t7feuhxylhzzhdyrmioq.jpg",
  },
  {
    pagePath: "/biblioteca",
    backgroundUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1688815679/4907599_m6hl9p.jpg",
  },
];

// EXTRA VARIABLES
export const AUTO_SLIDER_DELAY = 2000; // 2 seconds
export const AUTO_SLIDER_RESTART = 4000; // 4 seconds
export const AUTO_SLIDER_FREQUENCY = 3000; // 3 seconds
export const classLabelPattern = /^(9|10|11|12)[A-F]$/;
export const websiteLogoUrl =
  "https://res.cloudinary.com/birthdayreminder/image/upload/v1685015242/Highschool%20Site%20App/ltibp_logo_ptonmd.png";
export const PUBLIC_VAPID_KEY =
  "BFSQhRVxQAMK_qOEeIeUIMe6dmTjB-9b2kc_UjthPs607XJHIeSz3vPHTlSl9Fc287y0cKvHilGOSeFUGrrYC68";
