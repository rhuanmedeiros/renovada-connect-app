import { Link } from 'react-router-dom';
import { Instagram, Calendar, BookOpen, Heart, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppData } from '@/context/AppDataContext';
import { cn } from '@/lib/utils';
const Home = () => {
  const {
    data
  } = useAppData();
  const handleInstagramClick = () => {
    window.open('https://instagram.com', '_blank');
  };
  const additionalMenuItems = [{
    icon: Heart,
    label: 'Oração',
    path: '/oracao',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700'
  }, {
    icon: DollarSign,
    label: 'Contribuir',
    path: '/contribuicoes',
    bgColor: 'bg-blue-200',
    textColor: 'text-blue-800'
  }, {
    icon: Users,
    label: 'Família',
    path: '/familia',
    bgColor: 'bg-blue-300',
    textColor: 'text-blue-900'
  }];
  return <div className="page-container space-y-6 animate-fade-in bg-slate-950">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-50">Bem-vindo à Igreja Renovada</h1>
        <p className="text-zinc-200">Transformando vidas através da Palavra</p>
      </div>
      
      <div className="bible-verse bg-blue-100 border-blue-500 text-blue-900">
        <p className="mb-2">{data.dailyVerse.text}</p>
        <p className="text-right text-sm font-medium">{data.dailyVerse.reference}</p>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-zinc-100">Vídeo em Destaque</h2>
        <div className="aspect-video bg-blue-200 rounded-lg overflow-hidden">
          <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${data.featuredVideo.id}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <p className="text-sm text-slate-300">{data.featuredVideo.title}</p>
      </div>
      
      <Button onClick={handleInstagramClick} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
        <Instagram className="mr-2 h-4 w-4" /> Siga-nos no Instagram
      </Button>
      
      <div className="grid grid-cols-3 gap-4 mt-8">
        {additionalMenuItems.map(item => <Link key={item.path} to={item.path} className="no-underline">
            <Card className={cn("card-hover h-full", item.bgColor, "border-transparent")}>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <item.icon className={`h-6 w-6 mb-2 ${item.textColor}`} />
                <span className={`text-sm font-medium text-center ${item.textColor}`}>{item.label}</span>
              </CardContent>
            </Card>
          </Link>)}
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-zinc-100">Próximos Eventos</h2>
          <Link to="/agenda" className="text-blue-600 text-sm font-medium flex items-center">
            <Calendar className="h-4 w-4 mr-1 bg-zinc-100" /> Ver agenda
          </Link>
        </div>
        
        {data.events.slice(0, 2).map(event => <Card key={event.id} className="card-hover bg-blue-100">
            <CardContent className="p-4">
              <div className="text-sm text-blue-700 font-medium">
                {new Date(event.date).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              hour: '2-digit',
              minute: '2-digit'
            })}
              </div>
              <div className="font-medium mt-1 text-blue-900">{event.title}</div>
            </CardContent>
          </Card>)}
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center bg-slate-900">
          <h2 className="text-xl font-semibold text-zinc-100">Devocional</h2>
          <Link to="/devocional" className="text-white-600 text-sm font-medium flex items-center">
            <BookOpen className="h-4 w-4 mr-1" /> Ver mais
          </Link>
        </div>
        
        {data.devotionals.slice(0, 1).map(devotional => <Card key={devotional.id} className="card-hover bg-blue-100">
            <CardContent className="p-4">
              <h3 className="font-medium text-blue-900">{devotional.title}</h3>
              <p className="text-sm italic mt-1 text-blue-700">"{devotional.verse}"</p>
              <p className="text-xs text-right mt-1 text-blue-600">{devotional.reference}</p>
              <p className="text-sm mt-3 line-clamp-3 text-blue-800">{devotional.content}</p>
            </CardContent>
          </Card>)}
      </div>
    </div>;
};
export default Home;