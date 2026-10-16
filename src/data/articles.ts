import { ArticleItem } from '../types';

export const ARTICLES_DATA: ArticleItem[] = [
  {
    slug: 'article-root-canal-mumbai',
    title: 'Root canal in Mumbai: cost, pain and what actually happens in that chair',
    category: 'root-canal',
    author: 'Dr. Ananya Sharma',
    date: '20 Sep 2026',
    readTime: '7 min read',
    cover: '/assets/img/blog-rct.jpg',
    summary: 'The two-year delay, the ₹500 quick fix, the tooth that finally gave up at 2 am. An endodontist walks through the whole journey, including what it costs here and why prices vary across the city.',
    sections: [
      {
        text: 'Most people arrive at our clinic having already decided the worst. A root canal has spent decades as the punchline for everything unpleasant, and the internet has not helped. So before the procedure, here is the version we tell patients sitting in the chair.'
      },
      {
        heading: 'What the tooth is going through',
        text: 'Deep inside every tooth is a soft core of nerve and blood vessels. When decay reaches that core, the tissue gets infected and the body cannot clean it out on its own. The pressure builds. That is the throbbing that wakes you at 2 am. A root canal cleans the infected core out, shapes the space, seals it, and lets you keep the tooth.'
      },
      {
        heading: 'What it feels like',
        text: 'The cleaning itself is pressure and vibration more than pain. You are numb for all of it. Most single-sitting cases at our clinic run about 90 minutes, and the honest review patients give afterwards is usually about their jaw aching from staying open, not the tooth.',
        callout: 'The tooth that needs a root canal usually hurts before treatment. The week after treatment should feel better than the week before it. If it does not, come back; that is what reviews are for.'
      },
      {
        heading: 'What it costs in Mumbai',
        text: 'Market-typical ranges in 2026: a front tooth runs roughly ₹3,500 to ₹6,000, a premolar ₹4,500 to ₹8,000, and a molar with three or four canals ₹5,000 to ₹12,000. Specialist clinics and microscope-assisted work sit at the higher end. Our own range is ₹4,000 to ₹9,000 per tooth, and the crown you will need afterwards runs ₹6,000 to ₹14,000 depending on material.'
      },
      {
        heading: 'When we say no to the root canal',
        text: 'A dentist who never mentions extraction is not being gentle with you. Sometimes the kindest plan is a clean extraction and an implant, and a good clinic tells you that on day one.',
        bullets: [
          'The tooth is cracked below the gumline',
          'The supporting bone is gone',
          'A previous root canal has failed twice',
          'The tooth would cost more to save than a clean replacement costs'
        ]
      },
      {
        heading: 'The one-week version',
        text: 'Day one: treatment, mild soreness, an ordinary painkiller. Day two or three: sensitivity on biting, fading. Day seven: you have forgotten which tooth it was. A crown follows within two to four weeks, and that crown is what protects the investment for the next fifteen years.'
      }
    ],
    related: [
      { slug: 'article-implants-guide', title: 'Dental implants: the honest guide before you spend ₹30,000' },
      { slug: 'article-scaling-cleaning', title: 'Scaling and cleaning: the ₹1,500 visit that saves ₹15,000' },
      { slug: 'article-braces-vs-aligners', title: 'Braces or clear aligners? A choice that fits your life' }
    ]
  },
  {
    slug: 'article-implants-guide',
    title: 'Dental implants: the honest guide before you spend ₹30,000',
    category: 'implants',
    author: 'Dr. Rohan Mehta',
    date: '12 Sep 2026',
    readTime: '9 min read',
    cover: '/assets/img/implants-model.jpg',
    summary: 'A titanium post fused into bone sounds intimidating until you understand how routinely it is done. Here is what every prospective patient should know about bone grafts, healing times, and actual all-inclusive pricing in Mumbai.',
    sections: [
      {
        text: 'An implant is not a tooth replacement in the cosmetic sense alone — it is a root replacement. When you lose a tooth, the bone underneath begins to resorb because there is no chewing pressure telling it to stay dense. An implant stops that resorption.'
      },
      {
        heading: 'The three parts of an implant',
        text: 'Every implant consists of the fixture (the medical-grade titanium screw embedded into the jawbone), the abutment (the connector that sits above the gumline), and the crown (the visible porcelain or zirconia tooth crafted to match your natural shade and bite).'
      },
      {
        heading: 'Does it hurt?',
        text: 'Patients are consistently surprised: placing an implant is often less uncomfortable than an extraction. Bone has very few nerve endings compared to the periodontal ligament. You will feel vibration and pressure during the 45-minute placement, followed by mild tenderness for 48 hours.'
      },
      {
        heading: 'The real timeline',
        text: 'From initial consultation to final ceramic crown is generally 3 to 4 months in the lower jaw and 4 to 6 months in the upper jaw. Rushing this osseointegration period is the primary cause of early implant failures worldwide.',
        callout: 'Written estimates must include everything: the implant screw, cover screw, healing abutment, final abutment, laboratory crown fabrication, and all review X-rays.'
      },
      {
        heading: 'Pricing transparency',
        text: 'At SmileCraft, single-tooth implant packages range from ₹28,000 to ₹45,000 depending on the implant system chosen (Osstem, Straumann, or Nobel Biocare) and the crown material (PFM vs layered Zirconia).'
      }
    ],
    related: [
      { slug: 'article-root-canal-mumbai', title: 'Root canal in Mumbai: cost, pain and what actually happens' },
      { slug: 'article-scaling-cleaning', title: 'Scaling and cleaning: the ₹1,500 visit that saves ₹15,000' }
    ]
  },
  {
    slug: 'article-braces-vs-aligners',
    title: 'Braces or clear aligners? A choice that fits your life',
    category: 'braces',
    author: 'Dr. Rohan Mehta',
    date: '02 Sep 2026',
    readTime: '6 min read',
    cover: '/assets/img/blog-aligners.jpg',
    summary: 'Metal brackets, ceramic aesthetic brackets, or clear plastic aligner trays: which one actually delivers results faster, and how do you pick between visibility and discipline?',
    sections: [
      {
        text: 'Ten years ago, orthodontic choices were simple: metal train-track brackets or tooth-colored ceramic brackets. Today, clear aligners represent nearly 60% of adult orthodontic inquiries at our clinic.'
      },
      {
        heading: 'The discipline equation',
        text: 'Aligners work by applying planned, gentle sequential forces through custom 3D-printed polyurethane trays changed every 7 to 10 days. The catch: they must stay in your mouth for 22 hours every single day. If you remove them during meetings, dinners, or outings, treatment stalls.'
      },
      {
        heading: 'When traditional braces remain superior',
        text: 'Severe rotational corrections, deep skeletal bites, and impacted canine teeth often achieve superior mechanical leverage and faster completion using fixed brackets.'
      },
      {
        heading: 'Cost comparison in Mumbai',
        text: 'Traditional metal braces range from ₹35,000 to ₹55,000. Ceramic braces range from ₹45,000 to ₹75,000. Clear aligners (such as Invisalign and certified Indian laboratory systems) range from ₹65,000 to ₹1,40,000 depending on severity.',
        callout: 'We offer zero-cost 6-month and 12-month EMI plans via Bajaj Finserv for cases above ₹35,000.'
      }
    ],
    related: [
      { slug: 'article-whitening-truth', title: 'Teeth whitening: what works, what wastes money' },
      { slug: 'article-root-canal-mumbai', title: 'Root canal in Mumbai: cost, pain and what actually happens' }
    ]
  },
  {
    slug: 'article-kids-first-visit',
    title: "Your child's first dental visit: what we do differently",
    category: 'kids',
    author: 'Dr. Ananya Sharma',
    date: '28 Aug 2026',
    readTime: '5 min read',
    cover: '/assets/img/blog-kids.jpg',
    summary: 'Why the first visit should never happen when a child is already in severe pain, how the play corner helps them relax, and why baby teeth need care.',
    sections: [
      {
        text: 'The best first dental visit is the one where nothing "bad" happens. No injections, no drills, no unpleasant surprises. It is about counting their teeth, showing them the mouth mirror, and letting them squirt water into the sink.'
      },
      {
        heading: 'When should they visit?',
        text: 'The Indian Dental Association and pediatric dentistry societies recommend the first visit by age one or within six months of the first baby tooth erupting. Early visits prevent nursing bottle decay and spot enamel hypoplasia early.'
      },
      {
        heading: 'The role of milk teeth',
        text: 'A common misconception is that primary teeth do not matter because they will fall out anyway. Milk teeth hold crucial space for permanent teeth, guide jaw alignment, and enable clear speech development. An untreated infection in a milk tooth can damage the developing adult crown underneath.'
      },
      {
        heading: 'Our kids corner',
        text: 'Our waiting lounge includes a dedicated wooden playhouse with non-toxic wooden puzzles, coloring sheets, and cartoon screens so the clinic never feels sterile or intimidating.'
      }
    ],
    related: [
      { slug: 'article-scaling-cleaning', title: 'Scaling and cleaning: the ₹1,500 visit that saves ₹15,000' }
    ]
  },
  {
    slug: 'article-whitening-truth',
    title: 'Teeth whitening: what works, what wastes money',
    category: 'cosmetic',
    author: 'Dr. Rohan Mehta',
    date: '15 Aug 2026',
    readTime: '6 min read',
    cover: '/assets/img/whitening.jpg',
    summary: 'Activated charcoal toothpaste, UV light kits from Instagram, or in-chair bleaching with gum barriers: understanding the chemistry of enamel stain removal.',
    sections: [
      {
        text: 'Enamel is porous. Over decades of filter coffee, black tea, turmeric curries, and red wine, chromogenic molecules embed into microscopic enamel prisms. Surface brushing can only lift extrinsic plaque, not intrinsic stains.'
      },
      {
        heading: 'Why charcoal and abrasive pastes do more harm than good',
        text: 'Abrasive powders wear away the thin translucent enamel over time, exposing the yellow dentin layer beneath. Once enamel is lost, it never regenerates, making your teeth permanently yellower and more sensitive.'
      },
      {
        heading: 'In-clinic professional whitening',
        text: 'Our in-office treatment uses 35% hydrogen peroxide gel with carefully cured gingival resin barriers that shield your gums completely. In a single 60-minute session, we achieve 4 to 8 shade improvements safely without enamel degradation.'
      }
    ],
    related: [
      { slug: 'article-scaling-cleaning', title: 'Scaling and cleaning: the ₹1,500 visit that saves ₹15,000' }
    ]
  },
  {
    slug: 'article-scaling-cleaning',
    title: 'Scaling and cleaning: the ₹1,500 visit that saves ₹15,000',
    category: 'prevention',
    author: 'Dr. Ananya Sharma',
    date: '04 Aug 2026',
    readTime: '5 min read',
    cover: '/assets/img/blog-scaling.jpg',
    summary: 'Busting the common myth that scaling loosens your teeth or wears away enamel, and explaining why tartar cannot be removed by home brushing.',
    sections: [
      {
        text: 'Soft bacterial plaque hardens within 48 hours into calcified dental calculus (tartar). Once tartar forms, no toothbrush, water flosser, or mouthwash can budge it — only ultrasonic vibrations can safely break its crystalline grip.'
      },
      {
        heading: 'Does scaling loosen teeth?',
        text: 'This is the most common myth we hear in Mumbai. When severe tartar has locked loose teeth together in a bridge of infection, removing the infection allows the gums to heal. The tooth was loose because bone was lost, not because scaling occurred.'
      },
      {
        heading: 'How often should you do it?',
        text: 'Every 6 months for most patients, or every 3 to 4 months for smokers or individuals prone to rapid calculus buildup. A 30-minute ₹1,500 clean preserves the periodontal bone that anchors your teeth for life.'
      }
    ],
    related: [
      { slug: 'article-root-canal-mumbai', title: 'Root canal in Mumbai: cost, pain and what actually happens' }
    ]
  }
];
