import axios from 'axios';
import { initialData } from '../components/placeholderdata';


export const fetchKanbanData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: initialData });
    }, 500); 
  });

};