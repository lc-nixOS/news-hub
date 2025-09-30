import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '@/contexts/lang-context';
import { Article } from '@/types/article';
import { mockArticles } from '@/data/mock-article';
import { ArticleCard } from './article-card';

interface HomePageProps {
  onEditArticle?: (articleId: string) => void;
  onViewArticle?: (articleId: string) => void;
}

export function HomePage({ onEditArticle, onViewArticle }: HomePageProps) {
  const { isRTL, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('published');

  // Filter articles based on search and filters
  const filteredArticles = mockArticles.filter((article: Article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = Array.from(new Set(mockArticles.map(article => article.category)));

  const handleReadMore = (articleId: string) => {
    onViewArticle?.(articleId);
  };

  return (
    <div className="mx-auto px-4 py-8 container">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="bg-clip-text bg-gradient-to-r from-primary mb-4 text-transparent to-accent-pink via-accent-mauve">
          {t('allArticles')}
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Discover the latest news, insights, and stories from our community of writers and journalists.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-8">
        <div className="flex sm:flex-row flex-col sm:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
            <Input
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`bg-background/50 backdrop-blur-sm border-0 shadow-lg ${isRTL ? 'pr-10' : 'pl-10'}`}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-background/50 shadow-lg backdrop-blur-sm border-0 w-40">
                <Filter className="mr-2 w-4 h-4" />
                <SelectValue placeholder={t('filter')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-background/50 shadow-lg backdrop-blur-sm border-0 w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="published">{t('published')}</SelectItem>
                <SelectItem value="draft">{t('draft')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onReadMore={handleReadMore}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="mb-4 text-muted-foreground">
            No articles found matching your criteria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
              setStatusFilter('published');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}