/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Heart,
  User,
  AlertCircle,
  CheckCircle2,
  Volume2,
  ShieldCheck,
  Stethoscope,
  Sparkles,
} from 'lucide-react';
import {
  HOSPITAL_DEPARTMENTS,
  HOSPITAL_DATES,
  HOSPITAL_TIMES,
  HospitalDepartment,
} from '../data/serviceData';
import { HospitalReservationData, ScreenId } from '../types';
import { speechHelper } from '../utils/speech';

interface HospitalPracticeScreenProps {
  onCompleteReservation: (data: HospitalReservationData) => void;
  onNavigate: (screen: ScreenId) => void;
  soundEnabled: boolean;
}

export const HospitalPracticeScreen: React.FC<HospitalPracticeScreenProps> = ({
  onCompleteReservation,
  onNavigate,
  soundEnabled,
}) => {
  const [selectedDept, setSelectedDept] = useState<HospitalDepartment | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSymptom, setSelectedSymptom] = useState<string>('정기 처방 및 상담');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const guideText =
    '병원 진료 예약 실습입니다. 1단계로 진료과목을 고르시고, 2단계로 날짜, 3단계로 시간을 누른 후 맨 아래 예약하기 버튼을 눌러주세요.';

  useEffect(() => {
    if (soundEnabled) {
      speechHelper.speak(guideText);
    }
    return () => {
      speechHelper.stop();
    };
  }, [soundEnabled]);

  const handleDeptSelect = (dept: HospitalDepartment) => {
    setSelectedDept(dept);
    setErrorMessage('');
    if (soundEnabled) {
      speechHelper.speak(`${dept.name}이 선택되었습니다.`);
    }
  };

  const handleDateSelect = (dateId: string, label: string) => {
    setSelectedDate(dateId);
    setErrorMessage('');
    if (soundEnabled) {
      speechHelper.speak(`${label}이 선택되었습니다.`);
    }
  };

  const handleTimeSelect = (timeStr: string) => {
    setSelectedTime(timeStr);
    setErrorMessage('');
    if (soundEnabled) {
      speechHelper.speak(`${timeStr}이 선택되었습니다.`);
    }
  };

  const handleSubmit = () => {
    // Validation check as strictly requested in PRD
    if (!selectedDept || !selectedDate || !selectedTime) {
      const msg = '진료 과목과 날짜, 시간을 모두 선택해 주세요.';
      setErrorMessage(msg);
      if (soundEnabled) {
        speechHelper.speak(msg);
      }
      return;
    }

    const dateObj = HOSPITAL_DATES.find((d) => d.id === selectedDate);
    const dateLabel = dateObj ? dateObj.label : '2026년 11월 12일 (수)';

    const resData: HospitalReservationData = {
      department: selectedDept.name,
      doctor: selectedDept.doctor,
      date: dateLabel,
      time: selectedTime,
      patientName: '김영수 님',
      patientPhone: '010-1234-5678',
      symptom: selectedSymptom,
      reservationId: `H-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    onCompleteReservation(resData);
  };

  return (
    <div className="space-y-8 py-4 sm:py-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-rose-700 font-bold text-base">
              생활 서비스 실습 ①
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            🏥 병원 진료 예약하기
          </h1>
          <p className="text-lg sm:text-xl text-slate-600">
            실제 병원에 접수되지 않는 안전한 연습입니다. 부담 없이 순서대로 눌러보세요.
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
            onClick={() => onNavigate('service_list')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-xl font-bold text-base transition-colors min-h-[48px]"
            aria-label="서비스 목록으로 나가기"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>목록으로</span>
          </button>
        </div>
      </div>

      {/* Error Message Box if validation fails */}
      {errorMessage && (
        <div className="p-4 bg-rose-50 border-3 border-rose-500 rounded-2xl flex items-center gap-3 text-rose-900 font-black text-lg sm:text-xl shadow-md animate-bounce">
          <AlertCircle className="w-7 h-7 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Step 1: 진료과목 선택 */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-300 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center text-lg font-black">
              1
            </span>
            진료 과목을 선택해 주세요
          </h2>
          {selectedDept && (
            <span className="text-emerald-700 font-bold text-base flex items-center gap-1">
              <CheckCircle2 className="w-5 h-5" /> 선택 완료
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HOSPITAL_DEPARTMENTS.map((dept) => {
            const isSelected = selectedDept?.id === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => handleDeptSelect(dept)}
                className={`p-5 rounded-2xl text-left border-3 transition-all min-h-[110px] flex flex-col justify-between ${
                  isSelected
                    ? 'bg-rose-50 border-rose-600 ring-4 ring-rose-200 shadow-md'
                    : 'bg-slate-50 border-slate-300 hover:border-slate-400 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-2xl font-black text-slate-900">
                      {dept.name}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        isSelected
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {dept.badge}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 font-medium">
                    {dept.description}
                  </p>
                </div>
                <div className="text-xs text-slate-500 font-bold pt-2 mt-2 border-t border-slate-200">
                  담당: {dept.doctor} ({dept.room})
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2: 예약 날짜 선택 */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-300 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center text-lg font-black">
              2
            </span>
            원하시는 날짜를 선택해 주세요
          </h2>
          {selectedDate && (
            <span className="text-emerald-700 font-bold text-base flex items-center gap-1">
              <CheckCircle2 className="w-5 h-5" /> 선택 완료
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOSPITAL_DATES.map((d) => {
            const isSelected = selectedDate === d.id;
            return (
              <button
                key={d.id}
                onClick={() => handleDateSelect(d.id, d.label)}
                className={`p-5 rounded-2xl text-left border-3 transition-all min-h-[90px] flex flex-col justify-between ${
                  isSelected
                    ? 'bg-rose-50 border-rose-600 ring-4 ring-rose-200 shadow-md'
                    : 'bg-slate-50 border-slate-300 hover:border-slate-400 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <Calendar className={`w-6 h-6 ${isSelected ? 'text-rose-600' : 'text-slate-400'}`} />
                  <span className="text-xs bg-slate-200 px-2 py-0.5 rounded font-bold text-slate-700">
                    {d.dayBadge}
                  </span>
                </div>
                <div className="text-lg sm:text-xl font-black text-slate-900 mt-2">
                  {d.label}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 3: 예약 시간 선택 */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-300 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center text-lg font-black">
              3
            </span>
            진료 시간을 선택해 주세요
          </h2>
          {selectedTime && (
            <span className="text-emerald-700 font-bold text-base flex items-center gap-1">
              <CheckCircle2 className="w-5 h-5" /> 선택 완료
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {HOSPITAL_TIMES.map((t) => {
            const isSelected = selectedTime === t.time;
            return (
              <button
                key={t.id}
                onClick={() => handleTimeSelect(t.time)}
                className={`p-4 rounded-2xl text-center border-3 transition-all min-h-[80px] flex flex-col justify-center items-center ${
                  isSelected
                    ? 'bg-rose-50 border-rose-600 ring-4 ring-rose-200 shadow-md'
                    : 'bg-slate-50 border-slate-300 hover:border-slate-400 hover:bg-white'
                }`}
              >
                <Clock className={`w-5 h-5 mb-1 ${isSelected ? 'text-rose-600' : 'text-slate-400'}`} />
                <span className="text-lg sm:text-xl font-black text-slate-900">
                  {t.time}
                </span>
                <span className="text-xs text-slate-500 font-bold mt-1">
                  {t.status}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Patient Information & Symptom Quick Pick */}
      <section className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-300 space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
          <User className="w-6 h-6 text-slate-700" />
          예약자 정보 (모의 데이터)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-slate-200">
            <div className="text-sm font-bold text-slate-500">환자 이름</div>
            <div className="text-xl font-black text-slate-900">김영수 (72세, 남)</div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-200">
            <div className="text-sm font-bold text-slate-500">연락처</div>
            <div className="text-xl font-black text-slate-900">010-1234-5678</div>
          </div>
        </div>

        <div>
          <div className="text-sm font-bold text-slate-600 mb-2">진료 사유 (누르면 바뀝니다)</div>
          <div className="flex flex-wrap gap-2">
            {['정기 처방 및 상담', '감기 몸살 및 기침', '무릎 허리 통증', '눈이 침침함 검진'].map((symp) => (
              <button
                key={symp}
                onClick={() => setSelectedSymptom(symp)}
                className={`px-4 py-2.5 rounded-xl text-base font-bold transition-all ${
                  selectedSymptom === symp
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {symp}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Submit Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-600 text-base font-semibold justify-center">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>모의 예약이므로 진료비나 위약금이 발생하지 않습니다.</span>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full min-h-[72px] py-4 px-6 bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white rounded-2xl font-black text-2xl sm:text-3xl flex items-center justify-center gap-3 shadow-lg transition-all"
          aria-label="병원 예약 완료하기"
        >
          <span>모의 예약 완료하기</span>
          <CheckCircle2 className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};
