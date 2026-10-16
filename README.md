# SmileCraft Dental Studio — React Application

A modern, responsive React + TypeScript application for SmileCraft Dental Studio, an MDS specialist dental clinic based in Andheri West, Mumbai. Rewritten from the original project with full feature parity, responsive components, and an integrated clinic management console.

## Architecture & Technology

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom editorial brand styling (Fraunces serif, Inter sans, dark teal palette, and subtle micro-interactions)
- **Data & State**: `ClinicStoreContext` with automatic `localStorage` synchronization (`scd2_*` keys)
- **Dev Server**: Runs on port 3000 (`vite --host 0.0.0.0 --port 3000`)

## Ported Features

### Public Website
- **Home**:
  - Hero with animated typewriter effect ("listening.", "comfort.", "honesty.", "care.")
  - Announcement carousel strip driven by the admin banner manager with auto-rotation
  - Animated marquee ticker of dental specialties
  - Featured treatments with transparent ₹ pricing and clinical overview
  - "Why patients stay" philosophy highlights
  - Specialists overview with live today's open slots ticker
  - Key statistics counter strip (12+ years, 18,000+ smiles, 3,200+ implants, 4.9★ rating)
  - Verified patient testimonials
  - Latest clinical articles and live clinic updates
  - Same-day emergency booking strip and floating WhatsApp action button
- **About Us**:
  - Clinic founding story, core values, sterilization protocol (Class B autoclave transparency), and studio timeline from 2013 to 2025
- **Services & Transparent Pricing**:
  - Full treatment catalogue with realistic Indian Rupee (₹) price ranges for single-sitting root canals, CBCT implants, invisible aligners, veneers, scaling, and kids' dentistry
- **Our Doctors**:
  - Comprehensive clinical profiles, qualifications, and consultation timings for Dr. Ananya Sharma (Endodontist) and Dr. Rohan Mehta (Prosthodontist & Implantologist)
- **Clinic Gallery**:
  - High-resolution photographic tour of operatories, recovery lounge, sterilization bay, kids' playhouse, and smile transformations with lightbox viewer
- **Blog & Clinical Guides**:
  - Long-form patient guides on root canals, implants, braces vs. aligners, teeth whitening, and pediatric visits
  - Category filter chips (Root canal, Implants, Braces, Kids, Cosmetic, Prevention, Clinic updates)
  - Dynamic clinic updates created in the admin portal render instantly in the blog
- **Contact & Online Booking**:
  - Interactive appointment booking with validation, date selector, 6 time slot chips, doctor selection, and duplicate booking prevention
  - Instant booking confirmation card with reference ID (`SCD-XXXXXX`) and WhatsApp pre-filled draft link
  - Embedded clinic Google map and 10 expandable FAQ accordions
- **Privacy Policy & Security**:
  - Transparent data practices and anti-tracking policies

### Clinic Admin Console (`/admin`)
- **Dashboard**:
  - Metric cards: Today's appointments, Pending confirmations, Bookings this week, Total patients
  - Today's schedule table with 1-click WhatsApp confirmation drafts and phone call links
  - Quick action shortcuts
- **Appointments Manager**:
  - Search across patient name, phone, ref, and service
  - Multi-criteria filtering by status, doctor, and date
  - In-line time slot editing with quick chips and custom time picker
  - Status progression workflow (New → Confirmed → Done)
  - Expandable WhatsApp confirmation draft generator with pre-populated patient details
  - Desk booking form for walk-ins and phone calls
  - CSV export (`smilecraft-appointments.csv`)
- **Patients Ledger**:
  - Searchable directory of registered patients with visit history and notes
  - Form to record new patient files
- **Blog & Updates Manager**:
  - Author and publish clinic notices and checkup camps directly to the public website
- **Banner Strip Manager**:
  - Real-time live banner preview
  - Template banners (Festival / Signature themes) and custom image banners with upload
  - Live / Hidden toggles and delete controls
- **Booking Stats & Analytics**:
  - 7-day bookings bar chart
  - Status breakdown percentage bars
  - Top 5 requested dental treatments
  - Booking channels distribution (Online web forms vs. Desk / phone walk-ins)
- **Clinic Settings**:
  - Configurable clinic name, phone, WhatsApp number, physical address, and operating hours that immediately update across the entire application

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
