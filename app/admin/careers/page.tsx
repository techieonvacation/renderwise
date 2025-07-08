import AdminCareers from '@/app/components/admin/Careers/AdminCareers';
import { Suspense } from 'react'  

// Server Component
export default function CareerAdmin() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="title text-left">Career Management</h1>
          <p className="text-base text-muted-foreground">Manage job listings and applications</p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <AdminCareers />
        </Suspense>
      </div>
    </div>
  )
}
