const peopleData = [
  // Astronauts
  {
    name: 'Yuri Gagarin',
    role: 'Astronauts',
    category: "Astronauts",
    bio: 'First human in space (Vostok 1, 1961).',
    image: require('../assets/legends/yuri.png'),
    country:'USSR',
    years: '1960–1968',
    quote: '"I see Earth! It is so beautiful." – Yuri Gagarin'
  },
  {
    name: 'Neil Armstrong',
    role: 'Astronauts',
    category: "Astronauts",
    bio: 'First person on the Moon (Apollo 11, 1969).',
    image: require('../assets/legends/neil.png'),
    country:'USA',
    years: '1962–1971',
    quote: '"That is one small step for man, one giant leap for mankind." – Neil Armstrong'
  },
  {
    name: 'Buzz Aldrin',
    role: 'Astronauts',
    category: "Astronauts",
    bio: 'Second person to walk on the Moon (Apollo 11)',
    image: require('../assets/legends/buzz.png'),
    country:'USA',
    years: '1963–1971',
    quote: '"Beautiful view. Magnificent desolation." – Buzz Aldrin'
  },
  {
    name: 'John Glenn',
    role: 'Astronauts',
    category: "Astronauts",
    bio: ' First American to orbit Earth (1962)',
    image: require('../assets/legends/john.png'),    
    country: 'USA',
    years: '1962–1998',
    quote: '"To look out at this kind of creation and not believe in God is to me impossible." – John Glenn'
  },
  {
    name: 'Valery Polyakov',
    role: 'Astronauts',
    category: "Astronauts",
    bio: 'Longest single spaceflight (437 days on Mir)',
    image: require('../assets/legends/valery.png'),    
    country:'USSR',
    years: '1977–1995',
    quote: '"Health is the greatest treasure we have in space." – Valery Polyakov'
  },

  // Engineers
  {
    name: 'Wernher von Braun',
    role: 'Engineers',
    category: "Engineers",
    bio: 'Lead architect of Saturn V rocket.',
    image: require('../assets/legends/werhner.png'),    
    country:'Germany',
    years: '1930s–1970s',
    quote: 'Research is what I am doing when I do not know what I am doing." – Wernher von Braun'
  },
  {
    name: 'Sergey Korolev',
    role: 'Engineers',
    category: "Engineers",
    bio: 'Chief designer of Soviet space program.',
    image: require('../assets/legends/sergey.png'),    
    country:'USSR', 
    years: '1933–1966',
    quote: '"There is no such thing as an unsolvable problem." – Sergey Korolev'
  },
  {
    name: 'Robert Goddard',
    role: 'Engineers',
    category: "Engineers",
    bio: 'Pioneer of modern rocketry.',
    image: require('../assets/legends/robert.png'),    
    country:'USA',
    years: '1914–1945',
    quote: '"It is difficult to say what is impossible, for the dream of yesterday is the hope of today." – Robert Goddard'
  },
  {
    name: 'Kalpana Chawla',
    role: 'Engineers',
    category: "Engineers",
    bio: 'Kalpana Chawla.',
    image: require('../assets/legends/kalpana.png'),    
    country:'India/USA',
    years: '1997–2003',
    quote: '"The path from dreams to success does exist." – Kalpana Chawla'
  },
  {
    name: 'Rakesh Sharma"',
    role: 'Engineers',
    category: "Engineers",
    bio: 'First Indian in space (Soyuz T-11).',
    image: require('../assets/legends/rakesh.png'),    
    country:'India',
    years: '1984',
    quote: '"Sare jahan se accha." – Rakesh Sharma"'
  },

  // Astrophysicists
  {
    name: 'Stephen Hawking',
    role: 'Astrophysicists',
    category: "Astrophysicists",
    bio: 'Hawking radiation & black hole theories.',
    image: require('../assets/legends/stephen.png'),    
    country:'UK',
    years: '1965–2018',
    quote: '"Look up at the stars and not down at your feet." – Stephen Hawking'
  },
  {
    name: 'Carl Sagan',
    role: 'Astrophysicists',
    category: "Astrophysicists",
    bio: 'Cosmos series, exobiology, Voyager mission.',
    image: require('../assets/legends/carl.png'),    
    country: "USA",
    years: '1960–1996',
    quote: ' "We are made of star stuff." – Carl Sagan'
  },
  {
    name: 'Subrahmanyan Chandrasekhar',
    role: 'Astrophysicists',
    category: "Astrophysicists",
    bio: 'Chandrasekhar limit in stellar evolution.',
    image: require('../assets/legends/subra.png'),    
    country: "India/USA",
    years: '1930–1995',
    quote: '"Science is a perception of the world around us." – Subrahmanyan Chandrasekhar'
  },
  {
    name: 'Vera Rubin',
    role: 'Astrophysicists',
    category: "Astrophysicists",
    bio: 'Dark matter evidence via galaxy rotation curves.',
    image: require('../assets/legends/vera.png'),    
    country: "USA",
    years: '1965–2000',
    quote: '"Science progresses best when observations force us to alter our preconceptions." – Vera Rubin'
  },
  {
    name: 'Neil deGrasse Tyson',
    role: 'Astrophysicists',
    category: "Astrophysicists",
    bio: 'Science communicator, Cosmos reboot.',
    image: require('../assets/legends/neil_de.png'),    
    country: "USA",
    years: '1995–present',
    quote: ' "The good thing about science is that it is true whether or not you believe in it." – Neil deGrasse Tyson'
  },

  // Women in Space
  {
    name: 'Valentina Tereshkova',
    role: 'Cosmonaut',
    category: "Women in Space",
    bio: 'First woman in space (Vostok 6).',
    image: require('../assets/legends/valentina.png'),    
    country: "USSR",
    years: '1963',
    quote: '"A bird cannot fly with one wing only." – Valentina Tereshkova'
  },
  {
    name: 'Sally Ride',
    role: 'Astronaut',
    category: "Women in Space",
    bio: 'First American woman in space (STS-7).',
    image: require('../assets/legends/sally.png'),    
    country: "USA",
    years: '1983–1987',
    quote: '"Science is fun. Science is curiosity." – Sally Ride'
  },
  {
    name: 'Peggy Whitson',
    role: 'Astronaut',
    category: "Women in Space",
    bio: 'Record for most days in space (665 days).',
    image: require('../assets/legends/peggy.png'),    
    country: "USA",
    years: '1996–2017',
    quote: '"Be true to yourself, work hard, and make it happen." – Peggy Whitson'
  },
  {
    name: 'Sunita Williams',
    role: 'Astronaut',
    category: "Women in Space",
    bio: 'Longest spacewalk time by a woman.',
    image: require('../assets/legends/sunita.png'),    
    country: "India/USA",
    years: '2006–present',
    quote: '"It’s a real privilege to be in space." –Sunita Williams'
  },
  {
    name: 'Mae Jemison',
    role: 'Astronaut',
    category: "Women in Space",
    bio: 'First African-American woman in space.',
    image: require('../assets/legends/mae.png'),    
    country: "USA",
    years: '1992',
    quote: '"Never be limited by other people’s limited imaginations." – Woman in Space 5'
  },

  // Mission Commanders
  {
    name: 'Chris Hadfield',
    role: 'Commanders',
    category: "Mission Commanders",
    bio: 'ISS Commander, viral space videos.',
    image: require('../assets/legends/chris.png'),    
    country: "Canada",
    years: '1995–2013',
    quote: '"Decide in your heart of hearts what really excites and challenges you." – Chris Hadfield'
  },
  {
    name: 'Gene Kranz',
    role: 'Flight Director',
    category: "Mission Commanders",
    bio: 'Apollo 13 Mission Control leader',
    image: require('../assets/legends/gene.png'),    
    country: "USA",
    years: '1960–1994',
    quote: '"Failure is not an option." – Gene Kranz'
  },
  {
    name: 'Jim Lovell',
    role: 'Commanders',
    category: "Mission Commanders",
    bio: 'Commander of Apollo 13.',
    image: require('../assets/legends/jim.png'),    
    country: "USA",
    years: '1962–1973',
    quote: '"Be thankful for problems. If they were less difficult, someone with less ability might have your job." – Jim Lovell'
  },
  {
    name: 'Alan Shepard',
    role: 'Commanders',
    category: "Mission Commanders",
    bio: 'First American in space; Apollo 14 commander.',
    image: require('../assets/legends/alan.png'),    
    country: "USA",
    years: '1961–1971',
    quote: '"Why don’t you fix your little problem and light this candle?" – Alan Shepard'
  },
  {
    name: 'Eileen Collins',
    role: 'Commanders',
    category: "Mission Commanders",
    bio: 'First female Space Shuttle commander.',
    image: require('../assets/legends/eileen.png'),    
    country: "USA",
    years: '1995–2006',
    quote: '"When you look at Earth from space, you see a peaceful place." – Mission Commander 5'
  },
];

export default peopleData;
