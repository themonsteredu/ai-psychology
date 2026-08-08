import CASE_01 from "./case01";
import CASE_02 from "./case02";
import CASE_03 from "./case03";

/**
 * 사례 목록. 순서가 곧 수업 순서다.
 * 세 사례는 같은 사건을 세 사람의 자리에서 본다 —
 * 민서(소외된 쪽) → 서현(잘못한 쪽) → 준호(누명을 쓴 쪽).
 */
export const CASES = [CASE_01, CASE_02, CASE_03];

export const getCase = (id) => CASES.find((c) => c.id === id) ?? null;

export const TOTAL_MINUTES = CASES.reduce((a, c) => a + c.minutes, 0);
