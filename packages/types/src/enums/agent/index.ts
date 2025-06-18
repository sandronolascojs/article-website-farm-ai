export const agentLearningTypeValues = [
  'HISTORY',
  'SCIENCE',
  'MATHEMATICS',
  'LANGUAGE',
  'PHYSICS',
  'CHEMISTRY',
  'BIOLOGY',
  'GEOGRAPHY',
  'ECONOMICS',
  'POLITICS',
  'ART',
  'MUSIC',
  'SPORTS',
  'PHILOSOPHY',
  'RELIGION',
  'SOCIAL_SCIENCES',
  'ENGINEERING',
  'COMPUTER_SCIENCE',
  'MEDICINE',
  'BUSINESS',
  'LAW',
] as const;

export enum AgentLearningType {
  HISTORY = 'HISTORY',
  SCIENCE = 'SCIENCE',
  MATHEMATICS = 'MATHEMATICS',
  LANGUAGE = 'LANGUAGE',
  PHYSICS = 'PHYSICS',
  CHEMISTRY = 'CHEMISTRY',
  BIOLOGY = 'BIOLOGY',
  GEOGRAPHY = 'GEOGRAPHY',
  ECONOMICS = 'ECONOMICS',
  POLITICS = 'POLITICS',
  ART = 'ART',
  MUSIC = 'MUSIC',
  SPORTS = 'SPORTS',
  PHILOSOPHY = 'PHILOSOPHY',
  RELIGION = 'RELIGION',
  SOCIAL_SCIENCES = 'SOCIAL_SCIENCES',
  ENGINEERING = 'ENGINEERING',
  COMPUTER_SCIENCE = 'COMPUTER_SCIENCE',
  MEDICINE = 'MEDICINE',
  BUSINESS = 'BUSINESS',
  LAW = 'LAW',
}

export const modelVendorValues = ['openai', 'anthropic', 'gemini'] as const;

export enum ModelVendor {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  GEMINI = 'gemini',
}

// OPENAI
export enum OpenAiAgentModel {
  /** Reasoning model: o4-mini */
  O4_MINI = 'o4-mini',
  /** Reasoning model: o3 */
  O3 = 'o3',
  /** Reasoning model: o3-mini */
  O3_MINI = 'o3-mini',
  /** Reasoning model: o1 */
  O1 = 'o1',
  /** Reasoning model: o1-mini */
  O1_MINI = 'o1-mini',
  /** Reasoning model: o1-pro */
  O1_PRO = 'o1-pro',
  /** Flagship chat model: gpt-4.1 */
  GPT_4_1 = 'gpt-4.1',
  /** Flagship chat model: gpt-4o */
  GPT_4O = 'gpt-4o',
  /** Cost-optimized model: gpt-4.1-mini */
  GPT_4_1_MINI = 'gpt-4.1-mini',
  /** Cost-optimized model: gpt-4.1-nano */
  GPT_4_1_NANO = 'gpt-4.1-nano',
  /** Cost-optimized model: gpt-4o-mini */
  GPT_4O_MINI = 'gpt-4o-mini',
}

export const openAiAgentModelValues = [
  'o4-mini',
  'o3',
  'o3-mini',
  'o1',
  'o1-mini',
  'o1-pro',
  'gpt-4.1',
  'gpt-4o',
  'gpt-4.1-mini',
  'gpt-4.1-nano',
  'gpt-4o-mini',
] as const;

// ANTHROPIC
export const anthropicAgentModelValues = [
  'claude-opus-4-20250514',
  'claude-sonnet-4-20250514',
  'claude-3-7-sonnet-20250219',
  'claude-3-5-sonnet-20241022',
  'claude-3-5-haiku-20241022',
  'claude-3-opus-20240229',
  'claude-3-sonnet-20240229',
  'claude-3-haiku-20240307',
] as const;

export enum AnthropicAgentModel {
  /** Claude Opus 4: Our most capable model. Best for complex reasoning, advanced problem solving, and tasks requiring the highest intelligence and accuracy. (Mar 2025, 200K context, 32K output) */
  CLAUDE_OPUS_4_20250514 = 'claude-opus-4-20250514',
  /** Claude Sonnet 4: High-performance, balanced model. Ideal for production workloads needing strong intelligence, speed, and cost efficiency. (Mar 2025, 200K context, 64K output) */
  CLAUDE_SONNET_4_20250514 = 'claude-sonnet-4-20250514',
  /** Claude Sonnet 3.7: High-performance model with early extended thinking. Good for tasks needing extended context and reasoning, but with lower cost than Opus. (Nov 2024, 200K context, 64K output) */
  CLAUDE_3_7_SONNET_20250219 = 'claude-3-7-sonnet-20250219',
  /** Claude Sonnet 3.5 v2: Upgraded version of Sonnet 3.5. Great for general-purpose tasks, chatbots, and assistants with high accuracy and speed. (Apr 2024, 200K context, 8192 output) */
  CLAUDE_3_5_SONNET_20241022 = 'claude-3-5-sonnet-20241022',
  /** Claude Haiku 3.5: Fastest model. Best for near-instant responses, lightweight tasks, and high-throughput applications. (July 2024, 200K context, 8192 output) */
  CLAUDE_3_5_HAIKU_20241022 = 'claude-3-5-haiku-20241022',
  /** Claude Opus 3: Powerful model for complex tasks (Aug 2023, 200K context, 4096 output) */
  CLAUDE_3_OPUS_20240229 = 'claude-3-opus-20240229',
  /** Claude Sonnet 3: High-performance model (Feb 2024, 200K context, 4096 output) */
  CLAUDE_3_SONNET_20240229 = 'claude-3-sonnet-20240229',
  /** Claude Haiku 3: Fast and compact model (Mar 2024, 200K context, 4096 output) */
  CLAUDE_3_HAIKU_20240307 = 'claude-3-haiku-20240307',
}

// GEMINI
export const geminiAgentModelValues = [
  'gemini-2.5-flash-preview-05-20',
  'gemini-2.5-pro-preview-05-06',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash',
  'gemini-1.5-flash-8b',
  'gemini-1.5-pro',
] as const;

export enum GeminiAgentModel {
  /** Adaptive thinking, cost efficiency */
  GEMINI_2_5_FLASH_PREVIEW_05_20 = 'gemini-2.5-flash-preview-05-20',
  /** Enhanced thinking and reasoning, multimodal understanding, advanced coding, and more */
  GEMINI_2_5_PRO_PREVIEW_05_06 = 'gemini-2.5-pro-preview-05-06',
  /** Next generation features, speed, thinking, and realtime streaming. */
  GEMINI_2_0_FLASH = 'gemini-2.0-flash',
  /** Cost efficiency and low latency */
  GEMINI_2_0_FLASH_LITE = 'gemini-2.0-flash-lite',
  /** Fast and versatile performance across a diverse variety of tasks */
  GEMINI_1_5_FLASH = 'gemini-1.5-flash',
  /** High volume and lower intelligence tasks */
  GEMINI_1_5_FLASH_8B = 'gemini-1.5-flash-8b',
  /** Complex reasoning tasks requiring more intelligence */
  GEMINI_1_5_PRO = 'gemini-1.5-pro',
}

export const businessSubtopicValues = [
  'ACCOUNTING',
  'FINANCE',
  'MARKETING',
  'MANAGEMENT',
  'ENTREPRENEURSHIP',
  'HUMAN_RESOURCES',
  'OPERATIONS_MANAGEMENT',
  'INTERNATIONAL_BUSINESS',
  'BUSINESS_ANALYTICS',
  'SUPPLY_CHAIN_MANAGEMENT',
  'BUSINESS_LAW',
  'STRATEGIC_MANAGEMENT',
  'ECONOMICS',
  'ALL',
] as const;

export enum BusinessSubtopic {
  ACCOUNTING = 'ACCOUNTING',
  FINANCE = 'FINANCE',
  MARKETING = 'MARKETING',
  MANAGEMENT = 'MANAGEMENT',
  ENTREPRENEURSHIP = 'ENTREPRENEURSHIP',
  HUMAN_RESOURCES = 'HUMAN_RESOURCES',
  OPERATIONS_MANAGEMENT = 'OPERATIONS_MANAGEMENT',
  INTERNATIONAL_BUSINESS = 'INTERNATIONAL_BUSINESS',
  BUSINESS_ANALYTICS = 'BUSINESS_ANALYTICS',
  SUPPLY_CHAIN_MANAGEMENT = 'SUPPLY_CHAIN_MANAGEMENT',
  BUSINESS_LAW = 'BUSINESS_LAW',
  STRATEGIC_MANAGEMENT = 'STRATEGIC_MANAGEMENT',
  ECONOMICS = 'ECONOMICS',
  ALL = 'ALL',
}

export const engineeringSubtopicValues = [
  'ELECTRICAL_ENGINEERING',
  'MECHANICAL_ENGINEERING',
  'CIVIL_ENGINEERING',
  'CHEMICAL_ENGINEERING',
  'COMPUTER_ENGINEERING',
  'SOFTWARE_ENGINEERING',
  'AEROSPACE_ENGINEERING',
  'BIOMEDICAL_ENGINEERING',
  'ENVIRONMENTAL_ENGINEERING',
  'INDUSTRIAL_ENGINEERING',
  'MATERIALS_ENGINEERING',
  'NUCLEAR_ENGINEERING',
  'PETROLEUM_ENGINEERING',
  'SYSTEMS_ENGINEERING',
  'AGRICULTURAL_ENGINEERING',
  'MARINE_ENGINEERING',
  'MINING_ENGINEERING',
  'STRUCTURAL_ENGINEERING',
  'ALL',
] as const;

export enum EngineeringSubtopic {
  ELECTRICAL_ENGINEERING = 'ELECTRICAL_ENGINEERING',
  MECHANICAL_ENGINEERING = 'MECHANICAL_ENGINEERING',
  CIVIL_ENGINEERING = 'CIVIL_ENGINEERING',
  CHEMICAL_ENGINEERING = 'CHEMICAL_ENGINEERING',
  COMPUTER_ENGINEERING = 'COMPUTER_ENGINEERING',
  SOFTWARE_ENGINEERING = 'SOFTWARE_ENGINEERING',
  AEROSPACE_ENGINEERING = 'AEROSPACE_ENGINEERING',
  BIOMEDICAL_ENGINEERING = 'BIOMEDICAL_ENGINEERING',
  ENVIRONMENTAL_ENGINEERING = 'ENVIRONMENTAL_ENGINEERING',
  INDUSTRIAL_ENGINEERING = 'INDUSTRIAL_ENGINEERING',
  MATERIALS_ENGINEERING = 'MATERIALS_ENGINEERING',
  NUCLEAR_ENGINEERING = 'NUCLEAR_ENGINEERING',
  PETROLEUM_ENGINEERING = 'PETROLEUM_ENGINEERING',
  SYSTEMS_ENGINEERING = 'SYSTEMS_ENGINEERING',
  AGRICULTURAL_ENGINEERING = 'AGRICULTURAL_ENGINEERING',
  MARINE_ENGINEERING = 'MARINE_ENGINEERING',
  MINING_ENGINEERING = 'MINING_ENGINEERING',
  STRUCTURAL_ENGINEERING = 'STRUCTURAL_ENGINEERING',
  ALL = 'ALL',
}

export const languageSubtopicValues = [
  'ENGLISH',
  'SPANISH',
  'FRENCH',
  'GERMAN',
  'CHINESE',
  'JAPANESE',
  'RUSSIAN',
  'ITALIAN',
  'PORTUGUESE',
  'ARABIC',
  'HINDI',
  'BENGALI',
  'KOREAN',
  'TURKISH',
  'VIETNAMESE',
  'POLISH',
  'DUTCH',
  'GREEK',
  'HEBREW',
  'SWEDISH',
  'THAI',
  'INDONESIAN',
  'UKRAINIAN',
  'ROMANIAN',
  'CZECH',
  'HUNGARIAN',
  'FINNISH',
  'NORWEGIAN',
  'DANISH',
  'ICELANDIC',
  'IRISH',
  'SCOTTISH',
  'WELSH',
  'NORTHUMBERLAND',
  'ALL',
] as const;

export enum LanguageSubtopic {
  ENGLISH = 'ENGLISH',
  SPANISH = 'SPANISH',
  FRENCH = 'FRENCH',
  GERMAN = 'GERMAN',
  CHINESE = 'CHINESE',
  JAPANESE = 'JAPANESE',
  RUSSIAN = 'RUSSIAN',
  ITALIAN = 'ITALIAN',
  PORTUGUESE = 'PORTUGUESE',
  ARABIC = 'ARABIC',
  HINDI = 'HINDI',
  BENGALI = 'BENGALI',
  KOREAN = 'KOREAN',
  TURKISH = 'TURKISH',
  VIETNAMESE = 'VIETNAMESE',
  POLISH = 'POLISH',
  DUTCH = 'DUTCH',
  GREEK = 'GREEK',
  HEBREW = 'HEBREW',
  SWEDISH = 'SWEDISH',
  THAI = 'THAI',
  INDONESIAN = 'INDONESIAN',
  UKRAINIAN = 'UKRAINIAN',
  ROMANIAN = 'ROMANIAN',
  CZECH = 'CZECH',
  HUNGARIAN = 'HUNGARIAN',
  FINNISH = 'FINNISH',
  NORWEGIAN = 'NORWEGIAN',
  DANISH = 'DANISH',
  ICELANDIC = 'ICELANDIC',
  IRISH = 'IRISH',
  SCOTTISH = 'SCOTTISH',
  WELSH = 'WELSH',
  NORTHUMBERLAND = 'NORTHUMBERLAND',
  ALL = 'ALL',
}

export const lawSubtopicValues = [
  'CIVIL_LAW',
  'CRIMINAL_LAW',
  'CONSTITUTIONAL_LAW',
  'ADMINISTRATIVE_LAW',
  'INTERNATIONAL_LAW',
  'CORPORATE_LAW',
  'FAMILY_LAW',
  'LABOR_LAW',
  'TAX_LAW',
  'ENVIRONMENTAL_LAW',
  'INTELLECTUAL_PROPERTY_LAW',
  'HUMAN_RIGHTS_LAW',
  'COMMERCIAL_LAW',
  'PROPERTY_LAW',
  'COMPLIANCE_LAW',
  'ALTERNATIVE_DISPUTE_RESOLUTION',
  'ALL',
] as const;

export enum LawSubtopic {
  CIVIL_LAW = 'CIVIL_LAW',
  CRIMINAL_LAW = 'CRIMINAL_LAW',
  CONSTITUTIONAL_LAW = 'CONSTITUTIONAL_LAW',
  ADMINISTRATIVE_LAW = 'ADMINISTRATIVE_LAW',
  INTERNATIONAL_LAW = 'INTERNATIONAL_LAW',
  CORPORATE_LAW = 'CORPORATE_LAW',
  FAMILY_LAW = 'FAMILY_LAW',
  LABOR_LAW = 'LABOR_LAW',
  TAX_LAW = 'TAX_LAW',
  ENVIRONMENTAL_LAW = 'ENVIRONMENTAL_LAW',
  INTELLECTUAL_PROPERTY_LAW = 'INTELLECTUAL_PROPERTY_LAW',
  HUMAN_RIGHTS_LAW = 'HUMAN_RIGHTS_LAW',
  COMMERCIAL_LAW = 'COMMERCIAL_LAW',
  PROPERTY_LAW = 'PROPERTY_LAW',
  COMPLIANCE_LAW = 'COMPLIANCE_LAW',
  ALTERNATIVE_DISPUTE_RESOLUTION = 'ALTERNATIVE_DISPUTE_RESOLUTION',
  ALL = 'ALL',
}

export const medicineSubtopicValues = [
  'GENERAL_MEDICINE',
  'NURSING',
  'DENTISTRY',
  'PHARMACY',
  'VETERINARY_MEDICINE',
  'PUBLIC_HEALTH',
  'SURGERY',
  'PEDIATRICS',
  'PSYCHIATRY',
  'RADIOLOGY',
  'ANESTHESIOLOGY',
  'OBSTETRICS_GYNECOLOGY',
  'ORTHOPEDICS',
  'CARDIOLOGY',
  'NEUROLOGY',
  'ONCOLOGY',
  'DERMATOLOGY',
  'OPHTHALMOLOGY',
  'PATHOLOGY',
  'ALL',
] as const;

export enum MedicineSubtopic {
  GENERAL_MEDICINE = 'GENERAL_MEDICINE',
  NURSING = 'NURSING',
  DENTISTRY = 'DENTISTRY',
  PHARMACY = 'PHARMACY',
  VETERINARY_MEDICINE = 'VETERINARY_MEDICINE',
  PUBLIC_HEALTH = 'PUBLIC_HEALTH',
  SURGERY = 'SURGERY',
  PEDIATRICS = 'PEDIATRICS',
  PSYCHIATRY = 'PSYCHIATRY',
  RADIOLOGY = 'RADIOLOGY',
  ANESTHESIOLOGY = 'ANESTHESIOLOGY',
  OBSTETRICS_GYNECOLOGY = 'OBSTETRICS_GYNECOLOGY',
  ORTHOPEDICS = 'ORTHOPEDICS',
  CARDIOLOGY = 'CARDIOLOGY',
  NEUROLOGY = 'NEUROLOGY',
  ONCOLOGY = 'ONCOLOGY',
  DERMATOLOGY = 'DERMATOLOGY',
  OPHTHALMOLOGY = 'OPHTHALMOLOGY',
  PATHOLOGY = 'PATHOLOGY',
  ALL = 'ALL',
}

export const musicSubtopicValues = [
  // 🎤 Mainstream
  'POP',
  'ROCK',
  'INDIE',
  'ALTERNATIVE',

  // 🎷 Jazz
  'JAZZ',
  'JAZZ_CLASSICAL',
  'FUSION',

  // 🎻 Classical
  'CLASSICAL',
  'OPERA',
  'NEW_AGE',

  // 🤠 Country & Folk
  'COUNTRY',
  'FOLK',
  'BLUEGRASS',

  // 🥁 Urban & Hip-Hop
  'RAP',
  'HIP_HOP',
  'R&B',
  'SOUL',
  'FUNK',

  // 🎸 Rock
  'METAL',
  'PUNK',
  'GRUNGE',
  'HARDCORE',

  // 🎹 Electrónica
  'ELECTRONIC',
  'EDM',
  'TECHNO',
  'HOUSE',
  'TRANCE',
  'DANCE',
  'DUBSTEP',
  'DRUM_AND_BASS',
  'AMBIENT',
  'IDM',
  'LOFI',

  // 🌍 Global
  'REGGAE',
  'SKA',
  'LATIN',
  'K_POP',
  'WORLD_MUSIC',

  // 🎶 Others
  'BLUES',
  'DISCO',
  'SOUNDTRACK',
  'ALL',
] as const;

export enum MusicSubtopic {
  POP = 'POP',
  ROCK = 'ROCK',
  JAZZ = 'JAZZ',
  CLASSICAL = 'CLASSICAL',
  COUNTRY = 'COUNTRY',
  RAP = 'RAP',
  HIP_HOP = 'HIP_HOP',
  R_B = 'R_B',
  SOUL = 'SOUL',
  FUNK = 'FUNK',
  METAL = 'METAL',
  PUNK = 'PUNK',
  GRUNGE = 'GRUNGE',
  HARDCORE = 'HARDCORE',
  ELECTRONIC = 'ELECTRONIC',
  EDM = 'EDM',
  TECHNO = 'TECHNO',
  HOUSE = 'HOUSE',
  TRANCE = 'TRANCE',
  DANCE = 'DANCE',
  DUBSTEP = 'DUBSTEP',
  DRUM_AND_BASS = 'DRUM_AND_BASS',
  AMBIENT = 'AMBIENT',
  IDM = 'IDM',
  LOFI = 'LOFI',
  REGGAE = 'REGGAE',
  SKA = 'SKA',
  LATIN = 'LATIN',
  K_POP = 'K_POP',
  WORLD_MUSIC = 'WORLD_MUSIC',
  BLUES = 'BLUES',
  DISCO = 'DISCO',
  SOUNDTRACK = 'SOUNDTRACK',
  ALL = 'ALL',
}

export const sportsSubtopicValues = [
  // 🏟️ Team sports (ball games)
  'FOOTBALL', // American football (NFL / NCAA)
  'SOCCER', // World football
  'BASKETBALL',
  'BASEBALL',
  'CRICKET',
  'RUGBY',
  'VOLLEYBALL',
  'BEACH_VOLLEYBALL',
  'HANDBALL',
  'HOCKEY', // Ice hockey
  'FIELD_HOCKEY',
  'LACROSSE',
  'SOFTBALL',
  'FUTSAL',
  'PICKLEBALL',

  // 🥇 Athletics & endurance
  'TRACK_AND_FIELD',
  'MARATHON',
  'CROSS_COUNTRY',
  'CYCLING',
  'MOUNTAIN_BIKING',
  'TRIATHLON',

  // 🤼‍♂️ Combat & martial arts
  'BOXING',
  'MMA',
  'WRESTLING',
  'JUDO',
  'TAEKWONDO',
  'KARATE',
  'KICKBOXING',
  'FENCING',

  // 🏌️ Precision & racket / paddle
  'GOLF',
  'TENNIS',
  'TABLE_TENNIS',
  'BADMINTON',
  'SQUASH',
  'PADDLE_TENNIS',
  'ARCHERY',
  'SHOOTING',
  'DARTS',
  'BILLIARDS',
  'SNOOKER',
  'CHESS', // Mind sport

  // 🏎️ Motor sports & speed
  'MOTORSPORT',
  'FORMULA_1',
  'NASCAR',
  'MOTOGP',
  'RALLY',

  // 🏄 Water sports
  'SWIMMING',
  'DIVING',
  'WATER_POLO',
  'ROWING',
  'CANOEING',
  'SAILING',
  'SURFING',
  'KAYAKING',

  // 🏂 Snow & ice
  'SKIING',
  'SNOWBOARDING',
  'BIATHLON',
  'BOBSLEIGH',
  'SKELETON',
  'CURLING',
  'FIGURE_SKATING',
  'SPEED_SKATING',

  // 🤸 Gymnastics & acrobatics
  'GYMNASTICS',
  'TRAMPOLINE',
  'PARKOUR',
  'SPORT_CLIMBING',
  'SKATEBOARDING',

  // 🐎 Equestrian & other Olympic events
  'EQUESTRIAN',
  'MODERN_PENTATHLON',
  'WEIGHTLIFTING',
  'POWERLIFTING',

  // 🎮 Digital
  'ESPORTS',

  'ALL',
] as const;

export enum SportsSubtopic {
  FOOTBALL = 'FOOTBALL',
  SOCCER = 'SOCCER',
  BASKETBALL = 'BASKETBALL',
  BASEBALL = 'BASEBALL',
  CRICKET = 'CRICKET',
  RUGBY = 'RUGBY',
  VOLLEYBALL = 'VOLLEYBALL',
  BEACH_VOLLEYBALL = 'BEACH_VOLLEYBALL',
  HANDBALL = 'HANDBALL',
  HOCKEY = 'HOCKEY',
  FIELD_HOCKEY = 'FIELD_HOCKEY',
  LACROSSE = 'LACROSSE',
  SOFTBALL = 'SOFTBALL',
  FUTSAL = 'FUTSAL',
  PICKLEBALL = 'PICKLEBALL',
  TRACK_AND_FIELD = 'TRACK_AND_FIELD',
  MARATHON = 'MARATHON',
  CROSS_COUNTRY = 'CROSS_COUNTRY',
  CYCLING = 'CYCLING',
  MOUNTAIN_BIKING = 'MOUNTAIN_BIKING',
  TRIATHLON = 'TRIATHLON',
  BOXING = 'BOXING',
  MMA = 'MMA',
  WRESTLING = 'WRESTLING',
  JUDO = 'JUDO',
  TAEKWONDO = 'TAEKWONDO',
  KARATE = 'KARATE',
  KICKBOXING = 'KICKBOXING',
  FENCING = 'FENCING',
  GOLF = 'GOLF',
  TENNIS = 'TENNIS',
  TABLE_TENNIS = 'TABLE_TENNIS',
  BADMINTON = 'BADMINTON',
  SQUASH = 'SQUASH',
  PADDLE_TENNIS = 'PADDLE_TENNIS',
  ARCHERY = 'ARCHERY',
  SHOOTING = 'SHOOTING',
  DARTS = 'DARTS',
  BILLIARDS = 'BILLIARDS',
  SNOOKER = 'SNOOKER',
  CHESS = 'CHESS',
  MOTORSPORT = 'MOTORSPORT',
  FORMULA_1 = 'FORMULA_1',
  NASCAR = 'NASCAR',
  MOTOGP = 'MOTOGP',
  RALLY = 'RALLY',
  SWIMMING = 'SWIMMING',
  DIVING = 'DIVING',
  WATER_POLO = 'WATER_POLO',
  ROWING = 'ROWING',
  CANOEING = 'CANOEING',
  SAILING = 'SAILING',
  SURFING = 'SURFING',
  KAYAKING = 'KAYAKING',
  SKIING = 'SKIING',
  SNOWBOARDING = 'SNOWBOARDING',
  BIATHLON = 'BIATHLON',
  BOBSLEIGH = 'BOBSLEIGH',
  SKELETON = 'SKELETON',
  CURLING = 'CURLING',
  FIGURE_SKATING = 'FIGURE_SKATING',
  SPEED_SKATING = 'SPEED_SKATING',
  GYMNASTICS = 'GYMNASTICS',
  TRAMPOLINE = 'TRAMPOLINE',
  PARKOUR = 'PARKOUR',
  SPORT_CLIMBING = 'SPORT_CLIMBING',
  SKATEBOARDING = 'SKATEBOARDING',
  EQUESTRIAN = 'EQUESTRIAN',
  MODERN_PENTATHLON = 'MODERN_PENTATHLON',
  WEIGHTLIFTING = 'WEIGHTLIFTING',
  POWERLIFTING = 'POWERLIFTING',
  ESPORTS = 'ESPORTS',
  ALL = 'ALL',
}

export const biologySubtopicValues = [
  'MOLECULAR_BIOLOGY',
  'CELL_BIOLOGY',
  'GENETICS',
  'BIOCHEMISTRY',
  'MICROBIOLOGY',
  'IMMUNOLOGY',
  'PHYSIOLOGY',
  'ANATOMY',
  'NEUROBIOLOGY',
  'ECOLOGY',
  'EVOLUTIONARY_BIOLOGY',
  'BOTANY',
  'ZOOLOGY',
  'MARINE_BIOLOGY',
  'DEVELOPMENTAL_BIOLOGY',
  'BIOTECHNOLOGY',
  'BIOINFORMATICS',
  'SYSTEMS_BIOLOGY',
  'CONSERVATION_BIOLOGY',
  'ALL',
] as const;

export enum BiologySubtopic {
  MOLECULAR_BIOLOGY = 'MOLECULAR_BIOLOGY',
  CELL_BIOLOGY = 'CELL_BIOLOGY',
  GENETICS = 'GENETICS',
  BIOCHEMISTRY = 'BIOCHEMISTRY',
  MICROBIOLOGY = 'MICROBIOLOGY',
  IMMUNOLOGY = 'IMMUNOLOGY',
  PHYSIOLOGY = 'PHYSIOLOGY',
  ANATOMY = 'ANATOMY',
  NEUROBIOLOGY = 'NEUROBIOLOGY',
  ECOLOGY = 'ECOLOGY',
  EVOLUTIONARY_BIOLOGY = 'EVOLUTIONARY_BIOLOGY',
  BOTANY = 'BOTANY',
  ZOOLOGY = 'ZOOLOGY',
  MARINE_BIOLOGY = 'MARINE_BIOLOGY',
  DEVELOPMENTAL_BIOLOGY = 'DEVELOPMENTAL_BIOLOGY',
  BIOTECHNOLOGY = 'BIOTECHNOLOGY',
  BIOINFORMATICS = 'BIOINFORMATICS',
  SYSTEMS_BIOLOGY = 'SYSTEMS_BIOLOGY',
  CONSERVATION_BIOLOGY = 'CONSERVATION_BIOLOGY',
  ALL = 'ALL',
}
