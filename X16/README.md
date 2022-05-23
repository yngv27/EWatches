# X16 / Q8S
Still not sure if these are the same exact watch, will edit when I know more. [Watch info](https://www.aliexpress.com/item/4000324805584.html?spm=a2g0o.productlist.0.0.44825f71j706In&algo_pvid=d3ade526-6ad3-48ba-995f-bb5618894f35&algo_exp_id=d3ade526-6ad3-48ba-995f-bb5618894f35-0&pdp_ext_f=%7B%22sku_id%22%3A%2212000016894416817%22%7D&pdp_npi=2%40dis%21CAD%21%2114.73%21%21%21%21%21%402101d8b516533300574983432ee863%2112000016894416817%21sea)

This is a very inexpensive P8 compatible (mostly) with some different components. The screen is not as good as a P8, and there is no hardware button. The accelerometer is a BMA421
which is supported mostly, but can be improved upon by setting up the hardware interrupt instead of polling for a "faceup" event. The touchescreen is an IT7259, same as in the
GW32, except it appears to be mounted upside down so I had to reverse Left/Right and Up/Down and the coordinates reported.

## Installation
Use the same process as a P8 (Follow @enaon's instructions [here](https://enaon.github.io/eucWatch/tools/hackme/) **up to and including step 3.** For Step 4 use [this file](https://github.com/jeffmer/WatchApps/blob/master/firmware/espruino_2v11.222_p8.zip) instead.
Once that firmware is installed, continue to use [@jeffmer's app loader](https://jeffmer.github.io/WatchApps/) to install "boot" (twice as per instructions), "main",
and "Launcher (default)".  At this point, you may see your watch say "Loading" then go dark, that's normal. Now install the files from this repo (accel.js and 
cst716-p8.js) via the [Espurino IDE](https://espruino.com/ide). You will be overwriting the P8 files with these two
which are customized for the X16. After that, your watch should respond to a wrist lift. I recommend loading jeffmer's "Multi Clock" so you have an app in the app loader. 
When the screen is on (due to wrist lift), the touch screen will respond to a long press that will open the app launcher.
