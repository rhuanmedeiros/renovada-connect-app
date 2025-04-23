
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardFooter,
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
import { Phone, Mail, MapPin, Instagram, Youtube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Digite um email válido.",
  }),
  message: z.string().min(5, {
    message: "A mensagem deve ter pelo menos 5 caracteres.",
  }),
});

const Contato = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Mensagem enviada",
      description: "Entraremos em contato em breve!",
    });
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      form.reset();
      setSubmitted(false);
    }, 3000);
  }
  
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5500000000000', '_blank');
  };
  
  const handleInstagramClick = () => {
    window.open('https://instagram.com', '_blank');
  };
  
  const handleYouTubeClick = () => {
    window.open('https://youtube.com', '_blank');
  };
  
  const handleMapsClick = () => {
    window.open('https://maps.google.com', '_blank');
  };

  return (
    <div className="page-container space-y-8 animate-fade-in">
      <h1 className="text-2xl font-bold mb-2">Contato</h1>
      
      <Card className="overflow-hidden">
        <div className="aspect-[16/9] w-full">
          <iframe
            title="Igreja Renovada Location"
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.3566306068075!2d-43.20879968567195!3d-22.902433843471772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f58a6a00a9d%3A0x3f251d85272f76f7!2sAv.%20Brasil%2C%20Rio%20de%20Janeiro%20-%20RJ!5e0!3m2!1sen!2sbr!4v1650000000000!5m2!1sen!2sbr"
            frameBorder="0"
            loading="lazy"
          ></iframe>
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-church-600 mr-3" />
              <div>
                <p className="font-medium">Endereço</p>
                <p className="text-muted-foreground">Av. Brasil, 1000 - Rio de Janeiro</p>
                <Button 
                  variant="link" 
                  onClick={handleMapsClick} 
                  className="p-0 h-auto text-church-600"
                >
                  Ver no Google Maps
                </Button>
              </div>
            </div>
            
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-church-600 mr-3" />
              <div>
                <p className="font-medium">Telefone / WhatsApp</p>
                <p className="text-muted-foreground">(21) 00000-0000</p>
                <Button 
                  variant="link" 
                  onClick={handleWhatsAppClick} 
                  className="p-0 h-auto text-church-600"
                >
                  Enviar mensagem no WhatsApp
                </Button>
              </div>
            </div>
            
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-church-600 mr-3" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">contato@renovada.org</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={handleInstagramClick}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Instagram className="mr-2 h-5 w-5" /> Instagram
        </Button>
        
        <Button
          onClick={handleYouTubeClick}
          className="bg-red-600 hover:bg-red-700"
        >
          <Youtube className="mr-2 h-5 w-5" /> YouTube
        </Button>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Envie uma mensagem</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Sua mensagem" 
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
              {submitted ? "Enviado!" : "Enviar mensagem"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Contato;
