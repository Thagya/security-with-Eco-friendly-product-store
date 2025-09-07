const WATCH_PRODUCTS = [
  {
    name: "Rolex Submariner",
    price: 8500,
    description: "Luxury diving watch with ceramic bezel",
    brand: "Rolex",
    category: "luxury",
    image: "rolex-submariner.jpg",
    features: ["Water resistant to 300m", "Ceramic bezel", "Automatic movement"],
    specifications: {
      waterResistance: "300m",
      material: "Stainless steel",
      movement: "Automatic",
      warranty: "5 years"
    }
  },
  {
    name: "Omega Speedmaster",
    price: 5200,
    description: "Professional moonwatch chronograph",
    brand: "Omega",
    category: "luxury", 
    image: "omega-speedmaster.jpg",
    features: ["Chronograph", "Tachymeter", "Manual winding"],
    specifications: {
      waterResistance: "50m",
      material: "Stainless steel",
      movement: "Manual",
      warranty: "5 years"
    }
  },
  {
    name: "Tag Heuer Formula 1",
    price: 1200,
    description: "Sports chronograph with steel case",
    brand: "Tag Heuer",
    category: "sports",
    image: "tag-heuer-f1.jpg",
    features: ["Chronograph", "Luminous hands", "Steel bracelet"],
    specifications: {
      waterResistance: "200m",
      material: "Stainless steel",
      movement: "Quartz",
      warranty: "2 years"
    }
  },
  {
    name: "Seiko Prospex",
    price: 350,
    description: "Automatic diving watch, 200m water resistance",
    brand: "Seiko",
    category: "sports",
    image: "seiko-prospex.jpg",
    features: ["Automatic movement", "Diving bezel", "Luminous markers"],
    specifications: {
      waterResistance: "200m",
      material: "Stainless steel",
      movement: "Automatic",
      warranty: "3 years"
    }
  },
  {
    name: "Casio G-Shock",
    price: 150,
    description: "Rugged digital watch with shock resistance",
    brand: "Casio",
    category: "casual",
    image: "casio-g-shock.jpg",
    features: ["Shock resistant", "Digital display", "Multiple alarms"],
    specifications: {
      waterResistance: "100m",
      material: "Resin",
      movement: "Digital",
      warranty: "2 years"
    }
  },
  {
    name: "Apple Watch Series 9",
    price: 400,
    description: "Smart watch with health monitoring",
    brand: "Apple",
    category: "smart",
    image: "apple-watch-s9.jpg",
    features: ["Heart rate monitor", "GPS", "Cellular connectivity"],
    specifications: {
      waterResistance: "50m",
      material: "Aluminum",
      movement: "Digital",
      warranty: "1 year"
    }
  }
];

const SRI_LANKA_DISTRICTS = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
  "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
  "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
  "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
  "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
];

const DELIVERY_TIMES = ["10 AM", "11 AM", "12 PM"];

const ORDER_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing', 
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

const PAYMENT_STATUSES = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500
};

module.exports = {
  WATCH_PRODUCTS,
  SRI_LANKA_DISTRICTS,
  DELIVERY_TIMES,
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  HTTP_STATUS
};
