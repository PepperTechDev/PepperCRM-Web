export const initialData ={
  columns: [  {
    id: '1',
    title: 'To Do',
    tasks: [
      { id: 'task-1', content: 'Design homepage', dueDate: '2025-05-23T14:30:00', assignedTo: {name :'Jorge', email: "jorgeemail@"} },
      { id: 'task-2', content: 'Create login flow', dueDate: null, assignedTo: {name : 'Sebas', email: 'Sebas@mail.com'} },
    ],
  },
  {
    id: '3',
    title: 'In Progress',
    tasks: [
      { id: 'task-3', content: 'Build API', dueDate: null, comments:[
        {author: 'Sebas', comment: 'This is a comment.'},
      ]},
    ],
  },
  {
    id: '2',
    title: 'Done',
    tasks: [
      {
        id: 'task-4', content: 'Set up project', dueDate: null, assignedTo : null, comments: [
          { author: 'Jorge', comment: 'Pending revision.' },
          { author: 'Sebas', comment: 'hello' }
        ]
      },
    ],
  },],
  users: [
    { id: '1', name: 'Jorge', email: 'jorgeemail@' },
    { id: '2', name: 'Sebas', email: ''}
  ]
};
