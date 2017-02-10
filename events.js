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

webide.module("commands", function(){
    this.commands = {
        /**
         * Commands list
         * @object
         */
        map: {},
        
        /**
         * Function for command call
         * 
         * @param object elem
         * @param string command
         * @return void
         */
        call: function(elem, command, args){
            try{
                if(this.map[command]){
                    args = args || this.map[command].args;

                    if(typeof this.map[command].event == "string" || typeof this.map[command].event == "function")
                        this.exec(this.map[command].event, args);
                    else
                        console.error("By default the event of the commands must be in the format string or function: ", command);
                }
                else{
                    console.error("Unregistered command: ", command);
                }
            }
            catch(e) { 
                console.log(e.message);
            }
        },
        
        /**
         * Function to associate existing map
         * 
         * @param object map
         * @return void
         */
        assignMap: function(map){
            for(var key in map){
                if(!this.map[key]){
                    this.map[key] = map[key];
                }
                else{
                    for(var key2 in map[key])
                        this.map[key][key2] = map[key][key2];
                }
            }
        },
        
        /**
         * Function to associate command name to function
         * 
         * @param string command
         * @param function fn
         * @return void
         */
        add: function(command, fn, args){
            if(!this.map[command]){
                this.map[command] = {event: fn, args: args};
            }
            else{
                this.map[command].event = fn;
                this.map[command].args = args;
            }
        },
        
        /**
         * Function to perform command function
         * 
         * @param string|function event
         * @return void
         */
        exec: function(event, args){
            if(typeof event == "function")
                event(args);
            else if(typeof event == "string")
                eval(event);
        },
        
        /**
         * Function for setting up shortcuts
         * 
         * @return void
         */
        bindShortcuts: function(){
            if(Mousetrap){
                for(var keyCommandsMap in this.map){
                    if(typeof this.map[keyCommandsMap].bind == "object"){
                        var bindsArr = [];

                        if(this.map[keyCommandsMap].bind.win)
                            bindsArr.push(this.map[keyCommandsMap].bind.win.replace(/-/img, "+").toLowerCase());
                        if(this.map[keyCommandsMap].bind.mac)
                            bindsArr.push(this.map[keyCommandsMap].bind.mac.replace(/-/img, "+").toLowerCase());

                        (function(bind, action, args){
                            Mousetrap.bind(bind, function(e) {
                                webide.commands.call(null, action, args);
                                return false;
                            });
                        })(bindsArr, keyCommandsMap, this.map[keyCommandsMap].args);
                    }
                }
            }
            else{
                console.error("The Mousetrap plugin was not found, please perform the WebIDE re-installation process");
            }
        }
    };
});