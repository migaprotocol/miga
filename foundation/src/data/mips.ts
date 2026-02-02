export interface MIP {
  id: number;
  title: string;
  titlePersian?: string;
  status: 'draft' | 'discussion' | 'voting' | 'passed' | 'rejected' | 'implemented';
  category: 'governance' | 'treasury' | 'security' | 'culture' | 'infrastructure' | 'process';
  dao?: string;
  author: string;
  created: string;
  summary: string;
  motivation?: string;
}

export const mips: MIP[] = [
  // Governance DAOs (MIP-1 to MIP-5)
  {
    id: 1,
    title: 'Establish MIGA Foundation Charter',
    titlePersian: 'منشور بنیاد میگا',
    status: 'implemented',
    category: 'governance',
    author: 'Founding Council',
    created: '2026-01-01',
    summary: 'Define the foundational charter, mission, and values of the MIGA DAO. Establishes the Cyrus Principle as the guiding philosophy for all governance decisions.',
    motivation: 'Every organization needs a foundational document. The MIGA Charter grounds our work in Persian heritage and human rights principles.'
  },
  {
    id: 2,
    title: 'vePARS Governance Model',
    titlePersian: 'مدل حکمرانی vePARS',
    status: 'implemented',
    category: 'governance',
    author: 'Founding Council',
    created: '2026-01-05',
    summary: 'Implement vote-escrow PARS (vePARS) as the governance token. Formula: vePARS = min(PARS, MIGA) × sqrt(lock_duration / max_duration).',
    motivation: 'Prevent governance capture by requiring commitment (time-lock) and balance (both tokens needed).'
  },
  {
    id: 3,
    title: 'Ten DAO Structure Ratification',
    titlePersian: 'تصویب ساختار ده دائو',
    status: 'implemented',
    category: 'governance',
    dao: 'DAD',
    author: 'Founding Council',
    created: '2026-01-10',
    summary: 'Ratify the ten specialized DAOs with Persian heritage names: KHAZ, AMN, SAL, FARH, DAN, SAZ, DAD, PAY, WAQF, and MIZ.',
    motivation: 'Separate concerns while maintaining unified governance. Each pillar addresses a critical civic function.'
  },
  {
    id: 4,
    title: 'MIP Process and Standards',
    titlePersian: 'فرآیند و استانداردهای MIP',
    status: 'implemented',
    category: 'process',
    dao: 'DAD',
    author: 'Founding Council',
    created: '2026-01-15',
    summary: 'Define the MIGA Improvement Proposal (MIP) process, including submission requirements, voting periods, and implementation guidelines.',
    motivation: 'Structured governance processes ensure fair consideration of all proposals and clear execution paths.'
  },
  {
    id: 5,
    title: 'Progressive Decentralization Roadmap',
    titlePersian: 'نقشه راه تمرکززدایی تدریجی',
    status: 'passed',
    category: 'governance',
    author: 'Founding Council',
    created: '2026-01-20',
    summary: 'Outline the transition from founding council stewardship to full community governance over four phases.',
    motivation: 'Transparent timeline for decentralization builds trust and accountability.'
  },

  // Treasury (MIP-6 to MIP-10)
  {
    id: 6,
    title: 'Initial Treasury Allocation',
    titlePersian: 'تخصیص اولیه خزانه',
    status: 'implemented',
    category: 'treasury',
    dao: 'KHAZ',
    author: 'Founding Council',
    created: '2026-01-25',
    summary: 'Allocate 50% of token supply to DAO treasury, distributed across ten pillars based on initial target percentages.',
    motivation: 'Fair initial distribution ensures each DAO has resources to begin operations.'
  },
  {
    id: 7,
    title: 'KHAZ Reserve Strategy',
    titlePersian: 'استراتژی ذخیره خزانه',
    status: 'passed',
    category: 'treasury',
    dao: 'KHAZ',
    author: 'KHAZ Committee',
    created: '2026-02-01',
    summary: 'Implement diversified reserve strategy: 40% stablecoins, 30% ETH, 20% SOL, 10% other blue chips.',
    motivation: 'Diversification protects treasury value against single-asset volatility.'
  },
  {
    id: 8,
    title: 'Grant Program Framework',
    titlePersian: 'چارچوب برنامه کمک‌های مالی',
    status: 'passed',
    category: 'treasury',
    dao: 'KHAZ',
    author: 'KHAZ Committee',
    created: '2026-02-10',
    summary: 'Establish framework for grants to builders, researchers, and community organizers across all DAOs.',
    motivation: 'Grants attract talent and fund essential work for protocol growth.'
  },
  {
    id: 9,
    title: 'Quarterly Financial Reporting',
    titlePersian: 'گزارش مالی سه‌ماهه',
    status: 'voting',
    category: 'treasury',
    dao: 'MIZ',
    author: 'MIZ Committee',
    created: '2026-02-15',
    summary: 'Mandate quarterly transparency reports covering all DAO treasuries, allocations, and expenditures.',
    motivation: 'Regular reporting ensures accountability and community trust.'
  },
  {
    id: 10,
    title: 'WAQF Endowment Guidelines',
    titlePersian: 'دستورالعمل‌های وقف',
    status: 'discussion',
    category: 'treasury',
    dao: 'WAQF',
    author: 'WAQF Committee',
    created: '2026-02-20',
    summary: 'Define long-horizon investment guidelines for the WAQF endowment DAO, preserving principal for perpetual benefit.',
    motivation: 'Following Persian waqf tradition, the endowment should exist in perpetuity.'
  },

  // Security (MIP-11 to MIP-14)
  {
    id: 11,
    title: 'Multi-Sig Security Requirements',
    titlePersian: 'الزامات امنیتی چندامضایی',
    status: 'implemented',
    category: 'security',
    dao: 'AMN',
    author: 'AMN Committee',
    created: '2026-02-25',
    summary: 'Require 3-of-5 multi-sig for all DAO treasury operations above 10,000 USDC equivalent.',
    motivation: 'Multi-sig prevents single points of failure in treasury management.'
  },
  {
    id: 12,
    title: 'Smart Contract Audit Policy',
    titlePersian: 'سیاست حسابرسی قرارداد هوشمند',
    status: 'passed',
    category: 'security',
    dao: 'AMN',
    author: 'AMN Committee',
    created: '2026-03-01',
    summary: 'All smart contracts must undergo third-party security audits before mainnet deployment.',
    motivation: 'Audits reduce the risk of exploits that could harm the community.'
  },
  {
    id: 13,
    title: 'Privacy-Preserving Voting',
    titlePersian: 'رأی‌گیری حافظ حریم خصوصی',
    status: 'discussion',
    category: 'security',
    dao: 'AMN',
    author: 'AMN Committee',
    created: '2026-03-05',
    summary: 'Implement ZK-proof based voting for sensitive proposals to protect voter privacy in high-threat environments.',
    motivation: 'Members in dangerous jurisdictions need privacy protection to participate safely.'
  },
  {
    id: 14,
    title: 'Bug Bounty Program',
    titlePersian: 'برنامه پاداش باگ',
    status: 'passed',
    category: 'security',
    dao: 'AMN',
    author: 'AMN Committee',
    created: '2026-03-10',
    summary: 'Establish bug bounty program with rewards up to 50,000 USDC for critical vulnerabilities.',
    motivation: 'Incentivize white-hat security researchers to report vulnerabilities.'
  },

  // Culture (MIP-15 to MIP-18)
  {
    id: 15,
    title: 'Persian Language Preservation Initiative',
    titlePersian: 'طرح حفظ زبان فارسی',
    status: 'passed',
    category: 'culture',
    dao: 'FARH',
    author: 'FARH Committee',
    created: '2026-03-15',
    summary: 'Fund Persian language education programs for diaspora youth, including online courses and scholarships.',
    motivation: 'Language is the carrier of culture. Many diaspora children are losing Persian fluency.'
  },
  {
    id: 16,
    title: 'Cultural Heritage Documentation',
    titlePersian: 'مستندسازی میراث فرهنگی',
    status: 'voting',
    category: 'culture',
    dao: 'FARH',
    author: 'FARH Committee',
    created: '2026-03-20',
    summary: 'Create digital archive of Persian art, music, literature, and oral histories from diaspora communities.',
    motivation: 'Preserving cultural memory for future generations before it is lost.'
  },
  {
    id: 17,
    title: 'Nowruz Global Festival Fund',
    titlePersian: 'صندوق جشن جهانی نوروز',
    status: 'passed',
    category: 'culture',
    dao: 'FARH',
    author: 'FARH Committee',
    created: '2026-03-25',
    summary: 'Annual grants to support Nowruz celebrations in diaspora communities worldwide.',
    motivation: 'Nowruz unites all Persians regardless of religion or politics.'
  },
  {
    id: 18,
    title: 'Artist Residency Program',
    titlePersian: 'برنامه اقامت هنرمندان',
    status: 'discussion',
    category: 'culture',
    dao: 'FARH',
    author: 'FARH Committee',
    created: '2026-03-30',
    summary: 'Fund residencies for Persian artists working in any medium, with emphasis on diaspora themes.',
    motivation: 'Art expresses what politics cannot. Support artists telling our stories.'
  },

  // Infrastructure (MIP-19 to MIP-22)
  {
    id: 19,
    title: '7-Chain Bridge Deployment',
    titlePersian: 'استقرار پل ۷ زنجیره‌ای',
    status: 'passed',
    category: 'infrastructure',
    dao: 'SAZ',
    author: 'SAZ Committee',
    created: '2026-04-01',
    summary: 'Deploy MIGA token bridges to Ethereum, Base, Arbitrum, Polygon, Lux, and Bitcoin (Runes) via Wormhole.',
    motivation: 'Multi-chain presence maximizes accessibility and liquidity.'
  },
  {
    id: 20,
    title: 'ERC-4626 Vault Standard',
    titlePersian: 'استاندارد خزانه ERC-4626',
    status: 'implemented',
    category: 'infrastructure',
    dao: 'SAZ',
    author: 'SAZ Committee',
    created: '2026-04-05',
    summary: 'Implement ERC-4626 tokenized vaults for all ten DAOs on EVM chains.',
    motivation: 'Standard vault interface enables composability with DeFi ecosystem.'
  },
  {
    id: 21,
    title: 'Lux Privacy Integration',
    titlePersian: 'یکپارچه‌سازی حریم خصوصی لوکس',
    status: 'discussion',
    category: 'infrastructure',
    dao: 'SAZ',
    author: 'SAZ Committee',
    created: '2026-04-10',
    summary: 'Integrate Pars Network privacy features for optional confidential transactions and voting.',
    motivation: 'Privacy is essential for members in high-threat environments.'
  },
  {
    id: 22,
    title: 'Developer SDK and Documentation',
    titlePersian: 'SDK و مستندات توسعه‌دهنده',
    status: 'voting',
    category: 'infrastructure',
    dao: 'SAZ',
    author: 'SAZ Committee',
    created: '2026-04-15',
    summary: 'Create comprehensive SDK and documentation for developers building on MIGA infrastructure.',
    motivation: 'Developer experience determines ecosystem growth rate.'
  },

  // Process and Meta (MIP-23 to MIP-25)
  {
    id: 23,
    title: 'Community Chapter Framework',
    titlePersian: 'چارچوب بخش‌های جامعه',
    status: 'passed',
    category: 'process',
    dao: 'PAY',
    author: 'PAY Committee',
    created: '2026-04-20',
    summary: 'Define framework for establishing and supporting MIGA community chapters in cities worldwide.',
    motivation: 'Local chapters build real-world community beyond digital tokens.'
  },
  {
    id: 24,
    title: 'Research Grant Program',
    titlePersian: 'برنامه کمک‌هزینه تحقیقاتی',
    status: 'voting',
    category: 'process',
    dao: 'DAN',
    author: 'DAN Committee',
    created: '2026-04-25',
    summary: 'Establish grants for academic research on diaspora governance, Iranian history, and related topics.',
    motivation: 'Rigorous research strengthens our understanding and legitimacy.'
  },
  {
    id: 25,
    title: 'Health Resource Network',
    titlePersian: 'شبکه منابع سلامت',
    status: 'draft',
    category: 'process',
    dao: 'SAL',
    author: 'SAL Committee',
    created: '2026-04-30',
    summary: 'Create network connecting Persian healthcare professionals with community members needing care.',
    motivation: 'Healthcare access is a critical need, especially for recent immigrants.'
  },
];

export const mipCategories = {
  governance: { label: 'Governance', color: 'indigo' },
  treasury: { label: 'Treasury', color: 'amber' },
  security: { label: 'Security', color: 'red' },
  culture: { label: 'Culture', color: 'purple' },
  infrastructure: { label: 'Infrastructure', color: 'green' },
  process: { label: 'Process', color: 'cyan' },
};

export const mipStatuses = {
  draft: { label: 'Draft', color: 'gray' },
  discussion: { label: 'Discussion', color: 'blue' },
  voting: { label: 'Voting', color: 'yellow' },
  passed: { label: 'Passed', color: 'green' },
  rejected: { label: 'Rejected', color: 'red' },
  implemented: { label: 'Implemented', color: 'emerald' },
};
