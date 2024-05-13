import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../common/Footer'
import Scrab from '../../assets/feed/scrab.svg';
import Option from '../../assets/feed/option.svg';
import FeedContent from './FeedContent';
import TimeModal from '../Modal/TimeModal';

const scrabdummydata = [
  {
    "uuidArticleId": "b64b8364-d297-4df0-af90-328c80f103ae",
    "title": "도심속 농업의 가치 즐긴다'...청주 도시농업 페스티벌",
    "category": "문화",
    "content": "'2024 도시농업 페스티벌'이 이틀간 일정으로 3일 청주시 상당구 남일면 농업기술센터 유기농복합단지에서 개막한다.\n\n▲도시농업 페스티벌이 열리는 청주시 농업기술센터옆 유채꽃밭.[KPI뉴스]\n\n청주시는 '생명문화도시 청주! 농업을 만나다!'를 슬로건으로 관람객들이 도심 속에서 농업의 가치를 즐길 수 있도록 24개의 전시행사와 34개의 농업 관련 체험행사 등을 조성했다.\n\n또 농업기술센터와 인접한 무심천 수변에 4만3774㎡ 규모의 유채꽃밭과 산책로를 만들고 시민과 관광객들이 휴식을 취할 수 있는 쉼터와 포토존도 준비했다.\n\n재활용 컵을 활용한 고추, 방울토마토, 마리골드 모종 심기와 곤충 샌드아트 체험, 장난감 농기계 체험, 미생물 활용 세제 만들기 등 무료 체험행사도 열린다.\n\n시는 페스티벌 기간 주차 편의를 위해 셔틀버스(상수도사업본부 임시주차장)를 운영한다.\n\nKPI뉴스 / 박상준 기자 psj@kpinews.kr\n\n[저작권자ⓒ KPI뉴스. 무단전재-재배포 금지]",
    "createdDate": "2024-05-03T03:12:00",
    "image": "https://www.kpinews.kr/data/upi/image/2024/05/02/p1065604016205315_768_thum.jpg",
    "link": "https://www.kpinews.kr/newsView/1065604016205315",
    "articleTime": "00:01:29"
  },
  {
    "uuidArticleId": "497da812-94fa-423a-ba70-cc465b0e8a6d",
    "title": "존 리 “NASA 경험 적용…우주항공청 ‘원팀’ 구성할 것”",
    "category": "문화",
    "content": "존 리 초대 우주항공청 임무본부장 내정자가 미국 항공우주국, 나사(NASA)에서 일한 경험을 한국의 우주항공청에 적용하겠다고 밝혔습니다.\n\n\n\n나사 출신으로 우주청의 연구개발(R&D)을 총괄하게 된 존 리 임무본부장 내정자는 오늘(2일) 서울 광화문에서 과학기술정보통신부 출입기자단과 가진 간담회을 갖고, “협력적 조직문화를 만들어 ‘원팀’을 구성하겠다”며, “직원들이 우주청 전체의 목표를 지향하는 큰 그림을 보길 바란다”고 강조했습니다.\n\n\n\n리 내정자는 “NASA에서 30년간 일하며 본 것을 한국에 어떻게 적용할지 고민하고 있다”고 말했습니다. 또, “은퇴 이후 지난해 한국의 기술과 전문가를 살펴보며, 충분히 할 수 있다는 느낌이 있었다”며 한국의 잠재력을 보고 본부장 역할을 맡았다고 설명했습니다.\n\n\n\n윤영빈 초대 우주청장 내정자는 우주청의 역할과 관련해 “우주 사업의 주요 역할을 맡기는 기업을 키워 내려 한다”고 말했습니다.\n\n\n\n윤 내정자는 “지금까지 기업은 우주 분야에서 주도적 역할이라기보다 사업을 통해 용역을 받는 부분적 역할이었다”며, “기업을 키워내야 세계적인 우주산업을 육성할 수 있다”고 강조했습니다.\n\n\n\n이어, “발사체에선 재사용 발사체를 쏘는 선도기업이 나오며 전 세계 패러다임이 바뀌고, 위성은 소형 위성을 여러 대 쏘아 중대형 위성 성능을 발휘한다”며 “트렌드가 바뀌고 있는데 우리는 그런 트렌드를 쫓아가지 못하는 상황”이라고 설명했습니다.\n\n\n\n또, “얼마나 빨리 쫓아가느냐가 경쟁력”이라며 “그런 마인드를 가진 민간기업이 있다면, 그 기업이 우주항공청의 관심을 받을 기업”이라고 강조했습니다.\n\n\n\n내정자들은 우주청이 펼칠 임무와 구상하고 있는 정책 등에 대한 구체적인 사항에 대해서는 개청 이후에 설명하겠다며 말을 아꼈습니다.\n\n\n\n노경원 우주청 차장 내정자는 “전문가들과 우주청 비전과 임무, 주요 사업에 대한 전략 기획과 검토 과정에 있다”며 “준비되면 우주청이 출범한 후 정리해 발표할 수 있을 것”이라고 말했습니다.\n\n\n\n내정자들은 현 시점에서 우주청 개청 준비의 가장 큰 과제로 주요 연구 임무를 맡을 부문장 인선을 꼽았습니다.\n\n\n\n윤 내정자는 “임무본부 산하 부문장 역할이 매우 중요하다고 생각한다”며 “굉장히 심사숙고하며 하고 있어 약간 시간이 걸릴 것”이라고 말했습니다.\n\n\n\n우주항공청은 오는 27일 경남 사천에서 개청합니다. 정원은 총 293명으로 개청 시점엔 약 100명이 넘는 인원이 일을 시작할 것으로 보입니다.\n\n\n\n[사진 출처 : 연합뉴스]\n\n\n\n■ 제보하기\n\n▷ 카카오톡 : 'KBS제보' 검색, 채널 추가\n\n▷ 전화 : 02-781-1234, 4444\n\n▷ 이메일 : kbs1234@kbs.co.kr\n\n▷ 유튜브, 네이버, 카카오에서도 KBS뉴스를 구독해주세요!",
    "createdDate": "2024-05-03T03:10:00",
    "image": "http://news.kbs.co.kr/data/news/2024/05/02/20240502_I1QEu4.jpg",
    "link": "https://news.kbs.co.kr/news/pc/view/view.do?ncd=7954616&ref=A",
    "articleTime": "00:02:21"
  },
  {
    "uuidArticleId": "f7cf1495-c631-4b78-b4bf-d4e88e396087",
    "title": "[ICT 종합] 아이즈엔터 및 엠엔비 소식 외",
    "category": "문화",
    "content": "■ ICT 뉴스\n\n-엔에이치엔 페이코(NHN PAYCO, 대표 정연훈, 이하 NHN페이코)는 헬스케어 서비스 건강버디를 출시하고 매월 1일마다 선착순 포인트 지급 프로모션을 실시한다고 밝혔다.\n\n건강버디 서비스 출시로 페이코 이용자라면 병원에 방문할 필요 없이, 앱을 활용해 손쉽게 나의 건강위험을 예측하고, 내 주변 병원의 비급여 항목 진료비를 조회할 수 있게 됐다. 주요 질환 발병 통계 지수 분석 메뉴에서는 ▲고혈압 ▲당뇨 ▲대사증후군 ▲심혈관질환 ▲뇌혈관질환 ▲만성신장병 ▲알츠하이머 총 7가지 질병을 다루며, 암 발병 통계 지수 분석 메뉴에는 ▲위암 ▲대장암 ▲유방암 ▲폐암 ▲간암 ▲췌장암 ▲신장암 ▲갑상샘암 ▲담낭암 총 9가지 암과 관련한 정보를 표시한다. 각 질환 및 암과 관련한 나의 통계 지수, 건강 등수를 알려주며 동일 연령대 평균 유병률, 1인당 연간 진료비, 건강 지수 개선을 위한 좋은 습관 등을 함께 안내해 위험 요소를 사전 관리하고 대비할 수 있게 돕는다. 맞춤 영양성분 추천 메뉴에서는 나에게 필요한 영양성분과 주의 영양성분을 표시해 영양제 복용 시 참고할 수 있다.\n\n-카카오(대표이사 정신아)는 2일 이사회를 열고 인공지능 연구/개발 자회사 카카오브레인(각자대표 김병학, 김일두)의 초거대 AI 기반 언어 모델과 이미지 생성 모델 등을 영업 양수도하는 안건을 의결했다. 영업 양수도 및 조직 통합 절차는 6월 중 마무리 예정이다.\n\n카카오는 빠르게 변화하는 AI 시대에 맞춰 AI 기술의 일상화·대중화를 추진해 갈 계획이다. 초거대 AI 언어모델 ‘Ko-GPT’를 비롯해 텍스트 기반 이미지 생성모델 ‘칼로(Karlo)’, 다양한 경량화 언어모델 등을 보유한 카카오브레인의 기술 역량과 카카오가 보유한 서비스 강점을 결합해 속도감 있게 AI 서비스를 내놓는 것이 목표다.\n\n-스틸시리즈 (SteelSeries, CEO: 에티샴 라바니)에서 게임 오디오 부문 무수한 수상 경력을 자랑하는 하이엔드 게이밍 헤드셋 아크티스 노바 프로 무선 화이트 (ARCTIS NOVA PRO WL WHITE)를 국내 본격 출시했다.\n\n2022년 스틸시리즈가 출시한 아크티스 노바 프로 시리즈는 평론가들의 찬사를 받으며 수많은 상을 수상했고, 게이밍 헤드셋 시장에서 프리미엄, 럭셔리, 하이엔드라는 새로운 카테고리를 구축한 제품이다.\n\n-인공지능(AI)을 기반으로 엔터테인먼트 콘텐츠를 개발하는 아이즈엔터테인먼트(대표이사 남궁훈, 이하 아이즈엔터)가 총 60억 원의 추가 투자를 유치했다. 투자에는 LB인베스트먼트(대표이사 박기호)와 스톤브릿지벤처스(대표이사 유승운)가, 각각 50억 원과 10억 원 규모로 참여했다.\n\n이번 투자로 지난 3월 본엔젤스벤처파트너스로부터 유치한 100억 원 투자를 포함해, 누적 160억 원 규모의 시드 투자 라운드를 마무리했다. 아이즈엔터는 AI 시대의 새로운 놀이문화를 조성하겠다는 목표를 갖고 작년 11월 설립됐다. AI를 활용해 사용자 관심사에 맞는 콘텐츠를 연결하여 팬덤을 형성하고 다양한 상호작용이 가능한 엔터테인먼트 콘텐츠를 선보일 방침이다. 특히, 무한한 잠재력을 보유한 K-팝에 AI 기술을 활용해 또 다른 기회를 만들어 내고, 전통 엔터테인먼트 시장을 확대함과 동시에 새로운 문화를 형성해 나가며, AI 시대의 K-팝과 K-컬처의 저력을 증명해 나갈 계획이다.\n\n■ 기타\n\n-넷마블(대표 권영식, 김병규)과 코웨이(대표 서장원)가 지난달 30일 서울 LW컨벤션 센터서 진행된 ‘민간(공공) 기업 장애인선수단 창단 활성화 선포식’에서 ‘장애인선수단 운영기업 표창장’을 수상했다고 2일 밝혔다.\n\n서울특별시와 서울특별시장애인체육대회가 주최·주관하는 이번 선포식은 장애인실업팀 창단을 확대하고 장애인의 고용 촉진을 위해 개최됐다. 넷마블과 넷마블문화재단(이사장 방준혁)은 게임업계 최초로 지난 2019년 3월 넷마블조정선수단을 창단해, 열악한 여건으로 훈련에 집중하기 어려운 선수들에게 안정적인 고용 환경 및 체계적인 훈련 기회를 제공하는 등 장애인 체육 진흥과 장기적 자립에 대한 공헌을 인정받아 표창장을 수상하게 됐다.\n\n-엔에이치엔 에듀(NHN Edu, 대표 강용혁, 이하 NHN에듀)는 학교의 등·하교 알림을 제공하는 아이알리미 서비스가 아이엠스쿨에서도 제공된다고 밝혔다. 이번 서비스 연동으로 아이엠스쿨은 알림장, 가정통신문, 급식 등 전반적인 학교 소식을 알려주는 기능에 더해 실시간 출결 알림까지 더하며 사용자 편의성을 크게 강화하게 되었다.\n\n누적 회원수 650만 명, 연동된 학교 수 12,400여 곳을 자랑하는 아이엠스쿨은 명실상부 학부모 필수 앱으로 자리잡으며 국민 알림장 역할을 톡톡히 수행 중이다. 학교 소식은 물론 교육정보 콘텐츠, 학원 소식, 커뮤니티, 교육연계 추천도서 등 다양한 정보들을 한데 모아 종합 플랫폼 중심의 서비스들을 제공하고 있다. 아이엠스쿨은 이번 제휴를 통해 학교와 학원 소식을 한 번에 확인하는 원스톱 서비스 구현에 주력했다. 기존의 자녀 안심 알리미 서비스들은 알림 서비스를 유료 문자 형태로 이용하거나 알리미 자체 앱을 써야했다. 만약 학교 알림장 앱, 출결 서비스, 학급 알림장 앱 등 서비스를 각각 이용할 경우 다수의 앱을 설치해야 하는 번거로움이 동반되었다. 이에 반해 아이엠스쿨은 학부모들의 편의성 증대를 위해 ▲실시간 출결 알림 ▲알림장 ▲급식 ▲학급 소식 등 내 자녀와 관련된 각종 정보를 하나의 앱을 통해 편리하게 확인할 수 있도록 메뉴 구성을 개편하였다.\n\n-카카오(대표이사 정신아)의 카카오톡 선물하기가 인기 와인과 위스키 픽업 선물 서비스를 새롭게 오픈한다고 밝혔다. 앞으로 카카오톡 선물하기에서 와인, 위스키, 보드카, 럼, 데킬라 등 주류 300여 종을 간편하게 구매∙선물하고 원하는 매장에서 원하는 날짜에 픽업할 수 있다.\n\n카카오와 GS리테일은 작년 ‘온∙오프라인 연계 서비스를 위한 전략적 제휴 파트너십’을 체결하고 양사의 채널을 연계한 서비스를 준비해왔다. 고객의 쇼핑 편의성을 높이기 위한 첫번째 프로젝트로 주류 픽업 서비스를 선보인다.\n\n-카카오엔터테인먼트의 뮤직플랫폼 멜론(Melon)은 인디음악 활성화 프로젝트 ‘트랙제로’를 통해 5월 ‘이달의 아티스트’로 선정된 옥상달빛과 함께한 다양한 음악 이야기들을 5월 2일 오전 10시 30분 멜론 스테이션에서 공개한다.\n\n24살에 동아방송예술대학교에서 운명적으로 처음 만나 올해 데뷔 15년차를 맞이한 옥상달빛은 이날 첫 만남 에피소드를 비롯해 음악을 시작하게 된 계기, 팀명 탄생 비화 등 웃음을 자아내는 다양하고 솔직한 이야기들을 풀어놓으며 솔직하고 센스 넘치는 입담을 펼친다.\n\n-유베이스 그룹사 넥서스 커뮤니티 소정환 전무는 '차세대 AICC 컨택센터 컨퍼런스’에서 \"AICC(AI Contact Center, 이하 AICC) 도입의 성공은 기술에 운영 경험을 어떻게 담을 것인지가 좌우한다. 전문 BPO(Business Process Outsourcing)사의 운영 역량과 협업이 중요하다”라고 말했다.\n\n소 전무는 “이제 고객센터에 들어가는 시스템은 AI를 빼고 이야기할 수 없는 상황이다”라며 “성공적인 AICC를 구축하고 운영하기 위해서는 IPCC(Internet Protocol Contact Center, 이하 IPCC)솔루션을 기본으로 최근 화두가 되고 있는 생성형 AI인 LLM(대규모 언어 모델, Large Language Model), TA(텍스트분석, Text Analytics)등 주요 AI기술이 각각 따로 운영되는 게 아니라 최초 설계부터 통합적으로 구축해야 한다. 무엇보다 운영조직과 연계되어야 성과를 낼 수 있다\"라 전했다.\n\n-넷마블(대표 권영식, 김병규)은 콘텐츠 마케팅 자회사 엠엔비(MNB, 대표 배민호)가 뷰티 브랜드 성분에디터와 함께 한정판 기획세트를 출시했다고 2일 밝혔다.\n\n콜라보 한정 ‘쿵야 레스토랑즈x성분에디터 그린토마토 포어 리프팅 앰플 플러스 30ml 기획세트’는 ‘그린토마토 모공앰플(3개입)’과 ‘양파쿵야 키링 1종(랜덤 증정)’ 구성이다. 5월 한 달 동안 전국 올리브영 오프라인 매장 및 온라인 스토어에서 구매 가능하다. 엠엔비는 이번 협업을 기념해 쿵야 레스토랑즈 공식 인스타그램과 올리브영 라이브 등을 통해 다양한 이벤트를 실시한다. 먼저, 오는 10일까지 쿵야 레스토랑즈 인스타그램 계정을 팔로우하고 기획팩 출시 관련 기대평을 댓글로 남기면 추첨을 통해 3명에게 ‘성분에디터x쿵야 레스토랑즈 한정판 일회용 카메라’를 선물한다.\n\n김태만 기자 ktman21c@gamevu.co.kr\n\n<저작권자 © 게임뷰, 무단 전재 및 재배포 금지>",
    "createdDate": "2024-05-03T03:10:00",
    "image": "http://www.gamevu.co.kr/news/photo/202405/32637_87116_4123.jpg",
    "link": "http://www.gamevu.co.kr/news/articleView.html?idxno=32637",
    "articleTime": "00:05:11"
  }
]
function Feed() {
  const [feedState, setFeedState] = useState('실시간'); //피드의 카테고리
  const [feedList, setFeedList] = useState([]);// 피드 데이터 받아옴
  const [scrabList,setScrabList] = useState([]);// 스크랩 데이터 받아옴
  const [bookmarkStates,setBookmarkStates] = useState([]); // 즐겨찾기 상태 true인지 false인지
  const memberId = localStorage.getItem('memberId')
  const timer = localStorage.getItem('timer');
  const category = localStorage.getItem('category');
  const navigate = useNavigate();
  const handleFeedState = (state) => {
      setFeedState(state);
  }
  const handleFeed = (id) => {
    navigate(`/feed_detail/${id}`);
  }
  useEffect(() => {
    // - api통신 -
    const fetchLiveFeed = async(name) => {
      try{
        if(name==='실시간'){
          const response = await axios.get('/api/articles');
          setFeedList(response.data.articles);
          console.log("fetchLive: ",response.data.articles);
        }
        else if(name==='추천'){
          const response = await axios.get(`/api/articles/recommend?category=${category}&target=${timer}`);
          setFeedList(response.data);
          console.log("fetchRecommend: ",response.data);
        }
      }
      catch(error){
        new Error(error)
      }
    }
    

    setScrabList(scrabdummydata);
    if (feedState === '실시간') {
      const newBookmarkStates = {};
      feedList.forEach((article)=>{
        const id = article.id;
        const category = article.category;
        newBookmarkStates[article.id] ={
          id:id,
          category:category,
          state: scrabdummydata.length>0&&scrabdummydata.some((scrab)=>scrab.uuidArticleId===id)||false,
        }
      })
      fetchLiveFeed('실시간');
      setBookmarkStates(newBookmarkStates);
    }
    else if (feedState === '추천') {
      const newBookmarkStates = {};
      feedList.forEach((article)=>{
        const id = article.id;
        const category = article.category;
        newBookmarkStates[article.id] ={
          id:id,
          category:category,
          state: scrabdummydata.length>0&&scrabdummydata.some((scrab)=>scrab.uuidArticleId===article.id)||false,
        }
      })
      fetchLiveFeed('추천');
      setBookmarkStates(newBookmarkStates);
    }
    else {
      setFeedList(scrabdummydata);
      const newBookmarkStates = {};
      scrabdummydata.forEach((article)=>{
        newBookmarkStates[article.uuidArticleId] ={
          id:article.uuidArticleId,
          category:article.category,
          state:true,
        }
      })
      setBookmarkStates(newBookmarkStates)
    }

  }, [feedState])
  
  
  const handleBookmark=(id)=>{
    // 메인페이지에서 scrap get api불러옴 -> 리스트 비교
    // const postBookmark= async() =>{
    //     try{
    //         const response = await axios.post('/api/scrap',{
    //             "memberId": memberId,
    //             "articleId": id
    //         })
    //     }
    //     catch(error){
    //         new Error(error);
    //     }
    // }

    //즐겨찾기 삭제하는 부분
    if(feedState==='스크랩'){
        const deleteBookmark=async() => {
            try{
                // const response = await axios.delete('/api/scrap/cancel',{
                //     "memberId": memberId,
                //     "articleId": id,
                // })
                // console.log(response.data)
                setFeedList((prev)=>(prev.filter((item)=> item.uuidArticleId!==id)));
            }
            catch(error){
                new Error(error);
            }
        }
        deleteBookmark()
    }
    else{
      //즐겨찾기되어있는 경우
        if(bookmarkStates[id].state){
          const deleteBookmark=async() => {
            try{
                // const response = await axios.delete('/api/scrap/cancel',{
                //     "memberId": memberId,
                //     "articleId": id,
                // })
                // console.log(response.data)
                setBookmarkStates((prev)=>{
                  const newBookmarkStates={...prev};
                  newBookmarkStates[id]={
                    id:id,
                    state: !prev[id]?.state || false,
                  }
                  return newBookmarkStates;
                })
            }
            catch(error){
                new Error(error);
            }
        }
        deleteBookmark()
        }
        //즐겨찾기되어있지 않은 경우
        else{
          setBookmarkStates((prev)=>{
            const newBookmarkStates={...prev};
            newBookmarkStates[id]={
              id:id,
              state: !prev[id]?.state || true,
            }
            return newBookmarkStates;
          })
          const postBookmark = async() => {
            try{
              // const response = await axios.post(`/api/scrap`,{
              //   "memberId": memberId,
              //   "articleId": id,
              // });
              
            }
            catch(error){
              new Error(error);
            }
          }
          postBookmark();
        }
    }
}

  const fs = feedState === '실시간' || feedState === '추천' ? feedList : feedList
  return (
    <div className='feed-wrap'>
      <div className='feed-header-wrap'>
        <button className={feedState === '실시간' ? 'feed-header active' : 'feed-header'} onClick={() => handleFeedState('실시간')}>실시간</button>
        <button className={feedState === '추천' ? 'feed-header active' : 'feed-header'} onClick={() => handleFeedState('추천')}>추천</button>
        <button className={feedState === '스크랩' ? 'feed-header active' : 'feed-header'} onClick={() => handleFeedState('스크랩')}>스크랩</button>

      </div>
      <div className='feed-content-wrap'>
        {Array.isArray(fs) && fs.map((feed, index) => (
          feedState ==='실시간'||feedState==='추천' ? 
          <FeedContent key={index} feedState={feedState} bookmarkStates={bookmarkStates} setBookmarkStates={setBookmarkStates} feed={feed} handleBookmark={handleBookmark} onClick={() => handleFeed(feed.id)}/>
          :
          <FeedContent key={index} setFeedList={setFeedList} feed={feed} feedState={feedState} handleBookmark={handleBookmark} bookmarkStates={bookmarkStates} setBookmarkStates={setBookmarkStates} onClick={() => handleFeed(feed.uuidArticleId)}/> 
        ))}
      </div>

      <TimeModal/>
      <Footer footerState={'feed'} />
    </div>
  )
}

export default Feed