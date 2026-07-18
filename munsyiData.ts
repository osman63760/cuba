import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div id="toast-container" className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';
          const isWarning = toast.type === 'warning';

          let bgClass = 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-slate-800 dark:border-slate-700 dark:text-blue-300';
          let Icon = Info;

          if (isSuccess) {
            bgClass = 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-slate-800 dark:border-emerald-900/30 dark:text-emerald-400';
            Icon = CheckCircle2;
          } else if (isError) {
            bgClass = 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-slate-800 dark:border-rose-900/30 dark:text-rose-400';
            Icon = XCircle;
          } else if (isWarning) {
            bgClass = 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-slate-800 dark:border-amber-900/30 dark:text-amber-400';
            Icon = AlertTriangle;
          }

          return (
            <motion.div
              key={toast.id}
              id={`toast-${toast.id}`}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg ${bgClass}`}
            >
              <Icon className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex-1 text-sm font-medium">{toast.message}</div>
              <button
                id={`btn-close-toast-${toast.id}`}
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
