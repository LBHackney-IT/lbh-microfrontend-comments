import { AxiosSWRResponse, useAxiosSWR } from '@mtfh/common';
import { Tenure } from '../../types';
import { config } from '../config';

export const useTenure = (id: string): AxiosSWRResponse<Tenure> => {
    return useAxiosSWR<Tenure>(`${config.tenureApiUrl}/tenures/${id}`);
};
