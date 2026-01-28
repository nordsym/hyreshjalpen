import Link from 'next/link'
import { Building2, Users, ClipboardList, Shield, ArrowRight, Check } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary-600" />
              <span className="font-bold text-xl text-gray-900">Hyreshjälpen</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                Logga in
              </Link>
              <Link href="/signup" className="btn-primary">
                Kom igång gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Allt du behöver för att vara en{' '}
            <span className="text-primary-600">bra hyresvärd</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Slipp pappersröran. Håll enkelt koll på hyresgäster, hyror och felanmälningar 
            — utan dyra system eller komplicerade Excel-ark.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-primary text-lg px-8 py-3 flex items-center justify-center gap-2">
              Starta gratis <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="#features" className="btn-secondary text-lg px-8 py-3">
              Se hur det fungerar
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Gratis för 1 lägenhet • Ingen kreditkort krävs
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Allt på ett ställe
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Hyresgäster"
              description="Alla kontaktuppgifter och kontrakt samlade. Sök och filtrera enkelt."
            />
            <FeatureCard
              icon={<Building2 className="h-8 w-8" />}
              title="Lägenheter"
              description="Översikt över alla dina fastigheter med adresser och detaljer."
            />
            <FeatureCard
              icon={<ClipboardList className="h-8 w-8" />}
              title="Felanmälningar"
              description="Hyresgäster rapporterar fel via en enkel länk. Du får notis direkt."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Säkerhet"
              description="Din data är trygg. Krypterad och säkerhetskopierad automatiskt."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Enkel prissättning
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            Börja gratis och uppgradera när du behöver. Inga dolda avgifter.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Gratis"
              price="0"
              description="Perfekt för att testa"
              features={['1 lägenhet', 'Grundläggande funktioner', 'E-postsupport']}
            />
            <PricingCard
              name="Bas"
              price="149"
              description="För de flesta hyresvärdar"
              features={['Upp till 5 lägenheter', 'Alla funktioner', 'Prioriterad support', 'Dokumentarkiv']}
              highlighted
            />
            <PricingCard
              name="Pro"
              price="299"
              description="För större portföljer"
              features={['Upp till 15 lägenheter', 'Alla funktioner', 'Telefonsupport', 'API-åtkomst']}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            Redo att förenkla din vardag?
          </h2>
          <p className="text-primary-100 text-lg mb-8">
            Gå med hundratals svenska hyresvärdar som redan sparar tid med Hyreshjälpen.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-white text-primary-600 font-medium px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors">
            Kom igång gratis <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-white" />
              <span className="font-bold text-white">Hyreshjälpen</span>
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} Hyreshjälpen. Alla rättigheter förbehållna.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="card text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function PricingCard({
  name,
  price,
  description,
  features,
  highlighted = false,
}: {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}) {
  return (
    <div className={`card ${highlighted ? 'ring-2 ring-primary-600 scale-105' : ''}`}>
      {highlighted && (
        <span className="inline-block bg-primary-600 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
          Populärast
        </span>
      )}
      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        <span className="text-gray-600"> kr/mån</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-gray-700">
            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="/signup"
        className={highlighted ? 'btn-primary w-full text-center block' : 'btn-secondary w-full text-center block'}
      >
        Kom igång
      </Link>
    </div>
  )
}
