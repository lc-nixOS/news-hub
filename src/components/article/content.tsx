
'use client';
import { ArticleFormData } from '@/types/article';
import React, { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { HomePage } from './home-page';
import { EditorPage } from './editor-page';
import { ManagementPage } from './management-page';
import { ArticleDetailView } from './article-detail-view';
import { ThemeProvider } from '@/contexts/theme-context';
import { LanguageProvider } from '@/contexts/lang-context';
import { Navigation } from '../navigation';
import { mockArticles } from '@/data/mock-article';

type Page = 'home' | 'editor' | 'management' | 'article-detail';

export  function Content() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [viewingArticleId, setViewingArticleId] = useState<string | null>(null);

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    setEditingArticleId(null);
    setViewingArticleId(null);
  };

  const handleEditArticle = (articleId: string) => {
    setEditingArticleId(articleId);
    setCurrentPage('editor');
  };

  const handleViewArticle = (articleId: string) => {
    setViewingArticleId(articleId);
    setCurrentPage('article-detail');
  };

  const handleBackFromArticle = () => {
    setCurrentPage('home');
    setViewingArticleId(null);
  };

  const handleCreateNew = () => {
    setEditingArticleId(null);
    setCurrentPage('editor');
  };

  const handleSaveArticle = (article: ArticleFormData) => {
    // In a real app, this would save to the backend
    console.log('Saving article:', article);
    
    if (editingArticleId) {
      toast.success('Article updated successfully!');
    } else {
      toast.success('Article created successfully!');
    }
    
    setCurrentPage('management');
    setEditingArticleId(null);
  };

  const handleCancelEdit = () => {
    setCurrentPage('management');
    setEditingArticleId(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onEditArticle={handleEditArticle} onViewArticle={handleViewArticle} />;
      case 'editor':
        return (
          <EditorPage
            editingArticle={editingArticleId ? undefined : undefined} // In real app, fetch article by ID
            onSave={handleSaveArticle}
            onCancel={handleCancelEdit}
          />
        );
      case 'management':
        return (
          <ManagementPage
            onCreateNew={handleCreateNew}
            onEditArticle={handleEditArticle}
          />
        );
      case 'article-detail':
        const article = mockArticles.find(a => a.id === viewingArticleId);
        return article ? (
          <ArticleDetailView
            article={article}
            onBack={handleBackFromArticle}
          />
        ) : (
          <HomePage onEditArticle={handleEditArticle} onViewArticle={handleViewArticle} />
        );
      default:
        return <HomePage onEditArticle={handleEditArticle} onViewArticle={handleViewArticle} />;
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="bg-gradient-to-br from-background via-secondary/30 to-accent/20 min-h-screen">
          <Navigation 
            currentPage={currentPage === 'article-detail' ? 'home' : currentPage} 
            onPageChange={handlePageChange} 
          />
          
          <main className="transition-all duration-300">
            {renderCurrentPage()}
          </main>
          
          <Toaster 
            position="bottom-right"
            closeButton
            richColors
          />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}