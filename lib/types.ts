export type Screen =
  | 'welcome'
  | 'login'
  | 'create-account'
  | 'otp-account'
  | 'about-you'
  | 'video-record'
  | 'upload-documents'
  | 'profile-complete'
  | 'job-feed'

export type Job = {
  id: string
  company: string
  companyColor: string
  companyInitials: string
  verified: boolean
  matchPercent: number
  title: string
  location: string
  salary: string
  jobType: string
  experience: string
  tags: string[]
  description: string
  requirements: string[]
  aboutCompany: string
  postedAt: string
  applicants: number
}

export type Message = {
  id: string
  company: string
  companyColor: string
  companyInitials: string
  role: string
  lastMessage: string
  time: string
  unread: number
  isOnline: boolean
}
