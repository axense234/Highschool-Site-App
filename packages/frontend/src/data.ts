// Types
import { sidebarLink } from "types";
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
