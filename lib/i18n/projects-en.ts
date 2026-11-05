import type { Project } from "@/data/projects";

export type ProjectCopy = Pick<Project, "cat" | "eyebrow" | "title" | "association" | "overview" | "contributionsTitle" | "contributions">;

const withOasis = "With Grupo Oásis (Agência Oásis)";
const featured = "Featured case";
const role = "What I did";

export const enProjects: Record<string, ProjectCopy> = {
  fiturban: {
    cat: "Fitness e-commerce",
    eyebrow: featured,
    title: "Fit Urban — Fitness storefront",
    association: withOasis,
    overview: [
      "Fitness storefront on Wake: listings, collections, variants, and responsive layout.",
      "Shopping experience built for clear navigation across a catalog with several collections.",
    ],
    contributionsTitle: role,
    contributions: [
      "Built product listings, collection pages, and category navigation with HTML5, CSS3, JavaScript, and Scriban templates.",
      "Implemented color-variant UI and mobile-first responsive layouts.",
      "Tuned cross-browser compatibility, performance, and e-commerce SEO.",
      "Visual refinement aligned with the brand and a fitness-fashion audience.",
    ],
  },
  hotrio: {
    cat: "Adult Products E-commerce",
    eyebrow: featured,
    title: "HotRio — Adult products store",
    association: withOasis,
    overview: [
      "Frontend development for HotRio, an e-commerce brand in the adult products segment.",
      "I implemented responsive interfaces focused on brand fidelity, accessibility, and cross-browser compatibility, working with a multidisciplinary team across engineering, design, and product.",
    ],
    contributionsTitle: role,
    contributions: [
      "Built the responsive layout structure with HTML5, CSS3, and JavaScript.",
      "Compatibility fixes across the major browsers.",
      "Visual implementation aligned with brand and design guidelines.",
      "Technical support through QA and final delivery fixes.",
    ],
  },
  mckhome: {
    cat: "Home & Gifts E-commerce",
    eyebrow: featured,
    title: "Mck Home — Home and gifts store",
    association: withOasis,
    overview: [
      "Frontend development for Mck Home, a brand specializing in gifts, housewares, and products for the home.",
      "I built responsive, accessible interfaces aligned with the brand, focused on fluid, intuitive navigation for shoppers.",
    ],
    contributionsTitle: role,
    contributions: [
      "Developed responsive layouts with HTML5, CSS3, and JavaScript.",
      "Applied accessibility and web performance practices.",
      "Collaborated with design and product in an agile setup.",
      "Versioned and organized the codebase with Git.",
    ],
  },
  serralheria: {
    cat: "Hardware & Tools E-commerce",
    eyebrow: featured,
    title: "Loja Serralheria — Hardware and tools store",
    association: withOasis,
    overview: [
      "Frontend development for Loja Serralheria, built for hardware professionals, construction, and tool retail.",
      "I delivered responsive, on-brand interfaces focused on usability, performance, and clear navigation for a technical, returning audience.",
    ],
    contributionsTitle: role,
    contributions: [
      "Built responsive components and layouts with HTML5, CSS3, and JavaScript.",
      "Applied performance and accessibility optimizations.",
      "Collaborated with design, product, and engineering through the development cycle.",
      "Kept the versioned codebase organized with Git.",
    ],
  },
  lojaultra: {
    cat: "Truck Parts E-commerce",
    eyebrow: featured,
    title: "Loja Ultra — Truck parts and accessories store",
    association: withOasis,
    overview: [
      "Frontend development for Loja Ultra, a store specializing in parts and accessories for trucks and heavy vehicles.",
      "I created a clear, functional interface for a technical audience, prioritizing fast navigation, visual consistency, and responsive behavior across devices.",
    ],
    contributionsTitle: role,
    contributions: [
      "Built responsive frontend components with HTML5, CSS3, and JavaScript.",
      "Improved navigation for a technical product catalog.",
      "Kept visual consistency and brand alignment across the UI.",
      "Collaborated with design and product in an agile setup.",
    ],
  },
  tubaraocenter: {
    cat: "Fishing & Airsoft E-commerce",
    eyebrow: featured,
    title: "Tubarão Center — Fishing and airsoft store",
    association: withOasis,
    overview: [
      "Frontend development for Tubarão Center, a store specializing in fishing, camping, airsoft, and technical outdoor gear.",
      "I built responsive, on-brand interfaces and a smooth, efficient shopping experience for a niche audience.",
    ],
    contributionsTitle: role,
    contributions: [
      "Developed responsive layouts with HTML5, CSS3, and JavaScript.",
      "Optimized performance and accessibility for a catalog with a wide product range.",
      "Collaborated with design, product, and engineering in an agile flow.",
      "Versioned and organized the codebase with Git.",
    ],
  },
  useloft: {
    cat: "Luxury Fashion E-commerce",
    eyebrow: featured,
    title: "Useloft — Premium fashion store",
    association: withOasis,
    overview: [
      "Frontend development for Useloft, a brand built around refined, sophisticated fashion.",
      "I implemented the frontend with an emphasis on visual refinement, mobile-first responsiveness, and accessibility, so navigation stays fluid and feels as premium as the brand.",
    ],
    contributionsTitle: role,
    contributions: [
      "Developed responsive, mobile-optimized interfaces with HTML5, CSS3, and JavaScript.",
      "Applied accessibility and user-experience practices.",
      "Implemented UI aligned with the visual guidelines of a premium brand.",
      "Collaborated with a multidisciplinary team across design, engineering, and product.",
    ],
  },
  viaveneto: {
    cat: "Men's fashion",
    eyebrow: featured,
    title: "ViaVeneto — Men's fashion",
    association: withOasis,
    overview: [
      "Men's fashion on Wake: premium UI, accessibility, performance, and SEO.",
      "Responsive storefront aligned with the brand, built with a multidisciplinary team.",
    ],
    contributionsTitle: role,
    contributions: [
      "Responsive frontend implementation with HTML5, CSS3, and JavaScript.",
      "Adherence to the brand's visual guidelines and to accessibility standards.",
      "SEO practices to improve organic discovery.",
      "Versioning and maintenance of the codebase with Git.",
    ],
  },
  yamuna: {
    cat: "Natural goods · Nuvemshop",
    eyebrow: featured,
    title: "Yamuna — Wake to Nuvemshop migration",
    association: withOasis,
    overview: [
      "Migration of the natural and wellness storefront from Wake to Nuvemshop.",
      "Go Template theme focused on identity, responsive layout, performance, accessibility, and SEO.",
    ],
    contributionsTitle: role,
    contributions: [
      "Migrated the Wake storefront to Nuvemshop.",
      "Go Template theme aimed at identity, responsive layout, performance, accessibility, and SEO.",
    ],
  },
  kingimports: {
    cat: "Auto parts",
    eyebrow: featured,
    title: "King Imports — Auto parts frontend",
    association: withOasis,
    overview: [
      "Auto parts frontend on Wake: responsive layouts and performance.",
      "Storefront pages, components, and showcases, with cart and product-page fixes.",
    ],
    contributionsTitle: role,
    contributions: [
      "Built and evolved pages, components, and snippets in Scriban, with data from GraphQL queries.",
      "Styling with Tailwind CSS and a local workflow using the storefront watch.",
      "Layout and behavior fixes in the cart, product showcases, and product pages.",
      "Transactional email templates for the store.",
    ],
  },
  venari: {
    cat: "Women's fitness",
    eyebrow: featured,
    title: "Venari — Women's fitness storefront",
    association: withOasis,
    overview: [
      "Women's fitness storefront on Wake: PLPs, collections, color variants, and a mobile-first layout.",
      "Responsive frontend with HTML5, CSS3, and JavaScript, aligned with the brand.",
    ],
    contributionsTitle: role,
    contributions: [
      "PLPs, collections, and color variants with HTML5, CSS3, and JavaScript.",
      "Mobile-first layout for catalog reading and product emphasis.",
      "Responsive adjustments on the Wake storefront.",
    ],
  },
  webcine: {
    cat: "Online cinema",
    eyebrow: "Personal project",
    title: "WebCine TV — Synced rooms",
    association: "Created by Helison Dias",
    overview: [
      "Online cinema platform with synced rooms (play/pause/seek and chat), YouTube, Twitch/HLS, screen share, and a virtual browser.",
      "V2 uses multi-stage Docker, Node.js 24, and Playwright E2E. Built with Claude and Codex.",
    ],
    contributionsTitle: role,
    contributions: [
      "Synced rooms with play, pause, seek, and chat.",
      "YouTube, Twitch/HLS, screen share, and a virtual browser.",
      "V2 with multi-stage Docker, Node.js 24, and Playwright E2E tests.",
    ],
  },
};
