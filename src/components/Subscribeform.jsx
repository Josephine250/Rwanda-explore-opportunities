import { useState } from 'react'
import TextInput from './TextInput.jsx'
import Button from './Button.jsx'
import Alert from './Alert.jsx'

function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [subscribedEmail, setSubscribedEmail] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const value = email.trim()

    if (value === '') {
      setError('Enter your email address.')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setError('Enter a valid email address, like name@example.com.')
      return
    }

    // Demo only: nothing is sent anywhere.
    setSubscribedEmail(value)
    setEmail('')
    setError('')
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Subscribe for updates</h3>
      <p className="mt-1 text-sm text-muted">
        Get a short email when new opportunities are added. This is a demo form, so no
        email is sent or stored.
      </p>

      {subscribedEmail !== '' ? (
        <div className="mt-4">
          <Alert tone="success" title="Thank you for subscribing">
            We will send updates to {subscribedEmail}.
          </Alert>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3">
          <TextInput
            id="subscribe-email"
            label="Email address"
            type="email"
            placeholder="name@example.com"
            value={email}
            error={error}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
          />
          <Button type="submit">Subscribe</Button>
        </form>
      )}
    </div>
  )
}

export default SubscribeForm