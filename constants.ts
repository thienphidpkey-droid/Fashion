import { Product, Review } from './types';

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Áo Sơ Mi Lụa Tự Nhiên",
    price: "1.850.000₫",
    image: "https://picsum.photos/seed/silkshirt/600/800",
    category: "Áo",
    tag: "Best Seller"
  },
  {
    id: 2,
    name: "Váy Midi Xếp Ly",
    price: "2.250.000₫",
    image: "https://picsum.photos/seed/midiskirt/600/800",
    category: "Váy"
  },
  {
    id: 3,
    name: "Blazer Dáng Rộng",
    price: "3.500.000₫",
    image: "https://picsum.photos/seed/blazer/600/800",
    category: "Áo Khoác",
    tag: "Trending"
  },
  {
    id: 4,
    name: "Quần Tây Ống Suông",
    price: "1.650.000₫",
    image: "https://picsum.photos/seed/trousers/600/800",
    category: "Quần"
  }
];

export const NEW_ARRIVALS: Product[] = [
  {
    id: 5,
    name: "Đầm Lụa Dạ Tiệc",
    price: "4.200.000₫",
    image: "https://picsum.photos/seed/dress1/500/700",
    category: "Đầm"
  },
  {
    id: 6,
    name: "Túi Xách Da Mềm",
    price: "5.800.000₫",
    image: "https://picsum.photos/seed/bag1/500/700",
    category: "Phụ Kiện"
  },
  {
    id: 7,
    name: "Giày Cao Gót Mũi Nhọn",
    price: "2.100.000₫",
    image: "https://picsum.photos/seed/shoes1/500/700",
    category: "Giày"
  },
  {
    id: 8,
    name: "Khăn Choàng Cashmere",
    price: "1.200.000₫",
    image: "https://picsum.photos/seed/scarf1/500/700",
    category: "Phụ Kiện"
  },
  {
    id: 9,
    name: "Áo Len Cổ Lọ",
    price: "1.450.000₫",
    image: "https://picsum.photos/seed/sweater1/500/700",
    category: "Áo Len"
  }
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 1,
    author: "Nguyễn Thu Hà",
    role: "Khách hàng thân thiết",
    rating: 5,
    content: "Chất lượng vải tuyệt vời, đường may tỉ mỉ. Tôi đã mua 3 chiếc váy ở đây và hoàn toàn hài lòng."
  },
  {
    id: 2,
    author: "Trần Minh Ngọc",
    role: "Fashion Blogger",
    rating: 5,
    content: "Phong cách tối giản nhưng rất sang trọng. Dịch vụ tư vấn AI thực sự hữu ích khi chọn size."
  },
  {
    id: 3,
    author: "Lê Thanh Hương",
    role: "Doanh nhân",
    rating: 5,
    content: "Giao hàng nhanh, đóng gói đẹp như một món quà. Chắc chắn sẽ ủng hộ Lumière dài dài."
  }
];

export const NAV_LINKS = [
  { name: "Trang Chủ", href: "#" },
  { name: "Bộ Sưu Tập", href: "#collection" },
  { name: "Sản Phẩm", href: "#products" },
  { name: "Về Chúng Tôi", href: "#about" },
];