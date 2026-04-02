import ReactModal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { cn } from '@/utils/cn';

// Bind modal to the root element for screen reader accessibility
ReactModal.setAppElement('#root');

export default function Modal({ isOpen, onClose, title, children, className }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={cn(
        "relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl outline-none focus:outline-none sm:max-w-lg mt-16 sm:mt-24 mx-auto",
        className
      )}
      overlayClassName="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm overflow-y-auto"
      bodyOpenClassName="overflow-hidden"
      closeTimeoutMS={200}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        {title && (
          <h3 className="text-lg font-bold text-slate-900">
            {title}
          </h3>
        )}
        <button
          type="button"
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          onClick={onClose}
        >
          <FiX className="text-xl" />
          <span className="sr-only">Close</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {children}
      </div>
    </ReactModal>
  );
}
