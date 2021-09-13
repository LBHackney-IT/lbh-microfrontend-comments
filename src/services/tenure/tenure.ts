import { AxiosSWRResponse, useAxiosSWR } from '@mtfh/common';
import { config } from '../config';
import { Tenure } from '../../types';

export const useTenure = (id: string): AxiosSWRResponse<Tenure> => {
    return useAxiosSWR<Tenure>(`${config.tenureApiUrl}/tenures/${id}`);
};
