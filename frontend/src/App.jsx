import { Box, Typography } from '@mui/material';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { useState } from 'react';

export default function App() {
  const [refresh] = useState(false);



  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 3}}>
      <NoteList key={refresh} />
    </Box>
  );
}
