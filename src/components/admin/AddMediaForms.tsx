
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAppData } from "@/context/AppDataContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";

const photoFormSchema = z.object({
  url: z.string().min(2, "A URL da foto é obrigatória"),
  alt: z.string().min(2, "A descrição da foto é obrigatória"),
});

const videoFormSchema = z.object({
  id: z.string().min(2, "O ID do vídeo é obrigatório"),
  title: z.string().min(2, "O título do vídeo é obrigatório"),
});

export const AddMediaForms = () => {
  const { addPhoto, addVideo } = useAppData();
  const { toast } = useToast();

  const photoForm = useForm<z.infer<typeof photoFormSchema>>({
    resolver: zodResolver(photoFormSchema),
    defaultValues: {
      url: "",
      alt: "",
    },
  });

  const videoForm = useForm<z.infer<typeof videoFormSchema>>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      id: "",
      title: "",
    },
  });

  function onPhotoSubmit(values: z.infer<typeof photoFormSchema>) {
    addPhoto({
      url: values.url,
      alt: values.alt,
    });
    photoForm.reset();
    toast({
      title: "Foto adicionada",
      description: "A foto foi adicionada com sucesso à galeria.",
    });
  }

  function onVideoSubmit(values: z.infer<typeof videoFormSchema>) {
    addVideo({
      title: values.title,
      thumbnail: `https://img.youtube.com/vi/${values.id}/hqdefault.jpg`,
    });
    videoForm.reset();
    toast({
      title: "Vídeo adicionado",
      description: "O vídeo foi adicionado com sucesso à galeria.",
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Foto</CardTitle>
          <CardDescription>
            Adicione uma nova foto à galeria.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...photoForm}>
            <form onSubmit={photoForm.handleSubmit(onPhotoSubmit)} className="space-y-4">
              <FormField
                control={photoForm.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL da Foto</FormLabel>
                    <FormControl>
                      <Input placeholder="Link da imagem" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={photoForm.control}
                name="alt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Descrição da foto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit">
                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Foto
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Vídeo</CardTitle>
          <CardDescription>
            Adicione um novo vídeo à galeria.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...videoForm}>
            <form onSubmit={videoForm.handleSubmit(onVideoSubmit)} className="space-y-4">
              <FormField
                control={videoForm.control}
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
                control={videoForm.control}
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
              
              <Button type="submit">
                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Vídeo
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
