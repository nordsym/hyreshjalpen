'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Building2, Mail, Lock, User, Loader2, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
      }
    } catch (err) {
      setError('Något gick fel. Försök igen.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
            <Check className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Kolla din e-post!</h1>
          <p className="text-gray-600 mb-6">
            Vi har skickat en bekräftelselänk till <strong>{email}</strong>.
            Klicka på länken för att aktivera ditt konto.
          </p>
          <Link href="/login" className="btn-primary">
            Tillbaka till inloggning
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Building2 className="h-10 w-10 text-primary-600" />
            <span className="font-bold text-2xl text-gray-900">Hyreshjälpen</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Skapa konto</h1>
          <p className="mt-2 text-gray-600">Kom igång på under en minut</p>
        </div>

        <div className="card">
          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="label">Ditt namn</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input pl-10"
                  placeholder="Förnamn Efternamn"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="label">E-postadress</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="din@email.se"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="label">Lösenord</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10"
                  placeholder="Minst 6 tecken"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Skapar konto...
                </>
              ) : (
                'Skapa konto'
              )}
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-500 text-center">
            Genom att skapa ett konto godkänner du våra villkor och integritetspolicy.
          </p>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Har du redan ett konto? </span>
            <Link href="/login" className="text-primary-600 hover:underline font-medium">
              Logga in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
