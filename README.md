
# Augmented Reality (AR) Restaurant Menu App (JSS + React Native + Viro = Sitecore AR/VR)

This is an in-progress proof-of-concept for an AR restaurant menu. The idea: Diners at a restaurant use the AR app to preview their food right in front of them, life-size and in 3D.

The app is based on my [JSS-Viro starter project](https://github.com/itsthechad/jss-viro) which is itself still rough and unfinished.

# Limitations

* This is very rough right now. This is also my first time really getting into React Native. So there's probably a lot I'm doing wrong here. So take all this with a grain of salt. ;)

* I'm using a Mac, so Mac/iOS/Xcode is all that's covered here. No Windows/Android yet.

# Prerequisites (copied from the JSS project readme)

The basic sample for React Native is based on a project created via the React Native CLI, e.g. `react-native init`

Your first step will be to follow the instructions on this page: https://facebook.github.io/react-native/docs/getting-started.html

Choose the `Building Projects with Native Code` tab, then choose your Development OS and app Target OS.

The installation process for all the necessary Android/iOS dependencies and tools can take a significant amount of time - plan accordingly.

# Getting Started

1. Ensure you have completed the Prerequisites section and have confirmed you're able to run the `AwesomeProject` sample that the instructions direct you to create.

1. In a new folder, clone or download this ar-restaurant-menu repo.

1. In `ar-restaurant-menu/app/src/`, folow the instructions to create and setup your Viro API key.

1. Navigate to `ar-restaurant-menu/app`

1. Run `npm install`

1. Make sure you have cocoapods. Type `brew install cocoapods` to install.
	* (Cocoapods is like npm for Xcode projects. The next two steps will setup more required dependencies.)

1. Navigate to `ar-restaurant-menu/app/ios`

1. Run `pod install` (installs dependencies listed in Podfile)

1. Cause an error and then fix it (This is an unfortunate step I don't know how to get around yet. The below fix is taken from [this Viro page](https://docs.viromedia.com/docs/integrating-with-react-native-projects)):

	1. In `ar-restaurant-menu/app`, run `npm run start-ios`

	1. Two Terminal windows should open, and one will ultimately result in an error regarding vlog_is_on.cc and duplicate symbols.

	1. Close Terminal

	1. Open `ar-restaurant-menu/app/node_modules/react-native/third-party/glog-0.3.4/src/vlog_is_on.cc`

	1. Change the following lines to match the highlighted bits below:

		* Line 52: GLOG_DEFINE_int32(**v2**, 0, "Show all VLOG(m) messages for m <= this."

		* Line 55: GLOG_DEFINE_string(**vmodule2**…

		* Line 133: const char* vmodule = **FLAGS_vmodule2**.c_str()

1. Go back to `ar-restaurant-menu/app`, and run `npm run start-ios` again. The build should succeed this time. Leave these tabs open in Terminal.

1. Now open `ar-restaurant-menu/app/ios/BasicSampleReactNative.xcworkspace` within Xcode.

1. Go through the Xcode signing process ([see here](https://facebook.github.io/react-native/docs/running-on-device)).

1. In Xcode, choose your device (plugged in or [setup wirelessly](https://medium.com/swiftist/wireless-debugging-xcode-b6e98e26e022)) and then run.

1. The app should run on your device.

# Setup your AR target image
The app currently triggers off a visual target, meaning no AR objects will appear until the app finds that target. Go to `ar-restaurant-menu/app/data/media/img/` and print out the `ar-marker.png` image on a standard 8.5x11 piece of paper. The image should print to a width of about 18.75cm. If it's larger or smaller, I suggest updating the target size in `ARController.js` to match the width of the image in your printout. The accuracy of this width greatly affects the stability of the AR.

# Play with the app
* When the app first starts, it directs you to find your "plate". Point the camera at the AR target image, and the first menu item should appear. If it doesn't, try moving the camera around to get the target image more in the frame or more straight on.
* Swipe left or right to view different items within the current category.
* Swipe up or down to change categories.

# Still todo:
* Adding quality 3d food models
* Tapping on an item to view details, nutritional info, etc.
* Incorporating other AR elements like animated characters on the table or an AR portal with a view into the restaurant's kitchen
* Lots of polishing - more instructions, more animations, better UI
* Perhaps remove the need for a plate/target.

# References
This project was cobbled together using the following sources and guides:
* https://github.com/itsthechad/jss-viro
* https://jss.sitecore.net/#/react-native?id=sitecore-jss-react-native
* https://github.com/Sitecore/jss/tree/master/samples/basic-sample-react-native
* https://docs.viromedia.com/docs/integrating-with-react-native-projects
* https://facebook.github.io/react-native/docs/getting-started
* https://github.com/viromedia/viro