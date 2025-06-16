import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Input,
  CircularProgress,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { createStory } from "../../Redux/Story/story.actions";

const CreateStoryDialog = ({ open, handleClose }) => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const handleUpload = async () => {
    try {
      setUploading(true);
      const url = await uploadToCloudinary(file, "video");
      const storyData = {
        caption: caption,
        video: url,
      };
      
      dispatch(createStory(storyData)).then(() => {
        alert("Story uploaded successfully!");});
      handleClose();
      setCaption("");
      setFile(null);
    } catch (err) {
      console.error("Error uploading story:", err);
      alert("Failed to upload story. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Story</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <TextField
            label="Caption"
            fullWidth
            variant="outlined"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!file || uploading}
          >
            {uploading ? <CircularProgress size={20} /> : "Upload"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStoryDialog;
