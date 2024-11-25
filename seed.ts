import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  await prisma.character.deleteMany();
  
      // Добавление ролей
  // const roles = [
  //   { text: 'civilian',
  //     url: 'civilian',
  //     team: 'red',
  //     value: {} 
  //   },
  //   {
  //       text: 'sheriff',
  //       url: 'sheriff',
  //       team: 'red',
  //       value: {},
  //     },
  //   {
  //     text: 'mafia',
  //     url: 'mafia',
  //     team: 'black',
  //     value: {},
  //   },
  //   {
  //     text: 'don',
  //     url: 'don',
  //     team: 'black',
  //     value: {},
  //   },


  // ];

  // for (const role of roles) {
  //   await prisma.role.create({
  //     data: {
  //       text: role.text,
  //       url: role.url,
  //       team: role.team,
  //       value: JSON.stringify(role.value),
  //     },
  //   });
  // }

  console.log('Roles created');


    // Добавление результатов
    // const results = [
    //   { text: 'civilian', 
    //     result: 'civilian',
    //     value: {} },
    //   { text: 'mafia',
    //     result: 'mafia',
    //     value: {} },
    //   { text: 'draw',
    //     result: 'draw',
    //     value: {} },
    // ];
  
    // for (const result of results) {
    //   await prisma.result.create({
    //     data: {
    //       text: result.text,
    //       result: result.result,
    //       value: JSON.stringify(result.value),
    //     },
    //   });
    // }
  
    console.log('Game results created');

    
  



}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
