import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'es' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    editor: 'Editor',
    management: 'Management',
    
    // Theme
    toggleTheme: 'Toggle theme',
    
    // Articles
    allArticles: 'All Articles',
    readMore: 'Read more',
    writeArticle: 'Write Article',
    editArticle: 'Edit Article',
    publishArticle: 'Publish Article',
    saveArticle: 'Save Article',
    deleteArticle: 'Delete Article',
    
    // Editor
    title: 'Title',
    content: 'Content',
    preview: 'Preview',
    uploadImage: 'Upload Image',
    insertImage: 'Insert Image',
    
    // Management
    manageArticles: 'Manage Articles',
    createNew: 'Create New',
    edit: 'Edit',
    delete: 'Delete',
    published: 'Published',
    draft: 'Draft',
    
    // Common
    cancel: 'Cancel',
    confirm: 'Confirm',
    search: 'Search',
    filter: 'Filter',
    loading: 'Loading...',
  },
  es: {
    // Navigation
    home: 'Inicio',
    editor: 'Editor',
    management: 'Gestión',
    
    // Theme
    toggleTheme: 'Cambiar tema',
    
    // Articles
    allArticles: 'Todos los Artículos',
    readMore: 'Leer más',
    writeArticle: 'Escribir Artículo',
    editArticle: 'Editar Artículo',
    publishArticle: 'Publicar Artículo',
    saveArticle: 'Guardar Artículo',
    deleteArticle: 'Eliminar Artículo',
    
    // Editor
    title: 'Título',
    content: 'Contenido',
    preview: 'Vista previa',
    uploadImage: 'Subir Imagen',
    insertImage: 'Insertar Imagen',
    
    // Management
    manageArticles: 'Gestionar Artículos',
    createNew: 'Crear Nuevo',
    edit: 'Editar',
    delete: 'Eliminar',
    published: 'Publicado',
    draft: 'Borrador',
    
    // Common
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    search: 'Buscar',
    filter: 'Filtrar',
    loading: 'Cargando...',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    editor: 'المحرر',
    management: 'الإدارة',
    
    // Theme
    toggleTheme: 'تبديل السمة',
    
    // Articles
    allArticles: 'جميع المقالات',
    readMore: 'قراءة المزيد',
    writeArticle: 'كتابة مقال',
    editArticle: 'تحرير المقال',
    publishArticle: 'نشر المقال',
    saveArticle: 'حفظ المقال',
    deleteArticle: 'حذف المقال',
    
    // Editor
    title: 'العنوان',
    content: 'المحتوى',
    preview: 'معاينة',
    uploadImage: 'رفع صورة',
    insertImage: 'إدراج صورة',
    
    // Management
    manageArticles: 'إدارة المقالات',
    createNew: 'إنشاء جديد',
    edit: 'تحرير',
    delete: 'حذف',
    published: 'منشور',
    draft: 'مسودة',
    
    // Common
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    search: 'بحث',
    filter: 'تصفية',
    loading: 'جاري التحميل...',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'es', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const isRTL = language === 'ar';

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}