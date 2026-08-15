export type PropertyType = 'PG' | 'Hostel' | 'Shared flat';

export type Profile = {
  campus: string;
  budgetMin: number;
  budgetMax: number;
  moveIn: string;
  stayType: PropertyType;
  priorities: string[];
};

export type CategoryRatings = {
  safety: number;
  commute: number;
  food: number;
  cleanliness: number;
  value: number;
};

export type Review = {
  id: string;
  resident: string;
  stay: string;
  rating: number;
  text: string;
  label: 'SAMPLE / DEMO';
};

export type Property = {
  id: string;
  name: string;
  type: PropertyType;
  locality: string;
  rent: number;
  deposit: number;
  food: number;
  electricity: number;
  wifi: number;
  maintenance: number;
  facilities: string[];
  distance: number;
  commuteTime: number;
  commuteMode: string;
  owner: string;
  verificationStatus: string;
  verificationHash: string;
  blockchainTransactionHash: string;
  timestamp: string;
  rating: number;
  categoryRatings: CategoryRatings;
  reviews: Review[];
  checkedItems: string[];
};

export type MatchResult = { property: Property; score: number; explanation: string };

const demoReview = (id: string, resident: string, stay: string, rating: number, text: string): Review => ({
  id, resident, stay, rating, text, label: 'SAMPLE / DEMO',
});

export const defaultProfile: Profile = {
  campus: 'NIET',
  budgetMin: 6000,
  budgetMax: 8000,
  moveIn: '2026-09',
  stayType: 'PG',
  priorities: ['Safety', 'Good commute', 'Food'],
};

export const properties: Property[] = [
  {
    id: 'aranya-heights', name: 'Aranya Heights', type: 'PG', locality: 'Knowledge Park III', rent: 6800, deposit: 6800, food: 2200, electricity: 500, wifi: 250, maintenance: 0,
    facilities: ['2 meals daily', 'CCTV on every floor', 'Biometric entry', 'Housekeeping', 'Power backup', 'Study desks'], distance: 1.8, commuteTime: 9, commuteMode: 'e-rickshaw', owner: 'Meera Living Co.',
    verificationStatus: 'CampusNest checked', verificationHash: 'cnv_7f3a91d2e4b8', blockchainTransactionHash: '0x8b42e1a7f9c30d6e4b1a', timestamp: '2025-08-14 10:32 IST', rating: 4.6,
    categoryRatings: { safety: 4.8, commute: 4.7, food: 4.4, cleanliness: 4.5, value: 4.5 }, checkedItems: ['Owner identity', 'Address and photos', 'Facilities claimed', 'Rent and deposit', 'Resident touchpoint'],
    reviews: [demoReview('ah-1', 'A. Singh', '7 months', 5, 'The guard desk stays active late, and the walk to campus is simple. Food is consistent enough for a busy week.'), demoReview('ah-2', 'R. Mehta', '4 months', 4, 'Good first place in Greater Noida. Ask for the quieter side if you study late.')],
  },
  {
    id: 'saffron-square', name: 'Saffron Square', type: 'PG', locality: 'Alpha 1', rent: 7600, deposit: 7600, food: 1900, electricity: 650, wifi: 250, maintenance: 200,
    facilities: ['3 meals daily', 'CCTV at entry', 'Lift', 'Laundry area', 'Common lounge', 'Water purifier'], distance: 2.4, commuteTime: 12, commuteMode: 'shuttle + walk', owner: 'Saffron Homes',
    verificationStatus: 'CampusNest checked', verificationHash: 'cnv_2ac7d19e4f03', blockchainTransactionHash: '0x2e9a71c4d0be68f31a2c', timestamp: '2025-08-11 15:08 IST', rating: 4.4,
    categoryRatings: { safety: 4.5, commute: 4.2, food: 4.6, cleanliness: 4.3, value: 4.1 }, checkedItems: ['Owner identity', 'Address and photos', 'Facilities claimed', 'Rent and deposit'],
    reviews: [demoReview('ss-1', 'K. Verma', '11 months', 4, 'Meals are the reason I stayed. The common lounge is useful when my room feels small.')],
  },
  {
    id: 'the-nest-beta', name: 'The Nest Beta', type: 'Hostel', locality: 'Beta 1', rent: 6100, deposit: 5000, food: 1800, electricity: 450, wifi: 200, maintenance: 0,
    facilities: ['2 meals daily', 'Gated campus', 'CCTV', 'Shared study hall', 'Housekeeping', 'Rooftop'], distance: 3.2, commuteTime: 16, commuteMode: 'e-rickshaw', owner: 'Neststay Group',
    verificationStatus: 'CampusNest checked', verificationHash: 'cnv_b718a39c6d42', blockchainTransactionHash: '0x74df2c0a91b68e3d4f50', timestamp: '2025-08-09 09:44 IST', rating: 4.1,
    categoryRatings: { safety: 4.4, commute: 3.9, food: 4.0, cleanliness: 4.1, value: 4.5 }, checkedItems: ['Owner identity', 'Address and photos', 'Rent and deposit', 'Resident touchpoint'],
    reviews: [demoReview('tn-1', 'P. Kumar', '5 months', 4, 'Affordable and straightforward. The study hall makes up for the longer ride.')],
  },
  {
    id: 'olive-courtyard', name: 'Olive Courtyard', type: 'Shared flat', locality: 'Pari Chowk', rent: 7900, deposit: 12000, food: 0, electricity: 750, wifi: 300, maintenance: 500,
    facilities: ['Fully furnished', 'Modular kitchen', 'Balcony', 'Security gate', 'Washing machine', 'Metro access'], distance: 2.9, commuteTime: 14, commuteMode: 'walk + metro', owner: 'Saksham Properties',
    verificationStatus: 'CampusNest checked', verificationHash: 'cnv_91e50a7bc342', blockchainTransactionHash: '0x91c4a6de2f8b10c3756a', timestamp: '2025-08-06 13:19 IST', rating: 4.3,
    categoryRatings: { safety: 4.3, commute: 4.5, food: 3.1, cleanliness: 4.5, value: 3.8 }, checkedItems: ['Owner identity', 'Address and photos', 'Facilities claimed', 'Rent and deposit'],
    reviews: [demoReview('oc-1', 'N. Jain', '8 months', 4, 'Feels more like a home than a PG. Budget for cooking because there is no food plan.')],
  },
  {
    id: 'peepal-residency', name: 'Peepal Residency', type: 'PG', locality: 'Knowledge Park II', rent: 7350, deposit: 7350, food: 2100, electricity: 550, wifi: 250, maintenance: 100,
    facilities: ['3 meals daily', 'CCTV', 'Biometric entry', 'Laundry', 'Study desks', 'Water backup'], distance: 2.1, commuteTime: 11, commuteMode: 'e-rickshaw', owner: 'Peepal Student Homes',
    verificationStatus: 'CampusNest checked', verificationHash: 'cnv_4c72e9b1a05d', blockchainTransactionHash: '0x5f7a03b9c2d14e8a6f21', timestamp: '2025-08-03 17:26 IST', rating: 4.5,
    categoryRatings: { safety: 4.7, commute: 4.5, food: 4.3, cleanliness: 4.4, value: 4.2 }, checkedItems: ['Owner identity', 'Address and photos', 'Facilities claimed', 'Rent and deposit', 'Resident touchpoint'],
    reviews: [demoReview('pr-1', 'S. Rao', '6 months', 5, 'A calm building with a helpful manager. My commute to NIET takes about ten minutes door to door.')],
  },
  {
    id: 'mango-mews', name: 'Mango Mews', type: 'PG', locality: 'Gamma 2', rent: 6500, deposit: 6500, food: 2300, electricity: 550, wifi: 250, maintenance: 0,
    facilities: ['2 meals daily', 'CCTV at entry', 'Common terrace', 'Housekeeping', 'Power backup'], distance: 4.4, commuteTime: 21, commuteMode: 'bus', owner: 'Mews Living',
    verificationStatus: 'CampusNest checked', verificationHash: 'cnv_ae7319bc5d08', blockchainTransactionHash: '0x7c0e31f8a2d645b9e107', timestamp: '2025-07-29 11:03 IST', rating: 4.0,
    categoryRatings: { safety: 4.2, commute: 3.4, food: 4.4, cleanliness: 3.9, value: 4.3 }, checkedItems: ['Owner identity', 'Address and photos', 'Facilities claimed', 'Rent and deposit'],
    reviews: [demoReview('mm-1', 'D. Patel', '3 months', 4, 'Food is generous and the rent is fair. The bus timing needs some planning.')],
  },
  {
    id: 'cedar-court', name: 'Cedar Court', type: 'Hostel', locality: 'Delta 1', rent: 5900, deposit: 4000, food: 1600, electricity: 450, wifi: 150, maintenance: 0,
    facilities: ['2 meals daily', 'Gated entry', 'CCTV', 'Study hall', 'Sports area'], distance: 5.1, commuteTime: 24, commuteMode: 'shuttle', owner: 'Cedar Student Living',
    verificationStatus: 'CampusNest checked', verificationHash: 'cnv_06d7b9e31af2', blockchainTransactionHash: '0x3ab681d9e4f20c7a51d8', timestamp: '2025-07-25 14:41 IST', rating: 3.9,
    categoryRatings: { safety: 4.2, commute: 3.2, food: 3.8, cleanliness: 3.9, value: 4.4 }, checkedItems: ['Owner identity', 'Address and photos', 'Facilities claimed'],
    reviews: [demoReview('cc-1', 'M. Roy', '10 months', 4, 'A practical option when budget is the first filter. Shuttle is reliable during class hours.')],
  },
  {
    id: 'terracotta-lane', name: 'Terracotta Lane', type: 'Shared flat', locality: 'Alpha 2', rent: 7200, deposit: 10000, food: 0, electricity: 650, wifi: 300, maintenance: 400,
    facilities: ['Furnished rooms', 'Kitchen', 'Balcony', 'Security gate', 'Washing machine'], distance: 3.6, commuteTime: 18, commuteMode: 'e-rickshaw', owner: 'Lane & Leaf Realty',
    verificationStatus: 'CampusNest checked', verificationHash: 'cnv_3f821a7d0be4', blockchainTransactionHash: '0x6e20a8f4b17d39c5da61', timestamp: '2025-07-20 10:16 IST', rating: 4.2,
    categoryRatings: { safety: 4.1, commute: 4.1, food: 3.0, cleanliness: 4.2, value: 4.0 }, checkedItems: ['Owner identity', 'Address and photos', 'Facilities claimed', 'Rent and deposit'],
    reviews: [demoReview('tl-1', 'I. Gupta', '9 months', 4, 'Nice shared space for people who like cooking. Two grocery stores are close by.')],
  },
  {
    id: 'bluebell-house', name: 'Bluebell House', type: 'PG', locality: 'Knowledge Park III', rent: 8100, deposit: 8100, food: 2100, electricity: 600, wifi: 250, maintenance: 150,
    facilities: ['3 meals daily', 'CCTV', 'Biometric entry', 'Lift', 'Power backup', 'Laundry'], distance: 1.4, commuteTime: 8, commuteMode: 'walk', owner: 'Bluebell Homes',
    verificationStatus: 'CampusNest checked', verificationHash: 'cnv_7a6ce9104bd2', blockchainTransactionHash: '0x4d29f81c7e0a53b6d214', timestamp: '2025-07-16 16:55 IST', rating: 4.6,
    categoryRatings: { safety: 4.8, commute: 4.9, food: 4.5, cleanliness: 4.6, value: 3.7 }, checkedItems: ['Owner identity', 'Address and photos', 'Facilities claimed', 'Rent and deposit', 'Resident touchpoint'],
    reviews: [demoReview('bh-1', 'T. Shah', '5 months', 5, 'The closest option to campus, genuinely walkable. Slightly above my planned rent but convenient.')],
  },
  {
    id: 'gulmohar-casa', name: 'Gulmohar Casa', type: 'PG', locality: 'Beta 2', rent: 7000, deposit: 7000, food: 2000, electricity: 500, wifi: 250, maintenance: 100,
    facilities: ['2 meals daily', 'CCTV', 'Housekeeping', 'Common room', 'Water purifier'], distance: 3.8, commuteTime: 19, commuteMode: 'bus + walk', owner: 'Casa Student Stays',
    verificationStatus: 'CampusNest checked', verificationHash: 'cnv_61d08f3e9a47', blockchainTransactionHash: '0x8d41c0a7e5bf39d2610c', timestamp: '2025-07-11 12:10 IST', rating: 4.1,
    categoryRatings: { safety: 4.4, commute: 3.6, food: 4.1, cleanliness: 4.0, value: 4.1 }, checkedItems: ['Owner identity', 'Address and photos', 'Facilities claimed', 'Rent and deposit'],
    reviews: [demoReview('gc-1', 'A. Saini', '6 months', 4, 'Friendly manager and no surprise maintenance charge. Commute is okay once you learn the bus route.')],
  },
  {
    id: 'maple-arc', name: 'Maple Arc', type: 'Shared flat', locality: 'Pari Chowk', rent: 8300, deposit: 14000, food: 0, electricity: 700, wifi: 300, maintenance: 600,
    facilities: ['Fully furnished', 'Kitchen', 'Metro access', 'Security gate', 'Balcony'], distance: 2.6, commuteTime: 13, commuteMode: 'walk + metro', owner: 'Arc Habitat',
    verificationStatus: 'CampusNest checked', verificationHash: 'cnv_19e4a6bd7c02', blockchainTransactionHash: '0x2c6f81a4d9e037b5a26d', timestamp: '2025-07-07 09:22 IST', rating: 4.2,
    categoryRatings: { safety: 4.2, commute: 4.7, food: 3.0, cleanliness: 4.4, value: 3.6 }, checkedItems: ['Owner identity', 'Address and photos', 'Facilities claimed', 'Rent and deposit'],
    reviews: [demoReview('ma-1', 'V. Arora', '4 months', 4, 'The metro connection is excellent. Better for someone comfortable managing meals themselves.')],
  },
  {
    id: 'sunbird-studios', name: 'Sunbird Studios', type: 'PG', locality: 'Gamma 1', rent: 7750, deposit: 7750, food: 1950, electricity: 600, wifi: 300, maintenance: 150,
    facilities: ['2 meals daily', 'CCTV', 'Lift', 'Laundry', 'Study desks'], distance: 4.0, commuteTime: 20, commuteMode: 'shuttle', owner: 'Sunbird Spaces',
    verificationStatus: 'CampusNest checked', verificationHash: 'cnv_84b31f9e2ad0', blockchainTransactionHash: '0x1f7a3d9b2c6e50a4810d', timestamp: '2025-07-02 18:03 IST', rating: 4.0,
    categoryRatings: { safety: 4.1, commute: 3.7, food: 4.0, cleanliness: 4.1, value: 3.9 }, checkedItems: ['Owner identity', 'Address and photos', 'Facilities claimed', 'Rent and deposit'],
    reviews: [demoReview('sb-1', 'R. Das', '7 months', 4, 'Quiet rooms and good light. Shuttle is the main thing to confirm before signing.')],
  },
  {
    id: 'kadam-kunj', name: 'Kadam Kunj', type: 'Hostel', locality: 'Knowledge Park I', rent: 5600, deposit: 4500, food: 1700, electricity: 400, wifi: 150, maintenance: 0,
    facilities: ['2 meals daily', 'Gated entry', 'CCTV', 'Study hall', 'Housekeeping'], distance: 2.2, commuteTime: 12, commuteMode: 'e-rickshaw', owner: 'Kadam Campus Homes',
    verificationStatus: 'CampusNest checked', verificationHash: 'cnv_51b8e2d9a4c7', blockchainTransactionHash: '0x9c4e7a1d2b08f563a10e', timestamp: '2025-06-28 13:37 IST', rating: 4.0,
    categoryRatings: { safety: 4.1, commute: 4.3, food: 3.8, cleanliness: 3.9, value: 4.6 }, checkedItems: ['Owner identity', 'Address and photos', 'Facilities claimed', 'Rent and deposit'],
    reviews: [demoReview('kk-1', 'Y. Malik', '8 months', 4, 'Very good on monthly spend. Rooms are simple but the campus route is easy.')],
  },
];

export const effectiveCost = (property: Property) => property.rent + property.food + property.electricity + property.wifi + property.maintenance;

const clamp = (value: number) => Math.max(0, Math.min(100, value));

export function matchProperties(profile: Profile): MatchResult[] {
  return properties.map((property) => {
    const budgetScore = property.rent >= profile.budgetMin && property.rent <= profile.budgetMax
      ? 100 : clamp(100 - Math.abs(property.rent - (profile.budgetMin + profile.budgetMax) / 2) / 25);
    const distanceScore = clamp(100 - property.commuteTime * 2.7);
    const trustScore = property.verificationStatus === 'CampusNest checked' ? 96 : 50;
    const facilitiesScore = clamp((property.facilities.length / 6) * 100);
    const priorityValues = profile.priorities.map((priority) => {
      if (priority === 'Safety') return property.categoryRatings.safety * 20;
      if (priority === 'Good commute') return property.categoryRatings.commute * 20;
      if (priority === 'Food') return property.categoryRatings.food * 20;
      return property.categoryRatings.value * 20;
    });
    const lifestyleScore = priorityValues.length ? priorityValues.reduce((sum, value) => sum + value, 0) / priorityValues.length : property.categoryRatings.value * 20;
    const score = Math.round((budgetScore * .3) + (distanceScore * .25) + (trustScore * .2) + (facilitiesScore * .15) + (lifestyleScore * .1));
    const strongest = [...profile.priorities].slice(0, 2).join(' and ').toLowerCase();
    const explanation = `${property.name} fits your ${profile.budgetMin.toLocaleString('en-IN')}–${profile.budgetMax.toLocaleString('en-IN')} rent window, stays ${property.commuteTime} minutes from ${profile.campus}, and scores well on ${strongest || 'value'}. CampusNest has checked the listing details shown here.`;
    return { property, score, explanation };
  }).sort((a, b) => b.score - a.score || a.property.rent - b.property.rent);
}

export const getProperty = (id?: string) => properties.find((property) => property.id === id);

export const explorerUrl = (hash: string) => `https://www.oklink.com/amoy/tx/${hash}`;