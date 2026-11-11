/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import {
  MessageSquare,
  Camera,
  Mail,
  Download,
  ArrowRight,
  ArrowLeft,
  Volume2,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { LEARNING_COURSES } from '../data/learningData';
import { LearningCourse, ScreenId } from '../types';
import { speechHelper } from '../utils/speech';

interface LearnListScreenProps {
  onSelectCourse: (course: LearningCourse) => void;
  onNavigate: (screen: ScreenId) => void;
  completedTasks: string[];
  soundEnabled: boolean;
}

export const LearnListScreen: React.FC<LearnListScreenProps> = ({
  onSelectCourse,
  onNavigate,
  completedTasks,
  soundEnabled,
}) => {
  const guideText =
    '스마트폰 기초 배우기 목록입니다. 배우고 싶은 내용을 손가락으로 톡 눌러주세요.';

  useEffect(() => {
    if (soundEnabled) {
      speechHelper.speak(guideText);
    }
    return () => {
      speechHelper.stop();
    };
  }, [soundEnabled]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return <MessageSquare className="w-8 h-8" />;
      case 'Camera':
        return <Camera className="w-8 h-8" />;
      case 'Mail':
        return <Mail className="w-8 h-8" />;
      case 'Download':
        return <Download className="w-8 h-8" />;
      default:
        return <Sparkles className="w-8 h-8" />;
    }
  };

  return (
    <div className="space-y-6 py-4 sm:py-6">
      {/* Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-blue-700 font-black text-base sm:text-lg">
              1단계 / 기초 과정
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            스마트폰 기초 배우기
          </h1>
          <p className="text-lg sm:text-xl text-slate-600">
            원하시는 항목을 누르면 큰 그림과 함께 단계별로 연습할 수 있습니다.
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

      {/* Course List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LEARNING_COURSES.map((course, index) => {
          const isDone = completedTasks.includes(course.id);
          return (
            <div
              key={course.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 border-3 transition-all flex flex-col justify-between shadow-sm hover:shadow-md ${
                isDone
                  ? 'border-emerald-500 bg-emerald-50/20'
                  : 'border-slate-300 hover:border-blue-500'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: course.badgeColor === '#facc15' ? '#ca8a04' : course.badgeColor }}
                  >
                    {getIcon(course.iconName)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-slate-500 text-sm sm:text-base font-bold bg-slate-100 px-3 py-1 rounded-lg">
                      <Clock className="w-4 h-4" /> 약 {course.estimatedMinutes}분
                    </span>
                    {isDone ? (
                      <span className="flex items-center gap-1 text-emerald-800 text-sm sm:text-base font-black bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" /> 완료됨
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-blue-100 text-blue-900 text-sm sm:text-base font-bold rounded-lg">
                        {index + 1}번째 코스
                      </span>
                    )}
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                  {course.title}
                </h2>
                <p className="text-lg sm:text-xl text-slate-600 mb-6 leading-relaxed font-medium">
                  {course.subtitle}
                </p>

                {/* Steps Outline Preview */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 mb-6 space-y-1.5 text-base sm:text-lg text-slate-700">
                  <div className="text-sm font-bold text-slate-500 mb-1">
                    총 {course.steps.length}단계로 배우기:
                  </div>
                  {course.steps.map((st) => (
                    <div key={st.stepNumber} className="flex items-center gap-2 text-slate-800 font-medium truncate">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold shrink-0">
                        {st.stepNumber}
                      </span>
                      <span className="truncate">{st.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectCourse(course)}
                className={`w-full min-h-[64px] py-4 px-6 rounded-2xl font-black text-xl sm:text-2xl flex items-center justify-center gap-3 shadow-md transition-all ${
                  isDone
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                aria-label={`${course.title} ${isDone ? '다시 복습하기' : '배우기 시작하기'}`}
              >
                <span>{isDone ? '다시 복습하기' : '배우기 시작'}</span>
                <ArrowRight className="w-7 h-7" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
