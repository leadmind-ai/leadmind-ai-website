"use client";

import { useForm } from "@formspree/react";

type FormDict = {
  name: string;
  email: string;
  company: string;
  job_title?: string;
  subject: string;
  subject_options: string[];
  message: string;
  submit: string;
  success: string;
  error: string;
};

type ContactFormProps = {
  form: FormDict;
};

export function ContactForm({ form }: ContactFormProps) {
  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_ID || "xplaceholder"
  );

  if (state.succeeded) {
    return (
      <div className="rounded-xl bg-accent-soft p-8 text-center">
        <p className="text-lg font-medium text-accent">{form.success}</p>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-xl border border-surface-elevated bg-surface-input px-4 py-3 text-on-surface placeholder:text-on-surface-muted/50 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-glow";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-on-surface"
        >
          {form.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className={inputClasses}
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-on-surface"
        >
          {form.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClasses}
        />
      </div>
      <div>
        <label
          htmlFor="company"
          className="mb-1 block text-sm font-medium text-on-surface"
        >
          {form.company}
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          className={inputClasses}
        />
      </div>
      {form.job_title && (
        <div>
          <label
            htmlFor="job_title"
            className="mb-1 block text-sm font-medium text-on-surface"
          >
            {form.job_title}
          </label>
          <input
            id="job_title"
            name="job_title"
            type="text"
            className={inputClasses}
          />
        </div>
      )}
      <div>
        <label
          htmlFor="subject"
          className="mb-1 block text-sm font-medium text-on-surface"
        >
          {form.subject}
        </label>
        <select
          id="subject"
          name="subject"
          required
          className={inputClasses}
        >
          <option value="">--</option>
          {form.subject_options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-medium text-on-surface"
        >
          {form.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={inputClasses}
        />
      </div>
      {state.errors && Object.keys(state.errors).length > 0 && (
        <p className="text-sm text-red-500">{form.error}</p>
      )}
      <button
        type="submit"
        disabled={state.submitting}
        className="inline-flex w-full items-center justify-center rounded-lg bg-teal px-6 py-3 font-medium text-white transition-colors hover:bg-teal-light disabled:opacity-50"
      >
        {state.submitting ? "..." : form.submit}
      </button>
    </form>
  );
}
