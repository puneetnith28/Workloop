
import React, { useState } from 'react';
import { 
  User,
  MessageSquare,
  Send,
  Plus,
  Smile,
  Edit2,
  Trash2,
  Reply,
  Check,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: Date | string;
  replies?: Comment[];
}

interface CommentSystemProps {
  fileId: string;
  comments: Comment[];
  className?: string;
}

const CommentSystem: React.FC<CommentSystemProps> = ({
  fileId,
  comments: initialComments = [],
  className,
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: `comment-${Date.now()}`,
        author: {
          name: 'Current User',
        },
        content: newComment,
        timestamp: new Date(),
        replies: [],
      };
      
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleAddReply = (commentId: string) => {
    if (replyContent.trim()) {
      const reply: Comment = {
        id: `reply-${Date.now()}`,
        author: {
          name: 'Current User',
        },
        content: replyContent,
        timestamp: new Date(),
      };
      
      setComments(prevComments => {
        return prevComments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), reply],
            };
          }
          return comment;
        });
      });
      
      setReplyingTo(null);
      setReplyContent('');
    }
  };

  const formatDate = (date: Date | string) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare size={18} />
          Comments
        </h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{comments.length} comments</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <MessageSquare size={24} className="text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No comments yet</p>
            <p className="text-sm text-muted-foreground">Be the first to comment on this file</p>
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="animate-fade-in">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    {comment.author.avatar ? (
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    ) : (
                      <AvatarFallback>
                        <User size={16} />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="bg-secondary/50 rounded-lg p-3 pb-2">
                      <div className="flex justify-between mb-1">
                        <div className="font-medium text-sm">{comment.author.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(comment.timestamp)}
                        </div>
                      </div>
                      <div className="text-sm">{comment.content}</div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1 ml-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-xs"
                        onClick={() => setReplyingTo(comment.id)}
                      >
                        <Reply size={12} className="mr-1" />
                        Reply
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <MoreVertical size={12} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem className="text-xs">
                            <Edit2 size={12} className="mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-xs text-red-500">
                            <Trash2 size={12} className="mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                      <div className="mt-2 ml-1 animate-fade-in">
                        <div className="flex gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>
                              <User size={12} />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Textarea
                              placeholder="Write a reply..."
                              className="min-h-[60px] text-sm"
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                            />
                            <div className="flex justify-end gap-2 mt-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs"
                                onClick={() => setReplyingTo(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                className="h-7 px-2 text-xs gap-1 bg-workloop-purple hover:bg-workloop-dark-purple"
                                onClick={() => handleAddReply(comment.id)}
                                disabled={!replyContent.trim()}
                              >
                                <Send size={12} />
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-2 ml-6 space-y-3">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-2 animate-fade-in">
                            <Avatar className="h-6 w-6">
                              {reply.author.avatar ? (
                                <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                              ) : (
                                <AvatarFallback>
                                  <User size={12} />
                                </AvatarFallback>
                              )}
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="bg-secondary/30 rounded-lg p-2">
                                <div className="flex justify-between mb-1">
                                  <div className="font-medium text-xs">{reply.author.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {formatDate(reply.timestamp)}
                                  </div>
                                </div>
                                <div className="text-xs">{reply.content}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <User size={16} />
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              className="min-h-[80px]"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            
            <div className="flex justify-between mt-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Smile size={14} />
                <span>Add emoji</span>
              </Button>
              
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="gap-1 bg-workloop-purple hover:bg-workloop-dark-purple"
              >
                <Send size={16} />
                <span>Comment</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSystem;
