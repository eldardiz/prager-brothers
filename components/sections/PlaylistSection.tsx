import { brand } from '@/lib/brand'

// ★ Music Vinyl section — ported from the Le Passage Saint-Honoré template and
// rebranded for Prager Brothers, who run a real live-music calendar. The vinyl
// is pure CSS (recolored to peacock blue via --red) and spins via vinylSpin() in
// AnimationInit. Tracks here = the house playlist that spins while the oven runs.
export default function PlaylistSection() {
  const eyebrow = 'the sound of the bakery'
  const body = 'There is almost always music at Prager. A record on while the dough proofs, and live sets in the courtyard most weekends. Here is what has been spinning lately.'
  const musicCalendarUrl = 'https://www.pragerbrothers.com/music-calendar'

  return (
    <section className="section playlist" id="music">
      <svg className="noise" preserveAspectRatio="none">
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      <div className="max">
        <div className="section-head">
          <div>
            <div className="section-num">— 07 / Music</div>
            <span className="eyebrow" style={{ marginTop: 18 }}>{eyebrow}</span>
            <h2 className="display" data-words-pullup style={{ marginTop: 24 }}>
              Live at&nbsp;<span className="ital">Prager.</span>
            </h2>
          </div>
        </div>

        <div className="playlist-card" data-reveal>
          <div className="playlist-vinyl" aria-hidden="true">
            <div className="playlist-label">
              Prager Bros
              <small>VOL. 01 · THE BAKERY</small>
            </div>
          </div>

          <div className="playlist-info">
            <span className="eyebrow">on the turntable…</span>
            <h3 className="display" style={{ marginTop: 20 }}>
              House&nbsp;<span className="ital">selection.</span>
            </h3>
            <p className="body-lg" style={{ marginTop: 16, opacity: 0.85, maxWidth: '42ch' }}>
              {body}
            </p>

            <div className="playlist-tracks">
              {[
                { n: '01', title: 'Harvest Moon', artist: 'Neil Young', duration: '5:03' },
                { n: '02', title: 'Such Great Heights', artist: 'Iron & Wine', duration: '4:09' },
                { n: '03', title: 'Dreams', artist: 'Fleetwood Mac', duration: '4:14' },
                { n: '04', title: 'Banana Pancakes', artist: 'Jack Johnson', duration: '3:11' },
              ].map((t) => (
                <div key={t.n} className="track">
                  <span className="num">{t.n}</span>
                  <div className="title-row">
                    <span className="title">{t.title}</span>
                    <span className="artist">{t.artist}</span>
                  </div>
                  <span className="duration">{t.duration}</span>
                </div>
              ))}
            </div>

            <div className="playlist-actions">
              <a className="btn" href={musicCalendarUrl} target="_blank" rel="noopener noreferrer">See the Music Calendar <span className="arrow">↗</span></a>
              <a className="btn ghost" href={brand.social.instagramUrl} target="_blank" rel="noopener noreferrer">Latest sets</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
