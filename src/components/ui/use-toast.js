import { useState } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description }) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, description }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  return { toast, toasts };
}

// Named export for direct imports like: import { toast } from "@/components/ui/use-toast"
export const toast = ({ title, description }) => {
  console.log(`Toast: ${title} - ${description}`);
};