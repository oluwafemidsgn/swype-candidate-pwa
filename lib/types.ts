export type Screen =
  | 'splash'
  | 'signup'
  | 'profile-setup'
  | 'video-record'
  | 'job-feed'
  | 'job-detail'
  | 'match'
  | 'messages'
  | 'chat'
  | 'applications'
  | 'premium'

export type Job = {
  id: string
  company: string
  title: string
  location: string
  salary: string
  type: string
  posted: string
  verified: boolean
  description: string
  requirements: string[]
  niceToHave: string[]
  about: string
  logoColor: string
  logoInitial: string
}

export type Match = {
  id: string
  company: string
  jobTitle: string
  logoColor: string
  logoInitial: string
  lastMessage: string
  timestamp: string
  unread: number
  matchedDate: string
}
