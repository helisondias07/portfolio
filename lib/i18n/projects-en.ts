import type { Project } from "@/data/projects";

export type ProjectCopy = Pick<Project, "cat" | "eyebrow" | "title" | "association" | "overview" | "contributionsTitle" | "contributions">;

const withOasis = "With Grupo Oásis (Agência Oásis)";
const featured = "Featured case";
const role = "What I did";

export const enProjects: Record<string, ProjectCopy> = {
  fiturban: {
    cat: "Fashion E-commerce",
    eyebrow: featured,
    title: "Fit Urban — Women's fitness fashion store",
    association: withOasis,
    overview: [
      "Frontend development for the Fit Urban storefront, a women's fitness brand focused on high-performance training apparel.",
      "I built the shopping experience on Wake, with an emphasis on responsive layout, visual polish, and clear navigation across a large catalog — collections such as Zenith, Seamless, Fit Run, Vitality, and Fit Basic.",
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
    cat: "Men's Fashion E-commerce",
    eyebrow: featured,
    title: "ViaVeneto — Men's fashion store",
    association: withOasis,
    overview: [
      "Frontend development for ViaVeneto, a traditional men's fashion and tailoring brand.",
      "I worked with a multidisciplinary team to ship a fast, accessible, responsive storefront aligned with the brand's classic identity and with UX standards.",
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
    cat: "Natural & Health E-commerce · Nuvemshop",
    eyebrow: featured,
    title: "Yamuna — Nuvemshop migration and theme",
    association: withOasis,
    overview: [
      "Theme development for Yamuna, a brand of natural foods, teas, and spices, during the store's migration to Nuvemshop.",
      "Beyond the store pages, I led a homepage performance plan, starting from an audit that found 229 images (199 without lazy loading), 9 carousels, and roughly 1.3 MB of HTML.",
    ],
    contributionsTitle: role,
    contributions: [
      "Full Nuvemshop theme: home, PLP with filters, PDP, cart and drawer, blog, and checkout.",
      "Homepage optimization: priority only for the first hero image, earlier carousel loading, and optimized images.",
      "Checkout improvements and a better mobile cart experience.",
      "Automated theme publishing over FTP with watch and push scripts.",
    ],
  },
  kingimports: {
    cat: "Import Store E-commerce",
    eyebrow: featured,
    title: "King Imports — Wake SSR storefront",
    association: withOasis,
    overview: [
      "Ongoing development and maintenance of the King Imports storefront on Wake, using the Storefront SSR model with Scriban templates and Tailwind CSS.",
      "I'm the primary author of the repository, with 600+ commits since December 2023, covering pages, components, the cart, and store emails.",
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
    cat: "Women's Fashion E-commerce",
    eyebrow: featured,
    title: "Venari — Women's fashion and beachwear store",
    association: withOasis,
    overview: [
      "Frontend development for Venari, a brand focused on women's fashion, beachwear, and highly visual seasonal collections.",
      "I implemented responsive interfaces with a mobile-first experience, room for campaigns to stand out, fluid navigation, and visual consistency with the brand.",
    ],
    contributionsTitle: role,
    contributions: [
      "Implemented product showcases, banners, and collection pages with HTML5, CSS3, and JavaScript.",
      "Refined the responsive layout so content reads clearly and products stand out on mobile.",
      "Performance, accessibility, and usability fixes for a smoother purchase flow.",
      "Worked with design and product to keep visual consistency across campaigns and store sections.",
    ],
  },
  webcine: {
    cat: "Real-time Streaming Platform",
    eyebrow: "Personal project",
    title: "WebCine TV — Real-time online cinema",
    association: "Created by Helison Dias",
    overview: [
      "A web platform for watching videos together in shared rooms, focused on synced playback, real-time chat, and simple access with nothing to install.",
      "The interface is built for desktop and mobile, with an immersive, cinematic look, fast room creation, and a clear presentation of the main features.",
    ],
    contributionsTitle: role,
    contributions: [
      "Built the responsive interface for creating rooms, navigating, and presenting features.",
      "Implemented a mobile-first experience for quick access across devices.",
      "Organized cards, usage steps, and interaction states with a focus on clarity.",
      "Shipped the web app with its own visual identity and a direct way in.",
    ],
  },
};
