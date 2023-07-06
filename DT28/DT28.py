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
 'name' : "DT28 smartwatch",
# 'link' :  [ "https://www.nordicsemi.com/eng/Products/Bluetooth-low-energy/nRF52-DK" ],
# 'espruino_page_link' : 'nRF52832DK',
 'boardname' : 'DT28', # visible in process.env.BOARD
  # This is the PCA10036
 'default_console' : "EV_BLUETOOTH",
# 'default_console' : "EV_SERIAL1",
# 'default_console_tx' : "D6",
# 'default_console_rx' : "D8",
# 'default_console_baudrate' : "38400",
 'variables' : 2565, # SD5.0 0x200014B8 SD 3.0 0x200019C0  How many variables are allocated for Espruino to use. RAM will be overflowed if this number is too high and code won't compile.
 'bootloader' : 1,
 'binary_name' : 'e_%v_dt28.hex',
 'build' : {
   'optimizeflags' : '-Os',
   'libraries' : [
     'BLUETOOTH',
#     'NET',
     'GRAPHICS',
#     'NFC',
#     'NEOPIXEL'
   ],
   'makefile' : [
#    'SAVE_ON_FLASH=1',
     'DEFINES+=-DCONFIG_GPIO_AS_PINRESET', # Allow the display MOSI pin to work
     'DEFINES += -DCONFIG_NFCT_PINS_AS_GPIOS', 
     'DEFINES+=-DNRF_BLE_GATT_MAX_MTU_SIZE=53 -DNRF_BLE_MAX_MTU_SIZE=53', # increase MTU from default of 23
     'DEFINES+=-DUSE_FONT_6X8 -DGRAPHICS_PALETTED_IMAGES -DGRAPHICS_ANTIALIAS',
     'DEFINES+=-DBLE_HIDS_ENABLED=1 -DBLUETOOTH_NAME_PREFIX=\'"DT28"\'',
     'USE_LCD_SPI_UNBUF=1',
     'DEFINES += -DSPIFLASH_SHARED_SPI -DSPI0_USE_EASY_DMA=1', 
     'DEFINES+= -DSPISENDMANY_BUFFER_SIZE=120',
     #'DEFINES += -DESPR_DCDC_ENABLE=1', # Use DC/DC converter
     #'ESPR_BLUETOOTH_ANCS=1', # Enable ANCS (Apple notifications) support
     'DFU_PRIVATE_KEY=targets/nrf5x_dfu/dfu_private_key.pem',
     'NRF_BL_DFU_INSECURE=1',
     'DFU_SETTINGS=--application-version 0xff --hw-version 52 --sd-req 0x8C,0x91',
     'INCLUDE += -I$(ROOT)/libs/misc',
     #'WRAPPERSOURCES += libs/misc/jswrap_stepcount.c',
     #'SOURCES += libs/misc/stepcount.c'
   ]
 }
};


save_code_pages = 20; 
chip = {
  'part' : "NRF52832",
  'family' : "NRF52",
  'package' : "QFN48",
  'ram' : 64,
  'flash' : 512,
  'speed' : 64,
  'usart' : 1,
  'spi' : 1,
  'i2c' : 1,
  'adc' : 1,
  'dac' : 0,
  'saved_code' : {
	  'page_size' : 4096,
	  #'address' : ((118 - save_code_pages) * 4096), # Bootloader at 0xF8000
	  #'pages' : save_code_pages,
	  'flash_available' : 512 - ((35 + 8 + 2)*4), # Softdevice 5.0  uses 35 pages of flash, bootloader 8, FS 2. Each page is 4 kb.  
	  'address' : 0x60000000, # put this in external spiflash (see below)
	  'pages' : 2048, # 8MB of the 16MB external flash
   },
};


devices = {
 'BTN1' : { 'pin' : 'D29',  'pinstate' : 'IN_PULLDOWN'},
 'BTN2' : { 'pin' : 'D30',  'pinstate' : 'IN_PULLDOWN'},

  #'VIBRATE' : { 'pin' : 'D22' }, # Pin negated in software
  'LCD' : {
            'width' : 240, 'height' : 240, 'bpp' : 16, # 16 normal 
            'controller' : 'ST7789',
            'pin_dc' : 'D26',
            'pin_cs' : 'D12',
            'pin_rst' : 'D27',
            'pin_sck' : 'D9',
            'pin_mosi' : 'D8',
            #'pin_en' : 'D13',
            'pin_bl' : 'D16', 
            'bitrate' : 8000000
          },

  'SPIFLASH' : {
            'pin_sck' : 'D9',
            'pin_mosi' : 'D8',
            'pin_miso' : 'D7',
            'pin_cs' : 'D6',
            'size' : 8192*1024, # 16MB
            'memmap_base' : 0x60000000 # map into the address space (in software)
  }
};

# left-right, or top-bottom order
board = {
  'left' : [ 'VDD', 'VDD', 'RESET', 'VDD','5V','GND','GND','','','D3','D4','D28','D29','D30','D31'],
  'right' : [
     'D27', 'D26', 'D2', 'GND', 'D25','D24','D23', 'D22','D20','D19','',
     'D18','D17','D16','D15','D14','D13','D12','D11','',
     'D10','D9','D8','D7','D6','D5','D21','D1','D0'],
  '_notes' : {
    'D6' : "Serial console RX",
    'D8' : "Serial console TX"
  }
};
board["_css"] = """
#board {
  width: 528px;
  height: 800px;
  top: 0px;
  left : 200px;
  background-image: url(img/NRF52832DK.jpg);
}
#boardcontainer {
  height: 900px;
}
#left {
    top: 219px;
    right: 466px;
}
#right {
    top: 150px;
    left: 466px;
}
.leftpin { height: 17px; }
.rightpin { height: 17px; }
""";

def get_pins():
  pins = pinutils.generate_pins(0,31) # 32 General Purpose I/O Pins.
#  pinutils.findpin(pins, "PD0", True)["functions"]["XL1"]=0;
#  pinutils.findpin(pins, "PD1", True)["functions"]["XL2"]=0;
#  pinutils.findpin(pins, "PD5", True)["functions"]["RTS"]=0;
#  pinutils.findpin(pins, "PD6", True)["functions"]["TXD"]=0;
#  pinutils.findpin(pins, "PD7", True)["functions"]["CTS"]=0;
#  pinutils.findpin(pins, "PD8", True)["functions"]["RXD"]=0;
#  pinutils.findpin(pins, "PD9", True)["functions"]["NFC1"]=0;
#  pinutils.findpin(pins, "PD10", True)["functions"]["NFC2"]=0;
  pinutils.findpin(pins, "PD2", True)["functions"]["ADC1_IN0"]=0;
  pinutils.findpin(pins, "PD3", True)["functions"]["ADC1_IN1"]=0;
  pinutils.findpin(pins, "PD4", True)["functions"]["ADC1_IN2"]=0;
  pinutils.findpin(pins, "PD5", True)["functions"]["ADC1_IN3"]=0;
  pinutils.findpin(pins, "PD28", True)["functions"]["ADC1_IN4"]=0;
  pinutils.findpin(pins, "PD29", True)["functions"]["ADC1_IN5"]=0;
  pinutils.findpin(pins, "PD30", True)["functions"]["ADC1_IN6"]=0;
  pinutils.findpin(pins, "PD31", True)["functions"]["ADC1_IN7"]=0;
  # Make buttons and LEDs negated
  pinutils.findpin(pins, "PD29", True)["functions"]["NEGATED"]=0;
  pinutils.findpin(pins, "PD30", True)["functions"]["NEGATED"]=0;

  # everything is non-5v tolerant
  for pin in pins:
    pin["functions"]["3.3"]=0;
  #The boot/reset button will function as a reset button in normal operation. Pin reset on PD21 needs to be enabled on the nRF52832 device for this to work.
  return pins
