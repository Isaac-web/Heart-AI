import _ from 'lodash';
import { AppRequest, AppResponse } from '../types';
import {
  Doctor,
  validateDoctorLogin,
  validateDoctorSignUp,
  validateUpdateDoctor,
} from '../models/Doctor';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerDoctor = async (req: AppRequest, res: AppResponse) => {
  const { error } = validateDoctorSignUp(req.body);
  if (error)
    return res.status(422).json({
      message: error.details[0].message,
    });

  if (req.body.password !== req.body.confirmPassword)
    return res.status(400).json({
      message: 'Passwords donnot match.',
    });

  const existingDoctor = await Doctor.findOne({ email: req.body.email });
  if (existingDoctor)
    return res
      .status(400)
      .json({ message: 'The given email is already taken.' });

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const doctor = await Doctor.create({
    email: req.body.email,
    password: hashedPassword,
  });

  const token = jwt.sign({ _id: doctor._id }, `${process.env.JWT_SECRET}`);

  doctor.password = '';

  res.setHeader('X-AUTH-TOKEN', token).json({
    message: 'Doctor registration was successful.',
    data: doctor,
  });
};

export const doctorLogin = async (req: AppRequest, res: AppResponse) => {
  const { error } = validateDoctorLogin(req.body);
  if (error)
    return res.status(422).json({
      message: error.details[0].message,
    });

  const doctor = await Doctor.findOne({ email: req.body.email });
  if (!doctor)
    return res.status(404).json({
      message: 'Invalid email or password.',
    });

  const passwordIsValid = await bcrypt.compare(
    req.body.password,
    doctor.password
  );
  if (!passwordIsValid)
    return res.status(400).json({
      message: 'Invalid email or password.',
    });

  const token = jwt.sign({ _id: doctor._id }, `${process.env.JWT_SECRET}`);

  doctor.password = '';

  res.json({
    message: 'You are logged in.',
    token: token,
    data: doctor,
  });
};


// export const updateDoctor = async (req: AppRequest, res: AppResponse) => {
//   const { error } = validateUpdateDoctor(req.body);
//   if (error)
//     return res.status(422).json({
//       message: error.details[0].message,
//     });

//   res.json({
//     message: 'You are logged in.',
//     data: {},
//   });
// };


// get all doctors info/details 
export const getDoctorInfo = async (req: AppRequest, res: AppResponse) => {
  try {
    const doctors = await Doctor.find({}).select('-password');
    res.status(200).json({
      data: doctors,
    });
  } catch (err: any) {
    res.status(500).json({
      message: `server error: ${err?.message}`,
    });
  }
};

export const getDoctorById = async (req: AppRequest, res: AppResponse) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('-password');
    res.status(200).json({
      data: doctor,
    });
  } catch (err: any) {
    res.status(500).json({
      message: `server error: ${err?.message}`,
    });
  }
};


export const getCurrentDoctor = async (req: AppRequest, res: AppResponse) => {
  const user = req?.user;
  if (!user)
    return res.status(401).json({ message: 'Doctor is not logged in.' });

  const doctor = await Doctor.findById(user._id);
  if (!doctor)
    return res
      .status(404)
      .json({ message: 'Doctor with the given id cannot be found.' });

  doctor.password = '';

  res.json({
    data: doctor,
  });
};

export const updateDoctor = async (req: AppRequest, res: AppResponse) => {
  try {
    const authDoc = req.user;

    !authDoc && res.status(401).json({
      message: 'You are not authorized to perform an update on this account.',
    });

    !req.body && res.status(400).json({
      message: 'No data provided.',
    });

    const { error } = validateUpdateDoctor(req.body);
    error && res.status(422).json({
      message: error.details[0].message,
    });

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        $set: _.pick(req.body, [
          'firstName',
          'lastName',
          'age',
          'sex',
          'phone',
          'bio',
          'hospital',
          'supportingDocumentUrl',
        ]),
      },
      { new: true }
    );
  
    if (!doctor)
      return res
        .status(404)
        .json({ message: 'Doctor with the given id could not be found.' });
  
    doctor.password = '';
  
    res.json({
      message: 'User update was successful.',
      data: doctor,
    });
    
  } catch (err:any) {
    res.status(500).json({
      message: `server error: ${err?.message}`,
    });
  }
}

export const deleteDoctor = async (req: AppRequest, res: AppResponse) => {
  try {
    const authDoc = req.user;

    !authDoc && res.status(401).json({
      message: 'You are not authorized to delete this account.',
    });

    await Doctor.findByIdAndDelete(authDoc);

    res.status(200).json({
      data: {},
      message: 'Your account has been deleted.',
    });

  } catch (err:any) {
    res.status(500).json({
      message: `server error: ${err?.message}`,
    });
  }
}

