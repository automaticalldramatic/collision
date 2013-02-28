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
			defaultCarPositionX: 100,
			defaultCarPositionY: 200,
			currentCarPosX: '',
			currentCarPosY: '',
			carSpeed: 5000,

			defaultWallPositionX: 700,
			defaultWallPositionY: 60,
			currentWallPosX: '',
			currentWallPosY: '',

			carSize: 128,
			wallSize: 128,

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

			moveCar: function(sign) {
				var left = ( sign == "-" ) ? config.defaultCarPositionX + "px" : (config.defaultWallPositionX - config.carSize) + "px" ;
				$(config.CSS.ids.car).animate({ "left": left}, {
					duration: config.carSpeed,
					step    : function(now, fx) {
						config.currentCarPosX = $(config.CSS.ids.car).position().left;
						helpers.testCollision(sign);
					},
					queue   : true,
					complete: function() {
						ui.moveCar
					}
				});
			},

			triggerExplosion: function() {
				helpers.stopcar();
				$(config.CSS.ids.bang).show();
			}
		};

		var helpers = {
			playpause: function() {
				if($(config.CSS.ids.playpause).hasClass(config.CSS.classes.active)) {
					helpers.stopcar();
					return;
				}
				$(config.CSS.ids.rewind).removeClass(config.CSS.classes.active).addClass(config.CSS.classes.inactive);	
				$(config.CSS.ids.playpause).removeClass(config.CSS.classes.inactive).addClass(config.CSS.classes.active).attr('title', 'Pause').html('Pause');
				ui.moveCar('+');
			},

			stopcar: function() {
				$(config.CSS.ids.playpause).removeClass(config.CSS.classes.active).addClass(config.CSS.classes.inactive).attr('title', 'Play').html('Play');
				$(config.CSS.ids.rewind).removeClass(config.CSS.classes.active).addClass(config.CSS.classes.inactive);
				$(config.CSS.ids.car).stop();
			},

			rewind: function() {
				if ($(config.CSS.ids.playpause).hasClass(config.CSS.classes.active)) return;
				if ($(config.CSS.ids.bang).is(":visible")) {
					$(config.CSS.ids.bang).animate(
						{ width: '100%' }, {
						duration: 1000,
						complete: $(config.CSS.ids.bang).hide()
					});
				}
				$(config.CSS.ids.rewind).removeClass(config.CSS.classes.inactive).addClass(config.CSS.classes.active);
				ui.moveCar('-');
			},

			testCollision: function (sign) {
				if(sign == "+") {
					if((config.currentCarPosX  + config.carSize) >= config.defaultWallPositionX) ui.triggerExplosion();
					
				} else {
					if(config.currentCarPosX - 10 <= config.defaultCarPositionX)	helpers.stopcar();
				}
			}
		};

		return {
			'ui':ui
		};
	}();

	playCollision.ui.init();
})();