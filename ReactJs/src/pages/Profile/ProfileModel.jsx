import React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Avatar,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAction } from "../../Redux/Auth/auth.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 3,
};

export default function ProfileModel({ open, handleClose }) {
  const dispatch = useDispatch();
  const { auth, loading } = useSelector((store) => store);

  const formik = useFormik({
    initialValues: {
      firstName: auth?.user?.firstName || "",
      lastName: auth?.user?.lastName || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      // Dispatch update action and close modal on success
      dispatch(updateProfileAction(values))
        .then(() => {
          handleClose();
        })
        .catch((err) => {
          // handle error if needed
          console.error("Update failed", err);
        });
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevent default full reload
            formik.handleSubmit();
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <Typography variant="h6">Edit Profile</Typography>
            </div>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>

          {/* Cover Image */}
          <div className="h-[15rem] mb-4">
            <img
              className="w-full h-full rounded-t-md object-cover"
              src="https://images.pexels.com/photos/31005851/pexels-photo-31005851/free-photo-of-serene-riverside-scene-with-bicycle-and-benches.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="cover"
            />
          </div>

          {/* Avatar */}
          <div className="p-4 flex justify-center -mt-20 mb-4">
            <Avatar
              sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
              src="https://images.pexels.com/photos/19590514/pexels-photo-19590514/free-photo-of-face-of-model-illuminated-with-flame.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
            />
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
          </div>
        </form>
      </Box>
    </Modal>
  );
}
