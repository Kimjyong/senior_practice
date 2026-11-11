/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  RotateCcw,
  Home,
  ArrowRight,
  Volume2,
  Award,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { HospitalReservationData, ScreenId } from '../types';
import { speechHelper } from '../utils/speech';

interface HospitalResultScreenProps {
  data: HospitalReservationData;
  onNavigate: (screen: ScreenId) => void;
  onRetry: () => void;
  soundEnabled: boolean;
}

export const HospitalResultScreen: React.FC<HospitalResultScreenProps> = ({
  data,
  onNavigate,
  onRetry,
  soundEnabled,
}) => {
  const congratText = `축하합니다! ${data.patientName}의 ${data.department} 진료 예약이 성공적으로 완료되었습니다. 예약 일시는 ${data.date} ${data.time}입니다. 참 잘하셨습니다!`;

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
      <div className="bg-emerald-600 text-white rounded-3xl p-6 sm:p-8 text-center shadow-lg space-y-3">
        <div className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <span className="px-4 py-1.5 bg-white/25 rounded-full text-sm sm:text-base font-black inline-block">
          모의 실습 성공 완료!
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">
          병원 진료 예약이 완료되었습니다!
        </h1>
        <p className="text-lg sm:text-xl text-emerald-100 font-medium">
          실제 병원 앱에서도 이와 똑같은 순서로 누르시면 혼자서도 예약하실 수 있습니다.
        </p>
      </div>

      {/* Realistic Hospital Appointment Ticket */}
      <div className="bg-white rounded-3xl border-3 border-slate-300 shadow-md overflow-hidden">
        {/* Ticket Top Ribbon */}
        <div className="bg-rose-700 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6" />
            <span className="text-xl font-black">모바일 진료 예약증 (가상)</span>
          </div>
          <span className="text-xs bg-rose-900/80 px-3 py-1 rounded-full font-bold">
            예약번호: {data.reservationId}
          </span>
        </div>

        {/* Ticket Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center pb-6 border-b-2 border-slate-200">
            <div className="text-sm font-bold text-slate-500 mb-1">의료기관명</div>
            <div className="text-3xl font-black text-slate-900">
              늘푸른 건강의원
            </div>
            <div className="text-lg text-rose-700 font-bold mt-1">
              {data.department} ({data.doctor})
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-800">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" /> 예약 날짜
              </div>
              <div className="text-xl font-black text-slate-900">{data.date}</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-rose-600" /> 진료 시간
              </div>
              <div className="text-xl font-black text-slate-900">{data.time}</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-600" /> 환자 정보
              </div>
              <div className="text-xl font-black text-slate-900">
                {data.patientName} (010-1234-5678)
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="text-sm font-bold text-slate-500">진료 사유</div>
              <div className="text-xl font-black text-slate-900">{data.symptom}</div>
            </div>
          </div>

          {/* Senior Guide Tip Box */}
          <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-base sm:text-lg text-amber-950 font-medium">
              <strong className="font-black text-amber-900">어르신 병원 방문 팁:</strong> 병원에 가실 때는 반드시 <strong>신분증(주민등록증 또는 운전면허증)</strong>을 챙겨가셔야 건강보험 할인을 받으실 수 있습니다.
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
          <span>다시 연습하기</span>
        </button>

        <button
          onClick={() => onNavigate('service_list')}
          className="min-h-[64px] py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-2 shadow-md transition-all"
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
