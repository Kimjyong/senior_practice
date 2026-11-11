/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { LearnListScreen } from './components/LearnListScreen';
import { LearnDetailScreen } from './components/LearnDetailScreen';
import { ServiceListScreen } from './components/ServiceListScreen';
import { HospitalPracticeScreen } from './components/HospitalPracticeScreen';
import { HospitalResultScreen } from './components/HospitalResultScreen';
import { TrainPracticeScreen } from './components/TrainPracticeScreen';
import { TrainResultScreen } from './components/TrainResultScreen';
import { KioskPracticeScreen } from './components/KioskPracticeScreen';
import { KioskResultScreen } from './components/KioskResultScreen';
import { CertificateScreen } from './components/CertificateScreen';
import {
  FontSizeLevel,
  HospitalReservationData,
  KioskOrderData,
  LearningCourse,
  ScreenId,
  TrainBookingData,
} from './types';
import { LEARNING_COURSES } from './data/learningData';
import { speechHelper } from './utils/speech';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [fontSize, setFontSize] = useState<FontSizeLevel>(() => {
    try {
      const saved = localStorage.getItem('senior_font_size');
      if (saved === 'normal' || saved === 'large' || saved === 'xlarge') return saved;
    } catch {
      // ignore
    }
    return 'normal';
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [selectedCourse, setSelectedCourse] = useState<LearningCourse>(LEARNING_COURSES[0]);

  // Track completed tasks (starts completely empty so user starts with '배우기 시작')
  const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('senior_completed_tasks');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clear legacy single-item kakaotalk default if present
        if (Array.isArray(parsed) && parsed.length === 1 && parsed[0] === 'kakaotalk') {
          return [];
        }
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Practice results
  const [hospitalData, setHospitalData] = useState<HospitalReservationData | null>(null);
  const [trainData, setTrainData] = useState<TrainBookingData | null>(null);
  const [kioskData, setKioskData] = useState<KioskOrderData | null>(null);

  // Apply root font-size attribute to html element so all rem-based sizes scale
  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
    try {
      localStorage.setItem('senior_font_size', fontSize);
    } catch {
      // ignore
    }
  }, [fontSize]);

  const handleChangeFontSize = (level: FontSizeLevel) => {
    setFontSize(level);
    if (soundEnabled) {
      if (level === 'large') {
        speechHelper.speak('글자 크기를 크게 설정했습니다.');
      } else if (level === 'xlarge') {
        speechHelper.speak('글자 크기를 가장 크게 설정했습니다.');
      } else {
        speechHelper.speak('글자 크기를 보통으로 설정했습니다.');
      }
    }
  };

  // Sync completed tasks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('senior_completed_tasks', JSON.stringify(completedTasks));
    } catch {
      // ignore
    }
  }, [completedTasks]);

  const handleMarkTaskCompleted = (taskId: string) => {
    setCompletedTasks((prev) => {
      if (prev.includes(taskId)) return prev;
      return [...prev, taskId];
    });
  };

  const handleNavigate = (screen: ScreenId) => {
    speechHelper.stop();
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourse = (course: LearningCourse) => {
    setSelectedCourse(course);
    handleNavigate('learn_detail');
  };

  const handleFinishCourse = (courseId: string) => {
    handleMarkTaskCompleted(courseId);
  };

  const handleCompleteHospital = (data: HospitalReservationData) => {
    setHospitalData(data);
    handleMarkTaskCompleted('hospital');
    handleNavigate('hospital_result');
  };

  const handleCompleteTrain = (data: TrainBookingData) => {
    setTrainData(data);
    handleMarkTaskCompleted('train');
    handleNavigate('train_result');
  };

  const handleCompleteKiosk = (data: KioskOrderData) => {
    setKioskData(data);
    handleMarkTaskCompleted('kiosk');
    handleNavigate('kiosk_result');
  };

  return (
    <div
      className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col justify-between selection:bg-blue-200 selection:text-blue-900"
    >
      <div>
        {/* Senior Accessible Navigation Bar */}
        <Header
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          fontSize={fontSize}
          onChangeFontSize={handleChangeFontSize}
          soundEnabled={soundEnabled}
          onToggleSound={() => {
            if (soundEnabled) {
              speechHelper.stop();
            }
            setSoundEnabled(!soundEnabled);
          }}
          completedCount={completedTasks.length}
        />

        {/* Main Content Area */}
        <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          {currentScreen === 'home' && (
            <HomeScreen
              onNavigate={handleNavigate}
              completedTasks={completedTasks}
              soundEnabled={soundEnabled}
            />
          )}

          {currentScreen === 'learn_list' && (
            <LearnListScreen
              onSelectCourse={handleSelectCourse}
              onNavigate={handleNavigate}
              completedTasks={completedTasks}
              soundEnabled={soundEnabled}
            />
          )}

          {currentScreen === 'learn_detail' && (
            <LearnDetailScreen
              course={selectedCourse}
              onFinishCourse={handleFinishCourse}
              onNavigate={handleNavigate}
              soundEnabled={soundEnabled}
            />
          )}

          {currentScreen === 'service_list' && (
            <ServiceListScreen
              onNavigate={handleNavigate}
              completedTasks={completedTasks}
              soundEnabled={soundEnabled}
            />
          )}

          {currentScreen === 'hospital' && (
            <HospitalPracticeScreen
              onCompleteReservation={handleCompleteHospital}
              onNavigate={handleNavigate}
              soundEnabled={soundEnabled}
            />
          )}

          {currentScreen === 'hospital_result' && hospitalData && (
            <HospitalResultScreen
              data={hospitalData}
              onNavigate={handleNavigate}
              onRetry={() => handleNavigate('hospital')}
              soundEnabled={soundEnabled}
            />
          )}

          {currentScreen === 'train' && (
            <TrainPracticeScreen
              onCompleteBooking={handleCompleteTrain}
              onNavigate={handleNavigate}
              soundEnabled={soundEnabled}
            />
          )}

          {currentScreen === 'train_result' && trainData && (
            <TrainResultScreen
              data={trainData}
              onNavigate={handleNavigate}
              onRetry={() => handleNavigate('train')}
              soundEnabled={soundEnabled}
            />
          )}

          {currentScreen === 'kiosk' && (
            <KioskPracticeScreen
              onCompleteOrder={handleCompleteKiosk}
              onNavigate={handleNavigate}
              soundEnabled={soundEnabled}
            />
          )}

          {currentScreen === 'kiosk_result' && kioskData && (
            <KioskResultScreen
              data={kioskData}
              onNavigate={handleNavigate}
              onRetry={() => handleNavigate('kiosk')}
              soundEnabled={soundEnabled}
            />
          )}

          {currentScreen === 'certificate' && (
            <CertificateScreen
              completedTasks={completedTasks}
              onNavigate={handleNavigate}
              soundEnabled={soundEnabled}
            />
          )}
        </main>
      </div>

      {/* Quiet Senior Support Footer */}
      <footer className="border-t-2 border-slate-300 bg-white py-8 px-4 mt-12 text-center text-slate-600">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-base font-bold text-slate-700">
            <span>국가 디지털 포용 교육 지침 준수</span>
            <span>·</span>
            <span>100% 무료 가상 실습</span>
            <span>·</span>
            <span>어르신 전용 큰글씨 체계</span>
          </div>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            본 서비스는 실제 결제나 예약이 발생하지 않는 시니어 모의 교육 웹 플랫폼입니다. <br className="hidden sm:inline" />
            어르신들이 일상생활에서 디지털 기기를 두려움 없이 안전하게 이용하실 수 있도록 돕습니다.
          </p>
          <div className="pt-2 text-xs text-slate-400">
            © 2026 어르신 디지털 생활 도우미. 누구나 자유롭게 연습할 수 있습니다.
          </div>
        </div>
      </footer>
    </div>
  );
}
