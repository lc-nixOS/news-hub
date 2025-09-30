import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, User, Tag, Share2, BookmarkPlus, ThumbsUp } from 'lucide-react';
import { Article } from '@/types/article';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useLanguage } from '@/contexts/lang-context';

interface ArticleDetailViewProps {
  article: Article;
  onBack: () => void;
}

export function ArticleDetailView({ article, onBack }: ArticleDetailViewProps) {
  const { isRTL, t } = useLanguage();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderMarkdown = (text: string) => {
    return text
      .replace(/^# (.*$)/gm, '<h1 class="mt-8 mb-6 font-semibold text-3xl">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="mt-6 mb-4 font-semibold text-2xl">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="mt-5 mb-3 font-semibold text-xl">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/__(.*?)__/g, '<u class="underline">$1</u>')
      .replace(/^- (.*$)/gm, '<li class="mb-2">$1</li>')
      .replace(/^1\. (.*$)/gm, '<li class="mb-2">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>');
  };

  // Mock data for visualizations (specific to Sarah Johnson's article)
  const remoteWorkTrends = [
    { year: '2019', percentage: 5.7, employees: 8.5 },
    { year: '2020', percentage: 17.9, employees: 26.7 },
    { year: '2021', percentage: 17.3, employees: 25.8 },
    { year: '2022', percentage: 15.2, employees: 22.6 },
    { year: '2023', percentage: 14.8, employees: 22.1 },
    { year: '2024', percentage: 16.2, employees: 24.3 }
  ];

  const productivityMetrics = [
    { category: 'Communication', score: 78 },
    { category: 'Collaboration', score: 72 },
    { category: 'Focus Time', score: 85 },
    { category: 'Work-Life Balance', score: 81 },
    { category: 'Overall Satisfaction', score: 79 }
  ];

  const technologyAdoption = [
    { name: 'Video Conferencing', value: 95, color: '#89b4fa' }, // catppuccin blue
    { name: 'Cloud Storage', value: 89, color: '#94e2d5' }, // catppuccin teal
    { name: 'Project Management', value: 76, color: '#a6e3a1' }, // catppuccin green
    { name: 'VR/AR Tools', value: 23, color: '#fab387' }, // catppuccin peach
    { name: 'AI Assistants', value: 34, color: '#cba6f7' } // catppuccin mauve
  ];

  const shouldShowVisualizations = article.id === '1'; // Sarah Johnson's article

  return (
    <div className="mx-auto px-4 py-8 container">
      <div className="mx-auto max-w-7xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className={`mb-6 transition-all duration-200 hover:scale-105 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <ArrowLeft className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          Back to Articles
        </Button>

        <div className="gap-8 grid lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">{t(article.status)}</Badge>
                  <Badge variant="outline">{article.category}</Badge>
                </div>

                <h1 className="bg-clip-text bg-gradient-to-r from-primary font-bold text-transparent text-4xl leading-tight to-accent-pink via-accent-mauve">
                  {article.title}
                </h1>

                <p className="text-muted-foreground text-xl leading-relaxed">
                  {article.summary}
                </p>

                <div className={`flex items-center gap-6 text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <div 
                      key={tag}
                      className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-full text-muted-foreground text-sm"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Image */}
              {article.imageUrl && (
                <div className="relative shadow-2xl rounded-xl overflow-hidden">
                  {/* <ImageWithFallback
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-96 object-cover"
                  /> */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}

              <Separator className="my-8" />

              {/* Content */}
              <div 
                className="dark:prose-invert max-w-none prose-headings:font-semibold prose-p:text-foreground prose-p:leading-relaxed prose prose-lg"
                dangerouslySetInnerHTML={{ 
                  __html: `<p class="mb-4">${renderMarkdown(article.content)}</p>` 
                }}
                dir={isRTL ? 'rtl' : 'ltr'}
              />

              {/* Action Buttons */}
              <div className={`flex items-center gap-4 pt-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Button variant="outline" className="hover:scale-105 transition-all duration-200">
                  <ThumbsUp className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  Like
                </Button>
                <Button variant="outline" className="hover:scale-105 transition-all duration-200">
                  <BookmarkPlus className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  Save
                </Button>
                <Button variant="outline" className="hover:scale-105 transition-all duration-200">
                  <Share2 className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  Share
                </Button>
              </div>
            </article>
          </div>

          {/* Sidebar with Visualizations (for Sarah Johnson's article) */}
          {shouldShowVisualizations && (
            <div className="space-y-6">
              {/* Remote Work Trends */}
              <Card className="bg-card/50 shadow-xl backdrop-blur-xl border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Remote Work Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={remoteWorkTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="percentage" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        name="% Remote Workers"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Productivity Metrics */}
              <Card className="bg-card/50 shadow-xl backdrop-blur-xl border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Productivity Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={productivityMetrics} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="category" type="category" width={80} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Technology Adoption */}
              <Card className="bg-card/50 shadow-xl backdrop-blur-xl border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Technology Adoption</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={technologyAdoption}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                      >
                        {technologyAdoption.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Key Statistics */}
              <Card className="bg-card/50 shadow-xl backdrop-blur-xl border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Key Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Global Remote Workers</span>
                    <span className="font-semibold">1.2B+</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Productivity Increase</span>
                    <span className="font-semibold text-green-600">+13%</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cost Savings</span>
                    <span className="font-semibold text-blue-600">$11K/year</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Job Satisfaction</span>
                    <span className="font-semibold text-purple-600">+20%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Regular Sidebar for other articles */}
          {!shouldShowVisualizations && (
            <div className="space-y-6">
              {/* Author Info */}
              <Card className="bg-card/50 shadow-xl backdrop-blur-xl border-0">
                <CardHeader>
                  <CardTitle className="text-lg">About the Author</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-12 h-12 font-semibold text-white text-lg">
                      {article.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{article.author}</p>
                      <p className="text-muted-foreground text-sm">Contributing Writer</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Passionate about technology, innovation, and the future of work.
                  </p>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <Card className="bg-card/50 shadow-xl backdrop-blur-xl border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Related Articles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p className="font-medium hover:text-primary text-sm transition-colors cursor-pointer">
                      Digital Transformation in 2024
                    </p>
                    <p className="text-muted-foreground text-xs">5 min read</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="font-medium hover:text-primary text-sm transition-colors cursor-pointer">
                      The Evolution of Workplace Culture
                    </p>
                    <p className="text-muted-foreground text-xs">8 min read</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="font-medium hover:text-primary text-sm transition-colors cursor-pointer">
                      Building Effective Remote Teams
                    </p>
                    <p className="text-muted-foreground text-xs">6 min read</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}