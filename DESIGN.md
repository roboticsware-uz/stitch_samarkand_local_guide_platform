---
name: Registan Heritage
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#3e4944'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#6e7a73'
  outline-variant: '#bdcac2'
  surface-tint: '#006c51'
  primary: '#006b50'
  on-primary: '#ffffff'
  primary-container: '#008766'
  on-primary-container: '#ffffff'
  inverse-primary: '#71dab3'
  secondary: '#455f8a'
  on-secondary: '#ffffff'
  secondary-container: '#b2cdfe'
  on-secondary-container: '#3c5781'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cca830'
  on-tertiary-container: '#4f3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#8ef6ce'
  primary-fixed-dim: '#71dab3'
  on-primary-fixed: '#002116'
  on-primary-fixed-variant: '#00513c'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#adc7f8'
  on-secondary-fixed: '#001b3d'
  on-secondary-fixed-variant: '#2c4771'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The brand identity centers on the concept of "Timeless Modernity," bridging the ancient architectural grandeur of Samarkand with the high-end expectations of 21st-century luxury travelers. The UI evokes an emotional response of awe, prestige, and meticulous hospitality.

The design style is **Minimalist-Luxury**. It utilizes expansive white space to let high-resolution photography of turquoise domes and intricate tilework breathe. To distinguish the visual language, we integrate **Subtle Girih Textures**—low-opacity Islamic geometric patterns—as background overlays or container accents, ensuring the cultural heritage is felt rather than forced. The aesthetic is clean, professional, and sophisticated, avoiding clutter to maintain a premium "concierge" feel.

## Colors

The palette is derived from the "Royal Uzbek" spectrum, balancing historic vibrancy with corporate stability.

- **Emerald Green (#008766):** Used for primary actions and highlighting growth or discovery. It mirrors the iconic glazed tiles of the Registan.
- **Deep Navy Blue (#00234B):** The foundational "anchor" color. Used for headings, navigation backgrounds, and deep footers to convey authority and trust.
- **Gold (#D4AF37):** Used sparingly as a "metal" accent for buttons, iconography, and decorative borders to signify luxury and premium service.
- **Silk White (#F9F7F2):** A warm, off-white neutral used for backgrounds to reduce eye strain and provide a more organic feel than pure white.

## Typography

This design system uses a high-contrast typographic pairing to signal both heritage and usability.

- **Headlines:** *Libre Caslon Text* provides a literary, historical weight. Its sharp serifs and classical proportions reflect the scholarly history of Samarkand.
- **Body & UI:** *Plus Jakarta Sans* offers a soft, modern contrast. Its high legibility and friendly curves ensure that booking flows and itinerary details feel effortless and contemporary.
- **Styling Note:** Use `label-caps` for small subtitles above main headlines, colored in Gold, to establish a sophisticated content hierarchy.

## Elevation & Depth

To maintain a "Clean Luxury" aesthetic, this design system avoids heavy drop shadows. Depth is instead achieved through:

- **Tonal Layering:** Using the Neutral Silk White as a base and layering Emerald or Navy containers on top with crisp, 1px Gold or low-opacity Navy borders.
- **Micro-Shadows:** Only used on primary interactive cards—a very subtle, highly diffused shadow (Blur: 30px, Opacity: 4%, Color: Navy) to give the appearance of elements resting lightly on a surface.
- **Girih Watermarks:** Layering geometric patterns at 3-5% opacity behind content to create "visual depth" without physical elevation.

## Shapes

The shape language is **Soft and Architectural**. 

We utilize a 0.25rem (4px) base radius for standard components to maintain a sense of precision and structure, reflecting the stonework of Silk Road monuments. For "Organic" elements like image containers or call-to-action blocks, a larger `rounded-lg` (8px) is permitted, but full "pill" shapes are avoided to keep the design feeling grounded and mature.

## Components

- **Sophisticated Buttons:** Primary buttons feature a Navy background with a 1px Gold internal border and Gold text. On hover, the background transitions to Emerald Green. The "Ghost" variant uses a Gold outline with serif typography.
- **High-Contrast Cards:** Tour cards use a Silk White background with a 1px Navy border at 10% opacity. The header of the card features a full-bleed image with a Gold accent line separating the image from the content.
- **Step Indicators:** Horizontal lines using Gold for the active path and Navy (20% opacity) for the remaining steps. Each step is marked by a small Girih-inspired geometric icon rather than a simple circle.
- **Input Fields:** Minimalist design with only a bottom-border in Navy. Upon focus, the border turns Gold and a subtle Girih pattern appears as a faint watermark within the field.
- **Interactive Chips:** Used for tour categories (e.g., "History," "Culinary"). Emerald Green text on a very light Emerald tint background, with 4px rounded corners.