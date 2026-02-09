import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://malangtour-travels.vercel.app'

  // Get all destinations for dynamic routes
  const destinations = await prisma.destination.findMany({
    select: { slug: true, updatedAt: true }
  })

  const destinationUrls = destinations.map((d) => ({
    url: `${baseUrl}/destinations/${d.slug}`,
    lastModified: d.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const staticPages = [
    '',
    '/about',
    '/destinations',
    '/packages',
    '/offers',
    '/gallery',
    '/community',
    '/help',
    '/site-map',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.5,
  }))

  return [...staticPages, ...destinationUrls]
}
