// app/api/links/[userId]/route.js

import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req, { params }) {
  const { userId } = params

  try {
    const links = await prisma.link.findMany({
      where: {
        userId
      },
      orderBy: {
        order: 'asc'
      }
    })

    return NextResponse.json(links)
  } catch (error) {
    console.error("Error fetching links:", error)
    return NextResponse.json({ error: "Failed to fetch links" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
