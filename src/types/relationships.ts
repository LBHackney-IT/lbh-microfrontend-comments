import { CommentType } from "@mtfh/common/lib/api/comments/v2";

export interface Relationship {
  targetId: string;
  targetType: CommentType;
  label?: string;
}
