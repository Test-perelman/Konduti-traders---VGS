'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send, CheckCircle2 } from 'lucide-react'
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

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (_data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200))
    setSubmitted(true)
    reset()
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-green/12 flex items-center justify-center mb-5">
          <CheckCircle2 className="w-8 h-8 text-green" aria-hidden="true" />
        </div>
        <h3 className="font-display font-semibold text-2xl text-dark mb-2">
          Inquiry Received!
        </h3>
        <p className="font-body text-gray-text text-base max-w-sm">
          We&apos;ll review your requirement and get back to you within 4 business hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 font-body text-sm font-semibold text-teal hover:text-green transition-colors"
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
          <label htmlFor="name" className="font-body text-xs font-semibold text-teal mb-1.5 block">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Rajesh Menon"
            className={cn(
              'w-full px-4 py-3.5 rounded-xl border font-body text-sm text-dark bg-white outline-none transition-colors',
              errors.name
                ? 'border-red-400 focus:border-red-400'
                : 'border-gray-light focus:border-green focus:ring-1 focus:ring-green/30'
            )}
            {...register('name', { required: 'Name is required' })}
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 font-body text-xs text-red-500" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="font-body text-xs font-semibold text-teal mb-1.5 block">
            Company / Business Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder="FreshMart Pvt. Ltd."
            className={cn(
              'w-full px-4 py-3.5 rounded-xl border font-body text-sm text-dark bg-white outline-none transition-colors',
              errors.company
                ? 'border-red-400 focus:border-red-400'
                : 'border-gray-light focus:border-green focus:ring-1 focus:ring-green/30'
            )}
            {...register('company', { required: 'Company name is required' })}
            aria-required="true"
            aria-describedby={errors.company ? 'company-error' : undefined}
          />
          {errors.company && (
            <p id="company-error" className="mt-1 font-body text-xs text-red-500" role="alert">
              {errors.company.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="font-body text-xs font-semibold text-teal mb-1.5 block">
            Phone Number <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className={cn(
              'w-full px-4 py-3.5 rounded-xl border font-body text-sm text-dark bg-white outline-none transition-colors',
              errors.phone
                ? 'border-red-400 focus:border-red-400'
                : 'border-gray-light focus:border-green focus:ring-1 focus:ring-green/30'
            )}
            {...register('phone', {
              required: 'Phone is required',
              pattern: { value: /^[\d\s\+\-]{10,15}$/, message: 'Enter a valid phone number' },
            })}
            aria-required="true"
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1 font-body text-xs text-red-500" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="font-body text-xs font-semibold text-teal mb-1.5 block">
            Business Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="procurement@yourcompany.in"
            className={cn(
              'w-full px-4 py-3.5 rounded-xl border font-body text-sm text-dark bg-white outline-none transition-colors',
              errors.email
                ? 'border-red-400 focus:border-red-400'
                : 'border-gray-light focus:border-green focus:ring-1 focus:ring-green/30'
            )}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
            })}
            aria-required="true"
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 font-body text-xs text-red-500" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Requirement Type */}
      <div>
        <label htmlFor="requirementType" className="font-body text-xs font-semibold text-teal mb-1.5 block">
          Requirement Type <span aria-hidden="true">*</span>
        </label>
        <select
          id="requirementType"
          className={cn(
            'w-full px-4 py-3.5 rounded-xl border font-body text-sm text-dark bg-white outline-none transition-colors appearance-none cursor-pointer',
            errors.requirementType
              ? 'border-red-400 focus:border-red-400'
              : 'border-gray-light focus:border-green focus:ring-1 focus:ring-green/30'
          )}
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
          <p id="req-error" className="mt-1 font-body text-xs text-red-500" role="alert">
            {errors.requirementType.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="font-body text-xs font-semibold text-teal mb-1.5 block">
          Requirement Details <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Please describe your requirement — product categories, volumes, delivery locations, frequency, and any specific quality requirements..."
          className={cn(
            'w-full px-4 py-3.5 rounded-xl border font-body text-sm text-dark bg-white outline-none transition-colors resize-none',
            errors.message
              ? 'border-red-400 focus:border-red-400'
              : 'border-gray-light focus:border-green focus:ring-1 focus:ring-green/30'
          )}
          {...register('message', {
            required: 'Please describe your requirement',
            minLength: { value: 20, message: 'Please provide more detail (min 20 chars)' },
          })}
          aria-required="true"
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 font-body text-xs text-red-500" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-green text-white font-body font-semibold rounded-xl hover:bg-green-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-base shadow-green-sm hover:shadow-green-md"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
            Sending Inquiry...
          </>
        ) : (
          <>
            <Send size={16} aria-hidden="true" />
            Submit Inquiry
          </>
        )}
      </button>

      <p className="font-body text-xs text-center text-gray-text">
        We respond to all B2B inquiries within 4 business hours.
      </p>
    </form>
  )
}
