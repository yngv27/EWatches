#!/bin/false
# This file is part of Espruino, a JavaScript interpreter for Microcontrollers
#
# Copyright (C) 2013 Gordon Williams <gw@pur3.co.uk>
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
#
# ----------------------------------------------------------------------------------------
# This file contains information for a specific board - the available pins, and where LEDs,
# Buttons, and other in-built peripherals are. It is used to build documentation as well
# as various source and header files for Espruino.
# ----------------------------------------------------------------------------------------

import pinutils;

info = {
 'name' : "TK78G Smarty Pants Watch",
 'link' :  [ "https://www.nordicsemi.com/eng/Products/Bluetooth-low-energy/nRF52-DK" ],
 'espruino_page_link' : 'nRF52840DK',
 'default_console' : "EV_BLUETOOTH",
 #'default_console_tx' : "D6",
 #'default_console_rx' : "D8",
 #'default_console_baudrate' : "9600",
 'variables' : 14000, # How many variables are allocated for Espruino to use. RAM will be overflowed if this number is too high and code won't compile.
 'bootloader' : 1,
 'binary_name' : 'espruino_%v_tk78g.hex',
 'build' : {
   'optimizeflags' : '-Os',
   'libraries' : [
     'BLUETOOTH',
     #'NET',
     'GRAPHICS',
#     'NFC',
     #'NEOPIXEL'
   ],
   'makefile' : [
     'DEFINES += -DNRF_SDH_BLE_GATT_MAX_MTU_SIZE=131', # 23+x*27 rule as per https://devzone.nordicsemi.com/f/nordic-q-a/44825/ios-mtu-size-why-only-185-bytes
     'DEFINES += -DBLUETOOTH_NAME_PREFIX=\'"TK78G"\'',
     #'DEFINES += -DCONFIG_GPIO_AS_PINRESET', # Allow the reset pin to work
     'DEFINES += -DCONFIG_NFCT_PINS_AS_GPIOS', 
     'DEFINES+= -DSPISENDMANY_BUFFER_SIZE=120',
     'USE_LCD_SPI_UNBUF=1',
     #'DEFINES += -DNRF_USB=1 -DUSB',
     'DFU_SETTINGS=--application-version 0xff --hw-version 52 --sd-req 0xa9,0xae,0xb6',
     'DFU_PRIVATE_KEY=targets/nrf5x_dfu/dfu_private_key.pem',
     'BOOTLOADER_SETTINGS_FAMILY=NRF52840',
     'DEFINES += -DNO_DUMP_HARDWARE_INITIALISATION',
     'DEFINES += -DNRF_BL_DFU_INSECURE=1 -DNRF_BOOTLOADER_NO_WRITE_PROTECT=1',  #  -DESPR_DCDC_ENABLE=1',
     'DEFINES += -DUSE_FONT_6X8 -DGRAPHICS_PALETTED_IMAGES -DGRAPHICS_ANTIALIAS',
     'DEFINES += -DFDS_VIRTUAL_PAGES=2', #should match fstorage_pages below
     'NRF_SDK15=1'
   ]
 }
};


save_code_pages = 145;
fstorage_pages = 2; # typically 2, 10 reduces risk of brick on first flash from stock FW
chip = {
  'part' : "NRF52840",
  'family' : "NRF52",
  'package' : "QFN48",
  'ram' : 256,
  'flash' : 1024,
  'speed' : 64,
  'usart' : 1,
  'spi' : 1,
  'i2c' : 1,
  'adc' : 1,
  'dac' : 0,
  'saved_code' : {
    'address' : ((0xf8 - fstorage_pages - save_code_pages) * 4096), # Bootloader at 0xF8000
    'page_size' : 4096,
    'pages' : save_code_pages,
    'flash_available' : 1024 - ((0x26 + (0x100-0xf8) + fstorage_pages + save_code_pages)*4), # Softdevice uses 38 pages of flash (0x26000/0x100), bootloader 0x100-0xe0=0x20, FS 2, code 96. Each page is 4 kb.
  },
};

devices = {
  'BTN1' : { 'pin' : 'D46', 'inverted' : True }, #, 'pinstate' : 'IN_PULLDOWN' }, # Pin negated in software
  'BTN2' : { 'pin' : 'D24', 'inverted' : True }, #, 'pinstate' : 'IN_PULLDOWN' }, # Pin negated in software
};

# left-right, or top-bottom order
board = {
};

def get_pins():
  pins = pinutils.generate_pins(0,47) # 48 General Purpose I/O Pins.
  pinutils.findpin(pins, "PD0", True)["functions"]["XL1"]=0;
  pinutils.findpin(pins, "PD1", True)["functions"]["XL2"]=0;
  #pinutils.findpin(pins, "PD5", True)["functions"]["RTS"]=0;
  #pinutils.findpin(pins, "PD6", True)["functions"]["TXD"]=0;
  #pinutils.findpin(pins, "PD7", True)["functions"]["CTS"]=0;
  #pinutils.findpin(pins, "PD8", True)["functions"]["RXD"]=0;
  pinutils.findpin(pins, "PD9", True)["functions"]["NFC1"]=0;
  pinutils.findpin(pins, "PD10", True)["functions"]["NFC2"]=0;
  pinutils.findpin(pins, "PD2", True)["functions"]["ADC1_IN0"]=0;
  pinutils.findpin(pins, "PD3", True)["functions"]["ADC1_IN1"]=0;
  pinutils.findpin(pins, "PD4", True)["functions"]["ADC1_IN2"]=0;
  pinutils.findpin(pins, "PD5", True)["functions"]["ADC1_IN3"]=0;
  pinutils.findpin(pins, "PD28", True)["functions"]["ADC1_IN4"]=0;
  pinutils.findpin(pins, "PD29", True)["functions"]["ADC1_IN5"]=0;
  pinutils.findpin(pins, "PD30", True)["functions"]["ADC1_IN6"]=0;
  pinutils.findpin(pins, "PD31", True)["functions"]["ADC1_IN7"]=0;
  # Make buttons and LEDs negated
  pinutils.findpin(pins, "PD24", True)["functions"]["NEGATED"]=0;
  pinutils.findpin(pins, "PD46", True)["functions"]["NEGATED"]=0;

  # everything is non-5v tolerant
  for pin in pins:
    pin["functions"]["3.3"]=0;
  #The boot/reset button will function as a reset button in normal operation. Pin reset on PD21 needs to be enabled on the nRF52832 device for this to work.
  return pins
