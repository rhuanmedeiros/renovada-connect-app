
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAppData } from "@/context/AppDataContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const videoFormSchema = z.object({
  id: z.string().min(2, "O ID do vídeo é obrigatório"),
  title: z.string().min(2, "O título do vídeo é obrigatório"),
});

export const FeaturedVideoForm = () => {
  const { data, updateFeaturedVideo } = useAppData();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof videoFormSchema>>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      id: data.featuredVideo.id,
      title: data.featuredVideo.title,
    },
  });

  function onSubmit(values: z.infer<typeof videoFormSchema>) {
    updateFeaturedVideo({
      id: values.id,
      title: values.title,
      thumbnail: `https://img.youtube.com/vi/${values.id}/hqdefault.jpg`,
    });
    toast({
      title: "Vídeo atualizado",
      description: "O vídeo em destaque foi atualizado com sucesso.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vídeo em Destaque</CardTitle>
        <CardDescription>
          Atualize o vídeo que aparece na página inicial.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID do YouTube</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: dQw4w9WgXcQ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do Vídeo</FormLabel>
                  <FormControl>
                    <Input placeholder="Título do vídeo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">Atualizar Vídeo</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
