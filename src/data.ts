/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Teacher, ClassInfo, SchoolEvent } from './types';

export const IMAGE_ASSETS = {
  heroBg: new URL('./assets/images/CZschoolBG.jpg', import.meta.url).href,
  learningBg: new URL('./assets/images/learning_illustration_1783514037198.jpg', import.meta.url).href,
  activitiesBg: new URL('./assets/images/activities_illustration_1783514049730.jpg', import.meta.url).href,
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
    name: 'Veronika Machalova',
    roleEn: 'Director & Founder',
    roleCz: 'Ředitelka a zakladatelka',
    bioEn: 'Director and founder of Czech School Warwick, supporting the school community and its bilingual education programme.',
    bioCz: 'Ředitelka a zakladatelka České školy Warwick, která podporuje školní komunitu a bilingvní vzdělávání dětí.',
    featured: true,
  },
  {
    id: 'daniela',
    name: 'Daniela Holloway',
    roleEn: 'Supporting Director & Teacher',
    roleCz: 'Podpůrná ředitelka a učitelka',
    bioEn: 'Supporting director and teacher, helping to coordinate the school and create a welcoming learning environment for children and families.',
    bioCz: 'Podpůrná ředitelka a učitelka, která pomáhá s koordinací školy a vytváří přátelské prostředí pro děti i rodiny.',
    featured: true,
  },
  {
    id: 'marie',
    name: 'Marie Stepanova',
    roleEn: 'Supporting Director',
    roleCz: 'Podpůrná ředitelka',
    bioEn: 'Supporting director, helping the school team organise activities and provide a warm, consistent experience for families.',
    bioCz: 'Podpůrná ředitelka, která pomáhá školnímu týmu s organizací aktivit a vytvářením příjemného prostředí pro rodiny.',
    featured: true,
  },
  {
    id: 'irena',
    name: 'Irena Cerna',
    roleEn: 'Teacher',
    roleCz: 'Učitelka',
    bioEn: 'Teacher at Czech School Warwick, helping children develop their Czech language skills through engaging lessons and shared activities.',
    bioCz: 'Učitelka v České škole Warwick, která pomáhá dětem rozvíjet český jazyk prostřednictvím poutavé výuky a společných aktivit.',
    featured: false,
  },
  {
    id: 'jiri',
    name: 'Jiri Stepan',
    roleEn: 'Teacher',
    roleCz: 'Učitel',
    bioEn: 'Teacher at Czech School Warwick, encouraging children to use Czech naturally through conversation, stories, and play.',
    bioCz: 'Učitel v České škole Warwick, který podporuje přirozené používání češtiny prostřednictvím rozhovorů, příběhů a her.',
    featured: false,
  },
  {
    id: 'lenka',
    name: 'Lenka Hrabovska',
    roleEn: 'Teacher',
    roleCz: 'Učitelka',
    bioEn: 'Teacher at Czech School Warwick, bringing creativity, care, and practical language activities into each lesson.',
    bioCz: 'Učitelka v České škole Warwick, která do každé lekce přináší tvořivost, péči a praktické jazykové aktivity.',
    featured: false,
  },
  {
    id: 'gabriela',
    name: 'Gabriela Roberts Vesela',
    roleEn: 'Teacher',
    roleCz: 'Učitelka',
    bioEn: 'Teacher at Czech School Warwick, sharing Czech language and culture through lively, age-appropriate learning activities.',
    bioCz: 'Učitelka v České škole Warwick, která předává český jazyk a kulturu prostřednictvím živých aktivit přizpůsobených věku dětí.',
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
      nameEn: 'Term 1 (September - February)',
      nameCz: '1. pololetí (září - únor)',
      sessions: 13,
      priceChild: 195,
      priceSibling: 162.50,
      dates: ['06.09.2026', '13.09.2026', '20.09.2026', '04.10.2026', '18.10.2026', '15.11.2026', '29.11.2026', '06.12.2026', '13.12.2026', '10.01.2027', '24.01.2027', '07.02.2027', '28.02.2027']
    },
    {
      id: 'term2',
      nameEn: 'Term 2 (March - July)',
      nameCz: '2. pololetí (březen - červenec)',
      sessions: 8,
      priceChild: 120,
      priceSibling: 100,
      dates: ['14.03.2027', '21.03.2027', '18.04.2027', '25.04.2027', '02.05.2027', '23.05.2027', '13.06.2027', '04.07.2027']
    }
  ]
};

export const EVENTS_DATA: SchoolEvent[] = [
  { id: '2026-09-06', dateEn: '6 Sep 2026', dateCz: '6. 9. 2026', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2026-09-13', dateEn: '13 Sep 2026', dateCz: '13. 9. 2026', titleEn: 'Family trip', titleCz: 'Rodinný výlet' },
  { id: '2026-09-20', dateEn: '20 Sep 2026', dateCz: '20. 9. 2026', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2026-10-04', dateEn: '4 Oct 2026', dateCz: '4. 10. 2026', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2026-10-18', dateEn: '18 Oct 2026', dateCz: '18. 10. 2026', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2026-11-15', dateEn: '15 Nov 2026', dateCz: '15. 11. 2026', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2026-11-29', dateEn: '29 Nov 2026', dateCz: '29. 11. 2026', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2026-12-06', dateEn: '6 Dec 2026', dateCz: '6. 12. 2026', titleEn: 'School + Mikuláš', titleCz: 'Škola + Mikuláš' },
  { id: '2026-12-13', dateEn: '13 Dec 2026', dateCz: '13. 12. 2026', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2027-01-10', dateEn: '10 Jan 2027', dateCz: '10. 1. 2027', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2027-01-24', dateEn: '24 Jan 2027', dateCz: '24. 1. 2027', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2027-02-07', dateEn: '7 Feb 2027', dateCz: '7. 2. 2027', titleEn: 'School + Masopust', titleCz: 'Škola + Masopust' },
  { id: '2027-02-28', dateEn: '28 Feb 2027', dateCz: '28. 2. 2027', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2027-03-14', dateEn: '14 Mar 2027', dateCz: '14. 3. 2027', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2027-03-21', dateEn: '21 Mar 2027', dateCz: '21. 3. 2027', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2027-04-18', dateEn: '18 Apr 2027', dateCz: '18. 4. 2027', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2027-04-25', dateEn: '25 Apr 2027', dateCz: '25. 4. 2027', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2027-05-02', dateEn: '2 May 2027', dateCz: '2. 5. 2027', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2027-05-23', dateEn: '23 May 2027', dateCz: '23. 5. 2027', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2027-06-13', dateEn: '13 Jun 2027', dateCz: '13. 6. 2027', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2027-07-04', dateEn: '4 Jul 2027', dateCz: '4. 7. 2027', titleEn: 'School day', titleCz: 'Školní výuka' },
  { id: '2027-07-09-11', dateEn: '9-11 Jul 2027', dateCz: '9.-11. 7. 2027', titleEn: 'Camping', titleCz: 'Stanovačka' },
];

export const CONTACT_DETAILS = {
  address: '11 Nelson Ave, Warwick CV34 5LY',
  postalAddress: '11 Nelson Ave, Warwick CV34 5LY',
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
