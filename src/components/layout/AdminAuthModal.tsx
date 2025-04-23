
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/context/AdminContext';

export const AdminAuthModal = () => {
  const [pin, setPin] = useState('');
  const { showAdminAuth, setShowAdminAuth, login } = useAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pin)) {
      setShowAdminAuth(false);
      setPin('');
    }
  };

  return (
    <Dialog open={showAdminAuth} onOpenChange={setShowAdminAuth}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Área Administrativa</DialogTitle>
          <DialogDescription>
            Digite o PIN de acesso para entrar na área administrativa.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="flex flex-col space-y-2">
            <Input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              placeholder="Digite o PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="text-center text-2xl tracking-widest"
            />
            <div className="text-xs text-muted-foreground text-center">
              PIN padrão: 1234
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="button" variant="ghost" onClick={() => setShowAdminAuth(false)} className="mr-2">
              Cancelar
            </Button>
            <Button type="submit">Entrar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
