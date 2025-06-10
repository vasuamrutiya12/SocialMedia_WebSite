import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import {
  Avatar,
  Backdrop,
  CircularProgress,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { useDispatch } from "react-redux";
import { createPostAction } from "../../Redux/Post/post.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  background: "rgba(17, 24, 39, 0.8)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(10px)",
  borderRadius: "1rem",
  p: 4,
  outline: "none",
  color: "#e5e7eb",
};

const CreatePostModel = ({ handleClose, open }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      caption: "",
      img: null,
      video: null,
    },
    onSubmit: (values) => {
      setIsLoading(true);
      dispatch(createPostAction(values));
      setTimeout(() => {
        setIsLoading(false);
        handleClose();
      }, 2000);
    },
  });

  const handleSelectImage = async (event) => {
    setIsLoading(true);
    const imageUrl = await uploadToCloudinary(event.target.files[0], "image");
    if (imageUrl) {
      setSelectedImage(imageUrl);
      formik.setFieldValue("img", imageUrl);
    }
    setIsLoading(false);
  };

  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
    if (videoUrl) {
      setSelectedVideo(videoUrl);
      formik.setFieldValue("video", videoUrl);
    }
    setIsLoading(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <Avatar />
            <div>
              <Typography fontWeight={600}>Code with Vasu</Typography>
              <Typography variant="caption" color="gray">
                @codewithvasu
              </Typography>
            </div>
          </div>

          {/* Caption Input */}
          <textarea
            placeholder="Write a caption..."
            name="caption"
            onChange={formik.handleChange}
            value={formik.values.caption}
            rows={3}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none mb-4"
          />

          {/* Media Buttons */}
          <div className="flex gap-6 items-center mb-4 text-sm">
            {/* Image */}
            <div className="flex items-center gap-2 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleSelectImage}
                id="image-input"
                hidden
              />
              <label htmlFor="image-input" className="flex items-center gap-1 hover:text-purple-400">
                <IconButton color="primary" component="span">
                  <ImageIcon />
                </IconButton>
                <span>Image</span>
              </label>
            </div>

            {/* Video */}
            <div className="flex items-center gap-2 cursor-pointer">
              <input
                type="file"
                accept="video/*"
                onChange={handleSelectVideo}
                id="video-input"
                hidden
              />
              <label htmlFor="video-input" className="flex items-center gap-1 hover:text-blue-400">
                <IconButton color="primary" component="span">
                  <VideoCallIcon />
                </IconButton>
                <span>Video</span>
              </label>
            </div>
          </div>

          {/* Preview Media */}
          {selectedImage && (
            <div className="mb-4">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg border border-gray-700"
              />
            </div>
          )}
          {selectedVideo && (
            <div className="mb-4">
              <video
                src={selectedVideo}
                controls
                className="w-full h-40 object-cover rounded-lg border border-gray-700"
              />
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "999px",
                background: "linear-gradient(to right, #8e2de2, #4a00e0)",
                color: "#fff",
                textTransform: "none",
                px: 4,
                "&:hover": {
                  background: "linear-gradient(to right, #7b1fa2, #38006b)",
                },
              }}
            >
              Post
            </Button>
          </div>
        </form>

        {/* Loader */}
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
};

export default CreatePostModel;
