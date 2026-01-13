import type { GetCommentsParams } from "@/features/comments/hooks/useComments";

export const commentKeys = {
  all: ['comments'] as const,
  lists: () => [...commentKeys.all, 'list'] as const,
  list: (params: GetCommentsParams) => [...commentKeys.lists(), params] as const,
};
