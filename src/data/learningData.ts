/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LearningCourse } from '../types';

export const LEARNING_COURSES: LearningCourse[] = [
  {
    id: 'kakaotalk',
    title: '카카오톡 메시지 보내기',
    subtitle: '가족과 친구에게 안부 글을 적고 보내는 방법',
    iconName: 'MessageSquare',
    badgeColor: '#facc15', // Kakao yellow
    estimatedMinutes: 3,
    steps: [
      {
        stepNumber: 1,
        title: '대화 목록에서 자녀 이름 누르기',
        instruction: '화면에서 이야기하고 싶은 가족의 이름을 찾아 손가락으로 가볍게 톡 눌러주세요.',
        audioText: '1단계입니다. 화면에서 이야기하고 싶은 가족의 이름을 찾아 손가락으로 가볍게 눌러주세요.',
        tip: '손가락에 너무 힘을 주지 말고 화면을 가볍게 톡 건드리면 대화방이 열립니다.',
        phoneScreen: {
          appTitle: '카카오톡 대화 목록',
          screenType: 'chat_list',
          targetActionLabel: '딸 지영이',
          targetDescription: '딸과의 대화방을 누르세요',
        },
      },
      {
        stepNumber: 2,
        title: '글자 입력창 누르기',
        instruction: '화면 맨 아래에 있는 하얀색 네모칸을 눌러 글자를 쓸 준비를 합니다.',
        audioText: '2단계입니다. 화면 맨 아래에 있는 하얀색 글자 입력칸을 눌러주세요.',
        tip: '이 칸을 누르면 자판이 쑥 올라와서 글자를 입력할 수 있게 됩니다.',
        phoneScreen: {
          appTitle: '딸 지영이 대화방',
          screenType: 'chat_room',
          targetActionLabel: '메시지를 입력하세요...',
          targetDescription: '글자 입력칸을 가볍게 누르세요',
        },
      },
      {
        stepNumber: 3,
        title: '보낼 메시지 확인하기',
        instruction: '입력된 안부 인사 "딸아, 오늘 날씨가 춥구나. 옷 따뜻하게 입어라" 글을 확인합니다.',
        audioText: '3단계입니다. 입력된 안부 인사 글을 확인하고 전송 버튼을 누를 준비를 합니다.',
        tip: '글자를 잘못 썼을 때는 자판의 ⌫(지우기) 표를 누르면 한 글자씩 지워집니다.',
        phoneScreen: {
          appTitle: '딸 지영이 대화방',
          screenType: 'chat_room',
          targetActionLabel: '메시지 확인 완료',
          targetDescription: '작성된 글을 확인하세요',
        },
      },
      {
        stepNumber: 4,
        title: '노란색 전송(종이비행기) 버튼 누르기',
        instruction: '오른쪽 아래에 있는 노란색 [전송] 또는 종이비행기 모양 버튼을 누르면 메시지가 전송됩니다!',
        audioText: '4단계입니다. 오른쪽 아래 노란색 전송 버튼을 누르면 상대방에게 글이 갑니다. 눌러보세요!',
        tip: '종이비행기나 화살표 모양 버튼은 항상 "보내기"를 의미합니다.',
        phoneScreen: {
          appTitle: '딸 지영이 대화방',
          screenType: 'chat_room',
          targetActionLabel: '전송',
          targetDescription: '노란색 전송 버튼을 꾹 누르세요',
        },
      },
    ],
  },
  {
    id: 'photo_send',
    title: '사진 찍고 가족에게 보내기',
    subtitle: '예쁜 꽃이나 풍경을 찍어서 카카오톡으로 전송하기',
    iconName: 'Camera',
    badgeColor: '#38bdf8', // Sky blue
    estimatedMinutes: 4,
    steps: [
      {
        stepNumber: 1,
        title: '카메라 앱 켜고 촬영하기',
        instruction: '스마트폰 화면에서 동그란 렌즈 모양의 [카메라]를 켜고, 아래쪽 하얀 셔터 버튼을 누릅니다.',
        audioText: '1단계입니다. 화면 아래의 하얀색 동그라미 촬영 버튼을 눌러 사진을 찰칵 찍어보세요.',
        tip: '스마트폰이 흔들리지 않게 양손으로 잡고 촬영 버튼을 가볍게 눌러주세요.',
        phoneScreen: {
          appTitle: '카메라',
          screenType: 'camera',
          targetActionLabel: '촬영 버튼 ⚪',
          targetDescription: '하얀색 동그라미 셔터를 누르세요',
        },
      },
      {
        stepNumber: 2,
        title: '카카오톡에서 플러스(+) 버튼 찾기',
        instruction: '가족과의 대화방 왼쪽 아래에 있는 십자가 더하기(+) 버튼을 누릅니다.',
        audioText: '2단계입니다. 대화창 왼쪽 아래에 있는 더하기 모양 십자가 버튼을 눌러주세요.',
        tip: '+ 버튼은 사진, 지도, 연락처 등 추가 기능을 꺼낼 때 누르는 만능 버튼입니다.',
        phoneScreen: {
          appTitle: '딸 지영이 대화방',
          screenType: 'chat_room',
          targetActionLabel: '+ (더하기 버튼)',
          targetDescription: '왼쪽 아래 + 버튼을 누르세요',
        },
      },
      {
        stepNumber: 3,
        title: '메뉴에서 [앨범] 아이콘 선택하기',
        instruction: '나타난 메뉴 중 초록색 또는 주황색 [앨범(사진)] 아이콘을 눌러 사진 보관함으로 들어갑니다.',
        audioText: '3단계입니다. 나타난 메뉴 중에서 앨범 또는 사진 아이콘을 눌러주세요.',
        tip: '사진 모양 그림이나 [앨범]이라는 글자를 찾으시면 됩니다.',
        phoneScreen: {
          appTitle: '사진 보관함 열기',
          screenType: 'album',
          targetActionLabel: '앨범(사진)',
          targetDescription: '앨범 아이콘을 선택하세요',
        },
      },
      {
        stepNumber: 4,
        title: '방금 찍은 사진 선택 후 [전송] 누르기',
        instruction: '보내고 싶은 꽃 사진을 누르면 체크표시가 뜹니다. 오른쪽 위 [전송] 버튼을 눌러보세요.',
        audioText: '4단계입니다. 보내고 싶은 사진을 고르고, 오른쪽 위 전송 버튼을 누르면 사진이 전송됩니다.',
        tip: '사진 모서리의 작은 동그라미를 누르면 숫자가 생기며 여러 장을 한 번에 보낼 수도 있습니다.',
        phoneScreen: {
          appTitle: '사진 전송하기',
          screenType: 'album',
          targetActionLabel: '사진 전송 (1)',
          targetDescription: '오른쪽 위 전송 버튼을 누르세요',
        },
      },
    ],
  },
  {
    id: 'sms_reply',
    title: '문자 메시지 확인 및 답장하기',
    subtitle: '관공서 안내나 안부 문자를 읽고 안전하게 답장하는 방법',
    iconName: 'Mail',
    badgeColor: '#4ade80', // Green
    estimatedMinutes: 3,
    steps: [
      {
        stepNumber: 1,
        title: '문자 메시지 앱 열기',
        instruction: '화면에서 편지 봉투나 말풍선 모양의 [메시지] 아이콘을 누릅니다.',
        audioText: '1단계입니다. 화면에서 편지 봉투 모양의 문자 메시지 앱을 열어보세요.',
        tip: '새로 온 문자가 있으면 아이콘 위에 빨간색 숫자(1)가 떠 있습니다.',
        phoneScreen: {
          appTitle: '문자 메시지함',
          screenType: 'sms_list',
          targetActionLabel: '[안내] 국민건강보험공단',
          targetDescription: '새로 도착한 문자를 누르세요',
        },
      },
      {
        stepNumber: 2,
        title: '내용 읽고 안전한지 확인하기',
        instruction: '문자 내용을 천천히 읽습니다. ⚠️모르는 번호에서 온 파란색 인터넷 주소(링크)는 절대 누르지 마세요!',
        audioText: '2단계입니다. 문자 내용을 읽어보세요. 단, 모르는 번호가 보낸 인터넷 주소는 누르지 않는 것이 안전합니다.',
        tip: '공공기관이나 은행은 절대로 문자 링크를 눌러 돈을 보내라고 하지 않습니다.',
        phoneScreen: {
          appTitle: '문자 상세 내용',
          screenType: 'sms_room',
          targetActionLabel: '문자 내용 확인',
          targetDescription: '내용을 확인하고 답장 준비를 하세요',
        },
      },
      {
        stepNumber: 3,
        title: '답장 입력칸 누르고 간단한 답장 쓰기',
        instruction: '화면 아래 "문자 메시지 입력" 칸을 누르고, "네 확인했습니다 감사합니다"라고 적어봅니다.',
        audioText: '3단계입니다. 아래쪽 문자 입력칸을 누르고 감사 인사를 적어봅니다.',
        tip: '음성 마이크 🎤 모양을 누르면 말로도 글자를 편리하게 쓸 수 있습니다.',
        phoneScreen: {
          appTitle: '문자 상세 내용',
          screenType: 'sms_room',
          targetActionLabel: '네 확인했습니다',
          targetDescription: '답장 글을 확인하세요',
        },
      },
      {
        stepNumber: 4,
        title: '전송 화살표(↑) 버튼 누르기',
        instruction: '오른쪽 파란색 화살표(↑) 또는 [전송] 버튼을 누르면 상대방에게 답장이 전달됩니다.',
        audioText: '4단계입니다. 화살표 모양 전송 버튼을 누르면 답장 문자가 발송됩니다.',
        tip: '발송 후 화면에 내가 보낸 글이 말풍선으로 나타나면 잘 보내진 것입니다.',
        phoneScreen: {
          appTitle: '문자 상세 내용',
          screenType: 'sms_room',
          targetActionLabel: '전송 (↑)',
          targetDescription: '오른쪽 파란색 화살표를 누르세요',
        },
      },
    ],
  },
  {
    id: 'app_install',
    title: '필요한 앱(어플) 검색 및 설치하기',
    subtitle: '병원이나 복지관 앱을 플레이스토어에서 안전하게 찾는 방법',
    iconName: 'Download',
    badgeColor: '#818cf8', // Indigo
    estimatedMinutes: 4,
    steps: [
      {
        stepNumber: 1,
        title: 'Play 스토어(앱 장터) 열기',
        instruction: '삼각형 모양의 알록달록한 [Play 스토어] 아이콘을 손가락으로 누릅니다.',
        audioText: '1단계입니다. 알록달록한 삼각형 모양의 플레이 스토어를 열어보세요. 여기가 앱을 설치하는 가게입니다.',
        tip: '스마트폰에 새로운 기능이나 도구를 넣고 싶을 때는 항상 플레이 스토어를 이용합니다.',
        phoneScreen: {
          appTitle: 'Google Play 스토어',
          screenType: 'store_home',
          targetActionLabel: '상단 검색창 (돋보기)',
          targetDescription: '위쪽 검색창을 누르세요',
        },
      },
      {
        stepNumber: 2,
        title: '돋보기 모양 검색창 누르기',
        instruction: '화면 맨 위에 있는 긴 네모칸(돋보기 🔍 표시)을 누릅니다.',
        audioText: '2단계입니다. 화면 맨 위 돋보기 모양 검색창을 눌러주세요.',
        tip: '돋보기 표시는 언제 어디서나 "원하는 것을 찾는다"는 뜻입니다.',
        phoneScreen: {
          appTitle: '앱 검색하기',
          screenType: 'store_search',
          targetActionLabel: '"코레일톡" 검색',
          targetDescription: '찾을 앱 이름을 누르세요',
        },
      },
      {
        stepNumber: 3,
        title: '원하는 앱 이름 확인하기',
        instruction: '검색 결과에 나온 기차 예매 앱 [코레일톡]과 파란색 기차 아이콘을 확인합니다.',
        audioText: '3단계입니다. 찾으시는 앱의 이름과 별점, 만든 곳을 꼼꼼히 확인해 보세요.',
        tip: '별점이 4점 이상이고 다운로드 수가 많은 공식 앱을 고르는 것이 안전합니다.',
        phoneScreen: {
          appTitle: '검색 결과',
          screenType: 'store_detail',
          targetActionLabel: '코레일톡 (한국철도공사)',
          targetDescription: '공식 코레일톡 앱을 누르세요',
        },
      },
      {
        stepNumber: 4,
        title: '초록색 [설치] 버튼 누르기',
        instruction: '오른쪽의 큼직한 초록색 [설치] 버튼을 누르면 내 스마트폰에 자동으로 들어옵니다!',
        audioText: '4단계입니다. 초록색 설치 버튼을 누르면 다운로드가 시작됩니다. [무료] 앱은 돈이 들지 않습니다.',
        tip: '설치가 끝나면 [설치] 글자가 [열기]로 바뀝니다. 그때 누르면 바로 사용할 수 있습니다.',
        phoneScreen: {
          appTitle: '앱 설치 완료',
          screenType: 'store_detail',
          targetActionLabel: '설치하기 (무료)',
          targetDescription: '초록색 설치 버튼을 누르세요',
        },
      },
    ],
  },
];
