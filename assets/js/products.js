const products = [
  // A. Computer Science & Engineering
  {
    id: 1,
    name: "Programming Laptop (Dell XPS 15)",
    price: 1290000,
    description: "Intel i7, 16GB RAM, 512GB SSD - Ideal for coding and machine learning",
    category: "computers",
    subcategory: "laptops",
    image: "assets/images/dell.jpeg",
    tags: ["computer-science", "best-seller"]
  },
  {
    id: 2,
    name: "Lab Coat",
    price: 20000,
    description: "A white coat for laboratory safety",
    category: "lab-requirements",
    subcategory: "safety",
    image: "assets/images/lab coat.jpeg",
    tags: ["laboratory-science"]
  },
  {
    id: 3,
    name: "Mechanical Keyboard (Keychron K8)",
    price: 85000,
    description: "Tenkeyless mechanical keyboard with RGB lighting for programmers",
    category: "computers",
    subcategory: "accessories",
    image: "assets/images/keyboard.jpeg",
    tags: ["computer-science"]
  },
  {
    id: 4,
    name: "Raspberry Pi 4 Starter Kit",
    price: 119000,
    description: "Complete IoT development kit with case, power supply and accessories",
    category: "electronic-tools",
    subcategory: "kits",
    image: "assets/images/rasberry pi kit.png",
    tags: ["computer-science", "electronics"]
  },
  {
    id: 5,
    name: "GitHub Student Developer Pack",
    price: 6000,
    description: "Free access to premium developer tools for students",
    category: "software",
    subcategory: "developer-tools",
    image: "assets/images/git pack.png",
    tags: ["computer-science", "free"]
  },
  // B. Civil Engineering
  {
    id: 6,
    name: "Engineering Drafting Kit",
    price: 45000,
    description: "Complete set with compass, protractor, and technical pens",
    category: "workshop-tools",
    subcategory: "drafting",
    image: "assets/images/drawing board.png",
    tags: ["civil-engineering"]
  },
  {
    id: 7,
    name: "Construction Hard Hat",
    price: 25000,
    description: "ANSI-approved safety helmet with adjustable harness",
    category: "safety-gear",
    subcategory: "construction",
    image: "assets/images/construction hat.jpeg",
    tags: ["civil-engineering"]
  },
  {
    id: 8,
    name: "AutoCAD Civil 3D (Student License)",
    price: 5000,
    description: "Free 1-year license for civil engineering students",
    category: "software",
    subcategory: "cad",
    image: "assets/images/auto card.png",
    tags: ["civil-engineering", "free"]
  },
  {
    id: 9,
    name: "Laser Distance Measurer",
    price: 50000,
    description: "Digital laser measure with 100ft range for site surveys",
    category: "workshop-tools",
    subcategory: "measurement",
    image: "assets/images/laser measurer.jpeg",
    tags: ["civil-engineering"]
  },
  // C. Laboratory Science
  {
    id: 10,
    name: "Displaceable gloves",
    price: 75000,
    description: "Full box of disposable gloves for lab safety",
    category: "lab-requirements",
    subcategory: "safety",
    image: "assets/images/lab coat.jpeg",
    tags: ["laboratory-science"]
  },
  {
    id: 11,
    name: "Chemistry Glassware Set",
    price: 80000,
    description: "24-piece set with beakers, flasks and graduated cylinders",
    category: "lab-requirements",
    subcategory: "glassware",
    image: "assets/images/chem gkassware.jpeg",
    tags: ["laboratory-science"]
  },
  {
    id: 12,
    name: "Digital pH Meter",
    price: 67000,
    description: "Precision pH tester with ATC and replaceable electrode",
    category: "lab-requirements",
    subcategory: "instruments",
    image: "assets/images/ph meter.jpeg",
    tags: ["laboratory-science"]
  },
  {
    id: 13,
    name: "Molecular Model Kit",
    price: 120000,
    description: "126-piece organic chemistry modeling set",
    category: "reference-materials",
    subcategory: "kits",
    image: "assets/images/molecular model kit.jpeg",
    tags: ["laboratory-science"]
  },
  // D. Mechanical Engineering
  {
    id: 14,
    name: "Digital Caliper (0-6in)",
    price: 25000,
    description: "Stainless steel vernier caliper with LCD display",
    category: "workshop-tools",
    subcategory: "measurement",
    image: "assets/images/caliper.jpeg",
    tags: ["mechanical-engineering"]
  },
  {
    id: 15,
    name: "SolidWorks Student License",
    price: 10000,
    description: "1-year license for mechanical design software",
    category: "software",
    subcategory: "cad",
    image: "assets/images/solid works.png",
    tags: ["mechanical-engineering"]
  },
  {
    id: 16,
    name: "3D Printing Filament (PLA, 1kg)",
    price: 22500,
    description: "1.75mm diameter filament for prototyping",
    category: "workshop-tools",
    subcategory: "3d-printing",
    image: "assets/images/printing filament.jpeg",
    tags: ["mechanical-engineering"]
  },
  {
    id: 17,
    name: "Thermodynamics Lab Kit",
    price: 149000,
    description: "Complete heat transfer experiment set",
    category: "lab-requirements",
    subcategory: "mechanical",
    image: "assets/images/thermodynamic lab kit.jpeg",
    tags: ["mechanical-engineering"]
  },
  // E. Electrical & Electronics
  {
    id: 18,
    name: "Digital Multimeter",
    price: 35000,
    description: "Auto-ranging multimeter with continuity test",
    category: "electronic-tools",
    subcategory: "measurement",
    image: "assets/images/multimeter.jpeg",
    tags: ["electrical-electronics"]
  },
  {
    id: 19,
    name: "Arduino Uno Starter Kit",
    price: 79000,
    description: "Includes Uno board, sensors, and tutorial",
    category: "electronic-tools",
    subcategory: "kits",
    image: "assets/images/arduino kit.jpeg",
    tags: ["electrical-electronics"]
  },
  {
    id: 20,
    name: "Soldering Iron Station",
    price: 55000,
    description: "60W adjustable temperature soldering kit",
    category: "electronic-tools",
    subcategory: "tools",
    image: "assets/images/soldering iron station.jpeg",
    tags: ["electrical-electronics"]
  },
  {
    id: 21,
    name: "Breadboard Jumper Wires (140pc)",
    price: 15000,
    description: "Assorted lengths for circuit prototyping",
    category: "electronic-tools",
    subcategory: "components",
    image: "assets/images/jumper wires.jpeg",
    tags: ["electrical-electronics"]
  }
];