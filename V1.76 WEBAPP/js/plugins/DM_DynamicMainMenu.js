//-----------------------------------------------------------------------------
// Dungeonmind - Dynamic Main Menu
// DM_DynamicMainMenu.js
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.DM_DynamicMainMenu = true;

var Dungeonmind = Dungeonmind || {};
Dungeonmind.DMS = Dungeonmind.DMS || {};
Dungeonmind.DMS.version = 1.01;

/*:
 * DM_DynamicMainMenu.js
 * Version 1.01
 * 
 *
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.01] [Basic] - Highly customizable main menu
 * system plugin. (non-commercial use only)
 * @author Dungeonmind
 * @target MZ
 * @url https://www.dmplugins.com/support
 *
 * @param sceneMenu
 * @text Scene_Menu
 *
 * @param customMainMenuInfoWindow
 * @parent sceneMenu
 * @text Custom Info Window
 * @type struct<customMainMenuInfoWindows>
 * @default {}
 * @desc Configure Custom Info Window. You have the Basic version, which supports 1 window (ID 1). Pro version is unlimited.
 *
 * @param windowMenuCommand
 * @text Window_MenuCommand
 *
 * @param mainMenuCommands
 * @parent windowMenuCommand
 * @text Main Menu Commands
 * @type struct<mainMenuCommands>[]
 * @default ["{\"symbol\":\"item\",\"commandText\":\"Item\",\"commonEvent\":\"0\"}","{\"symbol\":\"skill\",\"commandText\":\"Skill\",\"commonEvent\":\"0\"}","{\"symbol\":\"equip\",\"commandText\":\"Equip\",\"commonEvent\":\"0\"}","{\"symbol\":\"status\",\"commandText\":\"Status\",\"commonEvent\":\"0\"}","{\"symbol\":\"formation\",\"commandText\":\"Formation\",\"commonEvent\":\"0\"}","{\"symbol\":\"options\",\"commandText\":\"Options\",\"commonEvent\":\"0\"}","{\"symbol\":\"save\",\"commandText\":\"Save\",\"commonEvent\":\"0\"}","{\"symbol\":\"gameEnd\",\"commandText\":\"Game End\",\"commonEvent\":\"0\"}"]
 * @desc Set the main menu commands. Order will be the same.
 * The default symbols can still be used and are reserved.
 *
 * @param windowMenuCommandRectX
 * @parent windowMenuCommand
 * @text X
 * @default this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
 * @desc Specify the X position of the window, based on the game's resolution (JavaScript Allowed).
 *
 * @param windowMenuCommandRectY
 * @parent windowMenuCommand
 * @text Y
 * @default this.mainAreaTop();
 * @desc Specify the Y position of the window, based on the game's resolution (JavaScript Allowed).
 *
 * @param windowMenuCommandRectWidth
 * @parent windowMenuCommand
 * @text Width
 * @default this.mainCommandWidth();
 * @desc Specify the Width of the window (JavaScript Allowed).
 *
 * @param windowMenuCommandRectHeight
 * @parent windowMenuCommand
 * @text Height
 * @default this.mainAreaHeight() - this.goldWindowRect().height;
 * @desc Specify the Height of the window (JavaScript Allowed).
 *
 * @param commandTextAlignment
 * @parent windowMenuCommand
 * @text Command Text Align
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc Align command text (left, center, right).
 * Default: center
 *
 * @param windowMenuCommandBgType
 * @parent windowMenuCommand 
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select the background type you want to use for this window.
 * @default 0
 *
 * @param windowMenuCommandMaxCols
 * @parent windowMenuCommand
 * @text Max Cols
 * @type number
 * @min 1
 * @default 1
 * @desc Set the max columns for this window.
 * Default: 1
 *
 * @param windowMenuStatus
 * @text Window_MenuStatus
 *
 * @param windowMenuStatusRectX
 * @parent windowMenuStatus
 * @text X
 * @default this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
 * @desc Specify the X position of the window, based on the game's resolution (JavaScript Allowed).
 *
 * @param windowMenuStatusRectY
 * @parent windowMenuStatus
 * @text Y
 * @default this.mainAreaTop();
 * @desc Specify the Y position of the window, based on the game's resolution (JavaScript Allowed).
 *
 * @param windowMenuStatusRectWidth
 * @parent windowMenuStatus
 * @text Width
 * @default Graphics.boxWidth - this.mainCommandWidth();
 * @desc Specify the Width of the window (JavaScript Allowed).
 *
 * @param windowMenuStatusRectHeight
 * @parent windowMenuStatus
 * @text Height
 * @default this.mainAreaHeight();
 * @desc Specify the Height of the window (JavaScript Allowed).
 *
 * @param windowMenuStatusBgType
 * @parent windowMenuStatus 
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select the background type you want to use for this window.
 * @default 0
 *
 * @param windowMenuStatusMaxCols
 * @parent windowMenuStatus
 * @text Max Cols
 * @type number
 * @min 1
 * @default 1
 * @desc Set the max columns for this window.
 * Default: 1
 *
 * @param windowMenuStatusNumVisibleRows
 * @parent windowMenuStatus
 * @text Visible Rows
 * @type number
 * @min 1
 * @default 4
 * @desc Set the number of visible rows for this window.
 * Default: 4
 *
 * @param windowMenuStatusItemHeight
 * @parent windowMenuStatus
 * @text Item Height
 * @default Math.floor(this.innerHeight / this.numVisibleRows());
 * @desc Set the item height for actor selections.
 * (JavaScript Allowed).
 *
 * @param actorNameSettings
 * @parent windowMenuStatus
 * @text Actor Name Settings
 * @type struct<actorName>
 * @default {"actorNames":"true","nameX":"rect.x + 180;","nameY":"rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);","actorNameTextColor":"0","actorNameIcon":"0","actorNameIconXOffset":"0","actorNameIconYOffset":"0"}
 * @desc Settings for Actor Names.
 *
 * @param actorLevelSettings
 * @parent windowMenuStatus
 * @text Actor Level Settings
 * @type struct<actorLevel>
 * @default {"actorLevels":"true","levelX":"rect.x + 180;","levelY":"rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5) + lineHeight * 1;","actorLevelTextColor":"16","actorLevelIcon":"0","actorLevelIconXOffset":"0","actorLevelIconYOffset":"0"}
 * @desc Settings for Actor Names.
 *
 * @param actorClassSettings
 * @parent windowMenuStatus
 * @text Actor Class Settings
 * @type struct<actorClass>
 * @default {"actorClasses":"true","classX":"x + 180;","classY":"rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);","actorClassTextColor":"0","actorClassIcon":"0","actorClassIconXOffset":"0","actorClassIconYOffset":"0"}
 * @desc Settings for Actor Classes.
 *
 * @param actorStateSettings
 * @parent windowMenuStatus
 * @text Actor State Settings
 * @type struct<actorStates>
 * @default {"actorStates":"true","statesX":"rect.x + 180;","statesY":"rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5) + lineHeight * 2;"}
 * @desc Settings for Actor States.
 *
 * @param actorSpriteGauges
 * @parent windowMenuStatus
 * @text Actor Sprite Gauges
 * @type struct<actorSpriteGauges>
 * @default {"hpGauge":"true","hpGaugeX":"rect.x + 180;","hpGaugeY":"rect.y + 70;","hpGaugeWidth":"128","hpGaugeHeight":"12","hpGaugeColor1":"20","hpGaugeColor2":"21","hpGaugeBGColor":"19","hpGaugeLabelText":"HP","hpGaugeLabelX":"this.labelOutlineWidth() / 2;","hpGaugeLabelY":"5","mpGauge":"true","mpGaugeX":"rect.x + 180;","mpGaugeY":"rect.y + 72 + this.gaugeLineHeight();","mpGaugeWidth":"128","mpGaugeHeight":"12","mpGaugeColor1":"22","mpGaugeColor2":"23","mpGaugeBGColor":"19","mpGaugeLabelText":"MP","mpGaugeLabelX":"this.labelOutlineWidth() / 2;","mpGaugeLabelY":"5","tpGauge":"true","tpGaugeX":"rect.x + 180;","tpGaugeY":"rect.y + 72 + this.gaugeLineHeight() * 2;","tpGaugeWidth":"128","tpGaugeHeight":"12","tpGaugeColor1":"28","tpGaugeColor2":"29","tpGaugeBGColor":"19","tpGaugeLabelText":"TP","tpGaugeLabelX":"this.labelOutlineWidth() / 2;","tpGaugeLabelY":"5","expGauge":"true","expGaugeX":"rect.x + 180;","expGaugeY":"rect.y + 72 + this.gaugeLineHeight() * 3;","expGaugeWidth":"128","expGaugeHeight":"12","expGaugeColor1":"30","expGaugeColor2":"31","expGaugeBGColor":"19","expGaugeLabelText":"EXP","expGaugeLabelX":"this.labelOutlineWidth() / 2;","expGaugeLabelY":"5"}
 * @desc Settings for Actor Sprite Gauges.
 *
 * @param actorFaceSettings
 * @parent windowMenuStatus
 * @text Actor Sprite Faces
 * @type struct<actorFaceSettings>
 * @default {"actorFaces":"true","faceX":"rect.x + 1;","faceY":"rect.y + 1;","faceScale":"100","faceOpacity":"255"}
 * @desc Settings for Actor Faces. Face width and height are determined by the System 2 tab in the Database.
 *
 * @param windowGold
 * @text Window_Gold
 *
 * @param windowGoldRectX
 * @parent windowGold
 * @text X
 * @default this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
 * @desc Specify the X position of the window, based on the game's resolution (JavaScript Allowed).
 *
 * @param windowGoldRectY
 * @parent windowGold
 * @text Y
 * @default this.mainAreaBottom() - wh;
 * @desc Specify the Y position of the window, based on the game's resolution (JavaScript Allowed).)
 *
 * @param windowGoldRectWidth
 * @parent windowGold
 * @text Width
 * @default this.mainCommandWidth();
 * @desc Specify the Width of the window (JavaScript Allowed).
 *
 * @param windowGoldRectHeight
 * @parent windowGold
 * @text Height
 * @default this.calcWindowHeight(1, true);
 * @desc Specify the Height of the window (JavaScript Allowed).
 *
 * @param windowGoldBgType
 * @parent windowGold 
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select the background type you want to use for this window.
 * @default 0
 *
 * @param windowGoldBgImageFilename
 * @parent windowGold
 * @text BG Image filename
 * @type file
 * @dir img/system/
 * @desc Select a background image to use for this window.
 *
 * @param windowGoldBgImageXOffset
 * @parent windowGold
 * @text BG Image X Offset
 * @desc Positive values move the image right, negative values move 
 * the image left (JavaScript Allowed).
 * @default 0
 *
 * @param windowGoldBgImageYOffset
 * @parent windowGold
 * @text BG Image Y Offset
 * @desc Positive values move the image down, negative values move 
 * the image up (JavaScript Allowed).
 * @default 0
 *
 * @param goldIcon
 * @parent windowGold
 * @text Gold Icon
 * @type icon
 * @default 314
 * @desc Icon index for Gold.
 * Use 0 for no icon.
 *
 * @param goldText
 * @parent windowGold
 * @text Gold Text
 * @type string
 * @default TextManager.currencyUnit
 * @desc Text to display for the currency. Can be a "string" (with quotes) or a JavaScript expression that returns a string.
 *
 * @param maxGold
 * @parent windowGold
 * @text Max Gold
 * @type number
 * @min 1
 * @default 99999999
 * @desc Maximum gold amount allowed in the game.
 * 
 * @param goldIconAlignment
 * @parent windowGold
 * @text Gold Icon Alignment
 * @type select
 * @option Left
 * @value left
 * @option Right
 * @value right
 * @default left
 * @desc Alignment for the gold icon (left or right).
 * 
 * @param goldTextAlignment
 * @parent windowGold
 * @text Gold Text Alignment
 * @type select
 * @option Left
 * @value left
 * @option Right
 * @value right
 * @default left
 * @desc Alignment for the gold text (left or right).
 *
 * @param goldNumberAlignment
 * @parent windowGold
 * @text Gold Number Alignment
 * @type select
 * @option Left
 * @value left
 * @option Right
 * @value right
 * @default right
 * @desc Alignment for the gold numbers (left or right).
 *
 * @param goldWindowElementSpacing
 * @parent windowGold
 * @text Element Spacing
 * @type number
 * @min 0
 * @default 4
 * @desc Spacing between gold icon, text, and numbers drawn in the window (in pixels). Default: 4
 *
 * @param goldWindowElementOffsets
 * @text Element Offsets
 * @parent windowGold
 * @type struct<goldWindowElementOffsets>
 * @default {"goldIconXOffset":"0","goldIconYOffset":"0","goldTextXOffset":"0","goldTextYOffset":"0","goldAmountXOffset":"0","goldAmountYOffset":"0"}
 * @desc Fine-tune the position of gold window elements (icon, text, amount) using X and Y offsets. Defaults: 0
 *
 *
 * @help
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  🔍 Table of Contents
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. 📝 Terms of Use
 * 2. 📄 Plugin Description
 * 3. 🔌 Compatibility
 * 4. 💡 Script Calls
 * 5. 🔓 Benefits of Registration
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 1. 📝 Terms of Use
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * 1.1 Licence Terms: By purchasing or downloading the plugin, you acknowledge 
 *     that you have received or been provided access to a licence agreement, 
 *     and you agree to the terms and conditions outlined in that licence 
 *     agreement. Failure to comply with these terms may result in licence 
 *     revocation.
 * 1.2 Ownership and Redistribution: The plugin and its code are the exclusive 
 *     property of Dungeonmind. You may use the plugin in your RPG Maker 
 *     projects, but you may not resell, redistribute, or claim ownership of 
 *     the plugin/code itself, except as specifically permitted in the licence 
 *     agreement.
 * 1.3 Code Usage: The plugin/code is licensed for use in RPG Maker MV/MZ 
 *     projects as specified in the licence agreement. You may not extract or 
 *     reuse code in other plugins or non-RPG Maker projects without express 
 *     permission.
 * 1.4 Usage Restrictions: If the plugin is downloaded without purchasing a 
 *     commercial licence, it is for non-commercial use only. Commercial use 
 *     requires a licence purchase from the official website or any officially 
 *     supported platform like itch.io.
 * 1.5 Confidentiality: The plugin/code is confidential and should not be 
 *     shared with anyone without express permission from Dungeonmind.
 * 1.6 Modification: You are permitted to edit the plugin/code for the 
 *     purposes of your personal projects, as specified in the licence 
 *     agreement. Any other modifications, including redistribution or reuse 
 *     of modified code, require express permission from Dungeonmind.
 * 1.7 Attribution Requirements: As specified in the plugin's licence agreement, 
 *     providing credit is required. Please refer to the licence for specific 
 *     credit requirements.
 * 1.8 Precedence: In the event of any conflict or inconsistency between the 
 *     terms outlined in this plugin help file and the licence agreement, 
 *     the terms of the licence agreement shall take precedence.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 2. 📄 Plugin Description
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * ⓘ Highly customizable main menu system with custom info windows, gauges, 
 * flexible command layout (order, icons, text alignment), and actor status 
 * display options. Some features, such as multiple custom info windows, 
 * custom gauges, custom number stats, actor character sprites, actor picture 
 * sprites, and background images, are only available in the Pro version.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 3. 🔌 Compatibility
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * ⓘ This plugin is compatible with the following plugins:
 *
 * ✅ DM_ItemCategories.js
 * ✅ DM_LimitedInventory.js
 * ✅ DM_CoreShop.js
 * ✅ DM_IndependentItems.js
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 4. 💡 Script Calls
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * $gameDynamicMenuSystem.setCommandState(symbol, commandAccess);
 * ───────────────────────────────────────────────────────────────────────────
 * ⓘ Changes access to an existing main menu command. If you change access to
 * a default main menu command, then you must use the plugin command moving
 * forward and the corresponding event command will be disabled and can no
 * longer be used.
 * 
 * 💬 Arguments :
 * symbol ➔ The text that corresponds to the command's symbol.
 *
 * commandAccess ➔ Enabled will allow the player to select the command while
 * Disabled will disallow it.
 *
 * Reserved Symbols(default commands):
 * item
 * skill
 * equip
 * status
 * formation
 * options
 * save
 * gameEnd
 *
 * 📋 Examples :
 * $gameDynamicMenuSystem.setCommandState('item', 'Disabled');
 *  ➡ This script call will disable the player from accessing the item scene.
 * $gameDynamicMenuSystem.setCommandState('status', 'Enabled');
 *  ➡ This script call will enable the player to access the status scene.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * $gameDynamicMenuSystem.setCustomInfoWindowGaugeCurrentValue(customInfoWindowId, customGaugeId, value);
 * ───────────────────────────────────────────────────────────────────────────
 * ⓘ Sets the current value of a custom gauge in an info window.
 * Note: In the Basic version, only one custom info window and gauge are 
 * supported, and IDs other than 1 for both customInfoWindowId and 
 * customGaugeId will result in an error. The Pro version supports multiple 
 * info windows and gauges per window.
 *
 * 💬 Arguments :
 * customInfoWindowId ➔ The ID of the custom info window containing the gauge.
 * customGaugeId ➔ The ID of the custom gauge to update.
 * value ➔ The amount to add to the current value of the gauge.
 *
 * 📋 Examples :
 * $gameDynamicMenuSystem.setCustomInfoWindowGaugeCurrentValue(1, 1, 50);
 * ➡ This script call will add 50 to the current value of the gauge.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * $gameDynamicMenuSystem.setCustomInfoWindowGaugeMaxValue(customInfoWindowId, customGaugeId, value);
 * ───────────────────────────────────────────────────────────────────────────
 * ⓘ Sets the maximum value of a custom gauge in an info window.
 * Note: In the Basic version, only one custom info window and gauge are 
 * supported, and IDs other than 1 for both customInfoWindowId and 
 * customGaugeId will result in an error. The Pro version supports multiple 
 * info windows and gauges per window.
 *
 * 💬 Arguments :
 * customInfoWindowId ➔ The ID of the custom info window containing the gauge.
 * customGaugeId ➔ The ID of the custom gauge to update.
 * value ➔ The new maximum value of the gauge.
 *
 * 📋 Examples :
 * $gameDynamicMenuSystem.setCustomInfoWindowGaugeMaxValue(1, 1, 100);
 * ➡ This script call will set the maximum value of the gauge to 100.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 5. 🔓 Benefits of Registration
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * ⓘ By registering on our official website, you can unlock exclusive benefits,
 * including:
 *
 * ★ Hassle-free website experience
 * ★ Dedicated profile with access to all paid plugins and licences
 * ★ Priority support for our plugins
 * ★ Access to exclusive plugins
 * ★ Submit bug reports, feature requests, and commission requests
 *
 * Register now and gain instant access to exclusive features and friendly 
 * support! You can click the link above or go directly to the following URL:
 *
 * 🌐 https://www.dmplugins.com/register/
 *
 *
 * @command setCommandState
 * @text Set Command State
 * @desc Enable or Disable a command from the main menu based on symbol.
 *
 * @arg symbol
 * @text Symbol
 * @default
 * @desc The symbol for the command you want to change player access for.
 *
 * @arg commandAccess
 * @text Command Access
 * @type select
 * @option Enabled
 * @option Disabled
 * @desc Change player access for this command.
 *
 * @command setCustomInfoWindowGaugeCurrentValue
 * @text Set Custom Info Window Gauge Current Value
 * @desc Set the current value of a gauge in a main menu custom info window.
 *
 * @arg customInfoWindowId
 * @text Custom Info Window Id
 * @type number
 * @min 1
 * @default 1
 * @desc The ID of the custom info window (starts from 1).
 *
 * @arg customGaugeId
 * @text Custom Gauge Id
 * @type number
 * @min 1
 * @default 1
 * @desc The ID of the gauge (starts from 1).
 * 
 * @arg value
 * @text Value
 * @type string
 * @default 0
 * @desc The value to add to the current value (can be positive or negative).
 *
 * @command setCustomInfoWindowGaugeMaxValue
 * @text Set Custom Info Window Gauge Max Value
 * @desc Set the max value of a gauge in a main menu custom info window.
 *
 * @arg customInfoWindowId
 * @text Custom Info Window Id
 * @type number
 * @default 1
 * @desc The ID of the custom info window (starts from 1).
 * 
 * @arg customGaugeId
 * @text Custom Gauge Id
 * @type number
 * @default 1
 * @desc The ID of the gauge (starts from 1).
 * 
 * @arg value
 * @text Value
 * @type number
 * @default 100
 * @min 1
 * @desc The new max value for the gauge (must be 1 or more).
 *
 */

  /*~struct~customMainMenuInfoWindowGauges:
    @param gaugeVisuals
    @text Gauge Visuals

    @param customGaugeX
    @parent gaugeVisuals
    @text Custom Gauge X
    @default rect.x + 6
    @desc Specify X position of the Gauge. Use rect.x to make it relative to the window (e.g., rect.x + offset).

    @param customGaugeY
    @parent gaugeVisuals
    @text Custom Gauge Y
    @default rect.y + 6
    @desc Specify Y position of the Gauge. Use rect.y to make it relative to the window (e.g., rect.y + offset).

    @param customGaugeWidth
    @parent gaugeVisuals
    @text Custom Gauge Width
    @default 82
    @desc Specify the Width of the Gauge (JavaScript Allowed).

    @param customGaugeHeight
    @parent gaugeVisuals
    @text Custom Gauge Height
    @default 12
    @desc Specify the Height of the Gauge (JavaScript Allowed).

    @param customGaugeColor1
    @parent gaugeVisuals
    @text Custom Gauge Color 1
    @type number
    @max 31
    @default 11
    @desc Set Color 1 for the custom Gauge. 
    It's a number from 0-31.

    @param customGaugeColor2
    @parent gaugeVisuals
    @text Custom Gauge Color 2
    @type number
    @max 31
    @default 3
    @desc Set Color 2 for the custom Gauge. 
    It's a number from 0-31.

    @param customGaugeBGColor
    @parent gaugeVisuals
    @text Custom Gauge BG Color
    @type number
    @max 31
    @default 19
    @desc Set the BG Color for the custom Gauge. 
    It's a number from 0-31.
    
    @param gameVariables
    @text Game Variables
    @type select
    @option Enabled
    @option Disabled
    @desc Use game variables to control gauge values.
    @default Disabled

    @param currentValueVariableId
    @parent gameVariables
    @text Current Value Variable Id
    @type variable
    @default 0
    @desc Variable Id for the gauge's current value. Must be a non-negative value, set via event commands.

    @param maxValueVariableId
    @parent gameVariables
    @text Max Value Variable Id
    @type variable
    @default 0
    @desc Variable Id for the gauge's max value. Must be a non-negative value, set via event commands.

    @param dynamicVariables
    @text Dynamic Variables
    @type select
    @option Enabled
    @option Disabled
    @desc Enable dynamic variables to use custom settings and override Game Variable settings.
    @default Enabled

    @param initialCurrentValue
    @text Initial Current Value
    @parent dynamicVariables
    @type number
    @min 0
    @default 100
    @desc Initial gauge value (non-negative, adjustable via plugin commands/script calls).

    @param maxValue
    @text Max Value
    @parent dynamicVariables
    @type number
    @min 0
    @default 100
    @desc Maximum gauge value (non-negative, sets full capacity, adjustable via plugin commands/script calls).
  */

  /*~struct~customMainMenuInfoWindows:
    @param windowSettings
    @text Window Settings

    @param X
    @parent windowSettings 
    @desc Specify the X position of the window, based on the game's resolution (JavaScript Allowed).
    @default 0

    @param Y
    @parent windowSettings 
    @desc Specify the Y position of the window, based on the game's resolution (JavaScript Allowed).
    @default 0

    @param Width
    @parent windowSettings 
    @desc Specify the Width of the window (JavaScript Allowed).
    @default 200

    @param Height
    @parent windowSettings 
    @desc Specify the Height of the window (JavaScript Allowed).
    @default 200

    @param showText
    @parent windowSettings 
    @text Show Text
    @type note
    @desc Show text in the window (text codes allowed).
    @default "\\c[2]Test\\c[0] Window!"

    @param customWindowBgType
    @parent windowSettings 
    @text Background Type
    @type select
    @option Window
    @value 0
    @option Dim
    @value 1
    @option Transparent
    @value 2
    @desc Select the background type you want to use for this window.
    @default 0

    @param gaugeSettings
    @text Gauge Settings

    @param customMainMenuInfoWindowGauges
    @parent gaugeSettings
    @text Custom Gauge
    @type struct<customMainMenuInfoWindowGauges>
    @default {}
    @desc Configure Custom Gauge for this window.
 */
 
 /*~struct~mainMenuCommands:
    @param symbol
    @text Symbol
    @type select
    @option item
    @option skill
    @option equip
    @option status
    @option formation
    @option options
    @option save
    @option gameEnd
    @desc Set the symbol for this menu command. Check plugin help
    file for reserved symbol names.
    @default

    @param commandText
    @text Command Text
    @desc Set the text displayed for this command to the player.
    @default

    @param commonEvent
    @text Commond Event
    @type common_event
    @desc Common event to call when this command is selected. This
    is optional and will exit the menu scene.
    @default 0

    @param mainMenuCommandIcon
	@text Command Icon
	@type icon
	@default 0
	@desc Icon index for this command.

	@param mainMenuCommandIconXOffset
	@text Command Icon X Offset
	@default 0
	@desc X Offset for the command icon. Use positive numbers to move the icon right, and negative numbers to move it left.

	@param mainMenuCommandIconYOffset
	@text Command Icon Y Offset
	@default 0
	@desc Y Offset for the command icon. Use positive numbers to move the icon down, and negative numbers to move it up.
 */

 /*~struct~actorSpriteGauges:
    @param hpGauge
    @text HP Gauge
    @parent actorSpriteGauges
    @type boolean
    @on Enable
    @off Disable
    @desc Show the HP Gauge?
    Default: true
    @default true

    @param hpGaugeX
    @parent hpGauge
    @text HP Gauge X
    @default rect.x + 180;
    @desc Specify X position of the HP Gauge. Use rect.x to make it relative to the actor slot (e.g., rect.x + offset).

    @param hpGaugeY
    @parent hpGauge
    @text HP Gauge Y
    @default rect.y + 70;
    @desc Specify Y position of the HP Gauge. Use rect.y to make it relative to the actor slot (e.g., rect.y + offset).

    @param hpGaugeWidth
    @parent hpGauge
    @text HP Gauge Width
    @default 128
    @desc Specify the Width of the HP Gauge (JavaScript Allowed).

    @param hpGaugeHeight
    @parent hpGauge
    @text HP Gauge Height
    @default 12
    @desc Specify the Height of the HP Gauge (JavaScript Allowed).

    @param hpGaugeColor1
    @parent hpGauge
    @text HP Gauge Color 1
    @type number
    @max 31
    @default 20
    @desc Set Color 1 for the HP Gauge.
    It's a number from 0-31.

    @param hpGaugeColor2
    @parent hpGauge
    @text HP Gauge Color 2
    @type number
    @max 31
    @default 21
    @desc Set Color 2 for the HP Gauge.
    It's a number from 0-31.

    @param hpGaugeBGColor
    @parent hpGauge
    @text HP Gauge BG Color
    @type number
    @max 31
    @default 19
    @desc Set the BG Color for the HP Gauge.
    It's a number from 0-31.

    @param hpGaugeLabelText
    @parent hpGauge
    @text HP Gauge Label Text
    @default HP
    @desc Set the Label Text for the HP Gauge.
    It's a string.

    @param hpGaugeLabelX
    @parent hpGauge
    @text HP Gauge Label X
    @default this.labelOutlineWidth() / 2;
    @desc X Offset for HP Gauge Label. Use positive numbers to move the label right, and negative numbers to move it left.

    @param hpGaugeLabelY
    @parent hpGauge
    @text HP Gauge Label Y
    @default 5
    @desc Y Offset for HP Gauge Label. Use positive numbers to move the label down, and negative numbers to move it up.

    @param mpGauge
    @text MP Gauge
    @parent actorSpriteGauges
    @type boolean
    @on Enable
    @off Disable
    @desc Show the MP Gauge?
    Default: true
    @default true

    @param mpGaugeX
    @parent mpGauge
    @text MP Gauge X
    @default rect.x + 180;
    @desc Specify X position of the MP Gauge. Use rect.x to make it relative to the actor slot (e.g., rect.x + offset).

    @param mpGaugeY
    @parent mpGauge
    @text MP Gauge Y
    @default rect.y + 72 + this.gaugeLineHeight();
    @desc Specify Y position of the MP Gauge. Use rect.y to make it relative to the actor slot (e.g., rect.y + offset).

    @param mpGaugeWidth
    @parent mpGauge
    @text MP Gauge Width
    @default 128
    @desc Specify the Width of the MP Gauge (JavaScript Allowed).

    @param mpGaugeHeight
    @parent mpGauge
    @text MP Gauge Height
    @default 12
    @desc Specify the Height of the MP Gauge (JavaScript Allowed).

    @param mpGaugeColor1
    @parent mpGauge
    @text MP Gauge Color 1
    @type number
    @max 31
    @default 22
    @desc Set Color 1 for the MP Gauge.
    It's a number from 0-31.

    @param mpGaugeColor2
    @parent mpGauge
    @text MP Gauge Color 2
    @type number
    @max 31
    @default 23
    @desc Set Color 2 for the MP Gauge.
    It's a number from 0-31.

    @param mpGaugeBGColor
    @parent mpGauge
    @text MP Gauge BG Color
    @type number
    @max 31
    @default 19
    @desc Set the BG Color for the MP Gauge.
    It's a number from 0-31.

    @param mpGaugeLabelText
    @parent mpGauge
    @text MP Gauge Label Text
    @default MP
    @desc Set the Label Text for the MP Gauge.
    It's a string.

    @param mpGaugeLabelX
    @parent mpGauge
    @text MP Gauge Label X
    @default this.labelOutlineWidth() / 2;
    @desc X Offset for MP Gauge Label. Use positive numbers to move the label right, and negative numbers to move it left.

    @param mpGaugeLabelY
    @parent mpGauge
    @text MP Gauge Label Y
    @default 5
    @desc Y Offset for MP Gauge Label. Use positive numbers to move the label down, and negative numbers to move it up.

    @param tpGauge
    @text TP Gauge
    @parent actorSpriteGauges
    @type boolean
    @on Enable
    @off Disable
    @desc Show the TP Gauge?
    Default: true
    @default true

    @param tpGaugeX
    @parent tpGauge
    @text TP Gauge X
    @default rect.x + 180;
    @desc Specify X position of the TP Gauge. Use rect.x to make it relative to the actor slot (e.g., rect.x + offset).

    @param tpGaugeY
    @parent tpGauge
    @text TP Gauge Y
    @default rect.y + 72 + this.gaugeLineHeight() * 2;
    @desc Specify Y position of the TP Gauge. Use rect.y to make it relative to the actor slot (e.g., rect.y + offset).

    @param tpGaugeWidth
    @parent tpGauge
    @text TP Gauge Width
    @default 128
    @desc Specify the Width of the TP Gauge (JavaScript Allowed).

    @param tpGaugeHeight
    @parent tpGauge
    @text TP Gauge Height
    @default 12
    @desc Specify the Height of the TP Gauge (JavaScript Allowed).
 
    @param tpGaugeColor1
    @parent tpGauge
    @text TP Gauge Color 1
    @type number
    @max 31
    @default 28
    @desc Set Color 1 for the TP Gauge.
    It's a number from 0-31.
 
    @param tpGaugeColor2
    @parent tpGauge
    @text TP Gauge Color 2
    @type number
    @max 31
    @default 29
    @desc Set Color 2 for the TP Gauge.
    It's a number from 0-31.

    @param tpGaugeBGColor
    @parent tpGauge
    @text TP Gauge BG Color
    @type number
    @max 31
    @default 19
    @desc Set the BG Color for the TP Gauge.
    It's a number from 0-31.
 
    @param tpGaugeLabelText
    @parent tpGauge
    @text TP Gauge Label Text
    @default TP
    @desc Set the Label Text for the TP Gauge.
    It's a string.

    @param tpGaugeLabelX
    @parent tpGauge
    @text TP Gauge Label X
    @default this.labelOutlineWidth() / 2;
    @desc X Offset for TP Gauge Label. Use positive numbers to move the label right, and negative numbers to move it left.

    @param tpGaugeLabelY
    @parent tpGauge
    @text TP Gauge Label Y
    @default 5
    @desc Y Offset for TP Gauge Label. Use positive numbers to move the label down, and negative numbers to move it up.

    @param expGauge
    @text EXP Gauge
    @parent actorSpriteGauges
    @type boolean
    @on Enable
    @off Disable
    @desc Show the EXP Gauge?
    Default: true
    @default true

    @param expGaugeX
    @parent expGauge
    @text EXP Gauge X
    @default rect.x + 180;
    @desc Specify X position of the EXP Gauge. Use rect.x to make it relative to the actor slot (e.g., rect.x + offset).

    @param expGaugeY
    @parent expGauge
    @text EXP Gauge Y
    @default rect.y + 72 + this.gaugeLineHeight() * 3;
    @desc Specify Y position of the EXP Gauge. Use rect.y to make it relative to the actor slot (e.g., rect.y + offset).

    @param expGaugeWidth
    @parent expGauge
    @text EXP Gauge Width
    @default 128
    @desc Specify the Width of the new EXP Gauge (JavaScript Allowed).

    @param expGaugeHeight
    @parent expGauge
    @text EXP Gauge Height
    @default 12
    @desc Specify the Height of the new EXP Gauge (JavaScript Allowed).

    @param expGaugeColor1
    @parent expGauge
    @text EXP Gauge Color 1
    @type number
    @max 31
    @default 30
    @desc Set Color 1 for the EXP Gauge.
    It's a number from 0-31.

    @param expGaugeColor2
    @parent expGauge
    @text EXP Gauge Color 2
    @type number
    @max 31
    @default 31
    @desc Set Color 2 for the EXP Gauge.
    It's a number from 0-31.

    @param expGaugeBGColor
    @parent expGauge
    @text EXP Gauge BG Color
    @type number
    @max 31
    @default 19
    @desc Set the BG Color for the EXP Gauge.
    It's a number from 0-31.

    @param expGaugeLabelText
    @parent expGauge
    @text EXP Gauge Label Text
    @default EXP
    @desc Set the Label Text for the EXP Gauge.
    It's a string.

    @param expGaugeLabelX
    @parent expGauge
    @text EXP Gauge Label X
    @default this.labelOutlineWidth() / 2;
    @desc X Offset for EXP Gauge Label. Use positive numbers to move the label right, and negative numbers to move it left.

    @param expGaugeLabelY
    @parent expGauge
    @text EXP Gauge Label Y
    @default 5
    @desc Y Offset for EXP Gauge Label. Use positive numbers to move the label down, and negative numbers to move it up.
 */

/*~struct~actorFaceSettings:
    @param actorFaces
    @text Actor Faces
    @type boolean
    @on Enable
    @off Disable
    @desc Show Actor face images?
    Default: true
    @default true 

    @param faceX
    @text Face X
    @default rect.x + 1;
    @desc Sets the X position of the face relative to the actor 
    slot (rect.x). Ex: rect.x + 1 offsets right one pixel.

    @param faceY
    @text Face Y
    @default rect.y + 1;
    @desc Sets the Y position of the face relative to the actor 
    slot (rect.y). Ex: rect.y + 1 offsets down one pixel.

    @param faceScale
    @text Face Scale
    @type number
    @default 100
    @desc Set the scale of the face (in percent).
    Default: 100

    @param faceOpacity
    @text Face Opacity
    @type number
    @min 0
    @max 255
    @default 255
    @desc Set the opacity of the face.
    It's a number (0-255). Default: 255
*/

 /*~struct~actorName:
    @param actorNames
    @text Actor Names
    @type boolean
    @on Enable
    @off Disable
    @default true
    @desc Show actor names?

    @param nameX
    @text Name X
    @default rect.x + 180;
    @desc Sets the X position relative to the actor slot (rect.x). 
    Example: rect.x + 180 offsets right. JavaScript Allowed.

    @param nameY
    @text Name Y
    @default rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);
    @desc Sets the Y position relative to the actor slot (rect.y). 
    Example: rect.y + 180 offsets down. JavaScript Allowed.

    @param actorNameTextColor
    @text Actor Name Text Color
    @type number
    @max 31
    @default 0
    @desc Set the text color for the actor name.
    It's a number from 0-31.

    @param actorNameIcon
	@text Actor Name Icon
	@type icon
	@default 0
	@desc Icon index for the actor name.

	@param actorNameIconXOffset
	@text Actor Name Icon X Offset
	@default 0
	@desc X offset for the actor name icon. Use positive numbers to move the icon right, and negative numbers to move it left.

	@param actorNameIconYOffset
	@text Actor Name Icon Y Offset
	@default 0
	@desc Y offset for the actor name icon. Use positive numbers to move the icon down, and negative numbers to move it up.
 */

 /*~struct~actorLevel:
    @param actorLevels
    @text Actor Levels
    @type boolean
    @on Enable
    @off Disable
    @default true
    @desc Show actor levels?

    @param levelX
    @text Level X
    @default rect.x + 180;
    @desc Sets the X position relative to the actor slot (rect.x). 
    Example: rect.x + 180 offsets right. JavaScript Allowed.

    @param levelY
    @text Level Y
    @default rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5) + lineHeight * 1;
    @desc Sets the Y position relative to the actor slot (rect.y). 
    Example: rect.y + 60 offsets down. JavaScript Allowed.

    @param actorLevelTextColor
    @text Actor Level Text Color
    @type number
    @max 31
    @default 16
    @desc Set the text color for the actor name.
    It's a number from 0-31.

    @param actorLevelIcon
	@text Actor Level Icon
	@type icon
	@default 0
	@desc Icon index for the actor level.

	@param actorLevelIconXOffset
	@text Actor Level Icon X Offset
	@default 0
	@desc X offset for the actor level icon. Use positive numbers to move the icon right, and negative numbers to move it left.

	@param actorLevelIconYOffset
	@text Actor Level Icon Y Offset
	@default 0
	@desc Y offset for the actor level icon. Use positive numbers to move the icon down, and negative numbers to move it up.
 */

 /*~struct~actorClass:
    @param actorClasses
    @text Actor Classes
    @type boolean
    @on Enable
    @off Disable
    @default true
    @desc Show actor classes?

    @param classX
    @text Class X
    @default x + 180;
    @desc Sets the X position relative to the actor slot (x). 
    Example: x + 180 offsets right. JavaScript Allowed.

    @param classY
    @text Class Y
    @default rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);
    @desc Sets the Y position relative to the actor slot (rect.y). 
    Example: rect.y + 60 offsets down. JavaScript Allowed.

    @param actorClassTextColor
    @text Actor Class Text Color
    @type number
    @max 31
    @default 0
    @desc Set the text color for the actor name.
    It's a number from 0-31.

    @param actorClassIcon
    @text Actor Class Icon
    @type icon
    @default 0
    @desc Icon index for the actor class.

    @param actorClassIconXOffset
    @text Actor Class Icon X Offset
    @default 0
    @desc X offset for the actor class icon. Use positive numbers to move the icon right, and negative numbers to move it left.

    @param actorClassIconYOffset
    @text Actor Class Icon Y Offset
    @default 0
    @desc Y offset for the actor class icon. Use positive numbers to move the icon down, and negative numbers to move it up.
 */

 /*~struct~actorStates:
    @param actorStates
    @text Actor States
    @type boolean
    @on Enable
    @off Disable
    @default true
    @desc Show actor states?

    @param statesX
    @text States X
    @default rect.x + 180;
    @desc Sets the X position relative to the actor slot (rect.x). 
    Example: rect.x + 180 offsets right. JavaScript Allowed.

    @param statesY
    @text States Y
    @default rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5) + lineHeight * 2;
    @desc Sets the Y position relative to the actor slot (rect.y). 
    Example: rect.y + 60 offsets down. JavaScript Allowed.
 */

 /*~struct~goldWindowElementOffsets:
 	@param goldIconXOffset
	@text Gold Icon X Offset
	@default 0
 	@desc X offset for the gold icon. Use positive numbers to move the icon right, and negative numbers to move it left.

	@param goldIconYOffset
	@text Gold Icon Y Offset
	@default 0
	@desc Y offset for the gold icon. Use positive numbers to move the icon down, and negative numbers to move it up.

	@param goldTextXOffset
	@text Gold Text X Offset
	@default 0
	@desc X offset for the gold text. Use positive numbers to move the text right, and negative numbers to move it left.

	@param goldTextYOffset
	@parent windowGold
	@text Gold Text Y Offset
	@default 0
	@desc Y offset for the gold text. Use positive numbers to move the text down, and negative numbers to move it up.

	@param goldAmountXOffset
	@text Gold Amount X Offset
	@default 0
	@desc X offset for the gold amount. Use positive numbers to move the text right, and negative numbers to move it left.

	@param goldAmountYOffset
	@text Gold Amount Y Offset
	@default 0
	@desc Y offset for the gold amount. Use positive numbers to move the text down, and negative numbers to move it up.
 */

//-----------------------------------------------------------------------------
// *Register Plugin Commands
//-----------------------------------------------------------------------------

PluginManager.registerCommand('DM_DynamicMainMenu', 'setCommandState', args => {
    const symbol = args.symbol;
    const enabled = args.commandAccess;
    $gameDynamicMenuSystem.setCommandState(symbol, enabled);
});

PluginManager.registerCommand('DM_DynamicMainMenu', 'setCustomInfoWindowGaugeCurrentValue', args => {
    const customInfoWindowId = Number(args.customInfoWindowId);
    const customGaugeId = Number(args.customGaugeId);
    const value = Number(args.value);
    $gameDynamicMenuSystem.setCustomInfoWindowGaugeCurrentValue(customInfoWindowId, customGaugeId, value);
});

PluginManager.registerCommand('DM_DynamicMainMenu', 'setCustomInfoWindowGaugeMaxValue', args => {
    const customInfoWindowId = Number(args.customInfoWindowId);
    const customGaugeId = Number(args.customGaugeId);
    const value = Number(args.value);
    $gameDynamicMenuSystem.setCustomInfoWindowGaugeMaxValue(customInfoWindowId, customGaugeId, value);
});

//-----------------------------------------------------------------------------
// Parameters
//-----------------------------------------------------------------------------

Dungeonmind.DMS.parameters = PluginManager.parameters('DM_DynamicMainMenu');

//*~ Window_MenuCommand

Dungeonmind.DMS.windowMenuCommandRectWidth = Dungeonmind.DMS.parameters['windowMenuCommandRectWidth'] || "this.mainCommandWidth();";
Dungeonmind.DMS.windowMenuCommandRectHeight = Dungeonmind.DMS.parameters['windowMenuCommandRectHeight'] || "this.mainAreaHeight() - this.goldWindowRect().height;";
Dungeonmind.DMS.windowMenuCommandRectX = Dungeonmind.DMS.parameters['windowMenuCommandRectX'] || "this.isRightInputMode() ? Graphics.boxWidth - ww : 0;";
Dungeonmind.DMS.windowMenuCommandRectY = Dungeonmind.DMS.parameters['windowMenuCommandRectY'] || "this.mainAreaTop();";
Dungeonmind.DMS.windowMenuCommandBgType = Dungeonmind.DMS.parameters['windowMenuCommandBgType'] || 0;
Dungeonmind.DMS.windowMenuCommandMaxCols = Dungeonmind.DMS.parameters['windowMenuCommandMaxCols'] || 1;
Dungeonmind.DMS.windowMenuCommandTextAlignment = Dungeonmind.DMS.parameters['commandTextAlignment'] || 'center';

//*~ Window_MenuStatus

Dungeonmind.DMS.windowMenuStatusRectX = Dungeonmind.DMS.parameters['windowMenuStatusRectX'] || "this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;";
Dungeonmind.DMS.windowMenuStatusRectY = Dungeonmind.DMS.parameters['windowMenuStatusRectY'] || "this.mainAreaTop();";
Dungeonmind.DMS.windowMenuStatusRectWidth = Dungeonmind.DMS.parameters['windowMenuStatusRectWidth'] || "Graphics.boxWidth - this.mainCommandWidth();";
Dungeonmind.DMS.windowMenuStatusRectHeight = Dungeonmind.DMS.parameters['windowMenuStatusRectHeight'] || "this.mainAreaHeight();";
Dungeonmind.DMS.windowMenuStatusBgType = Dungeonmind.DMS.parameters['windowMenuStatusBgType'] || 0;
Dungeonmind.DMS.windowMenuStatusMaxCols = Dungeonmind.DMS.parameters['windowMenuStatusMaxCols'] || 1;
Dungeonmind.DMS.windowMenuStatusNumVisibleRows = Number(Dungeonmind.DMS.parameters['windowMenuStatusNumVisibleRows']) || 4;
Dungeonmind.DMS.windowMenuStatusItemHeight = Dungeonmind.DMS.parameters['windowMenuStatusItemHeight'] || "Math.floor(this.innerHeight / this.numVisibleRows());";

// *~ Parse Actor Sprite Gauges
Dungeonmind.DMS.actorSpriteGauges = JSON.parse(Dungeonmind.DMS.parameters['actorSpriteGauges']);

// HP Gauge
Dungeonmind.DMS.hpGauge = Dungeonmind.DMS.actorSpriteGauges['hpGauge'] === 'true';

Dungeonmind.DMS.hpGaugeX = Dungeonmind.DMS.actorSpriteGauges['hpGaugeX'] || "rect.x + 180;";
Dungeonmind.DMS.hpGaugeY = Dungeonmind.DMS.actorSpriteGauges['hpGaugeY'] || "rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);";
Dungeonmind.DMS.hpGaugeWidth = Dungeonmind.DMS.actorSpriteGauges['hpGaugeWidth'] || 128;
Dungeonmind.DMS.hpGaugeHeight = Dungeonmind.DMS.actorSpriteGauges['hpGaugeHeight'] || 12;

Dungeonmind.DMS.hpGaugeColor1 = Number(Dungeonmind.DMS.actorSpriteGauges['hpGaugeColor1']) || 20;
Dungeonmind.DMS.hpGaugeColor2 = Number(Dungeonmind.DMS.actorSpriteGauges['hpGaugeColor2']) || 21;
Dungeonmind.DMS.hpGaugeBGColor = Number(Dungeonmind.DMS.actorSpriteGauges['hpGaugeBGColor']) || 19;

Dungeonmind.DMS.hpGaugeLabelText = Dungeonmind.DMS.actorSpriteGauges['hpGaugeLabelText'] || "HP";
Dungeonmind.DMS.hpGaugeLabelX = Dungeonmind.DMS.actorSpriteGauges['hpGaugeLabelX'] || "this.labelOutlineWidth() / 2;";
Dungeonmind.DMS.hpGaugeLabelY = Dungeonmind.DMS.actorSpriteGauges['hpGaugeLabelY'] || '5';

// MP Gauge
Dungeonmind.DMS.mpGauge = Dungeonmind.DMS.actorSpriteGauges['mpGauge'] === 'true';

Dungeonmind.DMS.mpGaugeX = Dungeonmind.DMS.actorSpriteGauges['mpGaugeX'] || "rect.x + 180;";
Dungeonmind.DMS.mpGaugeY = Dungeonmind.DMS.actorSpriteGauges['mpGaugeY'] || "rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);";
Dungeonmind.DMS.mpGaugeWidth = Dungeonmind.DMS.actorSpriteGauges['mpGaugeWidth'] || 128;
Dungeonmind.DMS.mpGaugeHeight = Dungeonmind.DMS.actorSpriteGauges['mpGaugeHeight'] || 12;

Dungeonmind.DMS.mpGaugeColor1 = Number(Dungeonmind.DMS.actorSpriteGauges['mpGaugeColor1']) || 22;
Dungeonmind.DMS.mpGaugeColor2 = Number(Dungeonmind.DMS.actorSpriteGauges['mpGaugeColor2']) || 23;
Dungeonmind.DMS.mpGaugeBGColor = Number(Dungeonmind.DMS.actorSpriteGauges['mpGaugeBGColor']) || 19;

Dungeonmind.DMS.mpGaugeLabelText = Dungeonmind.DMS.actorSpriteGauges['mpGaugeLabelText'] || "MP";
Dungeonmind.DMS.mpGaugeLabelX = Dungeonmind.DMS.actorSpriteGauges['mpGaugeLabelX'] || "this.labelOutlineWidth() / 2;";
Dungeonmind.DMS.mpGaugeLabelY = Dungeonmind.DMS.actorSpriteGauges['mpGaugeLabelY'] || '5';

// TP Gauge
Dungeonmind.DMS.tpGauge = Dungeonmind.DMS.actorSpriteGauges['tpGauge'] === 'true';

Dungeonmind.DMS.tpGaugeX = Dungeonmind.DMS.actorSpriteGauges['tpGaugeX'] || "rect.x + 180;";
Dungeonmind.DMS.tpGaugeY = Dungeonmind.DMS.actorSpriteGauges['tpGaugeY'] || "rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);";
Dungeonmind.DMS.tpGaugeWidth = Dungeonmind.DMS.actorSpriteGauges['tpGaugeWidth'] || 128;
Dungeonmind.DMS.tpGaugeHeight = Dungeonmind.DMS.actorSpriteGauges['tpGaugeHeight'] || 12;

Dungeonmind.DMS.tpGaugeColor1 = Number(Dungeonmind.DMS.actorSpriteGauges['tpGaugeColor1']) || 28;
Dungeonmind.DMS.tpGaugeColor2 = Number(Dungeonmind.DMS.actorSpriteGauges['tpGaugeColor2']) || 29;
Dungeonmind.DMS.tpGaugeBGColor = Number(Dungeonmind.DMS.actorSpriteGauges['tpGaugeBGColor']) || 19;

Dungeonmind.DMS.tpGaugeLabelText = Dungeonmind.DMS.actorSpriteGauges['tpGaugeLabelText'] || "TP";
Dungeonmind.DMS.tpGaugeLabelX = Dungeonmind.DMS.actorSpriteGauges['tpGaugeLabelX'] || "this.labelOutlineWidth() / 2;";
Dungeonmind.DMS.tpGaugeLabelY = Dungeonmind.DMS.actorSpriteGauges['tpGaugeLabelY'] || '5';

// *~ Parse Actor Sprite Faces
Dungeonmind.DMS.actorFaceSettings = JSON.parse(Dungeonmind.DMS.parameters['actorFaceSettings']);

// Actor Faces
Dungeonmind.DMS.actorFaces = Dungeonmind.DMS.actorFaceSettings['actorFaces'] === 'true';

Dungeonmind.DMS.faceX = Dungeonmind.DMS.actorFaceSettings['faceX'] || "rect.x + 1;";
Dungeonmind.DMS.faceY = Dungeonmind.DMS.actorFaceSettings['faceY'] || "rect.y + 1;";

Dungeonmind.DMS.faceScale = Number(Dungeonmind.DMS.actorFaceSettings['faceScale']) || 100;
Dungeonmind.DMS.faceOpacity = Number(Dungeonmind.DMS.actorFaceSettings['faceOpacity']) || 255;

//*~ Parse Actor Name
Dungeonmind.DMS.actorNameSettings = JSON.parse(Dungeonmind.DMS.parameters['actorNameSettings']);

Dungeonmind.DMS.actorNames = Dungeonmind.DMS.actorNameSettings['actorNames'] === 'true';

Dungeonmind.DMS.nameX = Dungeonmind.DMS.actorNameSettings['nameX'] || "rect.x + 180;";
Dungeonmind.DMS.nameY = Dungeonmind.DMS.actorNameSettings['nameY'] || "rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);";

Dungeonmind.DMS.actorNameIcon = Number(Dungeonmind.DMS.actorNameSettings['actorNameIcon']) || 0;

Dungeonmind.DMS.actorNameIconXOffset = Number(Dungeonmind.DMS.actorNameSettings['actorNameIconXOffset']) || 0;
Dungeonmind.DMS.actorNameIconYOffset = Number(Dungeonmind.DMS.actorNameSettings['actorNameIconYOffset']) || 0;

Dungeonmind.DMS.actorNameTextColor = Number(Dungeonmind.DMS.actorNameSettings['actorNameTextColor']) || 0;

//*~ Parse Actor Level
Dungeonmind.DMS.actorLevelSettings = JSON.parse(Dungeonmind.DMS.parameters['actorLevelSettings']);

Dungeonmind.DMS.actorLevels = Dungeonmind.DMS.actorLevelSettings['actorLevels'] === 'true';

Dungeonmind.DMS.levelX = Dungeonmind.DMS.actorLevelSettings['levelX'] || "rect.x + 180;";
Dungeonmind.DMS.levelY = Dungeonmind.DMS.actorLevelSettings['levelY'] || "rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5) + lineHeight * 1;";

Dungeonmind.DMS.actorLevelIcon = Number(Dungeonmind.DMS.actorLevelSettings['actorLevelIcon']) || 0;

Dungeonmind.DMS.actorLevelIconXOffset = Number(Dungeonmind.DMS.actorLevelSettings['actorLevelIconXOffset']) || 0;
Dungeonmind.DMS.actorLevelIconYOffset = Number(Dungeonmind.DMS.actorLevelSettings['actorLevelIconYOffset']) || 0;

Dungeonmind.DMS.actorLevelTextColor = Number(Dungeonmind.DMS.actorLevelSettings['actorLevelTextColor']) || 16;

//*~ Parse Actor States

Dungeonmind.DMS.actorStateSettings = JSON.parse(Dungeonmind.DMS.parameters['actorStateSettings']);

Dungeonmind.DMS.actorStates = Dungeonmind.DMS.actorStateSettings['actorStates'] === 'true';

Dungeonmind.DMS.statesX = Dungeonmind.DMS.actorStateSettings['statesX'] || "rect.x + 180;";
Dungeonmind.DMS.statesY = Dungeonmind.DMS.actorStateSettings['statesY'] || "rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5) + lineHeight * 2;";

//*~ Parse Actor Class
Dungeonmind.DMS.actorClassSettings = JSON.parse(Dungeonmind.DMS.parameters['actorClassSettings']);

Dungeonmind.DMS.actorClasses = Dungeonmind.DMS.actorClassSettings['actorClasses'] === 'true';

Dungeonmind.DMS.classX = Dungeonmind.DMS.actorClassSettings['classX'] || "rect.x + 180;";
Dungeonmind.DMS.classY = Dungeonmind.DMS.actorClassSettings['classY'] || "rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);";

Dungeonmind.DMS.actorClassIcon = Number(Dungeonmind.DMS.actorClassSettings['actorClassIcon']) || 0;

Dungeonmind.DMS.actorClassIconXOffset = Number(Dungeonmind.DMS.actorClassSettings['actorClassIconXOffset']) || 0;
Dungeonmind.DMS.actorClassIconYOffset = Number(Dungeonmind.DMS.actorClassSettings['actorClassIconYOffset']) || 0;

Dungeonmind.DMS.actorClassTextColor = Number(Dungeonmind.DMS.actorClassSettings['actorClassTextColor']) || 0;

//*~ Parse EXP Gauge
Dungeonmind.DMS.expGauge = Dungeonmind.DMS.actorSpriteGauges['expGauge'] === 'true';

Dungeonmind.DMS.expGaugeX = Dungeonmind.DMS.actorSpriteGauges['expGaugeX'] || "rect.x + 180;";
Dungeonmind.DMS.expGaugeY = Dungeonmind.DMS.actorSpriteGauges['expGaugeY'] || "rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5) + 12 + this.gaugeLineHeight() * 4;";
Dungeonmind.DMS.expGaugeWidth = Dungeonmind.DMS.actorSpriteGauges['expGaugeWidth'] || 128;
Dungeonmind.DMS.expGaugeHeight = Dungeonmind.DMS.actorSpriteGauges['expGaugeHeight'] || 12;

Dungeonmind.DMS.expGaugeColor1 = Number(Dungeonmind.DMS.actorSpriteGauges['expGaugeColor1']) || 30;
Dungeonmind.DMS.expGaugeColor2 = Number(Dungeonmind.DMS.actorSpriteGauges['expGaugeColor2']) || 31;
Dungeonmind.DMS.expGaugeBGColor = Number(Dungeonmind.DMS.actorSpriteGauges['expGaugeBGColor']) || 19;

Dungeonmind.DMS.expGaugeLabelText = Dungeonmind.DMS.actorSpriteGauges['expGaugeLabelText'] || "EXP";
Dungeonmind.DMS.expGaugeLabelX = Dungeonmind.DMS.actorSpriteGauges['expGaugeLabelX'] || "this.labelOutlineWidth() / 2;";
Dungeonmind.DMS.expGaugeLabelY = Dungeonmind.DMS.actorSpriteGauges['expGaugeLabelY'] || '5';

//*~ Parse Gold Window Settings

Dungeonmind.DMS.windowGoldRectX = Dungeonmind.DMS.parameters['windowGoldRectX'] || "this.isRightInputMode() ? Graphics.boxWidth - ww : 0;";
Dungeonmind.DMS.windowGoldRectY = Dungeonmind.DMS.parameters['windowGoldRectY'] || "this.mainAreaBottom() - wh;";
Dungeonmind.DMS.windowGoldRectWidth = Dungeonmind.DMS.parameters['windowGoldRectWidth'] || "this.mainCommandWidth();";
Dungeonmind.DMS.windowGoldRectHeight = Dungeonmind.DMS.parameters['windowGoldRectHeight'] || "this.calcWindowHeight(1, true);";

Dungeonmind.DMS.windowGoldBgType = Dungeonmind.DMS.parameters['windowGoldBgType'] || 0;

Dungeonmind.DMS.goldIcon = Number(Dungeonmind.DMS.parameters['goldIcon']) || 314;

Dungeonmind.DMS.maxGold = Number(Dungeonmind.DMS.parameters['maxGold']) || 99999999;

Dungeonmind.DMS.goldIconAlignment = Dungeonmind.DMS.parameters['goldIconAlignment'] || 'right';
Dungeonmind.DMS.goldTextAlignment = Dungeonmind.DMS.parameters['goldTextAlignment'] || 'right';
Dungeonmind.DMS.goldNumberAlignment = Dungeonmind.DMS.parameters['goldNumberAlignment'] || 'right';
Dungeonmind.DMS.goldWindowElementSpacing = Number(Dungeonmind.DMS.parameters['goldWindowElementSpacing']) || 4;

Dungeonmind.DMS.goldText = Dungeonmind.DMS.parameters['goldText'] || "TextManager.currencyUnit";

//*~ Parse Gold Window Element offsets

Dungeonmind.DMS.goldWindowElementOffsets = JSON.parse(Dungeonmind.DMS.parameters['goldWindowElementOffsets']);

Dungeonmind.DMS.goldIconXOffset = Number(Dungeonmind.DMS.goldWindowElementOffsets['goldIconXOffset']) || 0;
Dungeonmind.DMS.goldIconYOffset = Number(Dungeonmind.DMS.goldWindowElementOffsets['goldIconYOffset']) || 0;

Dungeonmind.DMS.goldTextXOffset = Number(Dungeonmind.DMS.goldWindowElementOffsets['goldTextXOffset']) || 0;
Dungeonmind.DMS.goldTextYOffset = Number(Dungeonmind.DMS.goldWindowElementOffsets['goldTextYOffset']) || 0;

Dungeonmind.DMS.goldAmountXOffset = Number(Dungeonmind.DMS.goldWindowElementOffsets['goldAmountXOffset']) || 0;
Dungeonmind.DMS.goldAmountYOffset = Number(Dungeonmind.DMS.goldWindowElementOffsets['goldAmountYOffset']) || 0;

//=============================================================================
// Initialize Global Variables
//=============================================================================

$gameDynamicMenuSystem = null;

(() => {

'use strict';

const PLUGIN_NAME = "DM_DynamicMainMenu";

//-----------------------------------------------------------------------------
// DataManager
//-----------------------------------------------------------------------------

Dungeonmind.DMS.ALIAS_DataManager_createGameObjects = DataManager.createGameObjects;

DataManager.createGameObjects = function() {
    Dungeonmind.DMS.ALIAS_DataManager_createGameObjects.call(this);
    $gameDynamicMenuSystem = new Game_DynamicMenuSystem();
};

Dungeonmind.DMS.ALIAS_DataManager_makeSaveContents = DataManager.makeSaveContents;

DataManager.makeSaveContents = function() {
    const contents = Dungeonmind.DMS.ALIAS_DataManager_makeSaveContents.call(this);
    contents.gameDynamicMenuSystem = $gameDynamicMenuSystem;
    return contents;
};

Dungeonmind.DMS.ALIAS_DataManager_extractSaveContents = DataManager.extractSaveContents;

DataManager.extractSaveContents = function(contents) {
    Dungeonmind.DMS.ALIAS_DataManager_extractSaveContents.call(this, contents);
    $gameDynamicMenuSystem = contents.gameDynamicMenuSystem;
};

//-----------------------------------------------------------------------------
// Game_DynamicMenu
//-----------------------------------------------------------------------------

function Game_DynamicMenuSystem() {
    this.initialize(...arguments);
}

Game_DynamicMenuSystem.prototype.initialize = function() {
	this._customMainMenuInfoWindows = [];
    this.initCustomMainMenuInfoWindows();
    this.initMenuCommandWindowRectSettings();
    this.initMenuCommands();
    this.initMenuCommandsBgType();
    this.initMenuCommandMaxCols();
    this.initMenuCommandTextAlignment();
    //*~ Window_MenuStatus
    this.initMenuStatusRectSettings();
    this.initMenuStatusBgType();
    this.initMenuStatusMaxCols();
    this.initMenuStatusNumVisibleRows();
    this.initMenuStatusItemHeight();
    //*~ Window_Gold
    this.initGoldWindowRectSettings();
    this.initGoldWindowBgType();
};

Game_DynamicMenuSystem.prototype.initMenuCommandsBgType = function() {
    this._windowMenuCommandBgType = Number(Dungeonmind.DMS.windowMenuCommandBgType);
};

Game_DynamicMenuSystem.prototype.initMenuStatusBgType = function() {
    this._windowMenuStatusBgType = Number(Dungeonmind.DMS.windowMenuStatusBgType);
};

Game_DynamicMenuSystem.prototype.initMenuStatusMaxCols = function() {
    this._windowMenuStatusMaxCols = Dungeonmind.DMS.windowMenuStatusMaxCols;
};

Game_DynamicMenuSystem.prototype.initMenuCommandMaxCols = function() {
    this._windowMenuCommandMaxCols = Dungeonmind.DMS.windowMenuCommandMaxCols;
};

Game_DynamicMenuSystem.prototype.initMenuStatusItemHeight = function() {
    this._windowMenuStatusItemHeight = Dungeonmind.DMS.windowMenuStatusItemHeight
};

Game_DynamicMenuSystem.prototype.initMenuStatusNumVisibleRows = function() {
    this._windowMenuStatusNumVisibleRows = Dungeonmind.DMS.windowMenuStatusNumVisibleRows;
};

Game_DynamicMenuSystem.prototype.initMenuCommandTextAlignment = function() {
	this._windowMenuCommandTextAlignment = Dungeonmind.DMS.windowMenuCommandTextAlignment;
};

Game_DynamicMenuSystem.prototype.initCustomMainMenuInfoWindows = function() {
    const customMainMenuInfoWindow = JSON.parse(Dungeonmind.DMS.parameters.customMainMenuInfoWindow || '{}');
    if (Object.keys(customMainMenuInfoWindow).length > 0) {
        this._customMainMenuInfoWindow = customMainMenuInfoWindow;
        this._customMainMenuInfoWindow.customWindowBgType = Number(this._customMainMenuInfoWindow.customWindowBgType);
        this._customMainMenuInfoWindow.customGauge = JSON.parse(this._customMainMenuInfoWindow.customMainMenuInfoWindowGauges);
        this._customMainMenuInfoWindow.customGauge.initialCurrentValue = Number(this._customMainMenuInfoWindow.customGauge.initialCurrentValue);
        this._customMainMenuInfoWindow.customGauge.maxValue = Number(this._customMainMenuInfoWindow.customGauge.maxValue);
    } else {
        this._customMainMenuInfoWindow = {};
    }
};

Game_DynamicMenuSystem.prototype.initCustomMainMenuInfoWindowGaugesData = function(customGaugesData) {
    if (!customGaugesData || Object.keys(customGaugesData).length === 0) {
        return null;
    }
    let gaugeData = JSON.parse(customGaugesData);
    let customGauge = {
        customGaugeBGColor: Number(gaugeData.customGaugeBGColor),
        customGaugeColor1: Number(gaugeData.customGaugeColor1),
        customGaugeColor2: Number(gaugeData.customGaugeColor2),
        customGaugeHeight: gaugeData.customGaugeHeight,
        customGaugeWidth: gaugeData.customGaugeWidth,
        customGaugeX: gaugeData.customGaugeX,
        customGaugeY: gaugeData.customGaugeY,
        gameVariables: gaugeData.gameVariables === 'Enabled',
        currentValueVariableId: Number(gaugeData.currentValueVariableId),
        maxValueVariableId: Number(gaugeData.maxValueVariableId),
        dynamicVariables: gaugeData.dynamicVariables === 'Enabled',
        initialCurrentValue: Number(gaugeData.initialCurrentValue),
        maxValue: Number(gaugeData.maxValue)
    };
    return customGauge;
};

Game_DynamicMenuSystem.prototype.initMenuCommandWindowRectSettings = function() {
   this._windowMenuCommandRectWidth = Dungeonmind.DMS.windowMenuCommandRectWidth;
   this._windowMenuCommandRectHeight = Dungeonmind.DMS.windowMenuCommandRectHeight;
   this._windowMenuCommandRectX = Dungeonmind.DMS.windowMenuCommandRectX;
   this._windowMenuCommandRectY = Dungeonmind.DMS.windowMenuCommandRectY;
};

Game_DynamicMenuSystem.prototype.initMenuCommands = function() {
    this._mainMenuCommands = JSON.parse(Dungeonmind.DMS.parameters['mainMenuCommands']);
    for (let i = 0; i < this._mainMenuCommands.length; i++) {
        this._mainMenuCommands[i] = JSON.parse(this._mainMenuCommands[i]);
        this._mainMenuCommands[i].commonEvent = Number(this._mainMenuCommands[i].commonEvent);
        this._mainMenuCommands[i].mainMenuCommandIcon = Number(this._mainMenuCommands[i].mainMenuCommandIcon);
        this._mainMenuCommands[i].mainMenuCommandIconXOffset = Number(this._mainMenuCommands[i].mainMenuCommandIconXOffset);
        this._mainMenuCommands[i].mainMenuCommandIconYOffset = Number(this._mainMenuCommands[i].mainMenuCommandIconYOffset);
        // adds in default main menu commands enabled function names.
        if(this._mainMenuCommands[i].symbol === 'item' 
            || this._mainMenuCommands[i].symbol === 'skill' 
            || this._mainMenuCommands[i].symbol === 'equip' 
            || this._mainMenuCommands[i].symbol === 'status') {
            this._mainMenuCommands[i].enabled = Window_MenuCommand.prototype.areMainCommandsEnabled;
        }
        if(this._mainMenuCommands[i].symbol === 'formation') {
            this._mainMenuCommands[i].enabled = Window_MenuCommand.prototype.isFormationEnabled;
        }
        if(this._mainMenuCommands[i].symbol === 'options') {
            this._mainMenuCommands[i].enabled = Window_MenuCommand.prototype.isOptionsEnabled;
        }
        if(this._mainMenuCommands[i].symbol === 'save') {
            this._mainMenuCommands[i].enabled = Window_MenuCommand.prototype.isSaveEnabled;
        }
        if(this._mainMenuCommands[i].symbol === 'gameEnd') {
            this._mainMenuCommands[i].enabled = Window_MenuCommand.prototype.isGameEndEnabled;
        }
        //*~ Check to see if enabled property exists or not.
        if(!this._mainMenuCommands[i].enabled) {
            this._mainMenuCommands[i].enabled = Window_MenuCommand.prototype.isCommandCustom;
        }
    }
};

Game_DynamicMenuSystem.prototype.initMenuStatusRectSettings = function() {
    this._windowMenuStatusRectX = Dungeonmind.DMS.windowMenuStatusRectX;
    this._windowMenuStatusRectY = Dungeonmind.DMS.windowMenuStatusRectY;
    this._windowMenuStatusRectWidth = Dungeonmind.DMS.windowMenuStatusRectWidth;
    this._windowMenuStatusRectHeight = Dungeonmind.DMS.windowMenuStatusRectHeight;
};

Game_DynamicMenuSystem.prototype.setCommandState = function(symbol, enabled) {
    const mainMenuCommands = this._mainMenuCommands;
    for (let i = 0; i < mainMenuCommands.length; i++) {
        if(mainMenuCommands[i].symbol === symbol) {
            mainMenuCommands[i].enabled = this.getBoolean(enabled);
        }
    }
};

Game_DynamicMenuSystem.prototype.getBoolean = function(enabled) {
    if(enabled === 'Enabled') {
        return true;
    } else if (enabled === 'Disabled') {
        return false;
    }
    return eval(enabled);
};

Game_DynamicMenuSystem.prototype.setCustomInfoWindowGaugeCurrentValue = function(customInfoWindowId, customGaugeId, value) {
    if (customInfoWindowId !== 1 || customGaugeId !== 1) {
        throw new Error(`Invalid custom info window or gauge ID. Only ID 1 is supported in the Basic version.`);
    }
    const gauge = this._customMainMenuInfoWindow.customGauge;
    gauge.initialCurrentValue += value;
    gauge.initialCurrentValue = Math.max(0, Math.min(gauge.initialCurrentValue, gauge.maxValue));
};

Game_DynamicMenuSystem.prototype.setCustomInfoWindowGaugeMaxValue = function(customInfoWindowId, customGaugeId, value) {
    if (customInfoWindowId !== 1 || customGaugeId !== 1) {
        throw new Error(`Invalid custom info window or gauge ID. Only ID 1 is supported in the Basic version.`);
    }
    if (value < 1) {
        throw new Error(`Invalid max value: ${value}. Max value must be 1 or more.`);
    }
    const gauge = this._customMainMenuInfoWindow.customGauge;
    gauge.maxValue = value;
    gauge.initialCurrentValue = Math.max(0, Math.min(gauge.initialCurrentValue, gauge.maxValue));
};

Game_DynamicMenuSystem.prototype.initGoldWindowRectSettings = function() {
    this._windowGoldRectX = Dungeonmind.DMS.windowGoldRectX;
    this._windowGoldRectY = Dungeonmind.DMS.windowGoldRectY;
    this._windowGoldRectWidth = Dungeonmind.DMS.windowGoldRectWidth;
    this._windowGoldRectHeight = Dungeonmind.DMS.windowGoldRectHeight;
};

Game_DynamicMenuSystem.prototype.initGoldWindowBgType = function() {
    this._windowGoldBgType = Number(Dungeonmind.DMS.windowGoldBgType);
};

//-----------------------------------------------------------------------------
// Game_Party
//-----------------------------------------------------------------------------

Game_Party.prototype.maxGold = function() {
    return Dungeonmind.DMS.maxGold;
};

//-----------------------------------------------------------------------------
// Scene_Menu
//-----------------------------------------------------------------------------

Dungeonmind.DMS.ALIAS_SceneMenu_create = Scene_Menu.prototype.create;

Scene_Menu.prototype.create = function() {
    Dungeonmind.DMS.ALIAS_SceneMenu_create.call(this);
    this.createCustomMainMenuInfoWindows();
};

Scene_Menu.prototype.createCustomMainMenuInfoWindows = function() {
    const customMainMenuInfoWindow = $gameDynamicMenuSystem._customMainMenuInfoWindow;
    if (Object.keys(customMainMenuInfoWindow).length > 0) {
        const propertyName = `_customMainMenuInfoWindow`;
        const rect = this.getCustomMainMenuInfoWindowRect();
        const active = true;
        const text = JSON.parse(customMainMenuInfoWindow.showText);
        const customWindowBgType = customMainMenuInfoWindow.customWindowBgType;
        this[propertyName] = new Window_MainMenuCustomInfo(rect, text, 0);
        this.addWindow(this[propertyName]);
        this[propertyName].setBackgroundType(customWindowBgType);
    }
};

Scene_Menu.prototype.getCustomMainMenuInfoWindowRect = function() {
    const customMainMenuInfoWindow = $gameDynamicMenuSystem._customMainMenuInfoWindow;
    const x = eval(customMainMenuInfoWindow.X);
    const y = eval(customMainMenuInfoWindow.Y);
    const width = eval(customMainMenuInfoWindow.Width);
    const height = eval(customMainMenuInfoWindow.Height);
    return new Rectangle(x, y, width, height);
};

Scene_Menu.prototype.commandWindowRect = function() {
    const ww = eval($gameDynamicMenuSystem._windowMenuCommandRectWidth);
    const wh = eval($gameDynamicMenuSystem._windowMenuCommandRectHeight);
    const wx = eval($gameDynamicMenuSystem._windowMenuCommandRectX);
    const wy = eval($gameDynamicMenuSystem._windowMenuCommandRectY);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Menu.prototype.statusWindowRect = function() {
    const ww = eval($gameDynamicMenuSystem._windowMenuStatusRectWidth);
    const wh = eval($gameDynamicMenuSystem._windowMenuStatusRectHeight);
    const wx = eval($gameDynamicMenuSystem._windowMenuStatusRectX);
    const wy = eval($gameDynamicMenuSystem._windowMenuStatusRectY);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Menu.prototype.goldWindowRect = function() {
    const ww = eval($gameDynamicMenuSystem._windowGoldRectWidth);
    const wh = eval($gameDynamicMenuSystem._windowGoldRectHeight);
    const wx = eval($gameDynamicMenuSystem._windowGoldRectX);
    const wy = eval($gameDynamicMenuSystem._windowGoldRectY);
    return new Rectangle(wx, wy, ww, wh);
};

//-----------------------------------------------------------------------------
// Window_Gold
//-----------------------------------------------------------------------------

Window_Gold.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.setBackgroundType($gameDynamicMenuSystem._windowGoldBgType);
    this.refresh();
    this.createWindowBGImage();
};

Window_Gold.prototype.createWindowBGImage = function() {
    const filename = $gameDynamicMenuSystem._windowGoldBgImageFilename;
    const bgImageXOffset = $gameDynamicMenuSystem._windowGoldBgImageXOffset;
    const bgImageYOffset = $gameDynamicMenuSystem._windowGoldBgImageYOffset;
    if (filename) {
        const bitmap = ImageManager.loadSystem(filename);
        if (bitmap.isReady()) {
            this._backgroundSprite = new Sprite(bitmap);
            this._backgroundSprite.x = bgImageXOffset;
            this._backgroundSprite.y = bgImageYOffset;
            this._backgroundSprite.width = this.width;
            this._backgroundSprite.height = this.height;
            const indexOfWindowLayer = SceneManager._scene.children.indexOf(SceneManager._scene._windowLayer);
            this.addChildAt(this._backgroundSprite, indexOfWindowLayer);
        } else {
            bitmap.addLoadListener(function() {
                this.createWindowBGImage();
            }.bind(this));
        }
    }
};

Window_Gold.prototype.drawCurrencyValue = function(value, unit, x, y, width, align) {
    const unitWidth = Math.min(80, this.textWidth(unit));
    this.resetTextColor();
    this.drawText(value, x, y, width - unitWidth - 6, align);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(unit, x + width - unitWidth, y, unitWidth, align);
};

Window_Gold.prototype.refresh = function() {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this._currencyText = eval(Dungeonmind.DMS.goldText);
    if (Dungeonmind.DMS.goldIconAlignment === 'left' && 
        Dungeonmind.DMS.goldNumberAlignment === 'left' && 
        Dungeonmind.DMS.goldTextAlignment === 'left') {
	    const iconX = 0;
	    const elementSpacing = Dungeonmind.DMS.goldWindowElementSpacing;
	    const textX = this.getIconWidth() + elementSpacing;
	    const numberX = textX + this.textWidth(this._currencyText) + elementSpacing;
	    const padding = 6;
	    this.drawIcon(Dungeonmind.DMS.goldIcon, padding + iconX + Dungeonmind.DMS.goldIconXOffset, y + Dungeonmind.DMS.goldIconYOffset);
	    this.changeTextColor(ColorManager.systemColor());
	    this.drawText(this._currencyText, padding + textX + Dungeonmind.DMS.goldTextXOffset, y + Dungeonmind.DMS.goldTextYOffset);
	    this.resetTextColor();
	    this.drawText($gameParty.gold(), padding + numberX + Dungeonmind.DMS.goldAmountXOffset, y + Dungeonmind.DMS.goldAmountYOffset);
    } else if (Dungeonmind.DMS.goldIconAlignment === 'right' && 
               Dungeonmind.DMS.goldNumberAlignment === 'right' && 
               Dungeonmind.DMS.goldTextAlignment === 'right') {
    	const elementSpacing = Dungeonmind.DMS.goldWindowElementSpacing;
	    const iconX = this.width - this.padding * 2 - this.getIconWidth() - elementSpacing;
	    const textX = iconX - this.textWidth(this._currencyText) - elementSpacing;
	    const numberX = textX - this.textWidth($gameParty.gold()) - elementSpacing;
	    this.resetTextColor();
	    this.drawText($gameParty.gold(), numberX + Dungeonmind.DMS.goldAmountXOffset, y + Dungeonmind.DMS.goldAmountYOffset);
	    this.changeTextColor(ColorManager.systemColor());
	    this.drawText(this._currencyText, textX + Dungeonmind.DMS.goldTextXOffset, y + Dungeonmind.DMS.goldTextYOffset);
	    this.drawIcon(Dungeonmind.DMS.goldIcon, iconX + Dungeonmind.DMS.goldIconXOffset, y + Dungeonmind.DMS.goldIconYOffset);
    } else if (Dungeonmind.DMS.goldIconAlignment === 'left' && 
           	   Dungeonmind.DMS.goldNumberAlignment === 'right' && 
               Dungeonmind.DMS.goldTextAlignment === 'left') {
    	const iconX = 0;
    	const elementSpacing = Dungeonmind.DMS.goldWindowElementSpacing;
    	const textX = this.getIconWidth() + elementSpacing;
	    const numberAlignment = Dungeonmind.DMS.goldNumberAlignment;
	    const padding = 6;
	    const numberX = -(this.padding * 2 + padding);
	    this.drawIcon(Dungeonmind.DMS.goldIcon, iconX + padding + Dungeonmind.DMS.goldIconXOffset, y + Dungeonmind.DMS.goldIconYOffset);
	    this.changeTextColor(ColorManager.systemColor());
	    this.drawText(this._currencyText, textX + padding + Dungeonmind.DMS.goldTextXOffset, y + Dungeonmind.DMS.goldTextYOffset);
	    this.resetTextColor();
	    this.drawText($gameParty.gold(), numberX + Dungeonmind.DMS.goldAmountXOffset, y + Dungeonmind.DMS.goldAmountYOffset, this.width, numberAlignment);
	} else if (Dungeonmind.DMS.goldIconAlignment === 'left' && 
               Dungeonmind.DMS.goldNumberAlignment === 'right' && 
               Dungeonmind.DMS.goldTextAlignment === 'right') {
    	const iconX = 0;
    	const padding = 6;
    	const elementSpacing = Dungeonmind.DMS.goldWindowElementSpacing;
    	const textX = -(this.padding * 2) - 12;
	    const numberAlignment = Dungeonmind.DMS.goldNumberAlignment;
	    const textAlignment = Dungeonmind.DMS.goldTextAlignment;
	    const numberX = -(this.padding * 2 + padding) - this.textWidth(this._currencyText) - elementSpacing;
	    this.drawIcon(Dungeonmind.DMS.goldIcon, iconX + padding + Dungeonmind.DMS.goldIconXOffset, y + Dungeonmind.DMS.goldIconYOffset);
	    this.changeTextColor(ColorManager.systemColor());
	    this.drawText(this._currencyText, textX + padding + Dungeonmind.DMS.goldTextXOffset, y + Dungeonmind.DMS.goldTextYOffset, this.width, textAlignment);
	    this.resetTextColor();
	    this.drawText($gameParty.gold(), numberX + Dungeonmind.DMS.goldAmountXOffset, y + Dungeonmind.DMS.goldAmountYOffset, this.width, numberAlignment);
	} else if (Dungeonmind.DMS.goldIconAlignment === 'left' && 
               Dungeonmind.DMS.goldNumberAlignment === 'left' && 
               Dungeonmind.DMS.goldTextAlignment === 'right') {
	    const iconX = 0;
	    const padding = 6;
	    const elementSpacing = Dungeonmind.DMS.goldWindowElementSpacing;
	    const textX = -(this.padding * 2) - (padding + 6);
	    const numberX = this.textWidth(this._currencyText) + elementSpacing + padding + this.getIconWidth() + elementSpacing;
	    const textAlignment = Dungeonmind.DMS.goldTextAlignment;
	    this.drawIcon(Dungeonmind.DMS.goldIcon, iconX + padding + Dungeonmind.DMS.goldIconXOffset, y + Dungeonmind.DMS.goldIconYOffset);
	    this.resetTextColor();
	    this.drawText($gameParty.gold(), padding + this.getIconWidth() + elementSpacing + Dungeonmind.DMS.goldAmountXOffset, y + Dungeonmind.DMS.goldAmountYOffset);
	    this.changeTextColor(ColorManager.systemColor());
	    this.drawText(this._currencyText, textX + padding + Dungeonmind.DMS.goldTextXOffset, y + Dungeonmind.DMS.goldTextYOffset, this.width, textAlignment);
	} else if (Dungeonmind.DMS.goldIconAlignment === 'right' && 
               Dungeonmind.DMS.goldNumberAlignment === 'right' && 
               Dungeonmind.DMS.goldTextAlignment === 'left') {
		const padding = 6;
	    const elementSpacing = Dungeonmind.DMS.goldWindowElementSpacing;
	    const iconX = this.width - this.padding * 2 - this.getIconWidth();
	    const textX = 0;
	    const numberX =  -(this.padding * 2) - this.getIconWidth() - elementSpacing;
	    const textAlignment = Dungeonmind.DMS.goldTextAlignment;
	    const numberAlignment = Dungeonmind.DMS.goldNumberAlignment;
	    this.changeTextColor(ColorManager.systemColor());
	    this.drawText(this._currencyText, textX + padding + Dungeonmind.DMS.goldTextXOffset, y + Dungeonmind.DMS.goldTextYOffset);
	    this.resetTextColor();
	    this.drawText($gameParty.gold(), numberX - padding + Dungeonmind.DMS.goldAmountXOffset, y + Dungeonmind.DMS.goldAmountYOffset, this.width, numberAlignment);
	    this.drawIcon(Dungeonmind.DMS.goldIcon, iconX - padding + Dungeonmind.DMS.goldIconXOffset, y + Dungeonmind.DMS.goldIconYOffset);
	} else if (Dungeonmind.DMS.goldIconAlignment === 'right' &&
		       Dungeonmind.DMS.goldNumberAlignment === 'left' && 
		       Dungeonmind.DMS.goldTextAlignment === 'left') {
		const padding = 6;
	    const elementSpacing = Dungeonmind.DMS.goldWindowElementSpacing;
	    const iconX = this.width - this.padding * 2 - this.getIconWidth();
	    const textX = padding;
	    const numberX = textX + this.textWidth(this._currencyText) + elementSpacing;
	    this.drawIcon(Dungeonmind.DMS.goldIcon, iconX - padding + Dungeonmind.DMS.goldIconXOffset, y + Dungeonmind.DMS.goldIconYOffset);
	    this.changeTextColor(ColorManager.systemColor());
	    this.drawText(this._currencyText, textX + padding + Dungeonmind.DMS.goldTextXOffset, y + Dungeonmind.DMS.goldTextYOffset);
	    this.resetTextColor();
	    this.drawText($gameParty.gold(), numberX + padding + Dungeonmind.DMS.goldAmountXOffset, y + Dungeonmind.DMS.goldAmountYOffset);
	} else if (Dungeonmind.DMS.goldIconAlignment === 'right' && 
				Dungeonmind.DMS.goldNumberAlignment === 'left' && 
				Dungeonmind.DMS.goldTextAlignment === 'right') {
		const padding = 6;
	    const elementSpacing = Dungeonmind.DMS.goldWindowElementSpacing;
	    const iconX = this.width - this.padding * 2 - this.getIconWidth();
	    const textX = -(this.padding * 2) - elementSpacing - this.getIconWidth() - (padding + 4);
	    const numberX = padding;
	    const textAlignment = Dungeonmind.DMS.goldTextAlignment;
	    const numberAlignment = Dungeonmind.DMS.goldNumberAlignment;
	    this.drawIcon(Dungeonmind.DMS.goldIcon, iconX - padding + Dungeonmind.DMS.goldIconXOffset, y + Dungeonmind.DMS.goldIconYOffset);
	    this.changeTextColor(ColorManager.systemColor());
	    this.drawText(this._currencyText, textX + padding + Dungeonmind.DMS.goldTextXOffset, y + Dungeonmind.DMS.goldTextYOffset, this.width, textAlignment);
	    this.resetTextColor();
	    this.drawText($gameParty.gold(), numberX + Dungeonmind.DMS.goldAmountXOffset, y + Dungeonmind.DMS.goldAmountYOffset);
	}
};

Window_Gold.prototype.getIconWidth = function() {
	const iconIndex = Dungeonmind.DMS.goldIcon;
	return iconIndex > 0 ? ImageManager.iconWidth : 0;
};

//-----------------------------------------------------------------------------
// Window_MenuStatus
//-----------------------------------------------------------------------------

Dungeonmind.DMS.ALIAS_WindowMenuStatus_init = Window_MenuStatus.prototype.initialize;

Window_MenuStatus.prototype.initialize = function(rect) {
    Dungeonmind.DMS.ALIAS_WindowMenuStatus_init.call(this, rect);
    this.setBackgroundType($gameDynamicMenuSystem._windowMenuStatusBgType);
};

Window_MenuStatus.prototype.maxCols = function() {
    return $gameDynamicMenuSystem._windowMenuStatusMaxCols;
};

Window_MenuStatus.prototype.numVisibleRows = function() {
    return $gameDynamicMenuSystem._windowMenuStatusNumVisibleRows;
};

Window_MenuStatus.prototype.itemHeight = function() {
    return eval($gameDynamicMenuSystem._windowMenuStatusItemHeight);
};

Window_MenuStatus.prototype.drawItemStatus = function(index) { //*~ Function Overwritten.
    const actor = this.actor(index);
    const rect = this.itemRect(index);
    const x = rect.x + 180;
    const y = rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);
    this.drawActorSimpleStatus(actor, x, y, index); //Added index here!
};

Window_MenuStatus.prototype.drawActorSimpleStatus = function(actor, x, y, index) {
    const lineHeight = this.lineHeight();
    const x2 = x + 180;
    const rect = this.itemRect(index);

	if (Dungeonmind.DMS.actorNames) {
	    let nameX = eval(Dungeonmind.DMS.nameX);
	    if (Dungeonmind.DMS.actorNameIcon > 0) {
	        this.drawIcon(Dungeonmind.DMS.actorNameIcon, nameX + Dungeonmind.DMS.actorNameIconXOffset, eval(Dungeonmind.DMS.nameY) + Dungeonmind.DMS.actorNameIconYOffset);
	        nameX += ImageManager.iconWidth + Dungeonmind.DMS.actorNameIconXOffset;
	    }
	    this.drawActorName(actor, nameX, eval(Dungeonmind.DMS.nameY));
	}

	if (Dungeonmind.DMS.actorLevels) {
	    let levelX = eval(Dungeonmind.DMS.levelX);
	    if (Dungeonmind.DMS.actorLevelIcon > 0) {
	        this.drawIcon(Dungeonmind.DMS.actorLevelIcon, levelX + Dungeonmind.DMS.actorLevelIconXOffset, eval(Dungeonmind.DMS.levelY) + Dungeonmind.DMS.actorLevelIconYOffset);
	        levelX += ImageManager.iconWidth + Dungeonmind.DMS.actorLevelIconXOffset;
	    }
	    this.drawActorLevel(actor, levelX, eval(Dungeonmind.DMS.levelY));
	}

	if (Dungeonmind.DMS.actorStates) {
    	this.drawActorIcons(actor, eval(Dungeonmind.DMS.statesX), eval(Dungeonmind.DMS.statesY));
	}

    if (Dungeonmind.DMS.actorClasses) {
        let classX = eval(Dungeonmind.DMS.classX);
        if (Dungeonmind.DMS.actorClassIcon > 0) {
            this.drawIcon(Dungeonmind.DMS.actorClassIcon, classX + Dungeonmind.DMS.actorClassIconXOffset, eval(Dungeonmind.DMS.classY) + Dungeonmind.DMS.actorClassIconYOffset);
            classX += ImageManager.iconWidth + Dungeonmind.DMS.actorClassIconXOffset;
        }
        this.drawActorClass(actor, classX, eval(Dungeonmind.DMS.classY));
    }

    if (Dungeonmind.DMS.hpGauge) {
        const hpGaugeX = eval(Dungeonmind.DMS.hpGaugeX) + 180;
        const hpGaugeY = eval(Dungeonmind.DMS.hpGaugeY);
        this.placeGauge(actor, "hp", hpGaugeX, hpGaugeY);
    }

    if (Dungeonmind.DMS.mpGauge) {
        const mpGaugeX = eval(Dungeonmind.DMS.mpGaugeX) + 180;
        const mpGaugeY = eval(Dungeonmind.DMS.mpGaugeY);
        this.placeGauge(actor, "mp", mpGaugeX, mpGaugeY);
    }

    if (Dungeonmind.DMS.tpGauge) {
        const tpGaugeX = eval(Dungeonmind.DMS.tpGaugeX) + 180;
        const tpGaugeY = eval(Dungeonmind.DMS.tpGaugeY);
        this.placeGauge(actor, "tp", tpGaugeX, tpGaugeY);
    }

    if (Dungeonmind.DMS.expGauge) {
        const expGaugeX = eval(Dungeonmind.DMS.expGaugeX) + 180;
        const expGaugeY = eval(Dungeonmind.DMS.expGaugeY);
        this.placeGauge(actor, "exp", expGaugeX, expGaugeY);
    }
};

Window_MenuStatus.prototype.drawActorName = function(actor, x, y, width) {
    width = width || 168;
    this.changeTextColor(ColorManager.textColor(Dungeonmind.DMS.actorNameTextColor));
    this.drawText(actor.name(), x, y, width);
    this.resetTextColor();
};

Window_MenuStatus.prototype.drawActorLevel = function(actor, x, y) {
    this.changeTextColor(ColorManager.textColor(Dungeonmind.DMS.actorLevelTextColor));
    this.drawText(TextManager.levelA, x, y, 48);
    this.resetTextColor();
    this.drawText(actor.level, x + 84, y, 36, "right");
};

Window_MenuStatus.prototype.drawActorClass = function(actor, x, y, width) {
    width = width || 168;
    this.resetTextColor();
    this.drawText(actor.currentClass().name, x, y, width);
};

Window_MenuStatus.prototype.customGaugeWidth = function(type) { //*~ New Function.
    switch (type) {
        case "hp":
            return eval(Dungeonmind.DMS.hpGaugeWidth);
        case "mp":
            return eval(Dungeonmind.DMS.mpGaugeWidth);
        case "tp":
            return eval(Dungeonmind.DMS.tpGaugeWidth);
        default:
            return 128;
    }
};

Window_MenuStatus.prototype.customGaugeHeight = function(type) { //*~ New Function.
    switch (type) {
        case "hp":
            return eval(Dungeonmind.DMS.hpGaugeHeight);
        case "mp":
            return eval(Dungeonmind.DMS.mpGaugeHeight);
        case "tp":
            return eval(Dungeonmind.DMS.tpGaugeHeight);
        default:
            return 12;
    }
};

Window_MenuStatus.prototype.removeTextCodes = function(text) {
    text = text.replaceAll(/([0-9]+)(?=\])+/g,'');
    text = text.replaceAll('\\C[]','');
    text = text.replaceAll('\\c[]','');
    text = text.replaceAll('\\V[]','');
    text = text.replaceAll('\\v[]','');
    return text;
};

Window_MenuStatus.prototype.drawItemImage = function(index) {
    const actor = this.actor(index);
    const rect = this.itemRect(index);
    const width = ImageManager.standardFaceWidth;
    const height = rect.height - 2;
    this.changePaintOpacity(actor.isBattleMember());
    if (Dungeonmind.DMS.actorFaces) {
        this.drawActorFace(actor, eval(Dungeonmind.DMS.faceX), eval(Dungeonmind.DMS.faceY), width, height);
    }
    this.changePaintOpacity(true);
};

//*~ Fix for scrolling issues when using different variations of 
//max columns and numer of visible rows.

Window_MenuStatus.prototype.cursorDown = function(wrap) {
    const index = this.index();
    const maxItems = this.maxItems();
    const row = Math.floor(index / this.maxCols());
    const col = index % this.maxCols();
    const newRow = row + 1;
    const newIndex = newRow * this.maxCols() + col;
    if (newIndex < maxItems) {
        this.select(newIndex);
        if (newRow >= this.topRow() + this.numVisibleRows()) {
            this.setTopRow(this.topRow() + 1);
        }
    } else if (wrap) {
        this.select(col);
        this.setTopRow(0);
    }
};

Window_MenuStatus.prototype.cursorRight = function(wrap) {
    const index = this.index();
    const maxItems = this.maxItems();
    const row = Math.floor(index / this.maxCols());
    const col = index % this.maxCols();
    const newCol = col + 1;
    const newIndex = row * this.maxCols() + newCol;
    if (newIndex < maxItems) {
        this.select(newIndex);
    } else if (wrap) {
        this.select(row * this.maxCols());
    }
};

//-----------------------------------------------------------------------------
// Window_Base - Override Code for Face Scale and Opacity.
//-----------------------------------------------------------------------------

Window_Base.prototype.drawFace = function(
    faceName, faceIndex, x, y, width, height
) {
    width = width || ImageManager.standardFaceWidth;
    height = height || ImageManager.standardFaceHeight;
    const bitmap = ImageManager.loadFace(faceName);
    const pw = ImageManager.faceWidth;
    const ph = ImageManager.faceHeight;
    const sw = Math.min(width, pw);
    const sh = Math.min(height, ph);
    const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
    const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
    const originalOpacity = this.contents.paintOpacity;
    this.contents.paintOpacity = Dungeonmind.DMS.faceOpacity;
    const scaledWidth = sw * Dungeonmind.DMS.faceScale / 100;
    const scaledHeight = sh * Dungeonmind.DMS.faceScale / 100;
    const scaledDx = dx + (sw - scaledWidth) / 2;
    const scaledDy = dy + (sh - scaledHeight) / 2;
    this.contents.blt(bitmap, sx, sy, sw, sh, scaledDx, scaledDy, scaledWidth, scaledHeight);
    this.contents.paintOpacity = originalOpacity;
};

//-----------------------------------------------------------------------------
// Window_MenuCommand
//-----------------------------------------------------------------------------

Dungeonmind.DMS.ALIAS_WindowMenuCommand_init = Window_MenuCommand.prototype.initialize;

Window_MenuCommand.prototype.initialize = function(rect) {
    Dungeonmind.DMS.ALIAS_WindowMenuCommand_init.call(this, rect);
    this.setBackgroundType($gameDynamicMenuSystem._windowMenuCommandBgType);
};

Window_MenuCommand.prototype.itemTextAlign = function() {
    return 'left';
};

Window_MenuCommand.prototype.drawItem = function(index) {
    const rect = this.itemLineRect(index);
    const command = $gameDynamicMenuSystem._mainMenuCommands[index];
    const textWidth = this.textWidth(command.commandText);
    let x;
    this.changePaintOpacity(this.isCommandEnabled(command.symbol));
    if (command.mainMenuCommandIcon > 0) {
        const totalWidth = textWidth + ImageManager.iconWidth;
        if ($gameDynamicMenuSystem._windowMenuCommandTextAlignment === 'left') {
            x = rect.x;
            this.drawIcon(command.mainMenuCommandIcon, x + command.mainMenuCommandIconXOffset, rect.y + command.mainMenuCommandIconYOffset);
            this.drawText(command.commandText, x + ImageManager.iconWidth + command.mainMenuCommandIconXOffset, rect.y, rect.width);
        } else if ($gameDynamicMenuSystem._windowMenuCommandTextAlignment === 'right') {
            x = rect.x + rect.width - totalWidth;
            this.drawIcon(command.mainMenuCommandIcon, x + command.mainMenuCommandIconXOffset, rect.y + command.mainMenuCommandIconYOffset);
            this.drawText(command.commandText, x + ImageManager.iconWidth + command.mainMenuCommandIconXOffset, rect.y, rect.width);
        } else { // center
            x = rect.x + (rect.width - totalWidth) / 2;
            this.drawIcon(command.mainMenuCommandIcon, x + command.mainMenuCommandIconXOffset, rect.y + command.mainMenuCommandIconYOffset);
            this.drawText(command.commandText, x + ImageManager.iconWidth + command.mainMenuCommandIconXOffset, rect.y, rect.width);
        }
    } else {
        if ($gameDynamicMenuSystem._windowMenuCommandTextAlignment === 'left') {
            x = rect.x;
            this.drawText(command.commandText, x, rect.y, rect.width);
        } else if ($gameDynamicMenuSystem._windowMenuCommandTextAlignment === 'right') {
            x = rect.x + rect.width - textWidth;
            this.drawText(command.commandText, x, rect.y, rect.width);
        } else { // center
            x = rect.x + (rect.width - textWidth) / 2;
            this.drawText(command.commandText, x, rect.y, rect.width);
        }
    }
    this.changePaintOpacity(1);
};

Window_MenuCommand.prototype.isCommandEnabled = function(symbol) {
    const command = $gameDynamicMenuSystem._mainMenuCommands.find(cmd => cmd.symbol === symbol);
    return command && (typeof command.enabled === 'function' ? command.enabled.call(this) : command.enabled);
};

Object.setPrototypeOf(Window_MenuCommand.prototype, Window_HorzCommand.prototype);

Window_MenuCommand.prototype.makeCommandList = function() {
    $gameDynamicMenuSystem._mainMenuCommands.forEach((command) => {
        if (this.needsCommand(command.symbol)) {
            const enabled = (typeof command.enabled === 'function') ? command.enabled.call(this) : command.enabled;
            this.addCommand(command.commandText, command.symbol, enabled);
        }
    });
};

Window_MenuCommand.prototype.isCommandCustom = function() {
    return true;
};

Window_MenuCommand.prototype.processOk = function() {
    Window_MenuCommand._lastCommandSymbol = this.currentSymbol();
    if(Window_MenuCommand._lastCommandSymbol === 'item' 
        || Window_MenuCommand._lastCommandSymbol === 'skill'
        || Window_MenuCommand._lastCommandSymbol === 'equip'
        || Window_MenuCommand._lastCommandSymbol === 'status'
        || Window_MenuCommand._lastCommandSymbol === 'formation'
        || Window_MenuCommand._lastCommandSymbol === 'options'
        || Window_MenuCommand._lastCommandSymbol === 'save'
        || Window_MenuCommand._lastCommandSymbol === 'gameEnd') {
        Window_Command.prototype.processOk.call(this);
    } else {
        const index = this.index();
        $gameTemp.reserveCommonEvent($gameDynamicMenuSystem._mainMenuCommands[index].commonEvent);
        SceneManager.pop();
    }
};

Window_MenuCommand.prototype.maxCols = function() {
    return $gameDynamicMenuSystem._windowMenuCommandMaxCols;
};

Window_MenuCommand.prototype.cursorDown = function(wrap) {
    const index = this.index();
    const maxItems = this.maxItems();
    const row = Math.floor(index / this.maxCols());
    const col = index % this.maxCols();
    const newRow = row + 1;
    const newIndex = newRow * this.maxCols() + col;
    if (newIndex < maxItems) {
        this.smoothSelect(newIndex);
    } else if (wrap) {
        this.smoothSelect(col);
    }
};

Window_MenuCommand.prototype.cursorRight = function(wrap) {
    const index = this.index();
    const maxItems = this.maxItems();
    const row = Math.floor(index / this.maxCols());
    const col = index % this.maxCols();
    const newCol = col + 1;
    const newIndex = row * this.maxCols() + newCol;
    if (newIndex < maxItems) {
        this.smoothSelect(newIndex);
    } else if (wrap) {
        this.smoothSelect(row * this.maxCols());
    }
};

//-----------------------------------------------------------------------------
// Window_MainMenuCustomInfo
//-----------------------------------------------------------------------------

function Window_MainMenuCustomInfo() {
    this.initialize(...arguments);
}

Window_MainMenuCustomInfo.prototype = Object.create(Window_Base.prototype);
Window_MainMenuCustomInfo.prototype.constructor = Window_MainMenuCustomInfo;

Window_MainMenuCustomInfo.prototype.initialize = function(rect, text, index) {
    Window_Base.prototype.initialize.call(this, rect);
    this._windowIndex = index;
    this._text = text;
    this._rect = rect;
    this.refresh();
};

Window_MainMenuCustomInfo.prototype.refresh = function() {
    this.contents.clear();
    this.drawCustomText(this._text);
    const customMainMenuInfoWindow = $gameDynamicMenuSystem._customMainMenuInfoWindow;
    if (customMainMenuInfoWindow.customGauge) {
        this.drawGauges(customMainMenuInfoWindow.customGauge);
    }
};

Window_MainMenuCustomInfo.prototype.drawCustomText = function(text) {
    if(text) {
        const x = 0;
        const y = 0;
        const maxWidth = this.width;
        this.drawTextEx(text, x, y + 5, maxWidth);
    }
};

Window_MainMenuCustomInfo.prototype.drawGauges = function(gauge) {
    const x = gauge.customGaugeX ? eval(gauge.customGaugeX.replace('rect.x', '0')) : 0;
    const y = gauge.customGaugeY ? eval(gauge.customGaugeY.replace('rect.y', '0')) : 0;
    const width = gauge.customGaugeWidth ? eval(gauge.customGaugeWidth) : 0;
    const height = gauge.customGaugeHeight ? eval(gauge.customGaugeHeight) : 0;
    let currentValue, maxValue;
    if (gauge.dynamicVariables) {
        currentValue = gauge.initialCurrentValue;
        maxValue = gauge.maxValue;
    } else if (gauge.gameVariables) {
        currentValue = $gameVariables.value(gauge.currentValueVariableId);
        maxValue = $gameVariables.value(gauge.maxValueVariableId);
    } else {
        console.warn(`Gauge is not properly configured. Neither game variables nor dynamic variables are enabled.`);
        return;
    }
    // Draw gauge
    this.drawGauge(x, y, width, height, currentValue, maxValue, gauge);
};

Window_MainMenuCustomInfo.prototype.drawGauge = function(x, y, width, height, currentValue, maxValue, gauge) {
    if (maxValue <= 0) return;
    const rate = currentValue / maxValue;
    const fillW = Math.floor(width * rate);
    const color0 = this.gaugeBackColor(gauge.customGaugeBGColor);
    const color1 = this.gaugeColor1(gauge.customGaugeColor1);
    const color2 = this.gaugeColor2(gauge.customGaugeColor2);
    this.contents.fillRect(x, y, width, height, color0);
    this.contents.gradientFillRect(x, y, fillW, height, color1, color2);
};

Window_MainMenuCustomInfo.prototype.gaugeBackColor = function(colorIndex) {
    return ColorManager.textColor(colorIndex);
};

Window_MainMenuCustomInfo.prototype.gaugeColor1 = function(colorIndex) {
    return ColorManager.textColor(colorIndex);
};

Window_MainMenuCustomInfo.prototype.gaugeColor2 = function(colorIndex) {
    return ColorManager.textColor(colorIndex);
};

//-----------------------------------------------------------------------------
// Sprite_Gauge
//-----------------------------------------------------------------------------

Sprite_Gauge.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
    this.createBitmap();
    this.updateBitmap();
};

Sprite_Gauge.prototype.customGaugeWidth = function() { 
    switch (this._statusType) {
        case "hp":
            return eval(Dungeonmind.DMS.hpGaugeWidth);
        case "mp":
            return eval(Dungeonmind.DMS.mpGaugeWidth);
        case "tp":
            return eval(Dungeonmind.DMS.tpGaugeWidth);
        case "exp":
            return eval(Dungeonmind.DMS.expGaugeWidth);
        default:
            return 128;
    }
};

Sprite_Gauge.prototype.customGaugeHeight = function() { 
    switch (this._statusType) {
        case "hp":
            return eval(Dungeonmind.DMS.hpGaugeHeight);
        case "mp":
            return eval(Dungeonmind.DMS.mpGaugeHeight);
        case "tp":
            return eval(Dungeonmind.DMS.tpGaugeHeight);
        case "exp":
            return eval(Dungeonmind.DMS.expGaugeHeight);
        default:
            return 12;
    }
};

Sprite_Gauge.prototype.customGaugeBackColor = function() { 
    switch (this._statusType) {
        case "hp":
            return ColorManager.textColor(Dungeonmind.DMS.hpGaugeBGColor);
        case "mp":
            return ColorManager.textColor(Dungeonmind.DMS.mpGaugeBGColor);
        case "tp":
            return ColorManager.textColor(Dungeonmind.DMS.tpGaugeBGColor);
        case "exp":
            return ColorManager.textColor(Dungeonmind.DMS.expGaugeBGColor);
        default:
            return ColorManager.gaugeBackColor();
    }  
};

Sprite_Gauge.prototype.customGaugeColor1 = function() {
    switch (this._statusType) {
        case "hp":
            return ColorManager.textColor(Dungeonmind.DMS.hpGaugeColor1);
        case "mp":
            return ColorManager.textColor(Dungeonmind.DMS.mpGaugeColor1);
        case "tp":
            return ColorManager.textColor(Dungeonmind.DMS.tpGaugeColor1);
        case "exp":
            return ColorManager.textColor(Dungeonmind.DMS.expGaugeColor1);
        default:
            return ColorManager.normalColor();
    }
};

Sprite_Gauge.prototype.customGaugeColor2 = function() {
    switch (this._statusType) {
        case "hp":
            return ColorManager.textColor(Dungeonmind.DMS.hpGaugeColor2);
        case "mp":
            return ColorManager.textColor(Dungeonmind.DMS.mpGaugeColor2);
        case "tp":
            return ColorManager.textColor(Dungeonmind.DMS.tpGaugeColor2);
        case "exp":
            return ColorManager.textColor(Dungeonmind.DMS.expGaugeColor2);
        default:
            return ColorManager.normalColor();
    }
};

Sprite_Gauge.prototype.customLabel = function() {
    switch (this._statusType) {
        case "hp":
            return Dungeonmind.DMS.hpGaugeLabelText;
        case "mp":
            return Dungeonmind.DMS.mpGaugeLabelText;
        case "tp":
            return Dungeonmind.DMS.tpGaugeLabelText;
        case "exp":
            return Dungeonmind.DMS.expGaugeLabelText;
        default:
            return "";
    }
};

Sprite_Gauge.prototype.customLabelX = function() {
    switch (this._statusType) {
        case "hp":
            return eval(Dungeonmind.DMS.hpGaugeLabelX);
        case "mp":
            return eval(Dungeonmind.DMS.mpGaugeLabelX);
        case "tp":
            return eval(Dungeonmind.DMS.tpGaugeLabelX);
        case "exp":
            return eval(Dungeonmind.DMS.expGaugeLabelX);
        default:
            return this.labelOutlineWidth() / 2;
    }
};

Sprite_Gauge.prototype.customLabelY = function() {
    switch (this._statusType) {
        case "hp":
            return eval(Dungeonmind.DMS.hpGaugeLabelY);
        case "mp":
            return eval(Dungeonmind.DMS.mpGaugeLabelY);
        case "tp":
            return eval(Dungeonmind.DMS.tpGaugeLabelY);
        case "exp":
            return eval(Dungeonmind.DMS.expGaugeLabelY);
        default:
            return 5;
    }
};

Sprite_Gauge.prototype.currentValue = function() {
    if (this._battler) {
        switch (this._statusType) {
            case "hp":
                return this._battler.hp;
            case "mp":
                return this._battler.mp;
            case "tp":
                return this._battler.tp;
            case "exp":
                return this._battler.currentExp() - this._battler.currentLevelExp();
            default:
                return 0;
        }
    } else {
        return 0;
    }
};

Sprite_Gauge.prototype.currentMaxValue = function() {
    if (this._battler) {
        switch (this._statusType) {
            case "hp":
                return this._battler.mhp;
            case "mp":
                return this._battler.mmp;
            case "tp":
                return this._battler.maxTp();
            case "exp":
                return this._battler.nextLevelExp() - this._battler.currentLevelExp();
            default:
                return 0;
        }
    } else {
        return 0;
    }
};

Dungeonmind.DMS.ALIAS_SpriteGauge_bitmapWidth = Sprite_Gauge.prototype.bitmapWidth;

Sprite_Gauge.prototype.bitmapWidth = function() {
    if(!(SceneManager._scene instanceof Scene_Menu)) {
        return Dungeonmind.DMS.ALIAS_SpriteGauge_bitmapWidth.call(this);
    } else {
        return this.customGaugeWidth(this._statusType);
    }
};

Dungeonmind.DMS.ALIAS_SpriteGauge_gaugeHeight = Sprite_Gauge.prototype.gaugeHeight;

Sprite_Gauge.prototype.gaugeHeight = function() {
    if(!(SceneManager._scene instanceof Scene_Menu)) {
        return Dungeonmind.DMS.ALIAS_SpriteGauge_gaugeHeight.call(this);
    } else {
        return this.customGaugeHeight(this._statusType);
    }
};

Dungeonmind.DMS.ALIAS_SpriteGauge_gaugeBackColor = Sprite_Gauge.prototype.gaugeBackColor;

Sprite_Gauge.prototype.gaugeBackColor = function() {
    if (!(SceneManager._scene instanceof Scene_Menu)) {
        return Dungeonmind.DMS.ALIAS_SpriteGauge_gaugeBackColor.call(this);
    } else {
        return this.customGaugeBackColor();
    }  
};

Dungeonmind.DMS.ALIAS_SpriteGauge_gaugeColor1 = Sprite_Gauge.prototype.gaugeColor1;

Sprite_Gauge.prototype.gaugeColor1 = function() {
    if (!(SceneManager._scene instanceof Scene_Menu)) {
        return Dungeonmind.DMS.ALIAS_SpriteGauge_gaugeColor1.call(this);
    } else {
        return this.customGaugeColor1();
    }
};

Dungeonmind.DMS.ALIAS_SpriteGauge_gaugeColor2 = Sprite_Gauge.prototype.gaugeColor2;

Sprite_Gauge.prototype.gaugeColor2 = function() {
    if (!(SceneManager._scene instanceof Scene_Menu)) {
        return Dungeonmind.DMS.ALIAS_SpriteGauge_gaugeColor2.call(this);
    } else {
        return this.customGaugeColor2();
    }
};

Dungeonmind.DMS.ALIAS_SpriteGauge_drawLabel = Sprite_Gauge.prototype.drawLabel;

Sprite_Gauge.prototype.drawLabel = function() {
    if (!(SceneManager._scene instanceof Scene_Menu)) {
        return Dungeonmind.DMS.ALIAS_SpriteGauge_drawLabel.call(this);
    } else {
        const label = this.customLabel();
        const x = this.customLabelX();
        const y = this.customLabelY();
        const width = this.bitmapWidth();
        const height = this.textHeight();
        this.setupLabelFont();
        this.bitmap.paintOpacity = this.labelOpacity();
        this.bitmap.drawText(label, x, y, width, height, "left");
        this.bitmap.paintOpacity = 255;
    }
};

Sprite_Gauge.prototype.labelFontSize = function() {
    return $gameSystem.mainFontSize();
};

Sprite_Gauge.prototype.valueFontSize = function() {
    return $gameSystem.mainFontSize();
};

//=============================================================================
// Expose APIs
//=============================================================================

window.Game_DynamicMenuSystem = Game_DynamicMenuSystem;

})();
