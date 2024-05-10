import { useState } from 'react';
import { Box, Container, SimpleGrid, useColorModeValue, IconButton, Input, Textarea, Button } from '@chakra-ui/react';
import { FaTrash, FaSave } from 'react-icons/fa';

const NoteCard = ({ note, onSave, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onSave(note.id, title, content);
    setEditMode(false);
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md" bg={useColorModeValue('white', 'gray.700')}>
      {editMode ? (
        <>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" mb={3} />
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
          <Button leftIcon={<FaSave />} colorScheme="blue" onClick={handleSave} mt={3}>
            Save
          </Button>
        </>
      ) : (
        <>
          <Box fontSize="xl" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {title}
          </Box>
          <Box d="flex" mt="2" alignItems="center">
            {content}
            <IconButton aria-label="Delete note" icon={<FaTrash />} size="sm" onClick={() => onDelete(note.id)} ml="auto" />
          </Box>
        </>
      )}
    </Box>
  );
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const addNote = () => {
    const newNote = { id: Date.now(), title: '', content: '' };
    setNotes([...notes, newNote]);
    setEditMode(true);
  };

  const saveNote = (id, title, content) => {
    const updatedNotes = notes.map(note => note.id === id ? { ...note, title, content } : note);
    setNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <Container maxW="container.xl" p={5}>
      <Button onClick={addNote} colorScheme="teal" mb={4}>
        Add Note
      </Button>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
        {notes.map(note => (
          <NoteCard key={note.id} note={note} onSave={saveNote} onDelete={deleteNote} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;