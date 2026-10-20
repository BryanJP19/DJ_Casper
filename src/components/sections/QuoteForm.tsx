import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { durationIds, eventTypeIds, interestIds, type InterestId } from '../../config/services'
import { packageOptionIds, type PackageId } from '../../config/packages'
import { site } from '../../config/site'
import { useCopy } from '../../hooks/useCopy'
import { useQuote } from '../../context/QuoteContext'
import { buildQuoteMessage, buildWhatsAppUrl, openWhatsApp } from '../../lib/whatsapp'
import { emptyQuoteForm, todayISO, validateQuote, type QuoteErrors, type QuoteFormData } from '../../lib/validation'
import { WhatsAppIcon } from '../ui/BrandIcons'

type Status = { kind: 'idle' } | { kind: 'opened'; url: string } | { kind: 'blocked'; url: string }

interface FieldProps {
  id: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: (a: { id: string; describedBy?: string; invalid: boolean }) => ReactNode
}

function Field({ id, label, required, hint, error, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errId].filter(Boolean).join(' ') || undefined
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required ? (
          <span aria-hidden="true" className="field__req">
            {' '}
            *
          </span>
        ) : null}
        {hint ? <span className="field__opt">({hint})</span> : null}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {error ? (
        <p id={errId} className="field__error">
          <span aria-hidden="true">⚠</span>
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  )
}

const FIELD_ORDER: (keyof QuoteFormData)[] = ['name', 'phone', 'eventType', 'date', 'country', 'city', 'duration', 'guests']

export function QuoteForm() {
  const copy = useCopy()
  const f = copy.form
  const { selectedEvent, selectedPackage, eventNonce, packageNonce } = useQuote()
  const [data, setData] = useState<QuoteFormData>(emptyQuoteForm)
  const [errors, setErrors] = useState<QuoteErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const formRef = useRef<HTMLFormElement>(null)

  // Sincroniza el tipo de evento elegido en las tarjetas (ajuste de estado durante el render, sin efecto).
  const [syncedEvent, setSyncedEvent] = useState(eventNonce)
  if (eventNonce !== syncedEvent) {
    setSyncedEvent(eventNonce)
    if (selectedEvent) {
      setData((d) => ({ ...d, eventType: selectedEvent }))
      setErrors((e) => ({ ...e, eventType: undefined }))
    }
  }
  const [syncedPackage, setSyncedPackage] = useState(packageNonce)
  if (packageNonce !== syncedPackage) {
    setSyncedPackage(packageNonce)
    if (selectedPackage) setData((d) => ({ ...d, packageId: selectedPackage }))
  }

  const update = <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => {
    const next = { ...data, [key]: value }
    setData(next)
    if (submitted) setErrors(validateQuote(next, copy))
    if (status.kind !== 'idle') setStatus({ kind: 'idle' })
  }

  const toggleInterest = (id: InterestId) =>
    update('interests', data.interests.includes(id) ? data.interests.filter((i) => i !== id) : [...data.interests, id])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const found = validateQuote(data, copy)
    setErrors(found)
    const firstInvalid = FIELD_ORDER.find((k) => found[k])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#qf-${firstInvalid}`)?.focus()
      return
    }
    const url = buildWhatsAppUrl(buildQuoteMessage(data))
    setStatus(openWhatsApp(url) ? { kind: 'opened', url } : { kind: 'blocked', url })
  }

  const errorCount = Object.values(errors).filter(Boolean).length
  const input = (a: { id: string; describedBy?: string; invalid: boolean }) => ({
    id: a.id,
    'aria-describedby': a.describedBy,
    'aria-invalid': a.invalid || undefined,
    className: 'input',
  })

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="qf-title" className="form">
      <h3 id="qf-title" className="form__title">
        {f.title}
      </h3>
      <p className="form__hint">{f.requiredHint}</p>
      <p className="sr-only" role="status" aria-live="polite">
        {selectedEvent ? `${copy.quote.selectedAnnouncement} ${copy.services.items[selectedEvent].name}` : ''}
      </p>

      {submitted && errorCount > 0 ? (
        <p role="alert" className="form__summary">
          {f.errors.summary(errorCount)}
        </p>
      ) : null}

      <div className="form__grid">
        <Field id="qf-name" label={f.fields.name.label} required error={errors.name}>
          {(a) => <input {...input(a)} type="text" autoComplete="name" placeholder={f.fields.name.placeholder} value={data.name} onChange={(e) => update('name', e.target.value)} />}
        </Field>
        <Field id="qf-phone" label={f.fields.phone.label} required hint={f.fields.phone.hint} error={errors.phone}>
          {(a) => <input {...input(a)} type="tel" inputMode="tel" autoComplete="tel" placeholder={f.fields.phone.placeholder} value={data.phone} onChange={(e) => update('phone', e.target.value)} />}
        </Field>
        <Field id="qf-eventType" label={f.fields.eventType.label} required error={errors.eventType}>
          {(a) => (
            <select {...input(a)} value={data.eventType} onChange={(e) => update('eventType', e.target.value as QuoteFormData['eventType'])}>
              <option value="">{f.fields.eventType.placeholder}</option>
              {eventTypeIds.map((id) => (
                <option key={id} value={id}>
                  {copy.services.items[id].name}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field id="qf-date" label={f.fields.date.label} required error={errors.date}>
          {(a) => <input {...input(a)} type="date" min={todayISO()} value={data.date} onChange={(e) => update('date', e.target.value)} />}
        </Field>
        <Field id="qf-country" label={f.fields.country.label} required error={errors.country}>
          {(a) => (
            <select {...input(a)} autoComplete="country" value={data.country} onChange={(e) => update('country', e.target.value as QuoteFormData['country'])}>
              <option value="">{f.fields.country.placeholder}</option>
              {site.serviceCountries.map((c) => (
                <option key={c} value={c}>
                  {f.countries[c]}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field id="qf-city" label={f.fields.city.label} required error={errors.city}>
          {(a) => <input {...input(a)} type="text" autoComplete="address-level2" placeholder={f.fields.city.placeholder} value={data.city} onChange={(e) => update('city', e.target.value)} />}
        </Field>
        <Field id="qf-duration" label={f.fields.duration.label} required error={errors.duration}>
          {(a) => (
            <select {...input(a)} value={data.duration} onChange={(e) => update('duration', e.target.value as QuoteFormData['duration'])}>
              <option value="">{f.fields.duration.placeholder}</option>
              {durationIds.map((d) => (
                <option key={d} value={d}>
                  {f.durations[d]}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field id="qf-guests" label={f.fields.guests.label} hint={f.fields.guests.hint} error={errors.guests}>
          {(a) => <input {...input(a)} type="text" inputMode="numeric" value={data.guests} onChange={(e) => update('guests', e.target.value)} />}
        </Field>
      </div>

      <fieldset className="fieldset">
        <legend>
          {f.fields.package.label} <span className="field__opt">({f.fields.package.hint})</span>
        </legend>
        <div className="checks">
          {packageOptionIds.map((id: PackageId) => (
            <label key={id} className="check">
              <input type="radio" name="paquete" value={id} checked={data.packageId === id} onChange={() => update('packageId', id)} />
              {f.packages[id]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <legend>
          {f.fields.interests.label} <span className="field__opt">({f.fields.interests.hint})</span>
        </legend>
        <div className="checks">
          {interestIds.map((id) => (
            <label key={id} className="check">
              <input type="checkbox" checked={data.interests.includes(id)} onChange={() => toggleInterest(id)} />
              {f.interests[id]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form__notes">
        <Field id="qf-notes" label={f.fields.notes.label} hint={f.fields.notes.hint}>
          {(a) => <textarea {...input(a)} rows={4} maxLength={500} placeholder={f.fields.notes.placeholder} value={data.notes} onChange={(e) => update('notes', e.target.value)} />}
        </Field>
      </div>

      <button type="submit" className="btn btn--primary btn--block btn--block-mobile">
        <WhatsAppIcon width={20} height={20} />
        {f.submit}
      </button>
      <p className="form__privacy">{f.privacyNote}</p>

      <div role="status" aria-live="polite">
        {status.kind !== 'idle' ? (
          <div className="form__result">
            <p>{status.kind === 'opened' ? f.result.opened : f.result.blocked}</p>
            <a href={status.url} target="_blank" rel="noopener noreferrer">
              {f.result.link}
              <span className="sr-only"> {copy.common.externalHint}</span>
            </a>
          </div>
        ) : null}
      </div>
    </form>
  )
}
