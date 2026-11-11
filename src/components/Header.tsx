/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Volume2, VolumeX, Type, Award } from 'lucide-react';
import { FontSizeLevel, ScreenId } from '../types';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  fontSize: FontSizeLevel;
  onChangeFontSize: (level: FontSizeLevel) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  completedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  fontSize,
  onChangeFontSize,
  soundEnabled,
  onToggleSound,
  completedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-300 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Zone */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-left focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1 group"
          aria-label="어르신 디지털 도우미 처음 화면으로 이동"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-700 flex items-center justify-center text-white font-black text-2xl shadow-md group-hover:bg-blue-800 transition-colors">
            디
          </div>
          <div>
            <div className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              어르신 디지털 도우미
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              실수 걱정 없는 안전한 모의 실습
            </p>
          </div>
        </button>

        {/* Accessibility & Quick Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Certificate / Progress Badge */}
          <button
            onClick={() => onNavigate('certificate')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
              completedCount > 0
                ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
            title="나의 학습 이수증 보기"
          >
            <Award className="w-5 h-5 text-amber-600" />
            <span className="whitespace-nowrap">배움 도장 {completedCount}/7</span>
          </button>

          {/* Text Size Switcher */}
          <div
            className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-300"
            role="group"
            aria-label="글씨 크기 조절"
          >
            <span className="px-2 text-xs font-bold text-slate-600 hidden md:inline flex items-center gap-1">
              <Type className="w-3.5 h-3.5" /> 글씨
            </span>
            <button
              onClick={() => onChangeFontSize('normal')}
              className={`px-2.5 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${
                fontSize === 'normal'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-white/80'
              }`}
              title="보통 글씨 (20px 기준)"
            >
              보통
            </button>
            <button
              onClick={() => onChangeFontSize('large')}
              className={`px-2.5 py-1.5 rounded-lg text-sm md:text-base font-bold transition-all ${
                fontSize === 'large'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-white/80'
              }`}
              title="큰 글씨 (24px 기준)"
            >
              크게
            </button>
            <button
              onClick={() => onChangeFontSize('xlarge')}
              className={`px-2.5 py-1.5 rounded-lg text-base md:text-lg font-black transition-all ${
                fontSize === 'xlarge'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-white/80'
              }`}
              title="아주 큰 글씨 (28px 기준)"
            >
              가장 크게
            </button>
          </div>

          {/* TTS Sound Audio Toggle */}
          <button
            onClick={onToggleSound}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm md:text-base font-bold border-2 transition-all min-h-[44px] ${
              soundEnabled
                ? 'bg-emerald-600 border-emerald-700 text-white shadow-sm'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
            aria-label={soundEnabled ? '음성 안내 켜짐' : '음성 안내 꺼짐'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-5 h-5 text-white" />
                <span className="hidden sm:inline">소리 켜짐</span>
              </>
            ) : (
              <>
                <VolumeX className="w-5 h-5 text-slate-500" />
                <span className="hidden sm:inline">소리 끔</span>
              </>
            )}
          </button>

          {/* Home Button (Always available escape hatch) */}
          {currentScreen !== 'home' && (
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm md:text-base font-bold bg-slate-800 text-white hover:bg-slate-900 border border-slate-900 transition-all min-h-[44px] shadow-sm"
              aria-label="처음 화면으로 돌아가기"
            >
              <Home className="w-5 h-5" />
              <span>처음으로</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
