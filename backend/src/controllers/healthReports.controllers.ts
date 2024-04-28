import { HealthReport } from '../models/HealthReport';
import { AppRequest, AppResponse } from '../types';
import _ from 'lodash';

export const createHealthReport = async (req: AppRequest, res: AppResponse) => {
  await HealthReport.create(
    _.pick(req.body, [
      'userId',
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
    ])
  );
};
