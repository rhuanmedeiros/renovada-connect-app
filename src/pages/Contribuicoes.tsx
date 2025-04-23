
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppData } from '@/context/AppDataContext';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'react-qr-code';

const Contribuicoes = () => {
  const { data } = useAppData();
  const { toast } = useToast();
  
  const handleCopyPix = () => {
    navigator.clipboard.writeText(data.pixKey);
    toast({
      title: "Chave PIX copiada!",
      description: "A chave foi copiada para a área de transferência.",
    });
  };
  
  const openPagSeguro = () => {
    window.open('https://pagseguro.uol.com.br', '_blank');
  };
  
  const openPicPay = () => {
    window.open('https://picpay.com', '_blank');
  };

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-2">Contribuições</h1>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Por que contribuir?</h2>
          <p className="mb-4 text-muted-foreground">
            Suas contribuições ajudam a manter a igreja e seus projetos sociais, permitindo que levemos a palavra de Deus a mais pessoas e auxiliemos aqueles que precisam.
          </p>
          <p className="mb-4 text-muted-foreground">
            "Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria." — 2 Coríntios 9:7
          </p>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="pix" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pix">PIX</TabsTrigger>
          <TabsTrigger value="pagseguro">PagSeguro</TabsTrigger>
          <TabsTrigger value="picpay">PicPay</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pix" className="mt-6">
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="bg-white p-4 rounded-lg mb-6">
                <QRCode value={data.pixKey} size={200} />
              </div>
              
              <div className="text-center mb-4">
                <p className="font-medium mb-1">Chave PIX:</p>
                <p className="text-church-600">{data.pixKey}</p>
              </div>
              
              <Button onClick={handleCopyPix}>
                Copiar Chave PIX
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pagseguro" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="mb-4">
                  Clique no botão abaixo para contribuir através do PagSeguro:
                </p>
                <Button
                  onClick={openPagSeguro}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Contribuir com PagSeguro
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="picpay" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="mb-4">
                  Clique no botão abaixo para contribuir através do PicPay:
                </p>
                <Button
                  onClick={openPicPay}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Contribuir com PicPay
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Contribuicoes;
