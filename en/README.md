# Highschool Site App -> Ion Barbu

A Fullstack Mern Typescript with Sass and Redux project with the purpose of improving my overall web developer skills and to compete against other people in a highschool competition("Scoala intre viziune si misiune" -> in romanian).

## Description

A Fullstack Mern Typescript with Sass and Redux project with the purpose of improving my overall web developer skills and to compete against other people in a highschool competition("Scoala intre viziune si misiune" -> in romanian).This project has basically forced me to learn monorepos and how to create better README.mds that also have language support since i am presenting this project to either romanians(for the competition) or other people that speak english.I have broken mentally over this project,and due to lack of time,this project is NOT mobile responsive(i made it responsive 10.03.2023),tho i will probably add that after the competition is done since i want to practice with Sass media quering since its way easier than just straight up CSS.

## **Getting Started**

### Dependencies

- Check package.json for details.
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

```
redis-server -> in a WSL terminal !!!
npm run dev
```

## **Authors**

- **axense234(Comanescu Andrei)**

## **Version History**

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
