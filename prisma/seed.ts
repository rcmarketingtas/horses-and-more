import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();

const url = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const adapter = new PrismaLibSql({ url });
const prisma = new PrismaClient({ adapter } as never);

const categories = [
  {
    name: "Tack",
    slug: "tack",
    description: "Premium saddles, bridles, bits, reins and all riding tack for English and Western disciplines.",
    image: "/images/categories/tack.jpg",
  },
  {
    name: "Rugs & Blankets",
    slug: "rugs-blankets",
    description: "Horse rugs for all seasons — turnout, stable, fleece coolers and more.",
    image: "/images/categories/rugs-blankets.jpg",
  },
  {
    name: "Feed & Supplements",
    slug: "feed-supplements",
    description: "Quality horse feeds, hay, grain and nutritional supplements for peak performance.",
    image: "/images/categories/feed-supplements.jpg",
  },
  {
    name: "Grooming",
    slug: "grooming",
    description: "Brushes, combs, shampoos, conditioners and complete grooming kits.",
    image: "/images/categories/grooming.jpg",
  },
  {
    name: "Stable Equipment",
    slug: "stable-equipment",
    description: "Buckets, feeders, hay nets, stable mats, fencing and everything for your stable.",
    image: "/images/categories/stable-equipment.jpg",
  },
  {
    name: "Apparel",
    slug: "apparel",
    description: "Riding boots, helmets, jodhpurs, breeches and technical equestrian apparel.",
    image: "/images/categories/apparel.jpg",
  },
  {
    name: "Health & First Aid",
    slug: "health-first-aid",
    description: "First aid kits, wound care, liniments, fly sprays and health supplements.",
    image: "/images/categories/health-first-aid.jpg",
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Wipe existing data
  await prisma.enquiry.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.adminUser.deleteMany();

  // Create categories
  const createdCategories: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    createdCategories[cat.slug] = created.id;
  }
  console.log(`✅ Created ${categories.length} categories`);

  // Products
  const products = [
    // TACK
    {
      name: "Signature Leather Dressage Saddle",
      slug: "signature-leather-dressage-saddle",
      shortDescription: "Hand-stitched full-grain leather dressage saddle, deep seat, monoflap design.",
      description: "Crafted from the finest full-grain European leather, this dressage saddle features a deep, close-contact seat and monoflap construction for the clearest possible communication with your horse. The anatomical knee blocks offer subtle support without restriction, and the wool-flocked panel provides a custom fit that can be adjusted by your local saddler. Suitable for all levels from amateur to Grand Prix.",
      price: "From $2,495",
      categorySlug: "tack",
      images: JSON.stringify(["/images/products/dressage-saddle-1.jpg", "/images/products/dressage-saddle-2.jpg"]),
      stockStatus: "IN_STOCK",
      featured: true,
      specs: JSON.stringify({ "Tree Size": "Medium / Medium-Wide / Wide", Material: "Full-grain European leather", Seat: "Deep monoflap", Panel: "Wool-flocked, adjustable", Colour: "Black / Dark Havana", "Gullet Width": "Adjustable" }),
    },
    {
      name: "Pro Close-Contact Jump Saddle",
      slug: "pro-close-contact-jump-saddle",
      shortDescription: "Lightweight forward-cut jump saddle with grippy suede seat and knee rolls.",
      description: "Built for the modern show jumper, this close-contact saddle places the rider in perfect balance over fences. The forward-flap design and positioned knee rolls allow a natural, secure leg position through all phases of the jump. The suede-insert seat provides grip without heaviness, and the leather is pre-treated for immediate comfort from the first ride.",
      price: "From $1,895",
      categorySlug: "tack",
      images: JSON.stringify(["/images/products/jump-saddle-1.jpg"]),
      stockStatus: "IN_STOCK",
      featured: true,
      specs: JSON.stringify({ Style: "Close-contact, forward-cut", Seat: "Suede insert, flat to slightly deep", Flap: "Forward", Material: "Leather with suede panels", Weight: "Approx. 4.8 kg" }),
    },
    {
      name: "Padded Leather Bridle — Full",
      slug: "padded-leather-bridle-full",
      shortDescription: "Raised padded leather bridle with anatomical browband and flash noseband.",
      description: "This elegant raised-padded bridle is constructed from soft, supple leather with a beautifully padded headpiece designed to relieve pressure behind the ears. The anatomical browband sits comfortably flat across the forehead, and the flash noseband allows for subtle contact adjustment. Available in full and cob sizes.",
      price: "$189.00",
      categorySlug: "tack",
      images: JSON.stringify(["/images/products/bridle-1.jpg"]),
      stockStatus: "IN_STOCK",
      featured: false,
      specs: JSON.stringify({ Size: "Full / Cob", Material: "Padded leather", Noseband: "Flash", Browband: "Anatomical", Colour: "Black" }),
    },
    {
      name: "Loose Ring Snaffle — 16mm",
      slug: "loose-ring-snaffle-16mm",
      shortDescription: "Stainless steel 16mm single-jointed loose ring snaffle, sweet iron mouthpiece.",
      description: "A fundamental bit for schooling and competing, this loose ring snaffle features a 16mm sweet iron mouthpiece that encourages salivation and acceptance. The stainless steel rings are polished smooth and move freely. Suitable for horses that go well in a simple, kind contact.",
      price: "$74.95",
      categorySlug: "tack",
      images: JSON.stringify(["/images/products/bit-snaffle.jpg"]),
      stockStatus: "IN_STOCK",
      featured: false,
      specs: JSON.stringify({ Type: "Loose ring snaffle", Mouthpiece: "16mm sweet iron", Rings: "Stainless steel", "Mouth Size": "120mm / 125mm / 130mm" }),
    },
    // RUGS
    {
      name: "All-Weather Turnout Rug 300g",
      slug: "all-weather-turnout-rug-300g",
      shortDescription: "Heavy-duty 1200D ripstop outer, 300g polyfill, waterproof and breathable.",
      description: "Designed for the Australian climate, this high-fill turnout rug features a 1200-denier ripstop outer shell that resists tears, snags, and bite marks. The 300g polyfill provides warmth through cold nights without overheating during mild days, and the breathable-waterproof membrane keeps horses dry in heavy rain. Double cross-surcingles, leg straps, and a tail guard ensure a secure, comfortable fit.",
      price: "From $219.00",
      categorySlug: "rugs-blankets",
      images: JSON.stringify(["/images/products/turnout-rug-1.jpg", "/images/products/turnout-rug-2.jpg"]),
      stockStatus: "IN_STOCK",
      featured: true,
      specs: JSON.stringify({ Fill: "300g polyfill", Outer: "1200D ripstop", Waterproofing: "5000mm hydrostatic head", Fastening: "Chest clips, cross-surcingles, leg straps", Sizes: "4'0\" — 7'0\"" }),
    },
    {
      name: "Merino Wool Show Rug",
      slug: "merino-wool-show-rug",
      shortDescription: "Pure merino wool day rug with satin lining and surcingle.",
      description: "A classic presentation rug crafted from pure merino wool with a silky satin lining. Perfect for shows, warming down after work, or travelling, the merino fabric regulates temperature naturally while keeping the coat flat and gleaming. Arrives with a matching tail bag.",
      price: "From $295.00",
      categorySlug: "rugs-blankets",
      images: JSON.stringify(["/images/products/merino-rug.jpg"]),
      stockStatus: "MADE_TO_ORDER",
      featured: false,
      specs: JSON.stringify({ Material: "Pure merino wool outer, satin lining", Fastening: "Surcingle with elastic insert", Monogram: "Available on request", Sizes: "5'0\" — 7'0\"" }),
    },
    {
      name: "Lightweight Mesh Fly Rug",
      slug: "lightweight-mesh-fly-rug",
      shortDescription: "UV-protective mesh fly rug, belly wrap and neck cover included.",
      description: "Shield your horse from flies, midges, and UV rays with this lightweight mesh rug. The fine-knit polypropylene mesh allows air to circulate freely while blocking insects, and the integrated belly wrap prevents flies settling on sensitive skin. Neck cover included.",
      price: "$149.00",
      categorySlug: "rugs-blankets",
      images: JSON.stringify(["/images/products/fly-rug.jpg"]),
      stockStatus: "IN_STOCK",
      featured: false,
      specs: JSON.stringify({ Material: "Polyester mesh", UV: "Yes", Neck: "Included", Belly: "Wrap included", Sizes: "4'6\" — 7'0\"" }),
    },
    // FEED & SUPPLEMENTS
    {
      name: "Equine Performance Pellets 20kg",
      slug: "equine-performance-pellets-20kg",
      shortDescription: "High-energy complete feed pellet for horses in moderate to hard work.",
      description: "Formulated by equine nutritionists, these balanced performance pellets deliver controlled starch energy alongside quality protein, essential amino acids, and a comprehensive vitamin and mineral pack. Suitable for sport horses, eventers, and racehorses in moderate to heavy work. No additional vitamin/mineral supplementation required when fed at recommended rates.",
      price: "$89.95",
      categorySlug: "feed-supplements",
      images: JSON.stringify(["/images/products/performance-pellets.jpg"]),
      stockStatus: "IN_STOCK",
      featured: true,
      specs: JSON.stringify({ Weight: "20kg bag", Crude: "Protein 14%, Fat 8%, Fibre 10%", Energy: "13.5 MJ DE/kg", Additives: "Full vitamin/mineral pack", Suitability: "Moderate to hard work" }),
    },
    {
      name: "Joint Flex Gold — 1kg",
      slug: "joint-flex-gold-1kg",
      shortDescription: "Premium glucosamine, chondroitin, MSM and hyaluronic acid joint supplement.",
      description: "Joint Flex Gold combines therapeutic-grade glucosamine sulphate, chondroitin, methylsulfonylmethane (MSM), and sodium hyaluronate to support cartilage health, reduce inflammation, and maintain joint lubrication. Ideal for older horses, horses in hard work, and those returning from joint injuries. Highly palatable powder format — simply top-dress on feed.",
      price: "$119.95",
      categorySlug: "feed-supplements",
      images: JSON.stringify(["/images/products/joint-supplement.jpg"]),
      stockStatus: "IN_STOCK",
      featured: false,
      specs: JSON.stringify({ Format: "Powder", Weight: "1kg (approx 60 days supply)", "Active Per Serve": "Glucosamine 10g, Chondroitin 2g, MSM 5g, HA 50mg", Palatability: "High" }),
    },
    // GROOMING
    {
      name: "Professional Grooming Kit — 12 Piece",
      slug: "professional-grooming-kit-12-piece",
      shortDescription: "Complete 12-piece grooming kit in a premium canvas carry bag.",
      description: "Everything you need for a thorough groom in one elegant kit. Includes a rubber curry comb, dandy brush, body brush, face brush, mane & tail comb, metal sweat scraper, hoof pick with brush, two-sided sponge set, stable rubber, and a soft polishing cloth — all housed in a sturdy canvas carrying bag.",
      price: "$89.00",
      categorySlug: "grooming",
      images: JSON.stringify(["/images/products/grooming-kit.jpg"]),
      stockStatus: "IN_STOCK",
      featured: true,
      specs: JSON.stringify({ Pieces: "12", Bag: "Canvas with zip", Contents: "Curry comb, dandy brush, body brush, face brush, mane comb, sweat scraper, hoof pick, sponges, stable rubber, polishing cloth" }),
    },
    {
      name: "Silk Shine Coat Conditioner — 500ml",
      slug: "silk-shine-coat-conditioner-500ml",
      shortDescription: "Detangling, conditioning coat spray for a show-ready finish.",
      description: "A silicone-free leave-in conditioner that penetrates the hair shaft to restore moisture, reduce static, and bring out natural coat colour and shine. Suitable for mane, tail, and body. Will not attract dust or make the coat greasy, and is safe for all coat colours including greys and cremellos.",
      price: "$34.95",
      categorySlug: "grooming",
      images: JSON.stringify(["/images/products/coat-conditioner.jpg"]),
      stockStatus: "IN_STOCK",
      featured: false,
      specs: JSON.stringify({ Size: "500ml", Format: "Spray", "Silicone-free": "Yes", "Safe for": "All coat colours" }),
    },
    // STABLE EQUIPMENT
    {
      name: "Rubber Stable Mat — 17mm Thick",
      slug: "rubber-stable-mat-17mm",
      shortDescription: "Heavy-duty interlocking rubber stable mat, 1.8m × 1.2m × 17mm.",
      description: "These premium interlocking rubber mats provide a non-slip, hygienic, and insulating floor for stable, horse float, and trailer. The 17mm thickness cushions joints and reduces leg fatigue, while the textured top surface gives confident footing even when wet. Easy to clean with a hose and disinfectant. Supplied individually; enough for a standard 3.6m × 3.6m loose box with 6 mats.",
      price: "$149.00",
      categorySlug: "stable-equipment",
      images: JSON.stringify(["/images/products/stable-mat.jpg"]),
      stockStatus: "IN_STOCK",
      featured: false,
      specs: JSON.stringify({ Dimensions: "1.8m × 1.2m × 17mm", Material: "Virgin rubber compound", Weight: "Approx. 32kg per mat", Surface: "Anti-slip textured", Interlocking: "Yes" }),
    },
    {
      name: "Slow Feed Hay Net — XL",
      slug: "slow-feed-hay-net-xl",
      shortDescription: "Heavy-duty slow-feeder hay net with small-hole weave to extend feeding time.",
      description: "Promote digestive health and reduce stable boredom by extending your horse's hay consumption time by up to 4× compared to conventional nets. The 4cm small-hole weave slows intake without frustrating the horse, and the 1200D polyester construction resists gnawing and UV degradation. Holds up to a full bale of hay.",
      price: "$64.95",
      categorySlug: "stable-equipment",
      images: JSON.stringify(["/images/products/hay-net.jpg"]),
      stockStatus: "IN_STOCK",
      featured: false,
      specs: JSON.stringify({ Hole: "4cm small hole weave", Capacity: "Full bale", Material: "1200D polyester", UV: "Resistant" }),
    },
    // APPAREL
    {
      name: "Pro-Fit Leather Riding Boot",
      slug: "pro-fit-leather-riding-boot",
      shortDescription: "Tall leather dress boot with full inner zip and cushioned insole.",
      description: "Handcrafted from supple full-grain calf leather, this tall riding boot combines the classic elegance of a dress boot with modern comfort technology. The interior full-length zip allows easy on/off without stretching the leather, while the memory-foam insole and shock-absorbing heel provide all-day comfort in the saddle and on the ground.",
      price: "From $595.00",
      categorySlug: "apparel",
      images: JSON.stringify(["/images/products/riding-boot-1.jpg", "/images/products/riding-boot-2.jpg"]),
      stockStatus: "IN_STOCK",
      featured: true,
      specs: JSON.stringify({ Upper: "Full-grain calf leather", Sole: "Rubber, shock-absorbing heel", Fastening: "Inner full-length YKK zip", Insole: "Memory foam", Sizes: "35 — 45 EU (half sizes available)", Colours: "Black / Cognac" }),
    },
    {
      name: "Competition Helmet — MIPS",
      slug: "competition-helmet-mips",
      shortDescription: "FEI-approved competition helmet with MIPS rotational protection system.",
      description: "Safety and style in perfect balance. This FEI-approved helmet features MIPS (Multi-directional Impact Protection System) rotational force reduction, an EPS liner, and a moisture-wicking ventilated interior. The low-profile design meets the aesthetic demands of the dressage or show ring without compromising protection. Available in velvet-covered and silk-covered finishes.",
      price: "From $349.00",
      categorySlug: "apparel",
      images: JSON.stringify(["/images/products/helmet.jpg"]),
      stockStatus: "IN_STOCK",
      featured: false,
      specs: JSON.stringify({ Certification: "AS/NZS 3838, ASTM F1163, PAS015", Safety: "MIPS rotational protection", Shell: "EPS with fibreglass", Finish: "Velvet or silk cover", Sizes: "52 — 62cm" }),
    },
    {
      name: "Full-Seat Grip Breeches",
      slug: "full-seat-grip-breeches",
      shortDescription: "Italian fabric full-seat silicone grip breeches, slim-fit.",
      description: "Cut from a premium four-way stretch Italian fabric, these full-seat breeches feature a silicone grip panel from seat to knee for exceptional stability in the saddle. The slim-fit tailored cut looks polished in the warm-up ring and the arena alike, with a reinforced flatlock-stitched seat for long-term durability.",
      price: "$189.00",
      categorySlug: "apparel",
      images: JSON.stringify(["/images/products/breeches.jpg"]),
      stockStatus: "IN_STOCK",
      featured: false,
      specs: JSON.stringify({ Fabric: "Italian 4-way stretch", Grip: "Full seat silicone", Waist: "Flat elastic waistband", Sizes: "XS — XXL (EU 32 — 44)", Colours: "White / Black / Navy / Grey" }),
    },
    // HEALTH & FIRST AID
    {
      name: "Equine First Aid Kit — Deluxe",
      slug: "equine-first-aid-kit-deluxe",
      shortDescription: "Comprehensive 35-item first aid kit in a waterproof carry case.",
      description: "Be prepared for any paddock emergency with this comprehensive equine first aid kit. The 35-item kit includes sterile wound dressings, self-adhesive bandages, saline wound wash, thermometer, stethoscope, latex gloves, wound spray, leg wraps, and detailed first aid guide — all in a hard-shell waterproof carry case that fits in any saddle bag.",
      price: "$129.00",
      categorySlug: "health-first-aid",
      images: JSON.stringify(["/images/products/first-aid-kit.jpg"]),
      stockStatus: "IN_STOCK",
      featured: false,
      specs: JSON.stringify({ Items: "35", Case: "Waterproof hard-shell", Contents: "Dressings, bandages, saline, thermometer, stethoscope, gloves, wound spray, guide" }),
    },
    {
      name: "Botanical Fly Repellent Spray — 1L",
      slug: "botanical-fly-repellent-spray-1l",
      shortDescription: "DEET-free botanical fly and insect repellent, safe for sensitive skin.",
      description: "Formulated from a blend of essential oils including citronella, tea tree, eucalyptus, and lavender, this botanical spray effectively deters flies, midges, mosquitoes, and stable insects without harsh chemicals. DEET-free and safe for use around wounds, foals, and horses with sensitive skin. Pleasant scent, long-lasting effect.",
      price: "$39.95",
      categorySlug: "health-first-aid",
      images: JSON.stringify(["/images/products/fly-spray.jpg"]),
      stockStatus: "IN_STOCK",
      featured: false,
      specs: JSON.stringify({ Size: "1 litre", Format: "Trigger spray", "DEET-free": "Yes", "Safe for": "Foals, sensitive skin, near wounds", "Active Ingredients": "Citronella, tea tree, eucalyptus, lavender oils" }),
    },
    {
      name: "Cooling Clay Leg Wrap — Set of 4",
      slug: "cooling-clay-leg-wrap-set",
      shortDescription: "Kaolin clay poultice wraps for cooling and drawing, set of 4.",
      description: "A traditional favourite updated for the modern yard. These pre-mixed kaolin clay poultice wraps can be applied cold (straight from the fridge for maximum cooling effect) or warm for drawing action. Excellent for post-work leg care, minor soft-tissue swelling, and general leg maintenance. Reusable with wash-and-reapply simplicity.",
      price: "$54.95",
      categorySlug: "health-first-aid",
      images: JSON.stringify(["/images/products/leg-wraps.jpg"]),
      stockStatus: "IN_STOCK",
      featured: false,
      specs: JSON.stringify({ Set: "4 wraps", Active: "Kaolin clay", Use: "Cold or warm", Size: "Fits standard leg", Reusable: "Yes" }),
    },
    {
      name: "Western Stock Saddle",
      slug: "western-stock-saddle",
      shortDescription: "Australian stock saddle with deep seat and polished nickel fittings.",
      description: "Handcrafted by an Australian saddler, this stock saddle is designed for long days in the saddle working cattle or trail riding. The deep, secure seat and generous knee padding provide comfort over many hours, while the tooled leather skirts and polished nickel fittings give a premium finish. Includes matching girth and stirrups.",
      price: "From $1,695",
      categorySlug: "tack",
      images: JSON.stringify(["/images/products/stock-saddle.jpg"]),
      stockStatus: "MADE_TO_ORDER",
      featured: true,
      specs: JSON.stringify({ Style: "Australian stock", Material: "Tooled full-grain leather", Seat: "Deep", Fittings: "Polished nickel", Includes: "Girth and stirrups", "Lead Time": "4 — 6 weeks" }),
    },
    {
      name: "Stable Rubber Feed Bowl — 10L",
      slug: "stable-rubber-feed-bowl-10l",
      shortDescription: "Flexible rubber corner feed bowl, 10L, wall-mountable.",
      description: "A stable essential — this flexible rubber corner feed bowl is virtually indestructible, easy to clean, and mounts to any stable corner with the included bracket. The flexible rubber design allows horses to lick the bowl clean without injuring their face, and the 10-litre capacity is suitable for a full concentrate meal.",
      price: "$29.95",
      categorySlug: "stable-equipment",
      images: JSON.stringify(["/images/products/feed-bowl.jpg"]),
      stockStatus: "IN_STOCK",
      featured: false,
      specs: JSON.stringify({ Capacity: "10L", Material: "Flexible rubber", Mounting: "Corner bracket included", Colour: "Black" }),
    },
    {
      name: "Hoof Oil & Conditioner — 500ml",
      slug: "hoof-oil-conditioner-500ml",
      shortDescription: "Natural pine tar and lanolin hoof oil for strength and flexibility.",
      description: "A time-tested formulation of pine tar, lanolin, and neatsfoot oil that penetrates deep into the hoof wall to restore moisture balance, promote flexibility, and strengthen brittle hooves. Apply with the included brush to the hoof wall, sole, and frog. Suitable for dry and cracked hooves, and as regular maintenance in harsh conditions.",
      price: "$27.95",
      categorySlug: "grooming",
      images: JSON.stringify(["/images/products/hoof-oil.jpg"]),
      stockStatus: "IN_STOCK",
      featured: false,
      specs: JSON.stringify({ Size: "500ml", Key: "Ingredients: Pine tar, lanolin, neatsfoot oil", Applicator: "Brush included", Suitable: "All hoof types" }),
    },
    {
      name: "Saddlecloth — Wool Felt Dressage",
      slug: "saddlecloth-wool-felt-dressage",
      shortDescription: "Pure wool felt dressage square with piped edges and logo corner.",
      description: "A premium competition saddlecloth cut from pure New Zealand wool felt. The shaped contour design sits neatly under a dressage saddle without bunching, and the piped edges and embroidered corner logo give a polished competition finish. Available in white (competition legal) and black.",
      price: "$89.00",
      categorySlug: "tack",
      images: JSON.stringify(["/images/products/saddlecloth.jpg"]),
      stockStatus: "IN_STOCK",
      featured: false,
      specs: JSON.stringify({ Material: "Pure NZ wool felt", Style: "Dressage square, contoured", Edge: "Piped", Sizes: "Full / Warmblood", Colours: "White / Black" }),
    },
    {
      name: "Electrolyte Powder — Bucket 3kg",
      slug: "electrolyte-powder-3kg",
      shortDescription: "Full-spectrum electrolyte powder to replace salts lost through sweat.",
      description: "Horses working hard or travelling in hot conditions need electrolyte replenishment to maintain hydration, muscle function, and performance. This full-spectrum powder contains sodium, potassium, chloride, magnesium, and calcium in ratios that mirror natural sweat loss. Easy to dissolve in water or mix directly onto feed.",
      price: "$79.95",
      categorySlug: "feed-supplements",
      images: JSON.stringify(["/images/products/electrolytes.jpg"]),
      stockStatus: "IN_STOCK",
      featured: false,
      specs: JSON.stringify({ Weight: "3kg bucket", Format: "Powder", "Active Per Serve": "Na, K, Cl, Mg, Ca in sweat ratios", Administration: "Water or feed", Palatability: "High" }),
    },
  ];

  let productCount = 0;
  for (const p of products) {
    const { categorySlug, ...productData } = p;
    await prisma.product.create({
      data: {
        ...productData,
        categoryId: createdCategories[categorySlug],
      },
    });
    productCount++;
  }
  console.log(`✅ Created ${productCount} products`);

  // Admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@horsesandmore.com.au";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.create({
    data: {
      email: adminEmail,
      passwordHash,
      name: "Store Admin",
    },
  });
  console.log(`✅ Created admin user: ${adminEmail}`);

  // Sample enquiry
  const sampleProduct = await prisma.product.findFirst({ where: { featured: true } });
  await prisma.enquiry.create({
    data: {
      name: "Sarah Thompson",
      email: "sarah@example.com",
      phone: "0412 345 678",
      message: `I'm interested in the ${sampleProduct?.name ?? "product"}. Could you tell me more about sizing and delivery?`,
      productId: sampleProduct?.id,
      status: "NEW",
    },
  });
  console.log("✅ Created sample enquiry");

  console.log("\n🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
