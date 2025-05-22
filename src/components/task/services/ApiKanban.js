//import axios from 'axios';
import { initialData } from '../../placeholderdata';


export const fetchKanbanData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: initialData });
    }, 5); 
  });

};