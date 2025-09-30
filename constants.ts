
import type { Landmark } from './types';

// Hệ thống chứng nhận theo cấp độ
export const CERTIFICATE_LEVELS = {
  BRONZE: {
    minLandmarks: 5,
    minPoints: 150,
    name: 'Người Khám Phá',
    nameEn: 'Explorer',
    color: '#CD7F32',
    bgColor: '#FDF4E6',
    description: 'Đã khám phá 5 địa điểm tại Núi Bà Đen',
    icon: '🥉'
  },
  SILVER: {
    minLandmarks: 10,
    minPoints: 300,
    name: 'Hành Giả Tâm Linh',
    nameEn: 'Spiritual Pilgrim',
    color: '#C0C0C0',
    bgColor: '#F8F9FA',
    description: 'Đã hoàn thành hành trình tâm linh tại 10 địa điểm',
    icon: '🥈'
  },
  GOLD: {
    minLandmarks: 15,
    minPoints: 520,
    name: 'Bậc Thầy Núi Bà Đen',
    nameEn: 'Ba Den Mountain Master',
    color: '#FFD700',
    bgColor: '#FFFBF0',
    description: 'Đã chinh phục toàn bộ 15 địa điểm linh thiêng',
    icon: '🏆'
  }
} as const;

// Hàm xác định cấp độ chứng nhận
export const getCertificateLevel = (landmarkCount: number, totalPoints: number) => {
  if (landmarkCount >= CERTIFICATE_LEVELS.GOLD.minLandmarks && totalPoints >= CERTIFICATE_LEVELS.GOLD.minPoints) {
    return { level: 'GOLD', ...CERTIFICATE_LEVELS.GOLD };
  }
  if (landmarkCount >= CERTIFICATE_LEVELS.SILVER.minLandmarks && totalPoints >= CERTIFICATE_LEVELS.SILVER.minPoints) {
    return { level: 'SILVER', ...CERTIFICATE_LEVELS.SILVER };
  }
  if (landmarkCount >= CERTIFICATE_LEVELS.BRONZE.minLandmarks && totalPoints >= CERTIFICATE_LEVELS.BRONZE.minPoints) {
    return { level: 'BRONZE', ...CERTIFICATE_LEVELS.BRONZE };
  }
  return null;
};

// Hằng số điểm tối thiểu để nhận chứng nhận (Bronze level)
export const MIN_POINTS_FOR_CERTIFICATE = CERTIFICATE_LEVELS.BRONZE.minPoints;

// Tổng số landmarks
export const TOTAL_LANDMARKS = 15;

// Dữ liệu mẫu cho các điểm check-in tại Núi Bà Đen
export const LANDMARKS: Landmark[] = [
  {
    id: 'ga-ba-den',
    name: 'Ga Bà Đen',
    position: [11.3637804966, 106.1730066034],
    description: 'Nhà ga cáp treo Sun World Ba Den Mountain, giữ kỷ lục Guinness "Nhà ga cáp treo lớn nhất thế giới", là tác phẩm kiến trúc nghệ thuật độc đáo.',
    points: 25,
    image: 'https://badenmountain.sunworld.vn/wp-content/uploads/2020/01/NDP_9291-1.jpg'
  },
  {
    id: 'chua-ba',
    name: 'Chùa Linh Sơn Tiên Thạch - Chùa Bà',
    position: [11.375195528, 106.1791566401],
    description: 'Ngôi chùa lâu đời nhất tại Tây Ninh, điểm đến tâm linh quan trọng gắn liền với truyền thuyết về Linh Sơn Thánh Mẫu linh thiêng.',
    points: 40,
    image: 'https://mia.vn/media/uploads/blog-du-lich/kinh-nghiem-di-le-chua-ba-den-kham-pha-de-nhat-thien-son-4-1661605355.jpg'
  },
  {
    id: 'dien-ba-linh-son',
    name: 'Điện Bà Linh Sơn Thánh Mẫu',
    position: [11.3750022581, 106.1789836376],
    description: 'Nơi thờ chính Linh Sơn Thánh Mẫu - vị thần bảo hộ của Núi Bà Đen. Không gian linh thiêng, trang trọng thu hút đông đảo du khách chiêm bái.',
    points: 45,
    image: 'https://mia.vn/media/uploads/blog-du-lich/vieng-tham-dien-ba-linh-son-thanh-mau-noi-tieng-linh-thieng-tai-tay-ninh-04-1662477447.jpeg'
  },
  {
    id: 'chua-hang',
    name: 'Chùa Linh Sơn Long Châu - Chùa Hang',
    position: [11.3746951585, 106.1778512887],
    description: 'Ngôi chùa cổ kính ẩn mình trong hang động tự nhiên, không gian thanh tịnh huyền bí mang đến trải nghiệm tâm linh độc đáo.',
    points: 35,
    image: 'https://badenmountain.sunworld.vn/wp-content/uploads/2024/02/8-mot-goc-khuon-vien-truoc-chua-hang.jpg'
  },
  {
    id: 'tuong-phat-ba',
    name: 'Tượng Phật Bà Tây Bổ Đà Sơn',
    position: [11.3825063325, 106.1710601114],
    description: 'Tượng Phật Bà bằng đồng cao nhất châu Á (72m, đúc từ 170 tấn đồng đỏ) tọa lạc ở độ cao gần 1000m, là biểu tượng tâm linh nổi bật.',
    points: 50,
    image: 'https://nld.mediacdn.vn/291774122806476800/2023/3/25/photo-4-1679748872398886408848.jpg'
  },
  {
    id: 'ga-van-son',
    name: 'Ga Vân Sơn',
    position: [11.3817246806, 106.1718973407],
    description: 'Nhà ga cáp treo hiện đại kết nối chân núi và đỉnh núi, tích hợp đầy đủ tiện ích: khu mua sắm, nhà hàng và khu vực ngắm cảnh.',
    points: 30,
    image: 'https://badenmountain.sunworld.vn/wp-content/uploads/2020/07/6C9A0424-770x500.jpg'
  },
  {
    id: 'cong-troi',
    name: 'Cổng Trời',
    position: [11.3817577902, 106.1709453945],
    description: 'Điểm check-in nổi tiếng với khung cảnh tuyệt đẹp để ngắm bình minh, săn mây và tận hưởng không gian bao la của đất trời.',
    points: 35,
    image: 'https://images2.thanhnien.vn/528068263637045248/2023/2/5/nui-ba-den-ram-thang-gieng-4-16756025646931800405729.jpg'
  },
  {
    id: 'dinh-nui-986m',
    name: 'Chóp đỉnh Núi Bà Đen 986m',
    position: [11.3811039262, 106.171258092],
    description: 'Cột mốc chinh phục "Nóc nhà Nam Bộ 986m" - điểm cao nhất của hành trình, nơi du khách tự hào về thành tựu chinh phục đỉnh núi.',
    points: 50,
    image: 'https://vietrektravel.com/ckeditor/plugins/fileman/Uploads/vietrel-travel/bai-viet/kinh-nghiem-trekking-leo-nui-ba-den/leo-nui-ba-den.jpg'
  },
  {
    id: 'chua-trung',
    name: 'Chùa Linh Sơn Phước Trung - Chùa Trung',
    position: [11.3645463128, 106.1778267358],
    description: 'Ngôi chùa cổ kính - điểm dừng chân đầu tiên trong hành trình tâm linh tại Núi Bà Đen, mang đến không gian thanh tịnh an yên.',
    points: 25,
    image: 'https://mia.vn/media/uploads/blog-du-lich/chua-linh-son-phuoc-trung-tu-1741745383.jpg'
  },
  {
    id: 'tru-kinh-bat-nha',
    name: 'Trụ Kinh Bát Nhã',
    position: [11.3827376787, 106.1722225585],
    description: 'Trụ kinh Bát Nhã bằng đá granite đen cao 19,8m, khắc bộ kinh Bát Nhã bằng chữ Tây Tạng thể hiện sự uy nghi linh thiêng.',
    points: 40,
    image: 'https://badenmountain.sunworld.vn/wp-content/uploads/2023/10/Ban-sao-cua-Vu-Lan-Nui-Ba-Den-53-1024x683.jpg'
  },
  {
    id: 'phat-di-lac',
    name: 'Tượng Phật Di Lặc',
    position: [11.3829946753, 106.1733733608],
    description: 'Tượng Phật Di Lặc bằng đá sa thạch lớn nhất thế giới, mang ý nghĩa niềm vui và hạnh phúc, là điểm cầu may mắn của du khách.',
    points: 40,
    image: 'https://badenmountain.sunworld.vn/wp-content/uploads/2024/04/8-phat-cuoi.png'
  },
  {
    id: 'dong-kim-quang',
    name: 'Căn cứ Động Kim Quang',
    position: [11.3658945467, 106.1745637433],
    description: 'Di tích lịch sử quan trọng - căn cứ cách mạng của Huyện Ủy Tòa Thánh trong thời kỳ kháng chiến, ghi dấu chiến công oanh liệt.',
    points: 30,
    image: 'https://i.ex-cdn.com/phatgiao.org.vn/files/content/2023/03/24/dong-kim-quang-1612.jpg'
  },
  {
    id: 'chua-hoa-dong',
    name: 'Chùa Hoà Đồng',
    position: [11.376732986, 106.1805205893],
    description: 'Ngôi chùa tọa lạc ở lưng chừng núi với tầm nhìn bao quát xuống đồng bằng xanh mướt, không gian thanh tịnh và kiến trúc độc đáo.',
    points: 30,
    image: 'https://badenmountain.sunworld.vn/wp-content/uploads/2020/01/5_Chua_Hoa_Dong-1.jpg'
  },
  {
    id: 'nha-hang-tam-an',
    name: 'Nhà hàng Tâm An',
    position: [11.3818727118, 106.1724269469],
    description: 'Nhà hàng buffet trên đỉnh núi phục vụ hơn 80 món ăn đa dạng từ ẩm thực địa phương đến quốc tế trong không gian tầm nhìn bao quát.',
    points: 20,
    image: 'https://badenmountain.sunworld.vn/wp-content/uploads/2021/03/96-1-1024x683.jpg'
  },
  {
    id: 'trung-tam-phat-giao',
    name: 'Trung tâm triển lãm Phật giáo',
    position: [11.3826119176, 106.1713646175],
    description: 'Nơi trưng bày hiện vật mô phỏng và tư liệu quý giá về Phật giáo, giúp du khách hiểu sâu về lịch sử, triết lý và nghệ thuật Phật giáo.',
    points: 25,
    image: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2022/2/4/1001144/Anh-CV2.jpg'
  }
];


