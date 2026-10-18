import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  const iconFor = (type: string) => {
    if (type === 'success') return <CheckCircle2 className="h-5 w-5 text-emerald-deep" />;
    if (type === 'error') return <XCircle className="h-5 w-5 text-red-700" />;
    return <Info className="h-5 w-5 text-bronze" />;
  };

  const accentFor = (type: string) => {
    if (type === 'success') return 'border-l-emerald-deep';
    if (type === 'error') return 'border-l-red-700';
    return 'border-l-bronze';
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-auto flex items-start gap-3 bg-white shadow-lg border border-stone-200/60 border-l-4 ${accentFor(toast.type)} px-5 py-4 max-w-sm min-w-[280px]`}
          >
            <span className="mt-0.5 shrink-0">{iconFor(toast.type)}</span>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-sm font-medium text-stone-900 tracking-wide">{toast.title}</p>
              <p className="font-sans text-xs text-stone-500 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-stone-400 hover:text-stone-700 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
