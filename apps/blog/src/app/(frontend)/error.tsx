'use client'

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="intro">
      <p className="eyebrow">Something went wrong</p>
      <h1>The blog couldn’t load this page.</h1>
      <p>
        The content service may be briefly unavailable.{' '}
        <button type="button" className="link-button" onClick={reset}>
          Try again
        </button>
        .
      </p>
    </section>
  )
}
