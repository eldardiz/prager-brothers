import Image from 'next/image'

// Horizontal-scroll showcase — Prager's three pillars: Bread, Pizza, Café.
// Mirrors cemberstudio's three-column specialities, made immersive.
export default function MenuShowcaseSection() {
  return (
    <div className="horizontal__outer" data-horizontal-scroll-outer>
    <section className="horizontal__wrap" data-horizontal-scroll-wrap>

      <article data-horizontal-scroll-panel className="horizontal__panel">
        <div className="horizontal__panel-inner">
          <div className="horizontal__panel-bg">
            <Image src="/images/showcase/panel-01.jpg" alt="Hand-shaped sourdough loaves" fill className="object-cover" sizes="100vw" />
          </div>
          <svg className="noise" preserveAspectRatio="none"><rect width="100%" height="100%" filter="url(#noise)" /></svg>
          <div className="horizontal__panel-meta tl">
            <div>I&nbsp;/&nbsp;III · BREAD</div>
          </div>
          <div className="horizontal__panel-meta br">
            <div>MILLED + FERMENTED IN HOUSE</div>
            <div>FRESH DAILY FROM 8AM</div>
          </div>
          <div className="horizontal__panel-content">
            <span className="eyebrow">the daily bake…</span>
            <h2 className="display">Bread</h2>
            <p className="desc">Country sourdough, seeded loaves, baguettes and rye. Long-fermented, hand-shaped, baked dark.</p>
          </div>
        </div>
      </article>

      <article data-horizontal-scroll-panel className="horizontal__panel">
        <div className="horizontal__panel-inner">
          <div className="horizontal__panel-bg">
            <Image src="/images/showcase/panel-02.jpg" alt="Wood-fired pizza fresh from the oven" fill className="object-cover" sizes="100vw" />
          </div>
          <svg className="noise" preserveAspectRatio="none"><rect width="100%" height="100%" filter="url(#noise)" /></svg>
          <div className="horizontal__panel-meta tl">
            <div>II&nbsp;/&nbsp;III · PIZZA</div>
          </div>
          <div className="horizontal__panel-meta br">
            <div>WOOD-FIRED · WEEKENDS</div>
            <div>SAME DOUGH, 24-HOUR RISE</div>
          </div>
          <div className="horizontal__panel-content">
            <span className="eyebrow">fired to order…</span>
            <h2 className="display"><span className="ital">Pizza</span></h2>
            <p className="desc">Our sourdough base, blistered in the wood oven. Simple toppings, proper char, eaten fast.</p>
          </div>
        </div>
      </article>

      <article data-horizontal-scroll-panel className="horizontal__panel">
        <div className="horizontal__panel-inner">
          <div className="horizontal__panel-bg">
            <Image src="/images/showcase/panel-03.jpg" alt="Inside a Prager Brothers bakery" fill className="object-cover" sizes="100vw" />
          </div>
          <svg className="noise" preserveAspectRatio="none"><rect width="100%" height="100%" filter="url(#noise)" /></svg>
          <div className="horizontal__panel-meta tl">
            <div>III&nbsp;/&nbsp;III · CAFÉ</div>
          </div>
          <div className="horizontal__panel-meta br">
            <div>COFFEE + PASTRY</div>
            <div>THREE LOCATIONS</div>
          </div>
          <div className="horizontal__panel-content">
            <span className="eyebrow">stay a while…</span>
            <h2 className="display">Café</h2>
            <p className="desc">Good coffee, warm viennoiserie, and a counter full of the morning&apos;s bake. Pull up a stool.</p>
          </div>
        </div>
      </article>

    </section>
    </div>
  )
}
