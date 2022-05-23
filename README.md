# EWatches
Information, firmware and code for nRF52 wsmart atches running Espruino

This site is intended to supplement the good work done by many other far more creative and ingenious minds out there. Any code you find here will be to just get a watch off the ground, or piggyback off some already written software (which will be referenced), so no guarantees of completeness or even durability! I'm learning this as I go, and I get bored and move on quickly, so feel free to take what you find here and run with it.

## What is an EWatch
A term I just made up because it's short and easy to type. What I mean is an off-the-shelf smart watch (available from many sources worldwide, but my favourite source is aliexpress.com) which is capable of being reprogrammed to run [Espruino](https://espruino.com). At the time of writing, only watches that have a Nordic nRF52832 or nRF52840 are supported. They fall into two categories: updateable over-the-air (OTA) via BLE or updateable via [SWD](https://developer.arm.com/documentation/ihi0031/a/The-Serial-Wire-Debug-Port--SW-DP-/Introduction-to-the-ARM-Serial-Wire-Debug--SWD--protocol#:~:text=for%20your%20feedback-,Introduction%20to%20the%20ARM%20]Serial%20Wire%20Debug%20(SWD)%20protocol,asynchronously%2C%20for%20minimum%20pin%20count).

### OTA Update
This is a process introduced (AFAIK) by [ATC](https://github.com/atc1441). He found a way to use a watch's default firmware to ]. In order to upload a new firmware of his own choosing/making. This involves using an Android app that he wrote, as well as a sequence of firmwares to push to get the watch into the right state. He covers this process in [this video](https://www.youtube.com/watch?v=gUVEz-pxhgg). Another enthusiast worked with ATC to develop a process to install a custom version of Espruino to a watch, and other folks have developed some good step-by-step guides for how to do this (see [@fanoush's guide](https://github.com/fanoush/ds-d6/tree/master/espruino/DFU/P8), [@jeffmer's guide](https://github.com/jeffmer/WatchApps) and [@enaon's guide](https://github.com/enaon/eucWatch). In order to use the firmwares that are pre-built, you should follow Step 3 from @fanoush's guide, that is, use the SDK12 version of Espruino. 

Watches that can be updated OTA are: Pinetime, P8A, P8B, P22 (there are many variants, check @enaon's site for working versions), SN80, Kospet Magic 3, Kospet Rock (also called C16), QY03 (also called P16). 

### SWD Update
If you're comfortable with opening the hardware, it opens up more watch possibilities for you. You won't need DaFlasher, or the in-between files for changing the SDK or bootloader, as you'll be installing the entire ecosystem in one step (bootloader, soft device and app). Watches that have been ported this way include the Bebinca-79, G5 and GW32 (each is nRF52840 round face). @jeffmer has everything you need [here](https://github.com/jeffmer/WatchApps/tree/master/firmware).

### So what the heck is actually here?
I'm just curious what CAN run Espruino, so I've taken on some other watches to try out. What I have you'll find in the repo above. Each will have a blurb and appropriate files, and whether or not you need to open it up or use OTA.

I also have some Espruino tools I use to "diagnose" newly flashed watches. If you're interested in discovering what does what, you'll find routines for checking pin states, brute forcing through pins to check I2C and SPI, etc. I'm sure they can be made better, but they do the job.


