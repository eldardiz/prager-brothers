import { brand } from '@/lib/brand'

type Location = { name: string; street: string; city: string; note: string }

const LOCATIONS: Location[] = [
  { name: 'Carlsbad', street: '3411 Palmer Way', city: 'Carlsbad, CA 92010', note: 'The bakehouse + mill' },
  { name: 'Encinitas', street: '545 S Coast Hwy 101', city: 'Encinitas, CA 92024', note: 'Café + counter' },
  { name: 'San Diego', street: '1233 University Ave', city: 'San Diego, CA 92103', note: 'Hillcrest café' },
]

export default function ContactSection() {
  const orderUrl: string = brand.booking.url
  return (
    <section className="section contact" id="contact">
      <div className="max">
        <div className="section-head">
          <div>
            <div className="section-num">— 09 / Visit</div>
            <span className="eyebrow" style={{ marginTop: 18 }}>come get bread</span>
            <h2 className="display" data-words-pullup style={{ marginTop: 24 }}>
              Three&nbsp;<span className="ital">bakeries.</span>
            </h2>
          </div>
        </div>

        <div className="contact-grid">
          <div className="contact-info" data-reveal>
            {LOCATIONS.map((loc) => (
              <div className="block" key={loc.name}>
                <div className="label">{loc.name}</div>
                <div className="value">{loc.street}<br />{loc.city}</div>
                <div className="value normal" style={{ marginTop: 6 }}>{loc.note}</div>
              </div>
            ))}
            <div className="block">
              <div className="label">hours</div>
              <div className="value normal">
                {brand.hours.full}<br />{brand.hours.featured}
              </div>
            </div>
          </div>

          <form className="contact-form" data-reveal action="#" method="POST">
            <h3 className="display">Join&nbsp;<span className="ital">the rise.</span></h3>
            <p className="body-lg" style={{ opacity: 0.8, marginTop: 12, marginBottom: 28, maxWidth: '46ch' }}>
              Fresh-bread drops, pizza nights, and what is playing in the courtyard, straight to your inbox. No spam, just good things baking.
            </p>
            <div className="field full">
              <label htmlFor="f-name">name</label>
              <input id="f-name" name="name" type="text" placeholder="Your name" />
            </div>
            <div className="field full" style={{ marginTop: 20 }}>
              <label htmlFor="f-email">email</label>
              <input id="f-email" name="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="submit-row">
              <span className="mono">baked fresh, sent weekly…</span>
              <button className="btn red" type="submit">
                Sign up <span className="arrow">↗</span>
              </button>
            </div>
            <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--rule)' }}>
              <a className="btn" href={orderUrl} target="_blank" rel="noopener noreferrer" style={{ width: '100%', justifyContent: 'center' }}>
                {brand.booking.ctaLabel} <span className="arrow">↗</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
