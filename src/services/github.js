import { applicationConstants } from '../constants/application.constants';

export const getAllUsers = (since = 0) => {
    return fetchData(`${applicationConstants.GITHUB_API_ENDPOINT}/users?since=${since}`);
};

export const getSingleUser = (username) => {
    return fetchData(`${applicationConstants.GITHUB_API_ENDPOINT}/users/${username}`);
};

const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
};
