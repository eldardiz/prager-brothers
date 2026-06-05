import Image from 'next/image'

const PARAGRAPHS = [
  'Prager Brothers began with two brothers, a stone mill, and a stubborn belief that bread should taste of something. We mill our own grain, ferment it slowly over many hours, and shape every loaf by hand before dawn.',
  'No shortcuts, no improvers, no rushing the rise. Just flour, water, salt, time, and the kind of care you can taste in the crust. Baked fresh every morning across three San Diego County neighborhoods.',
]

type MetaItem = { label: string; value: string }
const META: MetaItem[] = [
  { label: 'established', value: 'Carlsbad, 2012' },
  { label: 'bakeries', value: 'Three' },
  { label: 'fermentation', value: 'Slow, always' },
  { label: 'milled', value: 'In house' },
]

export default function AboutSection() {
  const eyebrow = 'the prager brothers'
  return (
    <section className="section cream" id="about">
      <svg className="noise noise-strong" preserveAspectRatio="none">
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      <div className="max">
        <div className="section-head">
          <div>
            <div className="section-num">— 01 / Our Story</div>
            <span className="eyebrow" style={{ marginTop: 18 }}>{eyebrow}</span>
            <h2 className="display" data-words-pullup style={{ marginTop: 24 }}>
              Slow bread,&nbsp;<span className="ital">made the long way.</span>
            </h2>
          </div>
        </div>

        <div className="histoire-grid">
          <div className="histoire-text">
            {PARAGRAPHS.map((p, i) => (
              <p key={i} data-anim-para>{p}</p>
            ))}

            <div className="histoire-meta">
              {META.map((m, i) => (
                <div key={i}>
                  <div className="label">{m.label}</div>
                  <div className="value">{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="histoire-image" data-parallax-trigger>
            <div data-parallax="0.15" style={{ position: 'absolute', inset: 0 }}>
              <Image src="/images/about/placeholder.jpg" alt="A Prager Brothers baker carrying fresh loaves" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
