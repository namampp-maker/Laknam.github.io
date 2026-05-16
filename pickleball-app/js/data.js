/* ─────────────────────────────────────────────────────────
   SmashPoint — Mock Data
   Bangkok-focused: Thai names, THB prices, real districts
   ───────────────────────────────────────────────────────── */

// ── Districts ──────────────────────────────────────────────
const districts = [
  "Sukhumvit", "Silom", "Sathorn", "Thonglor", "Ekkamai",
  "Ari", "Ladprao", "Ramkhamhaeng", "On Nut", "Bangna",
  "Chatuchak", "Nonthaburi", "Samut Prakan", "Ratchada", "Huai Khwang"
];

// ── Skill Levels ───────────────────────────────────────────
const skillLevels = [
  { value: "all",     label: "All Levels",           tier: "beg" },
  { value: "beginner",label: "Beginner (1.0–2.0)",   tier: "beg" },
  { value: "2.5",     label: "2.5 — Casual",          tier: "beg" },
  { value: "3.0",     label: "3.0 — Developing",      tier: "mid" },
  { value: "3.5",     label: "3.5 — Intermediate",    tier: "mid" },
  { value: "4.0",     label: "4.0 — Advanced",        tier: "adv" },
  { value: "4.5",     label: "4.5 — Expert",          tier: "elite" },
  { value: "5.0",     label: "5.0+ — Pro",            tier: "pro" }
];

// ── Clubs ──────────────────────────────────────────────────
const clubs = [
  {
    id: "cl001",
    name: "Bangkok Pickleball Club",
    short_name: "BKK PKL",
    district: "Sukhumvit",
    city: "Bangkok",
    lat: 13.7297, lng: 100.5682,
    courts_count: 6,
    member_count: 142,
    description: "Bangkok's flagship pickleball community, founded by expats and local players in 2021. Six premium hard courts, professional coaching, and a vibrant weekend open play scene.",
    amenities: ["indoor", "outdoor", "lit", "parking", "showers", "cafe", "pro_shop", "coaching"],
    hours: { open: "07:00", close: "22:00", days: "Mon–Sun" },
    phone: "+66 2 123 4567",
    email: "info@bkkpkl.com",
    website: "#",
    instagram: "@bkkpkl",
    founded: "2021",
    membership_fee: 800,
    rating: 4.8,
    reviews_count: 67,
    court_ids: ["c001", "c002"],
    featured: true
  },
  {
    id: "cl002",
    name: "Thonglor Smash Society",
    short_name: "TSS",
    district: "Thonglor",
    city: "Bangkok",
    lat: 13.7318, lng: 100.5831,
    courts_count: 4,
    member_count: 89,
    description: "Boutique pickleball club in the heart of Thonglor. Known for its competitive leagues and stylish venue. Members range from beginners to advanced players.",
    amenities: ["indoor", "lit", "parking", "showers", "cafe"],
    hours: { open: "08:00", close: "22:00", days: "Mon–Sun" },
    phone: "+66 2 234 5678",
    email: "hello@thonglorsmassh.com",
    website: "#",
    instagram: "@thonglorsmash",
    founded: "2022",
    membership_fee: 600,
    rating: 4.6,
    reviews_count: 41,
    court_ids: ["c003"],
    featured: true
  },
  {
    id: "cl003",
    name: "Silom Dink Club",
    short_name: "SDC",
    district: "Silom",
    city: "Bangkok",
    lat: 13.7229, lng: 100.5251,
    courts_count: 3,
    member_count: 65,
    description: "A friendly club near the Silom business district. Perfect for after-work games. Emphasizes social play and beginner development.",
    amenities: ["outdoor", "lit", "parking"],
    hours: { open: "10:00", close: "21:00", days: "Tue–Sun" },
    phone: "+66 2 345 6789",
    email: "play@silomdink.com",
    website: "#",
    instagram: "@silomdink",
    founded: "2023",
    membership_fee: 400,
    rating: 4.4,
    reviews_count: 28,
    court_ids: ["c004"],
    featured: false
  },
  {
    id: "cl004",
    name: "On Nut Paddle Co.",
    short_name: "ONPC",
    district: "On Nut",
    city: "Bangkok",
    lat: 13.7019, lng: 100.6012,
    courts_count: 5,
    member_count: 110,
    description: "On Nut's largest pickleball facility with five courts. Known for tournament-standard courts and active youth development programs.",
    amenities: ["outdoor", "lit", "parking", "showers", "pro_shop"],
    hours: { open: "06:00", close: "22:00", days: "Mon–Sun" },
    phone: "+66 2 456 7890",
    email: "play@onnutpaddle.com",
    website: "#",
    instagram: "@onnutpaddle",
    founded: "2022",
    membership_fee: 500,
    rating: 4.7,
    reviews_count: 55,
    court_ids: ["c005", "c006"],
    featured: true
  },
  {
    id: "cl005",
    name: "Ari Rally Collective",
    short_name: "ARC",
    district: "Ari",
    city: "Bangkok",
    lat: 13.7746, lng: 100.5441,
    courts_count: 2,
    member_count: 44,
    description: "Intimate pickleball community in the trendy Ari neighborhood. Monthly tournaments and skills clinics for all levels.",
    amenities: ["outdoor", "lit"],
    hours: { open: "07:00", close: "20:00", days: "Mon–Sat" },
    phone: "+66 2 567 8901",
    email: "ari@rallycollective.com",
    website: "#",
    instagram: "@arirally",
    founded: "2023",
    membership_fee: 350,
    rating: 4.5,
    reviews_count: 19,
    court_ids: ["c007"],
    featured: false
  },
  {
    id: "cl006",
    name: "Bangna Court Club",
    short_name: "BCC",
    district: "Bangna",
    city: "Bangkok",
    lat: 13.6715, lng: 100.6143,
    courts_count: 8,
    member_count: 195,
    description: "The largest pickleball facility in Greater Bangkok with eight courts. Home to the Bangkok Pickleball Open Championship.",
    amenities: ["indoor", "outdoor", "lit", "parking", "showers", "cafe", "pro_shop", "coaching"],
    hours: { open: "06:00", close: "23:00", days: "Mon–Sun" },
    phone: "+66 2 678 9012",
    email: "info@bangnacourt.com",
    website: "#",
    instagram: "@bangnacourt",
    founded: "2020",
    membership_fee: 900,
    rating: 4.9,
    reviews_count: 112,
    court_ids: ["c008", "c009"],
    featured: true
  },
  {
    id: "cl007",
    name: "Ratchada Smashers",
    short_name: "RAS",
    district: "Ratchada",
    city: "Bangkok",
    lat: 13.7610, lng: 100.5683,
    courts_count: 3,
    member_count: 72,
    description: "Community-first club in Ratchada. Affordable memberships and a welcoming environment for all skill levels.",
    amenities: ["outdoor", "lit", "parking"],
    hours: { open: "07:00", close: "21:00", days: "Mon–Sun" },
    phone: "+66 2 789 0123",
    email: "play@ratchadasmashers.com",
    website: "#",
    instagram: "@ratchadasmash",
    founded: "2023",
    membership_fee: 300,
    rating: 4.3,
    reviews_count: 24,
    court_ids: ["c010"],
    featured: false
  },
  {
    id: "cl008",
    name: "Ekkamai Baseline Club",
    short_name: "EBC",
    district: "Ekkamai",
    city: "Bangkok",
    lat: 13.7231, lng: 100.5861,
    courts_count: 4,
    member_count: 96,
    description: "Premium indoor facility in Ekkamai with climate-controlled courts. A favourite among competitive players.",
    amenities: ["indoor", "lit", "parking", "showers", "cafe", "coaching"],
    hours: { open: "08:00", close: "22:00", days: "Mon–Sun" },
    phone: "+66 2 890 1234",
    email: "hello@ekkamaibaseline.com",
    website: "#",
    instagram: "@ekkamaibaseline",
    founded: "2022",
    membership_fee: 700,
    rating: 4.7,
    reviews_count: 48,
    court_ids: ["c011"],
    featured: false
  }
];

// ── Courts ─────────────────────────────────────────────────
const courts = [
  {
    id: "c001",
    name: "Bangkok Pickleball Club — Main Courts",
    district: "Sukhumvit",
    city: "Bangkok",
    lat: 13.7297, lng: 100.5682,
    surface: "Hard",
    indoor: false,
    lit: true,
    courts_count: 4,
    amenities: ["parking", "showers", "cafe", "pro_shop"],
    hours: { open: "07:00", close: "22:00", days: "Mon–Sun" },
    phone: "+66 2 123 4567",
    price_per_hour: 150,
    club_id: "cl001",
    rating: 4.8,
    reviews_count: 43
  },
  {
    id: "c002",
    name: "Bangkok Pickleball Club — Indoor Arena",
    district: "Sukhumvit",
    city: "Bangkok",
    lat: 13.7301, lng: 100.5690,
    surface: "Synthetic",
    indoor: true,
    lit: true,
    courts_count: 2,
    amenities: ["parking", "showers", "cafe", "coaching"],
    hours: { open: "07:00", close: "22:00", days: "Mon–Sun" },
    phone: "+66 2 123 4567",
    price_per_hour: 200,
    club_id: "cl001",
    rating: 4.9,
    reviews_count: 31
  },
  {
    id: "c003",
    name: "Thonglor Smash Society",
    district: "Thonglor",
    city: "Bangkok",
    lat: 13.7318, lng: 100.5831,
    surface: "Synthetic",
    indoor: true,
    lit: true,
    courts_count: 4,
    amenities: ["parking", "showers", "cafe"],
    hours: { open: "08:00", close: "22:00", days: "Mon–Sun" },
    phone: "+66 2 234 5678",
    price_per_hour: 180,
    club_id: "cl002",
    rating: 4.6,
    reviews_count: 28
  },
  {
    id: "c004",
    name: "Silom Dink Court",
    district: "Silom",
    city: "Bangkok",
    lat: 13.7229, lng: 100.5251,
    surface: "Hard",
    indoor: false,
    lit: true,
    courts_count: 3,
    amenities: ["parking"],
    hours: { open: "10:00", close: "21:00", days: "Tue–Sun" },
    phone: "+66 2 345 6789",
    price_per_hour: 100,
    club_id: "cl003",
    rating: 4.4,
    reviews_count: 18
  },
  {
    id: "c005",
    name: "On Nut Paddle Co. — Courts A–C",
    district: "On Nut",
    city: "Bangkok",
    lat: 13.7019, lng: 100.6012,
    surface: "Hard",
    indoor: false,
    lit: true,
    courts_count: 3,
    amenities: ["parking", "showers", "pro_shop"],
    hours: { open: "06:00", close: "22:00", days: "Mon–Sun" },
    phone: "+66 2 456 7890",
    price_per_hour: 120,
    club_id: "cl004",
    rating: 4.7,
    reviews_count: 39
  },
  {
    id: "c006",
    name: "On Nut Paddle Co. — Courts D–E",
    district: "On Nut",
    city: "Bangkok",
    lat: 13.7022, lng: 100.6020,
    surface: "Synthetic",
    indoor: true,
    lit: true,
    courts_count: 2,
    amenities: ["parking", "showers"],
    hours: { open: "06:00", close: "22:00", days: "Mon–Sun" },
    phone: "+66 2 456 7890",
    price_per_hour: 160,
    club_id: "cl004",
    rating: 4.8,
    reviews_count: 22
  },
  {
    id: "c007",
    name: "Ari Rally Courts",
    district: "Ari",
    city: "Bangkok",
    lat: 13.7746, lng: 100.5441,
    surface: "Hard",
    indoor: false,
    lit: true,
    courts_count: 2,
    amenities: ["parking"],
    hours: { open: "07:00", close: "20:00", days: "Mon–Sat" },
    phone: "+66 2 567 8901",
    price_per_hour: 80,
    club_id: "cl005",
    rating: 4.5,
    reviews_count: 14
  },
  {
    id: "c008",
    name: "Bangna Court Club — Championship Courts",
    district: "Bangna",
    city: "Bangkok",
    lat: 13.6715, lng: 100.6143,
    surface: "Hard",
    indoor: false,
    lit: true,
    courts_count: 5,
    amenities: ["parking", "showers", "cafe", "pro_shop", "coaching"],
    hours: { open: "06:00", close: "23:00", days: "Mon–Sun" },
    phone: "+66 2 678 9012",
    price_per_hour: 130,
    club_id: "cl006",
    rating: 4.9,
    reviews_count: 76
  },
  {
    id: "c009",
    name: "Bangna Court Club — Indoor Centre",
    district: "Bangna",
    city: "Bangkok",
    lat: 13.6720, lng: 100.6150,
    surface: "Synthetic",
    indoor: true,
    lit: true,
    courts_count: 3,
    amenities: ["parking", "showers", "cafe", "coaching"],
    hours: { open: "06:00", close: "23:00", days: "Mon–Sun" },
    phone: "+66 2 678 9012",
    price_per_hour: 200,
    club_id: "cl006",
    rating: 4.9,
    reviews_count: 52
  },
  {
    id: "c010",
    name: "Ratchada Public Courts",
    district: "Ratchada",
    city: "Bangkok",
    lat: 13.7610, lng: 100.5683,
    surface: "Hard",
    indoor: false,
    lit: true,
    courts_count: 3,
    amenities: ["parking"],
    hours: { open: "07:00", close: "21:00", days: "Mon–Sun" },
    phone: "+66 2 789 0123",
    price_per_hour: 0,
    club_id: "cl007",
    rating: 4.3,
    reviews_count: 20
  },
  {
    id: "c011",
    name: "Ekkamai Baseline — Indoor Courts",
    district: "Ekkamai",
    city: "Bangkok",
    lat: 13.7231, lng: 100.5861,
    surface: "Synthetic",
    indoor: true,
    lit: true,
    courts_count: 4,
    amenities: ["parking", "showers", "cafe", "coaching"],
    hours: { open: "08:00", close: "22:00", days: "Mon–Sun" },
    phone: "+66 2 890 1234",
    price_per_hour: 190,
    club_id: "cl008",
    rating: 4.7,
    reviews_count: 35
  },
  {
    id: "c012",
    name: "Ladprao Community Court",
    district: "Ladprao",
    city: "Bangkok",
    lat: 13.8061, lng: 100.5627,
    surface: "Hard",
    indoor: false,
    lit: false,
    courts_count: 2,
    amenities: ["parking"],
    hours: { open: "06:00", close: "19:00", days: "Mon–Sun" },
    phone: null,
    price_per_hour: 0,
    club_id: null,
    rating: 3.9,
    reviews_count: 11
  },
  {
    id: "c013",
    name: "Chatuchak Sports Complex",
    district: "Chatuchak",
    city: "Bangkok",
    lat: 13.8094, lng: 100.5534,
    surface: "Hard",
    indoor: false,
    lit: true,
    courts_count: 4,
    amenities: ["parking", "showers"],
    hours: { open: "06:00", close: "22:00", days: "Mon–Sun" },
    phone: "+66 2 901 2345",
    price_per_hour: 60,
    club_id: null,
    rating: 4.2,
    reviews_count: 29
  },
  {
    id: "c014",
    name: "Sathorn Riverside Club",
    district: "Sathorn",
    city: "Bangkok",
    lat: 13.7170, lng: 100.5207,
    surface: "Synthetic",
    indoor: false,
    lit: true,
    courts_count: 3,
    amenities: ["parking", "showers", "cafe"],
    hours: { open: "07:00", close: "21:00", days: "Mon–Sun" },
    phone: "+66 2 012 3456",
    price_per_hour: 140,
    club_id: null,
    rating: 4.5,
    reviews_count: 33
  },
  {
    id: "c015",
    name: "Huai Khwang Paddle Park",
    district: "Huai Khwang",
    city: "Bangkok",
    lat: 13.7690, lng: 100.5750,
    surface: "Hard",
    indoor: false,
    lit: true,
    courts_count: 6,
    amenities: ["parking", "showers", "pro_shop"],
    hours: { open: "07:00", close: "22:00", days: "Mon–Sun" },
    phone: "+66 2 123 9999",
    price_per_hour: 110,
    club_id: null,
    rating: 4.6,
    reviews_count: 41
  }
];

// ── Players ─────────────────────────────────────────────────
const players = [
  { id:"p001", name:"Arin Sukkasem",      username:"arin_pkl",      district:"Thonglor",    gender:"F", skill_level:"4.5", rating:4.52, wins:38, losses:12, games_played:50, playing_style:"doubles", home_court_id:"c001", club_id:"cl001", member_since:"2024-03", looking_for_partner:true,  bio:"Competitive doubles player based in Thonglor. Former tennis player turned pickleball addict." },
  { id:"p002", name:"Thana Wongprasert",  username:"thana_smash",   district:"Bangna",      gender:"M", skill_level:"5.0", rating:5.10, wins:67, losses:8,  games_played:75, playing_style:"singles", home_court_id:"c008", club_id:"cl006", member_since:"2023-11", looking_for_partner:false, bio:"Top-ranked player in Bangkok. Trains daily at Bangna Court Club. Competitive circuit veteran." },
  { id:"p003", name:"Mint Charoenwong",   username:"mintpkl",       district:"Sukhumvit",   gender:"F", skill_level:"4.0", rating:4.05, wins:22, losses:18, games_played:40, playing_style:"both",    home_court_id:"c001", club_id:"cl001", member_since:"2024-06", looking_for_partner:true,  bio:"Mix player who loves both singles and doubles. Always up for an open play session." },
  { id:"p004", name:"Pong Rattanakul",    username:"pong_pkl",      district:"Ari",         gender:"M", skill_level:"3.5", rating:3.62, wins:14, losses:16, games_played:30, playing_style:"doubles", home_court_id:"c007", club_id:"cl005", member_since:"2024-09", looking_for_partner:true,  bio:"Weekend warrior from Ari. Still improving every session. Love the community here." },
  { id:"p005", name:"Fon Lertsuphan",     username:"fon_dink",      district:"Ekkamai",     gender:"F", skill_level:"4.5", rating:4.48, wins:41, losses:14, games_played:55, playing_style:"doubles", home_court_id:"c011", club_id:"cl008", member_since:"2023-08", looking_for_partner:false, bio:"Ekkamai-based competitive player. Specialist in dinking and third-shot drops." },
  { id:"p006", name:"Pat Pornprasit",     username:"pat_baseline",  district:"Ekkamai",     gender:"M", skill_level:"4.0", rating:4.18, wins:28, losses:17, games_played:45, playing_style:"both",    home_court_id:"c011", club_id:"cl008", member_since:"2024-01", looking_for_partner:true,  bio:"Ekkamai Baseline's most improved player of 2024. Strong baseline game, developing net play." },
  { id:"p007", name:"Nook Siriporn",      username:"nook_pkl",      district:"Silom",       gender:"F", skill_level:"3.0", rating:3.12, wins:8,  losses:12, games_played:20, playing_style:"doubles", home_court_id:"c004", club_id:"cl003", member_since:"2025-01", looking_for_partner:true,  bio:"New to the sport but learning fast! Enjoy the social side of pickleball." },
  { id:"p008", name:"Golf Tanawat",       username:"golf_smash",    district:"On Nut",      gender:"M", skill_level:"4.5", rating:4.61, wins:52, losses:13, games_played:65, playing_style:"singles", home_court_id:"c005", club_id:"cl004", member_since:"2023-05", looking_for_partner:false, bio:"Aggressive singles player from On Nut. Former badminton national team (junior)." },
  { id:"p009", name:"Wan Praekunsri",     username:"wan_pkl",       district:"Sukhumvit",   gender:"F", skill_level:"3.5", rating:3.78, wins:19, losses:21, games_played:40, playing_style:"doubles", home_court_id:"c001", club_id:"cl001", member_since:"2024-04", looking_for_partner:true,  bio:"Social player who competes in friendly tournaments. Looking for a consistent doubles partner." },
  { id:"p010", name:"Arm Phichit",        username:"arm_pkl",       district:"Bangna",      gender:"M", skill_level:"5.0", rating:4.92, wins:71, losses:10, games_played:81, playing_style:"both",    home_court_id:"c008", club_id:"cl006", member_since:"2023-01", looking_for_partner:false, bio:"Second ranked player in Bangkok. Bangna Court Club's head coach and competitive player." },
  { id:"p011", name:"Bee Narisara",       username:"bee_dink",      district:"Thonglor",    gender:"F", skill_level:"4.0", rating:3.98, wins:20, losses:15, games_played:35, playing_style:"doubles", home_court_id:"c003", club_id:"cl002", member_since:"2024-02", looking_for_partner:true,  bio:"Thonglor-based doubles specialist. Known for her precise drops and patient net play." },
  { id:"p012", name:"Film Koranit",       username:"film_pkl",      district:"Ratchada",    gender:"F", skill_level:"3.0", rating:3.05, wins:6,  losses:10, games_played:16, playing_style:"both",    home_court_id:"c010", club_id:"cl007", member_since:"2025-02", looking_for_partner:true,  bio:"Started in 2025 and already competing in open play. Great spirit and attitude." },
  { id:"p013", name:"Dome Jiratchaya",    username:"dome_pkl",      district:"Chatuchak",   gender:"M", skill_level:"3.5", rating:3.41, wins:15, losses:19, games_played:34, playing_style:"doubles", home_court_id:"c013", club_id:null,    member_since:"2024-07", looking_for_partner:true,  bio:"Chatuchak regular. Plays at the public courts every weekend morning." },
  { id:"p014", name:"Kwan Suchada",       username:"kwan_smash",    district:"Sathorn",     gender:"F", skill_level:"4.5", rating:4.39, wins:36, losses:19, games_played:55, playing_style:"singles", home_court_id:"c014", club_id:null,    member_since:"2023-10", looking_for_partner:false, bio:"Singles focused player. Strong serve and powerful forehand drive." },
  { id:"p015", name:"Benz Prateep",       username:"benz_pkl",      district:"Ari",         gender:"M", skill_level:"4.0", rating:4.22, wins:30, losses:20, games_played:50, playing_style:"both",    home_court_id:"c007", club_id:"cl005", member_since:"2024-01", looking_for_partner:true,  bio:"All-around player who enjoys both competitive and social play. Regular at Ari Rally." },
  { id:"p016", name:"Ice Pornpimol",      username:"ice_dink",      district:"Sukhumvit",   gender:"F", skill_level:"5.0", rating:4.85, wins:58, losses:11, games_played:69, playing_style:"doubles", home_court_id:"c001", club_id:"cl001", member_since:"2023-04", looking_for_partner:false, bio:"Top-3 women's player in Bangkok. Elite doubles specialist and tournament regular." },
  { id:"p017", name:"Max Ratanawong",     username:"max_pkl",       district:"Ladprao",     gender:"M", skill_level:"2.5", rating:2.58, wins:4,  losses:14, games_played:18, playing_style:"doubles", home_court_id:"c012", club_id:null,    member_since:"2025-03", looking_for_partner:true,  bio:"Fresh to the sport! Picking it up fast. Come find me at Ladprao Community Court." },
  { id:"p018", name:"Ploy Kanjanaporn",   username:"ploy_pkl",      district:"On Nut",      gender:"F", skill_level:"4.0", rating:4.11, wins:25, losses:20, games_played:45, playing_style:"doubles", home_court_id:"c005", club_id:"cl004", member_since:"2024-03", looking_for_partner:true,  bio:"On Nut regular. Loves doubles and always happy to coach beginners at open play." },
  { id:"p019", name:"Sam Lertwichai",     username:"sam_pkl",       district:"Bangna",      gender:"M", skill_level:"3.5", rating:3.55, wins:16, losses:18, games_played:34, playing_style:"both",    home_court_id:"c008", club_id:"cl006", member_since:"2024-05", looking_for_partner:true,  bio:"Improving steadily at Bangna. Enjoy the tournament atmosphere and competitive training." },
  { id:"p020", name:"Aom Wanvilai",       username:"aom_smash",     district:"Huai Khwang", gender:"F", skill_level:"4.5", rating:4.44, wins:40, losses:16, games_played:56, playing_style:"doubles", home_court_id:"c015", club_id:null,    member_since:"2023-09", looking_for_partner:false, bio:"Huai Khwang's top player. Consistent and smart — wins with placement not power." },
  { id:"p021", name:"Pop Nawin",          username:"pop_pkl",        district:"Sukhumvit",   gender:"M", skill_level:"3.0", rating:3.28, wins:10, losses:16, games_played:26, playing_style:"doubles", home_court_id:"c001", club_id:"cl001", member_since:"2024-11", looking_for_partner:true,  bio:"Still developing but passionate. Sunday open play is the highlight of my week." },
  { id:"p022", name:"Joy Pensri",         username:"joy_pkl",        district:"Silom",       gender:"F", skill_level:"3.5", rating:3.69, wins:18, losses:14, games_played:32, playing_style:"both",    home_court_id:"c004", club_id:"cl003", member_since:"2024-08", looking_for_partner:true,  bio:"Silom Dink Club member who plays almost every day after work." },
  { id:"p023", name:"Nat Suwannachart",   username:"nat_smash",     district:"Ekkamai",     gender:"M", skill_level:"4.0", rating:4.07, wins:23, losses:18, games_played:41, playing_style:"singles", home_court_id:"c011", club_id:"cl008", member_since:"2023-12", looking_for_partner:false, bio:"Ekkamai Baseline regular. Strong singles game and enjoys coaching the newer members." },
  { id:"p024", name:"Pim Kanchana",       username:"pim_dink",       district:"Chatuchak",   gender:"F", skill_level:"2.5", rating:2.71, wins:5,  losses:11, games_played:16, playing_style:"doubles", home_court_id:"c013", club_id:null,    member_since:"2025-01", looking_for_partner:true,  bio:"Beginner here. Played tennis for 10 years so picking this up fast! Love to meet new players." },
  { id:"p025", name:"Pete Chankasem",     username:"pete_pkl",       district:"Ratchada",    gender:"M", skill_level:"4.5", rating:4.55, wins:44, losses:15, games_played:59, playing_style:"both",    home_court_id:"c010", club_id:"cl007", member_since:"2023-07", looking_for_partner:false, bio:"Ratchada Smashers' top player. Versatile game and loves organising local tournaments." }
];

// ── Events ──────────────────────────────────────────────────
const events = [
  {
    id: "e001",
    title: "Sunday Open Play — Sukhumvit",
    type: "open_play",
    court_id: "c001",
    club_id: "cl001",
    organizer: "Bangkok Pickleball Club",
    date: "2026-05-17",
    time_start: "08:00",
    time_end: "11:00",
    skill_level: "all",
    price: 0,
    spots_total: 24,
    spots_taken: 18,
    description: "Weekly Sunday open play at BKK PKL. All skill levels welcome. Paddles available to borrow. Join us for a morning of fun!",
    tags: ["weekly", "social", "all-levels"]
  },
  {
    id: "e002",
    title: "Bangna Pickleball Open — Round Robin",
    type: "tournament",
    court_id: "c008",
    club_id: "cl006",
    organizer: "Bangna Court Club",
    date: "2026-05-24",
    time_start: "09:00",
    time_end: "17:00",
    skill_level: "4.0",
    price: 500,
    spots_total: 32,
    spots_taken: 28,
    description: "Bangkok's most competitive open tournament. Mixed doubles round robin format. Minimum 4.0 rating required. Cash prizes for top 3 pairs.",
    tags: ["competitive", "prizes", "mixed-doubles"]
  },
  {
    id: "e003",
    title: "Beginner Clinic — Learn the Basics",
    type: "clinic",
    court_id: "c003",
    club_id: "cl002",
    organizer: "Thonglor Smash Society",
    date: "2026-05-20",
    time_start: "10:00",
    time_end: "12:00",
    skill_level: "beginner",
    price: 350,
    spots_total: 12,
    spots_taken: 7,
    description: "Brand new to pickleball? This clinic covers scoring, serving, and the kitchen zone. All equipment provided. Maximum 12 participants for personalised coaching.",
    tags: ["beginner", "coaching", "equipment-provided"]
  },
  {
    id: "e004",
    title: "Ekkamai Evening Open Play",
    type: "open_play",
    court_id: "c011",
    club_id: "cl008",
    organizer: "Ekkamai Baseline Club",
    date: "2026-05-16",
    time_start: "19:00",
    time_end: "21:30",
    skill_level: "3.5",
    price: 150,
    spots_total: 16,
    spots_taken: 12,
    description: "Weekday evening open play for intermediate players. AC indoor courts. Competitive but friendly. 3.5+ skill level preferred.",
    tags: ["evening", "indoor", "intermediate"]
  },
  {
    id: "e005",
    title: "On Nut Saturday Social",
    type: "open_play",
    court_id: "c005",
    club_id: "cl004",
    organizer: "On Nut Paddle Co.",
    date: "2026-05-18",
    time_start: "07:30",
    time_end: "10:30",
    skill_level: "all",
    price: 80,
    spots_total: 20,
    spots_taken: 9,
    description: "Saturday morning social at On Nut. Relaxed format, king of court rotation. Coffee and snacks provided. Great for all levels.",
    tags: ["social", "saturday", "rotation"]
  },
  {
    id: "e006",
    title: "3rd Shot Drop Mastery Clinic",
    type: "clinic",
    court_id: "c009",
    club_id: "cl006",
    organizer: "Bangna Court Club",
    date: "2026-05-22",
    time_start: "14:00",
    time_end: "16:00",
    skill_level: "3.5",
    price: 400,
    spots_total: 10,
    spots_taken: 8,
    description: "Deep-dive clinic on the third-shot drop — the most important shot in pickleball. Led by Coach Arm (4.9 rated). Video analysis included.",
    tags: ["technique", "coaching", "video-analysis"]
  },
  {
    id: "e007",
    title: "Silom After-Work Open Play",
    type: "open_play",
    court_id: "c004",
    club_id: "cl003",
    organizer: "Silom Dink Club",
    date: "2026-05-19",
    time_start: "18:30",
    time_end: "20:30",
    skill_level: "all",
    price: 0,
    spots_total: 12,
    spots_taken: 5,
    description: "Free open play for Silom Dink Club members. Non-members ฿100. Perfect after-work unwind. Walk-ins welcome if spots available.",
    tags: ["free-members", "after-work", "casual"]
  },
  {
    id: "e008",
    title: "Bangkok Mixed Doubles Classic",
    type: "tournament",
    court_id: "c008",
    club_id: "cl006",
    organizer: "Bangna Court Club",
    date: "2026-06-01",
    time_start: "08:00",
    time_end: "18:00",
    skill_level: "4.0",
    price: 600,
    spots_total: 48,
    spots_taken: 44,
    description: "Annual flagship tournament at Bangna. Mixed doubles, gold/silver/bronze brackets. Top prize ฿15,000. Register early — almost full!",
    tags: ["annual", "flagship", "prizes"]
  },
  {
    id: "e009",
    title: "Ari Morning Rally",
    type: "open_play",
    court_id: "c007",
    club_id: "cl005",
    organizer: "Ari Rally Collective",
    date: "2026-05-17",
    time_start: "07:00",
    time_end: "09:30",
    skill_level: "3.0",
    price: 60,
    spots_total: 8,
    spots_taken: 6,
    description: "Small-group morning rally for developing players. Friendly competition, tips shared between rallies. Max 8 players for quality court time.",
    tags: ["morning", "small-group", "friendly"]
  },
  {
    id: "e010",
    title: "Chatuchak Weekend Open",
    type: "open_play",
    court_id: "c013",
    club_id: null,
    organizer: "Chatuchak Sports Complex",
    date: "2026-05-18",
    time_start: "06:30",
    time_end: "09:00",
    skill_level: "all",
    price: 60,
    spots_total: 24,
    spots_taken: 10,
    description: "Public courts open play at Chatuchak Sports Complex. Pay at the gate. Bring your own paddle. Courts also available for casual walk-up play.",
    tags: ["public", "casual", "early-morning"]
  },
  {
    id: "e011",
    title: "Women's Round Robin — Sukhumvit",
    type: "tournament",
    court_id: "c001",
    club_id: "cl001",
    organizer: "Bangkok Pickleball Club",
    date: "2026-05-25",
    time_start: "10:00",
    time_end: "14:00",
    skill_level: "3.5",
    price: 300,
    spots_total: 16,
    spots_taken: 11,
    description: "Women's only round robin tournament. 3.5+ skill level. Friendly competitive format. Awards for 1st, 2nd, and Most Improved.",
    tags: ["women-only", "round-robin", "awards"]
  },
  {
    id: "e012",
    title: "Dinking & Drinks — Social Evening",
    type: "open_play",
    court_id: "c003",
    club_id: "cl002",
    organizer: "Thonglor Smash Society",
    date: "2026-05-21",
    time_start: "19:00",
    time_end: "21:00",
    skill_level: "all",
    price: 200,
    spots_total: 20,
    spots_taken: 20,
    description: "Play + social — includes 2 drink vouchers. FULLY BOOKED. Join the waitlist!",
    tags: ["social", "drinks", "fully-booked"]
  },
  {
    id: "e013",
    title: "Advanced Drilling Session",
    type: "clinic",
    court_id: "c002",
    club_id: "cl001",
    organizer: "Bangkok Pickleball Club",
    date: "2026-05-23",
    time_start: "09:00",
    time_end: "11:00",
    skill_level: "4.5",
    price: 450,
    spots_total: 8,
    spots_taken: 5,
    description: "High-intensity drilling session for 4.5+ players. Focus on speed-up attacks, resets, and ATP shots. Coach-led, maximum 8 spots.",
    tags: ["advanced", "drilling", "high-intensity"]
  },
  {
    id: "e014",
    title: "Huai Khwang Paddle Festival",
    type: "tournament",
    court_id: "c015",
    club_id: null,
    organizer: "Huai Khwang Paddle Park",
    date: "2026-06-07",
    time_start: "09:00",
    time_end: "17:00",
    skill_level: "all",
    price: 400,
    spots_total: 64,
    spots_taken: 38,
    description: "Bangkok's biggest multi-level tournament. Separate brackets for 2.5, 3.0, 3.5, 4.0, 4.5, and 5.0+. Something for everyone. Vendor stalls and food trucks on site.",
    tags: ["all-levels", "festival", "food", "multi-bracket"]
  },
  {
    id: "e015",
    title: "Ratchada Community Play",
    type: "open_play",
    court_id: "c010",
    club_id: "cl007",
    organizer: "Ratchada Smashers",
    date: "2026-05-16",
    time_start: "07:00",
    time_end: "10:00",
    skill_level: "all",
    price: 0,
    spots_total: 12,
    spots_taken: 4,
    description: "Free Saturday morning open play at Ratchada public courts. First come first served. Bring your own paddle.",
    tags: ["free", "public", "casual"]
  }
];

// ── Helper utilities ────────────────────────────────────────

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function getAvatarColor(id) {
  const palette = ['#b5f23d','#3b82f6','#f97316','#a78bfa','#34d399','#f59e0b','#ec4899'];
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return palette[hash % palette.length];
}

function getSkillTier(level) {
  if (level === 'beginner' || level === '2.5') return 'beg';
  if (level === '3.0' || level === '3.5') return 'mid';
  if (level === '4.0') return 'adv';
  if (level === '4.5') return 'elite';
  if (level === '5.0') return 'pro';
  return 'beg';
}

function getSkillLabel(level) {
  const map = {
    'all':'All Levels', 'beginner':'Beginner', '2.5':'2.5', '3.0':'3.0',
    '3.5':'3.5', '4.0':'4.0', '4.5':'4.5', '5.0':'5.0+'
  };
  return map[level] || level;
}

function getEventTypeBadge(type) {
  if (type === 'tournament') return { label: 'Tournament', cls: 'badge-orange', border: 'var(--orange)' };
  if (type === 'clinic')     return { label: 'Clinic',     cls: 'badge-blue',   border: 'var(--blue)' };
  return                            { label: 'Open Play',  cls: 'badge-accent', border: 'var(--accent)' };
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short' });
}

function spotsLeft(event) {
  return event.spots_total - event.spots_taken;
}

function spotsPercent(event) {
  return Math.round((event.spots_taken / event.spots_total) * 100);
}

function getCourtById(id) { return courts.find(c => c.id === id); }
function getClubById(id)  { return clubs.find(c => c.id === id); }
function getPlayerById(id){ return players.find(p => p.id === id); }

function renderStars(rating) {
  const full = Math.round(rating);
  return Array.from({length:5}, (_,i) =>
    `<span class="star${i < full ? '' : ' empty'}">★</span>`
  ).join('');
}

function amenityIcon(key) {
  const icons = {
    parking:  { icon: '🚗', label: 'Parking' },
    showers:  { icon: '🚿', label: 'Showers' },
    cafe:     { icon: '☕', label: 'Café' },
    pro_shop: { icon: '🛒', label: 'Pro Shop' },
    coaching: { icon: '🎯', label: 'Coaching' },
    indoor:   { icon: '🏠', label: 'Indoor' },
    outdoor:  { icon: '☀️', label: 'Outdoor' },
    lit:      { icon: '💡', label: 'Night Lit' }
  };
  return icons[key] || { icon: '•', label: key };
}

// Countup animation
function countUp(el, target, duration) {
  duration = duration || 1400;
  let start = 0;
  const step = t => {
    if (!start) start = t;
    const p = Math.min((t - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Generic client-side filter
function applyFilters(data, filters) {
  return data.filter(item => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const searchable = (item.name || item.title || '').toLowerCase() +
        ' ' + (item.district || '').toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    if (filters.district && filters.district !== 'all' && item.district !== filters.district) return false;
    if (filters.type && filters.type !== 'all' && item.type !== filters.type) return false;
    if (filters.skill_level && filters.skill_level !== 'all') {
      if (item.skill_level !== 'all' && item.skill_level !== filters.skill_level) return false;
    }
    if (filters.surface && filters.surface !== 'all' && item.surface !== filters.surface) return false;
    if (filters.indoor === true && !item.indoor) return false;
    if (filters.lit === true && !item.lit) return false;
    if (filters.free === true && item.price !== 0 && item.price_per_hour !== 0) return false;
    return true;
  });
}
