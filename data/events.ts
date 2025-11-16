export interface Fighter {
  name: string
  image: string
  record?: string
}

export interface Fight {
  id: string
  fighter1: Fighter
  fighter2: Fighter
  modelPick: string
  confidence: number
  odds: number
  edgeVsMarket: number
  weightClass: string
  analysis: string
  keyEdges: string[]
}

export interface Event {
  id: string
  name: string
  date: string
  location: string
  poster: string
  fights: Fight[]
}

function getFighterImage(fighterName: string): string {
  // Generate fighter-specific image using placeholder with query
  const formattedName = fighterName.toLowerCase().replace(/\s+/g, '-')
  return `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(`${fighterName} UFC fighter headshot`)}`
}

// Helper function to calculate implied probability from decimal odds
function calculateImpliedProbability(decimalOdds: number): number {
  return (1 / decimalOdds) * 100
}

// Helper function to parse fight string into two fighters
function parseFighters(fightString: string): [string, string] {
  const fighters = fightString.split(' vs ')
  return [fighters[0].trim(), fighters[1].trim()]
}

// Helper function to parse key edges
function parseKeyEdges(edgesString: string): string[] {
  return edgesString.split('  |  ').map(edge => edge.trim())
}

// UFC 322 Event Data - November 15, 2025
export const events: Event[] = [
  {
    id: "ufc-322",
    name: "UFC 322: Della Maddalena vs Makhachev",
    date: "2025-11-15",
    location: "Las Vegas, NV",
    poster: "/ufc-322-event-poster-featuring-della-maddalena-vs-.jpg",
    fights: [
      {
        id: "ufc-322-1",
        fighter1: {
          name: "Jack Della Maddalena",
          image: getFighterImage("Jack Della Maddalena"),
          record: "16-2-0"
        },
        fighter2: {
          name: "Islam Makhachev",
          image: getFighterImage("Islam Makhachev"),
          record: "26-1-0"
        },
        modelPick: "Islam Makhachev",
        confidence: 63.6,
        odds: 1.35,
        edgeVsMarket: 63.6 - calculateImpliedProbability(1.35),
        weightClass: "Lightweight",
        analysis: "Islam Makhachev holds significant advantages in clinch game, wrestling pressure, and takedown defense. His well-rounded grappling game should control the pace against Della Maddalena's striking-focused approach.",
        keyEdges: parseKeyEdges("Clinch game edge Islam Makhachev  |  Wrestling pressure edge Islam Makhachev  |  TDD edge Islam Makhachev")
      },
      {
        id: "ufc-322-2",
        fighter1: {
          name: "Valentina Shevchenko",
          image: getFighterImage("Valentina Shevchenko"),
          record: "23-4-0"
        },
        fighter2: {
          name: "Zhang Weili",
          image: getFighterImage("Zhang Weili"),
          record: "24-3-0"
        },
        modelPick: "Valentina Shevchenko",
        confidence: 51.5,
        odds: 1.74,
        edgeVsMarket: 51.5 - calculateImpliedProbability(1.74),
        weightClass: "Women's Flyweight",
        analysis: "Shevchenko's superior fight IQ and 3-inch reach advantage give her a slight edge in this close matchup. The model sees value at -5.9pp against the market odds.",
        keyEdges: parseKeyEdges("Fight IQ edge Valentina Shevchenko  |  Reach +3 in for Valentina Shevchenko  |  Model vs market: 51.5% vs 57.4% (-5.9pp edge)")
      },
      {
        id: "ufc-322-3",
        fighter1: {
          name: "Sean Brady",
          image: getFighterImage("Sean Brady"),
          record: "16-1-0"
        },
        fighter2: {
          name: "Michael Morales",
          image: getFighterImage("Michael Morales"),
          record: "15-0-0"
        },
        modelPick: "Sean Brady",
        confidence: 51.5,
        odds: 1.74,
        edgeVsMarket: 51.5 - calculateImpliedProbability(1.74),
        weightClass: "Welterweight",
        analysis: "Brady's advantages in kicking offense, clinch game, and takedown defense make him a slight favorite. This is expected to be a competitive welterweight bout.",
        keyEdges: parseKeyEdges("Kicking offense edge Sean Brady  |  Clinch game edge Sean Brady  |  TDD edge Sean Brady")
      },
      {
        id: "ufc-322-4",
        fighter1: {
          name: "Leon Edwards",
          image: getFighterImage("Leon Edwards"),
          record: "22-3-0"
        },
        fighter2: {
          name: "Carlos Prates",
          image: getFighterImage("Carlos Prates"),
          record: "20-6-0"
        },
        modelPick: "Carlos Prates",
        confidence: 55.7,
        odds: 1.60,
        edgeVsMarket: 55.7 - calculateImpliedProbability(1.60),
        weightClass: "Welterweight",
        analysis: "Prates' kicking offense and 4-inch reach advantage give him the edge in this high-variance matchup. Expect an exciting striking battle with potential for a finish.",
        keyEdges: parseKeyEdges("Kicking offense edge Carlos Prates  |  Reach +4 in for Carlos Prates  |  High-variance bout")
      },
      {
        id: "ufc-322-5",
        fighter1: {
          name: "Beneil Dariush",
          image: getFighterImage("Beneil Dariush"),
          record: "22-5-1"
        },
        fighter2: {
          name: "Benoit Saint Denis",
          image: getFighterImage("Benoit Saint Denis"),
          record: "13-2-0"
        },
        modelPick: "Benoit Saint Denis",
        confidence: 66.2,
        odds: 1.56,
        edgeVsMarket: 66.2 - calculateImpliedProbability(1.56),
        weightClass: "Lightweight",
        analysis: "Saint Denis' superior cardio and Dariush's flagged durability and pace decline make this a strong pick. The younger fighter should impose his will late in the fight.",
        keyEdges: parseKeyEdges("Cardio edge Benoit Saint Denis  |  Beneil Dariush durability flagged  |  Beneil Dariush pace decline noted")
      },
      {
        id: "ufc-322-6",
        fighter1: {
          name: "Bo Nickal",
          image: getFighterImage("Bo Nickal"),
          record: "6-0-0"
        },
        fighter2: {
          name: "Rodolfo Vieira",
          image: getFighterImage("Rodolfo Vieira"),
          record: "9-2-0"
        },
        modelPick: "Bo Nickal",
        confidence: 56.5,
        odds: 1.49,
        edgeVsMarket: 56.5 - calculateImpliedProbability(1.49),
        weightClass: "Middleweight",
        analysis: "Nickal's clinch game, takedown defense, and 3-inch reach advantage give him the edge over Vieira. This high-level grappling matchup favors the younger wrestler.",
        keyEdges: parseKeyEdges("Clinch game edge Bo Nickal  |  TDD edge Bo Nickal  |  Reach +3 in for Bo Nickal")
      },
      {
        id: "ufc-322-7",
        fighter1: {
          name: "Roman Kopylov",
          image: getFighterImage("Roman Kopylov"),
          record: "13-3-0"
        },
        fighter2: {
          name: "Gregory Rodrigues",
          image: getFighterImage("Gregory Rodrigues"),
          record: "15-5-0"
        },
        modelPick: "Gregory Rodrigues",
        confidence: 51.4,
        odds: 1.56,
        edgeVsMarket: 51.4 - calculateImpliedProbability(1.56),
        weightClass: "Middleweight",
        analysis: "Rodrigues holds advantages in clinch game, wrestling pressure, and defensive BJJ. This close middleweight matchup should feature grappling exchanges.",
        keyEdges: parseKeyEdges("Clinch game edge Gregory Rodrigues  |  Wrestling pressure edge Gregory Rodrigues  |  Defensive BJJ edge Gregory Rodrigues")
      },
      {
        id: "ufc-322-8",
        fighter1: {
          name: "Erin Blanchfield",
          image: getFighterImage("Erin Blanchfield"),
          record: "12-2-0"
        },
        fighter2: {
          name: "Tracy Cortez",
          image: getFighterImage("Tracy Cortez"),
          record: "11-1-0"
        },
        modelPick: "Erin Blanchfield",
        confidence: 54.8,
        odds: 1.40,
        edgeVsMarket: 54.8 - calculateImpliedProbability(1.40),
        weightClass: "Women's Flyweight",
        analysis: "Blanchfield's boxing craft, submission threat, and home optics give her multiple paths to victory. Her well-rounded game should control the fight.",
        keyEdges: parseKeyEdges("Boxing craft edge Erin Blanchfield  |  Submission threat edge Erin Blanchfield  |  Home optics Erin Blanchfield")
      },
      {
        id: "ufc-322-9",
        fighter1: {
          name: "Malcolm Wellmaker",
          image: getFighterImage("Malcolm Wellmaker"),
          record: "10-2-0"
        },
        fighter2: {
          name: "Ethyn Ewing",
          image: getFighterImage("Ethyn Ewing"),
          record: "8-2-0"
        },
        modelPick: "Malcolm Wellmaker",
        confidence: 62.8,
        odds: 1.17,
        edgeVsMarket: 62.8 - calculateImpliedProbability(1.17),
        weightClass: "Featherweight",
        analysis: "Wellmaker dominates across all key metrics including boxing craft, wrestling pressure, and submission threat. This should be a dominant performance.",
        keyEdges: parseKeyEdges("Boxing craft edge Malcolm Wellmaker  |  Wrestling pressure edge Malcolm Wellmaker  |  Submission threat edge Malcolm Wellmaker")
      },
      {
        id: "ufc-322-10",
        fighter1: {
          name: "Kyle Daukaus",
          image: getFighterImage("Kyle Daukaus"),
          record: "12-3-0"
        },
        fighter2: {
          name: "Gerald Meerschaert",
          image: getFighterImage("Gerald Meerschaert"),
          record: "36-17-0"
        },
        modelPick: "Kyle Daukaus",
        confidence: 66.6,
        odds: 1.22,
        edgeVsMarket: 66.6 - calculateImpliedProbability(1.22),
        weightClass: "Middleweight",
        analysis: "Daukaus' superior takedown defense, fight IQ, and home advantage make him a strong favorite against the veteran Meerschaert.",
        keyEdges: parseKeyEdges("TDD edge Kyle Daukaus  |  Fight IQ edge Kyle Daukaus  |  Home optics Kyle Daukaus")
      },
      {
        id: "ufc-322-11",
        fighter1: {
          name: "Pat Sabatini",
          image: getFighterImage("Pat Sabatini"),
          record: "18-4-0"
        },
        fighter2: {
          name: "Chepe Mariscal",
          image: getFighterImage("Chepe Mariscal"),
          record: "15-6-0"
        },
        modelPick: "Chepe Mariscal",
        confidence: 55.4,
        odds: 2.05,
        edgeVsMarket: 55.4 - calculateImpliedProbability(2.05),
        weightClass: "Featherweight",
        analysis: "Mariscal's edges in kicking offense, takedown defense, and cardio make him a value underdog at +105 odds. Strong edge against the market pricing.",
        keyEdges: parseKeyEdges("Kicking offense edge Chepe Mariscal  |  TDD edge Chepe Mariscal  |  Cardio edge Chepe Mariscal")
      },
      {
        id: "ufc-322-12",
        fighter1: {
          name: "Angela Hill",
          image: getFighterImage("Angela Hill"),
          record: "16-13-0"
        },
        fighter2: {
          name: "Fatima Kline",
          image: getFighterImage("Fatima Kline"),
          record: "7-0-0"
        },
        modelPick: "Fatima Kline",
        confidence: 56.9,
        odds: 1.19,
        edgeVsMarket: 56.9 - calculateImpliedProbability(1.19),
        weightClass: "Women's Strawweight",
        analysis: "Kline's defensive BJJ, 3-inch reach advantage, and massive -27.0pp edge vs market make this a strong value pick against the overpriced favorite.",
        keyEdges: parseKeyEdges("Defensive BJJ edge Fatima Kline  |  Reach +3 in for Fatima Kline  |  Model vs market: 56.9% vs 83.9% (-27.0pp edge)")
      },
      {
        id: "ufc-322-13",
        fighter1: {
          name: "Baisangur Susurkaev",
          image: getFighterImage("Baisangur Susurkaev"),
          record: "15-4-0"
        },
        fighter2: {
          name: "Eric McConico",
          image: getFighterImage("Eric McConico"),
          record: "7-1-0"
        },
        modelPick: "Baisangur Susurkaev",
        confidence: 75.3,
        odds: 1.09,
        edgeVsMarket: 75.3 - calculateImpliedProbability(1.09),
        weightClass: "Light Heavyweight",
        analysis: "Susurkaev dominates in boxing craft, clinch game, and wrestling pressure. This high-confidence pick should result in a dominant performance.",
        keyEdges: parseKeyEdges("Boxing craft edge Baisangur Susurkaev  |  Clinch game edge Baisangur Susurkaev  |  Wrestling pressure edge Baisangur Susurkaev")
      },
      {
        id: "ufc-322-14",
        fighter1: {
          name: "Viacheslav Borshchev",
          image: getFighterImage("Viacheslav Borshchev"),
          record: "7-4-1"
        },
        fighter2: {
          name: "Matheus Camilo",
          image: getFighterImage("Matheus Camilo"),
          record: "4-0-0"
        },
        modelPick: "Matheus Camilo",
        confidence: 57.9,
        odds: 1.60,
        edgeVsMarket: 57.9 - calculateImpliedProbability(1.60),
        weightClass: "Lightweight",
        analysis: "Camilo's wrestling pressure, takedown defense, and submission threat give him multiple paths to victory against Borshchev's striking-focused game.",
        keyEdges: parseKeyEdges("Wrestling pressure edge Matheus Camilo  |  TDD edge Matheus Camilo  |  Submission threat edge Matheus Camilo")
      }
    ]
  }
]
