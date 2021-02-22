import { localDeployment } from '../App';

export const baseURL = localDeployment ?
    'http://localhost:9002/msc/ais/soleerp/api/' :
    'https://erp.msc-ais.site/msc/ais/soleerp/api/';

export const getFirstLetters = string => {
    return string
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join(' ');
};

export const mapRole = role => {
    switch (role) {
        case 'CUSTOMER': return 'Πελάτης';
        case 'SUPPLIER': return 'Προμηθευτής';
        default: return 'Πελάτης & Προμήθευτής';
    }
};

export const a11yProps = index => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
};