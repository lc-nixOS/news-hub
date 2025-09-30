import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link, 
  Image, 
  Eye,
  Type,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react';
import { useLanguage } from '@/contexts/lang-context';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const { isRTL, t } = useLanguage();
  const [selectedText, setSelectedText] = useState('');

  const handleTextSelection = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    const selected = target.value.substring(start, end);
    setSelectedText(selected);
  };

  const insertMarkdown = (markdown: string, wrapText: boolean = false) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let newText;
    if (wrapText && selectedText) {
      newText = markdown.replace('{}', selectedText);
    } else {
      newText = markdown;
    }

    const newValue = 
      textarea.value.substring(0, start) + 
      newText + 
      textarea.value.substring(end);

    onChange(newValue);

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + newText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const renderMarkdown = (text: string) => {
    // Simple markdown to HTML conversion for preview
    return text
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/__(.*?)__/g, '<u>$1</u>')
      .replace(/\n/g, '<br>');
  };

  const toolbarButtons = [
    { icon: Heading1, action: () => insertMarkdown('# '), label: 'Heading 1' },
    { icon: Heading2, action: () => insertMarkdown('## '), label: 'Heading 2' },
    { icon: Heading3, action: () => insertMarkdown('### '), label: 'Heading 3' },
    { icon: Bold, action: () => insertMarkdown('**{}**', true), label: 'Bold' },
    { icon: Italic, action: () => insertMarkdown('*{}*', true), label: 'Italic' },
    { icon: Underline, action: () => insertMarkdown('__{}__', true), label: 'Underline' },
    { icon: List, action: () => insertMarkdown('- '), label: 'Bullet List' },
    { icon: ListOrdered, action: () => insertMarkdown('1. '), label: 'Numbered List' },
    { icon: Link, action: () => insertMarkdown('[{}](url)', true), label: 'Link' },
    { icon: Image, action: () => insertMarkdown('![alt text](image-url)'), label: 'Image' },
  ];

  return (
    <div className="w-full">
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 w-full">
          <TabsTrigger value="editor" className="transition-all duration-200">
            <Type className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            Editor
          </TabsTrigger>
          <TabsTrigger value="preview" className="transition-all duration-200">
            <Eye className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('preview')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-1 bg-muted/30 backdrop-blur-sm p-2 border rounded-lg">
            {toolbarButtons.map((button, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={button.action}
                className="p-0 w-8 h-8 hover:scale-105 transition-all duration-200"
                title={button.label}
              >
                <button.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>

          {/* Text Area */}
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onSelect={handleTextSelection}
            placeholder={placeholder || t('content')}
            className="bg-background/50 shadow-lg backdrop-blur-sm border-0 focus:ring-2 focus:ring-primary/20 min-h-96 transition-all duration-200 resize-none"
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </TabsContent>

        <TabsContent value="preview">
          <div 
            className="bg-background/50 shadow-lg backdrop-blur-sm dark:prose-invert p-4 border-0 rounded-md max-w-none min-h-96 prose prose-sm"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}