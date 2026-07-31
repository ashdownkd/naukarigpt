{
  "project": {
    "name": "NaukariGPT.com",
    "type": "headless CMS-driven job/education portal",
    "design_personality": [
      "premium",
      "trustworthy",
      "fast-scannable",
      "black-dominant",
      "electric-blue accents",
      "Bloomberg-meets-modern-job-board"
    ],
    "primary_user_actions": [
      "scan latest notifications quickly",
      "filter and open job/admitcard/result posts",
      "tap Apply Now",
      "subscribe to Telegram/WhatsApp",
      "share posts",
      "ask chatbot and click suggested answers"
    ]
  },

  "brand_attributes": {
    "tone": "authoritative + helpful (not playful)",
    "visual_metaphor": "night-mode terminal + newsroom ticker + fintech cards",
    "content_density": "medium-high (but with strong spacing + sectioning)",
    "anti_goals": [
      "no cluttered sarkari-result table wall",
      "no childish gradients",
      "no centered-page reading flow",
      "no purple"
    ]
  },

  "design_tokens": {
    "css_custom_properties": {
      "notes": "Implement in /src/index.css under :root and .dark. Use HSL tokens compatible with shadcn. Default app should run in dark mode by applying className=\"dark\" on <html> or <body>.",
      "colors": {
        "--background": "225 25% 5%",
        "--foreground": "210 20% 98%",

        "--card": "225 22% 7%",
        "--card-foreground": "210 20% 98%",

        "--popover": "225 22% 7%",
        "--popover-foreground": "210 20% 98%",

        "--primary": "217 91% 60%",
        "--primary-foreground": "225 25% 6%",

        "--secondary": "225 18% 12%",
        "--secondary-foreground": "210 20% 98%",

        "--muted": "225 16% 10%",
        "--muted-foreground": "215 14% 70%",

        "--accent": "217 85% 55%",
        "--accent-foreground": "225 25% 6%",

        "--destructive": "0 72% 52%",
        "--destructive-foreground": "210 20% 98%",

        "--border": "225 16% 16%",
        "--input": "225 16% 16%",
        "--ring": "217 91% 60%",

        "--surface-1": "225 22% 7%",
        "--surface-2": "225 18% 10%",
        "--surface-3": "225 16% 12%",

        "--blue-glow": "217 100% 70%",
        "--cyan-glow": "195 100% 65%",

        "--success": "152 60% 45%",
        "--warning": "38 92% 55%",
        "--info": "205 90% 55%"
      },
      "radius": {
        "--radius": "0.9rem",
        "--radius-sm": "0.65rem",
        "--radius-lg": "1.1rem"
      },
      "shadows": {
        "--shadow-elev-1": "0 1px 0 hsl(0 0% 100% / 0.04), 0 10px 30px hsl(225 40% 2% / 0.55)",
        "--shadow-elev-2": "0 1px 0 hsl(0 0% 100% / 0.06), 0 18px 60px hsl(225 40% 2% / 0.65)",
        "--shadow-glow-blue": "0 0 0 1px hsl(217 91% 60% / 0.25), 0 0 28px hsl(217 91% 60% / 0.18)"
      },
      "spacing": {
        "--container-max": "72rem",
        "--gutter": "1rem",
        "--section-y": "3.5rem",
        "--section-y-lg": "5rem"
      },
      "typography": {
        "--font-sans": "\"Space Grotesk\", ui-sans-serif, system-ui",
        "--font-body": "\"Inter\", ui-sans-serif, system-ui",
        "--font-mono": "\"IBM Plex Mono\", ui-monospace, SFMono-Regular"
      }
    },

    "tailwind_extensions": {
      "notes": "If Tailwind config is editable, map tokens to theme.extend.colors via CSS variables. Otherwise rely on shadcn token usage + utility classes.",
      "recommended_utilities": {
        "page_bg": "bg-background text-foreground",
        "card_base": "bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/70 border border-border/70 shadow-[var(--shadow-elev-1)]",
        "card_hover": "hover:shadow-[var(--shadow-elev-2)] hover:border-border/90",
        "glow_ring": "focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-0",
        "blue_glow_hover": "hover:shadow-[var(--shadow-glow-blue)]"
      }
    }
  },

  "typography": {
    "font_pairing": {
      "headings": "Space Grotesk (600–700)",
      "body": "Inter (400–600)",
      "mono": "IBM Plex Mono (for meta, IDs, dates)"
    },
    "google_fonts_import": {
      "notes": "Use Next.js next/font/google in app router OR add @import in CSS for CRA-like. Prefer next/font for performance.",
      "families": [
        "Space Grotesk",
        "Inter",
        "IBM Plex Mono"
      ]
    },
    "type_scale_tailwind": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
      "h2": "text-base md:text-lg font-medium text-muted-foreground",
      "h3_section": "text-xl sm:text-2xl font-semibold tracking-tight",
      "body": "text-sm sm:text-base leading-relaxed",
      "small": "text-xs text-muted-foreground",
      "meta_mono": "font-mono text-xs tracking-tight text-muted-foreground"
    },
    "content_readability": {
      "max_width": "prose prose-invert max-w-none",
      "line_length": "Prefer 60–80ch for long reading blocks; use sidebars on desktop.",
      "emphasis": "Use badges + callouts instead of bolding entire paragraphs."
    }
  },

  "color_palette": {
    "base": {
      "bg_0": "#0A0A0F",
      "bg_1": "#0F111A",
      "surface": "#121526",
      "border": "#23263A",
      "text": "#F3F6FF",
      "muted_text": "#AAB2C8"
    },
    "accents": {
      "primary_blue": "#3B82F6",
      "deep_blue": "#2563EB",
      "cyan_hint": "#22D3EE"
    },
    "state": {
      "success": "#22C55E",
      "warning": "#F59E0B",
      "danger": "#EF4444",
      "info": "#38BDF8"
    },
    "usage_rules": [
      "Black dominates: backgrounds and nav are near-black; blue is reserved for CTAs, active states, links, and key badges.",
      "Avoid large blue surfaces; keep blue as a highlight to preserve premium feel.",
      "Use cyan only as a subtle glow/secondary highlight (charts, hover rings)."
    ]
  },

  "gradients_and_texture": {
    "gradient_restriction_rule": {
      "prohibited": [
        "blue-500 to purple-600",
        "purple-500 to pink-500",
        "green-500 to blue-500",
        "red to pink"
      ],
      "rules": [
        "NEVER let gradients cover more than 20% of the viewport.",
        "NEVER apply gradients to text-heavy reading areas.",
        "NEVER use gradients on small UI elements (<100px width).",
        "NEVER stack multiple gradient layers in the same viewport."
      ],
      "enforcement": "IF gradient area exceeds 20% of viewport OR impacts readability THEN fallback to solid colors."
    },
    "allowed_gradients": {
      "hero_backdrop": "radial-gradient(900px circle at 20% 10%, rgba(59,130,246,0.22), transparent 55%), radial-gradient(700px circle at 80% 0%, rgba(34,211,238,0.14), transparent 55%)",
      "section_accent_strip": "linear-gradient(90deg, rgba(59,130,246,0.0), rgba(59,130,246,0.18), rgba(34,211,238,0.0))"
    },
    "noise_overlay": {
      "notes": "Use subtle noise/grain overlay to avoid flat black. Apply via pseudo-element on body or main wrapper.",
      "css_snippet": "body::before{content:'';position:fixed;inset:0;pointer-events:none;background-image:url('https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=1200&q=60');opacity:.06;mix-blend-mode:overlay;z-index:0;}"
    }
  },

  "layout_and_grid": {
    "container": {
      "max_width": "max-w-6xl",
      "padding": "px-4 sm:px-6",
      "notes": "Never center-align all text; align left by default. Use centered alignment only for hero headline block on mobile if needed."
    },
    "home_layout": {
      "pattern": "Bento grid + feed",
      "desktop": "12-col grid: left 8 cols (feed), right 4 cols (sidebar tools/trending)",
      "mobile": "single column; sidebar becomes stacked sections",
      "key_sections": [
        "Top nav + search",
        "Hero (value prop + quick category chips)",
        "Category bento tiles (9)",
        "Latest feed (cards)",
        "Trending block (compact list)",
        "Popular tools sidebar",
        "Footer (legal + sitemap links)"
      ]
    },
    "category_page_layout": {
      "header": "Category title + description + filter row",
      "content": "List/grid toggle; default list on mobile, grid on desktop",
      "pagination": "shadcn Pagination component"
    },
    "post_detail_layout": {
      "desktop": "Main content 8 cols + sticky right rail 4 cols (Apply CTA, share, related)",
      "mobile": "Apply CTA becomes sticky bottom bar; share collapses into sheet"
    }
  },

  "components": {
    "component_path": {
      "shadcn_ui": {
        "button": "/app/frontend/src/components/ui/button.jsx",
        "card": "/app/frontend/src/components/ui/card.jsx",
        "badge": "/app/frontend/src/components/ui/badge.jsx",
        "input": "/app/frontend/src/components/ui/input.jsx",
        "textarea": "/app/frontend/src/components/ui/textarea.jsx",
        "tabs": "/app/frontend/src/components/ui/tabs.jsx",
        "table": "/app/frontend/src/components/ui/table.jsx",
        "pagination": "/app/frontend/src/components/ui/pagination.jsx",
        "dialog": "/app/frontend/src/components/ui/dialog.jsx",
        "sheet": "/app/frontend/src/components/ui/sheet.jsx",
        "scroll_area": "/app/frontend/src/components/ui/scroll-area.jsx",
        "separator": "/app/frontend/src/components/ui/separator.jsx",
        "tooltip": "/app/frontend/src/components/ui/tooltip.jsx",
        "sonner_toast": "/app/frontend/src/components/ui/sonner.jsx",
        "form": "/app/frontend/src/components/ui/form.jsx",
        "select": "/app/frontend/src/components/ui/select.jsx",
        "calendar": "/app/frontend/src/components/ui/calendar.jsx",
        "skeleton": "/app/frontend/src/components/ui/skeleton.jsx",
        "breadcrumb": "/app/frontend/src/components/ui/breadcrumb.jsx"
      },
      "recommended_new_components_to_create": [
        "/app/frontend/src/components/site/TopNav.jsx",
        "/app/frontend/src/components/site/CategoryBento.jsx",
        "/app/frontend/src/components/site/PostCard.jsx",
        "/app/frontend/src/components/site/TrendingList.jsx",
        "/app/frontend/src/components/site/SubscribeModal.jsx",
        "/app/frontend/src/components/site/ChatWidget.jsx",
        "/app/frontend/src/components/site/SocialShareBar.jsx",
        "/app/frontend/src/components/site/ApplyCTA.jsx",
        "/app/frontend/src/components/site/StickyMobileApplyBar.jsx",
        "/app/frontend/src/components/site/SEOJsonLd.js"
      ]
    },

    "component_specs": {
      "top_nav": {
        "structure": [
          "Left: logo wordmark (NaukariGPT) + small tagline",
          "Center (desktop): search input with Command palette behavior",
          "Right: category dropdown + theme toggle (optional) + Telegram icon"
        ],
        "shadcn": ["navigation-menu", "input", "command", "sheet"],
        "classes": {
          "wrapper": "sticky top-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50",
          "logo": "font-semibold tracking-tight text-foreground",
          "search": "w-full md:w-[420px]"
        },
        "data_testids": {
          "search_input": "topnav-search-input",
          "mobile_menu_button": "topnav-mobile-menu-button",
          "telegram_link": "topnav-telegram-link"
        }
      },

      "category_bento_tiles": {
        "notes": "9 categories as bento tiles with varied sizes. Use subtle icon + count + last updated.",
        "grid": "grid grid-cols-2 md:grid-cols-4 gap-3",
        "tile_variants": {
          "featured": "col-span-2 md:col-span-2 row-span-2",
          "standard": "col-span-1",
          "wide": "col-span-2"
        },
        "tile_style": "rounded-[var(--radius-lg)] border border-border/70 bg-card/70 backdrop-blur shadow-[var(--shadow-elev-1)] hover:border-border hover:shadow-[var(--shadow-elev-2)]",
        "micro_interaction": "On hover: icon nudges +2px, border brightens, subtle blue glow shadow. On tap: scale 0.98.",
        "data_testids": {
          "tile": "category-tile-{slug}"
        }
      },

      "post_card": {
        "variants": ["list", "grid", "compact"],
        "anatomy": [
          "Badge row: category + urgency",
          "Title (2 lines clamp)",
          "Meta: date + source + reading time",
          "Key highlights (optional bullets)",
          "Actions: Apply / Open"
        ],
        "classes": {
          "base": "group rounded-[var(--radius)] border border-border/70 bg-card/70 backdrop-blur shadow-[var(--shadow-elev-1)] p-4",
          "title": "text-base sm:text-lg font-semibold leading-snug line-clamp-2",
          "meta": "mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
          "actions": "mt-4 flex items-center gap-2"
        },
        "cta_button": "Use shadcn Button variant=default for Apply; variant=secondary for Open.",
        "data_testids": {
          "card": "post-card-{postSlug}",
          "apply": "post-card-apply-button-{postSlug}",
          "open": "post-card-open-link-{postSlug}"
        }
      },

      "apply_cta": {
        "desktop": "Right rail card with Apply Now button + important dates mini table",
        "mobile": "Sticky bottom bar with Apply Now + Save",
        "button_style": "Primary button: blue fill, subtle glow on hover; pressed scale 0.98",
        "data_testids": {
          "apply_now": "apply-cta-apply-now-button",
          "apply_link": "apply-cta-apply-link"
        }
      },

      "important_dates_table": {
        "shadcn": ["table"],
        "style": "Use zebra rows with bg-muted/30; keep borders subtle.",
        "data_testids": {
          "table": "important-dates-table"
        }
      },

      "subscribe_modal": {
        "trigger_logic": "After 12s on site. If user clicks Join (Telegram/WhatsApp) set localStorage key 'ngpt_subscribed'=true and never show again. If dismissed, set 'ngpt_subscribe_dismissed'=true for current page only; show again on next route navigation.",
        "shadcn": ["dialog"],
        "visual": "Centered modal, backdrop blur, compact copy, two large join buttons.",
        "classes": {
          "backdrop": "bg-black/60 backdrop-blur-sm",
          "panel": "rounded-[var(--radius-lg)] border border-border/70 bg-card/80 backdrop-blur shadow-[var(--shadow-elev-2)]",
          "title": "text-lg font-semibold",
          "desc": "text-sm text-muted-foreground",
          "buttons_wrap": "mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2"
        },
        "buttons": {
          "telegram": "Button default + left icon (Lucide Send) + href https://t.me/naukarigpt",
          "whatsapp": "Button secondary + left icon (Lucide MessageCircle)"
        },
        "motion": "Framer Motion: fade + scale from 0.98; backdrop fades in.",
        "data_testids": {
          "modal": "subscribe-modal",
          "close": "subscribe-modal-close-button",
          "telegram": "subscribe-modal-telegram-button",
          "whatsapp": "subscribe-modal-whatsapp-button"
        }
      },

      "chat_widget": {
        "behavior": "Floating pill button opens a right-bottom panel. Panel contains search input + suggested FAQs + results list linking to posts.",
        "shadcn": ["sheet", "scroll-area", "input", "button", "badge"],
        "visual": "Not a cartoon bubble. Use squared-rounded panel, subtle border, blue accent header.",
        "classes": {
          "fab": "fixed bottom-4 right-4 z-50 rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-elev-2)] hover:shadow-[var(--shadow-glow-blue)]",
          "panel": "w-[92vw] sm:w-[380px] rounded-[var(--radius-lg)] border border-border/70 bg-card/85 backdrop-blur shadow-[var(--shadow-elev-2)]",
          "header": "flex items-center justify-between border-b border-border/70 px-4 py-3",
          "body": "p-4"
        },
        "data_testids": {
          "open": "chat-widget-open-button",
          "panel": "chat-widget-panel",
          "input": "chat-widget-input",
          "result": "chat-widget-result-{index}"
        }
      },

      "social_share_bar": {
        "placement": "Post detail: sticky in right rail on desktop; in a Sheet on mobile.",
        "icons": "Lucide icons only.",
        "buttons": "Use ghost buttons with tooltip labels.",
        "data_testids": {
          "whatsapp": "share-whatsapp-button",
          "telegram": "share-telegram-button",
          "facebook": "share-facebook-button",
          "twitter": "share-twitter-button",
          "linkedin": "share-linkedin-button",
          "copy": "share-copylink-button"
        }
      },

      "report_bug_form": {
        "shadcn": ["form", "input", "textarea", "button", "select"],
        "fields": ["name", "email", "page_url", "issue_type", "description"],
        "notes": "No backend: use Formspree (free) or Netlify Forms. Provide a fallback mailto link.",
        "data_testids": {
          "form": "report-bug-form",
          "submit": "report-bug-submit-button"
        }
      }
    }
  },

  "motion_and_microinteractions": {
    "library": "Framer Motion",
    "principles": [
      "Use motion to clarify hierarchy (reveal, hover lift), not to entertain.",
      "Prefer opacity + translateY (4–10px) + subtle scale (0.98–1).",
      "Respect prefers-reduced-motion: disable non-essential animations."
    ],
    "recommended_patterns": {
      "page_enter": "initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.35,ease:[0.22,1,0.36,1]}}",
      "card_hover": "whileHover={{y:-2}} transition={{type:'spring',stiffness:260,damping:22}}",
      "button_press": "whileTap={{scale:0.98}}",
      "modal": "AnimatePresence + fade backdrop + scale panel"
    },
    "scroll_behavior": {
      "sticky": "Use sticky right rail for Apply CTA and Share on desktop.",
      "ticker": "Optional: a thin 'Latest' ticker bar under nav using CSS marquee-like animation (slow, pause on hover)."
    }
  },

  "data_display_patterns": {
    "job_listing_scanability": {
      "must_have": [
        "date",
        "organization",
        "location (if available)",
        "last date",
        "apply link"
      ],
      "visual": "Use a compact meta row with mono font for dates; use badges for 'New', 'Last Date Soon'.",
      "empty_states": "Use shadcn Skeleton for loading; empty state card with clear next action (change filter / search)."
    },
    "filters": {
      "components": ["tabs", "select", "calendar"],
      "mobile": "Filters open in Sheet; apply button pinned at bottom.",
      "data_testids": {
        "open_filters": "category-filters-open-button",
        "apply_filters": "category-filters-apply-button"
      }
    }
  },

  "seo_and_metadata": {
    "notes": "Implement with Next.js App Router metadata + route handlers for sitemap/robots. Add JSON-LD per page type.",
    "json_ld": {
      "organization": "Site-wide in root layout",
      "website": "Site-wide in root layout",
      "article": "On post detail pages",
      "jobPosting": "On job posts when fields exist"
    },
    "open_graph": {
      "defaults": "Use dark OG image with blue accent strip; fallback to site name + category.",
      "image_strategy": "If WP provides featured_media, use it; else use a generated OG route (free)."
    },
    "files": {
      "robots_txt": "/robots.txt",
      "sitemap_xml": "/sitemap.xml"
    }
  },

  "accessibility": {
    "requirements": [
      "WCAG AA contrast: muted text must still be readable on near-black.",
      "Visible focus states: ring in blue with sufficient thickness.",
      "Tap targets >= 44px on mobile.",
      "Use aria-labels for icon-only share buttons.",
      "Respect prefers-reduced-motion."
    ],
    "keyboard": {
      "chat_widget": "Esc closes panel; Tab cycles within; focus returns to opener.",
      "subscribe_modal": "Trap focus; Esc closes; close button always visible."
    }
  },

  "images": {
    "image_urls": {
      "hero_backdrop_optional": [
        {
          "url": "https://images.unsplash.com/photo-1557683316-973673baf926?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
          "category": "hero",
          "description": "Abstract blue glow texture used as a subtle masked background (opacity 0.12) behind hero only."
        },
        {
          "url": "https://images.unsplash.com/photo-1557683304-673a23048d34?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
          "category": "hero",
          "description": "Alternative abstract gradient texture for hero overlay; keep under 20% viewport coverage."
        }
      ],
      "noise_grain": [
        {
          "url": "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
          "category": "global",
          "description": "Subtle grain overlay for the entire site (very low opacity)."
        }
      ]
    }
  },

  "implementation_notes_js": {
    "notes": [
      "Project uses .jsx components. Keep all examples in .js/.jsx (no .tsx).",
      "All interactive elements MUST include data-testid attributes (kebab-case).",
      "Use Lucide icons (already installed per requirement).",
      "Use sonner for toasts (shadcn /ui/sonner.jsx)."
    ],
    "subscribe_modal_state": {
      "localStorage_keys": {
        "subscribed": "ngpt_subscribed",
        "dismissed": "ngpt_subscribe_dismissed"
      },
      "route_change_behavior": "On navigation: if not subscribed and dismissed is true, show modal again and reset dismissed=false after showing."
    },
    "chatbot_logic": {
      "approach": "Client-side search over fetched posts (title + excerpt). Use simple scoring: contains query terms; return top 5 with links.",
      "performance": "Cache posts in memory + localStorage with timestamp; refresh every 6 hours."
    }
  },

  "instructions_to_main_agent": {
    "global": [
      "Replace default App.css centered header styles; do not use .App {text-align:center}.",
      "Set dark mode tokens as default (apply .dark class at root).",
      "Use bento grid for categories; keep cards elevated with subtle borders and blur.",
      "Ensure Apply CTA is always visible (desktop sticky rail + mobile sticky bar).",
      "Implement subscribe modal timing + persistence exactly as described.",
      "Add data-testid to every button/link/input/menu and key info blocks (titles, dates, apply link).",
      "Avoid gradients except hero decorative overlays (<=20% viewport)."
    ],
    "page_specific": {
      "home": [
        "Hero: left-aligned headline + search + quick chips for 9 categories.",
        "Below hero: Category bento tiles.",
        "Main feed: Latest posts list cards.",
        "Right rail: Trending + Popular tools cards (desktop only)."
      ],
      "category": [
        "Header with breadcrumb.",
        "Filters row (Tabs: Latest/Popular; Select: Date range; Calendar in Sheet).",
        "List view default on mobile; grid on desktop."
      ],
      "post_detail": [
        "Top: title + meta + badges.",
        "Right rail: Apply CTA + Share bar + Related posts.",
        "Mobile: sticky Apply bar; Share in Sheet."
      ],
      "static_pages": [
        "Use consistent page header component with title + last updated.",
        "Report Bug: use Formspree/Netlify forms; show sonner toast on submit success/fail."
      ]
    },
    "seo": [
      "Add JSON-LD components for Organization/WebSite globally.",
      "Add Article/JobPosting schema on post pages.",
      "Generate robots.txt and sitemap.xml routes."
    ]
  },

  "general_ui_ux_design_guidelines_appendix": "<General UI UX Design Guidelines>  \n    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.\n</General UI UX Design Guidelines>"
}
