const noteService = require('../services/noteService');

const addNote = async (req, res) => {
  const { title, content, status = 'active' } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const note = await noteService.addNote(title, content, status);
    res.status(201).json({message: 'Note created'});  // Respond with the created note
  } catch (err) {
    res.status(500).json({ message: 'Error adding note' });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, status } = req.body;

  try {
    const updatedNote = await noteService.updateNote(id, title, content, status);
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(updatedNote);  // Respond with the updated note
  } catch (err) {
    res.status(500).json({ message: 'Error updating note' });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const success = await noteService.deleteNote(id);
    if (!success) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting note' });
  }
};

const deleteAllNotes = async (req, res) => {
  try {
    await noteService.deleteAllNotes();
    res.status(200).json({ message: 'All notes deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting all notes' });
  }
};

const getAllNotes = async (_req, res) => {
  try {
    const notes = await noteService.getAllNotes();
    res.status(200).json(notes);  // Respond with the list of notes
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving notes' });
  }
};

module.exports = {
  addNote,
  updateNote,
  deleteNote,
  deleteAllNotes,
  getAllNotes
};
