import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Tag } from 'lucide-react';
import { Article } from '@/types/article';
import { useLanguage } from '@/contexts/lang-context';

interface ArticleCardProps {
  article: Article;
  onReadMore?: (articleId: string) => void;
  showActions?: boolean;
  onEdit?: (articleId: string) => void;
  onDelete?: (articleId: string) => void;
}

export function ArticleCard({ 
  article, 
  onReadMore, 
  showActions = false, 
  onEdit, 
  onDelete 
}: ArticleCardProps) {
  const { isRTL, t } = useLanguage();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="group relative bg-card/50 hover:shadow-primary/10 hover:shadow-xl backdrop-blur-xl border-0 overflow-hidden hover:scale-[1.02] transition-all duration-300">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 dark:from-white/5 to-transparent" />
      
      <div className="relative">
        {article.imageUrl && (
          <CardHeader className="p-0">
            <div className="rounded-t-lg aspect-video overflow-hidden">
              {/* <ImageWithFallback
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              /> */}
            </div>
          </CardHeader>
        )}

        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge 
              variant={article.status === 'published' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {t(article.status)}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {article.category}
            </Badge>
          </div>

          <h3 className="mb-3 group-hover:text-primary line-clamp-2 transition-colors duration-200">
            {article.title}
          </h3>

          <p className="mb-4 text-muted-foreground line-clamp-3">
            {article.summary}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag) => (
              <div 
                key={tag}
                className="flex items-center gap-1 text-muted-foreground text-xs"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </div>
            ))}
          </div>

          <div className={`flex items-center gap-4 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {article.author}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(article.publishedAt)}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <div className="flex gap-2 w-full">
            {onReadMore && (
              <Button
                variant="default"
                size="sm"
                onClick={() => onReadMore(article.id)}
                className="flex-1 hover:scale-105 transition-all duration-200"
              >
                {t('readMore')}
              </Button>
            )}
            
            {showActions && (
              <>
                {onEdit && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(article.id)}
                    className="hover:scale-105 transition-all duration-200"
                  >
                    {t('edit')}
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(article.id)}
                    className="hover:scale-105 transition-all duration-200"
                  >
                    {t('delete')}
                  </Button>
                )}
              </>
            )}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}