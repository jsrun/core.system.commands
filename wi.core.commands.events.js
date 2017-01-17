/**
 *  __          __  _    _____ _____  ______   _____                                          _     
 *  \ \        / / | |  |_   _|  __ \|  ____| / ____|                                        | |    
 *   \ \  /\  / /__| |__  | | | |  | | |__   | |     ___  _ __ ___  _ __ ___   __ _ _ __   __| |___ 
 *    \ \/  \/ / _ \ '_ \ | | | |  | |  __|  | |    / _ \| '_ ` _ \| '_ ` _ \ / _` | '_ \ / _` / __|
 *     \  /\  /  __/ |_) || |_| |__| | |____ | |___| (_) | | | | | | | | | | | (_| | | | | (_| \__ \
 *      \/  \/ \___|_.__/_____|_____/|______(_)_____\___/|_| |_| |_|_| |_| |_|\__,_|_| |_|\__,_|___/      
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
        console.log(command);
        if(webide.commands.map[command]){
            if(typeof webide.commands.map[command].event == "string" || typeof webide.commands.map[command].event == "function")
                webide.commands.exec(webide.commands.map[command].event);
            else
                console.error("By default the event of the commands must be in the format string or function: ", command);
        }
        else{
            console.error("Unregistered command: ", command);
        }
    };  
    
    /**
     * Function to associate command name to function
     * 
     * @param string command
     * @param function fn
     * @return void
     */
    webide.commands.add = function(command, fn){
        if(!webide.commands.map[command])
            webide.commands.map[command] = {event: fn};
        else
            webide.commands.map[command].event = fn;
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
                if(typeof webide.commands.map[keyCommandsMap].bind == "object"){
                    var bindsArr = [];

                    if(webide.commands.map[keyCommandsMap].bind.win)
                        bindsArr.push(webide.commands.map[keyCommandsMap].bind.win.replace(/-/img, "+").toLowerCase());
                    if(webide.commands.map[keyCommandsMap].bind.mac)
                        bindsArr.push(webide.commands.map[keyCommandsMap].bind.mac.replace(/-/img, "+").toLowerCase());

                    (function(bind, action){
                        Mousetrap.bind(bind, function(e) {
                            webide.commands.call(null, action);
                            return false;
                        });
                    })(bindsArr, keyCommandsMap);
                }
            }
        }
        else{
            console.error("The Mousetrap plugin was not found, please perform the WebIDE re-installation process");
        }
    };
    
    webide.commands.bindShortcuts();
})();