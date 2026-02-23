export interface IProduct {
  id: string
  name: string
  slug: string
  category: 'spices-herbs' | 'grains-pulses' | 'nuts-seeds' | 'fruits-vegetables' | 'beverages' | 'dehydrated'
  description: string
  availability: 'year-round' | 'seasonal'
  season?: string
  image: string
  unit: string
  minOrder?: string
  tags?: string[]
}

export interface IBlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  authorRole: string
  date: string
  readTime: string
  image: string
  category: string
  tags: string[]
}

export interface ITestimonial {
  id: string
  name: string
  role: string
  company: string
  companyType: string
  location: string
  quote: string
  rating: number
}

export interface IIndustry {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  challenges: string[]
  solutions: string[]
  benefits: string[]
  icon: string
  image: string
}

export interface ITeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
}

export type ProductCategory = 'all' | 'spices-herbs' | 'grains-pulses' | 'nuts-seeds' | 'fruits-vegetables' | 'beverages' | 'dehydrated'
