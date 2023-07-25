// React
import { FC } from "react";
// Next
import Link from "next/link";
import Image from "next/image";
// SCSS
import aboutStyles from "../scss/components/pages/About.module.scss";
// Components
import PageTitle from "@/components/home/PageTitle";
import Meta from "@/components/others/Meta";
import MarkableHeading from "@/components/others/MarkableHeading";
// Data
import {
  aboutTechnologiesUsedBackend,
  aboutTechnologiesUsedFrontend,
} from "@/data";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";

const About: FC = () => {
  useGetPathname();
  return (
    <>
      <Meta
        title='Despre Proiect | Liceul Teoretic "Ion Barbu" Pitești'
        desc="Bun venit la pagina 'Despre Mine'! Sunt Comănescu Andrei, fondatorul și creatorul acestui proiect. Ca pasionat de dezvoltare web fullstack, am creat această inițiativă pentru a-mi distruge propriile limite și a explora potențialul nelimitat al tehnologiei. Mă dedic să construiesc soluții inovatoare și să depășesc obstacolele în calea progresului. Descoperă povestea mea și viziunea mea captivantă în acest proiect plin de posibilități."
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686504249/Highschool%20Site%20App/Captur%C4%83_ecran_8_rqirc7.png",
        ]}
      />
      <main className={aboutStyles.aboutContainer}>
        <PageTitle
          title="Despre Proiect"
          quote="Tot ce ai nevoie să știi despre proiectul meu."
        />
        <section className={aboutStyles.aboutContainer__generalInfo}>
          <MarkableHeading
            textContent="Informații generale"
            type="h2"
            idUsed="generalInfo"
          />
          <div className={aboutStyles.aboutContainer__me}>
            <MarkableHeading
              textContent="1.Cine sunt eu?"
              type="h3"
              idUsed="aboutMe"
            />
            <p>
              Mă numesc Comănescu Andrei, am 17 ani, vin de la Liceul Teoretic
              Ion Barbu Pitești, studiez dezvoltarea site-urilor de vreo 2 ani.
              Sunt proficient în următoarele tehnologii: HTML, CSS, SASS,
              Javascript, Typescript, React, NextJS, Node, Express, MongoDB,
              Mongoose, PostgreSQL, Prisma, Redis, Redux, Netlify, Render,
              ElephantSQL; merg mai mult în detaliu despre tehnologiile
              respective în <a href="#technologiesUsed">ultima secțiune.</a>
            </p>
            <p>
              Folosesc&nbsp;
              <a
                href="https://github.com/axense234"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>{" "}
              pentru a-mi stoca proiectele referitoare la dezvoltarea web,
              probleme în C++, tutoriale.
            </p>
          </div>
          <div className={aboutStyles.aboutContainer__site}>
            <MarkableHeading
              textContent="2.De ce am făcut acest site?"
              type="h3"
              idUsed="siteMotives"
            />
            <p>
              Am făcut acest site pentru a-mi arăta cunoștințele referitoare la
              dezvoltarea web, în același timp antrenându-mă puțin mai mult cu
              tehnologiile: SCSS, NextJS, Redux, Typescript, deoarece aceste
              tehnologii sunt puțin mai complicate, dar merită a fi învățate,
              deoarece îmi fac viața mai ușoară și mai puțin plictisitoare.
            </p>
            <p>
              Un alt motiv pentru crearea site-ului este șansa de a câștiga un
              premiu pentru munca mea și pentru a-mi forța înțelegerea/învățarea
              mai în detaliu a tehnologiilor folosite, în condiții de timp
              limitat.
            </p>
          </div>
        </section>
        <section className={aboutStyles.aboutContainer__pagesInfo}>
          <MarkableHeading
            textContent="Informații despre Paginile Site-ului"
            type="h2"
            idUsed="pagesInfo"
          />
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <MarkableHeading
              textContent="1.Acasă"
              type="h3"
              idUsed="homePage"
              isLink
              linkHref="/home"
            />
            <p>Pagina "Acasă" este compusă din 5 secțiuni:</p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href="/home/#title">1.Titlul</Link>
                </h4>
                <p>
                  Secțiunea "Titlul" este prima secțiune din pagina "Acasă", ea
                  conținând un titlu și un subtitlu. Fundalul secțiunii este o
                  imagine a Liceului Teoretic Ion Barbu din Pitesti. Această
                  secțiune este reprezentată de un component funcțional React,
                  care primește 2 parametri: titlul și subtitlul și le afișează
                  cum se poate observa.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/home/#differences">2.Ce ne diferențiază?</Link>
                </h4>
                <p>
                  Secțiunea "Ce ne diferențiază??" este a doua secțiune din
                  pagina "Acasă", ea conținând 4 subsecțiuni, fiecare
                  subsecțiune, la rândul ei, conținând o imagine și o descriere
                  a deosebirii respective.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/home/#facilities">3.Dotarea liceului</Link>
                </h4>
                <p>
                  Secțiunea "Dotarea liceului" este a treia secțiune din pagina
                  "Acasă", ea conține un "slider" care, dacă nu este deranjat de
                  un utilizator, începe să arate diferite imagini despre
                  renovările claselor din liceu. Dacă acest "slider" este
                  întrerupt de utilizator, nu trebuie să vă faceți griji, intră
                  în modul automat după câteva secunde de liniște. Această
                  secțiune mai conține o listă cu dotările liceului, prezentate
                  rând pe rând.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/home/#location">4.Localizarea liceului</Link>
                </h4>
                <p>
                  Secțiunea "Localizarea liceului" este a patra secțiune din
                  pagina "Acasă", aceasta conține 2 subsecțiuni: Subsecțiunea
                  Google Street View si subsecțiunea Google Maps, fiecare
                  aratând locația liceului. Aceste subsecțiuni au fost
                  implementate cu ajutorul elementului "iframe" și Google.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/home/#bac">
                    5.Promovabilitatea la Bacalaureat
                  </Link>
                </h4>
                <p>
                  Secțiunea "Promovabilitatea la Bacalaureat" este a cincea
                  secțiune din pagina "Acasă", ea conținând o imagine luată de
                  pe site-ul original al Liceului Teoretic Ion Barbu Pitești,
                  care ne arată statisticile referitoare la promovabilitatea la
                  bacalaureat din liceu.
                  <br />
                  Dacă aveam acces la baza lor de date de studenți, puteam să
                  folosesc{" "}
                  <a
                    href="https://react-charts.tanstack.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    React Charts
                  </a>{" "}
                  ca să-mi construiesc propriile grafice folosing datele
                  studenților.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/home/#offerings">6.Ce oferim?</Link>
                </h4>
                <p>
                  Secțiunea "Ce oferim?" este ultima secțiune din pagina
                  "Acasă", ea conținând, foarte similar cu secțiunea "Ce ne
                  diferențiază?", 4 subsecțiuni care, la rândul lor, conțin o
                  descriere scurtă a ofertei și imaginea produsului respectiv.
                </p>
              </li>
            </ul>
          </div>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <MarkableHeading
              textContent="2.Anunțuri"
              type="h3"
              idUsed="announcementsPage"
              isLink
              linkHref="/anunturi"
            />
            <p>
              Pagina "Anunțuri" este compusă dintr-o singură secțiune care
              conține mai multe componente "Anunț", fiecare având următoarele
              funcționalități:
            </p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href="/anunturi">1.Funcția de a vedea componentul</Link>
                </h4>
                <p>
                  Funcția de a vedea componentul face referire la vizibilitatea
                  componentului "Anunț". Acesta este compus din 3 interfețe in
                  funcție de mod(normal și editare). O interfața cănd anunțul
                  este acuns, una cănd nu e ascuns și una când e in modul
                  editare.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/anunturi">2.Funcția de a edita componentul</Link>
                </h4>
                <p>
                  Funcția de a edita componentul face referire la modificarea
                  componentului "Anunț" prin apăsarea butonului verde cănd
                  mouse-ul este pe componentul respectiv. Puteți edita
                  componentul cum vreți dumneavoastră și aceste modificări pot
                  fi salvate prin apăsarea butonului verde "bifat" in colțul din
                  dreapta sus.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/anunturi">
                    3.Funcția de a șterge componentul
                  </Link>
                </h4>
                <p>
                  Funcția de a șterge componentul face referire la ștergerea
                  componentului "Anunț" prin apăsarea butonului roșu cănd
                  mouse-ul este pe componentul respectiv. Înainte ca acesta să
                  fie eliminat permanent o să apară o interfața "overlay" care,
                  după căteva secunde, vă lasă să eliminați componentul
                  respectiv.
                </p>
              </li>
            </ul>
          </div>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <MarkableHeading
              textContent="3.Contact"
              type="h3"
              idUsed="contactPage"
              isLink
              linkHref="/contact"
            />
            <p>Pagina "Contact" este compusă din 2 secțiuni:</p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href="/contact#info">1.Informații de contact</Link>
                </h4>
                <p>
                  Secțiunea "Informații de contact" este prima secțiune din
                  pagina "Contact", ea conținând adresa liceului, numărul de
                  telefon al licelui și un preview a locației liceului, folosind
                  Google Maps.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/contact#email">2.Trimite-ne un email!</Link>
                </h4>
                <p>
                  Secțiunea "Trimite-ne un email!" este a doua secțiune din
                  pagina "Contact", ea conținând un formular pentru trimiterea
                  unui email către școală si o poza a interiorului liceului.
                </p>
              </li>
            </ul>
          </div>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <MarkableHeading
              textContent="4.Oferta educațională"
              type="h3"
              idUsed="offerPage"
              isLink
              linkHref="/oferta"
            />
            <p>
              Pagina "Oferta educațională" este compusă dintr-o singură secțiune
              care conține un titlu și un element "iframe" care reprezintă un
              preview al unui fișier PDF.
            </p>
          </div>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <MarkableHeading
              textContent="5.Legi și Documente"
              type="h3"
              idUsed="documentsPage"
              isLink
              linkHref="/documente"
            />
            <p>Pagina "Legi și Documente" este compusă din 2 secțiuni:</p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href="/documente/#map">1.Mapa Documentelor</Link>
                </h4>
                <p>
                  Secțiunea "Mapa Documentelor" este prima secțiune din pagina
                  "Legi și Documente", ea conținând o mapă a documentelor date,
                  reprezentată de o listă de link-uri care duc la documentul
                  respectiv de pe aceeasi pagină.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/documente/#documents">2.Documentele</Link>
                </h4>
                <p>
                  Secțiunea "Documentele" este a doua secțiune din pagina "Legi
                  și Documente", ea conținând preview-urile documentelor date
                  folosind elemente "iframe".
                </p>
              </li>
            </ul>
          </div>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <MarkableHeading
              textContent="6.Profesori"
              type="h3"
              idUsed="teachersPage"
              isLink
              linkHref="/profesori"
            />
            <p>
              Pagina "Profesori" este compusă dintr-o singură secțiune care
              conține mai multe componente "Profesor" fiecare având următoarele
              funcțiuni:
            </p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href="/profesori">
                    1.Funcția de a vedea componentul
                  </Link>
                </h4>
                <p>
                  Funcția de a vedea componentul face referire la vizibilitatea
                  componentului "Profesor". Acesta este compus din 2 interfețe
                  în funcție de mod(normal și editare).
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/profesori">
                    2.Funcția de a edita componentul
                  </Link>
                </h4>
                <p>
                  Funcția de a edita componentul face se referă la modificarea
                  componentului "Profesor" prin apăsarea butonului verde cănd
                  mouse-ul este pe componentul respectiv. Puteți edita
                  componentul cum vreți dumneavoastră și aceste modificări pot
                  fi salvate prin apăsarea butonului verde "bifat" din colțul
                  din dreapta sus.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/profesori">
                    3.Funcția de a șterge componentul
                  </Link>
                </h4>
                <p>
                  Funcția de a șterge componentul face referire la eliminarea
                  componentului "Profesor", prin apăsarea butonului roșu cănd
                  mouse-ul este pe componentul respectiv.Înainte ca acesta să
                  fie eliminat pe bune,o să apară o interfața "overlay" care,
                  după câteva secunde, vă lasă să eliminați permanent
                  componentul respectiv.
                </p>
              </li>
            </ul>
          </div>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <MarkableHeading
              textContent="7.Istoric"
              type="h3"
              idUsed="historyPage"
              isLink
              linkHref="/istoric"
            />
            <p>
              Pagina "Istoric" este compusă dintr-o singura secțiune ce conține
              o imagine a lui Ion Barbu împreună cu istoria liceului într-un
              format cronologic și structurat.
            </p>
          </div>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <MarkableHeading
              textContent="8.Despre Proiect"
              type="h3"
              idUsed="aboutPage"
              isLink
              linkHref="/"
            />
            <p>Pagina "Despre Proiect" este compusă din 5 secțiuni:</p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href="/#title">1.Titlul</Link>
                </h4>
                <p>
                  Secțiunea "Titlul" este prima secțiune din pagina "Despre
                  Proiect", ea conținând un titlu și un subtitlu. Fundalul
                  secțiunii este o imagine a Liceului Teoretic Ion Barbu din
                  Pitești. Această secțiune este reprezentată de un component
                  funcțional React, care primește 2 parametri, titlul și
                  subtitlul, și îi afișează cum se vede. Este un component comun
                  multor pagini.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/#generalInfo">2.Informații Generale</Link>
                </h4>
                <p>
                  Secțiunea "Informații Generale" este a doua secțiune din
                  pagina "Despre Proiect", ea conținând o "mapă" a proiectului,
                  fiecare titlu și subtitlu fiind un link către
                  paginile/secțiunile respective. În plus, conține o descriere
                  mai detaliată a secțiunilor paginilor.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/#pagesInfo">
                    3.Informații despre Paginile Site-ului
                  </Link>
                </h4>
                <p>
                  Secțiunea "Informații despre Paginile Site-ului" este a treia
                  secțiune din pagina "Despre Proiect", ea conține informații
                  generale despre paginile site-ului.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/#adminInfo">
                    4.Informații despre Contul Admin
                  </Link>
                </h4>
                <p>
                  Secțiunea "Informații despre Contul Admin" este a patra
                  secțiune din pagina "Despre Proiect", aceasta conținand
                  informații generale despre cum să intrați in contul
                  admin(folosind pagina "Intră in Cont"), cum să iesiți din
                  contul admin, cum să creați, ștergeți, modificați
                  anunțuri/profesori.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/#technologiesUsed">
                    5.Tehnologiile folosite in Crearea Site-ului
                  </Link>
                </h4>
                <p>
                  Secțiunea "Tehnologiile folosite în Crearea Site-ului" este a
                  cincea secțiune din pagina "Despre Proiect", care conține
                  link-uri, descrieri, logo-uri despre tehnologiile folosite în
                  crearea site-ului. Dacă vă interesează puțin, puteți să dați
                  click pe logo-uri să vedeți cu ce tehnologii a fost creat
                  site-ul.
                </p>
              </li>
            </ul>
          </div>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <MarkableHeading
              textContent="9.Intră în cont"
              type="h3"
              idUsed="loginPage"
              isLink
              linkHref="/login"
            />
            <p>
              Pagina "Intră în cont" este compusă dintr-o singură secțiune care
              conține un formular. În cazul în care se introduce email-ul și
              parola corectă a Contului Admin, puteți să intrați în contul
              respectiv. Această secțiune are 2 abilități interesante despre ea.
            </p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href="/login">
                    1.Abilitatea de a intra în cont cu informațiile corecte
                  </Link>
                </h4>
                <p>
                  Abilitatea de a intra în cont cu informațiile corecte este
                  făcuta posibilă cu interfața formularului și tehnologia numită
                  "Redux" care îmi stochează informațiile introduse și le
                  trimite la server.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/login">2.Validarea informației incorecte</Link>
                </h4>
                <p>
                  Validarea informației incorecte este facută posibil cu
                  ajutorul unui component "modal" care apare când
                  email-ul/parola nu există/nu au fost introduse. Mesajul
                  vizibil de acest "modal" este cel primit de la server în cazul
                  de eroare.
                </p>
              </li>
            </ul>
          </div>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <MarkableHeading
              textContent="10.Crează-ți un cont"
              type="h3"
              idUsed="signupPage"
              isLink
              linkHref="/signup"
            />
            <p>
              Pagina "Crează-ți un cont" este compusă dintr-o singură secțiune
              care conține un formular. În cazul în care se introduc informatii
              corecte, puteți să creați un cont de elev, profesor sau admin.
              Această secțiune are 2 abilități interesante despre ea.
            </p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href="/login">
                    1.Abilitatea de a creea un cont cu informațiile corecte
                  </Link>
                </h4>
                <p>
                  Abilitatea de a creea un cont cu informațiile corecte este
                  făcuta posibilă cu interfața formularului și tehnologia numită
                  "Redux" care îmi stochează informațiile introduse și le
                  trimite la server.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/login">2.Validarea informației incorecte</Link>
                </h4>
                <p>
                  Validarea informației incorecte este facută posibil cu
                  ajutorul unui component "modal" care apare când informațiile
                  introduce sunt greșite. Mesajul vizibil de acest "modal" este
                  cel primit de la server în cazul de eroare.
                </p>
              </li>
            </ul>
          </div>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <MarkableHeading
              textContent="11.Clasele Noastre"
              type="h3"
              idUsed="ourClasses"
              isLink
              linkHref="/clase"
            />
            <p>
              Pagina "Clasele Noastre" este compusă dintr-o singură secțiune
              care conține clasele valabile, publice. Utilizatorii pot accesa
              paginile individuale ale claselor.
            </p>
          </div>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <MarkableHeading
              textContent="12.Bibliotecă"
              type="h3"
              idUsed="library"
              isLink
              linkHref="/biblioteca"
            />
            <p>
              Pagina "Bibliotecă" conține componente Carte care pot fi
              ordonate/filtrate printr-un alt component vecin.
            </p>
          </div>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <MarkableHeading
              textContent="13.Profil"
              type="h3"
              idUsed="profilePage"
              isLink
              linkHref="/profil"
            />
            <p>
              Pagina "Profil" reprezinta pagina profilului tau sau pagina
              profilului altui cont.Pagina Profil poate fi de 3 tipuri.
            </p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href="/profil">Profil de Elev</Link>
                </h4>
                <p>
                  Profilul de Elev continue detaliile profilului de elev, mai
                  multe opțiuni generale pentru profil, clasa elevului
                  respectiv. Dacă elevul aparține unei clase, el are access la
                  carnetul lui de elev.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/login">Profil de Profesor</Link>
                </h4>
                <p>
                  Profilul de Profesor conține detaliile profilului de profesor,
                  mai multe opțiuni generale pentru profil și clasele la care
                  aparține profesorul.
                </p>
              </li>
              <li>
                <h4>
                  <Link href="/login">Profil de Admin</Link>
                </h4>
                <p>
                  Profilul de Admin conține detaliile profilului de admin și
                  multe opțiuni de creeare a unor: anunțuri, cărți, clase, ...
                </p>
              </li>
            </ul>
          </div>
        </section>
        <section className={aboutStyles.aboutContainer__technologiesUsed}>
          <MarkableHeading
            textContent="Tehnologiile folosite in Crearea Site-ului"
            type="h2"
            idUsed="technologiesUsed"
          />
          <h3>1.Tehnologiile folosite pe Client:</h3>
          <div className={aboutStyles.aboutContainer__frontendTech}>
            {aboutTechnologiesUsedFrontend.map((technology) => {
              return (
                <Link
                  href={technology.techUrl}
                  key={technology.id}
                  title={technology.label}
                >
                  <Image
                    alt={technology.label}
                    src={technology.logoUrl}
                    width={150}
                    height={150}
                  />
                </Link>
              );
            })}
          </div>
          <h3>2.Tehnologiile folosite pe Server:</h3>
          <div className={aboutStyles.aboutContainer__backendTech}>
            {aboutTechnologiesUsedBackend.map((technology) => {
              return (
                <Link
                  href={technology.techUrl}
                  key={technology.id}
                  title={technology.label}
                >
                  <Image
                    alt={technology.label}
                    src={technology.logoUrl}
                    width={150}
                    height={150}
                  />
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
