
str = `
Thank you for the opportunity to present
myself on sceen for all to see. It may not 
be helpful OR purple, but 3,255 yen can't
be overcome by physical means. $$$!
`;
str=str.toUpperCase();
g.setBgColor("#202020").clear();
g.setColor("#f0f0f0");

//module="FontHaxorNarrow7x17";
let module="FontDylex7x13";
require("FontDylex7x13").add(Graphics);
g.setFont("Dylex7x13");
g.setFontAlign(-1,-1);
g.drawString(str, 0,0);
/*
g.setFontCustom(atob("AAAAAAAAAAAAAAAAAAAAAAAD/mAAAAAAADAAAAAAMAAAAAAAAAASAAEgAP/AASAA/8ABIAASAAAAAAAADggBEEAgggf/8CCCAQRACDgAAAAAAAAAAAwGASGADGAAGMAGEgGAwAAAAAAAADgBzEAjAgI4IBxkAAGAAGYAAAAAAACAADAAAAAAAAAAfwA4DgQAEAAAAAAAQAEDgOAH8AAAAAAAAAQAAkgAFQAA4AAVAAJIAAQAAAAAAAAAQAAEAABAAD+AAEAABAAAQAAAAAAAAAAQAAYAAAAAAAAAAABAAAQAAEAABAAAQAAEAABAAAAAAAAAAGAAAAAAAAAGAAGAAGAAGAAGAAGAAAAAAAAAD/gBAkAgQgIIICECASBAD/gAAAAAAABAAAgAAQAAP/4AAAAAAADAYBAKAgEgICICBCAQggDwIAAAAAAACAgBAEAgggIIICCCARRADjgAAAAAAAADgADIADCADAgDAIAA/gAAgAAAAAAAPwgCEEAhAgIQICECAghAIHgAAAAAAAA/gAyEARAgIQICECAghAAHgAAAAAAAIAACAAAgAAIA4CBwAjgAPAAAAAAAAADjgBFEAgggIIICCCARRADjgAAAAAAADwABCCAgQgIEICBEAQmAD+AAAAAAAAAwYAAAAAAAAAEAMGAAAAAAAABAAAoAARAAIIAEBAAAAAAAABEAARAAEQABEAARAAEQABEAAAAAAAAEBAAggAEQAAoAAEAAAAAAAADAABAAAgAAIHYCCAARAADgAAAAAAAAB/gAgEAR4gEhIBISAJIgB/QAAAAAAAAB4AHwAOEAMBAA4QAB8AAB4AAAAAAAP/4CECAhAgIQICECAShADHgAAAAAAAD/gBAEAgAgIAICACAQBACAgAAAAAAAP/4CACAgAgIAICACAQBAD/gAAAAAAAP/4CCCAgggIIICCCAgAgIAIAAAAAAAP/4CCAAggAIIACCAAgAAIAAAAAAAAAD/gBAEAgAgIAICBCAQRACH4AAAAAAAP/4ACAAAgAAIAACAAAgAP/4AAAAAAAIAID/+AgAgAAAAAAAACAAAQAACAAAgAAIAAEA/+AAAAAAAA//gAIAAFAACIABBAAgIAwBgAAAAAAA//gAAIAACAAAgAAIAACAAAgAAAAAAA//gDAAAMAAAwAAwAAwAA//gAAAAAAA//gDAAAMAAAwAADAAAMA//gAAAAAAAP+AEAQCACAgAgIAIBAEAP+AAAAAAAA//gIEACBAAgQAIEABCAAPAAAAAAAAAP+AEAQCACAgAgIAoBAEAP+gAAAAAAA//gIEACBAAgQAIGABCYAPBgAAAAAAAOCAEQQCCCAgggIIIBBEAIOAAAAAAAAgAAIAACAAA//gIAACAAAgAAAAAAAAA/+AAAQAACAAAgAAIAAEA/+AAAAAAAA8AAA8AAA4AABgADgAPAA8AAAAAAAAA+AAAeAAAeAB4APgAAHgAAHgAeAD4AAAAAAAADAGAMGAA2AACAADYADBgDAGAAAAAAADAAAMAAAwAAD+ADAADAADAAAAAAAAACAeAgIgIEICCCAhAgIgIDwCAAAAAAAH//BAAQQAEAAAAAAAMAAAwAADAAAMAAAwAADAAAAAAABAAQQAEH//AAAAAAAAQAAIAAEAACAAAQAACAAAQAAAAAAAAAACAAAgAAIAACAAAgAAIAACAAAAAAADAAAIAAAAAAAAAAGAASQAJCACQgAkIAJEAB/gAAAAAAA//gAQQAICACAgAgIAEEAA+AAAAAAAAA+AAQQAICACAgAgIAICABBAAAAAAAAA+AAQQAICACAgAgIAEEA//gAAAAAAAA+AASQAIiACIgAiIAEiAA5AAAAAAAACAAAgAB/+AiAAIgACAAAAAAAAAAD4QBBCAgIgICICAiAQRAP/gAAAAAAD/+ABAAAgAAIAACAAAQAAD+AAAAAAAAIAAb/gAAAAAAAAAIAABAAAQb/4AAAAAAA//gACAAAgAAUAAIgAEEACAgAAAAAAAgAAP/wAACAAAgAAAAAAAD/gAgAAIAAB/gAgAAIAAB/gAAAAAAAD/gAQAAIAACAAAgAAEAAA/gAAAAAAAA+AAQQAICACAgAgIAEEAA+AAAAAAAAD/8AQQAICACAgAgIAEEAA+AAAAAAAAA+AAQQAICACAgAgIAEEAD/8AAAAAAAD/gAIAAEAACAAAgAAIAABAAAAAAAAABxAAiIAIiACIgAiIAIiABHAAAAAAAACAAAgAA/8ACAgAgIAACAAAAAAAAP4AABAAAIAACAAAgAAQAP+AAAAAAAAOAAAYAABgAAGAAGAAGAAOAAAAAAAAAPwAADgADAAHAAAMAAA4APwAAAAAAAAMGAAiAAFAAAgAAUAAIgAMGAAAAAAAAOAQAYEABmAAGAAGAAGAAOAAAAAAAAAIGACCgAhIAIiACQgAoIAMCAAAAAAAACAA/fgQAEAAAAAAAAAAD/+AAAAAAAAAABAAQP34ACAAAAAAAAAgAAQAAEAAAgAAEAABAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="), 32, atob("BgMFCQkJCQQFBQkJBAkDCQoGCQkJCQkJCQkDBAcJBwkJCQkJCQkJCQkFCQkJCQkJCQkJCQkJCQkJCQkFCAUJCQQJCQkJCQgJCQQGCQYJCQkJCQkJCAkJCQkJCQUFBQk="), 256 + 20);
g.drawString(str, 0, 100);
*/

Graphics.prototype.setFontBlocky=function(scale){this.setFontCustom(atob("AAAAAAAD+QfyAAAAADgAcAAAAcADgAAAACACeAfwfwDzwD+D+AeQAQAAABwQZCH/4RCCHwAcAAAOAD4ARCD4wOcAGADABzgY+CEQA+ADgAAB3gf+CIQRiD+wOeABgAeACQAADQAcAAAAP8D/wwDEAIAAEAIwDD/wP8AAANgA4AfwA4ANgAAAAgAEAD4AfAAgAEAAAAAAAGgA4AAAEAAgAEAAgAAAAGAAwAAAAAADAB4B8A+AeADAAAAB/gf+CAQQCCAQf+B/gAACAAf+D/wAAAAAA8CPwRCCIQRCD4QOAAAAQCCIQRCCIQf+B3gAAAMADgA0AMgD/wf+AEAAAD4AfCCIQRCCIQR+AHgAAB/gf+CIQRCCIQR+AHgAACAAQACBwQ+CeAfADgAAAB3gf+CIQRCCIQf+B3gAAB4AfiCEQQiCEQf+B/gAAAxgGMAAAGNAxwAAAEABwAbAGMAggAAASACQASACQASAAAAggGMAbABwAEAAABAAYACGQRyD4AOAAAAH4B/gYGGeQn6EhQn6EeQwaDDAPwAAAP+D/wQQCCAQQD/wP+AAAf+D/wRCCIQRCD/wO8AAAP8D/wQCCAQQCDAwIEAAAf+D/wQCCAQQCD/wP8AAAf+D/wRCCIQRCAAAf+D/wRACIARAAAAP8D/wQCCAQQiDHwI+AAAf+D/wBAAIABAD/wf+AAAf+D/wAAAAgAGAAQACAAQf+D/gAAD/wf+AeAGYBhgYGCAQAAD/wf+AAQACAAQACAAAf+D/wGAAcADgAwAf+D/wAAD/wf+BgAGAAYAf+D/wAAB/gf+CAQQCCAQf+B/gAAD/wf+CIARACIAfABwAAAB/gf+CAQQCCBwf/B/oAAD/wf+CIARACIAf+B3wAABxgfOCIQRCCIQd+BngAACAAQAD/wf+CAAQAAAAf8D/wACAAQACD/wf8AAAfgD/AAeAAwAeD/AfgAAAfgD/AAeABwf0D/AAeAAwf8D/AAADAweeA/ABgA/AeeDAwAADwAfAAPwB+D4AeAAAAQeCHwRiCIQTCDwQcCAAA//H/4gBAAAYADwAHwAPgAPAAYAAEAI//H/4AAAYAPADgAwADgAPAAYAAAAAIABAAIABAAIABAAAcABgAAAAJgDeASQCSAfwB+AAAf+D/wCCAQQD+APgAAAPgD+AQQCCAQQAAAPgD+AQQCCD/wf+AAAB8AfwCSASQDyAOAAAAQAP+D/wSAAAAB8AfyCCQQSD/wf8AAD/wf+AQACAAfwB+AAAT+CfwAAAACAASf+T/gAAf+D/wAgAOAHeAxwAAD/wf+AAAD+AfwCAAfwD+AQAD+APwAAAfwD+AQACAAfwB+AAAB8AfwCCAQQD+APgAAAf+D/wQQCCAfwB8AAAB8AfwCCAQQD/wf+AAAfwD+AQACAAYABAAAABkAewCSASQDeAJgAAAQAH8A/wCCAAAD8AfwACAAQD+AfwAAAfAD8AAwAGAfgD4AAAD4AfgAGAfwD8AAwD+AfAAAAYwDuAHAA4AdwDGAAADwAfAAMAAiD/wf8AAAQwCOATQCyAcQDCAAAAwB/4fPiAEAAH/+//wAAQAj58P/AGAAAAgAMABAAMAAwACAAwAEAAAAAAAAAAAAAA"), 32, atob("AwQGCAgNCgMFBQYHBAUEBwgFCAcICAgICAgDAwYGBgcMCAgICAYGCAgDCAgHCQgICAgICAcICAsIBwgEBwQIBwMHBwYHBwUHBwMFBwMJBwcHBwcHBQcHCQcHBwUDBQk="), 15+(scale << 8)+(1 << 16));};
g.setFont("Blocky");
g.drawString(str, 0, 80);

require("Font8x12").add(Graphics);
g.setFont("8x12");
g.drawString(str, 0, 160);

D12.set();
g.lcd_wake();