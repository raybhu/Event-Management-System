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

  if (await Event.count() > 0) {
    return done();
  }

  await Event.createEach([
    {
      eventName: "HKBU student wins Macao Scientific and Technological Research and Development Award for Postgraduates",
      shortDescription: "浸大生榮獲澳門研究生科技研發獎",
      fullDescription: "PhD student Lin Xuelei from the Department of Mathematics has won the prestigious 2018 Macao Scientific and Technological Research and Development Award for Postgraduates. Presented by the Macao Science and Technology Development Fund, Xuelei was recognised for his contribution to the development of science and technology in Macau, and specifically for his work in the area of partial differential equations. Prior to joining HKBU, Xuelei studied for his Master’s degree at the University of Macau. He expressed his gratitude to all his teachers and, in particular, his PhD supervisor Professor Michael Ng, Head of HKBU Department of Mathematics. In the future, Xuelei plans to contribute to the development of scientific computing, and to take part in more academic conferences and overseas exchange activities to expand the scope of his research.",
      imageUrl: "http://hkbuenews.hkbu.edu.hk/images/.w215h159/20181016-maths.jpg",
      organizer: "HKBU",
      eventDate: "2018-10-30",
      time: "12:00",
      venue: "AAB",
      quota: "50",
      highlightedEvent: true,
    },
    {
      eventName: "HKBU Information Day attracts 25,000 visitors to experience vibrant campus life",
      shortDescription: "浸大入學資訊日吸引逾25,000人參與",
      fullDescription: "More than 25,000 prospective secondary school students and visitors joined the Information Day for Undergraduate Admission at HKBU on 13 October. They gained the most up-to-date information on the University’s development and its undergraduate programmes and experienced HKBU’s unique campus life. Four new undergraduate programmes will be offered by HKBU from 2019-20, subject to the formal approval by the University. The programmes are: Bachelor of Music in Creative Industries, Bachelor of Science -- Bioresource and Agricultural Science Major, Geography/ History/ Sociology and Personal, Social and Humanities Education Teaching (Double Degree), and Bachelor of Science in Business Computing and Data Analytics.",
      imageUrl: "http://hkbuenews.hkbu.edu.hk/images/.w215h159/20181016-maths.jpg",
      organizer: "HKBU",
      eventDate: "2018-10-30",
      time: "12:00",
      venue: "AAB",
      quota: "50",
      highlightedEvent: false,
    },
  ]);

  if (await Organizer.count() > 0) {
    return done();
  }

  await Organizer.createEach([
    { name: "Martin Choy" },
    { name: "Kenny Cheng" }
    // etc.
  ]);

  if (await Venue.count() > 0) {
    return done();
  }

  await Venue.createEach([
    { name: "AAB" },
    { name: "RRS" },
    { name: "FSC" },
    { name: "YSS" },
    { name: "SCT" },
    { name: "LT" },
    { name: "OEE" },
    { name: "OEW" },
    { name: "OEM" },
    { name: "CEC" },
    { name: "CHAP" },
    { name: "LMC" },
    { name: "AC HALL" },
    { name: "AST" },
    { name: "ASH" },
    { name: "MHALL" },
    { name: "ACTR" },
    { name: "FITR" },
    { name: "SQCT" },
    { name: "SWPL" },
    { name: "SWT" },
    { name: "AML" },
    { name: "WLB" },
    { name: "DLB" },
    { name: "SHSH" },
    { name: "SCC" },
    { name: "JSC" },
    { name: "TNSCT" },
    { name: "GOLF" },
    { name: "MPC" },
    { name: "SCE" },
    { name: "ACC" },
    { name: "SCM" },
    { name: "HALL" },
    { name: "SRH/G9" },
    { name: "CVA" },
    // etc.
  ]);

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
