/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Train,
  Calendar,
  Users,
  AlertCircle,
  CheckCircle2,
  Volume2,
  ShieldCheck,
  Search,
  CreditCard,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  TRAIN_STATIONS,
  TRAIN_SCHEDULES,
  TRAIN_SEATS,
} from '../data/serviceData';
import { TrainBookingData, ScreenId } from '../types';
import { speechHelper } from '../utils/speech';

interface TrainPracticeScreenProps {
  onCompleteBooking: (data: TrainBookingData) => void;
  onNavigate: (screen: ScreenId) => void;
  soundEnabled: boolean;
}

export const TrainPracticeScreen: React.FC<TrainPracticeScreenProps> = ({
  onCompleteBooking,
  onNavigate,
  soundEnabled,
}) => {
  const [step, setStep] = useState<'search' | 'schedule' | 'seat' | 'pay'>('search');
  const [departure, setDeparture] = useState('서울역');
  const [arrival, setArrival] = useState('부산역');
  const [travelDate, setTravelDate] = useState('11월 12일 (수)');
  const [passengerCount, setPassengerCount] = useState(1);
  const [selectedTrain, setSelectedTrain] = useState<typeof TRAIN_SCHEDULES[0] | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<typeof TRAIN_SEATS[0] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const guideText =
    '기차표 예매 실습입니다. 출발역과 도착역을 확인하고 [열차 조회하기] 버튼을 눌러주세요.';

  useEffect(() => {
    if (soundEnabled) {
      speechHelper.speak(guideText);
    }
    return () => {
      speechHelper.stop();
    };
  }, [soundEnabled]);

  const handleSearchTrains = () => {
    // Validation check as explicitly defined in PRD: "출발역과 도착역을 서로 다르게 선택해 주세요."
    if (departure === arrival) {
      const msg = '출발역과 도착역을 서로 다르게 선택해 주세요.';
      setErrorMessage(msg);
      if (soundEnabled) {
        speechHelper.speak(msg);
      }
      return;
    }

    setErrorMessage('');
    setStep('schedule');
    if (soundEnabled) {
      speechHelper.speak(
        `${departure}에서 ${arrival}으로 가는 열차 목록입니다. 원하시는 시간대의 열차를 선택해 주세요.`
      );
    }
  };

  const handleSelectTrain = (schedule: typeof TRAIN_SCHEDULES[0]) => {
    setSelectedTrain(schedule);
    setStep('seat');
    if (soundEnabled) {
      speechHelper.speak(
        `${schedule.trainName}이 선택되었습니다. 이제 편안히 앉아가실 좌석을 골라주세요.`
      );
    }
  };

  const handleSelectSeat = (seat: typeof TRAIN_SEATS[0]) => {
    setSelectedSeat(seat);
    setStep('pay');
    if (soundEnabled) {
      speechHelper.speak(
        `${seat.car} ${seat.seat} 좌석이 선택되었습니다. 실제 결제되지 않는 모의 결제 단계로 이동합니다.`
      );
    }
  };

  const handleConfirmPayment = () => {
    setIsProcessingPayment(true);
    if (soundEnabled) {
      speechHelper.speak('가상 결제가 진행 중입니다. 잠시만 기다려주세요.');
    }

    setTimeout(() => {
      setIsProcessingPayment(false);
      if (selectedTrain && selectedSeat) {
        const bookingData: TrainBookingData = {
          departureStation: departure,
          arrivalStation: arrival,
          date: travelDate,
          trainName: selectedTrain.trainName,
          departureTime: selectedTrain.departureTime,
          arrivalTime: selectedTrain.arrivalTime,
          seatType: selectedTrain.seatType,
          carNumber: selectedSeat.car,
          seatNumber: selectedSeat.seat,
          passengerCount: passengerCount,
          totalPrice: selectedTrain.seniorDiscountPrice * passengerCount,
          bookingId: `KTX-${Math.floor(100000 + Math.random() * 900000)}`,
        };
        onCompleteBooking(bookingData);
      }
    }, 1200);
  };

  return (
    <div className="space-y-8 py-4 sm:py-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-blue-700 font-bold text-base">
              생활 서비스 실습 ②
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            🚄 기차표(KTX) 예매하기
          </h1>
          <p className="text-lg sm:text-xl text-slate-600">
            어르신 30% 경로 할인과 좌석 지정을 직접 실습해 보실 수 있습니다.
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

      {/* Step Indicator */}
      <div className="flex items-center justify-between bg-slate-100 p-2 sm:p-3 rounded-2xl border border-slate-300 text-sm sm:text-base font-bold">
        <span className={step === 'search' ? 'text-blue-700 font-black' : 'text-slate-500'}>
          1. 역·날짜 선택
        </span>
        <span>→</span>
        <span className={step === 'schedule' ? 'text-blue-700 font-black' : 'text-slate-500'}>
          2. 열차 시간 선택
        </span>
        <span>→</span>
        <span className={step === 'seat' ? 'text-blue-700 font-black' : 'text-slate-500'}>
          3. 좌석 선택
        </span>
        <span>→</span>
        <span className={step === 'pay' ? 'text-blue-700 font-black' : 'text-slate-500'}>
          4. 모의 결제
        </span>
      </div>

      {/* STEP 1: 역, 날짜, 인원 선택 */}
      {step === 'search' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 출발역 선택 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-300 shadow-sm space-y-4">
              <div className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-between">
                <span>출발역 선택</span>
                <span className="text-blue-700 font-black text-2xl">
                  {departure}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {TRAIN_STATIONS.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      setDeparture(st.name);
                      setErrorMessage('');
                    }}
                    className={`p-3 rounded-xl font-black text-lg min-h-[56px] transition-all border-2 ${
                      departure === st.name
                        ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                        : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    {st.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 도착역 선택 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-300 shadow-sm space-y-4">
              <div className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-between">
                <span>도착역 선택</span>
                <span className="text-emerald-700 font-black text-2xl">
                  {arrival}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {TRAIN_STATIONS.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      setArrival(st.name);
                      setErrorMessage('');
                    }}
                    className={`p-3 rounded-xl font-black text-lg min-h-[56px] transition-all border-2 ${
                      arrival === st.name
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                        : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    {st.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 가는 날 & 승객 인원 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-300 shadow-sm space-y-4">
              <div className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                가는 날짜 선택
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['오늘 (11월 11일 화)', '내일 (11월 12일 수)', '모레 (11월 13일 목)', '이번 주말 (11월 15일 토)'].map(
                  (d) => (
                    <button
                      key={d}
                      onClick={() => setTravelDate(d)}
                      className={`p-4 rounded-2xl text-left font-black text-base sm:text-lg border-2 transition-all ${
                        travelDate === d
                          ? 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-300'
                          : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-white'
                      }`}
                    >
                      {d}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-300 shadow-sm space-y-4">
              <div className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                승객 인원 (어르신 할인 적용)
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setPassengerCount(num)}
                    className={`p-4 rounded-2xl font-black text-xl min-h-[60px] border-2 transition-all ${
                      passengerCount === num
                        ? 'bg-blue-600 border-blue-700 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-white'
                    }`}
                  >
                    어르신 {num}명
                  </button>
                ))}
              </div>
              <div className="text-sm font-bold text-slate-500">
                💡 만 65세 이상 어르신은 평일 KTX 승차권 30% 할인이 자동 적용됩니다.
              </div>
            </div>
          </div>

          <button
            onClick={handleSearchTrains}
            className="w-full min-h-[72px] py-4 px-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white rounded-2xl font-black text-2xl sm:text-3xl flex items-center justify-center gap-3 shadow-lg transition-all"
            aria-label="열차 조회하기"
          >
            <Search className="w-8 h-8" />
            <span>열차 조회하기</span>
          </button>
        </div>
      )}

      {/* STEP 2: 열차 시간표 선택 */}
      {step === 'schedule' && (
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-300 flex items-center justify-between">
            <span className="text-lg font-black text-blue-900">
              {departure} → {arrival} ({travelDate})
            </span>
            <button
              onClick={() => setStep('search')}
              className="px-4 py-2 bg-white rounded-xl text-sm font-bold text-blue-900 border border-blue-300 hover:bg-blue-100"
            >
              조건 변경
            </button>
          </div>

          <div className="space-y-4">
            {TRAIN_SCHEDULES.map((sched) => (
              <div
                key={sched.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-slate-300 hover:border-blue-600 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-600 text-white font-black text-sm rounded-lg">
                      {sched.trainName}
                    </span>
                    <span className="text-slate-500 font-bold text-sm">
                      소요시간: {sched.duration}
                    </span>
                    <span className="text-emerald-700 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded">
                      {sched.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-2xl sm:text-3xl font-black text-slate-900">
                    <div>
                      {sched.departureTime}
                      <span className="text-sm font-bold text-slate-500 block">
                        {departure}
                      </span>
                    </div>
                    <span className="text-slate-400">→</span>
                    <div>
                      {sched.arrivalTime}
                      <span className="text-sm font-bold text-slate-500 block">
                        {arrival}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
                  <div className="text-right sm:text-right">
                    <div className="text-xs text-slate-400 line-through">
                      정상가 {(sched.standardPrice * passengerCount).toLocaleString()}원
                    </div>
                    <div className="text-2xl font-black text-blue-700">
                      {(sched.seniorDiscountPrice * passengerCount).toLocaleString()}원
                    </div>
                    <div className="text-xs font-bold text-emerald-700">
                      어르신 30% 할인 ({passengerCount}명)
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectTrain(sched)}
                    className="min-h-[60px] px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xl rounded-2xl shadow-md transition-all w-full sm:w-auto"
                  >
                    좌석 선택
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: 좌석 선택 */}
      {step === 'seat' && selectedTrain && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-300 shadow-sm space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              원하시는 좌석 위치를 골라주세요
            </h2>
            <p className="text-lg text-slate-600">
              어르신들이 가장 선호하시는 편안한 좌석입니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TRAIN_SEATS.map((seat) => (
                <button
                  key={seat.id}
                  onClick={() => handleSelectSeat(seat)}
                  className="p-6 rounded-2xl border-3 border-slate-300 hover:border-blue-600 bg-slate-50 hover:bg-blue-50/50 text-left transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-blue-900 group-hover:text-blue-700">
                      {seat.car} {seat.seat}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-900 font-bold text-xs rounded-full">
                      {seat.type}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-slate-800">
                    {seat.location}
                  </div>
                  <div className="text-sm text-slate-500">
                    터치하시면 이 좌석으로 바로 결정됩니다.
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: 가상 모의 결제 단계 */}
      {step === 'pay' && selectedTrain && selectedSeat && (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-300 shadow-md space-y-6">
            <div className="text-center space-y-2 pb-4 border-b">
              <span className="px-4 py-1.5 bg-emerald-100 text-emerald-900 font-black text-sm rounded-full inline-block">
                안심 가상 결제
              </span>
              <h2 className="text-3xl font-black text-slate-900">
                예매 내역 확인 및 모의 결제
              </h2>
              <p className="text-base text-slate-600">
                실제 돈이 결제되지 않는 안전한 연습 화면입니다.
              </p>
            </div>

            <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-lg">
              <div className="flex justify-between font-medium text-slate-600">
                <span>열차 정보:</span>
                <span className="font-bold text-slate-900">{selectedTrain.trainName} ({departure} → {arrival})</span>
              </div>
              <div className="flex justify-between font-medium text-slate-600">
                <span>일시:</span>
                <span className="font-bold text-slate-900">{travelDate} {selectedTrain.departureTime}</span>
              </div>
              <div className="flex justify-between font-medium text-slate-600">
                <span>지정 좌석:</span>
                <span className="font-bold text-blue-700">{selectedSeat.car} {selectedSeat.seat} ({selectedSeat.location})</span>
              </div>
              <div className="flex justify-between font-medium text-slate-600">
                <span>승객 인원:</span>
                <span className="font-bold text-slate-900">어르신 {passengerCount}명 (경로 30% 할인)</span>
              </div>
              <div className="pt-3 border-t flex justify-between font-black text-xl text-slate-900">
                <span>결제 예정 금액:</span>
                <span className="text-blue-700">0원 (연습용 무료)</span>
              </div>
            </div>

            <button
              onClick={handleConfirmPayment}
              disabled={isProcessingPayment}
              className="w-full min-h-[72px] py-4 px-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white rounded-2xl font-black text-2xl flex items-center justify-center gap-3 shadow-lg transition-all"
            >
              {isProcessingPayment ? (
                <span>가상 발권 진행 중...</span>
              ) : (
                <>
                  <CreditCard className="w-8 h-8" />
                  <span>모의 승차권 발권하기 (0원)</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
