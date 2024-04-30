"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react"

import React from 'react'

const SessionWrapper = ({children, session}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionWrapper