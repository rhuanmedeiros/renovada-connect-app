
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from '@/hooks/use-toast';
import { useAppData } from '@/context/AppDataContext';

const formSchema = z.object({
  name: z.string().optional(),
  prayerRequest: z.string().min(5, {
    message: "O pedido de oração deve ter pelo menos 5 caracteres.",
  }),
});

const Oracao = () => {
  const { toast } = useToast();
  const { data } = useAppData();
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      prayerRequest: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Pedido de oração enviado",
      description: "Estaremos orando por você!",
    });
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      form.reset();
      setSubmitted(false);
    }, 3000);
  }

  return (
    <div className="page-container space-y-8 animate-fade-in">
      <h1 className="text-2xl font-bold mb-2">Oração</h1>
      
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Pedido de Oração</h2>
        <p className="text-muted-foreground">
          Envie seu pedido de oração e nossa equipe estará intercedendo por você.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="prayerRequest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu pedido de oração</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva seu pedido de oração" 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={submitted}
            >
              {submitted ? "Enviado!" : "Enviar pedido de oração"}
            </Button>
          </form>
        </Form>
      </div>
      
      <div className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold">Testemunhos</h2>
        <p className="text-muted-foreground mb-4">
          Veja como Deus tem operado na vida das pessoas através da oração.
        </p>
        
        <div className="space-y-4">
          {data.testimonies.map((testimony) => (
            <Card key={testimony.id} className="card-hover">
              <CardContent className="p-6">
                <p className="italic mb-4">"{testimony.content}"</p>
                <p className="text-right text-church-600 font-medium text-sm">
                  — {testimony.author}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Oracao;
