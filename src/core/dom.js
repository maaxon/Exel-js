class Dom {
    constructor(selector){
        this.$el = typeof  selector === 'string'
            ? document.querySelector(selector)
            : selector
    }
    html(html){
        if (typeof html === 'string'){
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    clear(){
        this.html('');
        return this
    }

    off(eventType,callback){
        this.$el.removeEventListener(eventType,callback)
    }

    on(eventType,callback){
        this.$el.addEventListener(eventType,callback)
    }

    closest(selector){
       return $(this.$el.closest(selector))
    }

    getCoords(){
        return this.$el.getBoundingClientRect()
    }

    get data(){
        return this.$el.dataset
    }

    append(node){
        node = node instanceof Dom ? node.$el:node;
        if (Element.prototype.append){
            this.$el.append(node)
        }
        else {
            this.$el.appendChild(node)
        }
        return this
    }

    findAll(selector){
        return this.$el.querySelectorAll(selector)
    }
    css(styles ={}){
            Object.keys(styles).forEach(key =>{
                this.$el.style[key] = styles[key]
            })
    }
}


export function $(selector) {
    return new Dom(selector)
}

$.create  = (tagName,classes = '') =>{
    const el = document.createElement(tagName);
    if (classes){
        el.classList.add(classes)
    }
    return $(el)
}

