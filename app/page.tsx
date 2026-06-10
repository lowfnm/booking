import { Suspense } from 'react'

import BookingForm from '@/components/booking-form'
import BrandVideoPanel from '@/components/layout/brand-video-panel'
import Layout from '@/components/layout/layout'
import Loader from '@/components/ui/loader'
import { Card } from '@/components/ui/card'

const HomePage = () => {
  return (
    <Layout>
      <div className="grid min-h-full w-full items-start gap-4 lg:grid-cols-[minmax(360px,46%)_minmax(420px,54%)]">
        <BrandVideoPanel />
        <Suspense
          fallback={
            <Card className="flex min-h-[280px] w-full items-center justify-center">
              <Loader />
            </Card>
          }
        >
          <BookingForm />
        </Suspense>
      </div>
    </Layout>
  )
}

export default HomePage
