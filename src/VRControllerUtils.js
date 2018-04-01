import SupportedControllers from 'SupportedControllers';

export default class VRControllerUtils {
	
	isSupported(gamepadId) {
		const supportConfig = SupportedControllers.supported,
		key = Object.keys( supportConfig ).find( ( id ) => {
			if (gamepadId.startsWith( id )) return true;
		});

		return supportConfig[ key ];
	}
}