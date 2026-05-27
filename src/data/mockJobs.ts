export type Job = {
  id: string;
  company: string;
  verified: boolean;
  matchPercent: number;
  title: string;
  tags: string[];
  description: string;
};

const SHARED_DESCRIPTION =
  'We are seeking an experienced and results-oriented professional to lead operations across multiple channels. You will be responsible for developing and executing comprehensive strategies that strengthen brand visibility, generate qualified leads, and support the growth objectives. You will work closely with senior leadership, the sales team, and external partners to ensure all efforts are aligned with business goals.';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    company: 'Apex Solutions',
    verified: true,
    matchPercent: 93,
    title: 'Marketing Manager',
    tags: ['Lagos', '7 Years experience', '250K - 350K', 'Full-time'],
    description: SHARED_DESCRIPTION,
  },
  {
    id: '2',
    company: 'Horizon Tech',
    verified: true,
    matchPercent: 88,
    title: 'Product Designer',
    tags: ['Abuja', '4 Years experience', '180K - 240K', 'Full-time'],
    description:
      'Join our growing product team as a Product Designer. You will own the end-to-end design process from discovery and ideation to high-fidelity prototypes and handoff. We are looking for someone with a sharp eye for detail, deep empathy for users, and the ability to collaborate with engineers and PMs in a fast-paced environment.',
  },
  {
    id: '3',
    company: 'NovaPay',
    verified: false,
    matchPercent: 79,
    title: 'Sales Assistant',
    tags: ['Lagos', '2 Years experience', '100K - 150K', 'Full-time'],
    description:
      'We are looking for a motivated Sales Assistant to support our commercial team. Your primary responsibility will be to engage prospects, qualify leads, maintain our CRM, and assist the senior sales team with proposals and client follow-ups. This is a great opportunity to grow into a full sales role within 12 to 18 months.',
  },
  {
    id: '4',
    company: 'Greenfin Bank',
    verified: true,
    matchPercent: 91,
    title: 'Software Engineer',
    tags: ['Remote', '5 Years experience', '300K - 450K', 'Full-time'],
    description:
      'As a Software Engineer at Greenfin, you will build and scale the core banking platform serving millions of customers. You will work on challenging distributed systems problems, contribute to architecture decisions, and mentor junior engineers. We value clean code, strong communication, and a bias for shipping.',
  },
  {
    id: '5',
    company: 'ClearPath HR',
    verified: true,
    matchPercent: 85,
    title: 'Talent Acquisition Lead',
    tags: ['Lagos', '6 Years experience', '200K - 280K', 'Hybrid'],
    description:
      'ClearPath is looking for a Talent Acquisition Lead to own our end-to-end hiring process. You will partner with hiring managers across the business to understand their needs, build talent pipelines, and deliver an excellent candidate experience. Experience in tech hiring is a strong advantage.',
  },
];
