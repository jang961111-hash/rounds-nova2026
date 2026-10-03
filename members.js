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
    affiliation: "SK AI Leader Academy (SKALA) 4기",
    intro: "국방·신약·결제 도메인에서 LLM 에이전트를 설계·구현해 왔습니다. LLM에게 무엇을 맡기고 무엇을 코드로 묶을지가 관심사입니다.",
    highlights: [
      "D4D 국방 AI 해커톤 우승 (무인체계 3종 1인 운용 AI 에이전트)",
      "신약개발 해커톤 (LLM 근거 수집 + 규칙 판정 에이전트)",
      "Google×Solana AI Agentic Hackathon '장보고'",
      "SKALA 신약 독성 예측 경연 119팀 중 17위"
    ],
    links: {
      github: "https://github.com/jang961111-hash",
      portfolio: "https://jang961111-hash.github.io/",
      paper: "",
      project: "https://github.com/jang961111-hash/jangbogo"
    }
  },
  {
    name: "박연주",
    role: "부팀장",
    // TODO(확인 필요): 소속이 SKALA 4기가 맞는지 본인 확인
    affiliation: "SK AI Leader Academy (SKALA) 4기",
    intro: "TODO",
    highlights: [],
    links: { github: "", portfolio: "", paper: "", project: "" }
  },
  {
    name: "신민서",
    photo: "", // 본인 동의 후 assets/members/shin-minseo.jpg 로 추가
    role: "팀원",
    affiliation: "SK AI Leader Academy (SKALA) 4기",
    intro: "TODO",
    highlights: [],
    links: { github: "", portfolio: "", paper: "", project: "" }
  },
  {
    name: "(확정 예정)",
    role: "임상 검수 (문진 순서 · 위험 신호 · 진단명 표준화)",
    affiliation: "TODO",
    intro: "TODO",
    highlights: [],
    links: { github: "", portfolio: "", paper: "", project: "" }
  }
];
