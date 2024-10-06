import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const baseTitle = import.meta.env.VITE_BASE_TITLE;

const useDocumentTitle = (title?: string) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title ? `${title} - ${baseTitle}` : baseTitle;
  }, [title, location.pathname]);
};

export default useDocumentTitle;
