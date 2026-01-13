import { DeleteRounded, OpenInNewRounded, ReplyRounded, VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import { Avatar, Box, Chip, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import type { CommentItem } from "@/features/comments/hooks/useComments";
import type { CommentStatus } from "@/features/comments/types/comment";

import dayjs from "dayjs";
import { useState } from "react";
import { ReplyEditor } from "./ReplyEditor";

interface CommentItemProps {
  comment: CommentItem;
  onUpdateStatus?: (id: string, status: CommentStatus) => void;
  onDeleteClick?: (id: string) => void;
  onReplySubmit: (id: string, content: string) => Promise<void>;
  isReplying?: boolean;
}

export function CommentItem({ comment, onUpdateStatus, onDeleteClick, onReplySubmit, isReplying }: CommentItemProps) {

  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const isSubComment = Boolean(comment.parentId);
  const hasAdminReply = comment.adminReplies && comment.adminReplies.length > 0;

  const status = comment.status;
  const isPublished = status === 'PUBLISHED';
  const isHidden = status === 'HIDDEN';
  const isDeleted = status === 'DELETED';

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        borderRadius: 3,
        overflow: 'hidden',
        transition: '0.2s',
        ml: isSubComment ? 5 : 0,
        opacity: isDeleted ? 0.5 : (isHidden ? 0.8 : 1),
        bgcolor: isDeleted ? 'action.hover' : 'background.paper',
        borderColor: isHidden ? 'warning.light' : 'divider',
        position: 'relative',
        '&:hover': {
          borderColor: isDeleted ? 'divider' : 'primary.main',
        },
        '&::before': isSubComment ? {
          content: '""',
          position: 'absolute',
          left: -20,
          top: 0,
          bottom: '50%',
          width: '2px',
          borderLeft: '2px dashed',
          borderColor: 'divider',
          borderBottom: '2px dashed',
        } : {}
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar
          sx={{
            bgcolor: isDeleted ? 'text.disabled' : (isHidden ? 'warning.main' : 'primary.main'),
            fontWeight: 700,
            fontSize: '1rem',
            flexShrink: 0
          }}
        >
          {comment.nickname[0]}
        </Avatar>

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                {comment.nickname}
                {isHidden && (<Chip label="숨김" size="small" variant="outlined" color="warning" sx={{ height: 20, fontSize: '0.65rem' }} />)}
                {isDeleted && (<Chip label="삭제됨" size="small" variant="outlined" color="error" sx={{ height: 20, fontSize: '0.65rem' }} />)}
              </Typography>

              <Typography variant="caption" color="text.disabled">
                {dayjs(comment.createdAt).format('YYYY-MM-DD')}
              </Typography>
            </Box>

            <Stack direction="row" spacing={0.5}>
              {!isDeleted && (
                <>
                  <Tooltip title={hasAdminReply ? "답변 수정/추가" : "답글"}>
                    <IconButton
                      size="small"
                      color={hasAdminReply ? "primary" : "default"}
                      onClick={() => setIsReplyOpen(!isReplyOpen)}
                    >
                      <ReplyRounded fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={isPublished ? "비공개" : "공개"}>
                    <IconButton
                      size="small"
                      sx={{
                        color: 'text.disabled',
                        transition: '0.2s',
                        '&:hover': { color: isPublished ? 'warning.main' : 'success.main' }
                      }}
                      onClick={() => onUpdateStatus?.(comment.id, isPublished ? 'HIDDEN' : 'PUBLISHED')}
                    >
                      {isPublished ? <VisibilityOffRounded fontSize="small" /> : <VisibilityRounded fontSize="small" />}
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="삭제">
                    <IconButton
                      size="small"
                      sx={{
                        color: 'text.disabled',
                        transition: '0.2s',
                        '&:hover': { color: 'error.main' }
                      }}
                      onClick={() => onDeleteClick?.(comment.id)}
                    >
                      <DeleteRounded fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Stack>
          </Stack>


          <Typography
            variant="body2"
            sx={{
              my: 1.5,
              color: isDeleted ? 'text.disabled' : 'text.primary',
              lineHeight: 1.6,
              textDecoration: isDeleted ? 'line-through' : 'none',
              fontStyle: isHidden ? 'italic' : 'normal'
            }}
          >
            {isDeleted ? '사용자 또는 관리자에 의해 삭제된 댓글입니다.' : comment.content}
          </Typography>

          {hasAdminReply && !isDeleted && (
            <Box
              sx={{
                mt: 2,
                mb: 1,
                p: 2,
                borderRadius: 2,
                bgcolor: 'action.hover',
                borderLeft: '4px solid',
                borderColor: 'primary.main'
              }}
            >
              {comment.adminReplies?.map((reply) => (
                <Box
                  key={reply.id}
                  sx={{ mb: reply === comment.adminReplies![comment.adminReplies!.length - 1] ? 0 : 2 }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="caption" fontWeight={800} color="primary.main">
                      내 답변
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Tooltip title="답변 삭제">
                        <IconButton
                          size="small"
                          sx={{ p: 0, color: 'error.light', opacity: 0.7, '&:hover': { opacity: 1 } }}
                          onClick={() => onDeleteClick?.(reply.id)}
                        >
                          <DeleteRounded sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Tooltip>
                      <Stack />

                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        {dayjs(reply.createdAt).format('YYYY-MM-DD HH:mm')}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.5 }}>
                    {reply.content}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              width: '100%',
              minWidth: 0,
              overflow: 'hidden'
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontWeight: 500,
                flexShrink: 0,
                whiteSpace: 'nowrap'
              }}
            >
              원문:
            </Typography>
            <Chip
              label={comment.post.title}
              size="small"
              variant="outlined"
              color="primary"
              icon={<OpenInNewRounded style={{ fontSize: 12 }} />}
              onClick={() => window.open(`https://www.pyomin.com/posts/${comment.post.slug}`, '_blank')}
              sx={{
                cursor: 'pointer',
                fontSize: '0.7rem',
                height: 22,
                flexShrink: 1,
                minWidth: 0,
                maxWidth: 250,
                '& .MuiChip-icon': {
                  marginLeft: '8px',
                },
                '& .MuiChip-label': {
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }
              }}
            />
          </Stack>
        </Box>
      </Stack>


      {/* Reply Editor */}
      {isReplyOpen && (
        <ReplyEditor
          onSubmit={async (content) => {
            await onReplySubmit(comment.id, content);
            setIsReplyOpen(false);
          }}
          onCancel={() => setIsReplyOpen(false)}
          disabled={isReplying}
        />
      )}
    </Paper>
  );
}