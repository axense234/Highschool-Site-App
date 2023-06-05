/* eslint-disable no-undef */
// Types
import {
  AboutTechnologyType,
  CategorieType,
  DocumentOrLaw,
  EmailFormTemplate,
  facilityImageType,
  facilityRoomType,
  infoSectionType,
  IstoricPinPoint,
  MaterieType,
  offeringItemType,
  OverlayType,
  profileOption,
  sidebarLink,
  templateAnnouncement,
  templateTeacher,
  templateUser,
} from "types";
// React Icons
import { AiFillHome } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { MdAnnouncement, MdContactSupport, MdPeople } from "react-icons/md";
import { CgProfile, CgFacebook } from "react-icons/cg";
import { FaHistory, FaSchool } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { TbOlympics } from "react-icons/tb";
import { BiLogIn } from "react-icons/bi";
import { IoSchoolSharp } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi2";
// Prisma Types
import { Anunt, CategorieAnunt, Profesor, Utilizator } from "@prisma/client";

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
    timePeriod: "2023",
    content:
      "Liceul Teoretic Ion Barbu Pitesti continuă să se mențină în topul instituțiilor de învățământ din Pitești și se angajează să ofere o educație de calitate, pregătind elevii pentru provocările viitorului.",
  },
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

export const defaultEmailFormTemplate: EmailFormTemplate = {
  emailAddress: "",
  message: "",
  sender: "",
  subject: "",
};

export const defaultTemplateProfile: templateUser = {
  email: "",
  password: "PAROLA",
  rolUtilizator: "ADMIN",
};

export const defaultOverlay: OverlayType = {
  overlayFunctionUsed: "logout",
  showOverlay: false,
};

export const defaultTemplateAnnouncement: templateAnnouncement = {
  descriere: "",
  imagineUrl: "",
  pozitionareVideoInAnunt: "final",
  titlu: "",
  videoUrl: "",
  id: "",
  categorie: "GENERAL",
  actualizatLa: new Date(),
  creatLa: new Date(),
};

export const defaultTemplateTeacher: templateTeacher = {
  descriere: "",
  id: "",
  imagineProfilUrl: null,
  profesorDe: "SPORT",
  username: "",
};

export const materii: MaterieType[] = [
  { id: 1, nume: "BIOLOGIE" },
  { id: 2, nume: "CHIMIE" },
  { id: 3, nume: "DESEN" },
  { id: 4, nume: "ENGLEZA" },
  { id: 5, nume: "FIZICA" },
  { id: 6, nume: "FRANCEZA" },
  { id: 7, nume: "GEOGRAFIE" },
  { id: 8, nume: "GERMANA" },
  { id: 9, nume: "INFORMATICA" },
  { id: 10, nume: "INFORMATICA_OPTIONAL" },
  { id: 11, nume: "ISTORIE" },
  { id: 12, nume: "LATINA" },
  { id: 13, nume: "MATEMATICA" },
  { id: 14, nume: "MUZICA" },
  { id: 15, nume: "PSIHOLOGIE" },
  { id: 16, nume: "RELIGIE" },
  { id: 17, nume: "ROMANA" },
  { id: 18, nume: "SPORT" },
];

export const categoriiAnunturi: CategorieType[] = [
  { id: 1, nume: "GENERAL" },
  { id: 2, nume: "ELEVI" },
  { id: 3, nume: "PROFESORI" },
  { id: 4, nume: "SPECIAL" },
];

export const defaultProfile: Utilizator = {
  email: "",
  password: "",
  rolUtilizator: "ADMIN",
  username: "",
  utilizator_uid: "",
};

export const profileOptions: profileOption[] = [
  { id: 1, label: "Setări Profil", content: "settings" },
  { id: 2, label: "Ieși din Cont", content: "logout" },
  { id: 3, label: "Creează Anunț", content: "createAnnouncement" },
  { id: 4, label: "Creează Profesor", content: "createTeacher" },
];

export const sidebarPageLinks: sidebarLink[] = [
  { id: 1, label: "Acasă", dest: "/home", logoUrl: AiFillHome({}) },
  { id: 2, label: "Anunțuri", dest: "/anunturi", logoUrl: MdAnnouncement({}) },
  { id: 3, label: "Contact", dest: "/contact", logoUrl: MdContactSupport({}) },
  {
    id: 4,
    label: "Oferta educațională",
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
  { id: 9, label: "Intră în cont", dest: "/login", logoUrl: BiLogIn({}) },
  { id: 10, label: "Profil", dest: "/profil", logoUrl: CgProfile({}) },
];

export const sidebarSocialMediaLinks: sidebarLink[] = [
  {
    id: 1,
    label: "Facebook",
    dest: "https://web.facebook.com/LiceulTeoreticIonBarbu/?locale=ro_RO&_rdc=1&_rdr",
    logoUrl: CgFacebook({}),
  },
  {
    id: 2,
    label: "Site Original",
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
    dest: "https://infoeducatie.ro/",
    logoUrl: TbOlympics({}),
  },
];

export const infoSections: infoSectionType[] = [
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

export const facilityImages: facilityImageType[] = [
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

export const facilityRooms: facilityRoomType[] = [
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

export const offeringsList: offeringItemType[] = [
  {
    id: 1,
    desc: "Suntem Academie CISCO.",
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677318772/Highschool%20Site%20App/cisco_m3obd3.png",
    title: "CISCO",
  },
  {
    id: 2,
    desc: "Suntem Academie ORACLE.",
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677331057/Highschool%20Site%20App/oracle_rva8ki.webp",
    title: "ORACLE",
  },
  {
    id: 3,
    desc: "Oferim acces la platforma OFFICE 365.",
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677330994/Highschool%20Site%20App/Office-365_o5eghb.webp",
    title: "OFFICE365",
  },
  {
    id: 4,
    desc: "Utilizăm platforma G-Suite for education.",
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677330927/Highschool%20Site%20App/g-suite-icon-35_bgahox.webp",
    title: "G-SUITE",
  },
];

export const AUTO_SLIDER_DELAY = 2000; // 2 seconds
export const AUTO_SLIDER_RESTART = 4000; // 2 seconds
export const AUTO_SLIDER_FREQUENCY = 3000; // 3 seconds

export const templateAnnouncements: Anunt[] = [
  {
    anunt_uid: "blah",
    id: "blah",
    descriere:
      "Soarele apune încet peste orizont, aruncând o strălucire portocalie caldă pe cer. O adiere blândă foșnea printre frunzele copacilor, creând o melodie liniștitoare care umplea aerul. Mirosul de iarbă proaspătă și florile înflorite s-au amestecat, creând o aromă dulce care a persistat în nări. În depărtare, păsările ciripeau și cântau, adăugând atmosfera liniștită a momentului. Pe măsură ce noaptea se apropia, lumea din jur părea să încetinească și să respire adânc, pregătindu-se pentru calmul care avea să învăluie totul în curând.",
    titlu: "Anunț 1",
    imagineUrl: "https://picsum.photos/500/500.jpg",
    pozitionareVideoInAnunt: "inceput",
    actualizatLa: new Date(),
    creatLa: new Date(),
    categorie: "GENERAL",
    videoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677488168/Highschool%20Site%20App/giphy_ajg10l.webp",
  },

  {
    anunt_uid: "blah blah",
    id: "blah blah",
    descriere:
      "Soarele apune încet peste orizont, aruncând o strălucire portocalie caldă pe cer. O adiere blândă foșnea printre frunzele copacilor, creând o melodie liniștitoare care umplea aerul. Mirosul de iarbă proaspătă și florile înflorite s-au amestecat, creând o aromă dulce care a persistat în nări. În depărtare, păsările ciripeau și cântau, adăugând atmosfera liniștită a momentului. Pe măsură ce noaptea se apropia, lumea din jur părea să încetinească și să respire adânc, pregătindu-se pentru calmul care avea să învăluie totul în curând.",
    titlu: "Anunț 2",
    imagineUrl: "https://picsum.photos/500/500.jpg",
    pozitionareVideoInAnunt: "inceput",
    actualizatLa: new Date(),
    creatLa: new Date(),
    categorie: "GENERAL",
    videoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677488168/Highschool%20Site%20App/giphy_ajg10l.webp",
  },
  {
    anunt_uid: "blah blah blah",
    id: "blah blah blah",
    descriere:
      "Soarele apune încet peste orizont, aruncând o strălucire portocalie caldă pe cer. O adiere blândă foșnea printre frunzele copacilor, creând o melodie liniștitoare care umplea aerul. Mirosul de iarbă proaspătă și florile înflorite s-au amestecat, creând o aromă dulce care a persistat în nări. În depărtare, păsările ciripeau și cântau, adăugând atmosfera liniștită a momentului. Pe măsură ce noaptea se apropia, lumea din jur părea să încetinească și să respire adânc, pregătindu-se pentru calmul care avea să învăluie totul în curând.",
    titlu: "Anunț 3",
    imagineUrl: "https://picsum.photos/500/500.jpg",
    pozitionareVideoInAnunt: "final",
    actualizatLa: new Date(),
    creatLa: new Date(),
    categorie: "GENERAL",
    videoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677488168/Highschool%20Site%20App/giphy_ajg10l.webp",
  },
  {
    anunt_uid: "blah blah blah blah",
    id: "blah blah blah blah",
    descriere:
      "Soarele apune încet peste orizont, aruncând o strălucire portocalie caldă pe cer. O adiere blândă foșnea printre frunzele copacilor, creând o melodie liniștitoare care umplea aerul. Mirosul de iarbă proaspătă și florile înflorite s-au amestecat, creând o aromă dulce care a persistat în nări. În depărtare, păsările ciripeau și cântau, adăugând atmosfera liniștită a momentului. Pe măsură ce noaptea se apropia, lumea din jur părea să încetinească și să respire adânc, pregătindu-se pentru calmul care avea să învăluie totul în curând.",
    titlu: "Anunț 4",
    imagineUrl: "https://picsum.photos/500/500.jpg",
    pozitionareVideoInAnunt: "final",
    actualizatLa: new Date(),
    creatLa: new Date(),
    categorie: "GENERAL",
    videoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677488168/Highschool%20Site%20App/giphy_ajg10l.webp",
  },
  {
    anunt_uid: "blah blah blah blah blah",
    id: "blah blah blah blah blah",
    descriere:
      "Soarele apune încet peste orizont, aruncând o strălucire portocalie caldă pe cer. O adiere blândă foșnea printre frunzele copacilor, creând o melodie liniștitoare care umplea aerul. Mirosul de iarbă proaspătă și florile înflorite s-au amestecat, creând o aromă dulce care a persistat în nări. În depărtare, păsările ciripeau și cântau, adăugând atmosfera liniștită a momentului. Pe măsură ce noaptea se apropia, lumea din jur părea să încetinească și să respire adânc, pregătindu-se pentru calmul care avea să învăluie totul în curând.",
    titlu: "Anunț 5",
    imagineUrl: "https://picsum.photos/500/500.jpg",
    pozitionareVideoInAnunt: "inceput",
    actualizatLa: new Date(),
    creatLa: new Date(),
    categorie: "GENERAL",
    videoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677488168/Highschool%20Site%20App/giphy_ajg10l.webp",
  },
];

export const templateTeachers: Profesor[] = [
  {
    profesor_uid: "prof",
    id: "prof",
    username: "Elena Popescu",
    descriere: "Sunt profesoară de Engleză!",
    profesorDe: "ENGLEZA",
    imagineProfilUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  },
  {
    profesor_uid: "prof prof",
    id: "prof prof",
    username: "Andrei Ionescu",
    descriere: "Sunt profesor de Informatică!",
    profesorDe: "INFORMATICA",
    imagineProfilUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  },
  {
    profesor_uid: "prof prof prof",
    id: "prof prof prof",
    username: "Maria Dragomir",
    descriere: "Sunt profesoară de Latină!",
    profesorDe: "LATINA",
    imagineProfilUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  },
  {
    profesor_uid: "prof prof prof prof",
    id: "prof prof prof prof",
    username: "Alexandru Vladescu",
    descriere: "Sunt profesor de Istorie!",
    profesorDe: "ISTORIE",
    imagineProfilUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  },
  {
    profesor_uid: "prof prof prof prof prof",
    id: "prof prof prof prof prof",
    username: "Ana Stoica",
    descriere: "Sunt profesoară de Geografie!",
    profesorDe: "GEOGRAFIE",
    imagineProfilUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  },
];
