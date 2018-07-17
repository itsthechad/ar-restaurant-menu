
# JSS + React Native + Viro = Sitecore AR/VR

This is a very rough, in-progress attempt to integrate [Viro's AR/VR library](https://viromedia.com/) into JSS' basic-sample-react-native project. I started by forking the [JSS repo](https://github.com/Sitecore/jss) and following [Viro's instructions for integrating with an existing React Native project](https://docs.viromedia.com/docs/integrating-with-react-native-projects). Of course, it wasn't so simple, so I figured creating this starting project with that process out of the way would help myself and, possibly, others.

So that's what this is: a rough starting point for creating JSS/Viro apps.

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

1. In a new folder, clone or download this jss-viro repo.

1. Navigate to `jss-viro/basic-sample-react-native`

1. Run `npm install`

1. Make sure you have cocoapods. Type `brew install cocoapods` to install.
	* (Cocoapods is like npm for Xcode projects. The next two steps will setup more required dependencies.)

1. Navigate to `jss-viro/basic-sample-react-native/ios`

1. Run `pod install` (installs dependencies listed in Podfile)

1. Cause an error and then fix it (This is an unfortunate step I don't know how to get around yet. The below fix is taken from [this Viro page](https://docs.viromedia.com/docs/integrating-with-react-native-projects)):

	1. In `jss-viro/basic-sample-react-native`, run `npm run start-ios`

	1. Two Terminal windows should open, and one will ultimately result in an error regarding vlog_is_on.cc and duplicate symbols.

	1. Close Terminal

	1. Open `jss-viro/basic-sample-react-native/node_modules/react-native/third-party/glog-0.3.4/src/vlog_is_on.cc`

	1. Change the following lines to match the highlighted bits below:

		* Line 52: GLOG_DEFINE_int32(**v2**, 0, "Show all VLOG(m) messages for m <= this."

		* Line 55: GLOG_DEFINE_string(**vmodule2**…

		* Line 133: const char* vmodule = **FLAGS_vmodule2**.c_str()

1. Go back to `jss-viro/basic-sample-react-native`, and run `npm run start-ios` again. The build should succeed this time. Leave these tabs open in Terminal.

1. Now open `jss-viro/basic-sample-react-native/ios/BasicSampleReactNative.xcworkspace` within Xcode.

1. Go through the Xcode signing process ([see here](https://facebook.github.io/react-native/docs/running-on-device)).

1. In Xcode, choose your device (plugged in or [setup wirelessly](https://medium.com/swiftist/wireless-debugging-xcode-b6e98e26e022)) and then run.
1. The app should run on your device.

# Now What?
Try the following within data/routes/en.json
* Change "ARScene" to "VRScene". Now the app loads a VR scene instead of the default AR scene.
* Edit the position on one of the model objects.
* Remove a model object, or duplicate one with a modified position.
* Change "hideComponent" to "true" for the "BottomUI" component. This is recommended when using the VR scene.

# References
This project was cobbled together using the following sources and guides:
* https://jss.sitecore.net/#/react-native?id=sitecore-jss-react-native
* https://github.com/Sitecore/jss/tree/master/samples/basic-sample-react-native
* https://docs.viromedia.com/docs/integrating-with-react-native-projects
* https://facebook.github.io/react-native/docs/getting-started
* https://github.com/viromedia/viro