
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/

/**
 * @class draw2d.shape.node.HorizontalBus
 * 
 * A horizontal bus shape with a special kind of port handling. The hole figure is a hybrid port.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var figure =  new draw2d.shape.node.HorizontalBus({width:300, height:20, text:"Horizontal Bus"});
 *     
 *     canvas.add(figure,50,10);
 *     
 * @extends draw2d.shape.node.Hub
 */
draw2d.shape.node.HorizontalBus = draw2d.shape.node.Hub.extend({

    NAME : "draw2d.shape.node.HorizontalBus",

	/**
	 * @constructor
	 * 
     * @param {Object} [attr] the configuration of the shape
	 */
	init: function(attr, setter, getter )
    {
        this._super(attr, setter, getter);
        
        this.setConnectionDirStrategy(1);

        this.installEditPolicy(new draw2d.policy.figure.HBusSelectionFeedbackPolicy());
    }
    
});
