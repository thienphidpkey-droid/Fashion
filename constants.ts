import { Product, Review } from './types';

// Helper to generate Pollinations.ai image URL
const getPollinationsImage = (prompt: string, width: number = 800, height: number = 1000): string => {
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true`;
};

// Helper to generate random price
const getRandomPrice = (min: number, max: number): string => {
  const price = Math.floor(Math.random() * (max - min + 1) + min) * 1000;
  return price.toLocaleString('vi-VN') + ' VND';
};

// Banner Images (using high quality fashion photography prompts)
export const BANNER_IMAGES = {
  womensJackets: getPollinationsImage('fashion editorial shot of woman wearing luxury tweed jacket in paris street, high fashion, 8k', 800, 1200),
  womensTops: getPollinationsImage('fashion model wearing elegant silk blouse, studio lighting, minimal background, vogue style', 800, 1200),
  womensBottoms: getPollinationsImage('woman wearing stylish wide leg trousers walking on street, street style photography, fashion week', 800, 1200),
  mensOutfit: getPollinationsImage('handsome man wearing bespoke suit standing in modern office, luxury lifestyle, men fashion', 800, 1200),
  girlsOutfit: getPollinationsImage('cute little girl wearing pink princess dress in a garden, soft lighting, dreamy atmosphere', 800, 1200),
  boysOutfit: getPollinationsImage('cool little boy wearing trendy streetwear, urban background, kids fashion photography', 800, 1200),
};

// 1. Women's Jackets (16 items)
const jacketNames = [
  "Áo Khoác Tweed Xanh Cốm", "Áo Khoác Dạ Ngắn", "Blazer Dáng Suông", "Áo Khoác Len Nữ",
  "Áo Khoác Phao Dáng Dài", "Áo Vest Nữ Công Sở", "Áo Khoác Jeans Lửng", "Áo Khoác Kaki Dáng Măng Tô",
  "Áo Khoác Tweed Đen", "Áo Khoác Dạ Lông Cừu", "Áo Khoác Blazer Kẻ", "Áo Khoác Da Biker",
  "Áo Khoác Bomber Nữ", "Áo Khoác Cardigan Len", "Áo Khoác Gió Thể Thao", "Áo Khoác Kimono Cách Điệu"
];

export const WOMENS_JACKETS: Product[] = Array.from({ length: 16 }, (_, i) => ({
  id: `wj-${i + 1}`,
  name: jacketNames[i],
  price: getRandomPrice(800, 3000),
  image: getPollinationsImage(`woman wearing ${jacketNames[i].toLowerCase().replace(/ /g, ' ')}, fashion photography, high quality`),
  category: 'Women\'s Jackets',
  tag: i === 0 ? 'Best Seller' : i === 2 ? 'New' : undefined
}));

// 2. Women's Tops (16 items)
const topNames = [
  "Áo Sơ Mi Lụa Tơ Tằm", "Áo Kiểu Cổ Nơ", "Áo Thun Cotton Premium", "Áo Len Cổ Lọ",
  "Áo Croptop Tay Phồng", "Áo Hai Dây Lụa", "Áo Trễ Vai Quyến Rũ", "Áo Sơ Mi Kẻ Sọc",
  "Áo Peplum Sang Trọng", "Áo Voan Họa Tiết", "Áo Thun Dài Tay", "Áo Sát Nách Thiết Kế",
  "Áo Corset Thời Thượng", "Áo Yếm Cách Điệu", "Áo Polo Nữ", "Áo Hoodie Nữ"
];

export const WOMENS_TOPS: Product[] = Array.from({ length: 16 }, (_, i) => ({
  id: `wt-${i + 1}`,
  name: topNames[i],
  price: getRandomPrice(300, 1500),
  image: getPollinationsImage(`woman wearing ${topNames[i].toLowerCase().replace(/ /g, ' ')}, fashion photography, studio shot`),
  category: 'Women\'s Tops',
  tag: i === 1 ? 'Trending' : undefined
}));

// 3. Women's Bottoms (16 items)
const bottomNames = [
  "Quần Tây Ống Rộng", "Chân Váy Xếp Ly", "Quần Jeans Ống Đứng", "Chân Váy Bút Chì",
  "Quần Short Dạ", "Chân Váy Chữ A", "Quần Culottes", "Chân Váy Midi",
  "Quần Baggy Công Sở", "Chân Váy Jean", "Quần Legging Da", "Chân Váy Maxi",
  "Quần Kaki Nữ", "Chân Váy Đuôi Cá", "Quần Jogger Nữ", "Chân Váy Tầng"
];

export const WOMENS_BOTTOMS: Product[] = Array.from({ length: 16 }, (_, i) => ({
  id: `wb-${i + 1}`,
  name: bottomNames[i],
  price: getRandomPrice(400, 1800),
  image: getPollinationsImage(`woman wearing ${bottomNames[i].toLowerCase().replace(/ /g, ' ')}, fashion photography, full body shot`),
  category: 'Women\'s Bottoms',
  tag: i === 3 ? 'Sale' : undefined
}));

// 4. Men's Outfit (16 items)
const mensNames = [
  "Áo Vest Nam Lịch Lãm", "Áo Sơ Mi Trắng", "Quần Tây Nam", "Áo Polo Nam",
  "Áo Thun Basic", "Quần Jeans Nam", "Áo Khoác Bomber Nam", "Áo Len Nam",
  "Bộ Suit Nam Cao Cấp", "Áo Khoác Da Nam", "Quần Kaki Nam", "Áo Hoodie Nam",
  "Áo Khoác Gió Nam", "Quần Short Nam", "Áo Gile Nam", "Áo Blazer Nam"
];

export const MENS_OUTFIT: Product[] = Array.from({ length: 16 }, (_, i) => ({
  id: `mo-${i + 1}`,
  name: mensNames[i],
  price: getRandomPrice(500, 5000),
  image: getPollinationsImage(`man wearing ${mensNames[i].toLowerCase().replace(/ /g, ' ')}, men fashion, masculine style`),
  category: 'Men\'s Fashion',
  tag: i === 0 ? 'Hot' : undefined
}));

// 5. Girls' Outfit (16 items)
const girlsNames = [
  "Đầm Công Chúa Bé Gái", "Áo Dài Cách Tân Bé Gái", "Váy Xòe Dễ Thương", "Set Bộ Bé Gái",
  "Áo Khoác Lông Bé Gái", "Quần Legging Bé Gái", "Áo Len Bé Gái", "Chân Váy Tutu",
  "Đầm Nhung Đỏ", "Áo Sơ Mi Bé Gái", "Quần Jeans Bé Gái", "Áo Thun Hình Thú",
  "Đầm Voan Hoa", "Set Yếm Bé Gái", "Áo Khoác Dạ Bé Gái", "Đầm Suông Bé Gái"
];

export const GIRLS_OUTFIT: Product[] = Array.from({ length: 16 }, (_, i) => ({
  id: `go-${i + 1}`,
  name: girlsNames[i],
  price: getRandomPrice(200, 1000),
  image: getPollinationsImage(`little girl wearing ${girlsNames[i].toLowerCase().replace(/ /g, ' ')}, cute kids fashion, bright colors`),
  category: 'Kids - Girls',
  tag: i === 2 ? 'New Arrival' : undefined
}));

// 6. Boys' Outfit (16 items)
const boysNames = [
  "Áo Vest Bé Trai", "Áo Dài Cách Tân Bé Trai", "Set Bộ Công Tử", "Áo Thun Polo Bé Trai",
  "Quần Jeans Bé Trai", "Áo Khoác Bomber Bé Trai", "Áo Sơ Mi Bé Trai", "Quần Short Kaki",
  "Áo Len Bé Trai", "Áo Hoodie Bé Trai", "Quần Jogger Bé Trai", "Áo Khoác Gió Bé Trai",
  "Set Vest Bé Trai", "Áo Thun Hình Siêu Nhân", "Quần Yếm Bé Trai", "Áo Gile Bé Trai"
];

export const BOYS_OUTFIT: Product[] = Array.from({ length: 16 }, (_, i) => ({
  id: `bo-${i + 1}`,
  name: boysNames[i],
  price: getRandomPrice(200, 1000),
  image: getPollinationsImage(`little boy wearing ${boysNames[i].toLowerCase().replace(/ /g, ' ')}, cool kids fashion, studio shot`),
  category: 'Kids - Boys',
  tag: i === 4 ? 'Best Seller' : undefined
}));

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Nguyễn Thu Hà",
    rating: 5,
    comment: "Sản phẩm rất đẹp, chất lượng vải tuyệt vời. Giao hàng nhanh và đóng gói cẩn thận.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    name: "Trần Minh Tuấn",
    rating: 5,
    comment: "Mua tặng vợ mà vợ khen nức nở. Form dáng chuẩn, đường may tỉ mỉ. Sẽ ủng hộ shop dài dài.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    name: "Lê Thị Mai",
    rating: 4,
    comment: "Áo đẹp y hình, nhân viên tư vấn nhiệt tình. Tuy nhiên ship hơi lâu một chút do tắc biên.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg"
  }
];

export const NAV_LINKS = [
  {
    name: "Nữ",
    href: "/category/womens-jackets", // Default to jackets for now, or could be a general women's page
    submenu: [
      { name: "Áo Khoác", href: "/category/womens-jackets" },
      { name: "Áo", href: "/category/womens-tops" },
      { name: "Quần & Váy", href: "/category/womens-bottoms" }
    ]
  },
  {
    name: "Nam",
    href: "/category/mens-outfit",
    submenu: [
      { name: "Outfit Nam", href: "/category/mens-outfit" }
    ]
  },
  {
    name: "Trẻ Em",
    href: "/category/girls-outfit",
    submenu: [
      { name: "Bé Gái", href: "/category/girls-outfit" },
      { name: "Bé Trai", href: "/category/boys-outfit" }
    ]
  },
  { name: "Bộ Sưu Tập", href: "#collections" }, // Keep as anchor or create page if needed
  { name: "Phụ Kiện", href: "#accessories" },
];