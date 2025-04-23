
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useAppData } from '@/context/AppDataContext';

const Midia = () => {
  const { data } = useAppData();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-4">Mídia</h1>
      
      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="videos">Vídeos</TabsTrigger>
          <TabsTrigger value="fotos">Galeria de Fotos</TabsTrigger>
        </TabsList>
        
        {/* Videos Tab */}
        <TabsContent value="videos" className="mt-6">
          <div className="space-y-6">
            {data.videos.map((video) => (
              <Card key={video.id} className="overflow-hidden card-hover">
                <div className="aspect-video relative">
                  <a 
                    href={`https://www.youtube.com/watch?v=${video.id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-4 shadow-lg">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-church-600 border-b-[10px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </a>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium line-clamp-2">{video.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Photos Tab */}
        <TabsContent value="fotos" className="mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {data.photos.map((photo) => (
              <Dialog key={photo.id}>
                <DialogTrigger asChild>
                  <Card 
                    className="overflow-hidden card-hover cursor-pointer"
                    onClick={() => setSelectedPhoto(photo.url)}
                  >
                    <div className="aspect-square">
                      <img 
                        src={photo.url} 
                        alt={photo.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] p-2 sm:p-6">
                  <AspectRatio ratio={1/1} className="bg-muted">
                    <img 
                      src={photo.url} 
                      alt={photo.alt}
                      className="w-full h-full object-contain"
                    />
                  </AspectRatio>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Midia;
