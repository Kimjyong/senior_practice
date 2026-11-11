/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FontSizeLevel = 'normal' | 'large' | 'xlarge';

export type ScreenId =
  | 'home'
  | 'learn_list'
  | 'learn_detail'
  | 'service_list'
  | 'hospital'
  | 'hospital_result'
  | 'train'
  | 'train_result'
  | 'kiosk'
  | 'kiosk_result'
  | 'certificate';

export interface LearningStep {
  stepNumber: number;
  title: string;
  instruction: string;
  audioText: string;
  tip?: string;
  phoneScreen: {
    appTitle: string;
    screenType: 'chat_list' | 'chat_room' | 'camera' | 'album' | 'sms_list' | 'sms_room' | 'store_home' | 'store_search' | 'store_detail';
    targetActionLabel: string;
    targetDescription: string;
  };
}

export interface LearningCourse {
  id: string;
  title: string;
  subtitle: string;
  iconName: 'MessageSquare' | 'Camera' | 'Mail' | 'Download';
  badgeColor: string;
  estimatedMinutes: number;
  steps: LearningStep[];
}

export interface HospitalReservationData {
  department: string;
  doctor: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  symptom: string;
  reservationId: string;
}

export interface TrainBookingData {
  departureStation: string;
  arrivalStation: string;
  date: string;
  trainName: string;
  departureTime: string;
  arrivalTime: string;
  seatType: string;
  seatNumber: string;
  carNumber: string;
  passengerCount: number;
  totalPrice: number;
  bookingId: string;
}

export interface KioskCartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface KioskOrderData {
  orderNumber: string;
  orderType: 'store' | 'togo';
  paymentMethod: 'card' | 'pay' | 'cash';
  items: KioskCartItem[];
  totalPrice: number;
  orderTime: string;
}
