# Highschool Site App -> Ion Barbu

A Fullstack Mern Typescript with Sass and Redux project with the purpose of improving my overall web developer skills, at the same time building a good project for a future portfolio.

## Description

A Fullstack Mern Typescript with Sass and Redux project with the purpose of improving my overall web developer skills, at the same time building a good project for a future portfolio. This project has basically forced me to learn monorepos and how to create better README.mds that also have language support since i am presenting this project to either romanians(for the competition) or other people that speak english. I have broken mentally over this project and due to lack of time this project is NOT mobile responsive(i made it responsive 20.05.2023) tho i will probably add that after the competition is done since i want to practice with Sass media quering since its way easier than just straight up CSS.

## **Getting Started**

### Dependencies

- Check package.json for details.
- NodeJS installed, Redis installed (if you are using a local Redis instance)
- Also if you are on Windows,you will need to install Linux since you will need to use Redis,you can install Linux on Windows by installing the Windows Subsystem for Linux(WSL) by following this [**_guide_**](https://learn.microsoft.com/en-us/windows/wsl/install).
- Rename .env.sample to .env and place your respective environment variables

### Installing

```
git clone https://github.com/axense234/Highschool-Site-App.git
cd Highschool-Site-App
npm install
npx prisma generate --schema=./packages/backend/prisma/schema.prisma
```

### Executing program

- follow these steps **after completing the variables in .env**!!!
- if you are using an **internal Redis instance**:

```
redis-server -> in a WSL terminal if on Windows !!!
npm run dev
```

- if you are using an **external Redis instance**:

```
npm run dev
```

## **Authors**

- **axense234(Comanescu Andrei)**

## **Version History**

- 1.2.0
  - The third version of the website, this time fully completed and focused on the theme of a high school website.
- 1.1.0
  - Second version of the website,this time optimized for all devices
- 1.0.0
  - First version of the website,later versions will contain a mobile responsive version
  - See [commit change](https://github.com/axense234/Highschool-Site-App/commits/master) or See [release history](https://github.com/axense234/Highschool-Site-App/releases)
- 1.0.0
  - Initial Release

## **License**

This project is licensed under the GNU License - see the LICENSE.md file for details

## **Acknowledgments**

- Inspired by [**_my highschool's website_**](https://sites.google.com/ltibp.ro/licionbarbu/acasa?authuser=0)
