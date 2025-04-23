
import { Link } from 'react-router-dom';
import { Instagram, Calendar, BookOpen, Heart, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppData } from '@/context/AppDataContext';
import { cn } from '@/lib/utils';

const Home = () => {
  const { data } = useAppData();
  
  const handleInstagramClick = () => {
    // Typically would use the church's actual Instagram URL
    window.open('https://instagram.com', '_blank');
  };
  
  // Additional menu items beyond the bottom nav
  const additionalMenuItems = [
    { icon: Heart, label: 'Oração', path: '/oracao' },
    { icon: DollarSign, label: 'Contribuir', path: '/contribuicoes' },
    { icon: Users, label: 'Família', path: '/familia' },
  ];

  return (
    <div className="page-container space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Bem-vindo à Igreja Renovada</h1>
        <p className="text-muted-foreground">Transformando vidas através da Palavra</p>
      </div>
      
      {/* Daily Verse */}
      <div className="bible-verse">
        <p className="mb-2">{data.dailyVerse.text}</p>
        <p className="text-right text-sm font-medium">{data.dailyVerse.reference}</p>
      </div>
      
      {/* Featured Video */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Vídeo em Destaque</h2>
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${data.featuredVideo.id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-sm text-muted-foreground">{data.featuredVideo.title}</p>
      </div>
      
      {/* Instagram Button */}
      <Button
        onClick={handleInstagramClick}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
      >
        <Instagram className="mr-2 h-4 w-4" /> Siga-nos no Instagram
      </Button>
      
      {/* Additional Menu */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {additionalMenuItems.map(item => (
          <Link key={item.path} to={item.path} className="no-underline">
            <Card className={cn("card-hover h-full", "border-church-100 hover:border-church-300")}>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <item.icon className="h-6 w-6 mb-2 text-church-600" />
                <span className="text-sm font-medium text-center">{item.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {/* Next Events Preview */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Próximos Eventos</h2>
          <Link to="/agenda" className="text-church-600 text-sm font-medium flex items-center">
            <Calendar className="h-4 w-4 mr-1" /> Ver agenda
          </Link>
        </div>
        
        {data.events.slice(0, 2).map(event => (
          <Card key={event.id} className="card-hover">
            <CardContent className="p-4">
              <div className="text-sm text-church-600 font-medium">
                {new Date(event.date).toLocaleDateString('pt-BR', { 
                  day: 'numeric', 
                  month: 'long',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <div className="font-medium mt-1">{event.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Devotional Preview */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Devocional</h2>
          <Link to="/devocional" className="text-church-600 text-sm font-medium flex items-center">
            <BookOpen className="h-4 w-4 mr-1" /> Ver mais
          </Link>
        </div>
        
        {data.devotionals.slice(0, 1).map(devotional => (
          <Card key={devotional.id} className="card-hover">
            <CardContent className="p-4">
              <h3 className="font-medium">{devotional.title}</h3>
              <p className="text-sm italic mt-1">"{devotional.verse}"</p>
              <p className="text-xs text-right mt-1">{devotional.reference}</p>
              <p className="text-sm mt-3 line-clamp-3">{devotional.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
