# Bank Maskan Wallet

A premium, mobile-first digital banking wallet MVP for Bank Maskan — built with Next.js 16 (App Router), TypeScript, Tailwind CSS, and MUI, following a feature-based **MVVM** architecture with full RTL / Persian (Vazirmatn) support.

## Getting started

This project was generated without network access, so dependencies have not been installed or the build verified. To run it:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` — it redirects to `/login`.

> The OTP screen accepts **any 6-digit code** as valid, except `000000`, which is wired to simulate the "invalid code" error state for demo purposes.

## Visual language

The first pass was functionally complete but visually generic, so the UI was rebuilt around one distinctive idea: **Bank Maskan is Iran's housing bank**, so the app leans into an architectural motif — a fine-line, eight-pointed *girih* (Persian geometric tilework) pattern etched into gradient surfaces (`src/shared/components/GirihPattern.tsx`), instead of a generic flat-orange fintech look. Around that signature:

- **Motion with intent**: a metallic light-sweep across the bank card on load, a sliding pill indicator in the bottom nav, staggered card entrances (`.stagger` in `globals.css`), an animated radial gauge for loan usage, a count-up wallet balance, and a checkmark-and-confetti burst on OTP success (`SuccessBurst.tsx`) — all respecting `prefers-reduced-motion`.
- **Hero moments**: the login screen opens with a full-bleed sunset-gradient banner (girih-textured) with a floating form panel beneath it, rather than a plain centered form.
- **A warmer palette**: the orange brand scale is paired with a gold accent (`gold-500 #FFB300`) for celebratory/positive moments, and an ambient warm glow drifts behind every screen (`.ambient-glow`).

## Changelog (latest revision)

- **Fixed**: bottom nav no longer uses `position: fixed` — it's now `sticky` inside a normal-flow wrapper in `(main)/layout.tsx`, so it can no longer escape the app's own column width in narrower preview frames.
- **Redesigned home page**: the bank card now flips in 3D (`BankCard.tsx`) — the sunset "day" front holds the everyday card details, and rotating it reveals a midnight "night" back with the account number + Sheba and copy actions, replacing the old bottom sheet and quick-actions row.
- **Removed from the home page**: copy-card / copy-Sheba / refresh-card buttons, and the last-login / card-status info cards — per feedback, these no longer belong on this screen.
- **Added**: a single eye toggle next to the wallet balance (`BalanceSection.tsx`) that blurs both the balance figure and the transactions list beneath it — separate from the CVV2 show/hide toggle on the card itself, which is untouched.



- Next.js 16 (App Router) + TypeScript (strict mode)
- Tailwind CSS v3 (design tokens: brand/orange palette, surface, ink)
- Material UI v7 (RTL via Emotion cache + `stylis-plugin-rtl`)
- React Hook Form + Zod (form state & validation)
- Axios (API layer, currently fully mocked)
- Vazirmatn font via `next/font/google`, `dir="rtl"` end to end

## Architecture

```
src/
  app/                       # Routes only — thin wrappers around feature views
    login/, otp/             # Public auth routes
    (main)/home|loans|profile/  # Authenticated tabs, wrapped in shared bottom nav
  features/
    auth/  home/  loans/  profile/
      model/                 # Types, Zod schemas — no React
      viewmodel/             # Hooks: state, effects, calls into lib/api — no JSX
      view/                  # Presentational components — call the viewmodel, render only
  lib/api/
    axiosClient.ts           # Single Axios instance, interceptor stubs for auth token
    types.ts                 # Request/response interfaces shared by all services
    services/                # login(), verifyOtp(), getHomeData(), getCardDetails(),
                              # getTransactions(), getLoanSummary(), getProfile()
  shared/
    components/               # BottomNav, ToastProvider, PullToRefresh, Skeletons, Empty/ErrorState
    hooks/                     # useCountdown (OTP timer)
    utils/                     # Toman/card/Sheba formatting, Persian digit conversion
    constants/routes.ts
  theme/                      # MUI theme + RTL ThemeRegistry
```

Each feature strictly separates **Model** (types/schemas) → **ViewModel** (hooks owning state & side effects) → **View** (dumb components). Views never call `lib/api` directly — only ViewModels do.

## Connecting a real backend

Every method in `src/lib/api/services/*.ts` is mocked and commented with a `TODO(backend)` block showing the exact Axios call to uncomment once the real endpoint exists — for example:

```ts
// TODO(backend): replace with real call once the endpoint is available.
// const { data } = await axiosClient.get<ApiResponse<HomeDataResponse>>("/home");
// return data;
```

Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local` (see `.env.example`) once a real API is available. The token interceptor in `axiosClient.ts` already reads a session token from `localStorage` (`bm_token`) and attaches it as a Bearer token — swap this for your real session/storage strategy as needed.

## Screens implemented (per spec)

- **Auth**: mobile login with validation, OTP verification (6-digit auto-focus input, 2-minute countdown, resend, change-number, invalid/success states)
- **Home**: premium gradient bank card (show/hide CVV2), card details bottom sheet with copy-to-clipboard + toasts, quick info cards (balance / last login / card status), quick actions (details, copy card, copy Sheba, refresh), last 5 transactions (disabled "view all")
- **Loans**: total / used / remaining amount cards, progress bar with usage %, status chip, next installment card
- **Profile**: read-only full name / national ID / mobile / customer ID, app version, logout with confirmation dialog

## UX states

Skeleton loading, empty states, error states with retry, pull-to-refresh (touch-based, no dependency), toast notifications, and smooth page-level fade/slide transitions are implemented throughout.

## Known follow-ups

- `npm install` / `npm run build` have not been run in this environment (no network access) — please verify locally and address any straggling type errors.
- The bottom sheet drawer (`CardDetailsSheet`) and dialogs use MUI's default transitions; swap for custom motion if you want more brand-specific micro-interactions.
- Real authentication/session guarding (e.g. middleware redirecting unauthenticated users away from `(main)` routes) is not implemented — only client-side token storage exists, ready to be wired to a real auth flow.
