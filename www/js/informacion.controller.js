(function() {
'use strict';

    angular
        .module('informacion')
        .controller('informacionController', informacionController);

    informacionController.$inject = [];
    function informacionController() {
        var vm = this;
        vm.openUrl = openUrl;
        
        function openUrl(param) {
            window.open(param, '_system', 'location=yes'); 
            return false;
        }
    }
})();