import {
  generateMockReferenceDataV1,
  getAssetV1,
  getPersonV1,
  getReferenceDataV1,
  getTenureV1,
  postCommentV1,
  postCommentV2,
  server,
} from "@hackney/mtfh-test-utils";

export const commentsReferenceData = Array.from({ length: 3 }).map((_, index) =>
  generateMockReferenceDataV1({
    category: "comments",
    subCategory: "category",
    code: `categoryCode${index + 1}`,
    value: `Category value ${index + 1}`,
  }),
);

export const errorsReferenceData = Array.from({ length: 40 }).map((_, index) =>
  generateMockReferenceDataV1({
    category: "errors-code",
    subCategory: "mmh",
    code: `W${index + 1}`,
    value: `Error Message${index + 1}`,
  }),
);

beforeEach(() => {
  server.use(
    getTenureV1(),
    getAssetV1(),
    getPersonV1(),
    getReferenceDataV1([...commentsReferenceData]),
    postCommentV1(),
    postCommentV2(),
  );
});
