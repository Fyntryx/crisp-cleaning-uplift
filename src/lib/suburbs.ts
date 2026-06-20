export interface Suburb {
  name: string;
  slug: string;
  live: boolean;
}

export const suburbs: Suburb[] = [
  // Tier A - 14 Suburbs
  { name: "Brighton", slug: "brighton", live: false },
  { name: "North Melbourne", slug: "north-melbourne", live: false },
  { name: "Cheltenham", slug: "cheltenham", live: false },
  { name: "Essendon", slug: "essendon", live: false },
  { name: "Maribyrnong", slug: "maribyrnong", live: false },
  { name: "Bundoora", slug: "bundoora", live: false },
  { name: "Hampton", slug: "hampton", live: false },
  { name: "Brunswick", slug: "brunswick", live: false },
  { name: "Malvern", slug: "malvern", live: false },
  { name: "Point Cook", slug: "point-cook", live: false },
  { name: "Preston", slug: "preston", live: false },
  { name: "South Yarra", slug: "south-yarra", live: false },
  { name: "Toorak", slug: "toorak", live: false },
  { name: "Melbourne CBD", slug: "melbourne-cbd", live: false },

  // Tier B - 35 Suburbs
  { name: "Doncaster", slug: "doncaster", live: false },
  { name: "Doncaster East", slug: "doncaster-east", live: false },
  { name: "Mount Waverley", slug: "mount-waverley", live: false },
  { name: "Kew", slug: "kew", live: false },
  { name: "Hawthorn", slug: "hawthorn", live: false },
  { name: "Camberwell", slug: "camberwell", live: false },
  { name: "Glen Iris", slug: "glen-iris", live: false },
  { name: "Glen Waverley", slug: "glen-waverley", live: false },
  { name: "Bentleigh East", slug: "bentleigh-east", live: false },
  { name: "Moonee Ponds", slug: "moonee-ponds", live: false },
  { name: "Reservoir", slug: "reservoir", live: false },
  { name: "Caroline Springs", slug: "caroline-springs", live: false },
  { name: "Greensborough", slug: "greensborough", live: false },
  { name: "Footscray", slug: "footscray", live: false },
  { name: "Templestowe", slug: "templestowe", live: false },
  { name: "Balwyn North", slug: "balwyn-north", live: false },
  { name: "Brooklyn", slug: "brooklyn", live: false },
  { name: "Coburg", slug: "coburg", live: false },
  { name: "St Albans", slug: "st-albans", live: false },
  { name: "Mernda", slug: "mernda", live: false },
  { name: "Chelsea", slug: "chelsea", live: false },
  { name: "Ringwood", slug: "ringwood", live: false },
  { name: "Strathmore", slug: "strathmore", live: false },
  { name: "Werribee", slug: "werribee", live: false },
  { name: "Croydon", slug: "croydon", live: false },
  { name: "Windsor", slug: "windsor", live: false },
  { name: "Craigieburn", slug: "craigieburn", live: false },
  { name: "Richmond", slug: "richmond", live: false },
  { name: "Albert Park", slug: "albert-park", live: false },
  { name: "Carnegie", slug: "carnegie", live: false },
  { name: "Sandringham", slug: "sandringham", live: false },
  { name: "Box Hill", slug: "box-hill", live: false },
  { name: "Oakleigh", slug: "oakleigh", live: false },
  { name: "Yarraville", slug: "yarraville", live: false },
  { name: "Ivanhoe", slug: "ivanhoe", live: false }
];

export function getLiveSuburbs(): Suburb[] {
  return suburbs.filter(suburb => suburb.live);
}
