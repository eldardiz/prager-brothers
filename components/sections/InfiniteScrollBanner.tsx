export default function InfiniteScrollBanner() {
  return (
    <div className="marquee" data-speed="55">
      <div className="marquee-track">
        <span className="word script">Sourdough</span>
        <span className="dot"></span>
        <span className="word"><em>Baguettes</em></span>
        <span className="dot alt"></span>
        <span className="word script">Rye</span>
        <span className="dot cream"></span>
        <span className="word"><em>Viennoiserie</em></span>
        <span className="dot"></span>
        <span className="word script">Wood-fired&nbsp;pizza</span>
        <span className="dot alt"></span>
        <span className="word"><em>Coffee</em></span>
        <span className="dot cream"></span>
      </div>
    </div>
  )
}
