import { useQuery } from '@tanstack/react-query'

import {
  fetchCustomerTypes,
  fetchLocations,
  fetchServices,
} from '@/lib/mock-booking-api'

export const useCustomerTypes = () =>
  useQuery({
    queryKey: ['booking', 'customer-types'],
    queryFn: fetchCustomerTypes,
  })

export const useLocations = () =>
  useQuery({
    queryKey: ['booking', 'locations'],
    queryFn: fetchLocations,
  })

export const useServices = () =>
  useQuery({
    queryKey: ['booking', 'services'],
    queryFn: fetchServices,
  })
