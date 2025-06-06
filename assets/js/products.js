const products = [
  // A. Computer Science & Engineering
  {
    id: 1,
    name: "Programming Laptop (Dell XPS 15)",
    price: 1299.99,
    description: "Intel i7, 16GB RAM, 512GB SSD - Ideal for coding and machine learning",
    category: "computers",
    subcategory: "laptops",
    image: "assets/images/laptop-coding.jpg",
    tags: ["computer-science", "best-seller"]
  },
  {
    id: 2,
    name: "Lab Coat",
    price: 29.99,
    description: "A white coat for laboratory safety",
    category: "lab-requirements",
    subcategory: "safety",
    image: "assets/images/lab-coat.jpg",
    tags: ["laboratory-science"]
  },
  {
    id: 3,
    name: "Mechanical Keyboard (Keychron K8)",
    price: 89.99,
    description: "Tenkeyless mechanical keyboard with RGB lighting for programmers",
    category: "computers",
    subcategory: "accessories",
    image: "assets/images/mech-keyboard.jpg",
    tags: ["computer-science"]
  },
  {
    id: 4,
    name: "Raspberry Pi 4 Starter Kit",
    price: 119.99,
    description: "Complete IoT development kit with case, power supply and accessories",
    category: "electronic-tools",
    subcategory: "kits",
    image: "assets/images/rasberry-pi-kit.jpg",
    tags: ["computer-science", "electronics"]
  },
  {
    id: 5,
    name: "GitHub Student Developer Pack",
    price: 0,
    description: "Free access to premium developer tools for students",
    category: "software",
    subcategory: "developer-tools",
    image: "assets/images/github-pack.jpg",
    tags: ["computer-science", "free"]
  },
  // B. Civil Engineering
  {
    id: 6,
    name: "Engineering Drafting Kit",
    price: 45.50,
    description: "Complete set with compass, protractor, and technical pens",
    category: "workshop-tools",
    subcategory: "drafting",
    image: "assets/images/drafting-kit.jpg",
    tags: ["civil-engineering"]
  },
  {
    id: 7,
    name: "Construction Hard Hat",
    price: 24.99,
    description: "ANSI-approved safety helmet with adjustable harness",
    category: "safety-gear",
    subcategory: "construction",
    image: "assets/images/hard-hat.jpg",
    tags: ["civil-engineering"]
  },
  {
    id: 8,
    name: "AutoCAD Civil 3D (Student License)",
    price: 0,
    description: "Free 1-year license for civil engineering students",
    category: "software",
    subcategory: "cad",
    image: "assets/images/autocad-civil.jpg",
    tags: ["civil-engineering", "free"]
  },
  {
    id: 9,
    name: "Laser Distance Measurer",
    price: 59.99,
    description: "Digital laser measure with 100ft range for site surveys",
    category: "workshop-tools",
    subcategory: "measurement",
    image: "assets/images/laser-measurer.jpg",
    tags: ["civil-engineering"]
  },
  // C. Laboratory Science
  {
    id: 10,
    name: "Lab Coat (Polyester Cotton)",
    price: 29.99,
    description: "White lab coat with knit cuffs and snap buttons",
    category: "lab-requirements",
    subcategory: "safety",
    image: "assets/images/lab-coat.jpg",
    tags: ["laboratory-science"]
  },
  {
    id: 11,
    name: "Chemistry Glassware Set",
    price: 89.99,
    description: "24-piece set with beakers, flasks and graduated cylinders",
    category: "lab-requirements",
    subcategory: "glassware",
    image: "assets/images/glassware-set.jpg",
    tags: ["laboratory-science"]
  },
  {
    id: 12,
    name: "Digital pH Meter",
    price: 49.99,
    description: "Precision pH tester with ATC and replaceable electrode",
    category: "lab-requirements",
    subcategory: "instruments",
    image: "assets/images/ph-meter.jpg",
    tags: ["laboratory-science"]
  },
  {
    id: 13,
    name: "Molecular Model Kit",
    price: 32.99,
    description: "126-piece organic chemistry modeling set",
    category: "reference-materials",
    subcategory: "kits",
    image: "assets/images/molecular-kit.jpg",
    tags: ["laboratory-science"]
  },
  // D. Mechanical Engineering
  {
    id: 14,
    name: "Digital Caliper (0-6in)",
    price: 25.99,
    description: "Stainless steel vernier caliper with LCD display",
    category: "workshop-tools",
    subcategory: "measurement",
    image: "assets/images/digital-caliper.jpg",
    tags: ["mechanical-engineering"]
  },
  {
    id: 15,
    name: "SolidWorks Student License",
    price: 99.99,
    description: "1-year license for mechanical design software",
    category: "software",
    subcategory: "cad",
    image: "assets/images/solidworks.jpg",
    tags: ["mechanical-engineering"]
  },
  {
    id: 16,
    name: "3D Printing Filament (PLA, 1kg)",
    price: 22.99,
    description: "1.75mm diameter filament for prototyping",
    category: "workshop-tools",
    subcategory: "3d-printing",
    image: "assets/images/pla-filament.jpg",
    tags: ["mechanical-engineering"]
  },
  {
    id: 17,
    name: "Thermodynamics Lab Kit",
    price: 149.99,
    description: "Complete heat transfer experiment set",
    category: "lab-requirements",
    subcategory: "mechanical",
    image: "assets/images/thermo-kit.jpg",
    tags: ["mechanical-engineering"]
  },
  // E. Electrical & Electronics
  {
    id: 18,
    name: "Digital Multimeter",
    price: 39.99,
    description: "Auto-ranging multimeter with continuity test",
    category: "electronic-tools",
    subcategory: "measurement",
    image: "assets/images/multimeter.jpg",
    tags: ["electrical-electronics"]
  },
  {
    id: 19,
    name: "Arduino Uno Starter Kit",
    price: 79.99,
    description: "Includes Uno board, sensors, and tutorial",
    category: "electronic-tools",
    subcategory: "kits",
    image: "assets/images/arduino-kit.jpg",
    tags: ["electrical-electronics"]
  },
  {
    id: 20,
    name: "Soldering Iron Station",
    price: 54.99,
    description: "60W adjustable temperature soldering kit",
    category: "electronic-tools",
    subcategory: "tools",
    image: "assets/images/soldering-station.jpg",
    tags: ["electrical-electronics"]
  },
  {
    id: 21,
    name: "Breadboard Jumper Wires (140pc)",
    price: 12.99,
    description: "Assorted lengths for circuit prototyping",
    category: "electronic-tools",
    subcategory: "components",
    image: "assets/images/jumper-wires.jpg",
    tags: ["electrical-electronics"]
  }
];