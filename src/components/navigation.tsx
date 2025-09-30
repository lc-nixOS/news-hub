import React from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Moon, Sun, PenTool, Home, Settings } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { Language, useLanguage } from '@/contexts/lang-context';

interface NavigationProps {
  currentPage: 'home' | 'editor' | 'management';
  onPageChange: (page: 'home' | 'editor' | 'management') => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, isRTL, t } = useLanguage();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  return (
    <nav className="top-0 z-50 sticky bg-background/80 supports-[backdrop-filter]:bg-background/60 backdrop-blur-xl border-b w-full">
      <div className="mx-auto px-4 container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
              <PenTool className="w-6 h-6 text-white" />
            </div>
            <h1 className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent">
              NewsHub
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Button
              variant={currentPage === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onPageChange('home')}
              className="hover:scale-105 transition-all duration-200"
            >
              <Home className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('home')}
            </Button>
            
            <Button
              variant={currentPage === 'editor' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onPageChange('editor')}
              className="hover:scale-105 transition-all duration-200"
            >
              <PenTool className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('editor')}
            </Button>
            
            <Button
              variant={currentPage === 'management' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onPageChange('management')}
              className="hover:scale-105 transition-all duration-200"
            >
              <Settings className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('management')}
            </Button>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="bg-transparent border-none w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="es">ES</SelectItem>
                <SelectItem value="ar">AR</SelectItem>
              </SelectContent>
            </Select>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="hover:scale-105 transition-all duration-200"
              aria-label={t('toggleTheme')}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}