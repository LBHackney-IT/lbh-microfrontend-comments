import { useAxiosSWR } from '@mtfh/common';
import { config } from '../config';
import { Person, Tenure } from '../../types';

export const useEntity = (id: string, type: string): any => {
    let response;
    switch (type) {
        case 'tenure':
            response = useAxiosSWR<Tenure>(
                `${config.tenureApiUrl}/tenures/${id}`
            );
            break;
        case 'person':
            response = useAxiosSWR<Person>(
                `${config.personApiUrl}/persons/${id}`
            );
            break;
    }

    return response;
};
