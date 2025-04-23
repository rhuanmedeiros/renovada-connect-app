
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Download,
  PlayCircle,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppData } from '@/context/AppDataContext';

const Familia = () => {
  const { data } = useAppData();
  
  return (
    <div className="page-container space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-4">Família</h1>
      
      <p className="text-muted-foreground mb-4">
        Conteúdos especiais para todas as idades da família.
      </p>
      
      <Tabs defaultValue="kids" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="kids">Infantil</TabsTrigger>
          <TabsTrigger value="youth">Jovens</TabsTrigger>
        </TabsList>
        
        {/* Kids Content */}
        <TabsContent value="kids" className="mt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Conteúdo Infantil</h2>
            <p className="text-muted-foreground">
              Histórias bíblicas, vídeos educativos e atividades para colorir.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {data.kidsContent.map((item) => (
                <Card key={item.id} className="overflow-hidden card-hover">
                  {item.thumbnail && (
                    <div className="aspect-video relative">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                      </div>
                      
                      {item.type === 'pdf' && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={item.url} download>
                            <Download className="h-4 w-4 mr-1" /> PDF
                          </a>
                        </Button>
                      )}
                      
                      {item.type === 'video' && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <PlayCircle className="h-4 w-4 mr-1" /> Ver
                          </a>
                        </Button>
                      )}
                      
                      {item.type === 'story' && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={item.url}>
                            <BookOpen className="h-4 w-4 mr-1" /> Ler
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Youth Content */}
        <TabsContent value="youth" className="mt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Conteúdo para Jovens</h2>
            <p className="text-muted-foreground">
              Devocionais e vídeos temáticos para a juventude.
            </p>
            
            <div className="space-y-6 mt-4">
              {data.youthContent.map((item) => (
                <Card key={item.id} className="overflow-hidden card-hover">
                  {item.type === 'video' && item.thumbnail && (
                    <div className="aspect-video relative">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/80 rounded-full p-4 shadow-lg">
                          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-church-600 border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    
                    {item.type === 'devotional' && (
                      <>
                        {item.verse && (
                          <div className="bible-verse py-2 my-3">
                            <p className="text-sm">{item.verse}</p>
                          </div>
                        )}
                        {item.content && <p className="text-muted-foreground mt-2">{item.content}</p>}
                      </>
                    )}
                    
                    {item.type === 'video' && (
                      <div className="mt-4">
                        <Button asChild>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <PlayCircle className="h-4 w-4 mr-2" /> Assistir Vídeo
                          </a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Familia;
