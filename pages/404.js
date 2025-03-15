import Link from 'next/link'

export default function NotFound() {
  return <div className="NotFoundWarning">
      <h1>Nie masz uprawnień!</h1>
      <div className="NotFoundWarningLink">
        <Link href="/">Wróć do strony głównej</Link>
      </div>
  </div>
}