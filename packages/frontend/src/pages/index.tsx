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
        title='Liceul Teoretic "Vasile Barbu" Pitesti - Despre Proiect'
        desc='Proiect inspirat de site-ul original al liceului meu: Liceul Teoretic "Ion Barbu" Pitesti.Pagina descrierii proiectului.'
      />
      <main className={aboutStyles.aboutContainer}>
        <HomeTitle
          title='Despre Proiect'
          quote='Tot ce ai nevoie sa stii despre proiectul meu.'
        />
        <section
          className={aboutStyles.aboutContainer__generalInfo}
          id='generalInfo'
        >
          <h2>Informatii Generale</h2>
          <div className={aboutStyles.aboutContainer__me}>
            <h3>1.Cine sunt eu?</h3>
            <p>
              Ma numesc Comanescu Andrei,am 17 ani,vin de la Liceul Teoretic Ion
              Barbu Pitesti,studiez dezvoltarea site-urilor de vreo 2 ani.Sunt
              proficient in urmatoarele
              tehnologii:HTML,CSS,SASS,Javascript,Typescript,React,NextJS,Node,Express,MongoDB,Mongoose,PostgreSQL,Prisma,Redis,Redux,Netlify,Render,ElephantSQL;merg
              mai mult in detaliu despre tehnologiile respective in{" "}
              <a href='#technologiesUsed'>ultima sectiune.</a>
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
              pentru a imi stoca proiectele referitoare la dezvoltarea
              web,probleme in C++,tutoriale.
            </p>
          </div>
          <div className={aboutStyles.aboutContainer__site}>
            <h3>2.De ce am facut acest site?</h3>
            <p>
              Am facut acest site pentru a imi arata cunostintele referitoare la
              dezvoltarea web,in acelasi timp antrenandu-ma putin mai mult cu
              tehnologiile: SCSS,NextJS,Redux Typescript deoarece aceste
              tehnologii sunt putin mai complicate,dar se merita a fi invatate
              deoarece imi fac viata mai usoara si mai putin plictisitoare.
            </p>
            <p>
              Un alt motiv pentru crearea site-ului este sansa de a castiga un
              premiu pentru munca mea grea(acest site mi-a luat peste 20 de ore
              am innebunit putin) si pentru a imi forta intelegerea/invatarea
              mai in detaliu a tehnologiilor folosite,contra timp.
            </p>
          </div>
        </section>
        <section
          className={aboutStyles.aboutContainer__pagesInfo}
          id='pagesInfo'
        >
          <h2>Informatii despre Paginile Site-ului</h2>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <h3>
              <Link href='/home'>1.Acasa</Link>
            </h3>
            <p>Pagina "Acasa" este compusa din 5 sectiuni:</p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href='/home/#title'>1.Titlul</Link>
                </h4>
                <p>
                  Sectiunea "Titlul" este prima sectiune din pagina "Acasa",ea
                  continand un titlu,si un sub-titlu.Fundalul sectiunii este o
                  imagine a Liceul Teoretic Ion Barbu din Bucuresti deoarece nu
                  am gasit o imagine de calitate a liceului din Pitesti.Aceasta
                  sectiune este reprezentata de un component functional
                  React,care primeste 2 parametrii,titlul si subtitul si ii
                  afiseaza cum se vede.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/home/#differences'>2.Ce ne deosebeste?</Link>
                </h4>
                <p>
                  Sectiunea "Ce ne deosebeste?" este a doua sectiune din pagina
                  "Acasa",ea continand 4 sub-sectiuni,fiecare sub-sectiune la
                  randul ei continand o imagine si o descriere a deosebirii
                  respective.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/home/#facilities'>3.Dotarea liceului</Link>
                </h4>
                <p>
                  Sectiunea "Dotarea liceului" este a treia sectiune din pagina
                  "Acasa",ea continand un "slider" care,daca nu e deranjat de un
                  utilizator,incepe sa arate diferite imagini despre renovariile
                  claselor din liceu.Daca acest "slider" este intrerupt de
                  utilizator,nu va speriati,intra in modul automat dupa cateva
                  secunde de liniste.
                  <br /> Aceasta sectiune mai contine o lista cu dotarii
                  liceului,prezentate rand cu rand.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/home/#bac'>
                    4.Promovabilitatea la Bacalaureat
                  </Link>
                </h4>
                <p>
                  Sectiunea "Promovabilitea la Bacalaureat" este a patra
                  sectiune din pagina "Acasa",ea continand o imagine luata de pe
                  site-ul original al Liceului Teoretic Ion Barbu Pitesti care
                  ne arata statisticile referitoarea la promovabilitatea la bac
                  din liceu.
                  <br />
                  Daca aveam access la baza lor de date de studenti puteam sa
                  folosesc{" "}
                  <a
                    href='https://react-charts.tanstack.com/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    React Charts
                  </a>{" "}
                  ca sa imi construiesc propriile grafice folosindu-ma de baza
                  lor de date de studenti.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/home/#offerings'>5.Ce oferim?</Link>
                </h4>
                <p>
                  Sectiunea "Ce oferim?" este ultima sectiune din pagina
                  "Acasa",ea continand,foarte similator cu sectiunea "Ce ne
                  deosebeste?",4 sub-sectiuni care la randul lor contin o
                  descriere scurta a ofertei si imaginea produsului respectiv.
                </p>
              </li>
            </ul>
          </div>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <h3>
              <Link href='/home'>2.Despre Proiect</Link>
            </h3>
            <p>Pagina "Despre Proiect" este compusa din 5 sectiuni:</p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href='/#title'>1.Titlul</Link>
                </h4>
                <p>
                  Sectiunea "Titlul" este prima sectiune din pagina "Despre
                  Proiect",ea continand un titlu,si un sub-titlu.Fundalul
                  sectiunii este o imagine a Liceul Teoretic Ion Barbu din
                  Bucuresti deoarece nu am gasit o imagine de calitate a
                  liceului din Pitesti.Aceasta sectiune este reprezentata de un
                  component functional React,care primeste 2 parametrii,titlul
                  si subtitul si ii afiseaza cum se vede.Daca nu va dati
                  seama,este un component comun multor pagini.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/#generalInfo'>2.Informatii Generale</Link>
                </h4>
                <p>
                  Sectiunea "Informatii Generale?" este a doua sectiune din
                  pagina "Despre Proiect",ea continand o "mapa" a
                  proiectului,fiecare titlu si sub-titlu fiind un link la
                  paginile/sectiunile respective.In plus,contin o descriere mai
                  detaliata a sectiunilor paginilor.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/#pagesInfo'>
                    3.Informatii despre Paginile Site-ului
                  </Link>
                </h4>
                <p>
                  Sectiunea "Ce oferim?" este ultima sectiune din pagina
                  "Acasa",ea continand,foarte similator cu sectiunea "Ce ne
                  deosebeste?",4 sub-sectiuni care la randul lor contin o
                  descriere scurta a ofertei si imaginea produsului respectiv.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/#adminInfo'>
                    4.Informatii despre Contul Admin
                  </Link>
                </h4>
                <p>
                  Sectiunea "Informatii despre Contul Admin" este a treia
                  sectiune din pagina "Despre Proiect",ea continand un
                  informatii generale despre cum sa intrati in contul
                  admin(folosind pagina "Intra in Cont"),cum sa iesiti din
                  contul admin,cum sa creati,stergeti,modificati
                  anunturi/profesori.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/#technologiesUsed'>
                    5.Tehnologiile folosite in Crearea Site-ului
                  </Link>
                </h4>
                <p>
                  Sectiunea "Tehnologiile folosite in Crearea Site-ului" este a
                  a cincea sectiune din pagina "Despre Proiect",care contine
                  link-uri,descrieri,logo-uri despre tehnologiile folosite in
                  crearea site-ului.Daca va intereseaza putin puteti sa dati
                  click pe logo-uri sa vedeti cu ce tehnologii a fost creat
                  site-ul.
                </p>
              </li>
            </ul>
          </div>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <h3>
              <Link href='/anunturi'>3.Anunturi</Link>
            </h3>
            <p>
              Pagina "Anunturi" este compusa dintr-o singura sectiune care
              contine mai multe componente "Anunt",care fiecare are urmatoarele
              functiuni:
            </p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href='/anunturi'>1.Functia de a vedea componentul</Link>
                </h4>
                <p>
                  Functia de a vedea componentul face referire la faptul ca
                  componentul "Anunt" poate fi vazut.Acesta este compus din 3
                  interfate in functie de mod(normal si editare).O interfata
                  cand anuntul este acuns,una cand nu e ascuns,si una cand e in
                  modul de editare.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/anunturi'>2.Functia de a edita componentul</Link>
                </h4>
                <p>
                  Functia de a edita componentul face referire la faptul ca
                  componentul "Anunt" poate fi editat,prin apasarea butonului
                  verde cand mouse-ul este pe componentul respectiv.Puteti edita
                  componentul cum vreti dumneavoastra si aceste modificari pot
                  fi salvate prin apasarea butonului verde "bifat" in contul din
                  dreapta sus.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/anunturi'>
                    3.Functia de a sterge componentul
                  </Link>
                </h4>
                <p>
                  Functia de a sterge componentul face referire la faptul ca
                  componentul "Anunt" poate fi eliminat,prin apasarea butonului
                  rosu cand mouse-ul este pe componentul respectiv.Inainte ca
                  acesta sa fie eliminat pe bune,o sa apara o interfata
                  "overlay" care,dupa cateva secunde,va lasa sa eliminati
                  componentul respectiv.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/anunturi'>4.Cum se poata asa ceva?</Link>
                </h4>
                <p>
                  Componentele "Anunt" pan la urma sunt doar interfete care
                  arata proprietatile unui model "Anunt",deci ca sa
                  editam/stergem aceste componente,putem sa stergem modelele
                  insine.Proiectul foloseste un server cu tehnologiile NODE
                  TYPESCRIPT POSTGRESQL PRISMA REDIS.PostgreSQL si Redis sunt
                  date de baze.
                </p>
              </li>
            </ul>
          </div>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <h3>
              <Link href='/profesori'>4.Profesori</Link>
            </h3>
            <p>
              Pagina "Profesori" este compusa dintr-o singura sectiune care
              contine mai multe componente "Profesor",care fiecare are
              urmatoarele functiuni:
            </p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href='/profesori'>
                    1.Functia de a vedea componentul
                  </Link>
                </h4>
                <p>
                  Functia de a vedea componentul face referire la faptul ca
                  componentul "Profesor" poate fi vazut.Acesta este compus din 2
                  interfate in functie de mod(normal si editare).
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/profesori'>
                    2.Functia de a edita componentul
                  </Link>
                </h4>
                <p>
                  Functia de a edita componentul face referire la faptul ca
                  componentul "Profesor" poate fi editat,prin apasarea butonului
                  verde cand mouse-ul este pe componentul respectiv.Puteti edita
                  componentul cum vreti dumneavoastra si aceste modificari pot
                  fi salvate prin apasarea butonului verde "bifat" in contul din
                  dreapta sus.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/profesori'>
                    3.Functia de a sterge componentul
                  </Link>
                </h4>
                <p>
                  Functia de a sterge componentul face referire la faptul ca
                  componentul "Profesor" poate fi eliminat,prin apasarea
                  butonului rosu cand mouse-ul este pe componentul
                  respectiv.Inainte ca acesta sa fie eliminat pe bune,o sa apara
                  o interfata "overlay" care,dupa cateva secunde,va lasa sa
                  eliminati componentul respectiv.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/profesori'>4.Cum se poata asa ceva?</Link>
                </h4>
                <p>
                  Componentele "Profesor" pan la urma sunt doar interfete care
                  arata proprietatile unui model "Profesor",deci ca sa
                  editam/stergem aceste componente,putem sa stergem modelele
                  insine.Proiectul foloseste un server cu tehnologiile NODE
                  TYPESCRIPT POSTGRESQL PRISMA REDIS.PostgreSQL si Redis sunt
                  date de baze.
                </p>
              </li>
            </ul>
          </div>
          <div className={aboutStyles.aboutContainer__pageInfo}>
            <h3>
              <Link href='/login'>5.Intra in cont</Link>
            </h3>
            <p>
              Pagina "Intra in cont" este compusa dintr-o singura sectiune,care
              contine un formular,care,daca se introduce email-ul si parola
              corecta a Contului Admin,puteti sa intrati in contul
              respectiv.Aceasta sectiune are 2 chestii interesante despre ea.
            </p>
            <ul className={aboutStyles.aboutContainer__pageInfoSections}>
              <li>
                <h4>
                  <Link href='/login'>
                    1.Abilitatea de a intra in cont cu informatiile corecte
                  </Link>
                </h4>
                <p>
                  Abilitatea de a intra in cont cu informatiile corecte este
                  facuta posibila cu interfata formularului si tehnologia numita
                  "Redux",care imi stocheaza informatiile introduse si le
                  trimite la server.
                </p>
              </li>
              <li>
                <h4>
                  <Link href='/login'>2.Validarea de informatiei gresita</Link>
                </h4>
                <p>
                  Validarea de informatie gresita este facuta posibil cu
                  ajutorul unui component "modal" care apare cand
                  email-ul/parola nu exista/nu au fost introduse.Mesajul vizibil
                  de acest "modal" este cel primit de la server in cazul de
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
          <h2>Informatii despre Contul Admin</h2>
          <p>
            Contul Admin reprezinta contul unui utilizator cu proprietatea
            "rolUtilizator" setat la ADMIN.Daca sunteti conectati la contul
            ADMIN,puteti creea/sterge/edita profesori/anunturi,puteti sa va
            deconectati de la cont si puteti sa schimbati
            parola/username-ul/email-ul contului insine.
          </p>
          <h3>Pasi pentru a va conecta la Contul Admin:</h3>
          <ul className={aboutStyles.aboutContainer__pageInfoSections}>
            <li>
              <h4>
                <Link href='/login'>
                  1.Intrati pe pagina "Intra in Cont" prin deschiderea barei de
                  navigare,sau prin a apasa pe acest text.
                </Link>
              </h4>
            </li>
            <li>
              <h4>
                <Link href='/login'>2.Introduceti datele corecte</Link>
              </h4>
              <p>
                Daca nu ati editat detaliile contului din Profil,introduceti
                aceste date:
                <br />
                Email: testing@gmail.com
                <br />
                Parola: testing
                <br />
                Rol Utilizator: ADMIN
              </p>
            </li>
          </ul>
          <h3>Ce puteti sa faceti dupa ce ati intrat in Contul Admin?</h3>
          <ul className={aboutStyles.aboutContainer__pageInfoSections}>
            <li>
              <h4>
                <Link href='/login'>
                  1.Puteti sa schimbati detaliile Contului Admin
                </Link>
              </h4>
              <p>
                Ca sa schimbati detaliile Contului Admin,apasati pe bara de
                optiuni pe optiunea "Setari Profil",chiar daca aceasta este
                selectata la inceput.
              </p>
            </li>
            <li>
              <h4>
                <Link href='/login'>
                  2.Puteti sa va deconectati de la Contul Admin
                </Link>
              </h4>
              <p>
                Daca vreti sa va deconectati de la Contul Admin,apasati pe
                optiunea "Iesi din Cont",asteptati putin si apasati pe butonul
                "Da".
              </p>
            </li>
            <li>
              <h4>
                <Link href='/login'>3.Puteti sa creati un Anunt</Link>
              </h4>
              <p>
                Daca vreti sa creati un Anunt,apasati pe optiunea "Creeaza un
                Anunt" si introduceti informatiile dorite.Daca introduceti
                informatii invalide,un component "modal" va va arata greseala
                dumneavoastra.
              </p>
            </li>
            <li>
              <h4>
                <Link href='/login'>4.Puteti sa creati un Profesor</Link>
              </h4>
              <p>
                Daca vreti sa creati un Profesor,apasati pe optiunea "Creeaza un
                Profesor " si introduceti informatiile dorite.Daca introduceti
                informatii invalide,un component "modal" va va arata greseala
                dumneavoastra.
              </p>
            </li>
          </ul>
        </section>
        <section
          className={aboutStyles.aboutContainer__technologiesUsed}
          id='technologiesUsed'
        >
          <h2>Tehnologiile folosite in Crearea Site-ului</h2>
          <h3>1.Tehnologiile folosite pe client:</h3>
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
          <h3>2.Tehnologiile folosite pe server:</h3>
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
