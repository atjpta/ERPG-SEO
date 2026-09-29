# Landing Page Base

Base template cho landing page chuẩn SEO. Dùng Nuxt 4 với **static generation** (`nuxt generate`) — không phải SPA, không phải SSR server. Mỗi route được prerender ra HTML đầy đủ lúc build, deploy như file tĩnh (GitHub Pages / Vercel / Netlify / Cloudflare Pages...).

## Stack

- Nuxt 4 + Vue 3 + TypeScript
- Static generation (`nitro.preset: 'static'`)
- TailwindCSS v4 + DaisyUI v5
- `@nuxtjs/i18n` (locales trong `i18n/locales/`)
- `@nuxtjs/seo` (sitemap, robots.txt, JSON-LD — cấu hình qua `site` trong `nuxt.config.ts`)
- `@tanstack/vue-form` + Zod (form validation)
- `@vueuse/core` / `@vueuse/nuxt`
- `@vueuse/motion` (scroll-reveal animation trên các section/card, xem mục **Animation** phía dưới)
- Package manager: **yarn** (không dùng npm)

## Commit message

Theo [Conventional Commits](https://www.conventionalcommits.org/): `type(scope?): subject` — ví dụ `feat(hero): add secondary cta`, `fix(contact): correct email validator message`.

Type hợp lệ: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`. Được enforce tự động qua Husky `commit-msg` hook (commitlint).

---

## Nguyên tắc "static, không phải SPA"

Toàn bộ nội dung render **lúc build**, không phải lúc request. Điều này nghĩa là:

- Không fetch data trong `onMounted` cho nội dung cần crawler đọc được (copy, heading, meta description...) — viết trực tiếp qua i18n keys hoặc props tĩnh, để nó nằm trong HTML được prerender.
- Chỉ dùng client-side fetch cho data thật sự không biết được lúc build (giá real-time, số lượng còn hàng...). Phần đó sẽ không có trong HTML crawler thấy — chấp nhận trade-off này khi quyết định đặt gì vào client-only.
- Thêm route mới trong `pages/` sẽ tự được `nuxt generate` crawl và prerender, miễn là có link nội bộ trỏ tới nó (hoặc khai báo trong `nitro.prerender.routes`).

## Cấu trúc thư mục

### Sections (landing page building blocks)

Mỗi section là 1 file trong `components/landing/`, tên kebab-case, nội dung đọc từ i18n:

```
components/landing/
├── app-header.vue          ← <LandingAppHeader>
├── app-footer.vue          ← <LandingAppFooter>
├── theme-switcher.vue       ← <LandingThemeSwitcher>
├── locale-switcher.vue      ← <LandingLocaleSwitcher>
├── hero-section.vue         ← <LandingHeroSection>
├── features-section.vue     ← <LandingFeaturesSection>
├── testimonials-section.vue
├── pricing-section.vue
├── faq-section.vue
├── cta-section.vue
└── contact-section.vue
```

> Auto-import theo path: `components/landing/<name>.vue` → `<Landing<PascalName>>`. Không cần import thủ công.

Trang landing page ghép các section lại trong `pages/index.vue` — thêm/xóa/đổi thứ tự section là sửa 1 file duy nhất, không đụng vào logic bên trong section.

Landing page mới (ví dụ campaign riêng): tạo `pages/<slug>/index.vue`, ghép lại từ các section có sẵn hoặc thêm section mới nếu cần.

### UI primitives

`components/ui/` — resolve theo **tên file**, không theo path (config `pathPrefix: false` trong `nuxt.config.ts`), nên `v-button.vue` → `<VButton>`, không phải `<UiVButton>`.

```
components/ui/
└── btn/
    └── v-button.vue    ← <VButton>
```

> Chỉ tạo component khi cần reuse. Input đơn giản dùng thẳng `<input>` native + DaisyUI class.

#### Quy tắc viết UI component

**Đặt tên:** prefix `v-` (v-button, v-modal...) để phân biệt với HTML native và DaisyUI class.

**Props và native attrs:**

- Dùng `defineOptions({ inheritAttrs: false })` + `useAttrs()` để tự spread attrs vào đúng element.
- **Không** dùng `extends HTMLAttributes` — tạo union type quá phức tạp, gây lỗi TS2590. Khai báo **explicit** native attrs hay dùng ngay trong `interface Props`.
- Không khai báo `class` trong Props — để tự đi qua `attrs`.
- Không định nghĩa `variant`, `size` làm prop — truyền thẳng qua `class`:

  ```vue
  <!-- đúng -->
  <VButton class="btn-primary btn-sm">Lưu</VButton>

  <!-- sai -->
  <VButton variant="primary" size="sm">Lưu</VButton>
  ```

**Loading / disabled:** khi `loading`, dùng `invisible` thay `v-if` để giữ kích thước; spinner `absolute inset-0` đè giữa; luôn `:disabled="(attrs.disabled as boolean) || loading"`.

**Icon:** prop `icon` nhận cả `Component` (lucide) lẫn `string` (URL ảnh) — render `<img>` nếu là string, ngược lại `<component :is="icon">`. Icon library: `@lucide/vue`.

### Layout

`layouts/default.vue` — header + `<slot>` + footer. Landing page hầu như chỉ cần 1 layout; nếu có trang khác biệt (ví dụ trang cảm ơn sau submit form), tạo `layouts/<name>.vue` và set `definePageMeta({ layout: '<name>' })` trong page.

---

## i18n

Keys tổ chức theo namespace, mỗi section 1 namespace (`hero`, `features`, `pricing`...):

```json
{
  "hero": { "title": "...", "subtitle": "..." },
  "features": { "items": { "seo": { "title": "...", "description": "..." } } }
}
```

- Thêm key vào **cả hai** file `i18n/locales/en.json` và `vi.json` cùng lúc.
- String đơn giản: `t('namespace.key')`.
- Array/object phức tạp (testimonials, pricing plans, FAQ items): dùng `tm('namespace.items')` để lấy raw message nodes, `rt(node)` để resolve từng node ra string. Xem `testimonials-section.vue` / `pricing-section.vue` làm ví dụ.
- Không hardcode chuỗi trong template.
- `strategy: 'prefix_except_default'` — locale mặc định (`en`) không có prefix (`/`), locale khác có prefix (`/vi/...`). Đổi route nội bộ dùng `useLocalePath()`, không dùng `NuxtLink to="/..."` trực tiếp nếu cần giữ locale hiện tại.

---

## SEO

- Mỗi page set `useSeoMeta()` trong `<script setup>` — tối thiểu `title`, `description`, `ogTitle`, `ogDescription`, `ogImage`. Đọc nội dung từ i18n (`seo.title`, `seo.description` namespace), không hardcode.
- `app.vue` gọi `useLocaleHead()` để set `<html lang>` + `<link rel="alternate" hreflang="...">` tự động theo locale hiện có — không sửa tay.
- `nuxt.config.ts` → `site` config (`url`, `name`) là nguồn cho `@nuxtjs/seo` sinh `sitemap.xml`, `robots.txt`, JSON-LD schema.org. **Bắt buộc** set `NUXT_PUBLIC_SITE_URL` thật trước khi deploy — sai URL này thì sitemap/canonical/OG image đều sai.
- `ogImage` module bị tắt (`enabled: false`) vì cần sharp/playwright — nặng cho 1 base template. Dùng `public/og-image.png` (1200x630) tĩnh, set qua `ogImage: '/og-image.png'` trong `useSeoMeta`. Nếu cần OG image render động theo nội dung, bật lại module này ở `nuxt.config.ts`.
- `public/favicon.svg` là placeholder generic — thay bằng logo thật của brand khi dùng template này cho 1 project cụ thể. `public/og-image.png` chưa có sẵn (cần ảnh nhị phân, không tạo được ở đây) — thêm file 1200x630 trước khi deploy thật.

---

## Error page / Loading indicator

- `error.vue` ở root (cùng cấp `app.vue`) — Nuxt tự dùng làm trang lỗi cho mọi `statusCode` (404, 500...). Set `robots: 'noindex'` vì trang lỗi không nên bị index. Nút "về trang chủ" gọi `clearError({ redirect: localePath('/') })`, **không** dùng `NuxtLink`/`router.push` thường vì phải clear Nuxt error state trước khi điều hướng đi, không thì lỗi vẫn còn treo.
- Thêm text lỗi mới: thêm namespace `error.<code>.title` / `error.<code>.message` vào cả `en.json`/`vi.json`, rồi dùng `key` computed theo `error.statusCode` trong `error.vue` — không hardcode message theo statusCode cụ thể trong template.
- `<NuxtLoadingIndicator>` trong `app.vue` — thanh loading tự động khi chuyển route (bao gồm cả khi tải chunk JS của page mới). Không cần code thủ công, tự ẩn khi route load xong. Màu lấy theo theme qua CSS var `--color-primary` (DaisyUI v5 + Tailwind v4) nên tự đổi theo theme sáng/tối.

---

## Form Validation

Dùng **@tanstack/vue-form** + **Zod**. Không dùng adapter — validate thủ công qua `safeParse`.

`composables/useZodForm.ts` — export `useZodForm()` trả về `fieldValidator(schema)`, nhận Zod schema cho 1 field, trả validator function cho TanStack Form. Error code map sang i18n key `validation.*`. Xem `contact-section.vue` làm ví dụ đầy đủ.

Để thêm rule mới: thêm case vào `issueToI18nKey()` trong `useZodForm.ts` và thêm key vào cả `en.json`/`vi.json`.

Submit handler trong `contact-section.vue` chỉ log ra console + hiện toast — nối vào backend thật hoặc form service (Formspree, Resend...) khi triển khai thật.

---

## Design system — "Gradient hiện đại"

Hướng thiết kế: nền trắng/tối sạch, 1 gradient 3-stop (primary → secondary → accent = indigo → hồng → xanh) làm điểm nhấn, không phải màu nền tràn lan.

- **Màu**: dùng nguyên bảng màu gốc của DaisyUI (`primary` = indigo, `secondary` = hồng) — chỉ override `--color-accent` thành xanh trong `assets/css/main.css` (2 block `@plugin 'daisyui/theme' { name: 'light'/'dark'; ... }`) để 3 màu tạo thành gradient đẹp. **Không** đổi `primary`/`secondary` gốc trừ khi đổi cả gradient.
- **Gradient dùng ở đâu**: CTA chính (nút, badge "Most popular", CTA section, avatar tròn testimonials) — dùng tổ hợp class `from-primary via-secondary to-accent bg-linear-to-r` (hoặc `-to-br`). **Không** dùng `bg-gradient-to-r` (tên cũ Tailwind v3) — Tailwind v4 đổi thành `bg-linear-to-r`.
- **`.text-gradient`** (định nghĩa trong `main.css`) — gradient text, dùng cho badge/eyebrow nhỏ, không dùng cho heading chính (heading chính giữ màu solid `base-content` để dễ đọc).
- **`.bg-gradient-brand`** — 3 blob gradient mờ (`blur(80px)`, `opacity: 0.25`) làm nền trang trí phía sau hero, đặt trong `<div aria-hidden="true">` tuyệt đối `-z-10`, section cha phải có `relative overflow-hidden`.
- **Card**: không dùng `shadow-sm` nữa — dùng `border border-base-300` (flat, tối giản) + `hover:border-primary/40 transition-colors` nếu muốn hover feedback. Card nổi bật (ví dụ pricing "Pro") dùng `border-primary border-2` thay vì shadow.
- **Nút CTA chính**: `rounded-full` (pill) + gradient nền, tương phản `text-primary-content`. Nút phụ/outline giữ `btn-ghost`/`btn-outline` như DaisyUI mặc định.
- **Icon feature**: bọc trong ô vuông bo góc (`rounded-xl`) nền gradient `from-primary via-secondary to-accent`, icon màu `text-primary-content` — không để icon trần trên nền trong suốt.
- **Font**: 2 font qua Google Fonts, load bằng `<link>` trong `nuxt.config.ts` (`app.head.link`) — **không** dùng CSS `@import url(...)` vì Lightning CSS sẽ warn "@import phải đứng trước rule khác" (do `@import 'tailwindcss'` tự expand ra rule trước nó) và có thể bị browser bỏ qua.
  - `--font-sans: 'Inter', ...` — áp cho `body` (nội dung, form, nav).
  - `--font-display: 'Sora', ...` — áp global cho `h1, h2, h3` trong `main.css`, **không** cần thêm class `font-display` vào từng heading trong section. Chỉ dùng class `font-display` thủ công cho chỗ không phải `<h1-3>` nhưng muốn font display (ví dụ brand text trong header/footer).
- **Radius**: `--radius-box`/`--radius-field` tăng lên `1.25rem`/`0.75rem` (bo tròn hơn mặc định DaisyUI) cho cảm giác hiện đại — override trong cùng 2 block theme ở trên.

---

## Theming

DaisyUI theme list khai báo tại `assets/css/main.css` (`@plugin 'daisyui' { themes: ... }`). `plugins/theme.client.ts`:

1. **Lần đầu visitor vào site** (chưa có `theme` trong `localStorage`): detect `prefers-color-scheme` của OS, set `data-theme` + lưu vào `localStorage` luôn — không dựa vào CSS `--prefersdark` fallback vì checkbox toggle không tự sync theo system preference.
2. **Từ lần thứ 2 trở đi**: có giá trị trong `localStorage` rồi → bỏ qua bước detect, để `theme-change` tự đọc lại. Từ đây theme chỉ đổi khi visitor bật/tắt toggle (`<input data-toggle-theme="light,dark">`, xem `theme-switcher.vue`), tự lưu `localStorage`, không cần code thủ công.

Chỉ 2 theme (`light`/`dark`) vì UI là toggle nhị phân — thêm theme thứ 3 vào `assets/css/main.css` thì phải đổi `theme-switcher.vue` sang `<select data-choose-theme>` (nhiều lựa chọn) thay vì checkbox.

> Vì là static site, không biết theme của visitor lúc render HTML — sẽ có flash nhẹ về theme default trước khi client hydrate xong (chạy `seedInitialTheme()` + `themeChange()`). Đây là trade-off đã biết, không phải bug.

---

## Animation

Scroll-reveal dùng `@vueuse/motion` (`nuxt.config.ts` → module `@vueuse/motion/nuxt`, đăng ký global qua `MotionPlugin`, không cần import thủ công).

- **Section đơn** (hero, CTA — không phải grid): `v-motion-fade-visible` trên root `<section>`.
- **Section có grid** (features, pricing, testimonials, FAQ, contact): animate **từng item trong grid**, không animate cả block — dùng custom `v-motion` với stagger theo `index`:

  ```vue
  <div
    v-for="(item, index) in items"
    :key="item.id"
    v-motion
    :initial="{ opacity: 0, y: 24 }"
    :visible="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
  >
  ```

- Preset directive theo tên camelCase chuyển kebab-case: `slideVisibleBottom` → `v-motion-slide-visible-bottom`. **Không** dùng suffix `-once` — mặc định muốn animation lặp lại mỗi lần section/card cuộn ra rồi cuộn lại vào viewport (không chỉ chạy 1 lần đầu). Nếu 1 section cụ thể cần chỉ chạy 1 lần (ví dụ animation nặng, tốn CPU khi lặp), mới thêm `-once`/`:visible-once` riêng cho section đó.
- Header ẩn/hiện theo hướng cuộn dùng `useScroll()` (VueUse core, không phải `@vueuse/motion`) + CSS `transition-transform` thuần — xem `app-header.vue`.

> **Trade-off đã biết:** `v-motion` set `opacity:0` làm inline style ngay trong HTML tĩnh (prerender) — nội dung text vẫn còn trong DOM (search engine vẫn đọc được, screen reader vẫn đọc được vì khác `visibility:hidden`), nhưng visitor tắt JS sẽ không thấy nội dung hiện ra vì animation không bao giờ trigger. `app.vue` có 1 `<noscript>` CSS rule ép `opacity:1` cho trường hợp này — không xoá khi thêm section mới có animation.

---

## Quy tắc chung

**Event handler gọi nhiều hàm:** Nếu event handler cần ≥ 2 statements, **bắt buộc** tạo wrapper function trong `<script setup>`, không viết inline arrow function hay chuỗi statement ngăn `;` trong template.

**Icon library:** `@lucide/vue`, import named export (`import { Search } from '@lucide/vue'`).

**Auto-import:** Nuxt tự auto-import components (`components/`), composables (`composables/`), và các API như `useI18n`, `useSeoMeta`, `useLocalePath`, `computed`, `ref`... Không cần `import` thủ công cho những cái này — chỉ import package ngoài (`zod`, `@tanstack/vue-form`, `vue-sonner`, `@lucide/vue`).
