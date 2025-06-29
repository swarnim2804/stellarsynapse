const zodiacData = [
  {
    name: 'Aries',
    range: 'March 21 – April 19',
    start: [3, 21],
    end: [4, 19],
    constellation: 'Aries the Ram',
    fact: 'A mid-sized constellation in the Northern Hemisphere, representing a ram.',
    myth: 'Symbolizes the golden ram that rescued Phrixus in Greek mythology.',
    bgImage: require('../assets/zodiac/aries.png')
  },
  {
    name: 'Taurus',
    range: 'April 20 – May 20',
    start: [4, 20],
    end: [5, 20],
    constellation: 'Taurus the Bull',
    fact: 'One of the oldest documented constellations; home to the Pleiades and Hyades.',
    myth: 'Associated with Zeus transforming into a bull to abduct Europa.',
    bgImage: require('../assets/zodiac/taurus.png')
  },
  {
    name: 'Gemini',
    range: 'May 21 – June 20',
    start: [5, 21],
    end: [6, 20],
    constellation: 'Gemini the Twins',
    fact: 'Features the twin stars Castor and Pollux, which are its brightest.',
    myth: 'Represents Castor and Pollux, twin brothers from Greek and Roman mythology.',
    bgImage: require('../assets/zodiac/gemini.png')
  },
  {
    name: 'Cancer',
    range: 'June 21 – July 22',
    start: [6, 21],
    end: [7, 22],
    constellation: 'Cancer the Crab',
    fact: 'A small, faint constellation; contains the Beehive Cluster.',
    myth: 'Sent by Hera to distract Heracles; crushed by Heracles during his labor.',
    bgImage: require('../assets/zodiac/cancer.png')
  },
  {
    name: 'Leo',
    range: 'July 23 – August 22',
    start: [7, 23],
    end: [8, 22],
    constellation: 'Leo the Lion',
    fact: 'Contains the bright star Regulus and resembles a crouching lion.',
    myth: 'Represents the Nemean Lion slain by Heracles.',
    bgImage: require('../assets/zodiac/leo.png')
  },
  {
    name: 'Virgo',
    range: 'August 23 – September 22',
    start: [8, 23],
    end: [9, 22],
    constellation: 'Virgo the Maiden',
    fact: 'The second-largest constellation; home to the bright star Spica.',
    myth: 'Linked to Astraea, the virgin goddess of justice and purity.',
    bgImage: require('../assets/zodiac/virgo.png')
  },
  {
    name: 'Libra',
    range: 'September 23 – October 22',
    start: [9, 23],
    end: [10, 22],
    constellation: 'Libra the Scales',
    fact: 'The only zodiac constellation symbolizing an object, not a living being.',
    myth: 'Associated with balance and fairness; linked to the Greek goddess Themis.',
    bgImage: require('../assets/zodiac/libra.png')
  },
  {
    name: 'Scorpio',
    range: 'October 23 – November 21',
    start: [10, 23],
    end: [11, 21],
    constellation: 'Scorpius the Scorpion',
    fact: 'Easily recognizable; contains the red supergiant star Antares.',
    myth: 'The scorpion that killed Orion, placed opposite him in the sky.',
    bgImage: require('../assets/zodiac/scorpio.png')
  },
  {
    name: 'Sagittarius',
    range: 'November 22 – December 21',
    start: [11, 22],
    end: [12, 21],
    constellation: 'Sagittarius the Archer',
    fact: 'Points toward the center of the Milky Way; includes the "Teapot" asterism.',
    myth: 'Represents the centaur Chiron, a wise and immortal archer.',
    bgImage: require('../assets/zodiac/sagittarius.png')
  },
  {
    name: 'Capricorn',
    range: 'December 22 – January 19',
    start: [12, 22],
    end: [1, 19],
    constellation: 'Capricornus the Sea-Goat',
    fact: 'One of the dimmest constellations; best viewed in early fall.',
    myth: 'Symbolizes the goat Amalthea or Pan, who transformed into a sea-goat to escape Typhon.',
    bgImage: require('../assets/zodiac/capricorn.png')
  },
  {
    name: 'Aquarius',
    range: 'January 20 – February 18',
    start: [1, 20],
    end: [2, 18],
    constellation: 'Aquarius the Water Bearer',
    fact: 'Large but faint; represents a man pouring water.',
    myth: 'Linked to Ganymede, cupbearer of the Greek gods.',
    bgImage: require('../assets/zodiac/aquarius.png')
  },
  {
    name: 'Pisces',
    range: 'February 19 – March 20',
    start: [2, 19],
    end: [3, 20],
    constellation: 'Pisces the Fish',
    fact: 'Spans the celestial equator; part of the water signs.',
    myth: 'Depicts Aphrodite and Eros transforming into fish to escape Typhon.',
    bgImage: require('../assets/zodiac/pisces.png')
  }
];

export default zodiacData;
