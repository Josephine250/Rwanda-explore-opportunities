// Sample content only: all events, organisers and numbers are fictional.
// `capacity` = number of places still available (0 means fully booked).
// `price` is in Rwandan francs (RWF); 0 means free.
 
export const CATEGORIES = [
  'Workshop',
  'Career event',
  'Community activity',
  'Short course',
]
 
export const seedOpportunities = [
  {
    id: 'opp-001',
    title: 'Intro to Web Design Workshop',
    category: 'Workshop',
    city: 'Kigali',
    date: '2026-12-05',
    description:
      'A hands-on Saturday session covering layout, colour and typography. Bring a laptop; we provide the practice brief.',
    capacity: 18,
    price: 0,
    featured: true,
  },
  {
    id: 'opp-002',
    title: 'Kigali Tech Careers Fair',
    category: 'Career event',
    city: 'Kigali',
    date: '2026-12-12',
    description:
      'Meet local startups and employers, get your CV reviewed and join short talks on entry-level tech roles.',
    capacity: 120,
    price: 0,
    featured: true,
  },
  {
    id: 'opp-003',
    title: 'Lake Kivu Clean-up Day',
    category: 'Community activity',
    city: 'Rubavu',
    date: '2026-12-06',
    description:
      'Join neighbours along the shoreline to collect plastic waste. Gloves and refreshments are provided.',
    capacity: 60,
    price: 0,
    featured: false,
  },
  {
    id: 'opp-004',
    title: 'Beginner Python in 4 Weeks',
    category: 'Short course',
    city: 'Huye',
    date: '2027-01-11',
    description:
      'Evening classes that take you from variables to small programs. Includes weekly practice exercises.',
    capacity: 0,
    price: 25000,
    featured: false,
  },
  {
    id: 'opp-005',
    title: 'Mountain Gorilla Guide Training',
    category: 'Short course',
    city: 'Musanze',
    date: '2027-01-18',
    description:
      'Learn wildlife basics, visitor safety and storytelling for tourism guides near Volcanoes National Park.',
    capacity: 12,
    price: 45000,
    featured: true,
  },
  {
    id: 'opp-006',
    title: 'CV and Interview Skills Clinic',
    category: 'Workshop',
    city: 'Huye',
    date: '2026-12-09',
    description:
      'Practise common interview questions in small groups and leave with a polished one-page CV.',
    capacity: 5,
    price: 3000,
    featured: false,
  },
  {
    id: 'opp-007',
    title: 'Community Tree Planting Morning',
    category: 'Community activity',
    city: 'Musanze',
    date: '2026-11-28',
    description:
      'Plant indigenous seedlings on a hillside with local cooperatives. Wear sturdy shoes.',
    capacity: 80,
    price: 0,
    featured: false,
  },
  {
    id: 'opp-008',
    title: 'Digital Marketing Basics',
    category: 'Short course',
    city: 'Kigali',
    date: '2027-02-02',
    description:
      'Six sessions on social media, simple analytics and writing for small businesses.',
    capacity: 22,
    price: 30000,
    featured: false,
  },
  {
    id: 'opp-009',
    title: 'Women in Agribusiness Meetup',
    category: 'Career event',
    city: 'Rusizi',
    date: '2026-12-18',
    description:
      'Networking and mentoring for young women exploring careers in farming, processing and trade.',
    capacity: 40,
    price: 2000,
    featured: false,
  },
  {
    id: 'opp-010',
    title: 'Photography for Storytelling',
    category: 'Workshop',
    city: 'Rubavu',
    date: '2027-01-24',
    description:
      'Learn framing and light using only a phone camera, then build a small photo story from the lakeside.',
    capacity: 0,
    price: 8000,
    featured: true,
  },
  {
    id: 'opp-011',
    title: 'Youth Coding Club Open Day',
    category: 'Community activity',
    city: 'Kigali',
    date: '2026-11-21',
    description:
      'Try games, robots and beginner coding puzzles with volunteer mentors. Open to ages 12 to 18.',
    capacity: 35,
    price: 0,
    featured: false,
  },
  {
    id: 'opp-012',
    title: 'Hospitality and Customer Service Course',
    category: 'Short course',
    city: 'Rusizi',
    date: '2027-02-15',
    description:
      'Practical training for hotel and restaurant roles, including communication and handling complaints.',
    capacity: 3,
    price: 20000,
    featured: false,
  },
]
 