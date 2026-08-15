import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ExternalLink, ArrowRight, ArrowLeft, BadgeCheck, CalendarDays, Check, ChevronRight, CircleHelp, ClipboardCheck, GitCompareArrows, Heart, Home as HomeIcon, House, KeyRound, Link2, LockKeyhole, MapPin, Menu, Route as RouteIcon, ShieldCheck, SlidersHorizontal, Sparkles, Star, TrainFront, WalletCards, X, Zap } from 'lucide-react';
import { Link, Route, Switch, useLocation, useParams, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { defaultProfile, effectiveCost, explorerUrl, getProperty, matchProperties, properties, type Profile, type Property } from './data';

const queryClient = new QueryClient();

function readProfile(): Profile {
  try {
    const saved = localStorage.getItem('campusnest-profile');
    return saved ? JSON.parse(saved) as Profile : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

function readShortlist(): string[] {
  try {
    const saved = localStorage.getItem('campusnest-shortlist');
    return saved ? JSON.parse(saved) as string[] : [];
  } catch {
    return [];
  }
}

function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { href: '/', label: 'Start here', icon: House },
    { href: '/recommendations', label: 'Matches', icon: Sparkles },
    { href: '/compare', label: 'Compare', icon: GitCompareArrows },
  ];
  return (
    <div className="cn-shell cn-noise">
      <header className="cn-header">
        <div className="cn-container cn-nav">
          <Link href="/" className="cn-logo" data-testid="link-brand">
            <span className="cn-mark"><HomeIcon size={17} strokeWidth={2.5} /></span>
            CampusNest
          </Link>
          <nav className="cn-navlinks" aria-label="Main navigation">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={`cn-navlink ${location === href || (href !== '/' && location.startsWith(href)) ? 'active' : ''}`} data-testid={`link-nav-${label.toLowerCase().replace(' ', '-')}`}>
                <Icon size={15} /> {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/onboarding" className="cn-btn cn-btn-primary hidden sm:inline-flex" data-testid="link-update-profile">
              <SlidersHorizontal size={15} /> Your profile
            </Link>
            <button className="cn-btn cn-btn-quiet cn-mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu" data-testid="button-mobile-menu">
              <Menu size={19} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="cn-container pb-3 flex flex-col gap-1 sm:hidden">
            {navItems.map(({ href, label, icon: Icon }) => <Link key={href} onClick={() => setMenuOpen(false)} href={href} className="cn-navlink flex items-center gap-2" data-testid={`link-mobile-${label.toLowerCase().replace(' ', '-')}`}><Icon size={15} /> {label}</Link>)}
            <Link onClick={() => setMenuOpen(false)} href="/onboarding" className="cn-navlink flex items-center gap-2" data-testid="link-mobile-profile"><SlidersHorizontal size={15} /> Your profile</Link>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="cn-footer">
        <div className="cn-container flex flex-wrap items-center justify-between gap-3">
          <span className="cn-logo text-sm"><span className="cn-mark" style={{ width: 23, height: 23 }}><HomeIcon size={13} /></span> CampusNest</span>
          <span>Decision support for your next address in Noida & Greater Noida.</span>
          <span className="cn-mono text-[.65rem]">LOCAL DEMO · 2025 DATASET</span>
        </div>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="cn-hero">
        <div className="cn-container cn-hero-layout">
          <div className="cn-reveal">
            <span className="cn-eyebrow">A calmer move starts here</span>
            <h1>Find a place that fits <em>your life.</em></h1>
            <p className="cn-hero-copy">CampusNest helps students moving to Noida and Greater Noida make one of their biggest decisions with clearer costs, honest commute context, and proof of what we checked.</p>
            <div className="cn-hero-actions">
              <Link href="/onboarding" className="cn-btn cn-btn-primary" data-testid="link-start-search">Tell us what matters <ArrowRight size={17} /></Link>
              <Link href="/recommendations" className="cn-btn cn-btn-ghost" data-testid="link-see-demo">See the NIET demo <Sparkles size={16} /></Link>
            </div>
            <div className="flex items-center gap-2 mt-6 text-xs text-[hsl(var(--muted-foreground))]"><LockKeyhole size={14} /> Your profile stays in this browser for this demo.</div>
          </div>
          <div className="cn-hero-art cn-reveal cn-reveal-2" aria-label="Illustration showing a route from home to campus">
            <div className="cn-art-label">NOIDA / GREATER NOIDA<br /><span style={{ color: 'hsl(var(--accent))' }}>A route you can trust</span></div>
            <div className="cn-art-route" />
            <div className="cn-art-dot one" /><div className="cn-art-dot two" /><div className="cn-art-dot three" />
            <div className="absolute left-6 top-[70px] text-[.65rem] cn-mono opacity-70">HOME</div>
            <div className="absolute left-[45%] top-[205px] text-[.65rem] cn-mono opacity-70">DAILY ROUTE</div>
            <div className="absolute right-5 bottom-[55px] text-[.65rem] cn-mono opacity-70">CAMPUS</div>
            <div className="cn-art-card">
              <div><span className="cn-eyebrow">A considered match</span><strong>Aranya Heights</strong><span className="text-xs text-[hsl(var(--muted-foreground))]">Knowledge Park III · 9 min to NIET</span></div>
              <div className="text-right"><span className="cn-score">92%</span><span className="block text-[.65rem] text-[hsl(var(--muted-foreground))]">fit score</span></div>
            </div>
          </div>
        </div>
        <span className="cn-scribble">less guesswork → more settling in</span>
      </section>
      <section className="cn-section cn-section-tint">
        <div className="cn-container">
          <div className="cn-section-head">
            <div><span className="cn-eyebrow">What changes</span><h2>Not more listings.<br />Better decisions.</h2></div>
            <p className="cn-subtle max-w-xs text-sm">The details that make a room work on a Tuesday morning matter more than another glossy photo.</p>
          </div>
          <div className="cn-trio cn-reveal cn-reveal-2">
            <article className="cn-principle"><span className="cn-principle-num">01 / COST</span><h3>See the number you will actually pay.</h3><p>Rent is only the beginning. We add food, electricity, wifi and maintenance into one effective monthly cost.</p></article>
            <article className="cn-principle"><span className="cn-principle-num">02 / FIT</span><h3>Match the rhythm of your week.</h3><p>A deterministic score balances budget, commute, trust, facilities and your stated priorities.</p></article>
            <article className="cn-principle"><span className="cn-principle-num">03 / TRUST</span><h3>Know what was checked.</h3><p>Open a record of the checks behind a listing. No vague “verified” badge, no invented certainty.</p></article>
          </div>
        </div>
      </section>
      <section className="cn-section">
        <div className="cn-container">
          <div className="cn-section-head"><div><span className="cn-eyebrow">A short path to clarity</span><h2>From “where do I even start?”<br />to a shortlist.</h2></div></div>
          <div className="cn-step-grid">
            {[['01', 'Set your non-negotiables', 'Campus, monthly range, move-in month and the things you care about most.'], ['02', 'Read the reasoning', 'Every ranking has a plain-language explanation, not a mysterious AI score.'], ['03', 'Compare the real cost', 'Put two or three places side by side before you make a call.'], ['04', 'Open the evidence', 'Follow each property’s verification record and its tamper-evident hash.']].map(([n, title, copy]) => <article className="cn-step" key={n}><b>{n}</b><h4>{title}</h4><p>{copy}</p></article>)}
          </div>
          <div className="mt-12 flex justify-center"><Link href="/onboarding" className="cn-btn cn-btn-primary" data-testid="link-begin-journey">Build my shortlist <ArrowRight size={16} /></Link></div>
        </div>
      </section>
    </>
  );
}

function Onboarding() {
  const [, setLocation] = useLocation();
  const [profile, setProfile] = useState<Profile>(() => readProfile());
  const priorities = ['Safety', 'Good commute', 'Food', 'Quiet space', 'Value'];
  const togglePriority = (priority: string) => setProfile((current) => ({ ...current, priorities: current.priorities.includes(priority) ? current.priorities.filter((item) => item !== priority) : [...current.priorities, priority] }));
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem('campusnest-profile', JSON.stringify(profile));
    setLocation('/recommendations');
  };
  return (
    <div className="cn-page">
      <div className="cn-container cn-form-wrap">
        <div className="mb-7 cn-reveal"><span className="cn-eyebrow">01 / Your context</span><h1 className="cn-page-title">Let’s make this<br /><span style={{ color: 'hsl(var(--primary))' }}>personal.</span></h1><p className="cn-subtle max-w-lg">There is no perfect property in the abstract. There is only the one that makes sense for your campus, calendar and everyday life.</p></div>
        <form className="cn-card cn-form-card cn-reveal cn-reveal-2" onSubmit={submit}>
          <section className="cn-form-section">
            <h3>Where are you headed?</h3><p>We’ll use this as the center point for commute scoring.</p>
            <div className="cn-field"><label htmlFor="campus">Campus</label><select id="campus" value={profile.campus} onChange={(event) => setProfile({ ...profile, campus: event.target.value })} data-testid="select-campus"><option>NIET</option><option>GL Bajaj</option><option>Sharda University</option><option>Amity University Noida</option></select></div>
          </section>
          <section className="cn-form-section">
            <h3>What feels comfortable each month?</h3><p>We score the listed rent against this window, then show the full monthly picture later.</p>
            <div className="cn-field-grid"><div className="cn-field"><label htmlFor="budget-min">From (₹)</label><input id="budget-min" type="number" min="0" step="100" value={profile.budgetMin} onChange={(event) => setProfile({ ...profile, budgetMin: Number(event.target.value) })} data-testid="input-budget-min" /></div><div className="cn-field"><label htmlFor="budget-max">Up to (₹)</label><input id="budget-max" type="number" min="0" step="100" value={profile.budgetMax} onChange={(event) => setProfile({ ...profile, budgetMax: Number(event.target.value) })} data-testid="input-budget-max" /></div></div>
          </section>
          <section className="cn-form-section">
            <h3>When and how will you stay?</h3><p>Move-in is a planning signal, not a promise of availability.</p>
            <div className="cn-field-grid"><div className="cn-field"><label htmlFor="move-in">Move-in month</label><input id="move-in" type="month" value={profile.moveIn} onChange={(event) => setProfile({ ...profile, moveIn: event.target.value })} data-testid="input-move-in" /></div><div className="cn-field"><label htmlFor="stay-type">Accommodation type</label><select id="stay-type" value={profile.stayType} onChange={(event) => setProfile({ ...profile, stayType: event.target.value as Profile['stayType'] })} data-testid="select-stay-type"><option>PG</option><option>Hostel</option><option>Shared flat</option></select></div></div>
          </section>
          <section className="cn-form-section">
            <h3>What should pull the ranking?</h3><p>Choose as many as matter. We’ll explain the result in plain language.</p>
            <div className="cn-choice-grid">{priorities.map((priority) => <button type="button" key={priority} onClick={() => togglePriority(priority)} className={`cn-choice ${profile.priorities.includes(priority) ? 'selected' : ''}`} data-testid={`button-priority-${priority.toLowerCase().replace(' ', '-')}`}>{profile.priorities.includes(priority) && <Check size={14} />}{priority}</button>)}</div>
          </section>
          <div className="cn-form-actions"><p><span className="cn-mono">LOCAL DEMO</span><br />No account or API needed.</p><button type="submit" className="cn-btn cn-btn-primary" data-testid="button-find-matches">Show my matches <ArrowRight size={16} /></button></div>
        </form>
      </div>
    </div>
  );
}

function MatchCard({ result, selected, onToggle }: { result: ReturnType<typeof matchProperties>[number]; selected: boolean; onToggle: () => void }) {
  const { property } = result;
  return (
    <article className="cn-card cn-result cn-reveal" data-testid={`card-match-${property.id}`}>
      <div className="cn-result-rank"><div><b>#{result.score >= 90 ? '1' : result.score >= 80 ? '2' : result.score >= 70 ? '3' : '—'}</b><small>{result.score >= 90 ? 'top fit' : 'match'}</small></div></div>
      <div><div className="flex flex-wrap items-center gap-2"><span className="cn-pill cn-pill-teal">{property.type}</span>{property.id === 'aranya-heights' && <span className="cn-pill cn-pill-gold"><Sparkles size={12} /> strongest fit</span>}</div><Link href={`/property/${property.id}`} className="no-underline text-[hsl(var(--foreground))]" data-testid={`link-match-${property.id}`}><h3>{property.name}</h3></Link><div className="cn-result-meta"><span><MapPin size={13} className="inline mr-1" />{property.locality}</span><span><RouteIcon size={13} className="inline mr-1" />{property.commuteTime} min by {property.commuteMode}</span><span><Star size={13} className="inline mr-1" />{property.rating}</span></div><p className="cn-signal mt-3"><BadgeCheck size={14} /> {result.explanation}</p></div>
      <div className="cn-result-right"><div><div className="cn-score" data-testid={`text-match-score-${property.id}`}>{result.score}%</div><div className="cn-cost" data-testid={`text-effective-cost-${property.id}`}>₹{effectiveCost(property).toLocaleString('en-IN')}<small>effective / month</small></div></div><button type="button" className={`cn-btn ${selected ? 'cn-btn-primary' : 'cn-btn-ghost'}`} onClick={onToggle} data-testid={`button-shortlist-${property.id}`}>{selected ? <Check size={15} /> : <Heart size={15} />}{selected ? 'Shortlisted' : 'Shortlist'}</button></div>
    </article>
  );
}

function Recommendations() {
  const profile = readProfile();
  const results = useMemo(() => matchProperties(profile), [profile]);
  const [shortlist, setShortlist] = useState<string[]>(() => readShortlist());
  const [notice, setNotice] = useState('');
  const toggle = (id: string) => {
    setShortlist((current) => {
      const exists = current.includes(id);
      if (!exists && current.length >= 3) { setNotice('Compare up to three places at a time. Remove one to add another.'); window.setTimeout(() => setNotice(''), 2800); return current; }
      const next = exists ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem('campusnest-shortlist', JSON.stringify(next));
      setNotice(exists ? 'Removed from shortlist.' : 'Added to shortlist.');
      window.setTimeout(() => setNotice(''), 1800);
      return next;
    });
  };
  return (
    <div className="cn-page">
      <div className="cn-container">
        <div className="cn-page-head cn-reveal"><div><span className="cn-eyebrow">02 / Your shortlist</span><h1 className="cn-page-title">A few places<br /><span style={{ color: 'hsl(var(--primary))' }}>worth your time.</span></h1><p className="cn-subtle">Ranked for <b className="text-[hsl(var(--foreground))]">{profile.campus}</b> · ₹{profile.budgetMin.toLocaleString('en-IN')}–₹{profile.budgetMax.toLocaleString('en-IN')} rent · {profile.moveIn}</p></div><Link href="/onboarding" className="cn-btn cn-btn-ghost" data-testid="link-edit-profile"><SlidersHorizontal size={15} /> Adjust profile</Link></div>
        <div className="cn-result-toolbar cn-reveal cn-reveal-2"><div className="flex items-center gap-2 text-sm"><Sparkles size={16} color="hsl(var(--primary))" /><span><b>{results.length} demo properties</b> scored against your brief.</span></div><Link href="/compare" className={`cn-btn ${shortlist.length >= 2 ? 'cn-btn-primary' : 'cn-btn-quiet'}`} data-testid="link-open-compare"><GitCompareArrows size={15} /> Compare {shortlist.length ? `(${shortlist.length})` : ''}</Link></div>
        <div className="mb-5 flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]"><CircleHelp size={14} /> Scores are deterministic: budget 30% · commute 25% · trust 20% · facilities 15% · lifestyle 10%.</div>
        <div className="cn-result-list">{results.map((result) => <MatchCard key={result.property.id} result={result} selected={shortlist.includes(result.property.id)} onToggle={() => toggle(result.property.id)} />)}</div>
        <div className="cn-card mt-6 p-5 flex flex-wrap items-center justify-between gap-4"><div><span className="cn-eyebrow">Need the short version?</span><p className="m-0 mt-1 text-sm text-[hsl(var(--muted-foreground))]">Open a property for its cost breakdown, commute details, sample resident notes and check record.</p></div><Link href={`/property/${results[0].property.id}`} className="cn-btn cn-btn-ghost" data-testid="link-top-property">Open top match <ChevronRight size={16} /></Link></div>
      </div>
      {notice && <div className="cn-toast" role="status" data-testid="status-shortlist">{notice}</div>}
    </div>
  );
}

function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const property = getProperty(id);
  const [, setLocation] = useLocation();
  const [shortlist, setShortlist] = useState<string[]>(() => readShortlist());
  if (!property) return <NotFoundInline />;
  const isSelected = shortlist.includes(property.id);
  const toggle = () => {
    const next = isSelected ? shortlist.filter((item) => item !== property.id) : shortlist.length < 3 ? [...shortlist, property.id] : shortlist;
    setShortlist(next); localStorage.setItem('campusnest-shortlist', JSON.stringify(next));
  };
  return (
    <div className="cn-page">
      <div className="cn-container">
        <Link href="/recommendations" className="cn-navlink inline-flex items-center gap-2 mb-6" data-testid="link-back-recommendations"><ArrowLeft size={15} /> Back to matches</Link>
        <div className="cn-detail-hero cn-reveal">
          <section className="cn-detail-intro"><div className="flex flex-wrap gap-2"><span className="cn-pill cn-pill-teal">{property.type}</span><span className="cn-pill cn-pill-gold"><BadgeCheck size={12} /> {property.verificationStatus}</span></div><h1>{property.name}</h1><p className="cn-subtle flex items-center gap-2"><MapPin size={16} /> {property.locality} · {property.distance} km from campus</p><div className="mt-9 flex flex-wrap gap-3"><button type="button" className="cn-btn cn-btn-primary" onClick={toggle} data-testid={`button-detail-shortlist-${property.id}`}>{isSelected ? <Check size={15} /> : <Heart size={15} />}{isSelected ? 'Shortlisted' : 'Add to shortlist'}</button><Link href={`/verification/${property.id}`} className="cn-btn" style={{ background: 'hsl(var(--sidebar-accent))', color: 'hsl(var(--sidebar-foreground))' }} data-testid={`link-detail-verification-${property.id}`}><ShieldCheck size={15} /> See what we checked</Link></div></section>
          <section className="cn-card cn-cost-card"><div><span className="cn-eyebrow">The number to plan around</span><h2>Effective monthly cost</h2><div className="cn-total"><div><strong data-testid={`text-detail-effective-cost-${property.id}`}>₹{effectiveCost(property).toLocaleString('en-IN')}</strong><small>all recurring costs shown below</small></div><WalletCards size={26} color="hsl(var(--primary))" /></div><div className="cn-cost-row"><span>Room rent</span><span>₹{property.rent.toLocaleString('en-IN')}</span></div><div className="cn-cost-row"><span>Food plan</span><span>₹{property.food.toLocaleString('en-IN')}</span></div><div className="cn-cost-row"><span>Electricity estimate</span><span>₹{property.electricity.toLocaleString('en-IN')}</span></div><div className="cn-cost-row"><span>Wifi</span><span>₹{property.wifi.toLocaleString('en-IN')}</span></div><div className="cn-cost-row"><span>Maintenance</span><span>₹{property.maintenance.toLocaleString('en-IN')}</span></div></div><p className="text-xs text-[hsl(var(--muted-foreground))] m-0 mt-4">Deposit is ₹{property.deposit.toLocaleString('en-IN')} and is not included in the monthly cost.</p></section>
        </div>
        <div className="cn-detail-grid">
          <div>
            <section className="cn-card cn-panel"><h2>What daily life could look like</h2><div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7"><div className="p-4 rounded-2xl bg-[hsl(var(--secondary))]"><RouteIcon size={18} color="hsl(var(--primary))" /><b className="block mt-4 text-lg">{property.commuteTime} min</b><span className="text-xs text-[hsl(var(--muted-foreground))]">typical commute</span></div><div className="p-4 rounded-2xl bg-[hsl(var(--secondary))]"><MapPin size={18} color="hsl(var(--primary))" /><b className="block mt-4 text-lg">{property.distance} km</b><span className="text-xs text-[hsl(var(--muted-foreground))]">from campus</span></div><div className="p-4 rounded-2xl bg-[hsl(var(--secondary))]"><Star size={18} color="hsl(var(--accent))" /><b className="block mt-4 text-lg">{property.rating} / 5</b><span className="text-xs text-[hsl(var(--muted-foreground))]">demo rating</span></div></div><div className="flex items-start gap-3 p-4 rounded-2xl border border-[hsl(var(--border))]"><TrainFront size={18} color="hsl(var(--primary))" /><div><b className="text-sm">Commute context</b><p className="m-0 mt-1 text-sm text-[hsl(var(--muted-foreground))]">Most residents use {property.commuteMode}. The estimate is a planning aid; traffic, weather and class timings can change it.</p></div></div></section>
            <section className="cn-card cn-panel mt-5"><h2>Facilities on the record</h2><div className="cn-facilities">{property.facilities.map((facility) => <div className="cn-facility" key={facility}><Check size={15} color="hsl(var(--primary))" />{facility}</div>)}</div></section>
            <section className="cn-card cn-panel mt-5"><div className="flex items-end justify-between gap-3"><div><span className="cn-eyebrow">Human context, clearly labeled</span><h2 className="mb-0 mt-2">Resident notes</h2></div><span className="cn-pill cn-pill-coral">SAMPLE / DEMO</span></div>{property.reviews.map((review) => <div className="cn-review" key={review.id} data-testid={`review-${review.id}`}><div className="cn-review-head"><div><b className="text-sm">{review.resident}</b><span className="block text-xs text-[hsl(var(--muted-foreground))]">{review.stay} stay · {review.label}</span></div><span className="text-sm flex items-center gap-1"><Star size={13} color="hsl(var(--accent))" fill="hsl(var(--accent))" /> {review.rating}</span></div><p>{review.text}</p></div>)}</section>
          </div>
          <aside><section className="cn-card cn-panel cn-trust-card"><h2><ShieldCheck size={21} /> Trust, without overclaiming</h2><p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">CampusNest verification records what CampusNest checked. The blockchain makes that record tamper-evident — it is not proof that a property is inherently safe or genuine.</p><div className="mt-5"><Link href={`/verification/${property.id}`} className="cn-btn cn-btn-primary w-full" data-testid={`link-open-verification-${property.id}`}>Open verification record <ArrowRight size={15} /></Link></div></section><section className="cn-card cn-panel mt-5"><h2>At a glance</h2><div className="cn-cost-row"><span>Owner</span><span className="text-right max-w-[150px]">{property.owner}</span></div><div className="cn-cost-row"><span>Room deposit</span><span>₹{property.deposit.toLocaleString('en-IN')}</span></div><div className="cn-cost-row"><span>Food included</span><span>{property.food ? 'Yes' : 'No'}</span></div><div className="cn-cost-row"><span>Checked</span><span>{property.timestamp.split(' ')[0]}</span></div></section></aside>
        </div>
        <div className="mt-6 flex items-center justify-between gap-3"><button type="button" className="cn-btn cn-btn-quiet" onClick={() => setLocation('/recommendations')} data-testid="button-back-to-list"><ArrowLeft size={15} /> All matches</button><Link href="/compare" className="cn-btn cn-btn-ghost" data-testid="link-detail-compare"><GitCompareArrows size={15} /> Compare shortlist</Link></div>
      </div>
    </div>
  );
}

function Compare() {
  const [selectedIds, setSelectedIds] = useState<string[]>(() => readShortlist());
  const selected = selectedIds.map(getProperty).filter(Boolean) as Property[];
  const remove = (id: string) => { const next = selectedIds.filter((item) => item !== id); setSelectedIds(next); localStorage.setItem('campusnest-shortlist', JSON.stringify(next)); };
  if (selected.length < 2) return <div className="cn-page"><div className="cn-container"><div className="cn-card cn-empty cn-reveal"><GitCompareArrows size={36} /><h2>Comparison starts with two places.</h2><p>Shortlist two or three properties from your ranked matches, then come back here to make the trade-offs visible.</p><Link href="/recommendations" className="cn-btn cn-btn-primary" data-testid="link-find-compare-properties">Find places to compare <ArrowRight size={16} /></Link></div></div></div>;
  const rows: [string, (property: Property) => ReactNode][] = [['Effective monthly cost', (property) => <b data-testid={`compare-cost-${property.id}`}>₹{effectiveCost(property).toLocaleString('en-IN')}</b>], ['Listed rent', (property) => `₹${property.rent.toLocaleString('en-IN')}`], ['Deposit', (property) => `₹${property.deposit.toLocaleString('en-IN')}`], ['Commute', (property) => `${property.commuteTime} min · ${property.commuteMode}`], ['Distance', (property) => `${property.distance} km`], ['CampusNest status', (property) => <span className="cn-check flex items-center gap-1"><BadgeCheck size={14} /> checked</span>], ['Food plan', (property) => property.food ? `₹${property.food.toLocaleString('en-IN')} / month` : 'Not included'], ['Rating', (property) => <span className="flex items-center gap-1"><Star size={13} color="hsl(var(--accent))" fill="hsl(var(--accent))" /> {property.rating} / 5</span>]];
  return <div className="cn-page"><div className="cn-container"><div className="cn-page-head"><div><span className="cn-eyebrow">03 / Make the trade-off visible</span><h1 className="cn-page-title">Side by<br /><span style={{ color: 'hsl(var(--primary))' }}>side.</span></h1><p className="cn-subtle">No winner by default. Just the details lined up so you can choose with your eyes open.</p></div><Link href="/recommendations" className="cn-btn cn-btn-ghost" data-testid="link-add-to-compare"><ArrowLeft size={15} /> Add another</Link></div><section className="cn-card cn-compare-table cn-reveal"><div className="cn-compare-grid"><div className="cn-compare-cell label cn-compare-head flex items-end">Your shortlist</div>{selected.map((property) => <div className="cn-compare-cell cn-compare-head" key={property.id}><div className="flex items-center justify-between gap-2"><span className="cn-pill cn-pill-teal">{property.type}</span><button type="button" className="cn-btn cn-btn-quiet p-1.5" onClick={() => remove(property.id)} aria-label={`Remove ${property.name}`} data-testid={`button-remove-compare-${property.id}`}><X size={15} /></button></div><Link href={`/property/${property.id}`} className="text-[hsl(var(--foreground))] no-underline" data-testid={`link-compare-property-${property.id}`}><h3>{property.name}</h3></Link><div className="cn-cost">₹{effectiveCost(property).toLocaleString('en-IN')}<small>effective / month</small></div></div>)}{rows.map(([label, render]) => <><div className="cn-compare-cell label" key={`${label}-label`}>{label}</div>{selected.map((property) => <div className="cn-compare-cell" key={`${label}-${property.id}`}>{render(property)}</div>)}</>)}</div></section><p className="mt-4 text-xs text-[hsl(var(--muted-foreground))] flex items-center gap-2"><CircleHelp size={14} /> Cost includes rent, food, electricity, wifi and maintenance. Deposit is shown separately.</p></div></div>;
}

function Verification() {
  const { id } = useParams<{ id: string }>();
  const property = getProperty(id);
  if (!property) return <NotFoundInline />;
  return <div className="cn-page"><div className="cn-container"><Link href={`/property/${property.id}`} className="cn-navlink inline-flex items-center gap-2 mb-6" data-testid="link-back-property"><ArrowLeft size={15} /> Back to property</Link><section className="cn-verify-hero cn-reveal"><div><span className="cn-eyebrow">Verification record / {property.id}</span><h1>Here is exactly what CampusNest checked.</h1><p className="cn-subtle max-w-2xl">A transparent record for {property.name}. The record is anchored on Polygon Amoy so its history can be checked later.</p></div><div className="cn-verify-stamp"><BadgeCheck size={23} className="mx-auto mb-1" />CAMPUSNEST<br />CHECKED<br />RECORD</div></section><div className="cn-verification-grid"><section className="cn-card cn-panel"><h2><ClipboardCheck size={20} className="inline mr-2" />Check trail</h2><div className="cn-timeline">{property.checkedItems.map((item, index) => <div className="cn-timeline-item" key={item}><div className="cn-timeline-dot" /><div><h4>{item} <span className="cn-pill cn-pill-teal ml-1">checked</span></h4><p>{index === 0 ? `Recorded against the owner profile supplied by ${property.owner}.` : index === 1 ? `Listing location and visual details reviewed for ${property.locality}.` : 'Details captured in the CampusNest verification record.'}</p></div></div>)}</div></section><section className="cn-card cn-panel cn-trust-card"><h2><Link2 size={20} /> Tamper-evident record</h2><p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">Blockchain preserves the verification record after it is written. It does not turn a checked claim into a guarantee.</p><div className="cn-trust-line"><KeyRound size={16} /><div><b>Record hash</b><span className="cn-mono">{property.verificationHash}</span></div></div><div className="cn-trust-line"><Zap size={16} /><div><b>Polygon Amoy transaction</b><span className="cn-mono">{property.blockchainTransactionHash}</span></div></div><div className="cn-trust-line"><CalendarDays size={16} /><div><b>Recorded at</b><span>{property.timestamp}</span></div></div><a className="cn-explorer mt-4" href={explorerUrl(property.blockchainTransactionHash)} target="_blank" rel="noreferrer" data-testid={`link-explorer-${property.id}`}>View seeded transaction on Polygon Amoy <ExternalLink size={14} /></a></section></div><section className="cn-card cn-panel mt-5"><div className="flex flex-wrap items-center justify-between gap-4"><div><span className="cn-eyebrow">The honest distinction</span><h2 className="mt-2 mb-2">Checked is not certified.</h2><p className="cn-subtle m-0 max-w-2xl">CampusNest verification tells you what we looked at and when. It is a useful signal for your next question, not a substitute for visiting, speaking to the owner, or trusting your own judgment.</p></div><Link href={`/property/${property.id}`} className="cn-btn cn-btn-primary" data-testid="link-verification-return">Return to details <ArrowRight size={16} /></Link></div></section></div></div>;
}

function NotFoundInline() {
  return <div className="cn-page"><div className="cn-container"><div className="cn-card cn-empty"><CircleHelp size={36} /><h2>We couldn’t find that place.</h2><p>The demo property may have moved. Return to the ranked matches to choose another one.</p><Link href="/recommendations" className="cn-btn cn-btn-primary" data-testid="link-not-found-recommendations">Back to matches <ArrowRight size={16} /></Link></div></div></div>;
}

function NotFound() {
  return <NotFoundInline />;
}

function Router() {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}><AppShell><Switch><Route path="/" component={Home} /><Route path="/onboarding" component={Onboarding} /><Route path="/recommendations" component={Recommendations} /><Route path="/property/:id" component={PropertyDetail} /><Route path="/compare" component={Compare} /><Route path="/verification/:id" component={Verification} /><Route component={NotFound} /></Switch></AppShell></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;