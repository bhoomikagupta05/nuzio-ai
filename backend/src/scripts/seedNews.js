import mongoose from 'mongoose';
import config from '../config/env.js';
import Article from '../models/Article.js';
import logger from '../utils/logger.js';

const SEED_ARTICLES = [
  {
    id: 'story-1',
    category: 'AI & Technology',
    title: 'OpenAI & Anthropic Announce Next-Gen Autonomous Reasoning Models for Enterprise',
    summary: 'Major AI laboratories have simultaneously published production benchmarks for autonomous system agents capable of executing multi-stage complex workflows.',
    bulletPoints: [
      'Next-generation reasoning benchmarks demonstrate 42% fewer hallucinations on enterprise codebase and data synthesis tasks.',
      'Tier-1 financial institutions have begun pilot integrations for automated regulatory compliance reporting.',
      'Deployment frameworks introduce localized sovereign sandbox execution to resolve privacy and data locality mandates.',
    ],
    content: 'In a landmark week for artificial intelligence development, leading research laboratories have unveiled their latest foundation models designed explicitly for autonomous enterprise automation. Unlike previous conversational interfaces, these systems operate with recursive chain-of-thought verification, enabling reliable execution of software engineering, financial modeling, and regulatory analysis without human intervention.',
    source: {
      name: 'Reuters Technology',
      url: 'https://reuters.com',
      publishedAt: '12m ago',
    },
    readTime: '2 min read',
    audioDuration: '1:45',
    isFeatured: true,
    tags: ['#GenerativeAI', '#Semiconductors', '#Enterprise'],
  },
  {
    id: 'story-2',
    category: 'Financial Markets',
    title: 'Global Semiconductor Stocks Surge Following Record 3nm Foundry Commitments',
    summary: 'Asian and US semiconductor manufacturers experienced broad rallies after hyperscalers locked in multi-year fabrication capacity for custom AI accelerators.',
    bulletPoints: [
      'Leading fabrication facilities report 100% capacity utilization through Q4 2027.',
      'Memory and packaging suppliers gained between 4% and 7% in pre-market trading.',
      'Analysts project capital expenditure in specialized silicon to exceed $180 billion over the next fiscal cycle.',
    ],
    content: 'Semiconductor equities surged worldwide on Thursday following reports of unprecedented advance capacity reservations from major cloud service providers. The transition toward sub-3-nanometer architectures is driving massive capital expenditures in advanced lithography and packaging infrastructure.',
    source: {
      name: 'Bloomberg Markets',
      url: 'https://bloomberg.com',
      publishedAt: '28m ago',
    },
    readTime: '2 min read',
    audioDuration: '1:30',
    isFeatured: false,
    tags: ['#Semiconductors', '#FederalReserve', '#Markets'],
  },
  {
    id: 'story-3',
    category: 'Indian Business',
    title: "India's Digital Infrastructure Capex Crosses $35B in Renewable Energy Push",
    summary: 'Government initiatives and private equity consortiums announce major green data center corridors across Maharashtra, Tamil Nadu, and Gujarat.',
    bulletPoints: [
      'Unified single-window environmental clearances approved for high-density compute facilities with captive solar power.',
      'Domestic cloud infrastructure capacity projected to triple by 2028 with domestic data localization incentives.',
      'Key sovereign wealth funds commit $12B in direct equity alongside prominent domestic conglomerates.',
    ],
    content: "India's tech infrastructure investments reached a major milestone as sovereign wealth funds and domestic conglomerates signed joint ventures for green data centers. The initiatives aim to establish energy-efficient hyperscale clusters powered directly by dedicated renewable solar and wind corridors.",
    source: {
      name: 'Economic Times',
      url: 'https://economictimes.indiatimes.com',
      publishedAt: '45m ago',
    },
    readTime: '3 min read',
    audioDuration: '2:10',
    isFeatured: false,
    tags: ['#StartupsIndia', '#CleanEnergy', '#Infrastructure'],
  },
  {
    id: 'story-4',
    category: 'Global Geopolitics',
    title: 'G7 Reaches Historic Accord on Cross-Border AI Safety and Data Sovereign Frameworks',
    summary: 'Ministers from G7 nations have finalized unified compliance guidelines for frontier artificial intelligence model weights and critical intellectual property transfers.',
    bulletPoints: [
      'Harmonized risk tiers establish standardized evaluation criteria for systems trained above 10^26 FLOPs.',
      'Streamlined export authorizations for aligned democratic partners to facilitate joint scientific research.',
      'Dedicated international red-teaming council to maintain continuous threat models against cyber-attacks.',
    ],
    content: 'Delegates from the Group of Seven economies concluded a multi-day summit with a unified treaty on frontier artificial intelligence governance. The accord aligns baseline risk evaluation thresholds while reducing bureaucratic hurdles for allied research and semiconductor trade.',
    source: {
      name: 'Financial Times',
      url: 'https://ft.com',
      publishedAt: '1h ago',
    },
    readTime: '3 min read',
    audioDuration: '1:55',
    isFeatured: false,
    tags: ['#Policy', '#Security', '#Geopolitics'],
  },
  {
    id: 'story-5',
    category: 'Science & Health',
    title: 'CRISPR-Based Precision Therapeutics Receive Breakthrough FDA Fast-Track Designation',
    summary: 'Novel in-vivo gene editing vectors demonstrated targeted correction of previously untreatable genetic cardiomyopathies in multi-center clinical trials.',
    bulletPoints: [
      'Next-generation lipid nanoparticle delivery demonstrated 94% organ selectivity in phase 2 studies.',
      'Zero off-target genomic cleavage detected across comprehensive deep-sequencing audits.',
      'Fast-track status accelerates regulatory review cycles by an estimated fourteen months.',
    ],
    content: 'Biotechnology researchers achieved a clinical breakthrough as the FDA granted expedited review to a novel in-vivo gene editing therapy for hereditary cardiac conditions. The therapy utilizes ultra-precise lipid nanoparticles to deliver therapeutic enzymes directly to affected cardiac cells.',
    source: {
      name: 'Nature Biotechnology',
      url: 'https://nature.com',
      publishedAt: '2h ago',
    },
    readTime: '2 min read',
    audioDuration: '1:40',
    isFeatured: false,
    tags: ['#Biotech', '#Science', '#Health'],
  },
  {
    id: 'story-6',
    category: 'Crypto & Web3',
    title: 'Institutional Tokenized Real-World Assets Surpass $15 Billion on Layer-1 Chains',
    summary: 'Global asset managers expand tokenized treasury bills and private credit instruments across public and permissioned distributed ledgers.',
    bulletPoints: [
      'Tokenized sovereign debt instruments accounted for over 65% of total value locked growth in Q3.',
      'Regulatory clearance in European and Asian financial hubs spurs secondary liquidity markets.',
      'Major custodian banks unveil direct on-chain settlement channels for institutional clients.',
    ],
    content: 'Institutional adoption of tokenized real-world assets reached unprecedented heights this quarter. Major investment banks and asset managers have accelerated the migration of money market funds and commercial paper onto blockchain rails, capitalizing on 24/7 instant settlement.',
    source: {
      name: 'CoinDesk Institutional',
      url: 'https://coindesk.com',
      publishedAt: '3h ago',
    },
    readTime: '2 min read',
    audioDuration: '1:35',
    isFeatured: false,
    tags: ['#Crypto', '#Tokenization', '#Finance'],
  },
  {
    id: 'story-7',
    category: 'Climate & Energy',
    title: 'Solid-State Battery Breakthrough Yields 800-Mile Range in Commercial Prototypes',
    summary: 'Automotive research consortium validates silicon-anode solid-state cells with 12-minute rapid charging under extreme thermal variations.',
    bulletPoints: [
      'Energy density exceeds 500 Wh/kg with stable operation over 1,200 continuous charge cycles.',
      'Pilot manufacturing lines slated for high-volume automotive production by early 2027.',
      'Thermal runaway risk reduced to near-zero through proprietary ceramic solid electrolyte separator.',
    ],
    content: 'A breakthrough in solid-state battery chemistry promises to transform electric transportation. Next-generation prototypes demonstrated energy densities double that of conventional lithium-ion batteries while drastically reducing charging times and eliminating thermal runaway hazards.',
    source: {
      name: 'MIT Technology Review',
      url: 'https://technologyreview.com',
      publishedAt: '4h ago',
    },
    readTime: '3 min read',
    audioDuration: '2:00',
    isFeatured: false,
    tags: ['#CleanEnergy', '#Batteries', '#ClimateTech'],
  },
];

async function seedDatabase() {
  try {
    logger.info('Connecting to MongoDB Atlas...');
    await mongoose.connect(config.mongodbUri, {
      dbName: 'nuzio',
      serverSelectionTimeoutMS: 10000,
    });
    logger.success('Connected to MongoDB Atlas.');

    for (const article of SEED_ARTICLES) {
      await Article.findOneAndUpdate(
        { id: article.id },
        { $set: article },
        { upsert: true, new: true }
      );
      logger.info(`Upserted article: [${article.category}] ${article.title.substring(0, 45)}...`);
    }

    const count = await Article.countDocuments();
    logger.success(`Seeding complete. Total articles in Atlas database: ${count}`);
    process.exit(0);
  } catch (error) {
    logger.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
}

seedDatabase();
