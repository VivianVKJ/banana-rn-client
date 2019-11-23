import railsAxios from './railsAxios';

export default async ({ id, jwt }) => {
	const response = await railsAxios.get(`/donors/${id}/active`);

	return response.request.status || 'Error';
};
