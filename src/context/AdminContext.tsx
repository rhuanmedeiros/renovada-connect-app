
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

type AdminContextType = {
  isAdminAuthenticated: boolean;
  login: (pin: string) => boolean;
  logout: () => void;
  showAdminAuth: boolean;
  setShowAdminAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [showAdminAuth, setShowAdminAuth] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Check for existing auth on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('churchAdminAuth');
    if (authStatus === 'true') {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const login = (pin: string): boolean => {
    // Simple PIN authentication (in a real app, this should be more secure)
    if (pin === '1234') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('churchAdminAuth', 'true');
      toast({
        title: "Login realizado com sucesso",
        description: "Você está agora no modo administrativo.",
      });
      return true;
    } else {
      toast({
        title: "PIN incorreto",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('churchAdminAuth');
    toast({
      title: "Logout realizado",
      description: "Você saiu do modo administrativo.",
    });
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminAuthenticated,
        login,
        logout,
        showAdminAuth,
        setShowAdminAuth,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
