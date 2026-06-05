import Image from 'next/image'

type Card = {
  label?: string
  name: string
  src: string
  alt: string
}

const CARDS: Card[] = [
  { label: 'the classic', name: 'Country Sourdough', src: '/images/featured/card-01.jpg', alt: 'Scored country sourdough loaf' },
  { label: 'whole grain', name: 'Seeded Multigrain', src: '/images/featured/card-02.jpg', alt: 'Seeded multigrain loaf' },
  { label: 'the morning', name: 'Viennoiserie', src: '/images/featured/card-03.jpg', alt: 'Fresh viennoiserie from the oven' },
  { label: 'the daily', name: 'Baguettes', src: '/images/featured/card-04.jpg', alt: 'Hand-shaped baguettes' },
]

export default function FeaturedOfferingSection() {
  const eyebrow = 'on the counter…'
  const body = 'A short menu that changes with the season and the milling. Whatever we bake, we bake it the long way and sell it the day it comes out of the oven.'
  return (
    <section className="section cream" id="offerings">
      <div className="max">
        <div className="section-head">
          <div>
            <div className="section-num">— 03 / Daily Offerings</div>
            <span className="eyebrow" style={{ marginTop: 18 }}>{eyebrow}</span>
            <h2 className="display" data-words-pullup style={{ marginTop: 24 }}>
              What we&nbsp;<span className="ital">bake.</span>
            </h2>
          </div>
          <div className="body-lg" data-anim-para>
            {body}
          </div>
        </div>

        <div className="cards-row" data-card-stagger>
          {CARDS.map((c, i) => (
            <article key={i} className="menu-card" data-card>
              <Image src={c.src} alt={c.alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 25vw" />
              <div className="meta">
                {c.label ? <div className="label">{c.label}</div> : null}
                <div className="name">{c.name}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
