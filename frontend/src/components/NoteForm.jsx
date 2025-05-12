import { useState, useEffect } from "react";
import { createNote, updateNote } from "../services/api";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Paper,
  Typography,
} from "@mui/material";

export default function NoteForm({ onNoteAdded, onClose, existingNote }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    status: "active",
  });

  useEffect(() => {
    if (existingNote) {
      setForm({
        title: existingNote.title,
        content: existingNote.content,
        status: existingNote.status,
      });
    }
  }, [existingNote]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingNote) {
      await updateNote(existingNote._id, form);
    } else {
      const res = await createNote(form);
      if (res.status === 201) {
        alert(res.data.message);
      }
    }
    onNoteAdded();
    onClose();
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        {existingNote ? "Edit Note" : "Add a New Note"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Content"
          name="content"
          value={form.content}
          onChange={handleChange}
          multiline
          rows={4}
          required
        />
        <TextField
          select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>
        <Button type="submit" variant="contained">
          {existingNote ? "Update Note" : "Add Note"}
        </Button>
      </Box>
    </Paper>
  );
}
