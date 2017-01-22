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

let SystemException = require("../wi.core.exception.js"),
    TemplateEngine = require("../wi.core.template.js");

module.exports = {
    /**
     * List of commands
     */
    commands: {},
    
    /**
     * List module assets
     * @type object
     */
    assets: {
        js: [__dirname + "/node_modules/mousetrap/mousetrap.min.js"]
    },
    
    /**
     * Function to add command
     * 
     * @params object item
     * @return this
     */ 
    addCommand: function(item){
        if(typeof item == "object"){
            if(typeof item.name == "string")
                this.commands[item.name] = item;
            else
                throw new SystemException("Could not register command due to missing valid name.");
        }
        else{
            throw new SystemException("The default value for command items is 'object'.");
        }
        
        return this;
    },
    
    /**
     * Function to bind keymaps from Atom packages
     * 
     * @params object keymapsFile
     * @return void
     */
    addAtomKeymaps: function(keymapsFile){
        for(let key in keymapsFile){
            for(let shurtcut in keymapsFile[key]){
                this.addCommand({                    
                    name: keymapsFile[key][shurtcut],
                    bind: {win: shurtcut},
                    event: "webide.atom.call('" + keymapsFile[key][shurtcut] + "')"
                });
            }
        }
    },
    
    /**
     * Function to return all commands
     * 
     * @return object
     */
    getAll: function(){
        return this.commands;
    },
    
    /**
     * Function to return command by name
     * 
     * @param string name
     * @return mixed
     */
    get: function(name){
        if(this.commands[name])
            return this.commands[name];
        else
            return null;
    },
    
    /**
     * Module startup function
     * 
     * @param object app
     * @return this
     */
    bootstrap: function(_this){
        let commandList = this.getAll();
        
        for(let commandName in commandList){
            if(typeof commandList[commandName].route == "object" && typeof commandList[commandName].exec == "function"){
                if(typeof commandList[commandName].middleware == "object"){
                    for(let middlewareKey in commandList[commandName].middleware)
                        if(typeof commandList[commandName].middleware[middlewareKey] == "function")
                            _this.app.use(commandList[commandName].middleware[middlewareKey]);
                }
               
                switch(commandList[commandName].route.method){
                    case "GET": _this.app.get(commandList[commandName].route.pattern, commandList[commandName].exec); break;
                    case "POST": _this.app.post(commandList[commandName].route.pattern, commandList[commandName].exec); break;
                    case "PUT": _this.app.put(commandList[commandName].route.pattern, commandList[commandName].exec); break;
                    case "DELETE": _this.app.delete(commandList[commandName].route.pattern, commandList[commandName].exec); break;
                }
            }
        }
        
        return this;
    },
    
    /**
     * Function to execute command
     * 
     * @param string name
     * @return this
     */
    exec: function(name, params){
        if(typeof name == "string"){
            if(this.commands[name]){
                if(typeof this.commands[name].exec == "function")
                    this.commands[name].exec.apply(this, params);
                else
                    throw new SystemException(`The '${name}' command has no callback function`);
            }
            else{
                throw new SystemException(`The command '${name}' was not found`);
            }
        }
        else{
            throw new SystemException("The default value for command name is 'string'.");
        }
        
        return this;
    },
    
    /**
     * Function to generate template
     * 
     * @param object _this
     * @return string
     */
    getTemplate: function(_this){
        return TemplateEngine(__dirname + "/template.ejs").seti18n(_this.i18n).render({commands: JSON.stringify(this.commands)});
    }
};