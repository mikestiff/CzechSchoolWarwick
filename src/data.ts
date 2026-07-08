/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Teacher, ClassInfo, TermFee } from './types';

export const IMAGE_ASSETS = {
  heroBg: '/src/assets/images/hero_background_1783514023543.jpg',
  learningBg: '/src/assets/images/learning_illustration_1783514037198.jpg',
  activitiesBg: '/src/assets/images/activities_illustration_1783514049730.jpg',
};

export const CLASSES_DATA: ClassInfo[] = [
  {
    id: 'nursery',
    nameEn: 'Rákosníčci Nursery',
    nameCz: 'Školka Rákosníčci',
    age: '3 - 5 years',
    descriptionEn: 'Introduction to Czech language through playful rhymes, storytelling, puppet theater, and visual games.',
    descriptionCz: 'Hravé seznámení s českým jazykem prostřednictvím říkanek, pohádek, loutkového divadla a barevných her.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'mravenecci',
    nameEn: 'Mravenečci Class',
    nameCz: 'Třída Mravenečci',
    age: '5 - 6 years',
    descriptionEn: 'Focus on expanding vocabulary, basic pronunciation patterns, active speaking, and simple pre-school activities.',
    descriptionCz: 'Rozšiřování slovní zásoby, správná výslovnost, aktivní mluvení a předškolní příprava hrou.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'sovicky',
    nameEn: 'Sovičky Class',
    nameCz: 'Třída Sovičky',
    age: '7 - 8 years',
    descriptionEn: 'Interactive reading and writing basics in Czech, exploring Czech folk tales, traditions, and simple vocabulary building.',
    descriptionCz: 'Základy čtení a psaní v českém jazyce, poznávání českých pohádek, tradic a tvořivé rozvíjení slovní zásoby.',
    color: 'from-sky-400 to-indigo-500',
  },
  {
    id: 'vsevedi',
    nameEn: 'Vševědi Class',
    nameCz: 'Třída Vševědi',
    age: '9+ years',
    descriptionEn: 'Advanced grammar, Czech geography, historical milestones, and reading Czech literature for older children.',
    descriptionCz: 'Pokročilá gramatika, základy českého zeměpisu, dějepisu a četba české literatury pro starší děti.',
    color: 'from-purple-400 to-pink-500',
  },
  {
    id: 'playgroup',
    nameEn: 'Czech & Slovak Playgroup',
    nameCz: 'Česko-Slovenská Herna',
    age: '0+ years',
    descriptionEn: 'A welcoming social space for babies, toddlers, and their parents to sing, play, and speak Czech or Slovak.',
    descriptionCz: 'Příjemné herní a diskuzní prostředí pro miminka, batolata a rodiče k setkávání, zpívání a povídání.',
    color: 'from-rose-400 to-red-500',
  }
];

export const TEACHERS_DATA: Teacher[] = [
  {
    id: 'veronika',
    name: 'Dr. Veronika Machalová',
    roleEn: 'Director of Czech & Slovak Club England CIC',
    roleCz: 'Ředitelka Czech & Slovak Club England CIC',
    bioEn: 'I qualified as a medical doctor in Pilsen. My passion is supporting the bilingual education of Czech children in England, fostering strong cultural ties, and managing the overall direction of the club.',
    bioCz: 'Vystudovala jsem medicínu na Univerzitě Karlově v Plzni. Mým cílem a radostí je podporovat dvojjazyčné vzdělávání českých dětí v Anglii, upevňovat kulturní vazby a vést chod našeho klubu.',
    featured: true,
  },
  {
    id: 'irena',
    name: 'Irena Černá',
    roleEn: 'Head Teacher',
    roleCz: 'Vedoucí učitelka',
    bioEn: 'I studied at the Pedagogical Faculty of the University of West Bohemia in Pilsen. In the Czech Republic, I worked as a primary school teacher for 30 years. My goal is to build an engaging and friendly learning environment.',
    bioCz: 'Studovala jsem Pedagogickou fakultu Západočeské univerzity v Plzni. V Čechách jsem působila jako učitelka na 1. stupni základní školy přes 30 let. Chci u dětí budovat sebedůvěru a nadšení pro mateřský jazyk.',
    featured: true,
  },
  {
    id: 'jana',
    name: 'Jana Dar',
    roleEn: 'Deputy Director & Teacher',
    roleCz: 'Zástupkyně ředitelky a učitelka',
    bioEn: 'I come from Slovakia and studied Czech Philology at Charles University in Prague, with a focus on foreign language didactics. Czech language is my destiny! I have taught Czech to foreigners for years and moved to the UK in 2017.',
    bioCz: 'Pocházím ze Slovenska a vystudovala jsem českou filologii na Karlově univerzitě v Praze se zaměřením na didaktiku jazyků. Čeština je můj osud! Dlouhodobě vyučuji češtinu pro cizince, do UK jsem se přestěhovala v roce 2017.',
    featured: true,
  },
  {
    id: 'marta',
    name: 'Marta Filipová',
    roleEn: 'Founder of Czech Club Birmingham CIC & Advisor',
    roleCz: 'Zakladatelka Czech Club Birmingham CIC a poradkyně',
    bioEn: 'An art historian working at the University of Birmingham. I earned my PhD at the University of Glasgow. I am deeply interested in art and identity, which makes me passionate about preserving Czech culture and language in the West Midlands.',
    bioCz: 'Historička umění působící na University of Birmingham. Doktorát jsem získala na University of Glasgow. Zajímám se o vztah mezi uměním a identitou, proto chci pomáhat uchovat bohatství české kultury pro naše děti.',
    featured: false,
  },
  {
    id: 'lucie',
    name: 'Lucie Mason',
    roleEn: 'Director of Czech & Slovak Club England CIC',
    roleCz: 'Ředitelka Czech & Slovak Club England CIC',
    bioEn: 'Originally from Zlín. After studying tourism and English at Vocational College, I moved to the UK. I dedicate my free time to organizing cultural events and facilitating a supportive environment for our community.',
    bioCz: 'Pocházím ze Zlína. Po studiu cestovního ruchu a angličtiny jsem odešla do Británie. Svůj čas věnuji organizaci kulturních aktivit a vytváření vstřícného a inspirativního zázemí pro celou naši komunitu.',
    featured: false,
  },
  {
    id: 'katerina',
    name: 'Katerina Henderson',
    roleEn: 'Teacher & Volunteer',
    roleCz: 'Učitelka a dobrovolnice',
    bioEn: 'Living in England since 2005, working in banking. Inspired by my daughter, I decided to active help preserve Czech culture. Working here is incredibly fulfilling, especially building a bridge to the Czech world for our kids.',
    bioCz: 'V Anglii žiji od roku 2005. Pracuji v bankovnictví a díky dceři jsem se zapojila jako dobrovolnice v České škole. Tato práce mě naplňuje a těší mě pomáhat dětem objevovat svět českého jazyka a tradic.',
    featured: false,
  },
  {
    id: 'radka',
    name: 'Radka Murray',
    roleEn: 'Teacher',
    roleCz: 'Učitelka',
    bioEn: 'Living in the UK since 2001. I joined the school to teach and share Czech traditions, focusing on creative language lessons that combine music and interactive games to keep children engaged.',
    bioCz: 'Žiji v Británii od roku 2001. V České škole učím s důrazem na tvořivost, písničky a hry, které dětem usnadňují přirozené osvojování mateřského jazyka.',
    featured: false,
  },
  {
    id: 'iva',
    name: 'Iva Karásková',
    roleEn: 'Playgroup Teacher',
    roleCz: 'Učitelka v herně',
    bioEn: 'Originally from the Czech Highlands. I run playgroup sessions where babies and toddlers take their first steps into the Czech and Slovak languages through movement, singing, and colorful sensory play.',
    bioCz: 'Pocházím z Českomoravské vysočiny. Vedu dětskou hernu, kde nejmenší děti dělají své první krůčky do světa češtiny a slovenštiny skrze pohyb, zpěv a zábavné hry s rodiči.',
    featured: false,
  },
  {
    id: 'marketa',
    name: 'Markéta Nováková',
    roleEn: 'Teacher',
    roleCz: 'Učitelka',
    bioEn: 'Hailing from the beautiful Czech Paradise. After studying Czech and English, I moved to the UK. I focus on engaging lessons, using modern textbooks and classic Czech fairytales to build children\'s reading and writing fluency.',
    bioCz: 'Pocházím z Českého ráje. Po studiu češtiny a angličtiny jsem se přestěhovala do Anglie. Ve své výuce kladu důraz na interaktivitu, moderní české slabikáře a čtení pohádek.',
    featured: false,
  }
];

export const FEES_DATA = {
  sessionFeeChild: 15,
  sessionFeeSibling: 12.50,
  bankDetails: {
    accountName: 'Czech & Slovak Club England CIC',
    accountNumber: '93715175',
    sortCode: '20-07-82',
    reference: 'Name of your child / Jméno dítěte'
  },
  terms: [
    {
      id: 'term1',
      nameEn: 'Term 1 (Sep - Dec)',
      nameCz: '1. trimestr (Září - Prosinec)',
      sessions: 8,
      priceChild: 120,
      priceSibling: 100,
      dates: ['07.09', '21.09', '05.10', '19.10', '09.11', '23.11', '07.12']
    },
    {
      id: 'term2',
      nameEn: 'Term 2 (Jan - Mar)',
      nameCz: '2. trimestr (Leden - Březen)',
      sessions: 5,
      priceChild: 75,
      priceSibling: 62.50,
      dates: ['11.01', '25.01', '08.02', '01.03', '15.03']
    },
    {
      id: 'term3',
      nameEn: 'Term 3 (Apr - Jul)',
      nameCz: '3. trimestr (Duben - Červenec)',
      sessions: 7,
      priceChild: 105,
      priceSibling: 87.50,
      dates: ['19.04', '26.04', '10.05', '17.05', '07.06', '21.06', '05.07']
    }
  ]
};

export const CONTACT_DETAILS = {
  address: 'Emscote Infant School, All Saints Road, Warwick, CV34 5NH',
  postalAddress: '4 Arden Close, Warwick, CV34 5SN',
  companyNo: '08626847 (Registered with Companies House England & Wales)',
  timeEn: 'Sundays bi-weekly (as per calendar), 10:30am - 1:30pm (including lunch break)',
  timeCz: 'Neděle dvoutýdenně (dle kalendáře), 10:30 - 13:30 (včetně přestávky na oběd)',
  emails: {
    czechSchool: 'czechschoolwarwick@czskclubengland.co.uk',
    slovakSchool: 'slovakschoolwarwick@czskclubengland.co.uk',
    general: 'info@czskclubengland.co.uk'
  },
  socials: {
    facebook: 'https://www.facebook.com/CzechSchoolWarwick'
  }
};
