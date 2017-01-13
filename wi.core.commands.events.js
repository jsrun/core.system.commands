/**
 *  __          __  _    _____ _____  ______ 
 *  \ \        / / | |  |_   _|  __ \|  ____|
 *   \ \  /\  / /__| |__  | | | |  | | |__   
 *    \ \/  \/ / _ \ '_ \ | | | |  | |  __|  
 *     \  /\  /  __/ |_) || |_| |__| | |____ 
 *      \/  \/ \___|_.__/_____|_____/|______|
 *                                                                            
 *  @author André Ferreira <andrehrf@gmail.com>
 *  @license MIT
 */

"use strict";

(function(){
    /**
     * Function for command call
     * 
     * @param object elem
     * @param string command
     * @return void
     */
    webide.commands.call = function(elem, command){
        if(webide.commands.map[command]){
            if(typeof webide.commands.map[command].onclick == "string" || typeof webide.commands.map[command].onclick == "function")
                webide.commands.exec(webide.commands.map[command].onclick);
            else
                console.error("By default the onclick of the commands must be in the format string or function: ", command);
        }
        else{
            console.error("Unregistered command: ", command);
        }
    };  
    
    /**
     * Function to perform command function
     * 
     * @param string|function event
     * @return void
     */
    webide.commands.exec = function(event){
        if(typeof event == "function")
            event();
        else if(typeof event == "string")
            eval(event);
    };
    
    /**
     * Function for setting up shortcuts
     * 
     * @return void
     */
    webide.commands.bindShortcuts = function(){
        if(Mousetrap){
            for(var keyCommandsMap in webide.commands.map){
                if(typeof webide.commands.map[keyCommandsMap].bind == "object" && (typeof webide.commands.map[keyCommandsMap].onclick == "string" || typeof webide.commands.map[keyCommandsMap].onclick == "function")){
                    var bindsArr = [];

                    if(webide.commands.map[keyCommandsMap].bind.win)
                        bindsArr.push(webide.commands.map[keyCommandsMap].bind.win.replace(/-/img, "+").toLowerCase());
                    if(webide.commands.map[keyCommandsMap].bind.mac)
                        bindsArr.push(webide.commands.map[keyCommandsMap].bind.mac.replace(/-/img, "+").toLowerCase());

                    (function(bind, action){
                        Mousetrap.bind(bind, function(e) {
                            webide.commands.exec(action);
                            return false;
                        });
                    })(bindsArr, webide.commands.map[keyCommandsMap].onclick);
                }
                else{
                    console.error("The command default is bind being object and onclick as function or string: ", keyCommandsMap);
                }
            }
        }
        else{
            console.error("The Mousetrap plugin was not found, please perform the WebIDE re-installation process");
        }
    };
    
    webide.commands.bindShortcuts();
})();