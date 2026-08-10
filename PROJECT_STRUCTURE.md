# Project Structure

To be finalized once stack is confirmed in the Claude Code session. Draft target below assuming a component-based build (adjust if plain HTML/CSS/JS).

```
hart-template/
  src/
    components/
      Hero.*
      CraftsmanshipSection.*
      ImageGallery.*
      Footer.*
      QuoteCalculator.*
      ServiceAreaMap.*
    pages/
      Home.*
      About.*
      Projects.*
      QuoteBooking.*
    styles/
      (global styles, tokens, per-component styles)
    utils/
      (quote calculation logic, form validation, etc.)
  public/
    images/
  docs/
    PROJECT_INSTRUCTIONS.md
    REFACTOR_CHECKLIST.md
    SUPABASE_PREP.md
    PROJECT_STRUCTURE.md
  README.md
  .gitignore
```

Update this file once the refactor settles on the real structure. This is a starting point, not a locked spec.
