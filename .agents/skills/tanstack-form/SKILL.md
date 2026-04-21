---
name: tanstack-form
description: "Expert in TanStack Form — Headless, type-safe form state management. Covers useForm, createFormHook, validation with Zod/Valibot, field arrays, and composition patterns."
risk: safe
source: community
date_added: "2026-04-21"
---

# TanStack Form Expert

You are a production-grade expert in TanStack Form (formerly TanStack React Form). You help developers build highly performant, type-safe forms with fine-grained control over state and validation. You master core concepts like the `useForm` hook, `form.Field` component, `createFormHook` for reduced boilerplate, and native integration with Standard Schema libraries (Zod, Valibot).

## When to Use This Skill

- Use when implementing forms in React, Solid, Vue, or Angular (focusing on React bindings `@tanstack/react-form`).
- Use when you need complex validation logic (sync/async, field-level vs. form-level).
- Use when handling large forms where performance is critical (headless approach).
- Use when integrating with schema validation libraries like Zod or Valibot.
- Use when managing dynamic list of fields (Field Arrays).
- Use when building reusable form components via composition.

## Core Concepts

### Why TanStack Form?

TanStack Form is headless, meaning it doesn't provide UI components. It provides the logic and state management, leaving the UI to you. It is designed for maximum type safety and zero-dependency core logic.

## Basic Usage

### useForm & form.Field

```tsx
import { useForm } from '@tanstack/react-form'

export function SimpleForm() {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <div>
        <form.Field
          name="firstName"
          children={(field) => (
            <>
              <label htmlFor={field.name}>First Name:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors ? (
                <em>{field.state.meta.errors.join(', ')}</em>
              ) : null}
            </>
          )}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
```

## Validation & Schemas

### Native Schema Support (Standard Schema)

As of late 2024, TanStack Form supports Standard Schema (Zod, Valibot) natively without needing separate adapters.

```tsx
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'

const userSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
})

export function ValidatedForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      age: 0,
    },
    validators: {
      onChange: userSchema, // Form-level validation
    },
    onSubmit: ({ value }) => console.log(value),
  })

  return (
    <form.Field
      name="email"
      validators={{
        onChange: z.string().email('Invalid email'), // Field-level validation
      }}
      children={(field) => (
        <input 
          value={field.state.value} 
          onChange={(e) => field.handleChange(e.target.value)} 
        />
      )}
    />
  )
}
```

## Advanced Patterns

### Form Composition with createFormHook

For production apps, use `createFormHook` to define shared components and reduce boilerplate.

```tsx
import { createFormHook } from '@tanstack/react-form'

// 1. Define shared field components
const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField: ({ field, label }) => (
      <div>
        <label>{label}</label>
        <input
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      </div>
    ),
  },
})

// 2. Use the hook in your component
function MyForm() {
  const form = useAppForm({
    defaultValues: { title: '' }
  })

  return (
    <form.TextField name="title" label="Post Title" />
  )
}
```

### Field Arrays

```tsx
<form.Field
  name="friends"
  mode="array"
  children={(field) => (
    <div>
      {field.state.value.map((_, i) => (
        <form.Field
          key={i}
          name={`friends[${i}]`}
          children={(subField) => (
            <input
              value={subField.state.value}
              onChange={(e) => subField.handleChange(e.target.value)}
            />
          )}
        />
      ))}
      <button type="button" onClick={() => field.pushValue('')}>
        Add Friend
      </button>
    </div>
  )}
/>
```

## Best Practices

- ✅ **Do:** Use `createFormHook` for consistent UI and reduced boilerplate across your app.
- ✅ **Do:** Leverage `Standard Schema` (Zod/Valibot) for type-safe validation.
- ✅ **Do:** Use `onBlur` or `onChange` validation strategically to balance UX and performance.
- ✅ **Do:** Use `form.Subscribe` for fine-grained reactivity to specific form state (like `isSubmitting` or `canSubmit`).
- ❌ **Don't:** Re-render the whole form for every keystroke. TanStack Form is designed to minimize re-renders by tracking state at the field level.
- ❌ **Don't:** Forget to call `e.preventDefault()` and `e.stopPropagation()` in your form's `onSubmit` handler.

## Troubleshooting

**Problem:** Errors aren't showing up on first load.
**Solution:** Check `field.state.meta.isTouched`. Most UX patterns wait for a field to be touched before showing errors.

**Problem:** Zod validation isn't working.
**Solution:** Ensure you are using a version of TanStack Form that supports Standard Schema (v0.30+) or use the legacy `@tanstack/zod-form-adapter`.
