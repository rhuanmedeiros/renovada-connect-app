
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAppData } from "@/context/AppDataContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";

const seriesFormSchema = z.object({
  title: z.string().min(2, "O título da série é obrigatório"),
  description: z.string().min(2, "A descrição é obrigatória"),
  coverImage: z.string().min(2, "A URL da imagem de capa é obrigatória"),
});

export const AddSeriesForm = () => {
  const { addSeries } = useAppData();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof seriesFormSchema>>({
    resolver: zodResolver(seriesFormSchema),
    defaultValues: {
      title: "",
      description: "",
      coverImage: "",
    },
  });

  function onSubmit(values: z.infer<typeof seriesFormSchema>) {
    addSeries({
      title: values.title,
      description: values.description,
      coverImage: values.coverImage,
      videos: [], // Add this empty videos array to fix the type error
    });
    form.reset();
    toast({
      title: "Série adicionada",
      description: "A série foi adicionada com sucesso.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Série</CardTitle>
        <CardDescription>
          Adicione uma nova série de mensagens.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título da Série</FormLabel>
                  <FormControl>
                    <Input placeholder="Título da série" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Breve descrição da série"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem de Capa</FormLabel>
                  <FormControl>
                    <Input placeholder="Link para a imagem de capa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Série
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
