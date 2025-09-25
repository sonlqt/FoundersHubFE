// app/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Dashboard } from './components/Dashboard'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const login = async () => {
      const res = await fetch('https://foundershub.nducky.id.vn/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'string',
          password: 'string',
        }),
        credentials: 'include', // 👈 cookie sẽ được lưu ở browser
      })

      if (!res.ok) {
        router.push('/login')
      }
    }

    login()
  }, [router])

  return (
    <div>
      <Dashboard />
    </div>
  )
}
