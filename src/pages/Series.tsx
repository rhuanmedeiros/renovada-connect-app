
import { useAppData } from "@/context/AppDataContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const Series = () => {
  const { data, updateSeriesNotes } = useAppData();
  const [expandedSeries, setExpandedSeries] = useState<string | null>(null);

  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-3xl font-bold">Séries de Mensagens</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {data.series.map((series) => (
          <Card key={series.id} className="overflow-hidden">
            <img
              src={series.coverImage}
              alt={series.title}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle>{series.title}</CardTitle>
              <CardDescription>{series.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => setExpandedSeries(
                  expandedSeries === series.id ? null : series.id
                )}
                variant="outline"
                className="w-full"
              >
                {expandedSeries === series.id ? "Fechar" : "Ver Vídeos"}
              </Button>
              
              {expandedSeries === series.id && (
                <div className="space-y-4">
                  {series.videos.map((video) => (
                    <div key={video.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{video.title}</h3>
                        <Button
                          onClick={() => {
                            window.open(
                              `https://youtube.com/watch?v=${video.youtubeId}`,
                              "_blank"
                            );
                          }}
                        >
                          Assistir Agora
                        </Button>
                      </div>
                      <Textarea
                        placeholder="Suas anotações..."
                        value={video.notes || ""}
                        onChange={(e) =>
                          updateSeriesNotes(series.id, video.id, e.target.value)
                        }
                        className="min-h-[100px]"
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Series;
