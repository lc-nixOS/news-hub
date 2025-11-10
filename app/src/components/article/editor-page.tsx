import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Save, FileText, Eye, Upload, X } from 'lucide-react';
import { useLanguage } from '@/contexts/lang-context';
import { ArticleFormData } from '@/types/article';
import { RichTextEditor } from './rich-article';

interface EditorPageProps {
  editingArticle?: ArticleFormData & { id?: string };
  onSave?: (article: ArticleFormData) => void;
  onCancel?: () => void;
}

export function EditorPage({ editingArticle, onSave, onCancel }: EditorPageProps) {
  const { isRTL, t } = useLanguage();
  
  const [formData, setFormData] = useState<ArticleFormData>({
    title: editingArticle?.title || '',
    content: editingArticle?.content || '',
    summary: editingArticle?.summary || '',
    imageUrl: editingArticle?.imageUrl || '',
    category: editingArticle?.category || 'Technology',
    tags: editingArticle?.tags || [],
    status: editingArticle?.status || 'draft',
  });

  const [currentTag, setCurrentTag] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const categories = ['Technology', 'Business', 'Marketing', 'Science', 'Health', 'Sports'];

  const handleInputChange = (field: keyof ArticleFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({ 
        ...prev, 
        tags: [...prev.tags, currentTag.trim()] 
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(tag => tag !== tagToRemove) 
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = (status: 'draft' | 'published') => {
    const articleData = { ...formData, status };
    onSave?.(articleData);
  };

  const handleImageUpload = () => {
    // In a real app, this would open a file picker and upload the image
    const imageUrl = prompt('Enter image URL:');
    if (imageUrl) {
      handleInputChange('imageUrl', imageUrl);
    }
  };

  return (
    <div className="mx-auto px-4 py-8 container">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 text-transparent">
              {editingArticle?.id ? t('editArticle') : t('writeArticle')}
            </h1>
            <p className="text-muted-foreground">
              Create engaging content with our rich text editor and live preview.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
              className="hover:scale-105 transition-all duration-200"
            >
              <Eye className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('preview')}
            </Button>
            {onCancel && (
              <Button
                variant="outline"
                onClick={onCancel}
                className="hover:scale-105 transition-all duration-200"
              >
                {t('cancel')}
              </Button>
            )}
          </div>
        </div>

        <div className="gap-8 grid lg:grid-cols-3">
          {/* Main Editor */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 shadow-xl backdrop-blur-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Article Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">{t('title')}</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter article title..."
                    className="bg-background/50 shadow-lg backdrop-blur-sm border-0"
                  />
                </div>

                {/* Summary */}
                <div className="space-y-2">
                  <Label htmlFor="summary">Summary</Label>
                  <Input
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => handleInputChange('summary', e.target.value)}
                    placeholder="Brief summary of the article..."
                    className="bg-background/50 shadow-lg backdrop-blur-sm border-0"
                  />
                </div>

                {/* Content Editor */}
                <div className="space-y-2">
                  <Label>{t('content')}</Label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(value) => handleInputChange('content', value)}
                    placeholder="Write your article content here..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Article Settings */}
            <Card className="bg-card/50 shadow-xl backdrop-blur-xl border-0">
              <CardHeader>
                <CardTitle>Article Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Category */}
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleInputChange('category', value)}
                  >
                    <SelectTrigger className="bg-background/50 shadow-lg backdrop-blur-sm border-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Add tag..."
                      className="bg-background/50 shadow-lg backdrop-blur-sm border-0"
                    />
                    <Button
                      type="button"
                      onClick={handleAddTag}
                      size="sm"
                      className="hover:scale-105 transition-all duration-200"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <X
                          className="w-3 h-3 hover:text-destructive cursor-pointer"
                          onClick={() => handleRemoveTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Featured Image */}
                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleImageUpload}
                      className="w-full hover:scale-105 transition-all duration-200"
                    >
                      <Upload className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {t('uploadImage')}
                    </Button>
                    {formData.imageUrl && (
                      <div className="relative rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={formData.imageUrl}
                          alt="Featured image preview"
                          className="w-full h-32 object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="top-2 right-2 absolute"
                          onClick={() => handleInputChange('imageUrl', '')}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-card/50 shadow-xl backdrop-blur-xl border-0">
              <CardContent className="space-y-3 pt-6">
                <Button
                  onClick={() => handleSave('draft')}
                  variant="outline"
                  className="w-full hover:scale-105 transition-all duration-200"
                >
                  <Save className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t('saveArticle')}
                </Button>
                <Button
                  onClick={() => handleSave('published')}
                  className="w-full hover:scale-105 transition-all duration-200"
                >
                  {t('publishArticle')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}