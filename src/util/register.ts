import railsAxios from './railsAxios';
import { AsyncStorage } from 'react-native';

interface RegisterProps {
  businessName: string;
  email: string;
  password: string;
  license: string;
  street: string;
  city: string;
  state: string;
  zip: number;
  img: string;
}

export default async ({
 email, password, businessName, license, street, city, state, zip, img
}: RegisterProps) => {
	const response = await railsAxios.post('/donors/create', JSON.stringify({
      donor: {
        email,
        password,
        business_name: businessName,
        business_license: license,
        address_street: street,
        address_city: city,
        address_zip: zip,
        address_state: state,
        img
      },
    }));

  response.data
    ? await AsyncStorage.setItem('jwt', response.data.jwt)
    : await AsyncStorage.removeItem('jwt');

return response.request.status || 'Error';
};
