/*
 * 팀원 데이터. 본인 항목만 고치면 됩니다. (README 참고)
 * - 값이 빈 문자열("")이면 해당 줄/버튼은 화면에서 숨겨집니다.
 * - links 는 { github, portfolio, paper, project } 4개 슬롯. 비워두면 버튼이 숨겨집니다.
 * - 이메일·전화번호는 넣지 마세요.
 * - intro 가 "TODO" 이면 화면에는 '준비 중'으로 표시됩니다.
 * - photo 는 assets/members/ 아래 이미지 경로. 비우면 이름 첫 글자가 표시됩니다.
 *   (공개 페이지이므로 본인 동의를 받은 사진만 넣으세요)
 */
window.MEMBERS = [
  {
    name: "장병헌",
    photo: "assets/members/jang-byeongheon.jpg",
    role: "팀장 · 에이전트 설계·개발",
    affiliation: "SK AI Leader Academy (SKALA) 4기 · SSAFY 14기 · 전남대학교 철학과 졸업",
    intro: "국방·신약·결제 도메인에서 LLM 에이전트를 설계·구현해 왔습니다. LLM에게 무엇을 맡기고 무엇을 코드로 묶을지가 관심사입니다.",
    highlights: [
      "SKT 모두의 Promp.T 공모전 Life AX 부문 최우수상 (2026.8)",
      "D4D 국방 AI 해커톤 우승 (무인체계 3종 1인 운용 AI 에이전트)",
      "SKALA 신약개발 에이전트 프로젝트 (LLM 근거 수집 + 규칙 판정)",
      "Google×Solana AI Agentic Hackathon '장보고'",
      "SKALA 신약 독성 예측 경연 119팀 중 17위"
    ],
    links: {
      github: "https://github.com/jang961111-hash",
      portfolio: "https://jang961111-hash.github.io/",
      paper: "",
      project: ""
    }
  },
  {
    name: "박연주",
    role: "부팀장 · 의료영상·그래프 모델링",
    affiliation: "SK AI Leader Academy (SKALA) 4기 · 한양대학교 인공지능학과 석사",
    intro: "뇌영상(DTI·rs-fMRI)과 유전체 데이터로 알츠하이머 분류를 연구했습니다. 데이터 규모에 맞는 모델 복잡도와 통제 실험을 중시합니다.",
    highlights: [
      "멀티모달 뇌 그래프 기반 알츠하이머 분류 (DTI·rs-fMRI 그래프 융합, Directed GCN·TCN·Transformer)",
      "유전자 Transformer 위치 인코딩 비교 연구 (SNP 서열, Sinusoidal·Learnable·RoPE·ALiBi)",
      "뇌 부위별 유전자 발현(AHBA) 기반 유전자 그래프 구축",
      "한양대 계산신경영상분석(CNA) 연구실 · 서울여대 시각컴퓨팅·의료영상(VCMI) 연구실"
    ],
    links: { github: "", portfolio: "assets/docs/portfolio-park-yeonju.pdf", paper: "", project: "" }
  },
  {
    name: "신민서",
    photo: "", // 본인 동의 후 assets/members/shin-minseo.jpg 로 추가
    role: "팀원 · 비전·멀티모달 / 의료 데이터",
    affiliation: "SK AI Leader Academy (SKALA) 4기 · 홍익대학교 컴퓨터공학과 졸업",
    intro: "학부연구생으로 비전·멀티모달 연구를 하며 병원 협업 의료 AI 프로젝트 3건(재활, 안면 재건, 환자 위험행동 감시)을 수행했습니다.",
    highlights: [
      "가톨릭대 여의도성모병원 연구 지원: 정형외과 수술 후 재활 앱, 임상 데이터 포즈 인식 오류 개선 · 특허 출원(10-2024-0115574)",
      "세브란스병원 협업: 2D 다시점 이미지 기반 안면부 3D Mesh 재구성(가상수술)",
      "인하대병원 협업: 환자 낙상·자해 실시간 검출 시스템(DeepStream, C++)",
      "ICTC 2024 논문 공저(Diffusion 기반 포즈 변환 정보 보존), 연속 수화 인식 적대적 공격 논문 저널 심사 중",
      "ETRI 과제 TANGO 신경망 시각화 프레임워크 프론트엔드 개발"
    ],
    links: {
      github: "",
      portfolio: "assets/docs/portfolio-shin-minseo.pdf",
      paper: "",
      project: ""
    }
  }
];
