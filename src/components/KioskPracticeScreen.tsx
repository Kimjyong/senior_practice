/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Plus,
  Minus,
  Utensils,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Volume2,
  Trash2,
  ShoppingBag,
  Store,
  Sparkles,
} from 'lucide-react';
import {
  KIOSK_CATEGORIES,
  KIOSK_PRODUCTS,
  KioskProduct,
} from '../data/serviceData';
import { KioskCartItem, KioskOrderData, ScreenId } from '../types';
import { speechHelper } from '../utils/speech';

interface KioskPracticeScreenProps {
  onCompleteOrder: (data: KioskOrderData) => void;
  onNavigate: (screen: ScreenId) => void;
  soundEnabled: boolean;
}

export const KioskPracticeScreen: React.FC<KioskPracticeScreenProps> = ({
  onCompleteOrder,
  onNavigate,
  soundEnabled,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('popular');
  const [cart, setCart] = useState<KioskCartItem[]>([]);
  const [orderType, setOrderType] = useState<'store' | 'togo'>('store');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isPaying, setIsPaying] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const guideText =
    '식당 무인 키오스크 주문 실습입니다. 드시고 싶은 메뉴를 손가락으로 눌러 담으신 후, 아래쪽 주문하기 버튼을 눌러주세요.';

  useEffect(() => {
    if (soundEnabled) {
      speechHelper.speak(guideText);
    }
    return () => {
      speechHelper.stop();
    };
  }, [soundEnabled]);

  // Filter products by selected category
  const filteredProducts = KIOSK_PRODUCTS.filter((prod) => {
    if (selectedCategory === 'popular') return prod.isPopular;
    return prod.category === selectedCategory;
  });

  const handleAddToCart = (product: KioskProduct) => {
    setErrorMessage('');
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          quantity: 1,
        },
      ];
    });

    if (soundEnabled) {
      speechHelper.speak(`${product.name}이 담겼습니다.`);
    }
  };

  const handleIncrease = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleStartCheckout = () => {
    // Validation check as strictly requested in PRD: "주문할 메뉴를 하나 이상 선택해 주세요."
    if (cart.length === 0) {
      const msg = '주문할 메뉴를 하나 이상 선택해 주세요.';
      setErrorMessage(msg);
      if (soundEnabled) {
        speechHelper.speak(msg);
      }
      return;
    }

    setErrorMessage('');
    setShowCheckoutModal(true);
    if (soundEnabled) {
      speechHelper.speak(
        '매장에서 식사하실지, 포장해 가실지 선택하시고 모의 결제를 진행해 주세요.'
      );
    }
  };

  const handleFinalPay = (method: 'card' | 'pay' | 'cash') => {
    setIsPaying(true);
    if (soundEnabled) {
      speechHelper.speak('카드를 IC칩 투입구에 넣는 중입니다. 실제 돈은 결제되지 않습니다.');
    }

    setTimeout(() => {
      setIsPaying(false);
      setShowCheckoutModal(false);

      const orderData: KioskOrderData = {
        orderNumber: '072',
        orderType: orderType,
        paymentMethod: method,
        items: cart,
        totalPrice: totalPrice,
        orderTime: '11:45:20',
      };
      onCompleteOrder(orderData);
    }, 1500);
  };

  return (
    <div className="space-y-6 py-4 sm:py-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-amber-700 font-bold text-base">
              생활 서비스 실습 ③
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            🍔 식당 무인 키오스크 주문하기
          </h1>
          <p className="text-lg sm:text-xl text-slate-600">
            패스트푸드점이나 식당에서 볼 수 있는 무인 주문기 화면을 그대로 연습해보세요.
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

      {/* Simulated Kiosk Machine Frame */}
      <div className="bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-2xl border-4 border-slate-700 text-slate-900">
        {/* Kiosk Screen Header */}
        <div className="bg-amber-500 text-slate-950 px-6 py-4 rounded-2xl flex items-center justify-between mb-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Utensils className="w-7 h-7" />
            <span className="text-2xl font-black">늘푸른 정성 식당 키오스크</span>
          </div>
          <span className="text-xs sm:text-sm font-black bg-amber-600 text-white px-3 py-1 rounded-full">
            모의 연습 화면 (실제 결제 없음)
          </span>
        </div>

        {/* Kiosk Category Tabs (Large touch targets) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
          {KIOSK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                if (soundEnabled) {
                  speechHelper.speak(`${cat.label} 메뉴입니다.`);
                }
              }}
              className={`p-3.5 sm:p-4 rounded-2xl font-black text-base sm:text-lg min-h-[58px] transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 shadow-md ring-4 ring-amber-300'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="bg-slate-100 rounded-2xl p-4 sm:p-6 min-h-[380px] mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((prod) => (
              <button
                key={prod.id}
                onClick={() => handleAddToCart(prod)}
                className="bg-white rounded-2xl p-5 border-3 border-slate-300 hover:border-amber-500 hover:shadow-lg text-left transition-all flex flex-col justify-between group active:scale-[0.98]"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-amber-600">
                      {prod.name}
                    </span>
                    {prod.isPopular && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-xs font-black rounded">
                        인기
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 font-medium mb-3">
                    {prod.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
                    {prod.price.toLocaleString()}원
                  </span>
                  <span className="px-3.5 py-1.5 bg-amber-500 group-hover:bg-amber-600 text-slate-950 font-black text-sm rounded-xl flex items-center gap-1 shadow-sm">
                    <Plus className="w-4 h-4" /> 담기
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Cart & Order Tray (High visibility for seniors) */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border-3 border-amber-400 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-7 h-7 text-amber-600" />
              <span className="text-2xl font-black text-slate-900">
                선택한 주문 내역 ({totalCount}개)
              </span>
            </div>
            {cart.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-sm font-bold text-slate-500 hover:text-rose-600 flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> 전체 비우기
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="py-8 text-center text-slate-500 font-bold text-lg">
              👆 위에서 드시고 싶은 메뉴를 눌러주시면 여기에 담깁니다.
            </div>
          ) : (
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 gap-3"
                >
                  <div>
                    <span className="text-lg sm:text-xl font-black text-slate-900">
                      {item.name}
                    </span>
                    <div className="text-sm text-slate-500 font-semibold tabular-nums">
                      {(item.price * item.quantity).toLocaleString()}원
                    </div>
                  </div>

                  {/* Large 60px quantity buttons as strictly requested in PRD */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="w-14 h-14 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 flex items-center justify-center font-black text-2xl active:scale-95 transition-all"
                      aria-label={`${item.name} 수량 줄이기`}
                    >
                      <Minus className="w-6 h-6" />
                    </button>
                    <span className="w-12 text-center text-2xl font-black tabular-nums text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="w-14 h-14 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center justify-center font-black text-2xl active:scale-95 transition-all shadow-sm"
                      aria-label={`${item.name} 수량 늘리기`}
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Total & Order Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-sm font-bold text-slate-500 block">총 결제 금액</span>
              <span className="text-3xl sm:text-4xl font-black text-amber-600 tabular-nums">
                {totalPrice.toLocaleString()}원
              </span>
            </div>

            <button
              onClick={handleStartCheckout}
              className="w-full sm:w-auto min-h-[68px] px-10 py-4 bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-slate-950 font-black text-2xl sm:text-3xl rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-all"
            >
              <span>주문하기</span>
              <span className="text-xl">({totalCount}개)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Options Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border-4 border-slate-700 shadow-2xl space-y-6 animate-fade-in text-slate-900">
            <div className="text-center space-y-1 pb-4 border-b">
              <h2 className="text-3xl font-black text-slate-900">
                식사 장소와 결제 방법 선택
              </h2>
              <p className="text-base text-slate-600">
                모의 연습이므로 실제 돈은 결제되지 않습니다.
              </p>
            </div>

            {/* 1. 매장 식사 vs 포장 */}
            <div className="space-y-3">
              <div className="text-lg font-black text-slate-800">
                1. 식사 장소를 선택하세요:
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setOrderType('store')}
                  className={`p-4 rounded-2xl font-black text-xl flex flex-col items-center justify-center gap-2 border-3 transition-all min-h-[90px] ${
                    orderType === 'store'
                      ? 'bg-amber-100 border-amber-600 text-slate-950 shadow-md ring-2 ring-amber-400'
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Store className="w-8 h-8 text-amber-600" />
                  <span>매장에서 식사</span>
                </button>
                <button
                  onClick={() => setOrderType('togo')}
                  className={`p-4 rounded-2xl font-black text-xl flex flex-col items-center justify-center gap-2 border-3 transition-all min-h-[90px] ${
                    orderType === 'togo'
                      ? 'bg-amber-100 border-amber-600 text-slate-950 shadow-md ring-2 ring-amber-400'
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <ShoppingBag className="w-8 h-8 text-amber-600" />
                  <span>포장해 가기</span>
                </button>
              </div>
            </div>

            {/* 2. 결제 방법 선택 */}
            <div className="space-y-3">
              <div className="text-lg font-black text-slate-800">
                2. 결제 방법을 누르면 완료됩니다:
              </div>
              <div className="space-y-2.5">
                <button
                  onClick={() => handleFinalPay('card')}
                  disabled={isPaying}
                  className="w-full p-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xl sm:text-2xl flex items-center justify-center gap-3 shadow-md min-h-[64px]"
                >
                  <CreditCard className="w-7 h-7" />
                  <span>{isPaying ? '카드 IC칩 투입 중...' : '신용카드 모의 결제 (0원)'}</span>
                </button>
                <button
                  onClick={() => handleFinalPay('pay')}
                  disabled={isPaying}
                  className="w-full p-4 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black text-xl sm:text-2xl flex items-center justify-center gap-3 shadow-md min-h-[64px]"
                >
                  <span>삼성페이 / 카카오페이 체험</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowCheckoutModal(false)}
              className="w-full py-3 bg-slate-200 hover:bg-slate-300 rounded-xl font-bold text-slate-800"
            >
              닫기 / 메뉴 다시 고르기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
