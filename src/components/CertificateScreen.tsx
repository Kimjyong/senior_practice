/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import {
  Award,
  CheckCircle2,
  Circle,
  Home,
  ArrowRight,
  Share2,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { ScreenId } from '../types';
import { speechHelper } from '../utils/speech';

interface CertificateScreenProps {
  completedTasks: string[];
  onNavigate: (screen: ScreenId) => void;
  soundEnabled: boolean;
}

export const CertificateScreen: React.FC<CertificateScreenProps> = ({
  completedTasks,
  onNavigate,
  soundEnabled,
}) => {
  const allTasks = [
    { id: 'kakaotalk', label: '카카오톡 안부 메시지 보내기', category: '스마트폰 기초' },
    { id: 'photo_send', label: '예쁜 사진 찍고 가족에게 보내기', category: '스마트폰 기초' },
    { id: 'sms_reply', label: '문자 메시지 안전하게 답장하기', category: '스마트폰 기초' },
    { id: 'app_install', label: '필요한 앱 검색하고 설치하기', category: '스마트폰 기초' },
    { id: 'hospital', label: '동네 병원 진료 시간 예약하기', category: '생활 서비스' },
    { id: 'train', label: 'KTX 기차표 예매 및 좌석 선택', category: '생활 서비스' },
    { id: 'kiosk', label: '식당 무인 키오스크 음식 주문', category: '생활 서비스' },
  ];

  const completedCount = completedTasks.length;
  const isAllDone = completedCount >= allTasks.length;

  const certificateSpeech = isAllDone
    ? '김영수 어르신, 축하드립니다! 7가지 디지털 생활 실습을 모두 완료하셨습니다. 이제 일상생활에서 디지털 기기를 자신 있게 사용하실 수 있습니다!'
    : `현재 7가지 실습 중 ${completedCount}가지를 완료하셨습니다. 남은 실습도 차근차근 도전해 보세요!`;

  useEffect(() => {
    if (soundEnabled) {
      speechHelper.speak(certificateSpeech);
    }
    return () => {
      speechHelper.stop();
    };
  }, [soundEnabled, certificateSpeech]);

  return (
    <div className="space-y-8 py-4 sm:py-6 max-w-3xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-200">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            🏅 나의 디지털 배움 도장함
          </h1>
          <p className="text-lg text-slate-600">
            연습을 마칠 때마다 도장이 하나씩 찍힙니다.
          </p>
        </div>

        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-xl font-bold text-base transition-colors min-h-[48px]"
        >
          <Home className="w-5 h-5" />
          <span>처음으로</span>
        </button>
      </div>

      {/* Official Certificate Card */}
      <div className="bg-amber-50/40 rounded-3xl border-4 border-amber-400 p-6 sm:p-10 shadow-xl space-y-6 relative overflow-hidden">
        {/* Subtle Decorative Background Seal */}
        <div className="text-center space-y-2 border-b-2 border-amber-300 pb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md mb-2">
            <Award className="w-12 h-12" />
          </div>
          <span className="text-sm font-bold text-amber-800 tracking-widest uppercase">
            디지털 포용 실습 인증서
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950">
            디지털 생활 자립 인증서
          </h2>
          <div className="text-xl sm:text-2xl font-black text-blue-900 pt-1">
            수여자: 김영수 님 (만 72세)
          </div>
        </div>

        {/* Certificate Prose */}
        <p className="text-lg sm:text-xl text-slate-800 leading-relaxed text-center font-medium">
          위 어르신은 디지털 생활 도우미를 통해 스마트폰 기초 사용법과
          병원 예약, 기차표 예매, 무인 키오스크 주문 과정을 성실히 실습하여
          자립적인 디지털 생활 역량을 훌륭히 습득하셨음을 증명합니다.
        </p>

        {/* Checklist Stamps */}
        <div className="space-y-3 pt-2">
          <div className="text-base font-black text-slate-900 flex items-center justify-between">
            <span>실습 이수 현황 ({completedCount} / 7)</span>
            <span className="text-amber-700 font-bold">
              {Math.round((completedCount / 7) * 100)}% 달성
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allTasks.map((task) => {
              const done = completedTasks.includes(task.id);
              return (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                    done
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-500 opacity-75'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {done ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300 shrink-0" />
                    )}
                    <span className="font-bold text-base truncate">{task.label}</span>
                  </div>

                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold shrink-0 ${
                      done
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {done ? '이수완료' : '도전하기'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Date and Seal */}
        <div className="pt-6 border-t-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-slate-600 text-sm font-bold">
            실습 플랫폼: 어르신 디지털 생활 도우미<br />
            발급일: 2026년 11월 11일
          </div>

          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full border-4 border-rose-600 text-rose-600 flex items-center justify-center font-black text-sm rotate-[-12deg] shadow-sm">
              참잘했어요
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate('learn_list')}
          className="min-h-[64px] py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <span>스마트폰 배우기 더 연습하기</span>
          <ArrowRight className="w-6 h-6" />
        </button>

        <button
          onClick={() => onNavigate('service_list')}
          className="min-h-[64px] py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <span>생활 서비스 더 연습하기</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
