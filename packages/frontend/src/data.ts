// Types
import {
  AnnouncementItemType,
  facilityImageType,
  facilityRoomType,
  infoSectionType,
  offeringItemType,
  sidebarLink,
} from "types";
// React Icons
import { AiFillHome } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { MdAnnouncement, MdPeople } from "react-icons/md";
import { CgProfile, CgFacebook } from "react-icons/cg";
import { FaSchool } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { TbOlympics } from "react-icons/tb";

export const sidebarPageLinks: sidebarLink[] = [
  { id: 1, label: "Acasa", dest: "/home", logoUrl: AiFillHome({}) },
  { id: 2, label: "Despre Proiect", dest: "/", logoUrl: FcAbout({}) },
  { id: 3, label: "Anunturi", dest: "/anunturi", logoUrl: MdAnnouncement({}) },
  { id: 4, label: "Profesori", dest: "/profesori", logoUrl: MdPeople({}) },
  { id: 5, label: "Profil", dest: "/profil", logoUrl: CgProfile({}) },
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

export const templateAnnouncements: AnnouncementItemType[] = [
  {
    anunt_uid: "blah",
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
    descriere:
      "The sun slowly set over the horizon, casting a warm orange glow across the sky. A gentle breeze rustled through the leaves of the trees, creating a soothing melody that filled the air. The scent of fresh grass and blooming flowers mixed together, creating a sweet aroma that lingered in the nostrils. In the distance, birds chirped and sang, adding to the peaceful ambiance of the moment. As the night approached, the world around seemed to slow down and take a deep breath, preparing for the calm that would soon envelop everything.",
    titlu: "Anunt 5",
    imagineUrl: "https://picsum.photos/500/500.jpg",
    pozitionareVideoInAnunt: "inceput",
    videoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1677488168/Highschool%20Site%20App/giphy_ajg10l.webp",
  },
];
