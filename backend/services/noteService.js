
const Note = require('../models/noteModel'); 

const validStatuses = ['active', 'completed', 'archived'];

const addNote = async (title, content, status) => {
  try {
    const note = new Note({
      title,
      content,
      status
    });
    await note.save();  // Save note to MongoDB
    return note;  // Return the saved note
  } catch (err) {
    console.error('Error adding note:', err);
    throw new Error('Error adding note');
  }
};

const updateNote = async (id, title, content, status) => {
  try {
    const note = await Note.findById(id);  // Find note by ID
    if (!note) return null;

    // Optional: Validate status
    const validStatuses = ['active', 'completed', 'archived'];
    if (!validStatuses.includes(status)) {
      return { error: 'Invalid status' };
    }

    // Update the note
    note.title = title;
    note.content = content;
    note.status = status;
    await note.save();  // Save changes to MongoDB
    return note;
  } catch (err) {
    console.error('Error updating note:', err);
    throw new Error('Error updating note');
  }
};

const deleteNote = async (id) => {
  try {
    const result = await Note.findByIdAndDelete(id);  // Delete note by ID
    return result !== null;  // Return true if note was deleted
  } catch (err) {
    console.error('Error deleting note:', err);
    return false;  // Return false if error occurs
  }
};

const deleteAllNotes = async () => {
  try {
    await Note.deleteMany();  // Delete all notes
  } catch (err) {
    console.error('Error deleting all notes:', err);
    throw new Error('Error deleting all notes');
  }
};

const getAllNotes = async () => {
  console.log('get notes')
  try {
    const notes = await Note.find({});  // Get all notes from MongoDB
    return notes;
  } catch (err) {
    console.error('Error retrieving notes:', err);
    throw new Error('Error retrieving notes');
  }
};

module.exports = {
  addNote,
  updateNote,
  deleteNote,
  deleteAllNotes,
  getAllNotes
};
