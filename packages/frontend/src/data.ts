/* eslint-disable no-undef */
// Types
import {
  AboutTechnologyType,
  facilityImageType,
  facilityRoomType,
  infoSectionType,
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
import { MdAnnouncement, MdPeople } from "react-icons/md";
import { CgProfile, CgFacebook } from "react-icons/cg";
import { FaSchool } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { TbOlympics } from "react-icons/tb";
import { BiLogIn } from "react-icons/bi";
// Prisma Types
import { Anunt, Profesor, Utilizator } from "@prisma/client";

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

export const defaultProfile: Utilizator = {
  email: "",
  password: "",
  rolUtilizator: "ADMIN",
  username: "",
  utilizator_uid: "",
};

export const profileOptions: profileOption[] = [
  { id: 1, label: "Setari Profil", content: "settings" },
  { id: 2, label: "Iesi din Cont", content: "logout" },
  { id: 3, label: "Creeaza un Anunt", content: "createAnnouncement" },
  { id: 4, label: "Creeaza un Profesor", content: "createTeacher" },
];

export const sidebarPageLinks: sidebarLink[] = [
  { id: 1, label: "Acasa", dest: "/home", logoUrl: AiFillHome({}) },
  { id: 2, label: "Despre Proiect", dest: "/", logoUrl: FcAbout({}) },
  { id: 3, label: "Anunturi", dest: "/anunturi", logoUrl: MdAnnouncement({}) },
  { id: 4, label: "Profesori", dest: "/profesori", logoUrl: MdPeople({}) },
  { id: 5, label: "Intra in cont", dest: "/login", logoUrl: BiLogIn({}) },
  { id: 6, label: "Profil", dest: "/profil", logoUrl: CgProfile({}) },
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
    dest: "https://cnodobescu.ro/2023/02/16/concursul-regional-cultural-artistic-scoala-intre-viziune-si-misiune/",
    logoUrl: TbOlympics({}),
  },
];

export const infoSections: infoSectionType[] = [
  {
    id: 1,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677315508/Highschool%20Site%20App/pregatire.png",
    desc: "Prestigiul liceului este demonstrat atat de numarul foarte mare de absolventi ai clasei a VIII-a care doresc sã urmeze cursurile acestui liceu, precum si de absolventii care au promovat in procent de aproape 90% examenele de bacalaureat.",
    title: "Pregatire",
  },
  {
    id: 2,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677315525/Highschool%20Site%20App/infiintare.png",
    desc: 'Liceul Teoretic "Vasile Barbu" a fost infiintat la 1 septembrie 1971 sub denumirea de "Liceul real-umanist nr. 4" Pitesti. Particularitatea acestui liceu, in raport cu celelalte licee din judet, a constat in predarea intensiva a limbii germane, motiv pentru care liceul a devenit cunoscut (neoficial) sub numele de Liceul German.',
    title: "Infiintare",
  },
  {
    id: 3,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677315534/Highschool%20Site%20App/transformare.png",
    desc: 'In septembrie 1977, cand toate liceele din Romania au fost transformate in licee industriale, Liceul German a devenit Liceul Industrial Nr. 5 Pitesti, fiind dat in patronatul Intreprinderii de Micromotoare Pitesti. In anul scolar 1990-1991, Liceul Industrial Nr. 5 a redevenit liceu teoretic primind, un an mai tarziu, numele actual – Liceul Teoretic "Vasile Barbu" Pitesti.',
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
    title: "Prima Clasa Renovata",
  },
  {
    id: 2,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677316599/Highschool%20Site%20App/fac2_q1eyam.jpg",
    title: "A Doua Clasa Renovata",
  },
  {
    id: 3,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677316599/Highschool%20Site%20App/fac3_szle8n.jpg",
    title: "A Treia Clasa Renovata",
  },
  {
    id: 4,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677316599/Highschool%20Site%20App/fac4_bcnwpg.jpg",
    title: "A Patra Clasa Renovata",
  },
  {
    id: 5,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677316599/Highschool%20Site%20App/fac5_lu9ace.jpg",
    title: "A Cincea Clasa Renovata",
  },
  {
    id: 6,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677316599/Highschool%20Site%20App/fac6_b20wqj.jpg",
    title: "A Sasea Clasa Renovata",
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
      "The sun slowly set over the horizon, casting a warm orange glow across the sky. A gentle breeze rustled through the leaves of the trees, creating a soothing melody that filled the air. The scent of fresh grass and blooming flowers mixed together, creating a sweet aroma that lingered in the nostrils. In the distance, birds chirped and sang, adding to the peaceful ambiance of the moment. As the night approached, the world around seemed to slow down and take a deep breath, preparing for the calm that would soon envelop everything.",
    titlu: "Anunt 1",
    imagineUrl: "https://picsum.photos/500/500.jpg",
    pozitionareVideoInAnunt: "inceput",
    videoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677488168/Highschool%20Site%20App/giphy_ajg10l.webp",
  },
  {
    anunt_uid: "blah blah",
    id: "blah blah",
    descriere:
      "The sun slowly set over the horizon, casting a warm orange glow across the sky. A gentle breeze rustled through the leaves of the trees, creating a soothing melody that filled the air. The scent of fresh grass and blooming flowers mixed together, creating a sweet aroma that lingered in the nostrils. In the distance, birds chirped and sang, adding to the peaceful ambiance of the moment. As the night approached, the world around seemed to slow down and take a deep breath, preparing for the calm that would soon envelop everything.",
    titlu: "Anunt 2",
    imagineUrl: "https://picsum.photos/500/500.jpg",
    pozitionareVideoInAnunt: "inceput",
    videoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677488168/Highschool%20Site%20App/giphy_ajg10l.webp",
  },
  {
    anunt_uid: "blah blah blah",
    id: "blah blah blah",
    descriere:
      "The sun slowly set over the horizon, casting a warm orange glow across the sky. A gentle breeze rustled through the leaves of the trees, creating a soothing melody that filled the air. The scent of fresh grass and blooming flowers mixed together, creating a sweet aroma that lingered in the nostrils. In the distance, birds chirped and sang, adding to the peaceful ambiance of the moment. As the night approached, the world around seemed to slow down and take a deep breath, preparing for the calm that would soon envelop everything.",
    titlu: "Anunt 3",
    imagineUrl: "https://picsum.photos/500/500.jpg",
    pozitionareVideoInAnunt: "final",
    videoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677488168/Highschool%20Site%20App/giphy_ajg10l.webp",
  },
  {
    anunt_uid: "blah blah blah blah",
    id: "blah blah blah blah",
    descriere:
      "The sun slowly set over the horizon, casting a warm orange glow across the sky. A gentle breeze rustled through the leaves of the trees, creating a soothing melody that filled the air. The scent of fresh grass and blooming flowers mixed together, creating a sweet aroma that lingered in the nostrils. In the distance, birds chirped and sang, adding to the peaceful ambiance of the moment. As the night approached, the world around seemed to slow down and take a deep breath, preparing for the calm that would soon envelop everything.",
    titlu: "Anunt 4",
    imagineUrl: "https://picsum.photos/500/500.jpg",
    pozitionareVideoInAnunt: "final",
    videoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677488168/Highschool%20Site%20App/giphy_ajg10l.webp",
  },
  {
    anunt_uid: "blah blah blah blah blah",
    id: "blah blah blah blah blah",
    descriere:
      "The sun slowly set over the horizon, casting a warm orange glow across the sky. A gentle breeze rustled through the leaves of the trees, creating a soothing melody that filled the air. The scent of fresh grass and blooming flowers mixed together, creating a sweet aroma that lingered in the nostrils. In the distance, birds chirped and sang, adding to the peaceful ambiance of the moment. As the night approached, the world around seemed to slow down and take a deep breath, preparing for the calm that would soon envelop everything.",
    titlu: "Anunt 5",
    imagineUrl: "https://picsum.photos/500/500.jpg",
    pozitionareVideoInAnunt: "inceput",
    videoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677488168/Highschool%20Site%20App/giphy_ajg10l.webp",
  },
];

export const templateTeachers: Profesor[] = [
  {
    profesor_uid: "prof",
    id: "prof",
    username: "Elena Popescu",
    descriere: "Sunt profesoara de Engleza!",
    profesorDe: "ENGLEZA",
    imagineProfilUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  },
  {
    profesor_uid: "prof prof",
    id: "prof prof",
    username: "Andrei Ionescu",
    descriere: "Sunt profesor de Informatica!",
    profesorDe: "INFORMATICA",
    imagineProfilUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  },
  {
    profesor_uid: "prof prof prof",
    id: "prof prof prof",
    username: "Maria Dragomir",
    descriere: "Sunt profesoara de Latina!",
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
    descriere: "Sunt profesoara de Geografie!",
    profesorDe: "GEOGRAFIE",
    imagineProfilUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  },
];
