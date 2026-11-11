/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Volume2,
  CheckCircle2,
  Lightbulb,
  Award,
  Sparkles,
  Search,
  Plus,
  Send,
  Camera,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import { LearningCourse, ScreenId } from '../types';
import { speechHelper } from '../utils/speech';

interface LearnDetailScreenProps {
  course: LearningCourse;
  onFinishCourse: (courseId: string) => void;
  onNavigate: (screen: ScreenId) => void;
  soundEnabled: boolean;
}

export const LearnDetailScreen: React.FC<LearnDetailScreenProps> = ({
  course,
  onFinishCourse,
  onNavigate,
  soundEnabled,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hotspotTapped, setHotspotTapped] = useState(false);
  const [photoSnapped, setPhotoSnapped] = useState(false);
  const [installProgress, setInstallProgress] = useState<number | null>(null);

  const step = course.steps[currentStepIndex];
  const totalSteps = course.steps.length;

  useEffect(() => {
    setHotspotTapped(false);
    setPhotoSnapped(false);
    setInstallProgress(null);

    if (soundEnabled && step) {
      speechHelper.speak(step.audioText);
    }

    return () => {
      speechHelper.stop();
    };
  }, [currentStepIndex, soundEnabled, step]);

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      onFinishCourse(course.id);
      if (soundEnabled) {
        speechHelper.speak(
          '축하합니다! 배움 과정을 성공적으로 모두 마치셨습니다. 참 잘하셨습니다!'
        );
      }
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handlePlayAudio = () => {
    if (step) {
      speechHelper.speak(step.audioText);
    }
  };

  const handleHotspotClick = () => {
    setHotspotTapped(true);

    if (course.id === 'photo_send' && step.stepNumber === 1) {
      setPhotoSnapped(true);
    }

    if (course.id === 'app_install' && step.stepNumber === 4) {
      setInstallProgress(10);
      const timer = setInterval(() => {
        setInstallProgress((prev) => {
          if (prev === null || prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 30;
        });
      }, 350);
    }
  };

  return (
    <div className="space-y-6 py-4">
      {/* Top Bar with Step Progress */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-blue-700 font-bold text-base">
              {course.title}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 font-bold text-base">
              {currentStepIndex + 1}단계 / 총 {totalSteps}단계
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {step.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayAudio}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-50 border-2 border-blue-400 text-blue-900 rounded-xl font-bold text-base hover:bg-blue-100 transition-colors min-h-[48px]"
            aria-label="이 단계 설명 음성으로 다시 듣기"
          >
            <Volume2 className="w-5 h-5 text-blue-600" />
            <span>설명 듣기</span>
          </button>
          <button
            onClick={() => onNavigate('learn_list')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-xl font-bold text-base transition-colors min-h-[48px]"
            aria-label="학습 목록으로 나가기"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>목록으로</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>

      {!isCompleted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Simulated Smartphone Screen (Interactive Hotspot) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-[380px] bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-700 ring-4 ring-slate-200">
              {/* Phone Speaker & Camera Notch */}
              <div className="w-32 h-4 bg-slate-800 rounded-b-xl mx-auto mb-2 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-700 mr-2"></div>
                <div className="w-10 h-1.5 rounded-full bg-slate-700"></div>
              </div>

              {/* Phone Inner Display */}
              <div className="bg-slate-50 rounded-[34px] overflow-hidden min-h-[500px] flex flex-col justify-between border border-slate-300">
                {/* Simulated App Top Bar */}
                <div className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between text-base font-bold">
                  <span>{step.phoneScreen.appTitle}</span>
                  <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">실습 화면</span>
                </div>

                {/* Simulated Screen Body according to course & step */}
                <div className="p-4 flex-1 flex flex-col justify-center">
                  {/* KakaoTalk simulation */}
                  {course.id === 'kakaotalk' && (
                    <div className="space-y-4">
                      {step.stepNumber === 1 && (
                        <div className="space-y-2">
                          <p className="text-sm text-slate-500 font-bold mb-2">친구/대화 목록</p>
                          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3 opacity-60">
                            <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold">
                              김
                            </div>
                            <div>
                              <div className="font-bold text-slate-800">김종수 (친구)</div>
                              <div className="text-xs text-slate-500">내일 복지관에서 보자</div>
                            </div>
                          </div>

                          {/* Target Hotspot Button */}
                          <button
                            onClick={handleHotspotClick}
                            className={`w-full p-4 rounded-2xl border-3 text-left flex items-center justify-between transition-all ${
                              hotspotTapped
                                ? 'bg-amber-100 border-amber-500 ring-4 ring-amber-300 scale-[1.02]'
                                : 'bg-yellow-50 border-yellow-400 hover:border-yellow-600 animate-pulse'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-14 h-14 rounded-full bg-yellow-400 text-slate-900 font-black text-xl flex items-center justify-center shadow-sm">
                                딸
                              </div>
                              <div>
                                <div className="text-lg font-black text-slate-900">딸 지영이 💖</div>
                                <div className="text-sm font-semibold text-slate-600">아빠 감기 조심하세요~</div>
                              </div>
                            </div>
                            <span className="px-2.5 py-1 bg-yellow-400 text-slate-950 text-xs font-black rounded-lg">
                              {hotspotTapped ? '선택됨 ✓' : '여기를 터치!'}
                            </span>
                          </button>
                        </div>
                      )}

                      {step.stepNumber >= 2 && (
                        <div className="space-y-3">
                          <div className="p-3 bg-white rounded-2xl border border-slate-200 text-slate-700 text-sm max-w-[80%]">
                            딸 지영이: 아빠 오늘 저녁에 통화 가능하세요?
                          </div>
                          {step.stepNumber >= 3 && (
                            <div className="p-3 bg-yellow-200 rounded-2xl text-slate-900 font-bold text-sm ml-auto max-w-[85%] text-right shadow-sm">
                              딸아, 오늘 날씨가 춥구나. 옷 따뜻하게 입어라
                            </div>
                          )}

                          {/* Bottom Input Bar Simulation */}
                          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center gap-2">
                            <button
                              onClick={handleHotspotClick}
                              className={`flex-1 p-3 rounded-xl border-2 text-left text-sm font-bold transition-all ${
                                step.stepNumber === 2
                                  ? hotspotTapped
                                    ? 'bg-blue-50 border-blue-500 text-blue-900'
                                    : 'bg-white border-blue-500 text-slate-700 animate-pulse ring-2 ring-blue-300'
                                  : 'bg-slate-100 border-slate-300 text-slate-600'
                              }`}
                            >
                              {step.stepNumber >= 3
                                ? '딸아, 오늘 날씨가 춥구나. 옷 따뜻하게 입어라'
                                : '메시지를 입력하세요...'}
                            </button>

                            <button
                              onClick={handleHotspotClick}
                              className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all ${
                                step.stepNumber === 4
                                  ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-950 animate-bounce ring-4 ring-yellow-300'
                                  : 'bg-slate-200 text-slate-400'
                              }`}
                              aria-label="전송"
                            >
                              <Send className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Photo Send Simulation */}
                  {course.id === 'photo_send' && (
                    <div className="space-y-4">
                      {step.stepNumber === 1 && (
                        <div className="text-center space-y-4">
                          <div className="relative w-full h-56 bg-gradient-to-tr from-amber-200 via-rose-200 to-indigo-200 rounded-2xl flex flex-col items-center justify-center border-2 border-slate-300 overflow-hidden">
                            <span className="text-5xl mb-2">🌺</span>
                            <span className="font-black text-slate-800 text-lg">마당에 핀 예쁜 동백꽃</span>
                            {photoSnapped && (
                              <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center animate-fade-in">
                                <CheckCircle2 className="w-12 h-12 text-emerald-600 mb-1" />
                                <span className="text-emerald-800 font-black text-lg">찰칵! 사진 촬영 완료</span>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={handleHotspotClick}
                            className={`w-20 h-20 mx-auto rounded-full border-4 border-slate-800 flex items-center justify-center shadow-lg transition-all ${
                              photoSnapped
                                ? 'bg-emerald-500 text-white'
                                : 'bg-white hover:bg-slate-100 animate-pulse ring-4 ring-rose-400'
                            }`}
                            aria-label="셔터 버튼"
                          >
                            <Camera className="w-9 h-9 text-slate-800" />
                          </button>
                          <p className="text-sm font-bold text-slate-700">
                            {photoSnapped ? '사진이 보관함에 저장되었습니다!' : '가운데 셔터 버튼을 눌러보세요'}
                          </p>
                        </div>
                      )}

                      {step.stepNumber === 2 && (
                        <div className="space-y-4">
                          <div className="p-3 bg-white rounded-2xl border border-slate-200 text-slate-700 text-sm">
                            딸 지영이: 아빠 마당 꽃 피었나요?
                          </div>
                          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center gap-2">
                            <button
                              onClick={handleHotspotClick}
                              className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl transition-all ${
                                hotspotTapped
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-blue-600 text-white animate-bounce ring-4 ring-blue-300'
                              }`}
                              aria-label="더하기 버튼"
                            >
                              <Plus className="w-6 h-6" />
                            </button>
                            <div className="flex-1 p-3 bg-slate-100 rounded-xl text-slate-400 text-sm">
                              메시지 입력...
                            </div>
                          </div>
                        </div>
                      )}

                      {step.stepNumber >= 3 && (
                        <div className="space-y-4">
                          {step.stepNumber === 3 && (
                            <div className="grid grid-cols-3 gap-3 p-2 bg-slate-100 rounded-2xl">
                              <button
                                onClick={handleHotspotClick}
                                className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                                  hotspotTapped
                                    ? 'bg-amber-100 border-2 border-amber-500 text-amber-900'
                                    : 'bg-white border-2 border-blue-500 text-blue-900 animate-pulse ring-2 ring-blue-300'
                                }`}
                              >
                                <ImageIcon className="w-8 h-8 text-blue-600" />
                                <span className="font-black text-sm">앨범 (사진)</span>
                              </button>
                              <div className="p-4 bg-white/50 rounded-xl flex flex-col items-center justify-center gap-2 opacity-50">
                                <Camera className="w-8 h-8 text-slate-400" />
                                <span className="text-xs text-slate-500">카메라</span>
                              </div>
                              <div className="p-4 bg-white/50 rounded-xl flex flex-col items-center justify-center gap-2 opacity-50">
                                <span className="text-2xl">📍</span>
                                <span className="text-xs text-slate-500">지도</span>
                              </div>
                            </div>
                          )}

                          {step.stepNumber === 4 && (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between pb-2 border-b">
                                <span className="font-bold text-slate-800 text-sm">최근 사진</span>
                                <button
                                  onClick={handleHotspotClick}
                                  className={`px-4 py-2 rounded-xl font-black text-sm transition-all ${
                                    hotspotTapped
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-yellow-400 text-slate-950 animate-bounce ring-4 ring-yellow-300'
                                  }`}
                                >
                                  전송 (1)
                                </button>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="relative rounded-xl overflow-hidden border-3 border-blue-600 bg-amber-100 p-6 flex flex-col items-center justify-center">
                                  <span className="text-4xl">🌺</span>
                                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                                    ✓
                                  </div>
                                </div>
                                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 p-6 flex items-center justify-center opacity-60">
                                  <span className="text-3xl">☕</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* SMS Reply Simulation */}
                  {course.id === 'sms_reply' && (
                    <div className="space-y-4">
                      {step.stepNumber === 1 && (
                        <div className="space-y-2">
                          <button
                            onClick={handleHotspotClick}
                            className={`w-full p-4 rounded-2xl border-3 text-left transition-all ${
                              hotspotTapped
                                ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-300'
                                : 'bg-white border-blue-500 animate-pulse'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-black text-slate-900 text-base">
                                [안내] 국민건강보험공단
                              </span>
                              <span className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold">
                                새 문자 1
                              </span>
                            </div>
                            <div className="text-sm font-semibold text-slate-700">
                              김영수 님 2026년 일반건강검진 대상자입니다...
                            </div>
                          </button>
                        </div>
                      )}

                      {step.stepNumber >= 2 && (
                        <div className="space-y-3">
                          <div className="p-3.5 bg-slate-200 rounded-2xl text-slate-900 text-sm leading-relaxed">
                            <strong>[국민건강보험]</strong><br />
                            김영수 님, 올해 건강검진 잊지 말고 가까운 지정병원에서 수검 바랍니다.
                          </div>

                          {step.stepNumber >= 3 && (
                            <div className="p-3 bg-blue-600 text-white rounded-2xl text-sm font-bold ml-auto max-w-[85%] text-right shadow-sm">
                              네 확인했습니다 감사합니다
                            </div>
                          )}

                          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center gap-2">
                            <button
                              onClick={handleHotspotClick}
                              className={`flex-1 p-3 rounded-xl border-2 text-left text-sm font-bold ${
                                step.stepNumber === 3
                                  ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-300'
                                  : 'bg-slate-100 border-slate-300 text-slate-700'
                              }`}
                            >
                              {step.stepNumber >= 3
                                ? '네 확인했습니다 감사합니다'
                                : '문자 메시지 입력...'}
                            </button>
                            <button
                              onClick={handleHotspotClick}
                              className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all ${
                                step.stepNumber === 4
                                  ? 'bg-blue-600 text-white animate-bounce ring-4 ring-blue-300'
                                  : 'bg-slate-200 text-slate-400'
                              }`}
                              aria-label="문자 전송"
                            >
                              <ArrowRight className="w-6 h-6" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Play Store App Install Simulation */}
                  {course.id === 'app_install' && (
                    <div className="space-y-4">
                      {step.stepNumber === 1 || step.stepNumber === 2 ? (
                        <div className="space-y-3">
                          <button
                            onClick={handleHotspotClick}
                            className={`w-full p-3.5 rounded-2xl border-2 flex items-center gap-3 text-left transition-all ${
                              hotspotTapped
                                ? 'bg-blue-50 border-blue-600'
                                : 'bg-white border-blue-500 animate-pulse ring-2 ring-blue-300'
                            }`}
                          >
                            <Search className="w-5 h-5 text-blue-600" />
                            <span className="font-bold text-slate-800 text-sm">
                              {step.stepNumber === 2 ? '코레일톡 기차표' : '앱 및 게임 검색'}
                            </span>
                          </button>
                          <div className="text-xs text-slate-500">인기 검색어: 코레일톡, 카카오톡, 병원예약</div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-14 h-14 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-black text-xl shadow-sm">
                                🚄
                              </div>
                              <div>
                                <div className="font-black text-slate-900 text-base">코레일톡</div>
                                <div className="text-xs text-slate-500">한국철도공사 (공식)</div>
                                <div className="text-xs text-amber-600 font-bold">★ 4.6 (무료)</div>
                              </div>
                            </div>
                            {step.stepNumber === 4 && (
                              <button
                                onClick={handleHotspotClick}
                                className={`px-5 py-2.5 rounded-xl font-black text-sm transition-all ${
                                  installProgress === 100
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white animate-bounce ring-4 ring-emerald-300'
                                }`}
                              >
                                {installProgress === null
                                  ? '설치'
                                  : installProgress < 100
                                  ? `설치 중 ${installProgress}%`
                                  : '열기'}
                              </button>
                            )}
                          </div>
                          {installProgress !== null && installProgress < 100 && (
                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-emerald-500 h-full transition-all"
                                style={{ width: `${installProgress}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Touch Feedback Banner */}
                <div className="p-3 bg-slate-100 border-t border-slate-200 text-center">
                  <p className="text-xs font-bold text-slate-600">
                    💡 위 화면의 깜빡이는 버튼을 직접 손가락으로 눌러보세요!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Senior Step Explanation & Guidance */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-300 shadow-sm space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-900 rounded-lg text-base font-bold">
                <Sparkles className="w-5 h-5 text-blue-700" />
                {currentStepIndex + 1}단계 안내
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                {step.instruction}
              </h2>

              {step.tip && (
                <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black text-amber-900 text-base sm:text-lg block">
                      어르신 꿀팁
                    </span>
                    <p className="text-base sm:text-lg text-amber-950 font-medium leading-relaxed">
                      {step.tip}
                    </p>
                  </div>
                </div>
              )}

              {hotspotTapped && (
                <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl flex items-center gap-3 text-emerald-900 font-bold text-base sm:text-lg animate-fade-in">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span>참 잘하셨습니다! 아래의 [다음 단계로] 버튼을 눌러주세요.</span>
                </div>
              )}
            </div>

            {/* Navigation Buttons (Min 60px height) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {currentStepIndex > 0 ? (
                <button
                  onClick={handlePrev}
                  className="flex-1 min-h-[64px] py-4 px-6 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-2xl font-black text-xl flex items-center justify-center gap-2 transition-colors"
                  aria-label="이전 단계로 돌아가기"
                >
                  <ArrowLeft className="w-6 h-6" />
                  <span>이전 단계</span>
                </button>
              ) : null}

              <button
                onClick={handleNext}
                className="flex-1 min-h-[64px] py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xl sm:text-2xl flex items-center justify-center gap-3 shadow-md transition-all active:scale-[0.99]"
                aria-label={currentStepIndex === totalSteps - 1 ? '학습 완료하기' : '다음 단계로 가기'}
              >
                <span>{currentStepIndex === totalSteps - 1 ? '학습 완료!' : '다음 단계로'}</span>
                <ArrowRight className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Completion Celebration Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-3 border-emerald-500 shadow-lg text-center max-w-2xl mx-auto space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md animate-bounce">
            <Award className="w-14 h-14" />
          </div>

          <div className="space-y-3">
            <span className="px-4 py-1.5 bg-emerald-100 text-emerald-900 text-base font-black rounded-full inline-block">
              🎉 과정 이수 완료!
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              참 잘하셨습니다!
            </h2>
            <p className="text-xl sm:text-2xl text-slate-700 font-bold leading-relaxed">
              [{course.title}] 과정을 모두 익히셨습니다.<br />
              배움 도장이 추가되었습니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => {
                setCurrentStepIndex(0);
                setIsCompleted(false);
              }}
              className="min-h-[64px] px-8 py-4 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-900 rounded-2xl font-black text-xl flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-6 h-6" />
              <span>한 번 더 연습하기</span>
            </button>
            <button
              onClick={() => onNavigate('learn_list')}
              className="min-h-[64px] px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xl sm:text-2xl flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Check className="w-6 h-6" />
              <span>다른 코스 배우기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
