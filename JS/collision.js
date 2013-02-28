/**
 * Main JS file for collision.
 * @author Rizwan Iqbal <mailme@rizwaniqbal.com>
 * @see https://bitbucket.org/rizwaniqbal/collision/overview
 */
(function(rizwanCollision) {
	"use strict"

	if(jQuery === undefined)
		return
	var $ = window.jQuery;

	function playCollision = function() {

		var config() = {

			CSS: {
				
				classes: {

				},

				ids: {

				}
			},

			defaultCarPositionX: '50',
			defaultCarPositionY: '200',

			defaultWallPositionX: '700',
			defaultWallPositionY: '190',
		};

		var ui = {};

		var helpers = {};

		/**
		 * Initialize the whole UI. Make things work!!
		 */
		function init() {
		}

		return {
			'init':init
		};
	}();

	rizwanCollision.init();
});