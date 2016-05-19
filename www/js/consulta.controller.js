(function() {
'use strict';

    angular
        .module('consulta')
        .controller('consultaTuMedicoCtrl', consultaController);

    consultaController.$inject = ['MedicosService', '$cordovaSpinnerDialog', '$cordovaDialogs'];
    function consultaController(MedicosService, $cordovaSpinnerDialog, $cordovaDialogs) {
        var vm = this;
        vm.formulario = {
            medicoName: ''
        };
        vm.dataFromServer = [];
        vm.buscarMedicos = buscarMedicos;
        vm.titulo = 'Procesando petición.';
        vm.loadingData = false;
        vm.dataLoaded = false;
        //var dialog = require('electron').remote.dialog;
        function buscarMedicos() {
            //Validate the input is not empty, show native error
            if(vm.formulario.medicoName == undefined){
                vm.formulario.medicoName = '';
            }
            if (vm.formulario.medicoName.toString().trim().length > 2) {
                vm.dataLoaded = true;
                showLoading();
                MedicosService.getMedicosByName(vm.formulario.medicoName)
                .then(function(data) {
                    console.log(data);
                    if(data.length <= 0){
                        $cordovaDialogs.alert('No se encontraron resultados', 'Oops', 'OK')
                        .then(function() {
                        // callback success
                        });
                    }else{
                        vm.dataFromServer = data;

                    }
                    hideLoading();
                }).catch(function (data) {
                    console.log("Error: " + data);
                    hideLoading();
                    $cordovaDialogs.alert('Ha ocurrido un error, revise su conexión', 'Oops', 'OK')
                        .then(function() {
                        // callback success
                        });
                    //dialog.showErrorBox("Oops", "Ha ocurrido un error, revise su conexión");
                });
                    
            }else{
                    $cordovaDialogs.alert('Favor introduzca el nombre del médico, mínimo 3 caracteres', 'Oops', 'OK')
                        .then(function() {
                        // callback success
                        });
            }
        }
        
        function showLoading() {
            //Show loading
            vm.loadingData = true;
            vm.titulo = 'Procesando petición.';
            $cordovaSpinnerDialog.show(""," procesando petición", true);
        }
        
        function hideLoading() {
            //Hide loading
            vm.loadingData = false;
            vm.titulo = 'Resultados de la consulta.';
            $cordovaSpinnerDialog.hide();
        }
  
    }
})();