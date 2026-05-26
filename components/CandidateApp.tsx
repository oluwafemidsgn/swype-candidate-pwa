'use client'
import { useState } from 'react'
import type { Screen } from '@/lib/types'

import WelcomeScreen         from './screens/WelcomeScreen'
import CreateAccountScreen   from './screens/CreateAccountScreen'
import OtpAccountScreen      from './screens/OtpAccountScreen'
import AboutYouScreen        from './screens/AboutYouScreen'
import VideoRecordScreen     from './screens/VideoRecordScreen'
import UploadDocumentsScreen from './screens/UploadDocumentsScreen'
import JobFeedScreen         from './screens/JobFeedScreen'

export default function CandidateApp() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const go = (s: Screen) => setScreen(s)

  const map: Record<Screen, React.ReactNode> = {
    'welcome':          <WelcomeScreen         go={go} />,
    'create-account':   <CreateAccountScreen   go={go} />,
    'otp-account':      <OtpAccountScreen      go={go} />,
    'about-you':        <AboutYouScreen        go={go} />,
    'video-record':     <VideoRecordScreen     go={go} />,
    'upload-documents': <UploadDocumentsScreen go={go} />,
    'job-feed':         <JobFeedScreen         go={go} />,
  }

  return <div className="w-full h-full overflow-hidden">{map[screen]}</div>
}
