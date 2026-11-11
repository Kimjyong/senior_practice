/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HospitalDepartment {
  id: string;
  name: string;
  badge: string;
  description: string;
  doctor: string;
  room: string;
}

export const HOSPITAL_DEPARTMENTS: HospitalDepartment[] = [
  {
    id: 'internal',
    name: '내과',
    badge: '감기 · 소화 · 혈압',
    description: '혈압약 처방, 당뇨 관리, 감기, 배탈, 종합 건강상담',
    doctor: '박준호 전문의',
    room: '제1진료실 (1층)',
  },
  {
    id: 'orthopedics',
    name: '정형외과',
    badge: '무릎 · 허리 · 관절',
    description: '무릎 통증, 허리 디스크, 어깨 결림, 물리치료 상담',
    doctor: '이성민 원장',
    room: '제2진료실 (2층)',
  },
  {
    id: 'ophthalmology',
    name: '안과',
    badge: '눈 침침 · 백내장',
    description: '노안 검사, 백내장 정기검진, 안구건조증, 안약 처방',
    doctor: '최은경 전문의',
    room: '제3진료실 (2층)',
  },
  {
    id: 'ent',
    name: '이비인후과',
    badge: '귀 먹먹 · 코막힘',
    description: '보청기 청력 검사, 어지럼증, 목 통증, 비염',
    doctor: '김태영 전문의',
    room: '제4진료실 (1층)',
  },
  {
    id: 'dental',
    name: '치과',
    badge: '틀니 · 임플란트',
    description: '잇몸 치료, 틀니 조정, 정기 스케일링, 치아 통증',
    doctor: '정다은 원장',
    room: '치과센터 (3층)',
  },
  {
    id: 'oriental',
    name: '한의과',
    badge: '침구 · 뜸 · 온열',
    description: '어깨 결림 침 치료, 한방 물리치료, 기력 회복',
    doctor: '강민수 한의사',
    room: '한의진료실 (1층)',
  },
];

export const HOSPITAL_DATES = [
  { id: 'today', label: '오늘 (11월 11일 화)', dayBadge: '당일 진료' },
  { id: 'tomorrow', label: '내일 (11월 12일 수)', dayBadge: '추천' },
  { id: 'day_after', label: '모레 (11월 13일 목)', dayBadge: '여유' },
  { id: 'friday', label: '이번 주 금요일 (11월 14일)', dayBadge: '오전만' },
];

export const HOSPITAL_TIMES = [
  { id: '0930', time: '오전 09:30', status: '예약가능' },
  { id: '1030', time: '오전 10:30', status: '인기시간' },
  { id: '1130', time: '오전 11:30', status: '예약가능' },
  { id: '1400', time: '오후 02:00', status: '여유' },
  { id: '1530', time: '오후 03:30', status: '예약가능' },
  { id: '1630', time: '오후 04:30', status: '예약마감임박' },
];

// Train stations & schedules
export const TRAIN_STATIONS = [
  { id: 'seoul', name: '서울역', region: '수도권' },
  { id: 'yongsan', name: '용산역', region: '수도권' },
  { id: 'daejeon', name: '대전역', region: '충청권' },
  { id: 'dongdaegu', name: '동대구역', region: '영남권' },
  { id: 'busan', name: '부산역', region: '영남권' },
  { id: 'gwangju', name: '광주송정역', region: '호남권' },
  { id: 'gangneung', name: '강릉역', region: '강원권' },
  { id: 'jeonju', name: '전주역', region: '호남권' },
];

export const TRAIN_SCHEDULES = [
  {
    id: 'ktx_01',
    trainName: 'KTX 101호',
    departureTime: '09:20',
    arrivalTime: '11:58',
    duration: '2시간 38분',
    seatType: '일반실',
    standardPrice: 59800,
    seniorDiscountPrice: 41800, // 30% discount for seniors
    status: '잔여 14석',
  },
  {
    id: 'ktx_02',
    trainName: 'KTX 105호',
    departureTime: '10:40',
    arrivalTime: '13:15',
    duration: '2시간 35분',
    seatType: '일반실',
    standardPrice: 59800,
    seniorDiscountPrice: 41800,
    status: '잔여 8석',
  },
  {
    id: 'srt_01',
    trainName: 'SRT 307호',
    departureTime: '12:10',
    arrivalTime: '14:38',
    duration: '2시간 28분',
    seatType: '일반실',
    standardPrice: 52600,
    seniorDiscountPrice: 36800,
    status: '잔여 21석',
  },
  {
    id: 'ktx_03',
    trainName: 'KTX 113호',
    departureTime: '14:00',
    arrivalTime: '16:42',
    duration: '2시간 42분',
    seatType: '일반실',
    standardPrice: 59800,
    seniorDiscountPrice: 41800,
    status: '잔여 19석',
  },
];

export const TRAIN_SEATS = [
  { id: 'seat_3a', car: '3호차', seat: '7A', location: '창가 자리 (햇볕 따뜻)', type: '순방향' },
  { id: 'seat_3b', car: '3호차', seat: '7B', location: '통로 자리 (화장실 이동 편리)', type: '순방향' },
  { id: 'seat_4a', car: '4호차', seat: '5A', location: '창가 자리 (경치 감상)', type: '순방향' },
  { id: 'seat_4c', car: '4호차', seat: '5C', location: '통로 자리 (출입문 가까움)', type: '순방향' },
];

// Kiosk categories & menu
export interface KioskProduct {
  id: string;
  name: string;
  category: 'set' | 'meal' | 'drink' | 'dessert';
  price: number;
  description: string;
  calorie?: string;
  isPopular?: boolean;
}

export const KIOSK_CATEGORIES = [
  { id: 'popular', label: '⭐ 어르신 추천' },
  { id: 'set', label: '🍔 든든한 세트' },
  { id: 'meal', label: '🍲 단품 식사' },
  { id: 'drink', label: '☕ 따뜻한 음료' },
  { id: 'dessert', label: '🥟 간식/디저트' },
];

export const KIOSK_PRODUCTS: KioskProduct[] = [
  {
    id: 'p_01',
    name: '불고기버거 세트',
    category: 'set',
    price: 7500,
    description: '달콤한 불고기버거 + 감자튀김 + 사이다',
    calorie: '650 kcal',
    isPopular: true,
  },
  {
    id: 'p_02',
    name: '소고기 뚝배기 불고기',
    category: 'meal',
    price: 8500,
    description: '부드러운 소고기와 따뜻한 밥, 김치 제공',
    calorie: '580 kcal',
    isPopular: true,
  },
  {
    id: 'p_03',
    name: '새우버거 세트',
    category: 'set',
    price: 7200,
    description: '탱글탱글 새우 패티와 상큼한 타르타르 소스',
    calorie: '610 kcal',
  },
  {
    id: 'p_04',
    name: '전주 오색 비빔밥',
    category: 'meal',
    price: 8000,
    description: '신선한 나물과 계란후라이, 덜 매운 고추장',
    calorie: '520 kcal',
    isPopular: true,
  },
  {
    id: 'p_05',
    name: '따뜻한 둥굴레차',
    category: 'drink',
    price: 2500,
    description: '구수하고 속을 편안하게 해주는 건강 전통차',
    calorie: '5 kcal',
    isPopular: true,
  },
  {
    id: 'p_06',
    name: '따뜻한 아메리카노 커피',
    category: 'drink',
    price: 3000,
    description: '연하게 추출하여 목넘김이 부드러운 원두커피',
    calorie: '10 kcal',
  },
  {
    id: 'p_07',
    name: '시원한 식혜',
    category: 'drink',
    price: 3000,
    description: '국내산 엿기름으로 직접 빚은 달콤한 전통 식혜',
    calorie: '120 kcal',
  },
  {
    id: 'p_08',
    name: '달콤한 팥빙수',
    category: 'dessert',
    price: 5500,
    description: '국산 팥과 쫄깃한 인절미 떡이 듬뿍 들어간 빙수',
    calorie: '380 kcal',
    isPopular: true,
  },
  {
    id: 'p_09',
    name: '쫄깃한 찹쌀 단팥빵',
    category: 'dessert',
    price: 2200,
    description: '부드럽고 달지 않은 앙금이 가득 찬 단팥빵',
    calorie: '240 kcal',
  },
];
