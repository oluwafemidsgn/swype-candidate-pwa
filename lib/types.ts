export type Screen =
  | 'welcome'
  | 'create-account'
  | 'otp-account'
  | 'about-you'
  | 'video-record'
  | 'upload-documents'
  | 'job-feed'

export type Job = {
  id: string
  company: string
  verified: boolean
  matchPercent: number
  title: string
  tags: string[]
  description: string
}
