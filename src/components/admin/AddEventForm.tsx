
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

const eventFormSchema = z.object({
  title: z.string().min(2, "O título é obrigatório"),
  date: z.string().min(2, "A data é obrigatória"),
  description: z.string().min(2, "A descrição é obrigatória"),
});

export const AddEventForm = () => {
  const { addEvent } = useAppData();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      date: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    addEvent({
      title: values.title,
      date: values.date,
      description: values.description,
    });
    form.reset();
    toast({
      title: "Evento adicionado",
      description: "O evento foi adicionado com sucesso.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Evento</CardTitle>
        <CardDescription>
          Adicione um novo evento ao calendário.
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
                  <FormLabel>Título do Evento</FormLabel>
                  <FormControl>
                    <Input placeholder="Título do evento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data e Hora</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
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
                    <Textarea placeholder="Descrição do evento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Evento
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
