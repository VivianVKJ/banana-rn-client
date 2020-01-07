import React, { Component, useState } from 'react';
import { View, Text, TextInput, Alert, CameraRoll } from 'react-native';
import register from '../../util/register';
import * as colors from '../../util/colors';
import { Title, LinkButton, FormTextInput, SpacerInline, Header } from '../../elements';
import styles from './RegistrationScreen.styles';
import { useNavigation } from 'react-navigation-hooks';
import InputLabel from '../../elements/FormTextInput/InputLabel';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default () => {
  const { navigate } = useNavigation();
  const [ businessName, setBusinessName] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ license, setLicense ] = useState('');
	const [ street, setStreet ] = useState('');
	const [ city, setCity ] = useState('');
	const [ state, setState ] = useState('WA');
	const [ zip, setZip ] = useState();
	 const [ img, setImg ] = useState('');

  const validateInputs = async () => {
		if (!email.includes('@') || !email.includes('.')) { Alert.alert('Please enter a valid email address.'); return; }
    if (password.length < 8) { Alert.alert('Please enter a password at least 8 characters long.'); return; }
    if (businessName === "") { Alert.alert("Please add your business's name."); return; }
		if (license.length !== 9) { Alert.alert('Please enter your 9-digit UBI with no spaces or dashes.'); return; }
		if (!street || street.split(' ').length < 3) { Alert.alert('Please enter your street number and name.'); return; }
		if (!city) { Alert.alert('Please enter your city.'); return; }
		if (zip.toString().length !== 5) { Alert.alert('Please enter your 5-digit zip code.'); return; }

    const response = await register({
			businessName, email, password, license, street, city, state, zip, img,
		});
    switch (response) {
			case (201 || 202): Alert.alert('Registration complete! Please log in to continue.'); return navigate('LoginScreen', { email, password });
			case 406: Alert.alert('Error: not accepted'); return;
			case 500: Alert.alert('Internal server error, please try again later.'); return;
			default: Alert.alert("Sorry, that didn't work, please try again later."); console.log(response); return;
    }
  };

    const _pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('No camera roll permissions');
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1
    });
    setImg(result.uri);
  };
 


  return (
    <View style={styles.outerContainer}>
      <View>
        <Header showMenu={false} />
        <Title text="Registration." />
        <SpacerInline height={10} />
        <Text style={styles.text}>
          Please complete the form. You can update them once your account is
          approved.
        </Text>
        <SpacerInline height={20} />

        <FormTextInput
          text="Email"
          value={email}
          setValue={setEmail}
        />

        <FormTextInput
          text="Password"
          value={password}
          setValue={setPassword}
        />

        <FormTextInput
          text="Business Name"
          value={businessName}
          setValue={setBusinessName}
        />
    <View>
        <InputLabel text={"Business License Verification"}  />
       <View>   
          <View style={{ width: 8 }} />
          <View style={{ width:'100%', top: 5 }}></View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 8 }}>
              <TextInput 
                value={img}
                style={{ ...styles.input,backgroundColor: 'white'}}
                autoCapitalize='none'
              />  
            </View>
            <View style={{ flex: 2 }}>
            <View style={{height: 28,marginBottom: 15,backgroundColor: '#E3E3E3',alignItems: 'center',}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'open-sans-bold',
                      fontSize: 18,
                      color: colors.NAVY_BLUE,
                    }}
                    onPress={() => _pickImage()}
                    // select img from camera roll, set imageUrl, upload when click 'Register'
                  >
                  {".. IMG".toUpperCase()}
                  
                  </Text>
		          </View>
            </View>
          </View>            
      </View>
    </View>
        <FormTextInput
          text="Business License Number"
          value={license}
          setValue={setLicense}
          
        />

        <FormTextInput
          text="Business Address"
          value={street}
          setValue={setStreet}
          autoCapitalize="words"
        />

    <View style={{ flexDirection: 'row' }}>
        <FormTextInput
          text="City"
          value={city}
          setValue={setCity}
          width='40%'
          autoCapitalize="words"
        />
        <SpacerInline width={'5%'} />
        <FormTextInput
          text="State"
          value={state}
          setValue={() => {}}
          width='15%'
          autoCapitalize="words"
        />
        <SpacerInline width={'5%'} />
        <FormTextInput
          text="Zip"
          value={zip}
          setValue={setZip}
          width='35%'
          autoCapitalize="words"
        />
      </View>
      <SpacerInline height={10} />  
    </View>

      <View>
        <LinkButton 
          text="Register" 
          onPress={validateInputs} />
        <SpacerInline height={120} />
      </View>
    </View>
  );
};
