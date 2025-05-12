import { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../services/api";
import {
  Box,
  Typography,
  Grid,
  Button,
  Modal,
  IconButton,
  Chip,
  Paper,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import NotesIcon from "@mui/icons-material/Notes";
import EditIcon from "@mui/icons-material/Edit";
import NoteForm from "./NoteForm";

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const fetchNotes = async () => {
    setLoading(true);
    const res = await getNotes();
    setNotes(res.data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  const openAddModal = () => {
    setSelectedNote(null);
    setModalOpen(true);
  };

  const openEditModal = (note) => {
    setSelectedNote(note);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNote(null);
    setModalOpen(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", p: 2 }}>
      {/* Header */}
      <Box display="flex" justifyContent="center" mb={2}>
        <Typography variant="h4" component="h1">
          Notebook
        </Typography>
      </Box>

      {/* Info Row */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={2}
      >
        <Typography
          variant="body1"
          sx={{
            color: "grey",
            visibility: notes.length > 0 ? "visible" : "hidden",
          }}
        >
          There are{" "}
          <Box component="span" fontWeight="bold" color="blue">
            {notes.length}
          </Box>{" "}
          notes currently in your notebook
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={openAddModal}
          startIcon={<AddIcon />}
        >
          Add Note
        </Button>
      </Box>

      {/* Loader / Empty / Notes Grid */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : notes.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="200px"
        >
          <NotesIcon sx={{ fontSize: 60, color: "grey" }} />
          <Typography variant="h6" color="textSecondary">
            No notes available at the moment
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2} >
          {notes.map((note) => (
            <Grid item xs={12} sm={6} lg={3} key={note._id} mt={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                {/* Title + Actions */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h6"
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#1976d2",
                      color: "white",
                      px: 2,
                      py: 1,
                      borderRadius: "4px",
                      fontWeight: "bold",
                      clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                      maxWidth: "80%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {note.title}
                  </Typography>
                  <Box>
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => openEditModal(note)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDelete(note._id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                {/* Content */}
                <Typography
                  variant="body2"
                  sx={{ mt: 1, overflowWrap: "break-word" }}
                >
                  {note.content}
                </Typography>

                {/* Status */}
                <Chip
                  label={note.status}
                  color={note.status === "completed" ? "success" : "primary"}
                  variant="filled"
                  sx={{
                    mt: 2,
                    alignSelf: "flex-start",
                    textTransform: "capitalize",
                  }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="note-modal"
        aria-describedby="modal-for-creating-or-editing-note"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <NoteForm
            onNoteAdded={fetchNotes}
            onClose={closeModal}
            existingNote={selectedNote}
          />
        </Box>
      </Modal>
    </Box>
  );
}
