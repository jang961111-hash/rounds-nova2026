# Rounds · 회진 팀 페이지 (N.O.V.A. 2026)

순수 HTML/CSS/JS 정적 사이트입니다. 빌드 과정과 외부 의존성(폰트 CDN 제외)이 없습니다.

## 파일 구조

| 파일 | 역할 |
|---|---|
| `index.html` | 단일 페이지 |
| `members.js` | 팀원 데이터 (각자 자기 항목만 수정) |
| `assets/style.css` | 스타일 (라이트/다크) |
| `assets/app.js` | 팀원 카드 렌더링, 테마 토글 |

## 내 항목 고치는 법 (`members.js`)

1. `members.js`에서 본인 이름의 객체를 찾는다.
2. `intro`(한 줄 소개), `affiliation`, `highlights`(주요 경험 목록), `links`를 채운다.
3. `"TODO"`로 두면 화면에 "준비 중"으로 보인다. 링크는 `https://`로 시작해야 하며, 빈 문자열이면 버튼이 숨겨진다.
4. 링크 슬롯: `github`, `portfolio`, `paper`, `project`
5. **이메일·전화번호는 넣지 않는다.** 비공개 증례·평가 정보도 넣지 않는다.

## 로컬 미리보기

```
cd rounds-team-page
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000
```

## GitHub Pages 배포 (예정, 팀장 승인 후 진행)

현재는 로컬에만 있으며 GitHub에 올리지 않았습니다. 승인 후 아래 순서로 진행합니다.

1. 저장소 `jang961111-hash/rounds-nova2026` 생성
2. `main` 브랜치에 push
3. Settings → Pages → Source: `Deploy from a branch`, Branch: `main` / `(root)`
4. 배포 주소: https://jang961111-hash.github.io/rounds-nova2026/

## 보안

`.gitignore`가 `cases/`, `data/private/` 등을 제외합니다. 비공개 증례·평가 데이터는 이 저장소에 두지 않습니다.
