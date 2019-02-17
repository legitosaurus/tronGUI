const remote = require('electron').remote;
const { ipcRenderer } = require("electron");

(function () {

  function init() {
    document.getElementById("min-btn").addEventListener("click", function (e) {
      const window = remote.getCurrentWindow();
      window.minimize();
    });

    document.getElementById("max-btn").addEventListener("click", function (e) {
      const window = remote.getCurrentWindow();
      if (!window.isMaximized()) {
        window.maximize();
      } else {
        window.unmaximize();
        }
      });

      document.getElementById("close-btn").addEventListener("click", function (e) {
        const window = remote.getCurrentWindow();
        window.close();
      });
    };

    document.onreadystatechange = function () {
      if (document.readyState == "complete") {
        init();
      }
    };

})();

function ready(){
  document.getElementById("btn-start").addEventListener("click",function(e){
      var myBatFilePath = "C:\\Users\\pavitar\\Desktop\\main\\src\\assests\\startTron.bat";

      const spawn = require('child_process').spawn;
      const bat = spawn('cmd.exe', ['/c', myBatFilePath]);

      ipcRenderer.send("changeWindow", "progress");

      bat.stdout.on('data', (data) => {
          var str = String.fromCharCode.apply(null, data);
          console.info(str);
      });

      bat.stderr.on('data', (data) => {
          var str = String.fromCharCode.apply(null, data);
          console.error(str);
      });

  },false);
}

function readLog(){

  Tail = require('tail').Tail;
  tail = new Tail("C:\\logs\\tron\\tron.log", "\n", {}, true);

  tail.on("line", function(data) {
    addLog(data);
  });

  tail.on("error", function(error) {
    console.log('ERROR: ', error);
  });
}

function checkLog(message){
    var el = document.getElementById("log-container");
    var newItem = document.createElement("LI");       // Create a <li> node
    var textnode = document.createTextNode(message);  // Create a text node

    newItem.appendChild(textnode);                    // Append the text to <li>
    el.appendChild(newItem);
}


function check(isChecked) {
	if(isChecked) {
		$('input[name="mainoptions"]').each(function() {
			this.checked = true;
      $("#main").text("Uncheck All");
		});
	} else {
		$('input[name="mainoptions"]').each(function() {
			this.checked = false;
      $("#main").text("Check All");
		});
	}
}
