import Image from 'next/image'

export default function LocationShowcaseSection() {
  const eyebrow = 'on site…'
  const heading: string | undefined = undefined
  const body = 'A short paragraph on the space, the terrace, the tasting room, the café seating. Practical detail readers care about: reservation guidance, capacity, seasonality.'
  const imgSrc = '/images/location/placeholder.jpg'
  return (
    <section className="section" id="location-showcase">
      <div className="max">
        <div className="section-head">
          <div>
            <div className="section-num">— 05 / Location</div>
            <span className="eyebrow" style={{ marginTop: 18 }}>{eyebrow}</span>
            <h2 className="display" data-words-pullup style={{ marginTop: 24 }}>
              {heading ?? <>Twenty-two&nbsp;<span className="ital">seats.</span></>}
            </h2>
          </div>
          <div className="body-lg" data-anim-para>
            {body}
          </div>
        </div>

        <div className="terrasse-2col" data-card-stagger>
          <div className="terrasse-2col-meta" data-card>
            <div className="t2-label">SEATS</div>
            <div className="t2-value">22</div>
            <div className="t2-label" style={{ marginTop: 32 }}>SEASON</div>
            <div className="t2-value">Apr — Oct</div>
            <div className="t2-label" style={{ marginTop: 32 }}>HOURS</div>
            <div className="t2-value" style={{ fontSize: 'clamp(22px,2.5vw,40px)' }}>12 — 23h</div>
          </div>
          <div className="terrasse-2col-image" data-card data-parallax-trigger>
            <div data-parallax="0.1" style={{ position: 'absolute', inset: 0 }}>
              <Image src={imgSrc} alt="Location — main image" fill className="object-cover" sizes="(max-width:768px) 100vw, 55vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
