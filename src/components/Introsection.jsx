// Short description under the header, with an inline SVG illustration.
// To use a real photo instead, put it in the `public` folder (e.g. public/hero.jpg)
// and replace the <svg> with:
// <img src="/hero.jpg" alt="Learners at a community workshop in Kigali" className="h-full w-full rounded-lg object-cover" />

const highlights = [
  { title: 'Workshops', text: 'Hands-on sessions to practise a new skill.' },
  { title: 'Career events', text: 'Meet employers and learn about jobs.' },
  { title: 'Community activities', text: 'Volunteer and meet people nearby.' },
  { title: 'Short courses', text: 'Learn step by step over a few weeks.' },
]

function HillsIllustration() {
  return (
    <svg
      viewBox="0 0 480 320"
      role="img"
      aria-label="Illustration of green hills, a lake and the sun over Rwanda"
      className="h-full w-full rounded-lg"
    >
      <rect width="480" height="320" className="fill-accent-soft" />
      <circle cx="370" cy="90" r="42" className="fill-accent" />
      <path d="M0 210 Q80 130 170 190 T340 170 T480 200 V320 H0 Z" className="fill-success" opacity="0.55" />
      <path d="M0 240 Q100 160 200 225 T400 210 T480 230 V320 H0 Z" className="fill-success" />
      <path d="M0 275 Q120 245 240 270 T480 262 V320 H0 Z" className="fill-brand" />
      <path d="M40 292 H140 M200 300 H300 M340 288 H440" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

function IntroSection() {
  return (
    <section aria-labelledby="intro-heading" className="border-b border-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 id="intro-heading" className="text-2xl font-extrabold sm:text-3xl">
            Find your next opportunity close to home
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted">
            Many learners miss out because event information is scattered in long lists.
            This explorer brings workshops, career events, community activities and short
            courses from Kigali, Huye, Musanze, Rubavu and Rusizi into one place. Search by
            title or city, filter by category, save the ones you like, and add new
            opportunities for others.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item.title} className="rounded-md border-l-4 border-accent bg-paper p-3">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-56 sm:h-72">
          <HillsIllustration />
        </div>
      </div>
    </section>
  )
}

export default IntroSection