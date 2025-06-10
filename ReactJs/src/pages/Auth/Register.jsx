// import {
//     Button,
//     FormControlLabel,
//     Radio,
//     RadioGroup,
//     TextField,
//     FormLabel,
//     FormControl
//   } from '@mui/material';
//   import { Field, Formik, Form, ErrorMessage } from 'formik';
//   import { useDispatch } from 'react-redux';
//   import * as Yup from 'yup';
//   import { registerUserAction } from '../../Redux/Auth/auth.action';
  
//   const initialValues = {
//     firstname: '',
//     lastname: '',
//     email: '',
//     password: '',
//     gender: ''
//   };
  
//   const validationSchema = Yup.object({
//     firstname: Yup.string().required("First name is required"),
//     lastname: Yup.string().required("Last name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//     gender: Yup.string().required("Gender is required")
//   });
  
//   const Register = () => {
//     const dispatch = useDispatch();
  
//     const handleSubmit = (values) => {
//       console.log("Form submitted:", values);
//       // Map frontend keys to backend keys
//     const backendData = {
//         firstName: values.firstname,
//         lastName: values.lastname,
//         email: values.email,
//         password: values.password,
//         gender: values.gender
//     };
//       dispatch(registerUserAction(backendData));  // <-- send raw values, not {data: values}
//     };
  
//     return (
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ values, handleChange }) => (
//           <Form className="space-y-5">
//             <div className="space-y-5">
//               <div>
//                 <Field
//                   as={TextField}
//                   name="firstname"
//                   placeholder="First Name"
//                   label="First Name"
//                   variant="outlined"
//                   fullWidth
//                   required
//                 />
//                 <ErrorMessage name="firstname" component="div" className="text-red-500" />
//               </div>
//               <div>
//                 <Field
//                   as={TextField}
//                   name="lastname"
//                   placeholder="Last Name"
//                   label="Last Name"
//                   variant="outlined"
//                   fullWidth
//                   required
//                 />
//                 <ErrorMessage name="lastname" component="div" className="text-red-500" />
//               </div>
//               <div>
//                 <Field
//                   as={TextField}
//                   name="email"
//                   placeholder="Email"
//                   label="Email"
//                   type="email"
//                   variant="outlined"
//                   fullWidth
//                   required
//                 />
//                 <ErrorMessage name="email" component="div" className="text-red-500" />
//               </div>
//               <div>
//                 <Field
//                   as={TextField}
//                   name="password"
//                   placeholder="Password"
//                   label="Password"
//                   type="password"
//                   variant="outlined"
//                   fullWidth
//                   required
//                 />
//                 <ErrorMessage name="password" component="div" className="text-red-500" />
//               </div>
//               <div>
//                 <FormControl component="fieldset">
//                   <FormLabel component="legend">Gender</FormLabel>
//                   <Field
//                     as={RadioGroup}
//                     row
//                     name="gender"
//                     value={values.gender}
//                     onChange={handleChange}
//                   >
//                     <FormControlLabel value="male" control={<Radio />} label="Male" />
//                     <FormControlLabel value="female" control={<Radio />} label="Female" />
//                   </Field>
//                   <ErrorMessage name="gender" component="div" className="text-red-500" />
//                 </FormControl>
//               </div>
//             </div>
  
//             <Button
//               sx={{ padding: '.8rem 0rem' }}
//               fullWidth
//               type="submit"
//               variant="contained"
//               color="primary"
//             >
//               Register
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     );
//   };
  
//   export default Register;
  "use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, Zap } from "lucide-react"
import { Field, Formik, Form, ErrorMessage } from "formik"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"
import { registerUserAction } from "../../Redux/Auth/auth.action"

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  gender: "",
}

const validationSchema = Yup.object({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  gender: Yup.string().required("Gender is required"),
})

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const { auth } = useSelector((store) => store)
  const isLoading = auth?.loading || false

  const handleSubmit = (values) => {
    console.log("Form submitted:", values)
    // Map frontend keys to backend keys
    const backendData = {
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      password: values.password,
      gender: values.gender,
    }
    dispatch(registerUserAction(backendData))
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="space-y-4">
          {/* First Name Field */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <label className="text-white/90 text-sm font-medium block">First Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <User className="h-5 w-5 text-white/50 group-focus-within:text-blue-300 transition-colors duration-300" />
              </div>
              <Field name="firstname">
                {({ field }) => (
                  <motion.input
                    {...field}
                    type="text"
                    placeholder="Enter your first name"
                    whileFocus={{ scale: 1.01 }}
                    className={`w-full pl-12 pr-4 py-3 bg-white/10 border-2 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 backdrop-blur-sm transition-all duration-300 text-sm ${
                      errors.firstname && touched.firstname
                        ? "border-red-400 focus:border-red-400"
                        : "border-white/20 focus:border-blue-400 hover:border-white/30"
                    }`}
                  />
                )}
              </Field>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            <AnimatePresence>
              {errors.firstname && touched.firstname && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="text-red-300 text-sm flex items-center space-x-2"
                >
                  <Zap className="w-3 h-3" />
                  <ErrorMessage name="firstname" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Last Name Field */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-2"
          >
            <label className="text-white/90 text-sm font-medium block">Last Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <User className="h-5 w-5 text-white/50 group-focus-within:text-blue-300 transition-colors duration-300" />
              </div>
              <Field name="lastname">
                {({ field }) => (
                  <motion.input
                    {...field}
                    type="text"
                    placeholder="Enter your last name"
                    whileFocus={{ scale: 1.01 }}
                    className={`w-full pl-12 pr-4 py-3 bg-white/10 border-2 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 backdrop-blur-sm transition-all duration-300 text-sm ${
                      errors.lastname && touched.lastname
                        ? "border-red-400 focus:border-red-400"
                        : "border-white/20 focus:border-blue-400 hover:border-white/30"
                    }`}
                  />
                )}
              </Field>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            <AnimatePresence>
              {errors.lastname && touched.lastname && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="text-red-300 text-sm flex items-center space-x-2"
                >
                  <Zap className="w-3 h-3" />
                  <ErrorMessage name="lastname" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-2"
          >
            <label className="text-white/90 text-sm font-medium block">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Mail className="h-5 w-5 text-white/50 group-focus-within:text-blue-300 transition-colors duration-300" />
              </div>
              <Field name="email">
                {({ field }) => (
                  <motion.input
                    {...field}
                    type="email"
                    placeholder="Enter your email address"
                    whileFocus={{ scale: 1.01 }}
                    className={`w-full pl-12 pr-4 py-3 bg-white/10 border-2 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 backdrop-blur-sm transition-all duration-300 text-sm ${
                      errors.email && touched.email
                        ? "border-red-400 focus:border-red-400"
                        : "border-white/20 focus:border-blue-400 hover:border-white/30"
                    }`}
                  />
                )}
              </Field>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            <AnimatePresence>
              {errors.email && touched.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="text-red-300 text-sm flex items-center space-x-2"
                >
                  <Zap className="w-3 h-3" />
                  <ErrorMessage name="email" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-2"
          >
            <label className="text-white/90 text-sm font-medium block">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Lock className="h-5 w-5 text-white/50 group-focus-within:text-blue-300 transition-colors duration-300" />
              </div>
              <Field name="password">
                {({ field }) => (
                  <motion.input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    whileFocus={{ scale: 1.01 }}
                    className={`w-full pl-12 pr-12 py-3 bg-white/10 border-2 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 backdrop-blur-sm transition-all duration-300 text-sm ${
                      errors.password && touched.password
                        ? "border-red-400 focus:border-red-400"
                        : "border-white/20 focus:border-blue-400 hover:border-white/30"
                    }`}
                  />
                )}
              </Field>
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center z-10"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-white/50 hover:text-white/80 transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-white/50 hover:text-white/80 transition-colors" />
                )}
              </motion.button>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            <AnimatePresence>
              {errors.password && touched.password && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="text-red-300 text-sm flex items-center space-x-2"
                >
                  <Zap className="w-3 h-3" />
                  <ErrorMessage name="password" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Gender Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-2"
          >
            <label className="text-white/90 text-sm font-medium block">Gender</label>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                onClick={() => setFieldValue("gender", "male")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`py-3 px-4 rounded-xl border-2 transition-all duration-300 text-sm font-medium ${
                  values.gender === "male"
                    ? "bg-blue-500/20 border-blue-400 text-blue-300"
                    : "bg-white/10 border-white/20 text-white/70 hover:border-white/30 hover:bg-white/15"
                }`}
              >
                Male
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setFieldValue("gender", "female")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`py-3 px-4 rounded-xl border-2 transition-all duration-300 text-sm font-medium ${
                  values.gender === "female"
                    ? "bg-pink-500/20 border-pink-400 text-pink-300"
                    : "bg-white/10 border-white/20 text-white/70 hover:border-white/30 hover:bg-white/15"
                }`}
              >
                Female
              </motion.button>
            </div>
            <AnimatePresence>
              {errors.gender && touched.gender && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="text-red-300 text-sm flex items-center space-x-2"
                >
                  <Zap className="w-3 h-3" />
                  <ErrorMessage name="gender" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Terms and Conditions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center space-x-2"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-400 bg-white/10 border-white/30 rounded focus:ring-blue-400 focus:ring-2 backdrop-blur-sm"
            />
            <span className="text-sm text-white/70">
              I agree to the{" "}
              <a href="#" className="text-blue-300 hover:text-blue-200 underline underline-offset-4">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-300 hover:text-blue-200 underline underline-offset-4">
                Privacy Policy
              </a>
            </span>
          </motion.div>

          {/* Register Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span>Creating account...</span>
                  </motion.div>
                ) : (
                  <motion.span key="register" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Create Your Account
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </motion.div>

          {/* Social Login Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-white/60">Or sign up with</span>
            </div>
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="grid grid-cols-2 gap-3"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-xl bg-white/10 hover:bg-white/15 transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-white font-medium">Google</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-xl bg-white/10 hover:bg-white/15 transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-white font-medium">Facebook</span>
            </motion.button>
          </motion.div>
        </Form>
      )}
    </Formik>
  )
}

export default Register
