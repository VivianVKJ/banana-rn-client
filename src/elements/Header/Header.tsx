import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import Icon from '../Icon';
import styles from './Header.styles';

interface HeaderProps {
	backButtonText?: string;
	backDestination?: string;
	showBackButton?: boolean;
	showMenu?: boolean;
}

export default ({
	backButtonText = "Back",
	backDestination,
	showBackButton = true,
	showMenu = true,
}: HeaderProps) => {
	const { navigate, goBack } = useNavigation();

	return (
		<View>
			<View style={styles.contentContainer}>
				<View style={styles.backContainer}>
					{ showBackButton && (
						<TouchableOpacity
							onPress={() => backDestination ? navigate(backDestination) : goBack()}
							style={{ flexDirection: 'row', alignItems: 'center' }}
						>
							<Icon name="chevron-left" />
							<Text style={styles.backButtonLabel}>
								{backButtonText}
							</Text>
						</TouchableOpacity>
					)}
				</View>

				<View style={styles.menuContainer}>
					{ showMenu && (
							<TouchableOpacity
								onPress={() => {}}
							>
								<Icon name="menu" style={styles.menu} />
							</TouchableOpacity>
					)}
				</View>
			</View>
		</View>
	);
};
