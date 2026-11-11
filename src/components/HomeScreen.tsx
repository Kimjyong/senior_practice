/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import {
  Smartphone,
  Store,
  ShieldCheck,
  Award,
  ArrowRight,
  Volume2,
  CheckCircle2,
  HeartHandshake,
} from 'lucide-react';
import { ScreenId } from '../types';
import { speechHelper } from '../utils/speech';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  completedTasks: string[];
  soundEnabled: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  completedTasks,
  soundEnabled,
}) => {
  const introAudioText =
    '어르신, 환영합니다. 여기는 실수해도 돈이 나가지 않는 안전한 연습장입니다. 스마트폰 배우기 또는 생활 서비스 체험 버튼을 꾹 눌러보세요.';

  useEffect(() => {
    if (soundEnabled) {
      speechHelper.speak(introAudioText);
    }
    return () => {
      speechHelper.stop();
    };
  }, [soundEnabled]);

  const handlePlayVoice = () => {
    speechHelper.speak(introAudioText);
  };

  const isTaskDone = (id: string) => completedTasks.includes(id);

  return (
    <div className="space-y-8 py-4 sm:py-6">
      {/* Friendly Welcome & Psychological Safety Banner */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100/90 text-blue-900 rounded-lg text-sm sm:text-base font-bold">
              <ShieldCheck className="w-5 h-5 text-blue-700" />
              100% 무료 · 실제 결제 없음 · 안심 연습장
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              실수해도 괜찮습니다! <br />
              <span className="text-blue-700">마음껏 눌러보며</span> 배우세요
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-medium">
              잘못 눌러도 스마트폰이 고장 나지 않고, 실제 돈도 결제되지 않으니 안심하세요.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handlePlayVoice}
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white border-2 border-blue-300 hover:border-blue-500 rounded-2xl text-blue-900 font-black text-base sm:text-lg shadow-sm hover:bg-blue-50 transition-all min-h-[56px]"
              aria-label="안내 음성 듣기"
            >
              <Volume2 className="w-6 h-6 text-blue-600 animate-pulse" />
              <span>안내 말씀 듣기</span>
            </button>
            <button
              onClick={() => onNavigate('certificate')}
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-amber-500 hover:bg-amber-600 border border-amber-600 text-slate-950 font-black text-base sm:text-lg rounded-2xl shadow-sm transition-all min-h-[56px]"
            >
              <Award className="w-6 h-6 text-slate-950" />
              <span>내 배움 도장 확인</span>
            </button>
          </div>
        </div>
      </section>

      {/* Two Giant Core Action Cards (PRD 1st Priority & 2nd Priority) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* 1. 스마트폰 배우기 (Step-by-step smartphone learning) */}
        <div className="bg-white border-3 border-blue-600 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Smartphone className="w-9 h-9" />
              </div>
              <span className="px-3.5 py-1.5 bg-blue-100 text-blue-900 text-sm sm:text-base font-black rounded-lg">
                기초 4가지 과정
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
              스마트폰 기초 배우기
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 mb-6 leading-relaxed">
              카카오톡 문자 보내기, 손주 사진 전송, 문자 확인, 필요한 앱 설치법을 큼직한 그림으로 차근차근 익힙니다.
            </p>

            {/* Quick Curriculum Previews */}
            <div className="space-y-2.5 mb-8">
              {[
                { id: 'kakaotalk', label: '카카오톡 메시지 보내기' },
                { id: 'photo_send', label: '사진 촬영 후 가족에게 보내기' },
                { id: 'sms_reply', label: '문자 메시지 확인 및 답장하기' },
                { id: 'app_install', label: '필요한 앱 검색 및 설치하기' },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-base sm:text-lg font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    {item.label}
                  </span>
                  {isTaskDone(item.id) && (
                    <span className="flex items-center gap-1 text-emerald-700 text-sm font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4" /> 완료
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('learn_list')}
            className="w-full min-h-[68px] py-4 px-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white rounded-2xl font-black text-xl sm:text-2xl flex items-center justify-center gap-3 shadow-md transition-all"
            aria-label="스마트폰 배우기 시작하기"
          >
            <span>스마트폰 배우기 시작</span>
            <ArrowRight className="w-7 h-7" />
          </button>
        </div>

        {/* 2. 생활 서비스 가상 체험 (Digital life service virtual practice) */}
        <div className="bg-white border-3 border-emerald-600 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <Store className="w-9 h-9" />
              </div>
              <span className="px-3.5 py-1.5 bg-emerald-100 text-emerald-900 text-sm sm:text-base font-black rounded-lg">
                필수 3대 실습
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
              생활 서비스 가상 체험
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 mb-6 leading-relaxed">
              병원 진료 예약, 기차표 예매, 식당 무인 키오스크 주문을 실제 결제 없이 모의 데이터로 직접 연습합니다.
            </p>

            {/* Quick Practice Previews */}
            <div className="space-y-2.5 mb-8">
              {[
                { id: 'hospital', label: '동네 병원 진료 시간 예약하기' },
                { id: 'train', label: 'KTX 기차표 예매 및 좌석 선택' },
                { id: 'kiosk', label: '식당 무인 키오스크 주문 & 결제' },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-base sm:text-lg font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    {item.label}
                  </span>
                  {isTaskDone(item.id) && (
                    <span className="flex items-center gap-1 text-emerald-700 text-sm font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4" /> 완료
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('service_list')}
            className="w-full min-h-[68px] py-4 px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white rounded-2xl font-black text-xl sm:text-2xl flex items-center justify-center gap-3 shadow-md transition-all"
            aria-label="생활 서비스 체험 시작하기"
          >
            <span>생활 서비스 체험 시작</span>
            <ArrowRight className="w-7 h-7" />
          </button>
        </div>
      </section>

      {/* Senior Comfort & Reassurance Notes */}
      <section className="bg-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-300">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0">
            <HeartHandshake className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              어르신을 위한 3가지 약속
            </h3>
            <ul className="text-base sm:text-lg text-slate-700 space-y-1.5 leading-relaxed font-medium">
              <li>• <strong>회원가입과 비밀번호가 없습니다:</strong> 귀찮은 가입이나 본인인증 없이 바로 눌러보실 수 있습니다.</li>
              <li>• <strong>돈이 나가지 않습니다:</strong> 실제 카드나 은행 계좌와 연결되어 있지 않은 모의 연습 화면입니다.</li>
              <li>• <strong>글씨가 크고 시원합니다:</strong> 눈이 침침해도 편안하게 보실 수 있도록 큰 글씨와 큼직한 버튼으로 제작되었습니다.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
