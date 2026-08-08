/**
 * 한글 조사 선택 — 사례마다 인물 이름이 달라지므로("민서/서현/준호")
 * 문장을 만들 때마다 받침을 보고 조사를 골라야 한다.
 */
const PAIRS = {
  이: ["이", "가"],
  은: ["은", "는"],
  을: ["을", "를"],
  과: ["과", "와"],
};

/** 마지막 글자에 받침이 있는가. 한글이 아니면 없는 것으로 본다. */
export function hasFinalConsonant(word) {
  if (!word) return false;
  const code = word.charCodeAt(word.length - 1);
  if (code < 0xac00 || code > 0xd7a3) return false;
  return (code - 0xac00) % 28 !== 0;
}

/** 조사만 반환. type 은 받침 있을 때 쓰는 쪽으로 적는다. ("이" / "은" / "을" / "과") */
export function particle(word, type) {
  const pair = PAIRS[type];
  if (!pair) return "";
  return hasFinalConsonant(word) ? pair[0] : pair[1];
}

/** 이름 + 조사를 붙여 반환. ("민서가", "서현이", "준호와") */
export function withParticle(word, type) {
  return `${word}${particle(word, type)}`;
}
