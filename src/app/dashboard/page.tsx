import { createClient } from '@/lib/supabase/server'
import { Building2, Users, ClipboardList, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get counts
  const { count: apartmentCount } = await supabase
    .from('apartments')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user?.id)

  const { count: tenantCount } = await supabase
    .from('tenants')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user?.id)

  const { count: openIssuesCount } = await supabase
    .from('issues')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user?.id)
    .neq('status', 'resolved')

  // Get recent issues
  const { data: recentIssues } = await supabase
    .from('issues')
    .select('*, apartments(address)')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'där'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hej {userName}! 👋</h1>
        <p className="text-gray-600 mt-1">Här är en översikt över dina fastigheter.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          icon={<Building2 className="h-6 w-6" />}
          label="Lägenheter"
          value={apartmentCount || 0}
          href="/dashboard/apartments"
        />
        <StatCard
          icon={<Users className="h-6 w-6" />}
          label="Hyresgäster"
          value={tenantCount || 0}
          href="/dashboard/tenants"
        />
        <StatCard
          icon={<ClipboardList className="h-6 w-6" />}
          label="Öppna ärenden"
          value={openIssuesCount || 0}
          href="/dashboard/apartments"
          highlight={openIssuesCount && openIssuesCount > 0}
        />
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Snabbåtgärder</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/apartments?new=1" className="btn-primary">
            + Lägg till lägenhet
          </Link>
          <Link href="/dashboard/tenants?new=1" className="btn-secondary">
            + Lägg till hyresgäst
          </Link>
        </div>
      </div>

      {/* Recent Issues */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Senaste felanmälningar</h2>
        {recentIssues && recentIssues.length > 0 ? (
          <div className="space-y-3">
            {recentIssues.map((issue: any) => (
              <div key={issue.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  issue.status === 'new' ? 'bg-yellow-100 text-yellow-600' :
                  issue.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{issue.title}</p>
                  <p className="text-sm text-gray-600 truncate">{issue.apartments?.address}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  issue.status === 'new' ? 'bg-yellow-100 text-yellow-700' :
                  issue.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {issue.status === 'new' ? 'Ny' : 
                   issue.status === 'in_progress' ? 'Pågår' : 'Klar'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Inga felanmälningar ännu. Dela felanmälningslänken med dina hyresgäster!
          </p>
        )}
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  href,
  highlight = false,
}: {
  icon: React.ReactNode
  label: string
  value: number
  href: string
  highlight?: boolean
}) {
  return (
    <Link href={href} className={`card hover:shadow-md transition-shadow ${highlight ? 'ring-2 ring-yellow-400' : ''}`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${highlight ? 'bg-yellow-100 text-yellow-600' : 'bg-primary-100 text-primary-600'}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
    </Link>
  )
}
