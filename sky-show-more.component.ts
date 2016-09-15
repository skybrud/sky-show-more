(function() {
    "use strict";

    angular.module('skyShowMore').component('skyShowMore',{
        bindings: {
            showLabel: '@',
            hideLabel: '@',
        },
        transclude: true,
        controller: skyShowMoreController,
        templateUrl: '/sky-show-more/sky-show-more.template.html',
    });

    skyShowMoreController.$inject = ['$element', 'skyVisible'];

    function skyShowMoreController($element, skyVisible){
        let container;
        let content;

        this.$postLink = () => {
            container = $element[0].querySelector('.sky-show-more-container');
            content = $element[0].querySelector('.sky-show-more-content');

            this.label = this.showLabel;

            TweenLite.set(container, {
				height: '0',
				overflow: 'hidden',
			});

            this.isOpen = false;

        }

        this.open = () => {
            if (this.isOpen) {
                return;
            }

            TweenLite.set(container, {
                height: 'auto',
                immediateRender: true,
            });

            TweenLite.from(container, 0.3, {
				height: 0,
                ease: Cubic.easeOut,
				onComplete() {
					TweenLite.set(container, {
						clearProps:'height',
					});

    				skyVisible.recalculate(false, false);
    				skyVisible.checkViews(false, false);
				},
			});

            this.label = this.hideLabel;
            this.isOpen = true;
        }

        this.close = () => {
            if (!this.isOpen) {
                return;
            }

            TweenLite.to(container, 0.3, {
                height: 0,
                ease: Cubic.easeOut,
                onComplete() {
    				skyVisible.recalculate(false, false);
    				skyVisible.checkViews(false, false);
                }
            });

            this.label = this.showLabel;
            this.isOpen = false;
        }

        this.toggle = () => {
            if(this.isOpen) {
                this.close();
            }
            else {
                this.open();
            }
        }
    }
}());
