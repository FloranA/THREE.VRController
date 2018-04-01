
//  Let’s take an ID string as reported directly from the Gamepad API,
//  translate that to a more generic “style name” and also see if we can’t map
//  some names to things for convenience. (This stuff was definitely fun to
//  figure out.) These are roughly in order of complexity, simplest first:

const _supported = {




	    //////////////////
	   //              //
	  //   Daydream   //
	 //              //
	//////////////////


	'Daydream Controller': {

		style: 'daydream',


		//  THUMBPAD
		//  Both a 2D trackpad and a button with both touch and press. 
		//  The Y-axis is “Regular”.
		//
		//              Top: Y = -1
		//                   ↑
		//    Left: X = -1 ←─┼─→ Right: X = +1
		//                   ↓
		//           Bottom: Y = +1
		
		axes: [{ name: 'thumbpad', indexes: [ 0, 1 ]}],
		buttons: [ 'thumbpad' ],
		primary: 'thumbpad'
	},

	'Gear VR Controller': {

		style: 'gearvr',


		//  THUMBPAD
		//  Both a 2D trackpad and a button with both touch and press. 
		//  The Y-axis is “Regular”.
		//
		//              Top: Y = -1
		//                   ↑
		//    Left: X = -1 ←─┼─→ Right: X = +1
		//                   ↓
		//           Bottom: Y = +1
		
		axes: [{ name: 'thumbpad', indexes: [ 0, 1 ]}],
		buttons: [ 'thumbpad' ],
		primary: 'thumbpad'
	},



	    //////////////
	   //          //
	  //   Vive   //
	 //          //
	//////////////


	'OpenVR Gamepad': {

		style: 'vive',


		//  THUMBPAD
		//  Both a 2D trackpad and a button. Its Y-axis is “Goofy” -- in
		//  contrast to Daydream, Oculus, Microsoft, etc.
		//
		//              Top: Y = +1
		//                   ↑
		//    Left: X = -1 ←─┼─→ Right: X = +1
		//                   ↓
		//           Bottom: Y = -1
		//
		//  Vive is the only goofy-footed y-axis in our support lineup so to
		//  make life easier on you WE WILL INVERT ITS AXIS in the code above.
		//  This way YOU don’t have to worry about it. 

		axes: [{ name: 'thumbpad', indexes: [ 0, 1 ]}],
		buttons: [


			//  THUMBPAD
			//  --------------------------------------------------------------
			//  value:     Binary 0 or 1, duplicates isPressed.
			//  isTouched: YES has real touch detection.
			//  isPressed: As expected.

			'thumbpad',


			//  TRIGGER
			//  Has very interesting and distinct behavior on Chromium.
			//  The threshold for releasing a pressed state is higher during
			//  engagement and lower during release.
			//
			//  Chromium
			//  if( value >  0.00 ) isTouched = true else isTouched = false
			//  if( value >= 0.55 ) isPressed = true   UPON ENGAGING
			//  if( value <  0.45 ) isPressed = false  UPON RELEASING
			//
			//  Firefox
			//  if( value >= 0.10 ) isTouched = isPressed = true
			//  if( value <  0.10 ) isTouched = isPressed = false
			//  --------------------------------------------------------------
			//  value:     Analog 0 to 1.
			//  isTouched: Duplicates isPressed in FF, independent in Chrome.
			//  isPressed: Corresponds to value.

			'trigger',


			//  GRIP
			//  Each Vive controller has two grip buttons, one on the left and
			//  one on the right. They are not distinguishable -- pressing 
			//  either one will register as a press with no knowledge of which
			//  one was pressed.
			//  --------------------------------------------------------------
			//  value:     Binary 0 or 1, duplicates isPressed.
			//  isTouched: Duplicates isPressed.
			//  isPressed: As expected.

			'grip',


			//  MENU
			//  The menu button is the tiny button above the thumbpad -- NOT
			//  the one below it.
			//  --------------------------------------------------------------
			//  value:     Binary 0 or 1, duplicates isPressed.
			//  isTouched: Duplicates isPressed.
			//  isPressed: As expected.

			'menu'
		],
		primary: 'trigger'
	},




	    ////////////////
	   //            //
	  //   Oculus   //
	 //            //
	////////////////


	'Oculus Touch (Right)': {


		//  Previously I’d named the style “Rift” and referred to this as a 
		// “Rift” in the comments because it’s so much easier to write and to 
		//  say than “Oculus”. Lazy, right? But deep down in your dark heart 
		//  I know you agree with me. I’ve changed it all to “oculus” now 
		//  because that’s what both the headset and the controllers report 
		//  themselves as. There’s no mention of “Rift” in those ID strings at
		//  all. I felt in the end consistency was better than ease.

		style: 'oculus',


		//  THUMBSTICK
		//  Oculus’s thumbstick has axes values and is also a button.
		//  The Y-axis is “Regular”.
		//
		//              Top: Y = -1
		//                   ↑
		//    Left: X = -1 ←─┼─→ Right: X = +1
		//                   ↓
		//           Bottom: Y = +1

		axes: [{ name: 'thumbstick', indexes: [ 0, 1 ]}],
		buttons: [


			//  THUMBSTICK
			//  --------------------------------------------------------------
			//  value:     Binary 0 or 1, duplicates isPressed.
			//  isTouched: YES has real touch detection.
			//  isPressed: As expected.

			'thumbstick',


			//  TRIGGER
			//  Oculus’s trigger in Chromium is far more fire-happy than 
			//  Vive’s. Compare these thresholds to Vive’s trigger. 
			//
			//  Chromium
			//  if( value >  0.0 ) isTouched = true else isTouched = false
			//  if( value >= 0.1 ) isPressed = true else isPressed = false
			//
			//  Firefox
			//  if( value >= 0.1 ) isTouched = isPressed = true
			//  if( value <  0.1 ) isTouched = isPressed = false
			//  --------------------------------------------------------------
			//  value:     Analog 0 to 1.
			//  isTouched: Duplicates isPressed in FF, independent in Chrome.
			//  isPressed: Corresponds to value.

			'trigger',


			//  GRIP
			//  Oculus’s grip button follows the exact same press thresholds
			//  as its trigger.

			'grip',


			//  A B X Y
			//  Oculus has two old-school video game buttons, A and B. (On the
			//  left-hand controller these are X and Y.)
			//  --------------------------------------------------------------
			//  value:     Binary 0 or 1, duplicates isPressed.
			//  isTouched: YES has real touch detection.
			//  isPressed: As expected.

			'A', 'B',


			//  THUMBREST
			//  Oculus has an inert base “button” that’s really just a resting
			//  place for your thumb. It does NOT report press.
			//  --------------------------------------------------------------
			//  value:     Always 0.
			//  isTouched: YES has real touch detection.
			//  isPressed: N/A.

			'thumbrest'
		],
		primary: 'trigger'
	},
	'Oculus Touch (Left)': {

		style: 'oculus',
		axes: [{ name: 'thumbstick', indexes: [ 0, 1 ]}],
		buttons: [

			'thumbstick',
			'trigger',
			'grip',
			'X', 'Y',
			'thumbrest'
		],
		primary: 'trigger'
	},




	    ///////////////////
	   //               //
	  //   Microsoft   //
	 //               //
	///////////////////


	//  This is the first Gamepad ID setup we’ve come across that forced us
	//  to loop through the supported object’s keys and compare values using
	//  startsWith(), instead of just accessing directly like so:
	//  supported = THREE.VRController.supported[ gamepad.id ].
	//  You can read all the details about the unqiue identifier suffix here:
	//  https://github.com/stewdio/THREE.VRController/issues/8

	'Spatial Controller (Spatial Interaction Source)': {


		//  It’s hard to know what to call these controllers. They report as
		// “Spatial Controllers” but are branded as “Motion Controllers”
		//  and they’re for “Windows Mixed Reality” devices... 
		// “Microsoft Windows Mixed Reality Spatial Motion Controller”?
		//  Their team prefers “Windows motion controllers”. But for our style
		//  property string we want pith -- a single short word that makes it
		//  easy to distinguish from Oculus, Vive, etc. So we’ll go with 
		// “microsoft” as in “this is a controller in the style of Microsoft”.
		//
		//  NOTE: Currently Windows Mixed Reality devices only function in 
		//  Microsoft Edge on latest builds of Windows 10.

		style: 'microsoft',
		axes: [


			//  THUMBSTICK
			//  The thumbstick is super twitchy, seems to fire quite a bit on
			//  its own. Its Y-axis is “Regular”.
			//
			//              Top: Y = -1
			//                   ↑
			//    Left: X = -1 ←─┼─→ Right: X = +1
			//                   ↓
			//           Bottom: Y = +1

			{ name: 'thumbstick', indexes: [ 0, 1 ]},


			//  THUMBPAD
			//  Operates exactly the same as the thumbstick but without the
			//  extra twitchiness.

			{ name: 'thumbpad',   indexes: [ 2, 3 ]}
		],
		buttons: [


			//  THUMBSTICK
			//  --------------------------------------------------------------
			//  value:     Binary 0 or 1, duplicates isPressed.
			//  isTouched: Duplicates isPressed.
			//  isPressed: As expected.

			'thumbstick',


			//  TRIGGER
			//  Its physical range of motion noticably exceeds the range of
			//  values reported. For example when engaging you can continue
			//  to squueze beyond when the value reports 1. And when 
			//  releasing you will reach value === 0 before the trigger is 
			//  completely released. The value property dictates touch and
			//  press states as follows:
			//
			//  Upon engaging
			//  if( value >= 0.00 && value < 0.10 ) NO VALUES REPORTED AT ALL!
			//  if( value >= 0.10 ) isTouched = true
			//  if( value >= 0.12 ) isPressed = true
			//
			//  Upon releasing
			//  if( value <  0.12 ) isPressed = false
			//  if( value == 0.00 ) isTouched = false
			//  --------------------------------------------------------------
			//  value:     Analog 0 to 1.
			//  isTouched: Simulated, corresponds to value.
			//  isPressed: Corresponds to value.

			'trigger',


			//  GRIP
			//  --------------------------------------------------------------
			//  value:     Binary 0 or 1, duplicates isPressed.
			//  isTouched: Duplicates isPressed.
			//  isPressed: As expected.

			'grip',


			//  MENU
			//  --------------------------------------------------------------
			//  value:     Binary 0 or 1, duplicates isPressed.
			//  isTouched: Duplicates isPressed.
			//  isPressed: As expected.

			'menu',


			//  THUMBPAD
			//  This is the only button that has actual touch detection.
			//  --------------------------------------------------------------
			//  value:     Binary 0 or 1, duplicates isPressed.
			//  isTouched: YES has real touch detection.
			//  isPressed: As expected.

			'thumbpad'
		],
		primary: 'trigger'
	}
};

export default class SupportedControllers {

	static get supported() {
		return _supported;
	}
}

