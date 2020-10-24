import {$} from "@core/dom";

export function resize($root,event) {

        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizable"');
        const coords = $parent.getCoords()
        const params = event.target.dataset.resize == 'col'
            ? {axes:'pageX',size:'width',coords:'right',direction:'bottom'}
            : {axes:'pageY',size:'height',coords:'bottom',direction:'right'};
        let value

        $resizer.css({
            opacity:1,
            [params.direction]:'-5000px',
        })

        document.onmousemove = e => {
            const delta = e[params.axes] - coords[params.coords]
            value = (coords[params.size]+delta);
            $resizer.css({[params.coords]: -delta+'px'})
        }

        document.onmouseup = () => {
            document.onmousemove = null
            $resizer.css({opacity:0,bottom: 0,right: 0})
            $parent.css({[params.size] : value + 'px'});
            $root.findAll(`[data-col="${$parent.data.col}"]`)
                .forEach(el => el.style[params.size] = value + 'px')
        }

}