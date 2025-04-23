
import { useState } from 'react';
import { Share2, ExternalLink } from 'lucide-react';
import { 
  Card, 
  CardContent,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppData } from '@/context/AppDataContext';
import { formatDatePtBr } from '@/utils/dateUtils';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Devocional = () => {
  const { data } = useAppData();
  const { toast } = useToast();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const handleShare = (devotional: any) => {
    if (navigator.share) {
      navigator.share({
        title: `Devocional: ${devotional.title}`,
        text: `"${devotional.verse}" - ${devotional.reference}\n\n${devotional.content.substring(0, 100)}...`,
        url: window.location.href,
      }).catch((error) => console.log('Erro ao compartilhar', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(
        `Devocional: ${devotional.title}\n"${devotional.verse}" - ${devotional.reference}\n\n${devotional.content}`
      );
      toast({
        title: "Copiado para a área de transferência",
        description: "Texto copiado com sucesso. Agora você pode compartilhar!",
      });
    }
  };
  
  const openBibliaOnline = () => {
    window.open('https://www.bibliaonline.com.br', '_blank');
  };
  
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-2">Devocionais</h1>
      
      <Button 
        onClick={openBibliaOnline} 
        variant="outline" 
        className="w-full mb-6"
      >
        <ExternalLink className="mr-2 h-4 w-4" /> Abrir Bíblia Online
      </Button>
      
      <div className="space-y-6">
        {data.devotionals.map((devotional) => (
          <Card key={devotional.id} className="card-hover overflow-hidden">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{devotional.title}</h2>
                <div className="text-xs text-muted-foreground">
                  {formatDatePtBr(devotional.date)}
                </div>
              </div>
              
              <div className="bible-verse py-3 my-3">
                <p className="mb-1">"{devotional.verse}"</p>
                <p className="text-right text-sm font-medium">{devotional.reference}</p>
              </div>
              
              <div className={cn(
                "mt-4 text-muted-foreground transition-all duration-300",
                expandedId !== devotional.id && "line-clamp-3"
              )}>
                {devotional.content}
              </div>
              
              {devotional.content.length > 150 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleExpand(devotional.id)}
                  className="mt-2 text-church-600 hover:text-church-700 hover:bg-church-100 p-0 h-auto"
                >
                  {expandedId === devotional.id ? "Ler menos" : "Ler mais"}
                </Button>
              )}
            </CardContent>
            
            <CardFooter className="bg-muted/20 p-3">
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-church-600 hover:text-church-700 hover:bg-church-100"
                onClick={() => handleShare(devotional)}
              >
                <Share2 className="h-4 w-4 mr-2" /> Compartilhar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Devocional;
