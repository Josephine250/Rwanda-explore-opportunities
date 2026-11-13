import SubscribeForm from './Subscribeform.jsx'

// Contact details are fictional placeholders. Replace them with your own.
function ContactSection() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="border-t-4 border-accent bg-brand-soft"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-2">
        <div>
          <h2 id="contact-heading" className="text-2xl font-extrabold">
            Contact us
          </h2>
          <p className="mt-1 text-sm text-muted">
            Want to list an event or ask a question? Reach out to our team.
          </p>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>
              <span className="font-semibold">Address:</span> KG 7 Ave, Kigali, Rwanda
            </p>
            <p>
              <span className="font-semibold">Email:</span>{' '}
              <a className="font-medium text-brand underline" href="mailto:hello@opportunities.example">
                hello@opportunities.example
              </a>
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{' '}
              <a className="font-medium text-brand underline" href="tel:+250780000000">
                +250 780 000 000
              </a>
            </p>
            <p>
              <span className="font-semibold">Hours:</span> Monday to Friday, 8:00 to 17:00
            </p>
          </address>
        </div>
        <SubscribeForm />
      </div>
    </section>
  )
}

export default ContactSection