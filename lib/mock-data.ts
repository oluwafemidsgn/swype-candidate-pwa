import type { Job } from './types'

const SHARED_DESC =
  'We are seeking an experienced and results-oriented professional to lead operations across multiple channels. You will be responsible for developing and executing comprehensive strategies that strengthen brand visibility, generate qualified leads, and support growth objectives.'

export const mockJobs: Job[] = [
  {
    id: '1',
    company: 'Apex Solutions',
    verified: true,
    matchPercent: 93,
    title: 'Marketing Manager',
    tags: ['Lagos', '7 Years experience', '250K - 350K', 'Full-time'],
    description: SHARED_DESC,
  },
  {
    id: '2',
    company: 'Horizon Tech',
    verified: true,
    matchPercent: 88,
    title: 'Product Designer',
    tags: ['Abuja', '4 Years experience', '180K - 240K', 'Full-time'],
    description:
      'Join our growing product team as a Product Designer. You will own the end-to-end design process from discovery and ideation to high-fidelity prototypes and handoff.',
  },
  {
    id: '3',
    company: 'NovaPay',
    verified: false,
    matchPercent: 79,
    title: 'Sales Assistant',
    tags: ['Lagos', '2 Years experience', '100K - 150K', 'Full-time'],
    description:
      'We are looking for a motivated Sales Assistant to support our commercial team. Your primary responsibility will be to engage prospects, qualify leads, and maintain our CRM.',
  },
  {
    id: '4',
    company: 'Greenfin Bank',
    verified: true,
    matchPercent: 91,
    title: 'Software Engineer',
    tags: ['Remote', '5 Years experience', '300K - 450K', 'Full-time'],
    description:
      'As a Software Engineer at Greenfin, you will build and scale the core banking platform serving millions of customers across Nigeria.',
  },
  {
    id: '5',
    company: 'ClearPath HR',
    verified: true,
    matchPercent: 85,
    title: 'Talent Acquisition Lead',
    tags: ['Lagos', '6 Years experience', '200K - 280K', 'Hybrid'],
    description:
      'ClearPath is looking for a Talent Acquisition Lead to own our end-to-end hiring process and partner with hiring managers across the business.',
  },
]
