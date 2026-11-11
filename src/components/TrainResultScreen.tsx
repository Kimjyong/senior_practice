/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import {
  CheckCircle2,
  Train,
  Calendar,
  Clock,
  RotateCcw,
  Home,
  ArrowRight,
  QrCode,
  Ticket,
} from 'lucide-react';
import { TrainBookingData, ScreenId } from '../types';
import { speechHelper } from '../utils/speech';

interface TrainResultScreenProps {
  data: TrainBookingData;
  onNavigate: (screen: ScreenId) => void;
  onRetry: () => void;
  soundEnabled: boolean;
}

export const TrainResultScreen: React.FC<TrainResultScreenProps> = ({
  data,
  onNavigate,
  onRetry,
  soundEnabled,
}) => {
  const congratText = `축하합니다! ${data.departureStation}에서 ${data.arrivalStation}으로 가는 ${data.trainName} 기차표 예매가 완료되었습니다. 좌석은 ${data.carNumber} ${data.seatNumber}입니다. 참 잘하셨습니다!`;

  useEffect(() => {
    if (soundEnabled) {
      speechHelper.speak(congratText);
    }
    return () => {
      speechHelper.stop();
    };
  }, [soundEnabled, congratText]);

  return (
    <div className="space-y-8 py-4 sm:py-6 max-w-3xl mx-auto">
      {/* Celebration Header */}
      <div className="bg-blue-600 text-white rounded-3xl p-6 sm:p-8 text-center shadow-lg space-y-3">
        <div className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <span className="px-4 py-1.5 bg-white/25 rounded-full text-sm sm:text-base font-black inline-block">
          모의 실습 성공 완료!
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">
          기차표 모의 예매가 완료되었습니다!
        </h1>
        <p className="text-lg sm:text-xl text-blue-100 font-medium">
          역 창구에 줄 서지 않고도, 스마트폰으로 손쉽게 승차권을 발권할 수 있습니다.
        </p>
      </div>

      {/* Realistic KTX Mobile Boarding Pass */}
      <div className="bg-white rounded-3xl border-3 border-blue-400 shadow-xl overflow-hidden">
        {/* Ticket Header */}
        <div className="bg-blue-800 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ticket className="w-7 h-7 text-amber-300" />
            <div>
              <span className="text-2xl font-black tracking-tight">
                KTX 모바일 승차권
              </span>
              <span className="text-xs text-blue-200 block">한국철도공사 (코레일) 가상 티켓</span>
            </div>
          </div>
          <span className="text-xs bg-blue-950 px-3 py-1 rounded-full font-bold">
            승차권번호: {data.bookingId}
          </span>
        </div>

        {/* Departure & Arrival Big Banner */}
        <div className="p-6 sm:p-8 bg-blue-50/50 border-b-2 border-slate-200">
          <div className="flex items-center justify-around text-center">
            <div>
              <span className="text-sm font-bold text-slate-500 block">출발</span>
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {data.departureStation}
              </span>
              <span className="text-xl font-bold text-blue-700 block mt-1">
                {data.departureTime}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-bold mb-1">
                {data.trainName}
              </span>
              <div className="w-24 sm:w-36 h-1 bg-blue-300 relative my-2">
                <div className="absolute right-0 -top-1 w-3 h-3 border-t-2 border-r-2 border-blue-600 rotate-45"></div>
              </div>
              <span className="text-xs text-slate-500 font-bold">일반실</span>
            </div>

            <div>
              <span className="text-sm font-bold text-slate-500 block">도착</span>
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {data.arrivalStation}
              </span>
              <span className="text-xl font-bold text-blue-700 block mt-1">
                {data.arrivalTime}
              </span>
            </div>
          </div>
        </div>

        {/* Ticket Car & Seat Spotlight */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-5 bg-blue-50 rounded-2xl border-2 border-blue-200">
              <div className="text-sm font-bold text-slate-500 mb-1">타는 곳 (호차)</div>
              <div className="text-4xl font-black text-blue-900">{data.carNumber}</div>
            </div>
            <div className="p-5 bg-blue-50 rounded-2xl border-2 border-blue-200">
              <div className="text-sm font-bold text-slate-500 mb-1">좌석 번호</div>
              <div className="text-4xl font-black text-blue-900">{data.seatNumber}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-800">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" /> 탑승 일자
              </div>
              <div className="text-xl font-black text-slate-900">{data.date}</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-emerald-600" /> 승객 및 결제
              </div>
              <div className="text-xl font-black text-slate-900">
                어르신 {data.passengerCount}명 (0원 모의결제)
              </div>
            </div>
          </div>

          {/* QR Code Simulation */}
          <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-lg font-black text-slate-900 block">
                모바일 개찰구 QR 코드
              </span>
              <p className="text-sm text-slate-600">
                실제 기차 탈 때 이 QR 코드를 스마트폰으로 켜두시면 검표 승무원에게 바로 보여줄 수 있습니다.
              </p>
            </div>
            <div className="w-24 h-24 bg-white p-2 rounded-xl border-2 border-slate-300 flex items-center justify-center shrink-0 shadow-sm">
              <QrCode className="w-20 h-20 text-slate-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={onRetry}
          className="min-h-[64px] py-4 px-6 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-900 rounded-2xl font-black text-xl flex items-center justify-center gap-2 transition-all"
        >
          <RotateCcw className="w-6 h-6" />
          <span>다시 예매하기</span>
        </button>

        <button
          onClick={() => onNavigate('service_list')}
          className="min-h-[64px] py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <span>다른 생활 서비스</span>
          <ArrowRight className="w-6 h-6" />
        </button>

        <button
          onClick={() => onNavigate('home')}
          className="min-h-[64px] py-4 px-6 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <Home className="w-6 h-6" />
          <span>처음 화면으로</span>
        </button>
      </div>
    </div>
  );
};
