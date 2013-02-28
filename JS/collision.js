/**
 * Main JS file for collision.
 * @author Rizwan Iqbal <mailme@rizwaniqbal.com>
 * @see https://bitbucket.org/rizwaniqbal/collision/overview
 */
(function(undefined) {
	"use strict"

	if(jQuery === undefined)
		return;
	var $ = window.jQuery;

	var playCollision = function() {

		var config = {

			autostart: false,

			CSS: {
				
				classes: {
					hover: 'hover',
					active: 'active',
					inactive: 'inactive',
					loading: 'loading'
				},

				ids: {
					canvas: '#canvas',
					car: '#car',
					wall: '#wall',
					bang: '#bang',
					playpause: '#playpause',
					rewind: '#rewind'
				}
			},

			//Car Config
			defaultCarPositionX: '100',
			defaultCarPositionY: '200',
			currentCarPosX: '',
			currentCarPosY: '',
			carSpeed: 5000,

			defaultWallPositionX: '700',
			defaultWallPositionY: '60',
			currentWallPosX: '',
			currentWallPosY: '',

			carSize: '',
			wallSize: '',

			explosionInProgress: false
		};

		var ui = {

			/**
			 * Event bindings on the DOM. Call it before painting the div.
			 */
			bindings: function() {
				//Bind the Pagination click events
				$(config.CSS.ids.playpause).on('click', function() {
					helpers.playpause();
				});

				$(config.CSS.ids.rewind).on('click', function() {
					helpers.rewind();
				});

				return this;
			},

			/**
			 * Initialize the whole UI. Make things work!!
			 * Ideally we would paing the whole UI using this.
			 * Cause we need this by EOD, lets skip this and have UI setup
			 */
			init: function() {
				ui.bindings();
				$(config.CSS.ids.car).css('left', config.defaultCarPositionX + 'px');
				$(config.CSS.ids.car).css('top', config.defaultCarPositionY + 'px');

				$(config.CSS.ids.wall).css('left', config.defaultWallPositionX + 'px');
				$(config.CSS.ids.wall).css('top', config.defaultWallPositionY + 'px');

				config.currentCarPosX = config.defaultCarPositionX;
				config.currentCarPosY = config.defaultCarPositionY;

				config.currentWallPosX = config.defaultWallPositionX;
				config.currentWallPosY =  config.defaultWallPositionY;

				if(config.autostart) helpers.playpause();
			},

			moveCarForward: function() {
				$(config.CSS.ids.rewind).removeClass(config.CSS.classes.active).addClass(config.CSS.classes.inactive);	
				$(config.CSS.ids.playpause).removeClass(config.CSS.classes.inactive).addClass(config.CSS.classes.active).attr('title', 'Pause').html('Pause');
				var left = $(config.CSS.ids.car).position().left - $(config.CSS.ids.wall).position().left;
				$(config.CSS.ids.car).animate({ "left": "-=" + left + "px"}, {
					duration: config.carSpeed,
					step    : function(now, fx) {
						helpers.testCollision($(config.CSS.ids.car).position(), config.carSize, $(config.CSS.ids.wall).position(), config.wallSize);
					},
					queue   : false,
					complete: ui.moveCarForward
				});
			}
		};

		var helpers = {
			playpause: function() {
				if($(config.CSS.ids.playpause).hasClass(config.CSS.classes.active)) {
					helpers.stopcar();
					return;
				}
				ui.moveCarForward();
			},

			stopcar: function() {
				$(config.CSS.ids.playpause).removeClass(config.CSS.classes.active).addClass(config.CSS.classes.inactive).attr('title', 'Play').html('Play');
				console.log('stopcar');
			},

			rewind: function() {
				if ($(config.CSS.ids.playpause).hasClass(config.CSS.classes.active)) return;

				$(config.CSS.ids.rewind).removeClass(config.CSS.classes.inactive).addClass(config.CSS.classes.active);
				console.log('rewind');
			},

			testCollision: function () {
				
			}
		};

		return {
			'ui':ui
		};
	}();

	playCollision.ui.init();
})();