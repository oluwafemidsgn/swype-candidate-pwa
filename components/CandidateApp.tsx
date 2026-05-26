'use client'
import { useState } from 'react'
import type { Screen } from '@/lib/types'

import SplashScreen from './screens/SplashScreen'
import SignUpScreen from './screens/SignUpScreen'
import ProfileSetupScreen from './screens/ProfileSetupScreen'
import VideoRecordScreen from './screens/VideoRecordScreen'
import JobFeedScreen from './screens/JobFeedScreen'
import JobDetailScreen from './screens/JobDetailScreen'
import MatchScreen from './screens/MatchScreen'
import MessagesScreen from './screens/MessagesScreen'
import ChatScreen from './screens/ChatScreen'
import ApplicationsScreen from './screens/ApplicationsScreen'
import PremiumScreen from './screens/PremiumScreen'

export default function CandidateApp() {
  const [screen, setScreen] = useState<Screen>('splash')

  const go = (s: Screen) => setScreen(s)

  const screenMap: Record<Screen, React.ReactNode> = {
    splash: <SplashScreen go={go} />,
    signup: <SignUpScreen go={go} />,
    'profile-setup': <ProfileSetupScreen go={go} />,
    'video-record': <VideoRecordScreen go={go} />,
    'job-feed': <JobFeedScreen go={go} />,
    'job-detail': <JobDetailScreen go={go} />,
    match: <MatchScreen go={go} />,
    messages: <MessagesScreen go={go} />,
    chat: <ChatScreen go={go} />,
    applications: <ApplicationsScreen go={go} />,
    premium: <PremiumScreen go={go} />,
  }

  return (
    <div className="w-full h-full overflow-hidden relative">
      {screenMap[screen]}
    </div>
  )
}
