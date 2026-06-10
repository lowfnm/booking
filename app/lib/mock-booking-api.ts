export type BookingOption = {
  id: string
  title: string
  description: string
}

export type ServiceCategory = 'combos' | 'haircuts' | 'beard' | 'extras'

export type ServiceAddOn = {
  id: string
  title: string
  durationMin: number
  price: number
}

export type BookingService = {
  id: string
  title: string
  description: string
  category: ServiceCategory
  durationMin: number
  price: number
  addOns: ServiceAddOn[]
}

const wait = async (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

export const fetchCustomerTypes = async (): Promise<BookingOption[]> => {
  await wait(150)
  return [
    { id: 'new', title: 'New', description: 'First visit' },
    { id: 'regular', title: 'Regular', description: 'Returning client' },
  ]
}

export const fetchLocations = async (): Promise<BookingOption[]> => {
  await wait(150)
  return [
    { id: 'downtown', title: 'Downtown', description: 'Flagship branch' },
    { id: 'midtown', title: 'Midtown', description: 'Express barbers' },
    { id: 'west-end', title: 'West End', description: 'Late hours' },
    { id: 'riverside', title: 'Riverside', description: 'Premium lounge' },
    { id: 'old-town', title: 'Old Town', description: 'Classic interior' },
    { id: 'north-gate', title: 'North Gate', description: 'Fast appointments' },
  ]
}

export const fetchServices = async (): Promise<BookingService[]> => {
  await wait(180)
  return [
    {
      id: 'skin-fade',
      title: 'Skin fade',
      description:
        'Smooth, seamless fade with a sharp transition and clean finish.',
      category: 'haircuts',
      durationMin: 40,
      price: 45,
      addOns: [
        { id: 'none', title: 'No extra', durationMin: 0, price: 0 },
        { id: 'razor-line', title: 'Razor line-up', durationMin: 5, price: 8 },
        {
          id: 'head-massage',
          title: 'Head & face massage',
          durationMin: 15,
          price: 20,
        },
        {
          id: 'hot-towel',
          title: 'Hot towel treatment',
          durationMin: 10,
          price: 12,
        },
      ],
    },
    {
      id: 'classic-cut',
      title: 'Classic cut',
      description: 'Scissor-and-clipper cut shaped to your head and style.',
      category: 'haircuts',
      durationMin: 35,
      price: 38,
      addOns: [
        { id: 'none', title: 'No extra', durationMin: 0, price: 0 },
        { id: 'razor-line', title: 'Razor line-up', durationMin: 5, price: 8 },
        { id: 'styling', title: 'Premium styling', durationMin: 5, price: 6 },
      ],
    },
    {
      id: 'beard-sculpt',
      title: 'Beard sculpt',
      description: 'Defined lines, balanced length, and skin-level finish.',
      category: 'beard',
      durationMin: 25,
      price: 28,
      addOns: [
        { id: 'none', title: 'No extra', durationMin: 0, price: 0 },
        {
          id: 'hot-towel',
          title: 'Hot towel treatment',
          durationMin: 10,
          price: 12,
        },
        {
          id: 'beard-oil',
          title: 'Beard oil finish',
          durationMin: 5,
          price: 5,
        },
      ],
    },
    {
      id: 'royal-shave',
      title: 'Royal shave',
      description: 'Straight-razor shave with hot towel prep and aftercare.',
      category: 'beard',
      durationMin: 30,
      price: 35,
      addOns: [
        { id: 'none', title: 'No extra', durationMin: 0, price: 0 },
        {
          id: 'head-massage',
          title: 'Head massage',
          durationMin: 15,
          price: 18,
        },
      ],
    },
    {
      id: 'fade-beard-combo',
      title: 'Fade + beard combo',
      description: 'Full fade with beard contour in one seated session.',
      category: 'combos',
      durationMin: 60,
      price: 65,
      addOns: [
        { id: 'none', title: 'No extra', durationMin: 0, price: 0 },
        {
          id: 'head-massage',
          title: 'Head & face massage',
          durationMin: 15,
          price: 20,
        },
        {
          id: 'hot-towel',
          title: 'Hot towel treatment',
          durationMin: 10,
          price: 12,
        },
      ],
    },
    {
      id: 'signature-combo',
      title: 'Signature combo',
      description:
        'Cut, beard work, and hot towel — the full Noir Crown ritual.',
      category: 'combos',
      durationMin: 75,
      price: 85,
      addOns: [
        { id: 'none', title: 'No extra', durationMin: 0, price: 0 },
        {
          id: 'head-massage',
          title: 'Extended massage',
          durationMin: 20,
          price: 25,
        },
      ],
    },
    {
      id: 'scalp-treatment',
      title: 'Scalp treatment',
      description: 'Deep cleanse and conditioning for scalp health and shine.',
      category: 'extras',
      durationMin: 20,
      price: 22,
      addOns: [
        { id: 'none', title: 'No extra', durationMin: 0, price: 0 },
        {
          id: 'head-massage',
          title: 'Head massage',
          durationMin: 15,
          price: 18,
        },
      ],
    },
    {
      id: 'grey-blend',
      title: 'Grey blend',
      description:
        'Subtle color blend to soften grey without a solid dye look.',
      category: 'extras',
      durationMin: 25,
      price: 30,
      addOns: [{ id: 'none', title: 'No extra', durationMin: 0, price: 0 }],
    },
  ]
}
