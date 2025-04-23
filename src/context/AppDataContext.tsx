import React, { createContext, useContext, useState, useEffect } from 'react';

type Event = {
  id: string;
  date: string;
  title: string;
  description: string;
};

type VideoInfo = {
  id: string;
  title: string;
  thumbnail: string;
};

type Devotional = {
  id: string;
  title: string;
  verse: string;
  reference: string;
  content: string;
  date: string;
};

type Photo = {
  id: string;
  url: string;
  alt: string;
};

type Testimony = {
  id: string;
  content: string;
  author: string;
};

type KidsContent = {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'story';
  url: string;
  thumbnail?: string;
};

type YouthContent = {
  id: string;
  title: string;
  type: 'video' | 'devotional';
  url?: string;
  content?: string;
  verse?: string;
  thumbnail?: string;
};

type SeriesVideo = {
  id: string;
  title: string;
  youtubeId: string;
  notes?: string;
};

type Series = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  videos: SeriesVideo[];
};

type AppData = {
  dailyVerse: {
    text: string;
    reference: string;
  };
  featuredVideo: VideoInfo;
  events: Event[];
  devotionals: Devotional[];
  videos: VideoInfo[];
  photos: Photo[];
  testimonies: Testimony[];
  kidsContent: KidsContent[];
  youthContent: YouthContent[];
  series: Series[];
  pixKey: string;
};

type AppDataContextType = {
  data: AppData;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateDailyVerse: (verse: { text: string; reference: string }) => void;
  updateFeaturedVideo: (video: VideoInfo) => void;
  addTestimony: (testimony: Omit<Testimony, 'id'>) => void;
  addPhoto: (photo: Omit<Photo, 'id'>) => void;
  addDevotional: (devotional: Omit<Devotional, 'id'>) => void;
  addVideo: (video: Omit<VideoInfo, 'id'>) => void;
  addKidsContent: (content: Omit<KidsContent, 'id'>) => void;
  addYouthContent: (content: Omit<YouthContent, 'id'>) => void;
  addSeries: (series: Omit<Series, 'id'>) => void;
  addVideoToSeries: (seriesId: string, video: Omit<SeriesVideo, 'id'>) => void;
  updateSeriesNotes: (seriesId: string, videoId: string, notes: string) => void;
  updatePixKey: (key: string) => void;
};

const sampleData: AppData = {
  dailyVerse: {
    text: "O Senhor é meu pastor, nada me faltará.",
    reference: "Salmos 23:1",
  },
  featuredVideo: {
    id: "SampleVideoId123",
    title: "Mensagem de Domingo - Fé e Perseverança",
    thumbnail: "https://img.youtube.com/vi/SampleVideoId123/hqdefault.jpg",
  },
  events: [
    {
      id: "1",
      date: "2025-05-01T19:30:00Z",
      title: "Culto de Celebração",
      description: "Venha celebrar conosco as bênçãos recebidas durante a semana.",
    },
    {
      id: "2",
      date: "2025-05-03T15:00:00Z",
      title: "Encontro de Jovens",
      description: "Tarde de louvor e comunhão entre os jovens da igreja.",
    },
    {
      id: "3",
      date: "2025-05-05T19:00:00Z",
      title: "Estudo Bíblico",
      description: "Estudo do livro de Atos dos Apóstolos.",
    },
  ],
  devotionals: [
    {
      id: "1",
      title: "Confie no Plano de Deus",
      verse: "Porque eu bem sei os planos que tenho para vós, diz o Senhor, planos de paz, e não de mal, para vos dar o fim que esperais.",
      reference: "Jeremias 29:11",
      content: "Os planos de Deus para nossa vida são sempre maiores e melhores do que podemos imaginar. Mesmo quando não entendemos o caminho, devemos confiar que Ele está no controle e conhece o que é melhor para nós.",
      date: "2025-04-01",
    },
    {
      id: "2",
      title: "Força na Fraqueza",
      verse: "E disse-me: A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.",
      reference: "2 Coríntios 12:9",
      content: "Nos momentos de fraqueza, quando nos sentimos incapazes, é que o poder de Deus se manifesta de forma mais poderosa em nossas vidas. Nossas limitações abrem espaço para a manifestação da graça divina.",
      date: "2025-04-15",
    },
  ],
  videos: [
    {
      id: "vid1",
      title: "Culto de Domingo - A Misericórdia de Deus",
      thumbnail: "https://img.youtube.com/vi/vid1/hqdefault.jpg",
    },
    {
      id: "vid2",
      title: "Louvor e Adoração - Conjunto Renovação",
      thumbnail: "https://img.youtube.com/vi/vid2/hqdefault.jpg",
    },
    {
      id: "vid3",
      title: "Testemunho - Restauração Familiar",
      thumbnail: "https://img.youtube.com/vi/vid3/hqdefault.jpg",
    },
  ],
  photos: [
    {
      id: "p1",
      url: "https://images.unsplash.com/photo-1508948956644-0017e845d797?q=80&w=2787&auto=format&fit=crop",
      alt: "Culto de Adoração",
    },
    {
      id: "p2",
      url: "https://images.unsplash.com/photo-1607346704526-c2b7c2a29f78?q=80&w=2787&auto=format&fit=crop",
      alt: "Encontro de Jovens",
    },
    {
      id: "p3",
      url: "https://images.unsplash.com/photo-1577473403731-3afc2d5b2c25?q=80&w=2787&auto=format&fit=crop",
      alt: "Estudo Bíblico",
    },
  ],
  testimonies: [
    {
      id: "t1",
      content: "Após muitos anos de orações, minha filha foi curada de uma doença grave. Deus é fiel!",
      author: "Maria S.",
    },
    {
      id: "t2",
      content: "Estava desempregado há 8 meses e, após a corrente de oração, recebi três propostas de emprego!",
      author: "João P.",
    },
  ],
  kidsContent: [
    {
      id: "k1",
      title: "A Arca de Noé",
      type: "story",
      url: "#",
      thumbnail: "https://images.unsplash.com/photo-1578665250828-139a8bd0845e?q=80&w=2787&auto=format&fit=crop",
    },
    {
      id: "k2",
      title: "Desenhos para Colorir - Criação",
      type: "pdf",
      url: "#",
    },
  ],
  youthContent: [
    {
      id: "y1",
      title: "Como Tomar Decisões Sábias",
      type: "devotional",
      content: "Quando enfrentamos decisões difíceis na vida, podemos contar com a sabedoria divina...",
      verse: "Tiago 1:5",
    },
    {
      id: "y2",
      title: "Encontro de Jovens - Música e Testemunhos",
      type: "video",
      url: "#",
      thumbnail: "https://images.unsplash.com/photo-1526218626217-dc65a29bb444?q=80&w=2787&auto=format&fit=crop",
    },
  ],
  series: [
    {
      id: "s1",
      title: "Fundamentos da Fé",
      description: "Uma série sobre os princípios fundamentais da nossa fé.",
      coverImage: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      videos: [
        {
          id: "v1",
          title: "A Importância da Oração",
          youtubeId: "sample123",
          notes: "Anotações sobre oração...",
        },
      ],
    },
  ],
  pixKey: "igreja@renovada.org",
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(sampleData);

  useEffect(() => {
    const savedData = localStorage.getItem('churchAppData');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse saved data:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('churchAppData', JSON.stringify(data));
  }, [data]);

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = {
      ...event,
      id: `event-${Date.now()}`,
    };
    setData(prev => ({
      ...prev,
      events: [...prev.events, newEvent].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    }));
  };

  const updateDailyVerse = (verse: { text: string; reference: string }) => {
    setData(prev => ({
      ...prev,
      dailyVerse: verse,
    }));
  };

  const updateFeaturedVideo = (video: VideoInfo) => {
    setData(prev => ({
      ...prev,
      featuredVideo: video,
    }));
  };

  const addTestimony = (testimony: Omit<Testimony, 'id'>) => {
    const newTestimony = {
      ...testimony,
      id: `testimony-${Date.now()}`,
    };
    setData(prev => ({
      ...prev,
      testimonies: [newTestimony, ...prev.testimonies],
    }));
  };

  const addPhoto = (photo: Omit<Photo, 'id'>) => {
    const newPhoto = {
      ...photo,
      id: `photo-${Date.now()}`,
    };
    setData(prev => ({
      ...prev,
      photos: [newPhoto, ...prev.photos],
    }));
  };

  const addDevotional = (devotional: Omit<Devotional, 'id'>) => {
    const newDevotional = {
      ...devotional,
      id: `devotional-${Date.now()}`,
    };
    setData(prev => ({
      ...prev,
      devotionals: [newDevotional, ...prev.devotionals],
    }));
  };

  const addVideo = (video: Omit<VideoInfo, 'id'>) => {
    const newVideo = {
      ...video,
      id: `video-${Date.now()}`,
    };
    setData(prev => ({
      ...prev,
      videos: [newVideo, ...prev.videos],
    }));
  };

  const addKidsContent = (content: Omit<KidsContent, 'id'>) => {
    const newContent = {
      ...content,
      id: `kids-${Date.now()}`,
    };
    setData(prev => ({
      ...prev,
      kidsContent: [newContent, ...prev.kidsContent],
    }));
  };

  const addYouthContent = (content: Omit<YouthContent, 'id'>) => {
    const newContent = {
      ...content,
      id: `youth-${Date.now()}`,
    };
    setData(prev => ({
      ...prev,
      youthContent: [newContent, ...prev.youthContent],
    }));
  };

  const addSeries = (series: Omit<Series, 'id'>) => {
    const newSeries = {
      ...series,
      id: `series-${Date.now()}`,
    };
    setData(prev => ({
      ...prev,
      series: [newSeries, ...prev.series],
    }));
  };

  const addVideoToSeries = (seriesId: string, video: Omit<SeriesVideo, 'id'>) => {
    const newVideo = {
      ...video,
      id: `video-${Date.now()}`,
    };
    setData(prev => ({
      ...prev,
      series: prev.series.map(s => 
        s.id === seriesId 
          ? { ...s, videos: [...s.videos, newVideo] }
          : s
      ),
    }));
  };

  const updateSeriesNotes = (seriesId: string, videoId: string, notes: string) => {
    setData(prev => ({
      ...prev,
      series: prev.series.map(s => 
        s.id === seriesId 
          ? {
              ...s,
              videos: s.videos.map(v => 
                v.id === videoId 
                  ? { ...v, notes }
                  : v
              ),
            }
          : s
      ),
    }));
  };

  const updatePixKey = (key: string) => {
    setData(prev => ({
      ...prev,
      pixKey: key,
    }));
  };

  return (
    <AppDataContext.Provider
      value={{
        data,
        addEvent,
        updateDailyVerse,
        updateFeaturedVideo,
        addTestimony,
        addPhoto,
        addDevotional,
        addVideo,
        addKidsContent,
        addYouthContent,
        addSeries,
        addVideoToSeries,
        updateSeriesNotes,
        updatePixKey,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = (): AppDataContextType => {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};
