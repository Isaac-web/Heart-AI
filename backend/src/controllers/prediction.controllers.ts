import _ from 'lodash';
import { AppRequest, AppResponse } from '../types';
import axios from 'axios';
import Joi from 'joi';
import { validatePredictionParams } from '../models/HealthReport';

export const makePrediction = async (req: AppRequest, res: AppResponse) => {
  const { error } = validatePredictionParams(req.body);
  if (error)
    return res.status(422).json({
      message: error.details[0].message,
    });

  const payload = _.pick(req.body, [
    'age',
    'sex',
    'cp_1',
    'cp_2',
    'cp_3',
    'trestbps',
    'chol',
    'fbs',
    'thalach',
    'exang',
    'oldpeak',
    'slope',
    'ca',
    'thal_1',
    'thal_2',
    'thal_3',
    'restecg_1',
    'restecg_2',
    'restecg_3',
  ]);

  try {
    const { data } = await axios.post(
      'https://bd9f-41-66-228-33.ngrok-free.app/predict',
      payload
    );

    res.json({
      data,
    });
  } catch (err) {
    const error: any = err;
    console.log(error.response.data.detail);
    res.json({ message: 'Something went wrong while making the prediction.' });
  }
};
