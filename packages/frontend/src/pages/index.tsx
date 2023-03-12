// React
import { FC } from "react";
// Next
import Link from "next/link";
import Image from "next/image";
// SCSS
import aboutStyles from "../scss/components/About.module.scss";
// Components
import HomeTitle from "@/components/Home/HomeTitle";
import Meta from "@/components/Meta";
// Data
import {
  aboutTechnologiesUsedBackend,
  aboutTechnologiesUsedFrontend,
} from "@/data";

const About: FC = () => {
  return (
    <>
      <Meta
        title='Liceul Teoretic "Ion Barbu" Pitești - Despre Proiect.'
        desc='Proiect inspirat de site-ul original al liceului meu: Liceul Teoretic "Ion Barbu" Pitești. Pagina descrierii proiectului.'
      />
      <main className={aboutStyles.aboutContainer}>
        <HomeTitle
          title='Despre Proiect'
          quote='Tot ce ai nevoie să știi despre proiectul meu.'
        />
        <section
          className={aboutStyles.aboutContainer__generalInfo}
          id='generalInfo'
        >
          <h2>Informații generale.</h2>
          <div className={aboutStyles.aboutContainer__me}>
            <h3>1.Cine sunt eu?</h3>
            <p>
              Mă numesc Comănescu Andrei, am 17 ani, vin de la Liceul Teoretic
              Ion Barbu Pitești, studiez dezvoltarea site-urilor de vreo 2 ani.
              Sunt proficient în următoarele tehnologii: HTML, CSS, SASS,
              Javascript, Typescript, React, NextJS, Node, Express, MongoDB,
              Mongoose, PostgreSQL, Prisma, Redis, Redux, Netlify, Render,
              ElephantSQL; merg mai mult în detaliu despre tehnologiile
              respective în <a href='#technologiesUsed'>ultima secțiune.</a>
            </p>
            <p>
              Folosesc&nbsp;
              <a
                href='https://github.com/axense234'
                target='_blank'
                rel='noreferrer'
              >
                Github
              </a>{" "}
              pentru a-mi stoca proiectele referitoare la dezvoltarea web,
              probleme în C++, tutoriale.
            </p>
          </div>
          <div className={aboutStyles.aboutContainer__site}>
            <h3>2.De ce am făcut acest site?</h3>
            <p>
              Am făcut acest site pentru a-mi arăta cunoștințele referitoare la
              dezvoltarea web, în același timp antrenându-mă puțin mai mult cu
              tehnologiile: SCSS, NextJS, Redux, Typescript, deoarece aceste
              tehnologii sunt puțin mai complicate, dar merită a fi învățate,
              deoarece îmi fac viața mai ușoară și mai puțin plictisitoare.
            </p>
            <p>
              Un alt motiv pentru crearea site-ului este șansa de a câștiga un
              premiu pentru munca mea grea (acest site mi-a luat peste 20 de ore
              și am înnebunit puțin), și pentru a-mi forța înțelegerea/învățarea
              mai în detaliu a tehnologiilor folosite, în condiții de timp
              limitat.
            </p>
          </div>
        </section>
        <section
          className={aboutStyles.aboutContainer__pagesInfo}
          id='pagesInfo'
        >
          <h2>Informații despre Paginile Site-ului</h2>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <h3>
              <Link href='/home'>1.Acasă</Link>
            </h3>
            <p>Pagina "Acasă" este compusă din 5 secțiuni:</p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href='/home/#title'>1.Titlul</Link>
                </h4>
                <p>
                  Sectiunea "Titlul" este prima secțiune din pagina "Acasă", ea
                  conținând un titlu și un subtitlu. Fundalul secțiunii este o
                  imagine a Liceului Teoretic Ion Barbu din București, deoarece
                  nu am găsit o imagine de calitate a liceului din Pitești.
                  Această secțiune este reprezentată de un component funcțional
                  React, care primește 2 parametri: titlul și subtitlul și le
                  afișează cum se poate observa.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/home/#differences'>2.Ce ne diferențiază?</Link>
                </h4>
                <p>
                  Sectiunea "Ce ne diferențiază??" este a doua sectiune din
                  pagina "Acasă", ea conținând 4 subsecțiuni, fiecare
                  subsecțiune, la rândul ei, conținând o imagine și o descriere
                  a deosebirii respective.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/home/#facilities'>3.Dotarea liceului</Link>
                </h4>
                <p>
                  Sectiunea "Dotarea liceului" este a treia sectiune din pagina
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
                  <Link href='/home/#bac'>
                    4.Promovabilitatea la Bacalaureat
                  </Link>
                </h4>
                <p>
                  Secțiunea "Promovabilitatea la Bacalaureat" este a patra
                  secțiune din pagina "Acasă", ea conținând o imagine luată de
                  pe site-ul original al Liceului Teoretic Ion Barbu Pitești,
                  care ne arată statisticile referitoare la promovabilitatea la
                  bacalaureat din liceu.
                  <br />
                  Dacă aveam acces la baza lor de date de studenți, puteam să
                  folosesc{" "}
                  <a
                    href='https://react-charts.tanstack.com/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    React Charts
                  </a>{" "}
                  ca să-mi construiesc propriile grafice, aș fi avut nevoie de
                  acces la baza lor de date de studenți.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/home/#offerings'>5.Ce oferim?</Link>
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
            <h3>
              <Link href='/home'>2.Despre Proiect</Link>
            </h3>
            <p>Pagina "Despre Proiect" este compusă din 5 secțiuni:</p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href='/#title'>1.Titlul</Link>
                </h4>
                <p>
                  Secțiunea "Titlul" este prima secțiune din pagina "Despre
                  Proiect", ea conținând un titlu și un subtitlu. Fundalul
                  sectiunii este o imagine a Liceului Teoretic Ion Barbu din
                  Pitești deoarece nu am găsit o imagine de calitate a liceului
                  din Pitești. Această secțiune este reprezentată de un
                  component funcțional React, care primește 2 parametri, titlul
                  și subtitlul, și îi afișează cum se vede. Este un component
                  comun multor pagini.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/#generalInfo'>2.Informații Generale</Link>
                </h4>
                <p>
                  Secțiunea "Informații Generale" este a doua secțiune din
                  pagina "Despre Proiect", ea conține o "mapă" a proiectului,
                  fiecare titlu și subtitlu fiind un link către
                  paginile/secțiunile respective. În plus, conține o descriere
                  mai detaliată a secțiunilor paginilor.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/#pagesInfo'>
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
                  <Link href='/#adminInfo'>
                    4.Informații despre Contul Admin
                  </Link>
                </h4>
                <p>
                  Secțiunea "Informații despre Contul Admin" este a patra
                  secțiune din pagina "Despre Proiect",ea conținand informații
                  generale despre cum sa intrați in contul admin(folosind pagina
                  "Intră in Cont"),cum sa iesiți din contul admin,cum sa
                  creați,ștergeți,modificați anunțuri/profesori.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/#technologiesUsed'>
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
            <h3>
              <Link href='/anunturi'>3.Anunțuri</Link>
            </h3>
            <p>
              Pagina "Anunțuri" este compusă dintr-o singură secțiune care
              conține mai multe componente "Anunț",care fiecare are următoarele
              funcționalități:
            </p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href='/anunturi'>1.Funcția de a vedea componentul</Link>
                </h4>
                <p>
                  Funcția de a vedea componentul face referire vizibilitatea
                  componentului "Anunț".Acesta este compus din 3 interfețe in
                  funcție de mod(normal si editare).O interfața cănd anunțul
                  este acuns,una cănd nu e ascuns și una când e in modul
                  editare.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/anunturi'>2.Funcția de a edita componentul</Link>
                </h4>
                <p>
                  Funcția de a edita componentul face referire la modificarea
                  componentului "Anunț",prin apăsarea butonului verde cănd
                  mouse-ul este pe componentul respectiv.Puteți edita
                  componentul cum vreți dumneavoastră si aceste modificări pot
                  fi salvate prin apăsarea butonului verde "bifat" in contul din
                  dreapta sus.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/anunturi'>
                    3.Funcția de a șterge componentul
                  </Link>
                </h4>
                <p>
                  Funcția de a șterge componentul face referire la stergerea
                  componentului "Anunț",prin apăsarea butonului roșu cănd
                  mouse-ul este pe componentul respectiv.Înainte ca acesta să
                  fie eliminat permanent,o să apară o interfața "overlay" care,
                  după căteva secunde, vă lasă să eliminați componentul
                  respectiv.
                </p>
              </li>
            </ul>
          </div>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <h3>
              <Link href='/profesori'>4.Profesori</Link>
            </h3>
            <p>
              Pagina "Profesori" este compusă dintr-o singură secțiune care
              conține mai multe componente "Profesor",care fiecare are
              următoarele funcțiuni:
            </p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href='/profesori'>
                    1.Funcția de a vedea componentul
                  </Link>
                </h4>
                <p>
                  Functia de a vedea componentul face referire la vizibilitatea
                  componentului "Profesor".Acesta este compus din 2 interfețe în
                  funcție de mod(normal si editare).
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/profesori'>
                    2.Funcția de a edita componentul
                  </Link>
                </h4>
                <p>
                  Functia de a edita componentul face se referă la modificarea
                  componentului "Profesor", prin apăsarea butonului verde cănd
                  mouse-ul este pe componentul respectiv.Puteți edita
                  componentul cum vreți dumneavoastră și aceste modificări pot
                  fi salvate prin apăsarea butonului verde "bifat" în contul din
                  dreapta sus.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/profesori'>
                    3.Funcția de a șterge componentul
                  </Link>
                </h4>
                <p>
                  Funcția de a șterge componentul face referire eliminarea
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
            <h3>
              <Link href='/login'>5.Intră în cont</Link>
            </h3>
            <p>
              Pagina "Intră în cont" este compusă dintr-o singură secțiune, care
              conține un formular,în cazul în care se introduce email-ul si
              parola corectă a Contului Admin, puteți să intrați în contul
              respectiv.Această secțiune are 2 abilități interesante despre ea.
            </p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href='/login'>
                    1.Abilitatea de a intra în cont cu informațiile corecte
                  </Link>
                </h4>
                <p>
                  Abilitatea de a intra în cont cu informațiile corecte este
                  făcuta posibilă cu interfața formularului și tehnologia numită
                  "Redux", care îmi stochează informațiile introduse și le
                  trimite la server.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/login'>2.Validarea informației incorecte</Link>
                </h4>
                <p>
                  Validarea informației incorecte este facută posibil cu
                  ajutorul unui component "modal" care apare când
                  email-ul/parola nu există/nu au fost introduse.Mesajul vizibil
                  de acest "modal" este cel primit de la server în cazul de
                  eroare.
                </p>
              </li>
            </ul>
          </div>
        </section>
        <section
          className={aboutStyles.aboutContainer__adminInfo}
          id='adminInfo'
        >
          <h2>Informații despre Contul Admin</h2>
          <p>
            Contul Admin reprezintă contul unui utilizator cu proprietatea
            "rolUtilizator" setată la ADMIN.Daca sunteți conectați la contul
            ADMIN, puteți creea/șterge/edita profesori/anunțuri, puteți să vă
            deconectați de la cont ți puteți să schimbați
            parola/username-ul/email-ul contului însine.
          </p>
          <h3>Pași pentru a vă conecta la Contul Admin:</h3>
          <ul className={aboutStyles.aboutContainer__pageInfoSections}>
            <li>
              <h4>
                <Link href='/login'>
                  1.Intrați pe pagina "Intră în Cont" prin deschiderea barei de
                  navigare sau prin a apăsa pe acest text.
                </Link>
              </h4>
            </li>
            <li>
              <h4>
                <Link href='/login'>2.Introduceți datele corecte</Link>
              </h4>
              <p>
                Dacă nu ați editat detaliile contului din Profil, introduceți
                aceste date:
                <br />
                Email: testing@gmail.com
                <br />
                Parolă: testing
                <br />
                Rol Utilizator: ADMIN
              </p>
            </li>
          </ul>
          <h3>Ce puteți să faceți după ce ați intrat în Contul Admin?</h3>
          <ul className={aboutStyles.aboutContainer__pageInfoSections}>
            <li>
              <h4>
                <Link href='/login'>
                  1.Puteți să schimbați detaliile Contului Admin
                </Link>
              </h4>
              <p>
                Ca să schimbați detaliile Contului Admin,apăsați pe bara de
                opțiuni pe opțiunea "Setări Profil",chiar dacă aceasta este
                selectată la început.
              </p>
            </li>
            <li>
              <h4>
                <Link href='/login'>
                  2.Puteți să vă deconectați de la Contul Admin
                </Link>
              </h4>
              <p>
                Dacă vreți să vă deconectați de la Contul Admin apăsați pe
                opțiunea "Ieși din Cont", așteptați puțin și apăsați pe butonul
                "Da".
              </p>
            </li>
            <li>
              <h4>
                <Link href='/login'>3.Puteți să creați un Anunț</Link>
              </h4>
              <p>
                Dacă vreți să creați un Anunț apăsați pe opțiunea "Creează un
                Anunț" și introduceți informațiile dorite.Dacă introduceți
                informații invalide un component "modal" vă va arăta greșeala
                dumneavoastră.
              </p>
            </li>
            <li>
              <h4>
                <Link href='/login'>4.Puteți să creați un Profesor</Link>
              </h4>
              <p>
                Dacă vreți să creați un Profesor apăsați pe opțiunea "Creează un
                Profesor" și introduceți informațiile dorite.Daca introduceți
                informații invalide un component "modal" vă va arăta greșeala
                dumneavoastră.
              </p>
            </li>
          </ul>
        </section>
        <section
          className={aboutStyles.aboutContainer__technologiesUsed}
          id='technologiesUsed'
        >
          <h2>Tehnologiile folosite in Crearea Site-ului</h2>
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
