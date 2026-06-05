type Testimonial = { quote: string; name: string; source: string; rating: number }

const FALLBACK: Testimonial[] = [
  { quote: 'The best loaf in San Diego County. I drive across town for it and I would drive further.', name: 'Regular, Encinitas', source: 'Google review', rating: 5 },
  { quote: 'That crust. The crumb. You can taste the time that went into it. Real bread, the way it should be.', name: 'Sunday morning regular', source: 'Instagram', rating: 5 },
  { quote: 'Wood-fired pizza on a Saturday with live music in the courtyard. There is no better way to spend an evening.', name: 'Local family', source: 'Yelp', rating: 5 },
  { quote: 'Picked up a seeded loaf still warm from the oven. It did not make it home in one piece.', name: 'First-time visitor', source: 'Google review', rating: 5 },
]

export default function TestimonialsSection() {
  const items = FALLBACK
  return (
    <section className="section cream testi-wrap">
      <div className="max">
        <div className="section-head">
          <div>
            <div className="section-num">— 06 / Kind Words</div>
            <span className="eyebrow" style={{ marginTop: 18 }}>they keep coming back</span>
            <h2 className="display" data-words-pullup style={{ marginTop: 24 }}>
              From the&nbsp;<span className="ital">neighborhood.</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="testi-row">
        <div className="testi-track">
          {items.map((t, i) => (
            <article key={i} className="testi-card">
              <div className="stars">{'★'.repeat(t.rating ?? 5)}</div>
              <p className="quote">&ldquo; {t.quote} &rdquo;</p>
              <div className="author"><span>{t.name}</span><span className="src">{t.source}</span></div>
              <div className="testi-pin">&quot;</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
