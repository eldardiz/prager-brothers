import Image from 'next/image'
import { brand } from '@/lib/brand'

export default function InstagramSection() {
  const handle = brand.social.instagram
  const instagramUrl = brand.social.instagramUrl
  const eyebrow = `@${handle || 'pragerbrothers'}`
  const ctaLabel = 'Follow along'
  const POSTS = [
    { recommend: 'fresh today…', caption: "This morning's boules, still warm.", tags: '#sourdough #carlsbad #artisanbread' },
    { recommend: 'weekend…', caption: 'Wood-fired pizza nights are back.', tags: '#woodfired #pizza #encinitas' },
    { recommend: 'the craft…', caption: 'Milled, mixed, shaped before dawn.', tags: '#breaducation #craft #slowfood' },
    { recommend: 'in the courtyard…', caption: 'Live music, good bread, golden hour.', tags: '#livemusic #sandiego #goodtimes' },
  ]
  return (
    <section className="section cream" id="instagram">
      <div className="max">
        <div className="section-num">— 08 / Follow</div>
        <span className="eyebrow" style={{ marginTop: 18 }}>{eyebrow}</span>

        <div className="insta-lead" style={{ marginTop: 32 }}>
          <h2 className="display" data-words-pullup style={{ maxWidth: '14ch' }}>
            Fresh&nbsp;<span className="ital">daily.</span>
          </h2>
          <div className="cta-wrap">
            <a className="btn deep-red" href={instagramUrl} target="_blank" rel="noopener noreferrer">
              {ctaLabel} <span className="arrow">↗</span>
            </a>
          </div>
        </div>

        <p className="body-lg" data-anim-para style={{ maxWidth: '62ch', opacity: 0.85, marginBottom: 36 }}>
          Follow us on <strong>Instagram</strong> for the daily bake, what is coming out of the wood oven, the team at work, and this weekend&apos;s music in the courtyard.
        </p>

        <div className="insta-cb" data-card-stagger>
          {POSTS.map((p, idx) => (
            <a key={idx} className="insta-cb-card" data-card href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <div className="cover">
                <Image src={`/images/instagram/post-0${idx + 1}.jpg`} alt={`Prager Brothers on Instagram ${idx + 1}`} fill className="object-cover" sizes="(max-width:768px) 100vw, 25vw" />
              </div>
              <div className="meta">
                <div className="recommend">{p.recommend}</div>
                <div className="caption">{p.caption}</div>
                <div className="tags">{p.tags}</div>
                <div className="chip">
                  <Image src="/images/InstagramLogo.png" alt="Instagram" width={16} height={16} className="chip-logo" />
                  <span className="handle">{handle || 'handle'}</span>
                  <span className="check">✓</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
