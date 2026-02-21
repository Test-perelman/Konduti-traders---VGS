'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface FormData {
  name: string
  company: string
  phone: string
  email: string
  requirementType: string
  message: string
}

const requirementTypes = [
  'Fresh Fruits',
  'Vegetables',
  'Exotic Produce',
  'Leafy Greens',
  'Seasonal Specials',
  'Multiple Categories',
  'Custom Requirement',
]

const inputBase =
  'w-full px-4 py-3.5 rounded-xl border font-body text-dark bg-white outline-none transition-colors'
const inputDefault = 'border-stone-lighter focus:border-green focus:ring-1 focus:ring-green/20'
const inputError = 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/20'

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (_data: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 1200))
    setSubmitted(true)
    reset()
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <circle cx="14" cy="14" r="13" stroke="#3d8b5e" strokeWidth="1.5"/>
            <path d="M8.5 14l4 4 7-8" stroke="#3d8b5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3
          className="font-display font-light text-dark mb-2"
          style={{ fontSize: '1.8rem', letterSpacing: '-0.025em' }}
        >
          Inquiry Received.
        </h3>
        <p className="font-body text-stone max-w-sm" style={{ fontSize: '0.85rem', lineHeight: '1.75' }}>
          We&apos;ll review your requirement and respond within 4 business hours with a tailored supply plan.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 font-body font-semibold text-green hover:text-teal transition-colors animated-underline"
          style={{ fontSize: '0.8rem', letterSpacing: '0.03em' }}
        >
          Submit another inquiry
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
      aria-label="Business inquiry form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="eyebrow text-teal mb-2 block">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Rajesh Menon"
            className={cn(inputBase, errors.name ? inputError : inputDefault)}
            style={{ fontSize: '0.85rem' }}
            {...register('name', { required: 'Name is required' })}
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 font-body text-red-500" style={{ fontSize: '0.75rem' }} role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="eyebrow text-teal mb-2 block">
            Company / Business Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder="FreshMart Pvt. Ltd."
            className={cn(inputBase, errors.company ? inputError : inputDefault)}
            style={{ fontSize: '0.85rem' }}
            {...register('company', { required: 'Company name is required' })}
            aria-required="true"
            aria-describedby={errors.company ? 'company-error' : undefined}
          />
          {errors.company && (
            <p id="company-error" className="mt-1.5 font-body text-red-500" style={{ fontSize: '0.75rem' }} role="alert">
              {errors.company.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="eyebrow text-teal mb-2 block">
            Phone Number <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className={cn(inputBase, errors.phone ? inputError : inputDefault)}
            style={{ fontSize: '0.85rem' }}
            {...register('phone', {
              required: 'Phone is required',
              pattern: { value: /^[\d\s+\-]{10,15}$/, message: 'Enter a valid phone number' },
            })}
            aria-required="true"
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 font-body text-red-500" style={{ fontSize: '0.75rem' }} role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="eyebrow text-teal mb-2 block">
            Business Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="procurement@yourcompany.in"
            className={cn(inputBase, errors.email ? inputError : inputDefault)}
            style={{ fontSize: '0.85rem' }}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
            })}
            aria-required="true"
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 font-body text-red-500" style={{ fontSize: '0.75rem' }} role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Requirement Type */}
      <div>
        <label htmlFor="requirementType" className="eyebrow text-teal mb-2 block">
          Requirement Type <span aria-hidden="true">*</span>
        </label>
        <select
          id="requirementType"
          className={cn(
            inputBase,
            'appearance-none cursor-pointer',
            errors.requirementType ? inputError : inputDefault
          )}
          style={{ fontSize: '0.85rem' }}
          {...register('requirementType', { required: 'Please select a requirement type' })}
          aria-required="true"
          aria-describedby={errors.requirementType ? 'req-error' : undefined}
        >
          <option value="">Select category...</option>
          {requirementTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.requirementType && (
          <p id="req-error" className="mt-1.5 font-body text-red-500" style={{ fontSize: '0.75rem' }} role="alert">
            {errors.requirementType.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="eyebrow text-teal mb-2 block">
          Requirement Details <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Describe your requirement — product categories, volumes, delivery locations, frequency, and any specific quality requirements..."
          className={cn(inputBase, 'resize-none', errors.message ? inputError : inputDefault)}
          style={{ fontSize: '0.85rem', lineHeight: '1.7' }}
          {...register('message', {
            required: 'Please describe your requirement',
            minLength: { value: 20, message: 'Please provide more detail (min 20 chars)' },
          })}
          aria-required="true"
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 font-body text-red-500" style={{ fontSize: '0.75rem' }} role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-green text-white font-body font-semibold rounded-full hover:bg-green-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-green-sm hover:shadow-green-md magnetic-btn"
        style={{ fontSize: '0.85rem', letterSpacing: '0.03em' }}
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M1.5 7.5h12M9 2.5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Submit Inquiry
          </>
        )}
      </button>

      <p className="font-body text-center text-stone" style={{ fontSize: '0.75rem' }}>
        All B2B inquiries are reviewed within 4 business hours.
      </p>
    </form>
  )
}
