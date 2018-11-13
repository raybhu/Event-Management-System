/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */
module.exports.bootstrap = async function (done) {
  sails.bcrypt = require('bcryptjs');
  const saltRounds = 10;
  if (await User.count() > 0) {
    return done();
  }
  const hash = await sails.bcrypt.hash('123456', saltRounds);
  await User.createEach([{
    username: 'admin',
    password: hash,
    role: 'admin',
  },
  {
    username: 'student1',
    password: hash,
    role: 'student',
  },
  {
    username: 'student2',
    password: hash,
    role: 'student',
  },
  {
    username: 'student3',
    password: hash,
    role: 'student',
  }
  ]);
  if (await Event.count() > 0) {
    return done();
  }
  await Event.createEach([{
    eventName: '1.HKBU student wins Macao Scientific and Technological Research and Development Award for Postgraduates',
    shortDescription: '浸大生榮獲澳門研究生科技研發獎',
    fullDescription: 'PhD student Lin Xuelei from the Department of Mathematics has won the prestigious 2018 Macao Scientific and Technological Research and Development Award for Postgraduates. Presented by the Macao Science and Technology Development Fund, Xuelei was recognised for his contribution to the development of science and technology in Macau, and specifically for his work in the area of partial differential equations. Prior to joining HKBU, Xuelei studied for his Master’s degree at the University of Macau. He expressed his gratitude to all his teachers and, in particular, his PhD supervisor Professor Michael Ng, Head of HKBU Department of Mathematics. In the future, Xuelei plans to contribute to the development of scientific computing, and to take part in more academic conferences and overseas exchange activities to expand the scope of his research.',
    imageUrl: 'http://hkbuenews.hkbu.edu.hk/images/.w215h159/20181016-maths.jpg',
    organizer: 'Martin Choy',
    eventDate: '2018-10-28',
    time: '12:00',
    venue: 'AAB',
    quota: '50',
    highlightedEvent: true,
  },
  {
    eventName: '2.UGC Quality Audit Report commends HKBU for effective management of academic quality and standards in sub-degree operations',
    shortDescription: '教資會質素核證報告嘉許浸大副學位課程有效管理質素和標準',
    fullDescription: 'HKBU’s student-centred approach in teaching and learning and student development of its sub-degree programmes, as well as staff’s caring attitude towards students and the high standard of teaching and learning support facilities, were commended in the Report of a Quality Audit of Sub-degree Operations of Hong Kong Baptist University released by the Quality Assurance Council of the University Grants Committee today.The Audit Panel recognised that there is a culture of quality in the Sub-degree Providing Units (SDPUs) of HKBU which undertake programme development, monitoring and review in accordance with expected processes. It also confirmed that there is effective management of quality and standards within SDPUs.The Panel acknowledged that the University’s comprehensive policy for the assessment of student learning, along with its strategy to adopt Outcomes-based Teaching and Learning with the use of criterion-referenced assessment have been important initiatives to support SDPUs in enhancing the quality of teaching and learning.',
    imageUrl: 'http://hkbuenews.hkbu.edu.hk/templates/hkbu/image/BU_logo.jpg',
    organizer: 'Kenny Cheng',
    eventDate: '2018-10-29',
    time: '12:00',
    venue: 'FSC',
    quota: '50',
    highlightedEvent: false,
  }, {
    eventName: '3.HKBU Information Day attracts 25,000 visitors to experience vibrant campus life',
    shortDescription: '浸大入學資訊日吸引逾25,000人參與',
    fullDescription: 'More than 25,000 prospective secondary school students and visitors joined the Information Day for Undergraduate Admission at HKBU on 13 October. They gained the most up-to-date information on the University’s development and its undergraduate programmes and experienced HKBU’s unique campus life.Four new undergraduate programmes will be offered by HKBU from 2019-20, subject to the formal approval by the University. The programmes are: Bachelor of Music in Creative Industries, Bachelor of Science -- Bioresource and Agricultural Science Major, Geography/ History/ Sociology and Personal, Social and Humanities Education Teaching (Double Degree), and Bachelor of Science in Business Computing and Data Analytics.',
    imageUrl: 'http://hkbuenews.hkbu.edu.hk/images/.w215h159/20181015-infoday-1.jpg',
    organizer: 'Martin Choy',
    eventDate: '2018-10-30',
    time: '12:00',
    venue: 'AAB',
    quota: '50',
    highlightedEvent: true,
  },
  {
    eventName: '4.HKBU team participates in Hong Kong Cyclothon',
    shortDescription: '浸大單車隊參與香港單車節',
    fullDescription: 'More than 100 HKBU students, staff members and alumni took part in this year’s Hong Kong Cyclothon held yesterday (14 October).HKBU President Professor Roland Chin, Treasurer of the HKBU Council Ms Rosanna Choi and Vice-President (Teaching and Learning) Dr Albert Chau led a ten-member HKBU team in the 50 km Team Ride. Other team members participated in the 30 km, 50 km and University Trophy races.Around 110 HKBU student ambassadors served as volunteers to provide on-site support for the participants and encourage HKBU cyclists during the event.',
    imageUrl: 'http://hkbuenews.hkbu.edu.hk/images/.w215h159/20181015-cyclothon-1.jpg',
    organizer: 'Kenny Cheng',
    eventDate: '2018-10-31',
    time: '12:00',
    venue: 'FSC',
    quota: '50',
    highlightedEvent: false,
  }, {
    eventName: '5.HKBU student wins Macao Scientific and Technological Research and Development Award for Postgraduates',
    shortDescription: '浸大生榮獲澳門研究生科技研發獎',
    fullDescription: 'PhD student Lin Xuelei from the Department of Mathematics has won the prestigious 2018 Macao Scientific and Technological Research and Development Award for Postgraduates. Presented by the Macao Science and Technology Development Fund, Xuelei was recognised for his contribution to the development of science and technology in Macau, and specifically for his work in the area of partial differential equations. Prior to joining HKBU, Xuelei studied for his Master’s degree at the University of Macau. He expressed his gratitude to all his teachers and, in particular, his PhD supervisor Professor Michael Ng, Head of HKBU Department of Mathematics. In the future, Xuelei plans to contribute to the development of scientific computing, and to take part in more academic conferences and overseas exchange activities to expand the scope of his research.',
    imageUrl: 'http://hkbuenews.hkbu.edu.hk/images/.w215h159/20181016-maths.jpg',
    organizer: 'Martin Choy',
    eventDate: '2018-11-1',
    time: '12:00',
    venue: 'AAB',
    quota: '50',
    highlightedEvent: true,
  },
  {
    eventName: '6.UGC Quality Audit Report commends HKBU for effective management of academic quality and standards in sub-degree operations',
    shortDescription: '教資會質素核證報告嘉許浸大副學位課程有效管理質素和標準',
    fullDescription: 'HKBU’s student-centred approach in teaching and learning and student development of its sub-degree programmes, as well as staff’s caring attitude towards students and the high standard of teaching and learning support facilities, were commended in the Report of a Quality Audit of Sub-degree Operations of Hong Kong Baptist University released by the Quality Assurance Council of the University Grants Committee today.The Audit Panel recognised that there is a culture of quality in the Sub-degree Providing Units (SDPUs) of HKBU which undertake programme development, monitoring and review in accordance with expected processes. It also confirmed that there is effective management of quality and standards within SDPUs.The Panel acknowledged that the University’s comprehensive policy for the assessment of student learning, along with its strategy to adopt Outcomes-based Teaching and Learning with the use of criterion-referenced assessment have been important initiatives to support SDPUs in enhancing the quality of teaching and learning.',
    imageUrl: 'http://hkbuenews.hkbu.edu.hk/templates/hkbu/image/BU_logo.jpg',
    organizer: 'Kenny Cheng',
    eventDate: '2018-10-27',
    time: '12:00',
    venue: 'FSC',
    quota: '50',
    highlightedEvent: false,
  }, {
    eventName: '7.HKBU Information Day attracts 25,000 visitors to experience vibrant campus life',
    shortDescription: '浸大入學資訊日吸引逾25,000人參與',
    fullDescription: 'More than 25,000 prospective secondary school students and visitors joined the Information Day for Undergraduate Admission at HKBU on 13 October. They gained the most up-to-date information on the University’s development and its undergraduate programmes and experienced HKBU’s unique campus life.Four new undergraduate programmes will be offered by HKBU from 2019-20, subject to the formal approval by the University. The programmes are: Bachelor of Music in Creative Industries, Bachelor of Science -- Bioresource and Agricultural Science Major, Geography/ History/ Sociology and Personal, Social and Humanities Education Teaching (Double Degree), and Bachelor of Science in Business Computing and Data Analytics.',
    imageUrl: 'http://hkbuenews.hkbu.edu.hk/images/.w215h159/20181015-infoday-1.jpg',
    organizer: 'Martin Choy',
    eventDate: '2018-10-26',
    time: '12:00',
    venue: 'AAB',
    quota: '50',
    highlightedEvent: true,
  },
  {
    eventName: '8.HKBU team participates in Hong Kong Cyclothon',
    shortDescription: '浸大單車隊參與香港單車節',
    fullDescription: 'More than 100 HKBU students, staff members and alumni took part in this year’s Hong Kong Cyclothon held yesterday (14 October).HKBU President Professor Roland Chin, Treasurer of the HKBU Council Ms Rosanna Choi and Vice-President (Teaching and Learning) Dr Albert Chau led a ten-member HKBU team in the 50 km Team Ride. Other team members participated in the 30 km, 50 km and University Trophy races.Around 110 HKBU student ambassadors served as volunteers to provide on-site support for the participants and encourage HKBU cyclists during the event.',
    imageUrl: 'http://hkbuenews.hkbu.edu.hk/images/.w215h159/20181015-cyclothon-1.jpg',
    organizer: 'Kenny Cheng',
    eventDate: '2018-10-25',
    time: '12:00',
    venue: 'FSC',
    quota: '50',
    highlightedEvent: false,
  },
  {
    eventName: '9.HKBU student wins Macao Scientific and Technological Research and Development Award for Postgraduates',
    shortDescription: '浸大生榮獲澳門研究生科技研發獎',
    fullDescription: 'PhD student Lin Xuelei from the Department of Mathematics has won the prestigious 2018 Macao Scientific and Technological Research and Development Award for Postgraduates. Presented by the Macao Science and Technology Development Fund, Xuelei was recognised for his contribution to the development of science and technology in Macau, and specifically for his work in the area of partial differential equations. Prior to joining HKBU, Xuelei studied for his Master’s degree at the University of Macau. He expressed his gratitude to all his teachers and, in particular, his PhD supervisor Professor Michael Ng, Head of HKBU Department of Mathematics. In the future, Xuelei plans to contribute to the development of scientific computing, and to take part in more academic conferences and overseas exchange activities to expand the scope of his research.',
    imageUrl: 'http://hkbuenews.hkbu.edu.hk/images/.w215h159/20181016-maths.jpg',
    organizer: 'Martin Choy',
    eventDate: '2018-10-24',
    time: '12:00',
    venue: 'AAB',
    quota: '50',
    highlightedEvent: true,
  },
  {
    eventName: '10.UGC Quality Audit Report commends HKBU for effective management of academic quality and standards in sub-degree operations',
    shortDescription: '教資會質素核證報告嘉許浸大副學位課程有效管理質素和標準',
    fullDescription: 'HKBU’s student-centred approach in teaching and learning and student development of its sub-degree programmes, as well as staff’s caring attitude towards students and the high standard of teaching and learning support facilities, were commended in the Report of a Quality Audit of Sub-degree Operations of Hong Kong Baptist University released by the Quality Assurance Council of the University Grants Committee today.The Audit Panel recognised that there is a culture of quality in the Sub-degree Providing Units (SDPUs) of HKBU which undertake programme development, monitoring and review in accordance with expected processes. It also confirmed that there is effective management of quality and standards within SDPUs.The Panel acknowledged that the University’s comprehensive policy for the assessment of student learning, along with its strategy to adopt Outcomes-based Teaching and Learning with the use of criterion-referenced assessment have been important initiatives to support SDPUs in enhancing the quality of teaching and learning.',
    imageUrl: 'http://hkbuenews.hkbu.edu.hk/templates/hkbu/image/BU_logo.jpg',
    organizer: 'Kenny Cheng',
    eventDate: '2018-10-23',
    time: '12:00',
    venue: 'FSC',
    quota: '50',
    highlightedEvent: false,
  }, {
    eventName: '11.HKBU Information Day attracts 25,000 visitors to experience vibrant campus life',
    shortDescription: '浸大入學資訊日吸引逾25,000人參與',
    fullDescription: 'More than 25,000 prospective secondary school students and visitors joined the Information Day for Undergraduate Admission at HKBU on 13 October. They gained the most up-to-date information on the University’s development and its undergraduate programmes and experienced HKBU’s unique campus life.Four new undergraduate programmes will be offered by HKBU from 2019-20, subject to the formal approval by the University. The programmes are: Bachelor of Music in Creative Industries, Bachelor of Science -- Bioresource and Agricultural Science Major, Geography/ History/ Sociology and Personal, Social and Humanities Education Teaching (Double Degree), and Bachelor of Science in Business Computing and Data Analytics.',
    imageUrl: 'http://hkbuenews.hkbu.edu.hk/images/.w215h159/20181015-infoday-1.jpg',
    organizer: 'Martin Choy',
    eventDate: '2018-10-22',
    time: '12:00',
    venue: 'AAB',
    quota: '50',
    highlightedEvent: true,
  },
  {
    eventName: '12.HKBU team participates in Hong Kong Cyclothon',
    shortDescription: '浸大單車隊參與香港單車節',
    fullDescription: 'More than 100 HKBU students, staff members and alumni took part in this year’s Hong Kong Cyclothon held yesterday (14 October).HKBU President Professor Roland Chin, Treasurer of the HKBU Council Ms Rosanna Choi and Vice-President (Teaching and Learning) Dr Albert Chau led a ten-member HKBU team in the 50 km Team Ride. Other team members participated in the 30 km, 50 km and University Trophy races.Around 110 HKBU student ambassadors served as volunteers to provide on-site support for the participants and encourage HKBU cyclists during the event.',
    imageUrl: 'http://hkbuenews.hkbu.edu.hk/images/.w215h159/20181015-cyclothon-1.jpg',
    organizer: 'Kenny Cheng',
    eventDate: '2018-10-21',
    time: '12:00',
    venue: 'FSC',
    quota: '50',
    highlightedEvent: false,
  },
  ]);
  if (await Organizer.count() > 0) {
    return done();
  }
  await Organizer.createEach([{
    name: 'Martin Choy'
  },
  {
    name: 'Kenny Cheng'
  }
    // etc.
  ]);
  if (await Venue.count() > 0) {
    return done();
  }
  await Venue.createEach([{
    name: 'AAB'
  },
  {
    name: 'RRS'
  },
  {
    name: 'FSC'
  },
  {
    name: 'YSS'
  },
  {
    name: 'SCT'
  },
  {
    name: 'LT'
  },
  {
    name: 'OEE'
  },
  {
    name: 'OEW'
  },
  {
    name: 'OEM'
  },
  {
    name: 'CEC'
  },
  {
    name: 'CHAP'
  },
  {
    name: 'LMC'
  },
  {
    name: 'AC HALL'
  },
  {
    name: 'AST'
  },
  {
    name: 'ASH'
  },
  {
    name: 'MHALL'
  },
  {
    name: 'ACTR'
  },
  {
    name: 'FITR'
  },
  {
    name: 'SQCT'
  },
  {
    name: 'SWPL'
  },
  {
    name: 'SWT'
  },
  {
    name: 'AML'
  },
  {
    name: 'WLB'
  },
  {
    name: 'DLB'
  },
  {
    name: 'SHSH'
  },
  {
    name: 'SCC'
  },
  {
    name: 'JSC'
  },
  {
    name: 'TNSCT'
  },
  {
    name: 'GOLF'
  },
  {
    name: 'MPC'
  },
  {
    name: 'SCE'
  },
  {
    name: 'ACC'
  },
  {
    name: 'SCM'
  },
  {
    name: 'HALL'
  },
  {
    name: 'SRH/G9'
  },
  {
    name: 'CVA'
  },
    // etc.
  ]);
  const testEvent1 = await Event.findOne({
    eventName: '1.HKBU student wins Macao Scientific and Technological Research and Development Award for Postgraduates'
  });
  const testEvent2 = await Event.findOne({
    eventName: '2.UGC Quality Audit Report commends HKBU for effective management of academic quality and standards in sub-degree operations'
  });
  const testEvent3 = await Event.findOne({
    eventName: '3.HKBU Information Day attracts 25,000 visitors to experience vibrant campus life'
  });
  const testEvent4 = await Event.findOne({
    eventName: '9.HKBU student wins Macao Scientific and Technological Research and Development Award for Postgraduates'
  });
  const testEvent5 = await Event.findOne({
    eventName: '10.UGC Quality Audit Report commends HKBU for effective management of academic quality and standards in sub-degree operations'
  });
  const testEvent6 = await Event.findOne({
    eventName: '11.HKBU Information Day attracts 25,000 visitors to experience vibrant campus life'
  });
  const testStudent1 = await User.findOne({
    username: 'student1'
  });
  const testStudent2 = await User.findOne({
    username: 'student3'
  });
  await User.addToCollection(testStudent1.id, 'registered').members([testEvent1.id, testEvent2.id, testEvent3.id, testEvent4.id, testEvent5.id, testEvent6.id]);
  await User.addToCollection(testStudent2.id, 'registered').members([testEvent1.id, testEvent2.id, testEvent3.id, testEvent4.id, testEvent5.id, testEvent6.id]);
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();
};
