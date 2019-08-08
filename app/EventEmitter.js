export default class EventEmitter{

    constructor(){
        this._handlersByType = new Map();
    }

    addEventListener(eventType, eventHandler, options){
        let handlers = this._handlersByType.get(eventType);

        if(!handlers){
            handlers = new Map();
            this._handlersByType.set(eventType, handlers);
        }
        
        handlers.set(eventHandler, options);
    }

    removeEventListener(eventType, handler){
        const handlers = this._handlersByType.get(eventType)

        if(handlers){
            handlers.remove(handler);
        }
    }

    removeAll(eventType){
        this._handlersByType.remove(eventType);
    }

    /**
     * @param {Event} event
     */
    dispatchEvent(event){
        const handlersForType = this._handlersByType.get(event.type);

        if(handlersForType && handlersForType.size > 0){
            for(let eventHandler of handlersForType.keys()){
                const options = handlersForType.get(eventHandler) || {};
                
                eventHandler.call(options.scope || this, event);

                if(options.once){
                    this.removeEventListener(eventHandler)
                }
            }    
        }
    }
}