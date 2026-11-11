/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import {
  CheckCircle2,
  Utensils,
  Receipt,
  RotateCcw,
  Home,
  ArrowRight,
  Volume2,
  Store,
  ShoppingBag,
} from 'lucide-react';
import { KioskOrderData, ScreenId } from '../types';
import { speechHelper } from '../utils/speech';

interface KioskResultScreenProps {
  data: KioskOrderData;
  onNavigate: (screen: ScreenId) => void;
  onRetry: () => void;
  soundEnabled: boolean;
}

export const KioskResultScreen: React.FC<KioskResultScreenProps> = ({
  data,
  onNavigate,
  onRetry,
  soundEnabled,
}) => {
  const congratText = `축하합니다! 키오스크 주문이 정상 완료되었습니다. 어르신의 주문 대기번호는 ${data.orderNumber}번입니다. 전광판에 ${data.orderNumber}번이 뜨면 음식을 받아가시면 됩니다. 참 잘하셨습니다!`;

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
      <div className="bg-amber-500 text-slate-950 rounded-3xl p-6 sm:p-8 text-center shadow-lg space-y-3">
        <div className="w-20 h-20 mx-auto rounded-full bg-white/40 flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-slate-950" />
        </div>
        <span className="px-4 py-1.5 bg-white/60 rounded-full text-sm sm:text-base font-black inline-block">
          모의 실습 성공 완료!
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">
          키오스크 주문이 완료되었습니다!
        </h1>
        <p className="text-lg sm:text-xl text-slate-900 font-bold">
          이제 햄버거 가게나 식당 키오스크 앞에서도 당황하지 않고 직접 주문하실 수 있습니다.
        </p>
      </div>

      {/* Realistic Kiosk Waiting Order Slip & Receipt */}
      <div className="bg-white rounded-3xl border-3 border-amber-400 shadow-xl overflow-hidden">
        {/* Waiting Number Banner */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 text-center space-y-2">
          <div className="text-sm font-bold text-amber-400">주문 대기번호</div>
          <div className="text-6xl sm:text-7xl font-black tracking-tight text-amber-400 tabular-nums">
            {data.orderNumber}
          </div>
          <p className="text-base sm:text-lg text-slate-300 font-medium pt-2">
            🔔 매장 전광판이나 직원이 &quot;<strong>{data.orderNumber}번 손님!</strong>&quot; 하고 부르면 카운터로 가세요.
          </p>
        </div>

        {/* Receipt Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b-2 border-slate-200">
            <div className="flex items-center gap-2">
              <Receipt className="w-6 h-6 text-slate-700" />
              <span className="text-xl font-black text-slate-900">
                주문 영수증 (가상)
              </span>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-slate-950 font-bold text-sm rounded-lg flex items-center gap-1.5">
              {data.orderType === 'store' ? (
                <>
                  <Store className="w-4 h-4 text-amber-700" /> 매장 식사
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-amber-700" /> 포장해 가기
                </>
              )}
            </span>
          </div>

          {/* Items Breakdown */}
          <div className="space-y-3">
            {data.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-base sm:text-lg text-slate-800 py-1"
              >
                <div>
                  <span className="font-black text-slate-900">{item.name}</span>
                  <span className="text-sm text-slate-500 ml-2 font-bold">
                    x {item.quantity}개
                  </span>
                </div>
                <span className="font-bold tabular-nums">
                  {(item.price * item.quantity).toLocaleString()}원
                </span>
              </div>
            ))}
          </div>

          {/* Total & Payment Method */}
          <div className="pt-4 border-t-2 border-slate-200 space-y-2">
            <div className="flex justify-between text-2xl font-black text-slate-900">
              <span>총 주문 금액</span>
              <span className="text-amber-600 tabular-nums">
                {data.totalPrice.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-slate-500">
              <span>결제 수단</span>
              <span className="text-slate-800">
                {data.paymentMethod === 'card'
                  ? '신용카드 모의 결제 (0원)'
                  : '간편 결제 모의 승인'}
              </span>
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
          <span>다시 주문해보기</span>
        </button>

        <button
          onClick={() => onNavigate('service_list')}
          className="min-h-[64px] py-4 px-6 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-2xl font-black text-xl flex items-center justify-center gap-2 shadow-md transition-all"
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
