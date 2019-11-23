import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    TextInput
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import styles from './QRCodeScreen.styles';

const defaultQRString = 'Food Donation';

export default class QRCodeScreen extends Component {
	state = {
	  text: defaultQRString,
	};
   
	render() {
		var qrString = this.state.text;
		if (qrString == '') {
			qrString = defaultQRString;
		}

		return (
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					onChangeText={(text) => this.setState({text: text})}
					value={this.state.text}
				/>
				<QRCode
					value={qrString}
					size={200}
				/>
			</View>
		);
	};
}

AppRegistry.registerComponent('QRCodeScreen', () => QRCodeScreen);
 
module.exports = QRCodeScreen;