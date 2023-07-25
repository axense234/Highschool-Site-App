# Highschool Site App -> Ion Barbu

Un proiect Fullstack Mern Typescript cu Sass și Redux, creat în scopul de a-mi perfecționa cunoștințele asupra dezvoltării web la un nivel mai avansat, în același timp construind un proiect bun pentru un portofolio viitor.

## **Descriere**

Un proiect Fullstack Mern Typescript cu Sass și Redux, creat în scopul de a-mi perfecționa cunoștințele asupra dezvoltării web la un nivel mai avansat, în același timp construind un proiect bun pentru un portofolio viitor. Proiectul m-a forțat să învăț mai în detaliu arhitectura "monorepo" cu Lerna și să creez fișiere README.md mai bune, în diferite limbi.

## **Incepeti**

### **Dependențe(pachete)**

- Verificați fișierul package.json pentru detalii.
- NodeJS instalat, Redis instalat(dacă folosiți o instanță Redis locală)
- Dacă folosiți ca sistem de operare Windows, o să aveți nevoie de Linux, deoarece aveți nevoie de Redis, puteți instala Linux pe Windows urmând acest [**_tutorial_**](https://learn.microsoft.com/en-us/windows/wsl/install).
- Redenumiți fișierul .env.sample la .env si întroduceți variabilele de mediu respective

### Instalare

```
git clone https://github.com/axense234/Highschool-Site-App.git
cd Highschool-Site-App
npm install
npm run migration; npm run generation
```

### Executarea programului

- urmați acești pași **după ce completați variabilele în .env** !!!
- dacă folosiți o instanță Redis **internă**:

```
redis-server -> într-un terminal WSL dacă folosiți Windows !!!
npm run dev
```

- dacă folosiți o instanță Redis **externă**:

```
npm run dev
```

## **Autori**

- **axense234(Comănescu Andrei)**

## **Istoria Versiunilor**

- 1.2.0
  - A treia versiune a site-ului, de data asta complet si focusat pe tema unui site de liceu
- 1.1.0
  - A doua versiune a site-ului, de data asta optimizat pentru toate dispozitivele
- 1.0.0
  - Prima versiune a site-ului, versiuni viitoare for conține adaptabilitate pentru telefoane/tablete/etc..
  - Vezi [istoria schimbarilor](https://github.com/axense234/Highschool-Site-App/commits/master) sau Vezi [istoria versiunilor](https://github.com/axense234/Highschool-Site-App/releases)
- 1.0.0
  - Versiune Inițială

## **Licență**

Acest proiect foloseste licența GNU, vedeți fișierul LICENSE.md pentru mai multe detalii.

## **Inspirări**

- Inspirat de [**_site-ul școlii mele_**](https://sites.google.com/ltibp.ro/licionbarbu/acasa?authuser=0)
