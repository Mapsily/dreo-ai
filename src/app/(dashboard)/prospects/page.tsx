import EmailMarketing from '@/components/email-marketing'
import InfoBar from '@/components/infobar'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

type Props = {}

const Page = async (props: Props) => {
  const user = await currentUser()

  if (!user) return null

  return (
    <>
      <InfoBar></InfoBar>
      <EmailMarketing
        campaign={[]}
        subscription={null}
        domains={[]}
      />
    </>
  )
}

export default Page
