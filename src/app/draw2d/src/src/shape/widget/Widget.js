
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.shape.widget.Widget
 * Base class for all diagrams.
 * 
 * @extends draw2d.SetFigure
 */
draw2d.shape.widget.Widget = draw2d.SetFigure.extend({
    
    init: function( attr , setter, getter ){
        this._super( attr, setter, getter);
    }
});