import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Search, Edit, Trash2, Eye, Calendar, User } from 'lucide-react';
import { Article } from '@/types/article';
import { useLanguage } from '@/contexts/lang-context';
import { mockArticles } from '@/data/mock-article';

interface ManagementPageProps {
  onCreateNew?: () => void;
  onEditArticle?: (articleId: string) => void;
}

export function ManagementPage({ onCreateNew, onEditArticle }: ManagementPageProps) {
  const { isRTL, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState<Article[]>(mockArticles);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteArticle = (articleId: string) => {
    setArticles(prev => prev.filter(article => article.id !== articleId));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    return status === 'published' ? 'default' : 'secondary';
  };

  return (
    <div className="mx-auto px-4 py-8 container">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 text-transparent">
              {t('manageArticles')}
            </h1>
            <p className="text-muted-foreground">
              Create, edit, and manage your articles from this dashboard.
            </p>
          </div>

          <Button
            onClick={onCreateNew}
            className="hover:scale-105 transition-all duration-200"
          >
            <Plus className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('createNew')}
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
            <Input
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`bg-background/50 backdrop-blur-sm border-0 shadow-lg ${isRTL ? 'pr-10' : 'pl-10'}`}
            />
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="gap-4 grid md:grid-cols-4 mb-8">
          <Card className="bg-card/50 shadow-lg backdrop-blur-xl border-0">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">Total Articles</p>
                  <p className="font-semibold text-2xl">{articles.length}</p>
                </div>
                <Eye className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 shadow-lg backdrop-blur-xl border-0">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">Published</p>
                  <p className="font-semibold text-green-600 text-2xl">
                    {articles.filter(a => a.status === 'published').length}
                  </p>
                </div>
                <div className="flex justify-center items-center bg-green-100 rounded-full w-8 h-8">
                  <div className="bg-green-600 rounded-full w-4 h-4"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 shadow-lg backdrop-blur-xl border-0">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">Drafts</p>
                  <p className="font-semibold text-yellow-600 text-2xl">
                    {articles.filter(a => a.status === 'draft').length}
                  </p>
                </div>
                <div className="flex justify-center items-center bg-yellow-100 rounded-full w-8 h-8">
                  <div className="bg-yellow-600 rounded-full w-4 h-4"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 shadow-lg backdrop-blur-xl border-0">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">Categories</p>
                  <p className="font-semibold text-2xl">
                    {new Set(articles.map(a => a.category)).size}
                  </p>
                </div>
                <div className="flex justify-center items-center bg-purple-100 rounded-full w-8 h-8">
                  <div className="bg-purple-600 rounded-full w-4 h-4"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Articles Table */}
        <Card className="bg-card/50 shadow-xl backdrop-blur-xl border-0">
          <CardHeader>
            <CardTitle>Articles</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredArticles.length > 0 ? (
              <div className="rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-muted/50">
                      <TableHead>{t('title')}</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          Author
                        </div>
                      </TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Date
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredArticles.map((article) => (
                      <TableRow key={article.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell>
                          <div>
                            <p className="font-medium line-clamp-1">{article.title}</p>
                            <p className="text-muted-foreground text-sm line-clamp-1">
                              {article.summary}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-8 h-8 text-white text-sm">
                              {article.author.charAt(0)}
                            </div>
                            {article.author}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{article.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(article.status)}>
                            {t(article.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(article.publishedAt)}</TableCell>
                        <TableCell>
                          <div className="flex justify-end items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEditArticle?.(article.id)}
                              className="hover:scale-105 transition-all duration-200"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive hover:text-destructive hover:scale-105 transition-all duration-200"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Article</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{article.title}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteArticle(article.id)}
                                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                  >
                                    {t('delete')}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="mb-4 text-muted-foreground">
                  No articles found matching your search.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}