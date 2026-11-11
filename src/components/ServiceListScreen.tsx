/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import {
  Heart,
  Train,
  Utensils,
  ArrowRight,
  ArrowLeft,
  Volume2,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { ScreenId } from '../types';
import { speechHelper } from '../utils/speech';

interface ServiceListScreenProps {
  onNavigate: (screen: ScreenId) => void;
  completedTasks: string[];
  soundEnabled: boolean;
}

export const ServiceListScreen: React.FC<ServiceListScreenProps> = ({
  onNavigate,
  completedTasks,
  soundEnabled,
}) => {
  const guideText =
    '생활 서비스 가상 체험입니다. 병원 예약, 기차표 예매, 식당 키오스크 중 연습하고 싶은 곳을 눌러보세요. 실제 결제되지 않는 안전한 연습장입니다.';

  useEffect(() => {
    if (soundEnabled) {
      speechHelper.speak(guideText);
    }
    return () => {
      speechHelper.stop();
    };
  }, [soundEnabled]);

  const services = [
    {
      id: 'hospital',
      title: '병원 진료 예약하기',
      subtitle: '동네 병원 진료과목과 원하는 날짜·시간을 골라 예약하는 연습',
      icon: <Heart className="w-9 h-9" />,
      color: 'bg-rose-600',
      badge: '건강 지킴이',
      tags: ['내과·정형외과 등', '날짜·시간 선택', '모바일 예약증 발급'],
      screen: 'hospital' as ScreenId,
    },
    {
      id: 'train',
      title: '기차표(KTX) 예매하기',
      subtitle: '출발역과 도착역을 정하고, 편안한 창가 좌석을 직접 골라보는 연습',
      icon: <Train className="w-9 h-9" />,
      color: 'bg-blue-600',
      badge: '자유로운 여행',
      tags: ['서울·부산 등 역 선택', '어르신 할인 조회', '모바일 승차권 발권'],
      screen: 'train' as ScreenId,
    },
    {
      id: 'kiosk',
      title: '식당 무인 키오스크 주문하기',
      subtitle: '패스트푸드점이나 분식집 기계에서 메뉴를 담고 모의 결제해보는 연습',
      icon: <Utensils className="w-9 h-9" />,
      color: 'bg-amber-600',
      badge: '어르신 맛집 주문',
      tags: ['메뉴 담기·수량 조절', '매장식사/포장 선택', '주문 영수증 발급'],
      screen: 'kiosk' as ScreenId,
    },
  ];

  return (
    <div className="space-y-6 py-4 sm:py-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-emerald-700 font-black text-base sm:text-lg">
              2단계 / 필수 3대 서비스
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            디지털 생활 서비스 가상 체험
          </h1>
          <p className="text-lg sm:text-xl text-slate-600">
            실제 결제나 예약 걱정 없이 100% 모의 화면에서 마음 편히 실습하세요.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => speechHelper.speak(guideText)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-50 border-2 border-blue-300 rounded-xl text-blue-900 font-bold text-base hover:bg-blue-100 transition-colors min-h-[48px]"
            aria-label="안내 음성 듣기"
          >
            <Volume2 className="w-5 h-5 text-blue-600" />
            <span>음성 안내</span>
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-xl font-bold text-base transition-colors min-h-[48px]"
            aria-label="처음 화면으로 돌아가기"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>처음으로</span>
          </button>
        </div>
      </div>

      {/* Safety Reassurance Notice */}
      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 flex items-center gap-3 text-emerald-950 font-bold text-base sm:text-lg">
        <ShieldCheck className="w-7 h-7 text-emerald-700 shrink-0" />
        <span>
          이곳의 모든 예약과 주문은 가상 시뮬레이션입니다. 결제 금액은 0원이며 실제 카드 번호나 개인정보를 묻지 않습니다.
        </span>
      </div>

      {/* 3 Major Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((svc) => {
          const isDone = completedTasks.includes(svc.id);
          return (
            <div
              key={svc.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 border-3 transition-all flex flex-col justify-between shadow-sm hover:shadow-md ${
                isDone
                  ? 'border-emerald-500 bg-emerald-50/20'
                  : 'border-slate-300 hover:border-emerald-600'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-md ${svc.color}`}
                  >
                    {svc.icon}
                  </div>
                  {isDone ? (
                    <span className="flex items-center gap-1 text-emerald-800 text-sm sm:text-base font-black bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" /> 실습 완료
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-slate-100 text-slate-800 text-sm font-bold rounded-lg">
                      {svc.badge}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                  {svc.title}
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed font-medium">
                  {svc.subtitle}
                </p>

                {/* Features List */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 mb-6 space-y-1.5 text-sm sm:text-base text-slate-700">
                  {svc.tags.map((tag, idx) => (
                    <div key={idx} className="flex items-center gap-2 font-semibold text-slate-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate(svc.screen)}
                className={`w-full min-h-[64px] py-4 px-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-md transition-all ${
                  isDone
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                }`}
                aria-label={`${svc.title} 실습 시작하기`}
              >
                <span>{isDone ? '다시 실습하기' : '체험 시작하기'}</span>
                <ArrowRight className="w-7 h-7" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
